import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    Search, Bell, ChevronRight, PackageCheck, 
    CreditCard, TrendingUp, Clock, FileText, 
    MessageSquare, Settings, ArrowRight, Zap 
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
    auth: any;
}

export default function MobileDashboard({ auth }: Props) {
    const { t } = useTranslation();
    const user = auth?.user;

    const stats = [
        { label: 'Pending', value: '12', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'Completed', value: '148', icon: PackageCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Revenue', value: '$2,450', icon: TrendingUp, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    ];

    const recentOrders = [
        { id: '#ORD-9283', item: 'Nike Air Max', status: 'Processing', date: 'Today, 2:30 PM', price: '$120.00' },
        { id: '#ORD-9282', item: 'MacBook Pro Case', status: 'Delivered', date: 'Yesterday', price: '$45.00' },
        { id: '#ORD-9281', item: 'Wireless Charger', status: 'Delivered', date: 'Aug 1', price: '$25.00' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
            
            {/* Header / Greeting */}
            <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-6 rounded-b-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-black text-gray-950 dark:text-white flex items-center gap-2"
                        >
                            Hi, {user ? user.name.split(' ')[0] : 'Guest'} <span className="animate-wave origin-bottom-right">👋</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1"
                        >
                            {user ? 'Welcome back to your dashboard' : 'Sign in to manage your orders'}
                        </motion.p>
                    </div>
                    {user?.avatar ? (
                        <Link href="/profile" prefetch={['hover']} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </Link>
                    ) : (
                        <Link href="/profile" className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                            <UserIcon />
                        </Link>
                    )}
                </div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search orders, tracking..." 
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-[15px] text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                    />
                </motion.div>
            </div>

            {user ? (
                <div className="px-5 mt-6 space-y-6">
                    
                    {/* Stats Grid */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-3 gap-3"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-[20px] shadow-sm flex flex-col items-center text-center justify-center border border-gray-100 dark:border-gray-800">
                                <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-black text-gray-950 dark:text-white leading-none">{stat.value}</span>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-lg font-black text-gray-950 dark:text-white">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-brand-primary text-white p-4 rounded-[20px] shadow-lg shadow-brand-primary/20 flex flex-col items-start gap-3 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                                <Zap className="w-6 h-6" />
                                <span className="font-bold text-left leading-tight">Create<br/>Order</span>
                            </button>
                            <Link href="/receipts" prefetch={['hover']} className="bg-white dark:bg-gray-900 p-4 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-start gap-3 text-gray-950 dark:text-white">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-left leading-tight">Upload<br/>Receipt</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-lg font-black text-gray-950 dark:text-white">Recent Orders</h2>
                            <Link href="/customer/orders" className="text-sm font-bold text-brand-primary">View All</Link>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {recentOrders.map((order, i) => (
                                <Link 
                                    href={`/customer/orders/${order.id}`} 
                                    key={i}
                                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${i !== recentOrders.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                        <PackageCheck className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-950 dark:text-white truncate">{order.item}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs font-semibold text-gray-500">{order.id}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                            <span className="text-xs font-semibold text-gray-500">{order.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-black text-gray-950 dark:text-white">{order.price}</p>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>
                                            {order.status}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                </div>
            ) : (
                <div className="px-5 mt-10">
                    <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-[24px] p-6 text-center">
                        <div className="w-16 h-16 bg-brand-primary rounded-full mx-auto flex items-center justify-center shadow-lg shadow-brand-primary/30 mb-4">
                            <LockKeyholeIcon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-gray-950 dark:text-white mb-2">Access Your Dashboard</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">Log in to view your statistics, manage orders, and create manual requests.</p>
                        <button className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-brand-primary/20">
                            Login Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Inline fallback icons for ease
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LockKeyholeIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>;
