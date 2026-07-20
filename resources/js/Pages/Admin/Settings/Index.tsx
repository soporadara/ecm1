import { Head, useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

interface SettingsProps {
    settings: {
        store_name?: string;
        support_email?: string;
        support_phone?: string;
        currency?: string;
        store_address?: string;
    };
}

export default function GeneralSettings({ settings }: SettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        store_name: settings.store_name || 'Rafel',
        support_email: settings.support_email || 'support@rafel.com',
        support_phone: settings.support_phone || '',
        currency: settings.currency || 'USD',
        store_address: settings.store_address || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
            onSuccess: () => toast.success('Settings updated successfully!'),
            onError: () => toast.error('Failed to update settings. Check the form for errors.'),
        });
    };

    return (
        <AdminLayout title="General Settings">
            <Head title="General Settings - Admin" />

            <div className="max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">General Settings</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your primary store configurations.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name *</label>
                                <input
                                    type="text"
                                    value={data.store_name}
                                    onChange={e => setData('store_name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.store_name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Currency *</label>
                                <select
                                    value={data.currency}
                                    onChange={e => setData('currency', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="KHR">KHR (៛)</option>
                                </select>
                                {errors.currency && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.currency}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Email *</label>
                                <input
                                    type="email"
                                    value={data.support_email}
                                    onChange={e => setData('support_email', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.support_email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.support_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Phone</label>
                                <input
                                    type="text"
                                    value={data.support_phone}
                                    onChange={e => setData('support_phone', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.support_phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.support_phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Address</label>
                            <textarea
                                value={data.store_address}
                                onChange={e => setData('store_address', e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            ></textarea>
                            {errors.store_address && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_address}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
