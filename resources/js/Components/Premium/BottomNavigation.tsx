import { Link, usePage } from '@inertiajs/react';
import { Home, PackageCheck, Bell, User, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
    onOpenManualOrder: () => void;
    onOpenAuthModal?: () => void;
    unreadNotificationsCount?: number;
}

export default function BottomNavigation({ onOpenManualOrder, onOpenAuthModal, unreadNotificationsCount = 0 }: Props) {
    const { url, props } = usePage();
    const { auth }: any = props;
    const user = auth?.user;

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Always visible on mobile, no auto-hide needed for app-like experience
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/my-orders', icon: PackageCheck, label: 'Orders' },
        { type: 'center-button' },
        { href: '/notifications', icon: Bell, label: 'Notifications', count: unreadNotificationsCount },
        { href: '/profile', icon: User, label: 'Profile' }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] px-0 flex justify-center pointer-events-none lg:hidden"
                >
                    <div className="relative pointer-events-auto flex items-center justify-between w-full h-[calc(4rem+env(safe-area-inset-bottom))] rounded-t-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)] px-2 pb-[env(safe-area-inset-bottom)]">
                        
                        {navItems.map((item, index) => {
                            if (item.type === 'center-button') {
                                return (
                                    <div key="center" className="relative flex-1 flex justify-center -mt-10">
                                        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-full scale-[1.3] -z-10 shadow-sm" />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={onOpenManualOrder}
                                            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-lg shadow-brand-primary/30 z-10"
                                        >
                                            <Plus className="w-6 h-6 stroke-[2.5]" />
                                        </motion.button>
                                    </div>
                                );
                            }

                            const isActive = url === item.href || url.startsWith(`${item.href}/`);
                            const Icon = item.icon!;
                            const requiresAuth = item.href !== '/';

                            const inner = (
                                <motion.div
                                    whileTap={{ scale: 0.85 }}
                                    className={`w-full h-full flex flex-col items-center justify-center transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'}`}
                                >
                                    <div className="relative p-2 rounded-2xl">
                                        <Icon className="w-6 h-6 stroke-[1.5]" />
                                        
                                        {item.count ? (
                                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-gray-900" />
                                        ) : null}
                                    </div>
                                </motion.div>
                            );

                            if (requiresAuth && !user) {
                                return (
                                    <button
                                        key={item.href}
                                        onClick={onOpenAuthModal}
                                        className="flex-1 h-full relative flex items-center justify-center focus:outline-none"
                                    >
                                        {inner}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href!}
                                    prefetch={['mount', 'hover']}
                                    className="flex-1 h-full relative flex items-center justify-center"
                                >
                                    {inner}
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
