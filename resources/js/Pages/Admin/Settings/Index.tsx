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
        store_logo?: string;
        store_favicon?: string;
        about_title?: string;
        about_text?: string;
        social_1_name?: string;
        social_1_url?: string;
        social_1_icon?: string;
        social_2_name?: string;
        social_2_url?: string;
        social_2_icon?: string;
        social_3_name?: string;
        social_3_url?: string;
        social_3_icon?: string;
        social_4_name?: string;
        social_4_url?: string;
        social_4_icon?: string;
    };
}

export default function GeneralSettings({ settings }: SettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        store_name: settings.store_name || 'Rafel',
        support_email: settings.support_email || 'support@rafel.com',
        support_phone: settings.support_phone || '',
        currency: settings.currency === 'VND' ? 'VND' : 'USD',
        store_address: settings.store_address || '',
        about_title: settings.about_title || 'About our company',
        about_text: settings.about_text || '',
        social_1_name: settings.social_1_name || 'Telegram',
        social_1_url: settings.social_1_url || '',
        social_1_icon: settings.social_1_icon || 'MessageCircle',
        social_2_name: settings.social_2_name || 'Facebook',
        social_2_url: settings.social_2_url || '',
        social_2_icon: settings.social_2_icon || 'Facebook',
        social_3_name: settings.social_3_name || 'Instagram',
        social_3_url: settings.social_3_url || '',
        social_3_icon: settings.social_3_icon || 'Instagram',
        social_4_name: settings.social_4_name || 'TikTok',
        social_4_url: settings.social_4_url || '',
        social_4_icon: settings.social_4_icon || 'Music',
        store_logo: settings.store_logo || '' as File | string | null,
        store_favicon: settings.store_favicon || '' as File | string | null,
    });

    const [logoPreview, setLogoPreview] = React.useState<string | null>(settings.store_logo || null);
    const [faviconPreview, setFaviconPreview] = React.useState<string | null>(settings.store_favicon || null);

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

            <div className="w-full">
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
                                    <option value="VND">VND (₫)</option>
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

                        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/40">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white">Contact Page About Text</h2>
                            <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">This appears on the Contact Us page under the contact cards.</p>
                            <div className="mt-5 grid gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About title</label>
                                    <input
                                        type="text"
                                        value={data.about_title}
                                        onChange={e => setData('about_title', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short company description</label>
                                    <textarea
                                        value={data.about_text}
                                        onChange={e => setData('about_text', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/40">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white">Social Links</h2>
                            <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Set the name, link, and icon label for each social channel.</p>
                            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-3 text-sm font-black text-gray-900 dark:text-white">Social {index}</p>
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={(data as any)[`social_${index}_name`]}
                                                onChange={e => setData(`social_${index}_name` as any, e.target.value)}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <input
                                                type="url"
                                                placeholder="https://..."
                                                value={(data as any)[`social_${index}_url`]}
                                                onChange={e => setData(`social_${index}_url` as any, e.target.value)}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:col-span-2 sm:text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Icon name"
                                                value={(data as any)[`social_${index}_icon`]}
                                                onChange={e => setData(`social_${index}_icon` as any, e.target.value)}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:col-span-3 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Logo (Header)</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Image URL (e.g., https://...)"
                                        value={typeof data.store_logo === 'string' ? data.store_logo : ''}
                                        onChange={e => {
                                            setData('store_logo', e.target.value);
                                            setLogoPreview(e.target.value);
                                        }}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-400">OR</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('store_logo', e.target.files[0]);
                                                    setLogoPreview(URL.createObjectURL(e.target.files[0]));
                                                }
                                            }}
                                            className="w-full text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                {logoPreview && (
                                    <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 inline-block">
                                        <img src={logoPreview} alt="Store Logo" className="h-20 object-contain" />
                                    </div>
                                )}
                                {errors.store_logo && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_logo}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Favicon</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Image URL (e.g., https://...)"
                                        value={typeof data.store_favicon === 'string' ? data.store_favicon : ''}
                                        onChange={e => {
                                            setData('store_favicon', e.target.value);
                                            setFaviconPreview(e.target.value);
                                        }}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-400">OR</span>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/x-icon"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('store_favicon', e.target.files[0]);
                                                    setFaviconPreview(URL.createObjectURL(e.target.files[0]));
                                                }
                                            }}
                                            className="w-full text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                {faviconPreview && (
                                    <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 inline-block">
                                        <img src={faviconPreview} alt="Store Favicon" className="h-14 object-contain" />
                                    </div>
                                )}
                                {errors.store_favicon && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_favicon}</p>}
                            </div>
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
