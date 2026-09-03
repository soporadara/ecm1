import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface QuoteRequest {
    id: number;
    description: string;
    name: string;
    phone: string;
    email: string | null;
    status: 'pending' | 'quoted' | 'closed';
    created_at: string;
}

interface Props {
    quotes: {
        data: QuoteRequest[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    statuses: string[];
}

export default function Index({ quotes, filters, statuses }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search !== (filters.search || '') || status !== (filters.status || '')) {
                router.get(
                    route('admin.quote-requests.index'),
                    { search, status },
                    { preserveState: true, preserveScroll: true }
                );
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [search, status]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const updateStatus = (id: number, newStatus: string) => {
        router.put(route('admin.quote-requests.update', id), { status: newStatus }, {
            preserveScroll: true,
        });
    };

    const deleteQuote = (id: number) => {
        if (confirm('Are you sure you want to delete this quote request?')) {
            router.delete(route('admin.quote-requests.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'quoted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AdminLayout>
            <Head title="Quote Requests" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Quote Requests</h1>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-6">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="border-b border-slate-200 p-4 dark:border-slate-800 sm:flex sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-1 items-center gap-4">
                                <div className="relative max-w-xs flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={onSearchChange}
                                        className="block w-full rounded-lg border-0 py-2 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                                        placeholder="Search requests..."
                                    />
                                </div>
                                <select
                                    value={status}
                                    onChange={onStatusChange}
                                    className="block rounded-lg border-0 py-2 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                                >
                                    <option value="">All Statuses</option>
                                    {statuses.map(s => (
                                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-6">Contact</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Description</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Date</th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                                    {quotes.data.map((quote) => (
                                        <tr key={quote.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="font-medium text-slate-900 dark:text-white">{quote.name}</div>
                                                <div className="text-slate-500">{quote.phone}</div>
                                                {quote.email && <div className="text-slate-500">{quote.email}</div>}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-md">
                                                <div className="font-medium text-slate-900 dark:text-white whitespace-pre-wrap">{quote.description}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <select
                                                    value={quote.status}
                                                    onChange={(e) => updateStatus(quote.id, e.target.value)}
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-brand-primary cursor-pointer ${getStatusColor(quote.status)}`}
                                                >
                                                    {statuses.map(s => (
                                                        <option key={s} value={s}>{s.toUpperCase()}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(quote.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    onClick={() => deleteQuote(quote.id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ml-4"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {quotes.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                                                No quote requests found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
