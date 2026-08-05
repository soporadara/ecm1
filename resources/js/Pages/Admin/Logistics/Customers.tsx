import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Customer {
    id: number;
    customer_code: string;
    name: string;
    email: string;
    phone: string;
    total_orders: number;
    last_order_date: string;
}

interface Props {
    customers: {
        data: Customer[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
    };
    filters: {
        search?: string;
        start_date?: string;
        end_date?: string;
    };
}

export default function Customers({ customers, filters }: Props) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [startDate, setStartDate] = React.useState(filters.start_date || '');
    const [endDate, setEndDate] = React.useState(filters.end_date || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/logistics/customers', { search, start_date: startDate, end_date: endDate }, { preserveState: true });
    };

    return (
        <AdminLayout title="Logistics CRM - Customers">
            <Head title="Customers — Logistics CRM" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Logistics Customers</h1>
                    <p className="text-sm text-admin-text-muted mt-1">Select a customer to view or manage their manual orders.</p>
                </div>
            </div>

            <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                <div className="p-4 border-b border-admin-border bg-admin-surface-muted/30">
                    <form onSubmit={handleSearch} className="flex flex-wrap gap-3 max-w-3xl items-center">
                        <div className="relative flex-1 min-w-[200px]">
                            <input
                                type="text"
                                placeholder="Search code, name, phone, email..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-sm font-medium placeholder:font-normal"
                            />
                            <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-muted/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="px-3 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary"
                                title="Start Date"
                            />
                            <span className="text-admin-text-muted text-sm font-medium">to</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="px-3 py-2 border border-admin-border/60 rounded-xl bg-white shadow-sm text-admin-text text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary"
                                title="End Date"
                            />
                        </div>
                        <button type="submit" className="px-5 py-2 bg-admin-primary text-white text-sm font-semibold rounded-xl hover:bg-admin-primary-hover shadow-sm transition-colors">
                            Filter
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-admin-surface-muted/50 border-b border-admin-border">
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider w-16">Nº</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Customer Code</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Customer Name</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Contact Info</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Total Orders</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Last Order Date</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {customers.data.map((customer, idx) => (
                                <tr key={customer.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-admin-text-muted">
                                        {(customers.current_page - 1) * customers.per_page + idx + 1}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-admin-primary">{customer.customer_code || 'N/A'}</td>
                                    <td className="px-6 py-4 font-semibold text-admin-text">{customer.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-admin-text">{customer.phone || 'No phone'}</div>
                                        <div className="text-xs text-admin-text-muted mt-1">{customer.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-admin-secondary/10 text-admin-secondary font-bold text-xs">
                                            {customer.total_orders} Orders
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-admin-text-muted font-medium">{customer.last_order_date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            href={`/admin/logistics/customers/${customer.id}/orders`}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-admin-primary/10 text-admin-primary hover:bg-admin-primary hover:text-white rounded-lg text-sm font-semibold transition-all whitespace-nowrap shadow-sm hover:shadow"
                                        >
                                            View Orders
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {customers.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-admin-text-muted">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {customers.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-admin-border flex items-center justify-between">
                        <span className="text-sm text-admin-text-muted">
                            Showing page {customers.current_page} of {customers.last_page}
                        </span>
                        <div className="flex gap-2">
                            {customers.links.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        link.active 
                                        ? 'bg-admin-primary text-white' 
                                        : 'bg-admin-surface-muted text-admin-text-muted hover:text-admin-text'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
