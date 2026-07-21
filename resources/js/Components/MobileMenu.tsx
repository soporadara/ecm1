import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: any[];
    brands: any[];
    collections: any[];
}

export default function MobileMenu({ isOpen, onClose, categories, brands, collections }: MobileMenuProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[100] transition-opacity lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white z-[110] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                        <div className="text-brand-primary">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        </div>
                        <span className="text-2xl font-bold text-brand-secondary tracking-tight">pengu</span>
                    </Link>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-brand-primary transition-colors rounded-full hover:bg-gray-50"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto">
                    <ul className="flex flex-col text-[15px] font-medium uppercase tracking-wide text-brand-dark">
                        <li className="border-b border-gray-100">
                            <Link href="/" className="block px-6 py-4 hover:text-brand-primary hover:bg-gray-50 transition-colors" onClick={onClose}>Home</Link>
                        </li>
                        


                        <li className="border-b border-gray-100">
                            <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleDropdown('collections')}>
                                <span>Collections</span>
                                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'collections' ? 'rotate-180 text-brand-primary' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                            
                            <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openDropdown === 'collections' ? 'max-h-[800px] py-2' : 'max-h-0'}`}>
                                {collections?.map((col) => (
                                    <Link 
                                        key={col.id} 
                                        href={`/shop?collection=${col.slug}`} 
                                        className="block px-10 py-2.5 text-sm text-gray-600 hover:text-brand-primary transition-colors capitalize" 
                                        onClick={onClose}
                                    >
                                        {col.name}
                                    </Link>
                                ))}
                            </div>
                        </li>

                        <li className="border-b border-gray-100">
                            <Link href="/pages/about-us" className="block px-6 py-4 hover:text-brand-primary hover:bg-gray-50 transition-colors" onClick={onClose}>About Us</Link>
                        </li>
                        <li className="border-b border-gray-100">
                            <Link href="/blog" className="block px-6 py-4 hover:text-brand-primary hover:bg-gray-50 transition-colors" onClick={onClose}>Blog</Link>
                        </li>
                        <li className="border-b border-gray-100">
                            <Link href="/pages/contact-us" className="block px-6 py-4 hover:text-brand-primary hover:bg-gray-50 transition-colors" onClick={onClose}>Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Footer Utilities */}
                <div className="border-t border-gray-100 p-6 bg-gray-50 flex gap-4 justify-center">
                    <div className="text-center">
                        <Link href="/login" className="flex flex-col items-center gap-1 text-gray-500 hover:text-brand-primary transition-colors" onClick={onClose}>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <span className="text-xs uppercase font-medium">Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
