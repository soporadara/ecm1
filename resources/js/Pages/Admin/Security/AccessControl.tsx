import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

type Block = {
    id: number;
    masked_email?: string;
    ip_address?: string;
    device_hash?: string;
    reason: string;
    starts_at: string;
    expires_at?: string | null;
    internal_note?: string | null;
};

type Attempt = {
    id: number;
    masked_email?: string;
    ip_address?: string;
    device_hash?: string;
    failure_category: string;
    attempted_at: string;
};

export default function AccessControl({ blocks = [], attempts = [] }: { blocks: Block[]; attempts: Attempt[] }) {
    const releaseBlock = (block: Block) => {
        if (!confirm('Release this CMS security block?')) return;
        router.delete(`/admin/security/access-control/${block.id}`);
    };

    return (
        <AdminLayout title="Security Access Control">
            <Head title="Security Access Control" />

            <div className="space-y-8">
                <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-admin-primary">CMS Security</p>
                    <h1 className="mt-2 text-3xl font-black text-admin-text">Access Control</h1>
                    <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-admin-text-muted">
                        Review temporary CMS login blocks and recent failed staff-login attempts. Customer Firebase login attempts are intentionally separate.
                    </p>
                </div>

                <section className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm">
                    <div className="border-b border-admin-border px-5 py-4">
                        <h2 className="text-xl font-black text-admin-text">Active Blocks</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-admin-border text-sm">
                            <thead className="bg-admin-surface-muted text-left text-xs font-black uppercase tracking-wider text-admin-text-muted">
                                <tr>
                                    <th className="px-5 py-3">Email</th>
                                    <th className="px-5 py-3">IP</th>
                                    <th className="px-5 py-3">Reason</th>
                                    <th className="px-5 py-3">Expires</th>
                                    <th className="px-5 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border">
                                {blocks.length === 0 && (
                                    <tr><td className="px-5 py-8 text-center font-bold text-admin-text-muted" colSpan={5}>No active blocks.</td></tr>
                                )}
                                {blocks.map((block) => (
                                    <tr key={block.id}>
                                        <td className="px-5 py-4 font-bold text-admin-text">{block.masked_email || 'Any'}</td>
                                        <td className="px-5 py-4 font-mono text-admin-text-muted">{block.ip_address || 'Any'}</td>
                                        <td className="px-5 py-4 font-bold text-admin-text-muted">{block.reason}</td>
                                        <td className="px-5 py-4 text-admin-text-muted">{block.expires_at || 'Permanent'}</td>
                                        <td className="px-5 py-4 text-right">
                                            <button onClick={() => releaseBlock(block)} className="rounded-xl bg-admin-primary px-4 py-2 text-sm font-black text-white hover:bg-admin-primary-hover">
                                                Unblock
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm">
                    <div className="border-b border-admin-border px-5 py-4">
                        <h2 className="text-xl font-black text-admin-text">Recent Failed Attempts</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-admin-border text-sm">
                            <thead className="bg-admin-surface-muted text-left text-xs font-black uppercase tracking-wider text-admin-text-muted">
                                <tr>
                                    <th className="px-5 py-3">Email</th>
                                    <th className="px-5 py-3">IP</th>
                                    <th className="px-5 py-3">Category</th>
                                    <th className="px-5 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border">
                                {attempts.length === 0 && (
                                    <tr><td className="px-5 py-8 text-center font-bold text-admin-text-muted" colSpan={4}>No failed attempts recorded.</td></tr>
                                )}
                                {attempts.map((attempt) => (
                                    <tr key={attempt.id}>
                                        <td className="px-5 py-4 font-bold text-admin-text">{attempt.masked_email || 'Unknown'}</td>
                                        <td className="px-5 py-4 font-mono text-admin-text-muted">{attempt.ip_address || 'Unknown'}</td>
                                        <td className="px-5 py-4 font-bold text-admin-text-muted">{attempt.failure_category}</td>
                                        <td className="px-5 py-4 text-admin-text-muted">{attempt.attempted_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
