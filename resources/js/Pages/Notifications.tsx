import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import { Bell, ArrowLeft, Package, CreditCard, User, AlertCircle } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'order' | 'payment' | 'account' | 'alert';
    read: boolean;
}

export default function Notifications() {
    const { t } = useTranslation();
    const { auth }: any = usePage().props;
    const user = auth?.user;

    const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
        if (!user) return [];
        return [
            {
                id: '1',
                title: 'Order Completed Successfully',
                description: 'Your manual order #ORD-9282 has been delivered to your Phnom Penh warehouse.',
                time: '2 hours ago',
                type: 'order',
                read: false,
            },
            {
                id: '2',
                title: 'Receipt Verified',
                description: 'Your payment receipt of $120.00 for order #ORD-9283 has been successfully verified.',
                time: 'Yesterday',
                type: 'payment',
                read: false,
            },
            {
                id: '3',
                title: 'Complete Your Profile Info',
                description: 'Please complete your address details to avoid any delays in manual order shipping.',
                time: '2 days ago',
                type: 'account',
                read: true,
            },
            {
                id: '4',
                title: 'Customs Clearance Update',
                description: 'Shipment container #MVM-8829 has cleared customs inspection at the border.',
                time: '3 days ago',
                type: 'order',
                read: true,
            },
        ];
    });

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const toggleRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <Package className="w-5 h-5 text-blue-500" />;
            case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
            case 'account': return <User className="w-5 h-5 text-brand-primary" />;
            default: return <AlertCircle className="w-5 h-5 text-orange-500" />;
        }
    };

    const getIconBg = (type: string) => {
        switch (type) {
            case 'order': return 'bg-blue-500/10';
            case 'payment': return 'bg-green-500/10';
            case 'account': return 'bg-brand-primary/10';
            default: return 'bg-orange-500/10';
        }
    };

    return (
        <MainLayout title="Notifications" description="View all system and order updates">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
                
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/profile" className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-black text-gray-950 dark:text-white flex items-center gap-2">
                                <Bell className="w-6 h-6 text-brand-primary" />
                                Notifications
                            </h1>
                        </div>
                        {notifications.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={markAllAsRead}
                                    className="p-2 text-xs font-bold text-brand-primary hover:bg-brand-primary/10 rounded-xl transition"
                                >
                                    Mark all read
                                </button>
                                <button 
                                    onClick={clearAll}
                                    className="p-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-5 mt-6">
                    <AnimatePresence mode="popLayout">
                        {notifications.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 mb-4">
                                    <Bell className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white">All caught up!</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-[200px]">You have no new notifications at the moment.</p>
                            </motion.div>
                        ) : (
                            <div className="space-y-3">
                                {notifications.map((notification, index) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => toggleRead(notification.id)}
                                        className={`p-4 rounded-3xl border border-gray-100 dark:border-gray-800 cursor-pointer transition-all shadow-sm flex items-start gap-4 ${
                                            notification.read 
                                                ? 'bg-white/60 dark:bg-gray-900/60 opacity-70' 
                                                : 'bg-white dark:bg-gray-900 border-l-4 border-l-brand-primary'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className={`text-sm font-black text-gray-950 dark:text-white truncate ${!notification.read ? 'font-black' : 'font-bold'}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                                                    {notification.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}
