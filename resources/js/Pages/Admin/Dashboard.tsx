import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ auth }: any) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />
            
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Sales</h3>
                    <p className="text-3xl font-bold text-gray-900">$1,250.00</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Active Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-900">48</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                </div>
                <div className="p-6 text-center text-gray-500 py-12">
                    Orders will appear here once customers start purchasing.
                </div>
            </div>
        </AdminLayout>
    );
}
