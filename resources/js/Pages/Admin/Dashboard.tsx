import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

interface Stats {
    total_customers: number;
    total_manual_orders: number;
    total_products_sold: number;
    total_revenue: number;
    pending_orders: number;
    in_progress_orders: number;
    delivered_orders: number;
    unpaid_orders: number;
    paid_orders: number;
}

interface Order {
    id: number;
    number: string;
    customer: string;
    customer_code: string;
    total: number;
    status: string;
    payment_status: string;
    created_at: string;
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
    date: string;
}

const statusColors: Record<string, string> = {
    pending: 'bg-admin-warning/10 text-admin-warning',
    processing: 'bg-admin-primary/10 text-admin-primary',
    packed: 'bg-indigo-500/10 text-indigo-500',
    shipping: 'bg-admin-secondary/10 text-admin-secondary',
    delivered: 'bg-admin-success/10 text-admin-success',
    cancelled: 'bg-admin-danger/10 text-admin-danger',
};

const paymentColors: Record<string, string> = {
    unpaid: 'bg-admin-danger/10 text-admin-danger',
    partial: 'bg-admin-warning/10 text-admin-warning',
    paid: 'bg-admin-success/10 text-admin-success',
    refunded: 'bg-admin-surface-muted text-admin-text-muted',
};

function StatCard({
    label,
    value,
    sub,
    icon,
    color = 'indigo',
}: {
    label: string;
    value: string;
    sub?: string;
    icon: string;
    color?: string;
}) {
    const colorMap: Record<string, string> = {
        indigo: 'bg-admin-primary/10 text-admin-primary',
        green: 'bg-admin-success/10 text-admin-success',
        amber: 'bg-admin-warning/10 text-admin-warning',
        red: 'bg-admin-danger/10 text-admin-danger',
        blue: 'bg-admin-secondary/10 text-admin-secondary',
        purple: 'bg-purple-500/10 text-purple-500',
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
                {sub && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-admin-text-muted">{sub}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dashboard({ stats, revenue_chart, recent_orders, date }: Props) {
    const formatCurrency = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const changeDate = (d: string) => {
        router.get('/admin', { date: d }, { preserveState: true });
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
        <AdminLayout title="Logistics CRM Overview">
            <Head title="Logistics Overview — Rafel CMS" />

            {/* Date Filter */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Logistics CRM Overview</h1>
                    <p className="text-sm text-admin-text-muted mt-1">Key metrics for manual orders and customers.</p>
                </div>
                <div className="flex items-center bg-admin-surface border border-admin-border/60 rounded-xl px-4 py-2 gap-4 shadow-sm shadow-admin-border/20">
                    <span className="text-sm font-bold text-admin-text-muted uppercase tracking-wider">Date</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => changeDate(e.target.value)}
                        className="bg-admin-surface-muted/30 border-none rounded-lg text-admin-text font-bold text-sm focus:ring-0 cursor-pointer px-3 py-1.5"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <StatCard
                    label="Total Revenue"
                    value={formatCurrency(stats.total_revenue)}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="indigo"
                />
                <StatCard
                    label="Customers"
                    value={stats.total_customers.toString()}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    color="green"
                />
                <StatCard
                    label="Manual Orders"
                    value={stats.total_manual_orders.toString()}
                    sub={`${stats.pending_orders} pending`}
                    icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    color="blue"
                />
                <StatCard
                    label="Products Sold"
                    value={stats.total_products_sold.toString()}
                    icon="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <StatCard
                    label="Pending Orders"
                    value={stats.pending_orders.toString()}
                    icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="amber"
                />
                <StatCard
                    label="In Progress"
                    value={stats.in_progress_orders.toString()}
                    icon="M13 10V3L4 14h7v7l9-11h-7z"
                    color="indigo"
                />
                <StatCard
                    label="Delivered"
                    value={stats.delivered_orders.toString()}
                    icon="M5 13l4 4L19 7"
                    color="green"
                />
                <StatCard
                    label="Unpaid Orders"
                    value={stats.unpaid_orders.toString()}
                    sub={`${stats.paid_orders} paid`}
                    icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    color="red"
                />
            </div>

            {/* Revenue Chart */}
            {revenue_chart.length > 0 && (
                <div className="bg-admin-surface rounded-2xl border border-admin-border/50 p-6 mb-8 shadow-sm shadow-admin-border/20">
                    <h2 className="text-lg font-bold text-admin-text tracking-tight mb-6">Paid Revenue Over Time</h2>
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
            <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border">
                    <h2 className="text-lg font-bold text-admin-text tracking-tight">Recent Manual Orders</h2>
                    <Link href="/admin/logistics/orders" className="text-sm text-admin-primary hover:text-admin-primary-hover font-semibold transition-colors">
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
                                    <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Payment</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border/50">
                                {recent_orders.map(order => (
                                    <tr key={order.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-admin-primary">{order.number}</td>
                                        <td className="px-6 py-4 font-medium text-admin-text">
                                            {order.customer}
                                            <span className="block text-xs text-admin-text-muted font-normal">{order.customer_code}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusColors[order.status] || 'bg-admin-surface-muted text-admin-text-muted'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${paymentColors[order.payment_status] || 'bg-admin-surface-muted text-admin-text-muted'}`}>
                                                {order.payment_status}
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
        </AdminLayout>
    );
}
