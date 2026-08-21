import { Head, router, useForm } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
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

type Settings = {
    cms_max_failed_attempts: number;
    cms_lockout_duration_minutes: string;
};

export default function AccessControl({ blocks = [], attempts = [], settings }: { blocks: Block[]; attempts: Attempt[]; settings: Settings }) {
    const { data: settingsData, setData: setSettingsData, post: postSettings, processing: settingsProcessing } = useForm({
        cms_max_failed_attempts: settings?.cms_max_failed_attempts || 10,
        cms_lockout_duration_minutes: settings?.cms_lockout_duration_minutes || 'forever',
    });

    const { data: blockData, setData: setBlockData, post: postBlock, processing: blockProcessing, reset: resetBlock, errors: blockErrors } = useForm({
        type: 'ip',
        value: '',
        reason: 'Manual Block',
        duration: 'forever',
    });

    const releaseBlock = async (block: Block) => {
        if (!(await confirmAction('Release this CMS security block?'))) return;
        router.delete(`/admin/security/access-control/${block.id}`);
    };

    const submitSettings = (e: React.FormEvent) => {
        e.preventDefault();
        postSettings('/admin/security/access-control/settings');
    };

    const submitBlock = (e: React.FormEvent) => {
        e.preventDefault();
        postBlock('/admin/security/access-control', {
            onSuccess: () => resetBlock(),
        });
    };

    return (
        <AdminLayout title="Security Access Control">
            <Head title="Security Access Control" />

            <div className="space-y-8">
                <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-admin-primary">CMS Security</p>
                    <h1 className="mt-2 text-3xl font-black text-admin-text">Access Control</h1>
                    <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-admin-text-muted">
                        Configure CMS login failure limits, review temporary blocks, and manually block suspicious IPs.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Security Settings Form */}
                    <section className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-black text-admin-text">Rate Limiting Settings</h2>
                        <form onSubmit={submitSettings} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-bold text-admin-text">Max Failed Login Attempts (Last 30 mins)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                    value={settingsData.cms_max_failed_attempts}
                                    onChange={e => setSettingsData('cms_max_failed_attempts', parseInt(e.target.value) || 10)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-bold text-admin-text">Lockout Duration (minutes, or "forever")</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                    value={settingsData.cms_lockout_duration_minutes}
                                    onChange={e => setSettingsData('cms_lockout_duration_minutes', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="pt-2 text-right">
                                <button type="submit" disabled={settingsProcessing} className="rounded-xl bg-admin-primary px-5 py-2 font-black text-white hover:bg-admin-primary-hover disabled:opacity-50">
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Manual Block Form */}
                    <section className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-black text-admin-text">Add Manual Block</h2>
                        <form onSubmit={submitBlock} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-bold text-admin-text">Type</label>
                                    <select
                                        className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                        value={blockData.type}
                                        onChange={e => setBlockData('type', e.target.value)}
                                    >
                                        <option value="ip">IP Address</option>
                                        <option value="email">Email Address</option>
                                        <option value="device">Device Hash</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-bold text-admin-text">Duration (minutes)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                        value={blockData.duration}
                                        onChange={e => setBlockData('duration', e.target.value)}
                                        placeholder="forever"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-bold text-admin-text">Value (IP/Email/Hash)</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                    value={blockData.value}
                                    onChange={e => setBlockData('value', e.target.value)}
                                    required
                                />
                                {blockErrors.value && <p className="mt-1 text-sm text-red-500">{blockErrors.value}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-bold text-admin-text">Reason</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 text-admin-text focus:border-admin-primary focus:ring-1 focus:ring-admin-primary"
                                    value={blockData.reason}
                                    onChange={e => setBlockData('reason', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="pt-2 text-right">
                                <button type="submit" disabled={blockProcessing} className="rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700 disabled:opacity-50">
                                    Block Access
                                </button>
                            </div>
                        </form>
                    </section>
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
                                    <th className="px-5 py-3">IP / Hash</th>
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
                                        <td className="px-5 py-4 font-mono text-admin-text-muted">{block.ip_address || block.device_hash || 'Any'}</td>
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
