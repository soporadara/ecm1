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
    private const STAFF_ROLES = [
        'Super Administrator',
        'Administrator',
        'Logistics',
        'Content Manager',
        'Support',
    ];

    private const ROLE_SLUGS = [
        'Super Administrator' => 'super_admin',
        'Administrator' => 'admin',
        'Logistics' => 'logistics',
        'Content Manager' => 'content',
        'Support' => 'support',
    ];

    public function index()
    {
        $this->authorize('staff.view');

        $staff = User::whereHas('roles', function($query) {
            $query->whereIn('name', self::STAFF_ROLES);
        })->with('roles')->latest()->paginate(15);

        return Inertia::render('Admin/Staff/Index', [
            'staff' => $staff
        ]);
    }

    public function create()
    {
        $this->authorize('staff.create');

        return Inertia::render('Admin/Staff/Create', [
            'roles' => $this->availableRoles()
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('staff.create');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'roles' => 'required|array|size:1',
            'roles.*' => 'required|string|in:'.implode(',', self::STAFF_ROLES),
        ]);

        $this->blockSuperAdminAssignmentUnlessAllowed($validated['roles']);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_admin' => true,
            'role' => $this->primaryRoleSlug($validated['roles']),
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
            'roles' => $this->availableRoles()
        ]);
    }

    public function update(Request $request, User $staff)
    {
        $this->authorize('staff.update');

        // Prevent modifying the primary Super Admin
        if ($staff->id === 1 && auth('admin')->id() !== 1) {
            abort(403, 'You cannot modify the primary Super Administrator.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $staff->id,
            'password' => 'nullable|string|min:8',
            'roles' => 'required|array|size:1',
            'roles.*' => 'required|string|in:'.implode(',', self::STAFF_ROLES),
        ]);

        $this->blockSuperAdminAssignmentUnlessAllowed($validated['roles']);

        // Prevent removing Super Admin role from the primary user
        if ($staff->id === 1 && !in_array('Super Administrator', $validated['roles'], true)) {
            $validated['roles'] = ['Super Administrator'];
        }

        $staff->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_admin' => true,
            'role' => $this->primaryRoleSlug($validated['roles']),
        ]);

        if (!empty($validated['password'])) {
            $staff->update(['password' => Hash::make($validated['password'])]);
        }

        $staff->syncRoles($validated['roles']);

        return redirect()->route('admin.staff.index')->with('success', 'Staff member updated successfully.');
    }

    public function destroy(User $staff)
    {
        $this->authorize('staff.delete');

        if ($staff->id === 1 || $staff->id === auth('admin')->id()) {
            return redirect()->route('admin.staff.index')->with('error', 'Cannot delete this user.');
        }

        $staff->delete();

        return redirect()->route('admin.staff.index')->with('success', 'Staff member removed successfully.');
    }

    private function availableRoles()
    {
        return Role::whereIn('name', self::STAFF_ROLES)
            ->get()
            ->sortBy(fn (Role $role) => array_search($role->name, self::STAFF_ROLES, true))
            ->values();
    }

    private function blockSuperAdminAssignmentUnlessAllowed(array $roles): void
    {
        if (in_array('Super Administrator', $roles, true) && !auth('admin')->user()?->hasRole('Super Administrator')) {
            abort(403, 'Only a Super Administrator can assign full control.');
        }
    }

    private function primaryRoleSlug(array $roles): string
    {
        foreach (self::STAFF_ROLES as $roleName) {
            if (in_array($roleName, $roles, true)) {
                return self::ROLE_SLUGS[$roleName];
            }
        }

        return 'support';
    }
}
