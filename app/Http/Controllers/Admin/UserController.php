<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(Request $request)
    {
        // Add basic authorization: only superadmin or admin should manage users
        if (!in_array(auth()->user()->role, ['superadmin', 'admin'])) {
            abort(403, 'Unauthorized access. Only Admins can manage users.');
        }

        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    /**
     * Update the specified user's role.
     */
    public function update(Request $request, User $user)
    {
        if (!in_array(auth()->user()->role, ['superadmin', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        $request->validate([
            'role' => 'required|string|in:superadmin,admin,supervisor,editor,support,user,null',
        ]);

        $role = $request->input('role') === 'null' ? null : $request->input('role');
        $user->update(['role' => $role]);

        return redirect()->back()->with('success', 'User role updated successfully.');
    }
}
