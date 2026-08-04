import { Link } from '@inertiajs/react';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    PackageCheck, Receipt, Settings, 
    LogOut, ChevronRight, Edit3, Shield,
    Bell, MapPin, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileProfileView({ user, logout }: any) {
    const { t } = useTranslation();

    const menuGroups = [
        {
            title: 'My Account',
            items: [
                { icon: PackageCheck, label: 'My Orders', href: '/customer/orders', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { icon: Receipt, label: 'My Receipts', href: '/receipts', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { icon: MapPin, label: 'Addresses', href: '/profile/addresses', color: 'text-green-500', bg: 'bg-green-500/10' },
            ]
        },
        {
            title: 'Settings & Preferences',
            items: [
                { icon: Settings, label: 'App Settings', href: '/settings', color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-200 dark:bg-gray-800' },
                { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { icon: Shield, label: 'Security', href: '/security', color: 'text-teal-500', bg: 'bg-teal-500/10' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
            
            {/* Header / Banner */}
            <div className="bg-brand-primary pb-10 rounded-b-[2.5rem] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                
                <div className="px-5 pt-8 flex justify-between items-center relative z-10">
                    <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors backdrop-blur-md">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <button 
                        onClick={logout}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-red-500/80 transition-colors backdrop-blur-md"
                    >
                        <LogOut className="w-4 h-4 ml-0.5" />
                    </button>
                </div>

                <div className="px-5 mt-6 relative z-10 flex flex-col items-center text-center">
                    <div className="relative group mb-3">
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center text-white font-bold text-3xl shadow-xl backdrop-blur-sm">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0).toUpperCase() || 'G'
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <h1 className="text-2xl font-black text-white">{user?.name}</h1>
                    <p className="text-white/80 text-sm font-medium mt-1">{user?.email}</p>
                    {user?.customer_code && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full backdrop-blur-md border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{user.customer_code}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Sections */}
            <div className="px-5 mt-8 space-y-8">
                {menuGroups.map((group, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={group.title}
                    >
                        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2">{group.title}</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {group.items.map((item, j) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${j !== group.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-gray-950 dark:text-white">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Logout Button */}
            <div className="px-5 mt-10">
                <button
                    onClick={logout}
                    className="w-full bg-red-50 dark:bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
            
        </div>
    );
}
