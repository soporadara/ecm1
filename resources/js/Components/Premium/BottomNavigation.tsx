import { Link, usePage } from '@inertiajs/react';
import { Home, PackageCheck, Bell, User, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
    onOpenManualOrder: () => void;
    unreadNotificationsCount?: number;
}

export default function BottomNavigation({ onOpenManualOrder, unreadNotificationsCount = 0 }: Props) {
    const { url } = usePage();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Auto-hide navigation on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true);  // Scrolling up
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

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
                    className="fixed bottom-6 left-0 right-0 z-[100] px-4 flex justify-center pointer-events-none lg:hidden"
                >
                    <div className="relative pointer-events-auto flex items-center justify-between w-full max-w-[400px] h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[32px] px-2">
                        
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

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href!}
                                    prefetch={['mount', 'hover']}
                                    className="flex-1 flex flex-col items-center justify-center h-full relative"
                                >
                                    <motion.div
                                        whileTap={{ scale: 0.85 }}
                                        className={`relative p-2 rounded-2xl transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'}`}
                                    >
                                        <Icon className="w-6 h-6 stroke-[1.5]" />
                                        
                                        {item.count ? (
                                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-gray-900" />
                                        ) : null}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
