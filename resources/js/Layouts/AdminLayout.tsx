import React, { useState, useEffect, ReactNode } from 'react';
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
    const [open, setOpen] = useState(true);

    const isActive = (href: string) => currentPath.startsWith(href) && href !== '/admin';
    const isExactActive = (href: string) => currentPath === href;

    return (
        <div className="mb-1">
            {!collapsed && (
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
                >
                    {label}
                    <Icon
                        d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        className="w-3 h-3"
                    />
                </button>
            )}
            {(open || collapsed) && (
                <div className="space-y-0.5">
                    {items.map((item) => {
                        const active = isExactActive(item.href) || isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                                    ${collapsed ? 'justify-center' : ''}
                                    ${active
                                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }
                                `}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            )}
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
        ...(hasPermission('themes.view') ? [{
            label: 'Banner Settings',
            href: '/admin/settings/banner',
            icon: <Icon d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
        }] : []),
        ...(hasPermission('promotions.view') ? [{
            label: 'Popups & Ads',
            href: '/admin/popups',
            icon: <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
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
        ...(hasPermission('themes.view') ? [{
            label: 'Themes',
            href: '/admin/themes',
            icon: <Icon d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
        }] : []),
        ...(hasPermission('themes.customize') ? [{
            label: 'Customize',
            href: '/admin/customize',
            icon: <Icon d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />,
        }] : []),
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
        <div className="flex flex-col h-full">
            {/* Store Header */}
            <div className={`flex items-center border-b border-slate-700/50 ${collapsed ? 'p-3 justify-center' : 'p-5'}`}>
                <Link href="/admin" className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                        R
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="font-bold text-white text-sm truncate">Rafel</p>
                            <p className="text-xs text-slate-500 truncate">Admin Panel</p>
                        </div>
                    )}
                </Link>
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="ml-auto p-1 text-slate-500 hover:text-white rounded transition-colors"
                        title="Collapse sidebar"
                    >
                        <Icon d="M11 19l-7-7 7-7m8 14l-7-7 7-7" className="w-4 h-4" />
                    </button>
                )}
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute left-full ml-1 p-1 bg-slate-800 text-slate-400 hover:text-white rounded transition-colors opacity-0 group-hover:opacity-100"
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
            <div className={`border-t border-slate-700/50 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
                {collapsed ? (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        title={auth?.user?.name}>
                        {auth?.user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {auth?.user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{auth?.user?.name}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{auth?.user?.role}</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-1.5 text-slate-500 hover:text-white rounded transition-colors"
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
                    hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-admin-primary transition-all duration-300 ease-in-out
                    ${collapsed ? 'w-16' : 'w-60'}
                `}
            >
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors shadow-md"
                        title="Expand"
                    >
                        <Icon d="M9 5l7 7-7 7" className="w-3 h-3" />
                    </button>
                )}
                <SidebarContent />
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
                    fixed left-0 top-0 h-full w-64 z-50 bg-admin-primary transition-transform duration-300 ease-in-out md:hidden
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-60'}`}
            >
                {/* Top Bar */}
                <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
                    {/* Left: Mobile hamburger + Title */}
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <Icon d="M4 6h16M4 12h16M4 18h16" className="w-5 h-5" />
                        </button>
                        {title && (
                            <h1 className="text-base font-semibold text-slate-800 truncate">{title}</h1>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-4 h-4" />
                            <span>Search</span>
                            <kbd className="text-xs bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-400">⌘K</kbd>
                        </button>

                        {/* View Storefront */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <Icon d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" className="w-4 h-4" />
                            <span>Storefront</span>
                        </a>

                        {/* Primary Page Action Slot */}
                        {actions && <div className="flex items-center gap-2">{actions}</div>}
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
