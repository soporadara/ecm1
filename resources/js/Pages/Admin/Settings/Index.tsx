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
        social_links?: string;
        fab_email?: string;
        fab_phone?: string;
        fab_messenger?: string;
        fab_telegram?: string;
        cambodia_map_open_url?: string;
        cambodia_map_address?: string;
        vietnam_map_open_url?: string;
        vietnam_map_address?: string;
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
        social_links: settings.social_links 
            ? JSON.parse(settings.social_links) 
            : [
                { name: (settings as any).social_1_name || 'Telegram', url: (settings as any).social_1_url || '', icon: (settings as any).social_1_icon || 'MessageCircle' },
                { name: (settings as any).social_2_name || 'Facebook', url: (settings as any).social_2_url || '', icon: (settings as any).social_2_icon || 'Facebook' },
                { name: (settings as any).social_3_name || 'Instagram', url: (settings as any).social_3_url || '', icon: (settings as any).social_3_icon || 'Instagram' },
                { name: (settings as any).social_4_name || 'TikTok', url: (settings as any).social_4_url || '', icon: (settings as any).social_4_icon || 'Music' }
            ].filter(s => s.name || s.url),
        fab_email: settings.fab_email || '',
        fab_phone: settings.fab_phone || '',
        fab_messenger: settings.fab_messenger || '',
        fab_telegram: settings.fab_telegram || '',
        cambodia_map_open_url: settings.cambodia_map_open_url || '',
        cambodia_map_address: settings.cambodia_map_address || '',
        vietnam_map_open_url: settings.vietnam_map_open_url || '',
        vietnam_map_address: settings.vietnam_map_address || '',
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
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">General Settings</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage your primary store configurations.</p>
                </div>

                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden">
                    <form onSubmit={submit} className="p-6 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Store Name *</label>
                                <input
                                    type="text"
                                    value={data.store_name}
                                    onChange={e => setData('store_name', e.target.value)}
                                    className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    required
                                />
                                {errors.store_name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Primary Currency *</label>
                                <select
                                    value={data.currency}
                                    onChange={e => setData('currency', e.target.value)}
                                    className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    required
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="VND">VND (₫)</option>
                                </select>
                                {errors.currency && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.currency}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Support Email *</label>
                                <input
                                    type="email"
                                    value={data.support_email}
                                    onChange={e => setData('support_email', e.target.value)}
                                    className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    required
                                />
                                {errors.support_email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.support_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Support Phone</label>
                                <input
                                    type="text"
                                    value={data.support_phone}
                                    onChange={e => setData('support_phone', e.target.value)}
                                    className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                />
                                {errors.support_phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.support_phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2">Store Address</label>
                            <textarea
                                value={data.store_address}
                                onChange={e => setData('store_address', e.target.value)}
                                rows={3}
                                className="w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow resize-y min-h-[100px]"
                            ></textarea>
                            {errors.store_address && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_address}</p>}
                        </div>

                        <section className="rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm">
                            <h2 className="text-lg font-black text-admin-text">Contact Page About Text</h2>
                            <p className="mt-1 text-sm font-semibold text-admin-text-muted">This appears on the Contact Us page under the contact cards.</p>
                            <div className="mt-5 grid gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">About title</label>
                                    <input
                                        type="text"
                                        value={data.about_title}
                                        onChange={e => setData('about_title', e.target.value)}
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">Short company description</label>
                                    <textarea
                                        value={data.about_text}
                                        onChange={e => setData('about_text', e.target.value)}
                                        rows={4}
                                        className="w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow resize-y min-h-[120px]"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-black text-admin-text">Social Links</h2>
                                    <p className="mt-1 text-sm font-semibold text-admin-text-muted">Set the name, link, and icon URL/label for each social channel.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setData('social_links', [...data.social_links, { name: '', url: '', icon: '' }])}
                                    className="px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-sm hover:bg-admin-primary-hover shadow-sm transition-all duration-200"
                                >
                                    + Add More
                                </button>
                            </div>
                            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                                {data.social_links.map((link: any, index: number) => (
                                    <div key={index} className="relative rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm group">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newLinks = [...data.social_links];
                                                newLinks.splice(index, 1);
                                                setData('social_links', newLinks);
                                            }}
                                            className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <p className="mb-4 text-sm font-black text-admin-text uppercase tracking-wider">Social Link {index + 1}</p>
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={link.name}
                                                onChange={e => {
                                                    const newLinks = [...data.social_links];
                                                    newLinks[index].name = e.target.value;
                                                    setData('social_links', newLinks);
                                                }}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <input
                                                type="url"
                                                placeholder="https://..."
                                                value={link.url}
                                                onChange={e => {
                                                    const newLinks = [...data.social_links];
                                                    newLinks[index].url = e.target.value;
                                                    setData('social_links', newLinks);
                                                }}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:col-span-2 sm:text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Icon name or image URL"
                                                value={link.icon}
                                                onChange={e => {
                                                    const newLinks = [...data.social_links];
                                                    newLinks[index].icon = e.target.value;
                                                    setData('social_links', newLinks);
                                                }}
                                                className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:col-span-3 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-admin-border bg-admin-surface-muted/30 p-6 shadow-sm">
                            <h2 className="text-lg font-black text-admin-text">Office Locations (Maps)</h2>
                            <p className="mt-1 text-sm font-semibold text-admin-text-muted">Set the link to open Google Maps and the text address for your offices.</p>
                            
                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                <div className="rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm">
                                    <h3 className="mb-4 text-sm font-black text-admin-text uppercase tracking-wider">Cambodia Office</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-admin-text-muted mb-1">Link to open Google Maps</label>
                                            <input
                                                type="url"
                                                placeholder="https://maps.google.com/..."
                                                value={data.cambodia_map_open_url}
                                                onChange={e => setData('cambodia_map_open_url', e.target.value)}
                                                className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-admin-text-muted mb-1">Address Text</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Phnom Penh, Cambodia..."
                                                value={data.cambodia_map_address}
                                                onChange={e => setData('cambodia_map_address', e.target.value)}
                                                className="w-full py-3 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm">
                                    <h3 className="mb-4 text-sm font-black text-admin-text uppercase tracking-wider">Vietnam Office</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-admin-text-muted mb-1">Link to open Google Maps</label>
                                            <input
                                                type="url"
                                                placeholder="https://maps.google.com/..."
                                                value={data.vietnam_map_open_url}
                                                onChange={e => setData('vietnam_map_open_url', e.target.value)}
                                                className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-admin-text-muted mb-1">Address Text</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Ho Chi Minh City, Vietnam..."
                                                value={data.vietnam_map_address}
                                                onChange={e => setData('vietnam_map_address', e.target.value)}
                                                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Store Logo (Header)</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Image URL (e.g., https://...)"
                                        value={typeof data.store_logo === 'string' ? data.store_logo : ''}
                                        onChange={e => {
                                            setData('store_logo', e.target.value);
                                            setLogoPreview(e.target.value);
                                        }}
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-admin-text-muted">OR</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('store_logo', e.target.files[0]);
                                                    setLogoPreview(URL.createObjectURL(e.target.files[0]));
                                                }
                                            }}
                                            className="w-full text-sm text-admin-text-muted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 file:cursor-pointer file:shadow-sm file:transition-all file:border file:border-admin-border cursor-pointer"
                                        />
                                    </div>
                                </div>
                                {logoPreview && (
                                    <div className="mt-5 bg-white dark:bg-gray-800 rounded-xl p-5 inline-block shadow-md border border-gray-200 dark:border-gray-700 relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('store_logo', '');
                                                setLogoPreview('');
                                            }}
                                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <img src={logoPreview} alt="Store Logo" className="h-20 object-contain rounded-lg" />
                                    </div>
                                )}
                                {errors.store_logo && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_logo}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Store Favicon</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Image URL (e.g., https://...)"
                                        value={typeof data.store_favicon === 'string' ? data.store_favicon : ''}
                                        onChange={e => {
                                            setData('store_favicon', e.target.value);
                                            setFaviconPreview(e.target.value);
                                        }}
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-admin-text-muted">OR</span>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/x-icon"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('store_favicon', e.target.files[0]);
                                                    setFaviconPreview(URL.createObjectURL(e.target.files[0]));
                                                }
                                            }}
                                            className="w-full text-sm text-admin-text-muted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 file:cursor-pointer file:shadow-sm file:transition-all file:border file:border-admin-border cursor-pointer"
                                        />
                                    </div>
                                </div>
                                {faviconPreview && (
                                    <div className="mt-5 bg-white dark:bg-gray-800 rounded-xl p-5 inline-block shadow-md border border-gray-200 dark:border-gray-700 relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('store_favicon', '');
                                                setFaviconPreview('');
                                            }}
                                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <img src={faviconPreview} alt="Store Favicon" className="h-14 object-contain rounded-lg" />
                                    </div>
                                )}
                                {errors.store_favicon && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.store_favicon}</p>}
                            </div>
                        </div>

                        {/* Floating Action Buttons (FAB) */}
                        <div className="pt-6 border-t border-admin-border/50">
                            <h3 className="text-lg font-bold text-admin-text mb-4">Floating Contact Widget Links</h3>
                            <p className="text-sm text-admin-text-muted mb-4 -mt-2">Leave a field empty to hide that specific icon from the floating button on the website.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={data.fab_email}
                                        onChange={e => setData('fab_email', e.target.value)}
                                        placeholder="support@example.com"
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={data.fab_phone}
                                        onChange={e => setData('fab_phone', e.target.value)}
                                        placeholder="+1234567890"
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">Messenger Link</label>
                                    <input
                                        type="url"
                                        value={data.fab_messenger}
                                        onChange={e => setData('fab_messenger', e.target.value)}
                                        placeholder="https://m.me/yourpage"
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-2">Telegram Link</label>
                                    <input
                                        type="url"
                                        value={data.fab_telegram}
                                        onChange={e => setData('fab_telegram', e.target.value)}
                                        placeholder="https://t.me/your_username"
                                        className="w-full h-11 rounded-xl border-admin-border bg-admin-surface text-admin-text font-semibold shadow-sm focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 sm:text-sm transition-shadow"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-admin-border/50 flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-admin-primary text-white rounded-xl font-bold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50 hover:-translate-y-0.5"
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
