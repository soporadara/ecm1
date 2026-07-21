import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, usePage, router } from '@inertiajs/react';

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
                {!collapsed && active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                )}
                {!collapsed && !active && (
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
    const { auth, ziggy } = usePage().props as any;
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
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const storeName = general_settings?.store_name || 'Rafel';
    const storeLogo = general_settings?.store_logo;

    const role = auth?.user?.role || 'customer';
    const isSuperAdmin = role === 'superadmin';
    const isAdmin = isSuperAdmin || role === 'admin';
    const isManager = isAdmin || role === 'store_manager';
    const isEditor = isManager || role === 'editor';

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
        if (auth.user.is_admin === 1 || auth.user.is_admin === true || auth.user.role === 'superadmin' || auth.user.role === 'admin' || auth.user.roles?.includes('Super Administrator')) return true;
        return auth.user.permissions?.includes(permission);
    };

    const storeNavItems: NavItem[] = [
        ...(hasPermission('dashboard.view') ? [{
            label: 'Dashboard',
            href: '/admin',
            icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
        }] : []),
        ...(hasPermission('orders.view') ? [{
            label: 'Orders',
            href: '/admin/orders',
            icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
        }] : []),
        ...(hasPermission('products.view') ? [{
            label: 'Products',
            href: '/admin/products',
            icon: <Icon d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
        }] : []),
        ...(hasPermission('categories.view') ? [{
            label: 'Categories',
            href: '/admin/categories',
            icon: <Icon d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />,
        }] : []),
        ...(hasPermission('products.view') ? [{
            label: 'Brands',
            href: '/admin/brands',
            icon: <Icon d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
        }] : []),
        ...(hasPermission('customers.view') ? [{
            label: 'Customers',
            href: '/admin/customers',
            icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
        }] : []),
        ...(hasPermission('products.view') ? [{
            label: 'Reviews',
            href: '/admin/reviews',
            icon: <Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
        }] : []),
    ];

    const contentNavItems: NavItem[] = [
        ...(hasPermission('pages.view') ? [{
            label: 'Pages',
            href: '/admin/pages',
            icon: <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        }] : []),
        ...(hasPermission('posts.view') ? [{
            label: 'Blog Posts',
            href: '/admin/posts',
            icon: <Icon d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
        }] : []),
        ...(hasPermission('media.view') ? [{
            label: 'Media Library',
            href: '/admin/media',
            icon: <Icon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
        }] : []),
        ...(hasPermission('menus.view') ? [{
            label: 'Menus',
            href: '/admin/menus',
            icon: <Icon d="M4 6h16M4 12h16M4 18h7" />,
        }] : []),
    ];

    const marketingNavItems: NavItem[] = [
        ...(hasPermission('promotions.view') ? [{
            label: 'Coupons',
            href: '/admin/coupons',
            icon: <Icon d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />,
        }] : []),
        ...(hasPermission('settings.view') ? [{
            label: 'SEO',
            href: '/admin/seo',
            icon: <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
        }] : []),
    ];

    const appearanceNavItems: NavItem[] = [
    ];

    const systemNavItems: NavItem[] = [
        ...(hasPermission('staff.view') ? [
            {
                label: 'Staff & Users',
                href: '/admin/staff',
                icon: <Icon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
            },
            {
                label: 'Customers List',
                href: '/admin/users',
                icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
            }
        ] : []),
        ...(hasPermission('settings.view') ? [{
            label: 'Settings',
            href: '/admin/settings',
            icon: <Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
        }] : []),
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-admin-surface border-r border-admin-border/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10">
            {/* Store Header */}
            <div className={`flex items-center pt-8 pb-6 ${collapsed ? 'px-4 justify-center' : 'px-8'}`}>
                <Link href="/admin" className="flex items-center gap-4 min-w-0">
                    {storeLogo ? (
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-[14px] shadow-sm overflow-hidden p-1 border border-admin-border/50">
                            <img src={storeLogo} alt={storeName} className="w-full h-full object-contain" />
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-admin-secondary rounded-[14px] flex items-center justify-center flex-shrink-0 font-black text-white text-lg shadow-lg shadow-admin-secondary/40 uppercase">
                            {storeName.charAt(0)}
                        </div>
                    )}
                    {!collapsed && (
                        <div className="min-w-0 flex items-center">
                            <p className="font-extrabold text-admin-text text-2xl tracking-tight truncate lowercase">{storeName}</p>
                        </div>
                    )}
                </Link>
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="ml-auto p-1.5 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-muted rounded-xl transition-colors"
                        title="Collapse sidebar"
                    >
                        <Icon d="M11 19l-7-7 7-7m8 14l-7-7 7-7" className="w-4 h-4" />
                    </button>
                )}
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute left-full ml-1 p-1 bg-white border border-admin-border shadow-sm text-admin-text-muted hover:text-admin-text rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title="Expand sidebar"
                    />
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
                <NavGroup label="Store" items={storeNavItems} currentPath={currentPath} collapsed={collapsed} />
                <NavGroup label="Content" items={contentNavItems} currentPath={currentPath} collapsed={collapsed} />
                <NavGroup label="Marketing" items={marketingNavItems} currentPath={currentPath} collapsed={collapsed} />
                <NavGroup label="Appearance" items={appearanceNavItems} currentPath={currentPath} collapsed={collapsed} />
                <NavGroup label="System" items={systemNavItems} currentPath={currentPath} collapsed={collapsed} />
            </nav>

            {/* User Footer */}
            <div className={`mt-auto mb-6 mx-4 p-4 rounded-2xl border border-admin-border/50 bg-admin-surface-muted/50 ${collapsed ? 'flex justify-center' : ''}`}>
                {collapsed ? (
                    <Link href="/admin/profile" className="w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm flex-shrink-0 hover:bg-admin-primary/20 transition-colors"
                        title={auth?.user?.name}>
                        {auth?.user?.avatar ? (
                            <img src={auth.user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            auth?.user?.name?.charAt(0)?.toUpperCase()
                        )}
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/admin/profile" className="w-10 h-10 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary font-bold text-sm flex-shrink-0 border border-admin-primary/20 overflow-hidden hover:opacity-80 transition-opacity">
                            {auth?.user?.avatar ? (
                                <img src={auth.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                auth?.user?.name?.charAt(0)?.toUpperCase()
                            )}
                        </Link>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-admin-text truncate">{auth?.user?.name}</p>
                            <p className="text-xs font-semibold text-admin-text-muted truncate capitalize">{auth?.user?.role}</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-2 text-admin-text-muted hover:text-admin-danger hover:bg-admin-danger/10 rounded-xl transition-colors"
                            title="Logout"
                        >
                            <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );

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
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out md:hidden
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}
            >
                {/* Top Bar */}
                <header className="bg-transparent pt-8 pb-4 flex items-center justify-between px-4 md:px-8 z-30">
                    {/* Left: Mobile hamburger + Greeting */}
                    <div className="flex items-center gap-4 min-w-0">
                        <button
                            className="md:hidden p-2 text-admin-text-muted hover:text-admin-text rounded-xl hover:bg-admin-surface-muted transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <Icon d="M4 6h16M4 12h16M4 18h16" className="w-6 h-6" />
                        </button>
                        
                        <div className="hidden md:block">
                            <h1 className="text-[26px] font-bold text-admin-text flex items-center gap-2">
                                Good morning {auth?.user?.name?.split(' ')[0]} <span className="text-2xl">👋</span>
                            </h1>
                            <p className="text-[13px] text-admin-text-muted mt-1 font-medium">Time to rise up for today's tasks</p>
                        </div>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <button className="relative p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40">
                            <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-admin-primary rounded-full border-2 border-admin-surface"></span>
                        </button>

                        {/* Search & Storefront (Desktop only) */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2.5 text-admin-text-muted hover:text-admin-text transition-colors bg-admin-surface rounded-full shadow-sm border border-admin-border/40"
                                title="Search (Cmd+K)"
                            >
                                <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-5 h-5" />
                            </button>
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
                            <div className="text-right">
                                <p className="text-[11px] font-bold text-admin-text-muted uppercase tracking-wider">Your Balance</p>
                                <p className="text-[15px] font-bold text-admin-primary">$566.55</p>
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
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
