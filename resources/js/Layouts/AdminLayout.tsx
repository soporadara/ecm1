import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
                <div className="p-6 border-b border-gray-800">
                    <Link href="/admin" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <svg className="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        <span>Pengu <span className="text-gray-400 text-sm font-normal">Admin</span></span>
                    </Link>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Products
                    </Link>
                    <Link href="/admin/orders" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Orders
                    </Link>
                    <Link href="/admin/pages" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Pages
                    </Link>
                    <Link href="/admin/posts" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Blog Posts
                    </Link>
                    <Link href="/admin/popups" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Popups & Ads
                    </Link>
                    <Link href="/admin/settings/banner" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Banner Settings
                    </Link>
                    {(auth.user.role === 'superadmin' || auth.user.role === 'admin') && (
                        <Link href="/admin/users" className="block px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                            Staff & Users
                        </Link>
                    )}
                </nav>
                
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center font-bold">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{auth.user.name}</p>
                            <Link href="/logout" method="post" as="button" className="text-xs text-gray-400 hover:text-white">Logout</Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 md:hidden">
                    <span className="font-bold text-lg">Admin</span>
                    <button className="p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                </header>
                
                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
