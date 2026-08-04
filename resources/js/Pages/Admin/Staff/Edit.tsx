import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function StaffEdit({ staff, roles }: any) {
    // Extract role names that the user currently has
    const currentRoles = staff.roles.map((r: any) => r.name);

    const { data, setData, put, processing, errors } = useForm({
        name: staff.name,
        email: staff.email,
        password: '',
        roles: currentRoles as string[]
    });

    const selectRole = (roleName: string) => {
        setData('roles', [roleName]);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/staff/${staff.id}`);
    };

    const isPrimarySuperAdmin = staff.id === 1;

    return (
        <AdminLayout title="Edit Staff Member">
            <Head title={`Edit ${staff.name}`} />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Staff Member</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update user details and access levels</p>
                </div>
                <Link
                    href="/admin/staff"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium"
                >
                    &larr; Back to Staff
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <form onSubmit={submit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Change Password
                                    <span className="text-gray-400 text-xs font-normal ml-2">(leave blank to keep current)</span>
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Assign Roles
                            </label>
                            
                            {isPrimarySuperAdmin && (
                                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                                    <strong>Note:</strong> This is the primary Super Administrator. The Super Administrator role cannot be removed from this account.
                                </div>
                            )}
                            
                            <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                {roles.map((role: any) => {
                                    const isSuperAdminRole = role.name === 'Super Administrator';
                                    const disabled = isPrimarySuperAdmin && isSuperAdminRole;
                                    
                                    return (
                                        <label key={role.id} className={`flex items-start ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer group'}`}>
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="radio"
                                                    name="staff_role"
                                                    checked={data.roles.includes(role.name)}
                                                    onChange={() => !disabled && selectRole(role.name)}
                                                    disabled={disabled}
                                                    className="h-5 w-5 border-gray-300 text-brand-primary focus:ring-brand-primary dark:border-gray-600 dark:bg-gray-700 disabled:opacity-50"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <span className={`font-medium text-gray-900 dark:text-gray-200 ${!disabled && 'group-hover:text-brand-primary transition-colors'}`}>
                                                    {role.name}
                                                </span>
                                                <p className="mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                    {role.name === 'Super Administrator' && 'Full control of CMS, staff, roles, security, and all content.'}
                                                    {role.name === 'Administrator' && 'Daily operations, content, orders, customers, settings, and reports.'}
                                                    {role.name === 'Logistics' && 'Dashboard, Customers, Orders, Reports, Team Notes, Banners, Testimonials, Pop-up Ads.'}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors.roles && <p className="mt-2 text-sm text-red-600">{errors.roles}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-gray-700 sm:flex-row sm:justify-end">
                        <Link href="/admin/staff" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-gray-200">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="min-h-11 rounded-xl bg-brand-primary px-6 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-secondary disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
