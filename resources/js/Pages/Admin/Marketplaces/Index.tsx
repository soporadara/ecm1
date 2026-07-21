import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';

interface MarketplaceDomain {
    id: number;
    domain: string;
}

interface Marketplace {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    brand_color: string | null;
    website_url: string | null;
    description: string | null;
    is_enabled: boolean;
    import_enabled: boolean;
    manual_fallback_enabled: boolean;
    status: string;
    maintenance_message: string | null;
    sort_order: number;
    domains: MarketplaceDomain[];
    domains_count: number;
}

interface Props {
    marketplaces: Marketplace[];
}

const STATUS_COLORS: Record<string, string> = {
    active: '#10B981',
    maintenance: '#F59E0B',
    disabled: '#EF4444',
};

export default function MarketplacesIndex({ marketplaces }: Props) {
    const [pending, setPending] = useState<Record<number, boolean>>({});

    const toggleEnabled = (mp: Marketplace) => {
        setPending(prev => ({ ...prev, [mp.id]: true }));
        router.patch(
            `/admin/marketplaces/${mp.id}`,
            {
                name: mp.name,
                brand_color: mp.brand_color,
                website_url: mp.website_url,
                android_app_url: null,
                ios_app_url: null,
                description: mp.description,
                is_enabled: !mp.is_enabled,
                import_enabled: mp.import_enabled,
                manual_fallback_enabled: mp.manual_fallback_enabled,
                status: mp.status,
                maintenance_message: mp.maintenance_message,
                sort_order: mp.sort_order,
            },
            {
                preserveScroll: true,
                onFinish: () => setPending(prev => {
                    const next = { ...prev };
                    delete next[mp.id];
                    return next;
                }),
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Marketplaces — Admin" />

            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.375rem' }}>
                            🌐 Marketplaces
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '0.925rem' }}>
                            Manage supported marketplaces, their domains and import settings.
                        </p>
                    </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Marketplace</th>
                                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Domains</th>
                                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Import</th>
                                <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Enabled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marketplaces.map((mp, i) => (
                                <tr
                                    key={mp.id}
                                    style={{
                                        borderBottom: i < marketplaces.length - 1 ? '1px solid #F9FAFB' : 'none',
                                    }}
                                >
                                    <td style={{ padding: '1rem 1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: 40, height: 40,
                                                borderRadius: 10,
                                                background: mp.brand_color ? `${mp.brand_color}18` : '#F3F4F6',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.25rem',
                                                flexShrink: 0,
                                            }}>🛒</div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>{mp.name}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{mp.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                            {mp.domains.slice(0, 3).map(d => (
                                                <span key={d.id} style={{
                                                    background: '#F3F4F6',
                                                    color: '#374151',
                                                    padding: '0.15rem 0.5rem',
                                                    borderRadius: 4,
                                                    fontSize: '0.72rem',
                                                    fontFamily: 'monospace',
                                                }}>{d.domain}</span>
                                            ))}
                                            {mp.domains.length > 3 && (
                                                <span style={{ fontSize: '0.72rem', color: '#9CA3AF', padding: '0.15rem 0' }}>
                                                    +{mp.domains.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: 999,
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            background: `${STATUS_COLORS[mp.status] || '#9CA3AF'}18`,
                                            color: STATUS_COLORS[mp.status] || '#9CA3AF',
                                        }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[mp.status] || '#9CA3AF' }} />
                                            {mp.status.charAt(0).toUpperCase() + mp.status.slice(1)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem' }}>
                                        <span style={{
                                            fontSize: '0.78rem',
                                            color: mp.import_enabled ? '#10B981' : '#9CA3AF',
                                            fontWeight: 600,
                                        }}>
                                            {mp.import_enabled ? '✓ Enabled' : '— Disabled'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.25rem' }}>
                                        <button
                                            onClick={() => toggleEnabled(mp)}
                                            disabled={pending[mp.id]}
                                            style={{
                                                position: 'relative',
                                                width: 44,
                                                height: 24,
                                                borderRadius: 999,
                                                border: 'none',
                                                cursor: 'pointer',
                                                background: mp.is_enabled ? '#4F46E5' : '#D1D5DB',
                                                transition: 'background 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0 3px',
                                            }}
                                        >
                                            <span style={{
                                                width: 18,
                                                height: 18,
                                                background: 'white',
                                                borderRadius: '50%',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                                transform: mp.is_enabled ? 'translateX(20px)' : 'translateX(0)',
                                                transition: 'transform 0.2s',
                                            }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
