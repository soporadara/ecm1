import { Head, Link, router } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function StaffIndex({ staff }: any) {
    const deleteStaff = async (id: number) => {
        if (await confirmAction('Are you sure you want to remove this staff member?')) {
            router.delete(`/admin/staff/${id}`);
        }
    };

    return (
        <AdminLayout title="Staff & Roles">
            <Head title="Staff Management" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Staff Management</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage backend users and their roles.</p>
                </div>
                <Link
                    href="/admin/staff/create"
                    className="inline-flex items-center justify-center bg-admin-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add Staff Member
                </Link>
            </div>

            <div className="space-y-3 md:hidden">
                {staff.data.map((user: any) => (
                    <article key={user.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-lg font-black text-brand-primary">
                                {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className="truncate text-base font-black text-gray-950 dark:text-white">{user.name}</h2>
                                <p className="truncate text-sm font-semibold text-gray-500 dark:text-gray-400">{user.email}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {user.roles.map((role: any) => (
                                        <span key={role.id} className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-black text-brand-primary">
                                            {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Link href={`/admin/staff/${user.id}/edit`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-gray-200">
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteStaff(user.id)}
                                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:opacity-50"
                                disabled={user.id === 1}
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Name</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Email</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Roles</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Created</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {staff.data.map((user: any) => (
                                <tr key={user.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold shadow-inner">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-semibold text-admin-text">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-admin-text-muted font-medium">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.map((role: any) => (
                                                <span key={role.id} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-primary/10 text-admin-primary">
                                                    {role.name}
                                                </span>
                                            ))}
                                            {user.roles.length === 0 && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-surface-muted text-admin-text-muted border border-admin-border/50">
                                                    No roles assigned
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-admin-text-muted">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/staff/${user.id}/edit`} className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white hover:opacity-80 transition-opacity">Edit</Link>
                                            <button 
                                                onClick={() => deleteStaff(user.id)}
                                                disabled={user.id === 1}
                                                className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-600 dark:text-white hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                                title={user.id === 1 ? 'Primary Super Admin cannot be deleted' : 'Delete user'}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
