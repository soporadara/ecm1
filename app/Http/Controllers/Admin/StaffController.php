<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    public function index()
    {
        $this->authorize('staff.view');

        $staff = User::whereHas('roles', function($query) {
            $query->where('name', '!=', 'Customer');
        })->with('roles')->latest()->paginate(15);

        return Inertia::render('Admin/Staff/Index', [
            'staff' => $staff
        ]);
    }

    public function create()
    {
        $this->authorize('staff.create');

        return Inertia::render('Admin/Staff/Create', [
            'roles' => Role::where('name', '!=', 'Customer')->get()
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('staff.create');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'roles' => 'required|array'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['roles']);

        return redirect()->route('admin.staff.index')->with('success', 'Staff member created successfully.');
    }

    public function edit(User $staff)
    {
        $this->authorize('staff.update');

        $staff->load('roles');

        return Inertia::render('Admin/Staff/Edit', [
            'staff' => $staff,
            'roles' => Role::where('name', '!=', 'Customer')->get()
        ]);
    }

    public function update(Request $request, User $staff)
    {
        $this->authorize('staff.update');

        // Prevent modifying the primary Super Admin
        if ($staff->id === 1 && auth()->id() !== 1) {
            abort(403, 'You cannot modify the primary Super Administrator.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $staff->id,
            'password' => 'nullable|string|min:8',
            'roles' => 'required|array'
        ]);

        $staff->update([
            'name' => $validated['name'],
            'email' => $validated['email']
        ]);

        if (!empty($validated['password'])) {
            $staff->update(['password' => Hash::make($validated['password'])]);
        }

        // Prevent removing Super Admin role from the primary user
        if ($staff->id === 1 && !in_array('Super Administrator', $validated['roles'])) {
            $validated['roles'][] = 'Super Administrator';
        }

        $staff->syncRoles($validated['roles']);

        return redirect()->route('admin.staff.index')->with('success', 'Staff member updated successfully.');
    }

    public function destroy(User $staff)
    {
        $this->authorize('staff.delete');

        if ($staff->id === 1 || $staff->id === auth()->id()) {
            return redirect()->route('admin.staff.index')->with('error', 'Cannot delete this user.');
        }

        $staff->delete();

        return redirect()->route('admin.staff.index')->with('success', 'Staff member removed successfully.');
    }
}
