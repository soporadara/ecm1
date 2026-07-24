import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AuditLogsIndex({ logs }: any) {
    return (
        <AdminLayout title="Audit Logs">
            <Head title="Audit Logs - Admin" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-admin-text tracking-tight">Audit Logs</h1>
                <p className="text-sm font-medium text-admin-text-muted mt-1">Recent admin and system activity.</p>
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
        </AdminLayout>
    );
}
