import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AuditLogsIndex({ logs }: any) {
    const { delete: destroy } = useForm();
    const { auth } = usePage().props as any;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClear = () => {
        destroy('/admin/audit-logs/clear', {
            preserveScroll: true,
            onSuccess: () => toast.success('All audit logs have been cleared.')
        });
    };

    const isSuperAdmin = auth?.user?.role === 'super_admin' || auth?.user?.role === 'superadmin' || auth?.user?.roles?.includes('Super Administrator');

    return (
        <AdminLayout title="Audit Logs">
            <Head title="Audit Logs - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Audit Logs</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Recent admin and system activity.</p>
                </div>
                {isSuperAdmin && (
                    <button 
                        onClick={() => setShowConfirm(true)} 
                        className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 px-4 py-2 rounded-xl font-bold transition-colors text-sm"
                    >
                        Clear All Logs
                    </button>
                )}
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Action</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Target</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">User</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">IP</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {logs.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-admin-text-muted font-medium">
                                        No audit logs found.
                                    </td>
                                </tr>
                            ) : (
                                logs.data.map((log: any) => (
                                    <tr key={log.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-admin-text">{log.action}</td>
                                        <td className="px-6 py-4 text-admin-text-muted">
                                            {log.target_type || 'System'}{log.target_id ? ` #${log.target_id}` : ''}
                                        </td>
                                        <td className="px-6 py-4 text-admin-text-muted">{log.user?.name || 'System'}</td>
                                        <td className="px-6 py-4 text-admin-text-muted">{log.ip_address || '-'}</td>
                                        <td className="px-6 py-4 text-admin-text-muted whitespace-nowrap">{log.created_at}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {logs.total > logs.per_page && (
                <div className="mt-6 flex gap-2">
                    {logs.links.map((link: any, idx: number) => (
                        <Link
                            key={idx}
                            href={link.url || '#'}
                            className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${
                                link.active
                                    ? 'bg-admin-primary text-white border-admin-primary'
                                    : 'bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-admin-surface border border-admin-border rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-admin-text mb-2">Clear Audit Logs?</h3>
                        <p className="text-admin-text-muted mb-6 text-sm leading-relaxed">
                            Are you sure you want to clear ALL audit logs? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded-xl text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleClear();
                                }}
                                className="px-4 py-2 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-colors"
                            >
                                Yes, clear them
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
