<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class CustomerManagementController extends Controller
{
    /**
     * Display a listing of all customers.
     */
    public function index(Request $request)
    {
        $customers = User::where('is_admin', false)
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', $search)
                        ->orWhere('email', 'like', $search)
                        ->orWhere('phone_e164', 'like', $search);
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/CustomerManagement/Index', [
            'customers' => $customers,
            'filters' => (object) $request->only(['search']),
        ]);
    }

    /**
     * Update the customer's basic info.
     */
    public function update(Request $request, User $user)
    {
        abort_if($user->is_admin, 403, 'Cannot edit admin users from this menu.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone_e164' => 'nullable|string|max:20',
        ]);

        $user->update($validated);

        return back()->with('success', 'Customer updated successfully.');
    }

    /**
     * Reset the customer's password.
     */
    public function resetPassword(Request $request, User $user)
    {
        abort_if($user->is_admin, 403, 'Cannot edit admin users from this menu.');

        $validated = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password reset successfully.');
    }

    /**
     * Freeze or unfreeze a customer account.
     */
    public function toggleStatus(Request $request, User $user)
    {
        abort_if($user->is_admin, 403, 'Cannot edit admin users from this menu.');

        $newStatus = $user->account_status === 'frozen' ? 'active' : 'frozen';
        
        $user->update([
            'account_status' => $newStatus,
        ]);

        return back()->with('success', 'Customer account ' . $newStatus . ' successfully.');
    }

    /**
     * Delete the customer account.
     */
    public function destroy(User $user)
    {
        abort_if($user->is_admin, 403, 'Cannot delete admin users from this menu.');

        $user->delete();

        return back()->with('success', 'Customer deleted successfully.');
    }
}
