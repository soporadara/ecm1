import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function OrderMessages({ fields, settings }: any) {
    const { data, setData, post, processing, errors } = useForm({
        settings: Object.keys(fields || {}).reduce((acc: any, key) => {
            acc[key] = settings?.[key] || '';
            return acc;
        }, {}),
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post('/admin/content-settings/order-messages', {
            preserveScroll: true,
            onSuccess: () => toast.success('Quote wording updated.'),
            onError: () => toast.error('Please check the fields and try again.'),
        });
    };

    return (
        <AdminLayout title="Quote Wording">
            <Head title="Quote Wording - Admin" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-admin-text tracking-tight">Manual Order Wording</h1>
                <p className="text-sm font-medium text-admin-text-muted mt-1">Edit public Manual Order copy, notices, and success modal text.</p>
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm space-y-5">
                {Object.entries(fields || {}).map(([key, label]: any) => {
                    const isLong = key.includes('description') || key.includes('introduction') || key.includes('notice') || key.includes('disclaimer');

                    return (
                        <label key={key} className="block">
                            <span className="mb-2 block text-sm font-bold text-admin-text">{label}</span>
                            {isLong ? (
                                <textarea
                                    value={data.settings[key]}
                                    onChange={(event) => setData('settings', { ...data.settings, [key]: event.target.value })}
                                    rows={3}
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-3 text-admin-text"
                                />
                            ) : (
                                <input
                                    value={data.settings[key]}
                                    onChange={(event) => setData('settings', { ...data.settings, [key]: event.target.value })}
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-3 text-admin-text"
                                />
                            )}
                            {errors[`settings.${key}`] && <p className="mt-1 text-xs font-bold text-admin-danger">{errors[`settings.${key}`]}</p>}
                        </label>
                    );
                })}

                <div className="flex justify-end border-t border-admin-border pt-5">
                    <button disabled={processing} className="rounded-xl bg-admin-primary px-6 py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-60">
                        Save Wording
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
