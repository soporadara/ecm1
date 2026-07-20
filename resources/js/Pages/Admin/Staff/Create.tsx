import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function StaffCreate({ roles }: any) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as string[]
    });

    const toggleRole = (roleName: string) => {
        if (data.roles.includes(roleName)) {
            setData('roles', data.roles.filter(r => r !== roleName));
        } else {
            setData('roles', [...data.roles, roleName]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/staff');
    };

    return (
        <AdminLayout title="Add Staff Member">
            <Head title="Add Staff Member" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Staff Member</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create a new backend user and assign roles</p>
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
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                                    required
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Assign Roles
                            </label>
                            
                            <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                {roles.map((role: any) => (
                                    <label key={role.id} className="flex items-start cursor-pointer group">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                checked={data.roles.includes(role.name)}
                                                onChange={() => toggleRole(role.name)}
                                                className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary dark:border-gray-600 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <span className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-brand-primary transition-colors">
                                                {role.name}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.roles && <p className="mt-2 text-sm text-red-600">{errors.roles}</p>}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-brand-primary text-white px-6 py-2 rounded-md font-medium hover:bg-brand-secondary transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Staff Member'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
