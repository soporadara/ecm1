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
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-600',
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
        indigo: 'bg-indigo-50 text-indigo-600',
        green: 'bg-green-50 text-green-600',
        amber: 'bg-amber-50 text-amber-600',
        red: 'bg-red-50 text-red-600',
        blue: 'bg-blue-50 text-blue-600',
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[color] || colorMap.indigo}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
                <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
                {(trend !== undefined || sub) && (
                    <div className="flex items-center gap-2 mt-1.5">
                        {trend !== undefined && (
                            <span className={`text-xs font-medium flex items-center gap-0.5 ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                        )}
                        {trendLabel && <span className="text-xs text-slate-400">{trendLabel}</span>}
                        {sub && <span className="text-xs text-slate-400">{sub}</span>}
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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Store Overview</h1>
                    <p className="text-sm text-slate-500 mt-0.5">All times shown in Cambodia Time (GMT+7)</p>
                </div>
                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
                    {[
                        { label: '7D', value: '7' },
                        { label: '30D', value: '30' },
                        { label: '90D', value: '90' },
                    ].map(p => (
                        <button
                            key={p.value}
                            onClick={() => changePeriod(p.value)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                period === p.value
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
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
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
                    <h2 className="text-sm font-semibold text-slate-700 mb-4">Revenue Over Time</h2>
                    <div className="w-full overflow-hidden">
                        <svg
                            viewBox={`0 0 ${chartWidth} ${chartHeight + 10}`}
                            className="w-full"
                            preserveAspectRatio="none"
                            style={{ height: 80 }}
                        >
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {areaPoints && (
                                <polygon points={areaPoints} fill="url(#chartGrad)" />
                            )}
                            {points && (
                                <polyline
                                    points={points}
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                        </svg>
                        <div className="flex justify-between mt-2 text-xs text-slate-400">
                            {revenue_chart.length > 0 && <span>{revenue_chart[0]?.date}</span>}
                            {revenue_chart.length > 1 && <span>{revenue_chart[revenue_chart.length - 1]?.date}</span>}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-700">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                            View all →
                        </Link>
                    </div>
                    {recent_orders.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">No orders yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Order</th>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Customer</th>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                                        <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recent_orders.map(order => (
                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-indigo-600">{order.number}</td>
                                            <td className="px-5 py-3 text-slate-700">{order.customer}</td>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right font-semibold text-slate-800">{formatCurrency(order.total)}</td>
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
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-700">Low Stock</h2>
                            <Link href="/admin/products" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                Manage →
                            </Link>
                        </div>
                        {low_stock_products.length === 0 ? (
                            <div className="px-5 py-6 text-center text-slate-400 text-sm">All products are well stocked ✓</div>
                        ) : (
                            <ul className="divide-y divide-slate-50">
                                {low_stock_products.map(p => (
                                    <li key={p.id} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-sm text-slate-700 truncate flex-1">{p.name}</span>
                                        <span className={`text-xs font-bold ml-3 px-2 py-0.5 rounded-full ${p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.stock === 0 ? 'Out' : `${p.stock} left`}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Top Products */}
                    {top_products.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100">
                                <h2 className="text-sm font-semibold text-slate-700">Top Products</h2>
                            </div>
                            <ul className="divide-y divide-slate-50">
                                {top_products.map((p, i) => (
                                    <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                                        <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-700 truncate">{p.name}</p>
                                            <p className="text-xs text-slate-400">{p.sold} sold</p>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800">${Number(p.revenue).toFixed(0)}</span>
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
