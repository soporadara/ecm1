import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function StaffIndex({ staff }: any) {
    const deleteStaff = (id: number) => {
        if (confirm('Are you sure you want to remove this staff member?')) {
            router.delete(`/admin/staff/${id}`);
        }
    };

    return (
        <AdminLayout title="Staff & Roles">
            <Head title="Staff Management" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage backend users and their roles</p>
                </div>
                <Link
                    href="/admin/staff/create"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-secondary"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
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

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roles</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {staff.data.map((user: any) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.map((role: any) => (
                                                <span key={role.id} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-md text-xs font-medium">
                                                    {role.name}
                                                </span>
                                            ))}
                                            {user.roles.length === 0 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">No roles assigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            <Link href={`/admin/staff/${user.id}/edit`} className="text-gray-400 hover:text-brand-primary transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </Link>
                                            <button 
                                                onClick={() => deleteStaff(user.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                disabled={user.id === 1}
                                                title={user.id === 1 ? 'Primary Super Admin cannot be deleted' : 'Delete user'}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
