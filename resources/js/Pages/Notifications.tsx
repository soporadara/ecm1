import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import { Bell, Package, CreditCard, Gift, Trash2, Check, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Notifications({ initialNotifications = [] }: any) {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Order Delivered',
            message: 'Your order #ORD-9283 has been successfully delivered.',
            time: '10 mins ago',
            read: false,
            icon: Package,
            color: 'bg-green-500',
        },
        {
            id: 2,
            type: 'promo',
            title: 'Special Discount!',
            message: 'Get 20% off on all shipping fees this weekend.',
            time: '2 hours ago',
            read: false,
            icon: Gift,
            color: 'bg-brand-primary',
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Received',
            message: 'We received your payment of $45.00 for order #ORD-9282.',
            time: 'Yesterday',
            read: true,
            icon: CreditCard,
            color: 'bg-blue-500',
        }
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <MainLayout title="Notifications" description="Your notifications center">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
                
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-black text-gray-950 dark:text-white">Notifications</h1>
                        </div>
                        <button 
                            onClick={markAllRead}
                            className="text-sm font-bold text-brand-primary flex items-center gap-1 bg-brand-primary/10 px-3 py-1.5 rounded-full"
                        >
                            <Check className="w-4 h-4" /> Mark All Read
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="px-4 mt-6">
                    <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? notifications.map((notif) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, x: -100 }}
                                key={notif.id}
                                className={`relative mb-3 bg-white dark:bg-gray-900 rounded-[20px] p-4 flex gap-4 overflow-hidden border transition-shadow ${notif.read ? 'border-gray-100 dark:border-gray-800 shadow-sm' : 'border-brand-primary/20 shadow-lg shadow-brand-primary/5'}`}
                            >
                                {/* Unread Indicator */}
                                {!notif.read && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary" />
                                )}

                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-inner ${notif.color}`}>
                                    <notif.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0 pr-8">
                                    <h3 className={`text-[15px] ${notif.read ? 'font-bold text-gray-700 dark:text-gray-300' : 'font-black text-gray-950 dark:text-white'}`}>
                                        {notif.title}
                                    </h3>
                                    <p className={`text-sm mt-1 line-clamp-2 ${notif.read ? 'text-gray-500 dark:text-gray-400 font-medium' : 'text-gray-600 dark:text-gray-300 font-semibold'}`}>
                                        {notif.message}
                                    </p>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-2 block">
                                        {notif.time}
                                    </span>
                                </div>

                                <button 
                                    onClick={() => removeNotification(notif.id)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                    <Bell className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">You're all caught up!</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-[250px]">Check back later for updates on your orders and special promotions.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}
