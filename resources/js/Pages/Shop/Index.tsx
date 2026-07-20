import { Head, Link, router, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import ProductCard from '../../Components/ProductCard';
import { useState, useEffect } from 'react';
import { useCurrency } from '../../Contexts/CurrencyContext';

export default function Index({ products, filters }: any) {
    // Defensive checks to prevent React runtime crashes
    filters = filters || {};
    if (Array.isArray(filters)) {
        filters = {};
    }
    products = products || { data: [], total: 0, from: 0, to: 0, per_page: 12, links: [] };

    const { global_nav }: any = usePage().props;
    const { categories, brands, collections } = global_nav || { categories: [], brands: [], collections: [] };
    const { formatPrice } = useCurrency();

    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || 'recommended');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    // Accordion state
    const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
        category: true,
        brand: true,
        price: true,
        color: true,
    });

    const toggleFilter = (key: string) => {
        setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const updateFilters = (key: string, value: string | null) => {
        const newFilters = { ...filters };
        if (value === null || value === '') {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }
        // Reset page to 1 when filters change
        delete newFilters.page;
        
        router.get('/shop', newFilters, { preserveState: true, preserveScroll: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('search', search || null);
    };

    const clearAllFilters = () => {
        setSearch('');
        setSort('recommended');
        router.get('/shop', {}, { preserveState: true, preserveScroll: true });
    };

    const activeFilterCount = Object.keys(filters).filter(k => k !== 'page' && k !== 'sort').length;

    return (
        <MainLayout>
            <Head title="Shop" />
            
            {/* Page Header */}
            <div className="bg-brand-secondary py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,100 100,0 100,100" fill="currentColor"/></svg>
                </div>
                <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-4">The Collection</h1>
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-300">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>•</span>
                        <span className="text-white">Shop</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12">
                {/* Active Filters Toolbar */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                        <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
                        {Object.entries(filters).map(([key, value]) => {
                            if (key === 'page' || key === 'sort') return null;
                            return (
                                <span key={key} className="bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 capitalize">
                                    {key}: {String(value)}
                                    <button onClick={() => updateFilters(key, null)} className="hover:text-red-600 focus:outline-none">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </span>
                            );
                        })}
                        <button onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-brand-primary underline ml-2">Clear All</button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <button 
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded font-medium text-brand-dark"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </button>
                    </div>

                    {/* Desktop Sidebar & Mobile Filter Drawer */}
                    <aside className={`fixed inset-0 z-[120] lg:static lg:z-0 lg:block lg:w-1/4 transform ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                        <div className="h-full bg-white lg:bg-transparent flex flex-col">
                            
                            {/* Mobile Header */}
                            <div className="lg:hidden flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold font-serif text-brand-secondary">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-400 hover:text-brand-primary rounded-full bg-gray-50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 lg:p-0">
                                
                                {/* Search Filter */}
                                <div className="mb-10">
                                    <h3 className="text-xl font-bold text-[#0a1b2a] font-serif mb-2">Search</h3>
                                    <div className="w-8 h-0.5 bg-[#f75b5b] mb-6"></div>
                                    <form onSubmit={handleSearch} className="relative flex">
                                        <input 
                                            type="text" 
                                            placeholder="Search" 
                                            className="w-full px-4 py-3 bg-[#fdf2f2] border-none focus:ring-0 text-sm outline-none text-gray-700"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button type="submit" className="px-5 bg-[#f75b5b] text-white hover:bg-red-600 transition-colors flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        </button>
                                    </form>
                                </div>
                                
                                {/* Price Filter */}
                                <div className="mb-10">
                                    <h3 className="text-xl font-bold text-[#0a1b2a] font-serif mb-2">Price</h3>
                                    <div className="w-8 h-0.5 bg-[#f75b5b] mb-6"></div>
                                    <ul className="space-y-4">
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${!filters.min_price && !filters.max_price ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    All prices
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={!filters.min_price && !filters.max_price}
                                                    onChange={() => { updateFilters('min_price', null); updateFilters('max_price', null); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.min_price === '50' && filters.max_price === '100' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    {formatPrice(50)} - {formatPrice(100)}
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={filters.min_price === '50' && filters.max_price === '100'}
                                                    onChange={() => { updateFilters('min_price', '50'); updateFilters('max_price', '100'); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.min_price === '100' && filters.max_price === '200' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    {formatPrice(100)} - {formatPrice(200)}
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={filters.min_price === '100' && filters.max_price === '200'}
                                                    onChange={() => { updateFilters('min_price', '100'); updateFilters('max_price', '200'); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.min_price === '200' && filters.max_price === '300' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    {formatPrice(200)} - {formatPrice(300)}
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={filters.min_price === '200' && filters.max_price === '300'}
                                                    onChange={() => { updateFilters('min_price', '200'); updateFilters('max_price', '300'); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.min_price === '300' && filters.max_price === '400' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    {formatPrice(300)} - {formatPrice(400)}
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={filters.min_price === '300' && filters.max_price === '400'}
                                                    onChange={() => { updateFilters('min_price', '300'); updateFilters('max_price', '400'); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.min_price === '400' && !filters.max_price ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    {formatPrice(400)} and more
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="price_range"
                                                    checked={filters.min_price === '400' && !filters.max_price}
                                                    onChange={() => { updateFilters('min_price', '400'); updateFilters('max_price', null); }}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                    </ul>
                                </div>

                                {/* Size Filter */}
                                <div className="mb-10">
                                    <h3 className="text-xl font-bold text-[#0a1b2a] font-serif mb-2">Size</h3>
                                    <div className="w-8 h-0.5 bg-[#f75b5b] mb-6"></div>
                                    <ul className="space-y-4">
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.size === 'small' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    Small Size
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="size_filter"
                                                    checked={filters.size === 'small'}
                                                    onChange={() => updateFilters('size', filters.size === 'small' ? null : 'small')}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.size === 'medium' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    Medium Size
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="size_filter"
                                                    checked={filters.size === 'medium'}
                                                    onChange={() => updateFilters('size', filters.size === 'medium' ? null : 'medium')}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex justify-between items-center cursor-pointer group">
                                                <span className={`text-[15px] ${filters.size === 'large' ? 'text-[#0a1b2a] font-medium' : 'text-gray-500 hover:text-[#0a1b2a]'}`}>
                                                    Large Size
                                                </span>
                                                <input 
                                                    type="radio" 
                                                    name="size_filter"
                                                    checked={filters.size === 'large'}
                                                    onChange={() => updateFilters('size', filters.size === 'large' ? null : 'large')}
                                                    className="w-4 h-4 text-[#f75b5b] focus:ring-[#f75b5b] border-gray-300"
                                                />
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Mobile Footer */}
                            <div className="lg:hidden p-6 border-t border-gray-100 bg-gray-50">
                                <button onClick={() => setIsMobileFilterOpen(false)} className="w-full py-3 bg-brand-primary text-white font-bold rounded">
                                    Show {products.total} Results
                                </button>
                            </div>
                        </div>
                    </aside>
                    
                    {/* Main Products Grid */}
                    <div className="w-full lg:w-3/4">
                        
                        {/* Top Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100 gap-4">
                            <div className="flex items-center justify-between w-full">
                                {/* Grid/List Toggle */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#f75b5b] text-white' : 'bg-[#fdf2f2] text-gray-500 hover:bg-[#f75b5b] hover:text-white'}`}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#f75b5b] text-white' : 'bg-[#fdf2f2] text-gray-500 hover:bg-[#f75b5b] hover:text-white'}`}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
                                    </button>
                                </div>

                                <p className="text-[#596672] text-[15px] font-medium text-center flex-1">
                                    Showing Products {products.from || 0} - {products.to || 0} Of {products.total} Result
                                </p>
                                
                                {/* Sorting */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[#596672] text-[15px] hidden sm:inline">Short By :</span>
                                    <select 
                                        className="border-none bg-[#fdf2f2] text-[#596672] rounded-none px-4 py-2 text-[14px] focus:outline-none focus:ring-0 cursor-pointer"
                                        value={sort}
                                        onChange={(e) => {
                                            setSort(e.target.value);
                                            updateFilters('sort', e.target.value);
                                        }}
                                    >
                                        <option value="recommended">Show {products.per_page} Items</option>
                                        <option value="newest">Newest</option>
                                        <option value="price_low">Price Low</option>
                                        <option value="price_high">Price High</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        {/* Products */}
                        {products.data.length === 0 ? (
                            <div className="text-center py-24 text-gray-500 bg-gray-50 rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-brand-secondary mb-2">No products found</h3>
                                <p className="mb-6 max-w-md mx-auto">We couldn't find any products matching your current filters. Try adjusting your search criteria.</p>
                                <button onClick={clearAllFilters} className="px-6 py-2 bg-brand-secondary text-white font-bold rounded hover:bg-brand-primary transition-colors">
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid' 
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" 
                                : "flex flex-col gap-8"
                            }>
                                {products.data.map((product: any) => (
                                    <div key={product.id} className={viewMode === 'list' ? 'flex flex-col sm:flex-row gap-6 items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow' : ''}>
                                        <div className={viewMode === 'list' ? 'w-full sm:w-1/3 flex-shrink-0' : 'w-full'}>
                                            <ProductCard product={product} />
                                        </div>
                                        {viewMode === 'list' && (
                                            <div className="flex-1 flex flex-col pt-4 sm:pt-0">
                                                <h3 className="text-xl font-bold font-serif text-brand-secondary mb-2 hover:text-brand-primary transition-colors">
                                                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                                                </h3>
                                                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{product.short_description || product.description?.substring(0, 150) + '...'}</p>
                                                <div className="mt-auto flex items-center gap-4">
                                                    <Link href={`/shop/${product.slug}`} className="px-6 py-2.5 bg-brand-secondary text-white text-sm font-bold rounded hover:bg-brand-primary transition-colors">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Links */}
                        {products.links && products.links.length > 3 && (
                            <div className="flex justify-center items-center mt-16 gap-2">
                                {products.links.map((link: any, index: number) => {
                                    if (!link.url) return <span key={index} className="px-4 py-2 text-gray-300" dangerouslySetInnerHTML={{ __html: link.label }} />;
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${link.active ? 'bg-brand-secondary text-white' : 'bg-gray-50 text-gray-600 hover:bg-brand-primary hover:text-white'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
