import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

interface Stats {
    revenue: number;
    revenue_growth: number;
    orders: number;
    pending_orders: number;
    new_customers: number;
    aov: number;
    low_stock: number;
    out_of_stock: number;
    total_products: number;
}

interface Order {
    id: number;
    number: string;
    customer: string;
    total: number;
    status: string;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    stock: number;
    slug: string;
}

interface TopProduct {
    id: number;
    name: string;
    sold: number;
    revenue: number;
}

interface ChartPoint {
    date: string;
    revenue: number;
    orders: number;
}

interface Props {
    stats: Stats;
    revenue_chart: ChartPoint[];
    recent_orders: Order[];
    low_stock_products: Product[];
    top_products: TopProduct[];
    period: string;
}

const statusColors: Record<string, string> = {
    pending: 'bg-admin-warning/10 text-admin-warning',
    processing: 'bg-admin-primary/10 text-admin-primary',
    shipped: 'bg-admin-secondary/10 text-admin-secondary',
    completed: 'bg-admin-success/10 text-admin-success',
    cancelled: 'bg-admin-danger/10 text-admin-danger',
    refunded: 'bg-admin-surface-muted text-admin-text-muted',
};

function StatCard({
    label,
    value,
    sub,
    icon,
    trend,
    trendLabel,
    color = 'indigo',
}: {
    label: string;
    value: string;
    sub?: string;
    icon: string;
    trend?: number;
    trendLabel?: string;
    color?: string;
}) {
    const colorMap: Record<string, string> = {
        indigo: 'bg-admin-primary/10 text-admin-primary',
        green: 'bg-admin-success/10 text-admin-success',
        amber: 'bg-admin-warning/10 text-admin-warning',
        red: 'bg-admin-danger/10 text-admin-danger',
        blue: 'bg-admin-secondary/10 text-admin-secondary',
    };

    return (
        <div className="bg-admin-surface rounded-2xl border border-admin-border/50 p-6 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-md hover:shadow-admin-border/50 shadow-sm shadow-admin-border/20 transition-all duration-200">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color] || colorMap.indigo}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-admin-text-muted mb-1">{label}</p>
                <p className="text-3xl font-bold text-admin-text tracking-tight leading-none">{value}</p>
                {(trend !== undefined || sub) && (
                    <div className="flex items-center gap-2 mt-2">
                        {trend !== undefined && (
                            <span className={`text-xs font-semibold flex items-center gap-1 ${trend >= 0 ? 'text-admin-success' : 'text-admin-danger'}`}>
                                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                        )}
                        {trendLabel && <span className="text-xs font-medium text-admin-text-muted">{trendLabel}</span>}
                        {sub && <span className="text-xs font-medium text-admin-text-muted">{sub}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dashboard({ stats, revenue_chart, recent_orders, low_stock_products, top_products, period }: Props) {
    const formatCurrency = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const changePeriod = (p: string) => {
        router.get('/admin', { period: p }, { preserveState: true });
    };

    // Simple inline chart using SVG
    const chartWidth = 600;
    const chartHeight = 80;
    const maxRevenue = Math.max(...revenue_chart.map(d => d.revenue), 1);
    const points = revenue_chart.map((d, i) => {
        const x = (i / Math.max(revenue_chart.length - 1, 1)) * chartWidth;
        const y = chartHeight - (d.revenue / maxRevenue) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = revenue_chart.length > 0
        ? `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`
        : '';

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard — Rafel CMS" />

            {/* Period Filter */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Store Overview</h1>
                    <p className="text-sm text-admin-text-muted mt-1">All times shown in Cambodia Time (GMT+7)</p>
                </div>
                <div className="flex items-center bg-admin-surface border border-admin-border/60 rounded-xl p-1 gap-1 shadow-sm shadow-admin-border/20">
                    {[
                        { label: '7D', value: '7' },
                        { label: '30D', value: '30' },
                        { label: '90D', value: '90' },
                    ].map(p => (
                        <button
                            key={p.value}
                            onClick={() => changePeriod(p.value)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                period === p.value
                                    ? 'bg-admin-primary text-white shadow-sm shadow-admin-primary/30'
                                    : 'text-admin-text-muted hover:bg-admin-surface-muted hover:text-admin-text'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <StatCard
                    label="Total Revenue"
                    value={formatCurrency(stats.revenue)}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    trend={stats.revenue_growth}
                    trendLabel="vs previous period"
                    color="indigo"
                />
                <StatCard
                    label="Orders"
                    value={stats.orders.toString()}
                    sub={`${stats.pending_orders} pending`}
                    icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    color="blue"
                />
                <StatCard
                    label="New Customers"
                    value={stats.new_customers.toString()}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    color="green"
                />
                <StatCard
                    label="Avg. Order Value"
                    value={formatCurrency(stats.aov)}
                    icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    color="indigo"
                />
            </div>

            {/* Stock Alerts */}
            {(stats.low_stock > 0 || stats.out_of_stock > 0) && (
                <div className="flex flex-wrap gap-3 mb-6">
                    {stats.out_of_stock > 0 && (
                        <Link
                            href="/admin/products?stock=out"
                            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {stats.out_of_stock} product{stats.out_of_stock !== 1 ? 's' : ''} out of stock
                        </Link>
                    )}
                    {stats.low_stock > 0 && (
                        <Link
                            href="/admin/products?stock=low"
                            className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-amber-100 transition-colors"
                        >
                            <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            {stats.low_stock} product{stats.low_stock !== 1 ? 's' : ''} running low
                        </Link>
                    )}
                </div>
            )}

            {/* Revenue Chart */}
            {revenue_chart.length > 0 && (
                <div className="bg-admin-surface rounded-2xl border border-admin-border/50 p-6 mb-8 shadow-sm shadow-admin-border/20">
                    <h2 className="text-lg font-bold text-admin-text tracking-tight mb-6">Revenue Over Time</h2>
                    <div className="w-full overflow-hidden">
                        <svg
                            viewBox={`0 0 ${chartWidth} ${chartHeight + 10}`}
                            className="w-full drop-shadow-sm"
                            preserveAspectRatio="none"
                            style={{ height: 100 }}
                        >
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--admin-primary, #0F9F84)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="var(--admin-primary, #0F9F84)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {areaPoints && (
                                <polygon points={areaPoints} fill="url(#chartGrad)" />
                            )}
                            {points && (
                                <polyline
                                    points={points}
                                    fill="none"
                                    stroke="var(--admin-primary, #0F9F84)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                        </svg>
                        <div className="flex justify-between mt-3 text-sm font-medium text-admin-text-muted">
                            {revenue_chart.length > 0 && <span>{revenue_chart[0]?.date}</span>}
                            {revenue_chart.length > 1 && <span>{revenue_chart[revenue_chart.length - 1]?.date}</span>}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border">
                        <h2 className="text-lg font-bold text-admin-text tracking-tight">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-admin-primary hover:text-admin-primary-hover font-semibold transition-colors">
                            View all &rarr;
                        </Link>
                    </div>
                    {recent_orders.length === 0 ? (
                        <div className="text-center py-12 text-admin-text-muted">
                            <svg className="w-10 h-10 mx-auto mb-3 text-admin-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm font-medium">No orders yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-admin-border bg-admin-surface-muted/50">
                                        <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Order</th>
                                        <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Customer</th>
                                        <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Status</th>
                                        <th className="text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-admin-border/50">
                                    {recent_orders.map(order => (
                                        <tr key={order.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-admin-primary">{order.number}</td>
                                            <td className="px-6 py-4 font-medium text-admin-text">{order.customer}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusColors[order.status] || 'bg-admin-surface-muted text-admin-text-muted'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-admin-text tracking-tight">{formatCurrency(order.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                    {/* Low Stock */}
                    <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border">
                            <h2 className="text-lg font-bold text-admin-text tracking-tight">Low Stock</h2>
                            <Link href="/admin/products" className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors">
                                Manage &rarr;
                            </Link>
                        </div>
                        {low_stock_products.length === 0 ? (
                            <div className="px-6 py-8 text-center text-admin-text-muted text-sm font-medium">All products are well stocked ✓</div>
                        ) : (
                            <ul className="divide-y divide-admin-border/50">
                                {low_stock_products.map(p => (
                                    <li key={p.id} className="flex items-center justify-between px-6 py-4">
                                        <span className="text-sm font-medium text-admin-text truncate flex-1">{p.name}</span>
                                        <span className={`text-xs font-bold ml-3 px-3 py-1 rounded-full tracking-wide uppercase ${p.stock === 0 ? 'bg-admin-danger/10 text-admin-danger' : 'bg-admin-warning/10 text-admin-warning'}`}>
                                            {p.stock === 0 ? 'Out' : `${p.stock} left`}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Top Products */}
                    {top_products.length > 0 && (
                        <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                            <div className="px-6 py-5 border-b border-admin-border">
                                <h2 className="text-lg font-bold text-admin-text tracking-tight">Top Products</h2>
                            </div>
                            <ul className="divide-y divide-admin-border/50">
                                {top_products.map((p, i) => (
                                    <li key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-admin-surface-muted/30 transition-colors">
                                        <span className="text-sm font-bold text-admin-text-muted/60 w-5 text-center">{i + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-admin-text truncate">{p.name}</p>
                                            <p className="text-xs font-medium text-admin-text-muted mt-0.5">{p.sold} sold</p>
                                        </div>
                                        <span className="text-sm font-bold text-admin-text tracking-tight">${Number(p.revenue).toFixed(0)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
