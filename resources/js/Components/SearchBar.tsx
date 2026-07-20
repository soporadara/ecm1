import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timerId = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(timerId);
    }, [query]);

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Icon Trigger */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="hover:text-brand-primary transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 p-2 sm:p-2.5 hidden sm:block" 
                aria-label="Search"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {/* Dropdown Box */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative">
                            <input 
                                type="text"
                                autoFocus
                                placeholder="Search products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                {isLoading ? (
                                    <svg className="animate-spin w-4 h-4 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {query.length >= 2 && results.length === 0 && !isLoading && (
                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                No products found for "{query}"
                            </div>
                        )}
                        
                        {results.length > 0 && (
                            <ul className="py-2">
                                {results.map((product) => (
                                    <li key={product.id}>
                                        <Link 
                                            href={`/shop/${product.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                                                {product.images && product.images.length > 0 ? (
                                                    <img src={product.images[0].image_path} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No img</div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {product.sale_price ? (
                                                        <>
                                                            <span className="text-brand-primary text-xs font-bold">${product.sale_price}</span>
                                                            <span className="text-gray-400 line-through text-xs">${product.price}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-900 dark:text-white text-xs font-bold">${product.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {results.length > 0 && (
                            <div className="p-3 border-t border-gray-100 dark:border-gray-800 text-center">
                                <Link 
                                    href={`/shop?search=${encodeURIComponent(query)}`} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary transition-colors"
                                >
                                    View All Results
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
