import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { useCurrency } from '../../../Contexts/CurrencyContext';
import { Search, Filter, PackageCheck, Truck, Clock, XCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MobileOrdersView({ orders, statusToneClass }: any) {
    const { t } = useTranslation();
    const { formatAmount } = useCurrency();
    const [activeTab, setActiveTab] = useState('All');
    
    const tabs = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

    const filteredOrders = activeTab === 'All' 
        ? orders.data 
        : orders.data.filter((order: any) => {
            if (activeTab === 'Pending') return order.customer_status_tone === 'amber';
            if (activeTab === 'Processing') return order.customer_status_tone === 'blue';
            if (activeTab === 'Completed') return order.customer_status_tone === 'green';
            if (activeTab === 'Cancelled') return order.customer_status_tone === 'red';
            return true;
        });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
            {/* Header & Search */}
            <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/" prefetch={['hover']} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-black text-gray-950 dark:text-white">My Orders</h1>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-[15px] text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                        />
                    </div>
                    <button className="w-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Status Tabs */}
                <div className="flex overflow-x-auto gap-2 mt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                                activeTab === tab 
                                    ? 'text-white bg-gray-900 dark:bg-white dark:text-gray-900 shadow-md' 
                                    : 'text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="px-5 mt-6">
                <AnimatePresence mode="popLayout">
                    {filteredOrders.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PackageCheck className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">No Orders Found</h3>
                            <p className="text-gray-500 dark:text-gray-400">You don't have any orders matching this status.</p>
                        </motion.div>
                    ) : (
                        filteredOrders.map((order: any) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={order.id}
                                className="relative mb-4 bg-white dark:bg-gray-900 rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm"
                            >
                                {/* Swipe Action Backgrounds */}
                                <div className="absolute inset-0 flex">
                                    <div className="flex-1 bg-green-500 flex items-center pl-6 text-white font-bold">
                                        <PackageCheck className="w-6 h-6 mr-2" /> Track
                                    </div>
                                    <div className="flex-1 bg-brand-primary flex items-center justify-end pr-6 text-white font-bold">
                                        Contact <ArrowLeft className="w-6 h-6 ml-2" />
                                    </div>
                                </div>

                                {/* Draggable Card Content */}
                                <motion.div
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    className="relative bg-white dark:bg-gray-900 p-5 rounded-[24px] z-10"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider mb-2 ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`}>
                                                {order.customer_status_label || 'In Progress'}
                                            </span>
                                            <h3 className="text-lg font-black text-gray-950 dark:text-white leading-none">
                                                {order.order_number || `#${String(order.id).padStart(5, '0')}`}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-gray-950 dark:text-white">
                                                {formatAmount(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || 'USD')}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">
                                                {order.payment_status_label || 'Unpaid'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 py-4 border-y border-gray-50 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <PackageCheck className="w-4 h-4 text-gray-400" />
                                            {order.items_count || 0} Items
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                        <div className="flex items-center gap-2 text-xs">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <Link 
                                            href={`/my-orders/${order.id}`}
                                            className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-950 dark:text-white font-bold py-3.5 rounded-[16px] text-center transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
