import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Props {
    customers: { id: number; name: string; customer_code: string }[];
}

export default function Reports({ customers }: Props) {
    const { data, setData, get, processing, errors } = useForm({
        type: 'revenue',
        format: 'pdf',
        start_date: '',
        end_date: '',
        customer_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        params.append('type', data.type);
        params.append('format', data.format);
        if (data.start_date) params.append('start_date', data.start_date);
        if (data.end_date) params.append('end_date', data.end_date);
        if (data.type === 'customer_activity' && data.customer_id) params.append('customer_id', data.customer_id);

        window.location.href = `/admin/logistics/reports/generate?${params.toString()}`;
    };

    return (
        <AdminLayout title="Logistics Reports">
            <Head title="Reports — Logistics CRM" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-admin-text tracking-tight">Reports Generator</h1>
                <p className="text-sm text-admin-text-muted mt-1">Export detailed business metrics and customer activities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-admin-surface rounded-2xl border border-admin-border/50 p-6 shadow-sm shadow-admin-border/20">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text mb-2">Report Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${data.type === 'revenue' ? 'border-admin-primary bg-admin-primary/5 text-admin-primary' : 'border-admin-border hover:bg-admin-surface-muted text-admin-text-muted'}`}>
                                    <input type="radio" name="type" value="revenue" className="hidden" checked={data.type === 'revenue'} onChange={e => setData('type', e.target.value)} />
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    <span className="font-semibold text-sm">Business Revenue</span>
                                </label>
                                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${data.type === 'customer_activity' ? 'border-admin-primary bg-admin-primary/5 text-admin-primary' : 'border-admin-border hover:bg-admin-surface-muted text-admin-text-muted'}`}>
                                    <input type="radio" name="type" value="customer_activity" className="hidden" checked={data.type === 'customer_activity'} onChange={e => setData('type', e.target.value)} />
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    <span className="font-semibold text-sm">Customer Activity</span>
                                </label>
                            </div>
                        </div>

                        {data.type === 'customer_activity' && (
                            <div>
                                <label className="block text-sm font-bold text-admin-text mb-2">Select Customer <span className="text-admin-danger">*</span></label>
                                <select 
                                    className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text focus:ring-2 focus:ring-admin-primary"
                                    value={data.customer_id}
                                    onChange={e => setData('customer_id', e.target.value)}
                                    required={data.type === 'customer_activity'}
                                >
                                    <option value="">-- Select Customer --</option>
                                    {customers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.customer_code})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text mb-2">Start Date (Optional)</label>
                                <input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text mb-2">End Date (Optional)</label>
                                <input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-admin-text mb-2">Export Format</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-admin-text cursor-pointer">
                                    <input type="radio" name="format" value="pdf" checked={data.format === 'pdf'} onChange={e => setData('format', e.target.value)} className="text-admin-primary focus:ring-admin-primary" />
                                    <span>PDF Document</span>
                                </label>
                                <label className="flex items-center gap-2 text-admin-text cursor-pointer">
                                    <input type="radio" name="format" value="csv" checked={data.format === 'csv'} onChange={e => setData('format', e.target.value)} className="text-admin-primary focus:ring-admin-primary" />
                                    <span>CSV Data File</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" disabled={processing} className="w-full px-6 py-3 bg-admin-primary text-white font-bold rounded-lg shadow hover:bg-admin-primary-hover transition-colors flex justify-center items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Generate & Download
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-admin-primary/10 text-admin-primary p-6 rounded-2xl border border-admin-primary/20">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            About Reports
                        </h3>
                        <p className="text-sm font-medium mb-4">
                            Reports are generated in real-time based on your manual orders data. Choose the appropriate format for your needs:
                        </p>
                        <ul className="text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-admin-primary-hover">&bull;</span>
                                <span><strong>PDF:</strong> Best for printing, presenting to management, or sending to customers. It is fully formatted and styled.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-admin-primary-hover">&bull;</span>
                                <span><strong>CSV:</strong> Best for importing into Excel or other spreadsheet tools for further custom data analysis and chart generation.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
