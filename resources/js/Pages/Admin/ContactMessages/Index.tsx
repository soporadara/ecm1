import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Layouts/AdminLayout';

const label = (value: string) => String(value || '').replace(/_/g, ' ');

function MessageEditor({ message, staff, statuses }: any) {
    const { data, setData, patch, processing } = useForm({
        status: message.status,
        assigned_to: message.assigned_to || '',
        internal_notes: message.internal_notes || '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        patch(`/admin/contact-messages/${message.id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Message updated.'),
        });
    };

    return (
        <form onSubmit={submit} className="mt-4 grid gap-3 rounded-xl bg-admin-surface-muted p-4 md:grid-cols-3">
            <select value={data.status} onChange={(event) => setData('status', event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm font-bold capitalize">
                {statuses.map((status: string) => <option key={status} value={status}>{label(status)}</option>)}
            </select>
            <select value={data.assigned_to} onChange={(event) => setData('assigned_to', event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm font-bold">
                <option value="">Unassigned</option>
                {staff.map((user: any) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <button disabled={processing} className="rounded-xl bg-admin-primary px-4 py-2 text-sm font-black uppercase tracking-wider text-white disabled:opacity-60">Save</button>
            <textarea value={data.internal_notes} onChange={(event) => setData('internal_notes', event.target.value)} rows={2} placeholder="Internal notes" className="md:col-span-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-sm" />
        </form>
    );
}

export default function ContactMessagesIndex({ messages, filters = {}, staff = [], statuses = [] }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const applyFilters = (event: FormEvent) => {
        event.preventDefault();
        router.get('/admin/contact-messages', { search, status }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Contact Messages">
            <Head title="Contact Messages - Admin" />

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Contact Messages</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Review support messages from customers and visitors.</p>
                </div>
                <form onSubmit={applyFilters} className="flex flex-col gap-3 sm:flex-row">
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email, customer ID, order" className="min-w-[260px] rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium" />
                    <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize">
                        <option value="">All statuses</option>
                        {statuses.map((item: string) => <option key={item} value={item}>{label(item)}</option>)}
                    </select>
                    <button className="rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white">Filter</button>
                </form>
            </div>

            <div className="space-y-4">
                {messages.data.length === 0 ? (
                    <div className="rounded-2xl border border-admin-border bg-admin-surface p-10 text-center text-admin-text-muted">No contact messages found.</div>
                ) : messages.data.map((message: any) => (
                    <article key={message.id} className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-admin-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-admin-primary">{label(message.status)}</span>
                                    <span className="text-xs font-bold text-admin-text-muted">{new Date(message.created_at).toLocaleString()}</span>
                                </div>
                                <h2 className="mt-3 text-lg font-black text-admin-text">{message.subject}</h2>
                                <p className="mt-1 text-sm font-medium text-admin-text-muted">{message.name} · {message.email} {message.phone ? `· ${message.phone}` : ''}</p>
                                <p className="mt-1 text-xs font-bold text-admin-text-muted">Customer: {message.customer_code || 'Visitor'} {message.order_number ? `· Order ${message.order_number}` : ''}</p>
                            </div>
                            {message.assignee && <p className="text-sm font-bold text-admin-text-muted">Assigned to {message.assignee.name}</p>}
                        </div>
                        <p className="mt-4 whitespace-pre-line rounded-xl bg-admin-surface-muted p-4 text-sm leading-6 text-admin-text">{message.message}</p>
                        {message.attachment_original_filename && <p className="mt-3 text-xs font-bold text-admin-text-muted">Attachment: {message.attachment_original_filename}</p>}
                        <MessageEditor message={message} staff={staff} statuses={statuses} />
                    </article>
                ))}
            </div>

            {messages.total > messages.per_page && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {messages.links.map((link: any, idx: number) => (
                        <Link key={idx} href={link.url || '#'} className={`rounded-xl border px-4 py-2 text-sm font-bold ${link.active ? 'border-admin-primary bg-admin-primary text-white' : 'border-admin-border bg-admin-surface text-admin-text-muted'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
