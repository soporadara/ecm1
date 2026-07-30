import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface Props {
    children: ReactNode;
    title?: string;
    actions?: ReactNode;
}

type NavItem = {
    label: string;
    href: string;
    icon: ReactNode;
    permission?: string;
    children?: NavItem[];
    badge?: number | string;
};

const Icon = ({ d, className = "w-5 h-5" }: { d: string; className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    </svg>
);

const PortalTooltip = ({ text, rect }: { text: string; rect: DOMRect }) => {
    if (typeof document === 'undefined') return null;
    return createPortal(
        <div
            className="fixed z-[100] px-3 py-1.5 bg-admin-text text-white text-xs font-semibold rounded-lg shadow-xl pointer-events-none whitespace-nowrap"
            style={{
                top: rect.top + rect.height / 2,
                left: rect.right + 12,
                transform: 'translateY(-50%)'
            }}
        >
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 border-4 border-transparent border-r-admin-text" />
            {text}
        </div>,
        document.body
    );
};

const NavItemLink = ({ item, collapsed, active }: { item: NavItem; collapsed: boolean; active: boolean }) => {
    const [hovered, setHovered] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleMouseEnter = () => {
        if (collapsed && linkRef.current) {
            setRect(linkRef.current.getBoundingClientRect());
            setHovered(true);
        }
    };

    return (
        <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={() => setHovered(false)}
        >
            <Link
                ref={linkRef}
                href={item.href}
                className={`
                    group flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all duration-300
                    ${collapsed ? 'justify-center' : ''}
                    ${active
                        ? 'bg-admin-primary text-white shadow-lg shadow-admin-primary/30'
                        : 'text-admin-text-muted hover:bg-admin-surface-muted hover:text-admin-text'
                    }
                `}
            >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && item.badge !== undefined && (
                    <span className={`ml-auto px-2 py-0.5 text-[10.5px] font-black rounded-full ${active ? 'bg-white/20 text-white' : 'bg-admin-primary/10 text-admin-primary'}`}>
                        {item.badge}
                    </span>
                )}
                {!collapsed && active && item.badge === undefined && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                )}
                {!collapsed && !active && item.badge === undefined && (
                    <Icon d="M9 5l7 7-7 7" className="ml-auto w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                )}
            </Link>
            {hovered && collapsed && rect && <PortalTooltip text={item.label} rect={rect} />}
        </div>
    );
};

const NavGroup = ({
    label,
    items,
    currentPath,
    collapsed,
}: {
    label: string;
    items: NavItem[];
    currentPath: string;
    collapsed: boolean;
}) => {
    const isActive = (href: string) => currentPath.startsWith(href) && href !== '/admin';
    const isExactActive = (href: string) => currentPath === href;

    if (!items || items.length === 0) return null;

    return (
        <div className="mb-4">
            {!collapsed && (
                <div className="px-5 mb-2 text-xs font-bold text-admin-text-muted capitalize">
                    {label}
                </div>
            )}
            <div className="space-y-1.5 px-3">
                {items.map((item) => {
                    const active = isExactActive(item.href) || isActive(item.href);
                    return (
                        <NavItemLink
                            key={item.href}
                            item={item}
                            collapsed={collapsed}
                            active={active}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default function AdminLayout({ children, title, actions }: Props) {
    const { auth, ziggy, general_settings, admin_counts } = usePage().props as any;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/admin';

    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('adminSidebarCollapsed') === 'true';
        }
        return false;
    });

    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
        }
        return false;
    });
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    const initialNotifications = auth?.admin_notifications || [];
    const [liveNotifications, setLiveNotifications] = useState(initialNotifications);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).Echo) {
            (window as any).Echo.channel('admin-notifications')
                .listen('.AdminSystemNotification', (e: any) => {
                    toast.success(e.message, {
                        duration: 5000,
                        position: 'top-right',
                    });
                    
                    const newNotif = {
                        id: Date.now(),
                        message: e.message,
                        title: e.type ? e.type.charAt(0).toUpperCase() + e.type.slice(1) : 'System',
                        url: e.url || '#',
                        time: 'Just now',
                    };
                    
                    setLiveNotifications((prev: any) => [newNotif, ...prev]);
                });
                
            return () => {
                (window as any).Echo.leaveChannel('admin-notifications');
            };
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const storeName = general_settings?.store_name || 'Rafel';
    const storeLogo = general_settings?.store_logo;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('adminSidebarCollapsed', String(collapsed));
        }
    }, [collapsed]);

    // Close mobile drawer on navigation
    useEffect(() => {
        const cleanup = router.on('start', () => setMobileOpen(false));
        return () => cleanup();
    }, []);
    const hasPermission = (permission: string) => {
        if (!auth?.user) return false;
        if (auth.user.roles?.includes('Super Administrator')) return true;
        return auth.user.permissions?.includes(permission);
    };

    const storeNavItems: NavItem[] = [
        ...(hasPermission('dashboard.view') ? [{
            label: 'Dashboard',
            href: '/admin',
            icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
        }] : []),
        ...(hasPermission('orders.view') ? [{
            label: 'Customers',
            href: '/admin/logistics/customers',
            icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
            badge: admin_counts?.customers,
        },
        {
            label: 'Orders',
            href: '/admin/logistics/orders',
            icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
            badge: admin_counts?.orders,
        },
        {
            label: 'Reports',
            href: '/admin/logistics/reports',
            icon: <Icon d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        }] : []),
        {
            label: 'Team Notes',
            href: '/admin/notes',
            icon: <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        }
    ];

    const blogNavItems: NavItem[] = [
        ...(hasPermission('posts.view') ? [{
            label: 'Blog Posts',
            href: '/admin/posts',
            icon: <Icon d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
            badge: admin_counts?.posts,
        },
        {
            label: 'Blog Categories',
            href: '/admin/post-categories',
            icon: <Icon d="M4 6h16M4 10h16M4 14h16M4 18h16" />,
            badge: admin_counts?.categories,
        }] : []),
    ];

    const contentNavItems: NavItem[] = [
        ...(hasPermission('pages.view') ? [{
            label: 'Pages',
            href: '/admin/pages',
            icon: <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
            badge: admin_counts?.pages,
        }] : []),
        ...(hasPermission('banners.view') ? [{
            label: 'Banners',
            href: '/admin/banners',
            icon: <Icon d="M4 5h16M4 19h16M4 5v14m16-14v14M8 9h8m-8 4h5" />,
        }] : []),
        {
            label: 'Testimonials',
            href: '/admin/testimonials',
            icon: <Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
        },
        ...(hasPermission('available_sites.view') ? [{
            label: 'Available Sites',
            href: '/admin/available-sites',
            icon: <Icon d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488A9 9 0 113.512 8.512" />,
        }] : []),
        ...(hasPermission('popups.view') ? [{
            label: 'Pop-up Ads',
            href: '/admin/popups',
            icon: <Icon d="M7 8h10M7 12h4m1 8l-4-4H5a3 3 0 01-3-3V6a3 3 0 013-3h14a3 3 0 013 3v7a3 3 0 01-3 3h-3l-4 4z" />,
        }] : []),
        ...(auth?.user?.role === 'super_admin' || auth?.user?.role === 'superadmin' ? [{
            label: 'Fly Icons',
            href: '/admin/fly-icons',
            icon: <Icon d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
        }] : []),
    ];

    const marketingNavItems: NavItem[] = [];

    const appearanceNavItems: NavItem[] = [];

    const systemNavItems: NavItem[] = [
        ...(auth?.user?.role === 'super_admin' || auth?.user?.role === 'superadmin' || auth?.user?.roles?.includes('Super Administrator') ? [{
            label: 'Customers',
            href: '/admin/customers-management',
            icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
        }] : []),
        ...(hasPermission('staff.view') ? [
            {
                label: 'Staff & Users',
                href: '/admin/staff',
                icon: <Icon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
            }
        ] : []),
        ...(hasPermission('audit_logs.view') ? [{
            label: 'Audit Logs',
            href: '/admin/audit-logs',
            icon: <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        }] : []),
        ...(auth?.user?.role === 'super_admin' || auth?.user?.role === 'superadmin' || auth?.user?.roles?.includes('Super Administrator') ? [{
            label: 'Access Control',
            href: '/admin/security/access-control',
            icon: <Icon d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 0h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />,
        }] : []),
    ];

    const SidebarContent = ({ mobile = false }: { mobile?: boolean } = {}) => {
        const sidebarCollapsed = mobile ? false : collapsed;
        const navRef = useRef<HTMLElement>(null);
        const [showProfileMenu, setShowProfileMenu] = useState(false);
        const profileMenuRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutsideProfile = (event: MouseEvent) => {
                if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                    setShowProfileMenu(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutsideProfile);
            return () => document.removeEventListener('mousedown', handleClickOutsideProfile);
        }, []);

        useEffect(() => {
            if (navRef.current) {
                const scrollPos = sessionStorage.getItem('admin_sidebar_scroll');
                if (scrollPos) {
                    navRef.current.scrollTop = parseInt(scrollPos, 10);
                }
            }
        }, []);

        const handleScroll = (e: React.UIEvent<HTMLElement>) => {
            sessionStorage.setItem('admin_sidebar_scroll', e.currentTarget.scrollTop.toString());
        };

        return (
        <div className="flex flex-col h-full bg-admin-surface border-r border-admin-border/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10">
            {/* Store Header */}
            <div className={`flex items-center pt-6 pb-5 ${sidebarCollapsed ? 'px-4 justify-center' : 'px-5 md:px-8'}`}>
                <Link href="/admin" className="flex items-center gap-3 min-w-0">
                    {storeLogo ? (
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm overflow-hidden p-1 border border-admin-border/50">
                            <img src={storeLogo} alt="MVM Logistic" className="w-full h-full object-contain" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-admin-secondary rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-lg shadow-md shadow-admin-secondary/30 uppercase">
                            MVM
                        </div>
                    )}
                    {!sidebarCollapsed && (
                        <div className="min-w-0 flex flex-col justify-center mt-0.5">
                            <p className="font-extrabold text-admin-text text-[1.1rem] tracking-tight truncate">MVM Logistic</p>
                            <p className="text-[10px] font-bold text-admin-text-muted uppercase tracking-wider">CMS Dashboard</p>
                        </div>
                    )}
                </Link>
                {!sidebarCollapsed && !mobile && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="ml-auto p-1.5 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-muted rounded-xl transition-colors"
                        title="Collapse sidebar"
                    >
                        <Icon d="M11 19l-7-7 7-7m8 14l-7-7 7-7" className="w-4 h-4" />
                    </button>
                )}
                {sidebarCollapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute left-full ml-1 p-1 bg-white border border-admin-border shadow-sm text-admin-text-muted hover:text-admin-text rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title="Expand sidebar"
                    />
                )}
            </div>

            {/* Navigation */}
            <nav 
                ref={navRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto py-4 px-2 space-y-4"
            >
                <NavGroup label="Store" items={storeNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
                <NavGroup label="Content" items={contentNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
                <NavGroup label="Blog" items={blogNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
                <NavGroup label="Marketing" items={marketingNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
                <NavGroup label="Appearance" items={appearanceNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
                <NavGroup label="System" items={systemNavItems} currentPath={currentPath} collapsed={sidebarCollapsed} />
            </nav>

            {/* User Footer (Dropdown Menu) */}
            <div className={`mt-auto mb-6 mx-4 relative`} ref={profileMenuRef}>
                <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`w-full p-3 rounded-2xl border border-admin-border/50 bg-admin-surface-muted/50 hover:bg-admin-surface transition-colors flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3 text-left'}`}
                >
                    <div className="w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm flex-shrink-0 border border-admin-primary/20 overflow-hidden">
                        {auth?.user?.avatar ? (
                            <img src={auth.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            auth?.user?.name?.charAt(0)?.toUpperCase()
                        )}
                    </div>
                    {!sidebarCollapsed && (
                        <>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-admin-text truncate">{auth?.user?.name}</p>
                                <p className="text-xs font-semibold text-admin-text-muted truncate capitalize">{auth?.user?.role}</p>
                            </div>
                            <Icon d="M19 9l-7 7-7-7" className="w-4 h-4 text-admin-text-muted flex-shrink-0" />
                        </>
                    )}
                </button>

                {showProfileMenu && (
                    <div className={`absolute bottom-[calc(100%+8px)] bg-white dark:bg-gray-900 rounded-2xl border border-admin-border shadow-xl py-2 z-[100] ${sidebarCollapsed ? 'left-0 w-48' : 'left-0 right-0'}`}>
                        <div className="px-4 py-2 border-b border-admin-border/50 mb-2">
                            <p className="text-sm font-bold text-admin-text truncate">{auth?.user?.name}</p>
                            <p className="text-xs text-admin-text-muted truncate">{auth?.user?.email}</p>
                        </div>
                        <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-text hover:bg-admin-surface-muted transition-colors">
                            <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" className="w-5 h-5 opacity-70" />
                            My Profile
                        </Link>
                        {hasPermission('settings.view') && (
                            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-text hover:bg-admin-surface-muted transition-colors">
                                <Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" className="w-5 h-5 opacity-70" />
                                Settings
                            </Link>
                        )}
                        <Link href="/cms/logout" method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-admin-danger hover:bg-admin-danger/10 transition-colors mt-1 border-t border-admin-border/50 pt-3">
                            <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-5 h-5 opacity-70" />
                            Sign Out
                        </Link>
                    </div>
                )}
            </div>
        </div>
        );
    };

    return (
        <div className="min-h-screen bg-admin-bg flex">
            {/* Desktop Sidebar */}
            <aside
                className={`
                    hidden md:flex flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out
                    ${collapsed ? 'w-20' : 'w-64'}
                `}
            >
                <SidebarContent />
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute -right-4 top-24 w-8 h-8 bg-admin-surface border-2 border-admin-bg rounded-full flex items-center justify-center text-admin-text hover:text-admin-primary hover:border-admin-primary transition-all shadow-md z-50 cursor-pointer"
                        title="Expand"
                    >
                        <Icon d="M9 5l7 7-7 7" className="w-4 h-4 ml-0.5" />
                    </button>
                )}
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-full w-[min(90vw,22rem)] z-50 transition-transform duration-300 ease-in-out md:hidden
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <SidebarContent mobile />
            </aside>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}
            >
                {/* Top Bar */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-admin-border/40 bg-admin-bg/92 px-3 py-3 backdrop-blur-xl sm:px-4 md:static md:border-0 md:bg-transparent md:px-8 md:pb-4 md:pt-8 md:backdrop-blur-none">
                    {/* Left: Mobile hamburger + Greeting */}
                    <div className="flex items-center gap-4 min-w-0">
                        <button
                        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-admin-border bg-admin-surface text-admin-text-muted shadow-sm transition hover:-translate-y-0.5 hover:text-admin-text"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <Icon d="M4 6h16M4 12h16M4 18h16" className="w-6 h-6" />
                        </button>
                        
                        <div className="min-w-0">
                            <div className="md:hidden">
                                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-admin-text-muted">CMS</p>
                                <h1 className="truncate text-xl font-black text-admin-text">{title || 'Dashboard'}</h1>
                            </div>
                        <div className="hidden md:block">
                            <h1 className="text-[26px] font-bold text-admin-text flex items-center gap-2">
                                Good morning {auth?.user?.name?.split(' ')[0]} <span className="text-2xl">👋</span>
                            </h1>
                            <p className="text-[13px] text-admin-text-muted mt-1 font-medium">Time to rise up for today's tasks</p>
                        </div>
                        </div>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40"
                            title="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Notification Bell */}
                        <div className="relative" ref={notificationsRef}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40" 
                                title="View order updates"
                            >
                                <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-5 h-5" />
                                {liveNotifications.length > 0 && (
                                    <span className="absolute top-1 right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden max-h-[80vh] flex flex-col">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                        <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="overflow-y-auto flex-1">
                                        {liveNotifications.length > 0 ? (
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {liveNotifications.map((notif: any) => (
                                                    <Link 
                                                        href={notif.url} 
                                                        key={notif.id}
                                                        className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {notif.avatar ? (
                                                                <img src={notif.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                                                                    {notif.name?.charAt(0)?.toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                {notif.title}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 break-words">
                                                                {notif.message}
                                                            </p>
                                                            <p className="text-xs text-brand-primary font-medium mt-1">
                                                                {notif.time}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                                No new notifications.
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center">
                                        <Link href="/admin/logistics/orders" className="text-sm font-bold text-brand-primary hover:underline">
                                            View all manual orders
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Storefront (Desktop only) */}
                        <div className="hidden md:flex items-center gap-2">
                            <a
                                href="/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40"
                                title="Storefront"
                            >
                                <Icon d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Profile Pill */}
                        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-admin-border/50">
                            <div className="text-right hidden md:block">
                                <p className="text-[13px] font-bold text-admin-text leading-none mb-1">{auth?.user?.name}</p>
                                <p className="text-[11px] font-bold text-admin-text-muted capitalize leading-none">{auth?.user?.role?.replace('_', ' ')}</p>
                            </div>
                            <Link href="/admin/profile" className="w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm border border-admin-primary/20 overflow-hidden cursor-pointer shadow-sm hover:opacity-80 transition-opacity">
                                {auth?.user?.avatar ? (
                                    <img src={auth.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    auth?.user?.name?.charAt(0)?.toUpperCase()
                                )}
                            </Link>
                            <Link href="/admin/profile" className="w-4 h-4 text-admin-text-muted ml-1 hover:text-admin-text transition-colors">
                                <Icon d="M19 9l-7 7-7-7" />
                            </Link>
                        </div>
                        
                        {/* Primary Page Action Slot */}
                        {actions && <div className="flex items-center gap-2 ml-2">{actions}</div>}
                    </div>
                </header>

                {/* Global Search Overlay */}
                {searchOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                            <div className="flex items-center gap-3 p-4 border-b border-slate-200">
                                <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-5 h-5 text-slate-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search products, orders, customers..."
                                    className="flex-1 outline-none text-slate-800 placeholder-slate-400"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <Icon d="M6 18L18 6M6 6l12 12" className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 text-sm text-slate-500 text-center py-8">
                                {searchQuery ? 'Type to search...' : 'Start typing to search across the CMS'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 px-4 pb-12 pt-4 sm:px-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
