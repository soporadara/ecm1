import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface User {
    id: number;
    name: string;
    email: string;
    phone_e164: string | null;
    account_status: string;
    customer_code: string | null;
    created_at: string;
}

interface Props {
    customers: {
        data: User[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
    };
}

export default function CustomerManagement({ customers, filters }: Props) {
    const { auth } = usePage().props as any;
    const [search, setSearch] = useState(filters.search || '');

    // Edit Info Modal
    const [editingCustomer, setEditingCustomer] = useState<User | null>(null);
    const editForm = useForm({
        name: '',
        email: '',
        phone_e164: '',
    });

    const openEditModal = (user: User) => {
        setEditingCustomer(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            phone_e164: user.phone_e164 || '',
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCustomer) return;
        editForm.put(`/admin/customers-management/${editingCustomer.id}`, {
            onSuccess: () => setEditingCustomer(null),
        });
    };

    // Reset Password Modal
    const [resettingCustomer, setResettingCustomer] = useState<User | null>(null);
    const passwordForm = useForm({
        password: '',
        password_confirmation: '',
    });

    const submitPasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resettingCustomer) return;
        passwordForm.post(`/admin/customers-management/${resettingCustomer.id}/reset-password`, {
            onSuccess: () => {
                setResettingCustomer(null);
                passwordForm.reset();
            },
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/customers-management', { search }, { preserveState: true });
    };

    const [confirmAction, setConfirmAction] = useState<{
        type: 'freeze' | 'delete',
        user: User,
        message: string,
        action: string,
        buttonClass: string
    } | null>(null);

    const toggleStatus = (user: User) => {
        const action = user.account_status === 'frozen' ? 'Unfreeze' : 'Freeze';
        setConfirmAction({
            type: 'freeze',
            user,
            message: `Are you sure you want to ${action.toLowerCase()} this account?`,
            action: action,
            buttonClass: 'bg-admin-text'
        });
    };

    const deleteCustomer = (user: User) => {
        setConfirmAction({
            type: 'delete',
            user,
            message: 'Are you absolutely sure you want to delete this customer? This cannot be undone.',
            action: 'Delete',
            buttonClass: 'bg-admin-danger'
        });
    };

    const executeConfirmAction = () => {
        if (!confirmAction) return;
        if (confirmAction.type === 'freeze') {
            router.post(`/admin/customers-management/${confirmAction.user.id}/toggle-status`, {}, { preserveScroll: true });
        } else if (confirmAction.type === 'delete') {
            router.delete(`/admin/customers-management/${confirmAction.user.id}`, { preserveScroll: true });
        }
        setConfirmAction(null);
    };

    return (
        <AdminLayout title="Customers">
            <Head title="Customers" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Customers</h1>
                    <p className="text-sm text-admin-text-muted mt-1">Manage login info, passwords, and account status.</p>
                </div>
            </div>

            <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                <div className="p-4 border-b border-admin-border bg-admin-surface-muted/30">
                    <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
                        <div className="relative flex-1">
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search name, email, phone..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-sm font-medium placeholder:font-normal"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-admin-primary text-white text-sm font-semibold rounded-xl hover:bg-admin-primary-hover shadow-sm transition-colors">
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-admin-surface-muted/50 border-b border-admin-border">
                                <th className="text-center px-4 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider w-12">No.</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Customer ID</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Name</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Email</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Phone</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border">
                            {customers.data.map((user, index) => {
                                const rowNumber = (customers.current_page - 1) * 15 + index + 1;
                                return (
                                <tr key={user.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-4 py-4 text-center text-xs font-black text-admin-text-muted">{rowNumber}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block rounded-lg bg-admin-primary/10 px-2.5 py-1 text-xs font-black tracking-wider text-admin-primary font-mono">
                                            {user.customer_code || '—'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-admin-text">{user.name}</td>
                                    <td className="px-6 py-4 text-admin-text-muted">{user.email}</td>
                                    <td className="px-6 py-4 text-admin-text-muted">{user.phone_e164 || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.account_status === 'frozen' ? 'bg-admin-danger/10 text-admin-danger' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                                            {user.account_status === 'frozen' ? 'Frozen' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(user)} className="px-4 py-1.5 text-xs font-bold text-admin-primary bg-admin-primary/10 hover:bg-admin-primary/20 rounded-lg transition-colors">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                            {customers.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-admin-text-muted">No customers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingCustomer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-admin-surface rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Edit Customer Info</h2>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Name</label>
                                <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)} className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" />
                                {editForm.errors.name && <p className="text-xs text-admin-danger mt-1">{editForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Email</label>
                                <input type="email" value={editForm.data.email} onChange={e => editForm.setData('email', e.target.value)} className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" />
                                {editForm.errors.email && <p className="text-xs text-admin-danger mt-1">{editForm.errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Phone</label>
                                <input type="text" value={editForm.data.phone_e164} onChange={e => editForm.setData('phone_e164', e.target.value)} className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" />
                                {editForm.errors.phone_e164 && <p className="text-xs text-admin-danger mt-1">{editForm.errors.phone_e164}</p>}
                            </div>
                            <div className="flex justify-end gap-2 mt-6 mb-6">
                                <button type="button" onClick={() => setEditingCustomer(null)} className="px-4 py-2 text-sm font-bold text-admin-text hover:bg-admin-surface-muted rounded-xl transition">Cancel</button>
                                <button type="submit" disabled={editForm.processing} className="px-4 py-2 text-sm font-bold bg-admin-primary text-white rounded-xl shadow-lg hover:bg-admin-primary/90 transition disabled:opacity-50">Save Changes</button>
                            </div>

                            <div className="pt-6 border-t border-admin-border/50 flex flex-col gap-3">
                                <h3 className="text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-1">Advanced Actions</h3>
                                <button type="button" onClick={() => { setResettingCustomer(editingCustomer); setEditingCustomer(null); }} className="w-full px-4 py-3 text-sm font-bold text-left text-yellow-600 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20 rounded-xl transition-colors">
                                    Reset Password
                                </button>
                                <button type="button" onClick={() => { toggleStatus(editingCustomer); setEditingCustomer(null); }} className="w-full px-4 py-3 text-sm font-bold text-left text-admin-text bg-admin-surface-muted hover:bg-admin-border/50 rounded-xl transition-colors">
                                    {editingCustomer.account_status === 'frozen' ? 'Unfreeze Account' : 'Freeze Account'}
                                </button>
                                <button type="button" onClick={() => { deleteCustomer(editingCustomer); setEditingCustomer(null); }} className="w-full px-4 py-3 text-sm font-bold text-left text-admin-danger bg-admin-danger/10 hover:bg-admin-danger/20 rounded-xl transition-colors">
                                    Delete Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resettingCustomer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-admin-surface rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Reset Password for {resettingCustomer.name}</h2>
                        <form onSubmit={submitPasswordReset} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">New Password</label>
                                <input type="password" value={passwordForm.data.password} onChange={e => passwordForm.setData('password', e.target.value)} className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" />
                                {passwordForm.errors.password && <p className="text-xs text-admin-danger mt-1">{passwordForm.errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Confirm New Password</label>
                                <input type="password" value={passwordForm.data.password_confirmation} onChange={e => passwordForm.setData('password_confirmation', e.target.value)} className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-2 text-admin-text focus:ring-2 focus:ring-admin-primary/50" />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => { setResettingCustomer(null); passwordForm.reset(); }} className="px-4 py-2 text-sm font-bold text-admin-text hover:bg-admin-surface-muted rounded-xl transition">Cancel</button>
                                <button type="submit" disabled={passwordForm.processing} className="px-4 py-2 text-sm font-bold bg-admin-danger text-white rounded-xl shadow-lg hover:bg-admin-danger/90 transition disabled:opacity-50">Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Custom Confirm Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-admin-surface rounded-2xl w-full max-w-sm shadow-2xl p-6 relative text-center">
                        <div className="w-16 h-16 bg-admin-surface-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-admin-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-admin-text mb-2">Are you sure?</h2>
                        <p className="text-sm text-admin-text-muted mb-6">{confirmAction.message}</p>
                        <div className="flex justify-center gap-3">
                            <button type="button" onClick={() => setConfirmAction(null)} className="px-5 py-2.5 text-sm font-bold text-admin-text bg-admin-surface-muted hover:bg-admin-border/50 rounded-xl transition">Cancel</button>
                            <button type="button" onClick={executeConfirmAction} className={`px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition ${confirmAction.buttonClass} hover:opacity-90`}>{confirmAction.action}</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
