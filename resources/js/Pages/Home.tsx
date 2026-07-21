import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import ProductCard from '../Components/ProductCard';
import PromoPopup from '../Components/PromoPopup';
import SupportFAB from '../Components/SupportFAB';
import { useState, useRef } from 'react';

// Logistics Interfaces
interface Marketplace {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    brand_color: string | null;
    website_url: string | null;
    description: string | null;
    status: string;
}

export default function Home({ banners, sections, popup, marketplaces, featureFlags, page }: any) {
    const { t } = useTranslation();
    
    // Logistics state
    const [url, setUrl] = useState('');
    const [urlState, setUrlState] = useState<'idle' | 'validating' | 'error'>('idle');
    const [urlError, setUrlError] = useState('');
    const [isManualOrderOpen, setIsManualOrderOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const MARKETPLACE_ICONS: Record<string, string> = {
        taobao: '🛍️',
        tmall: '🏪',
        '1688': '🏭',
        alibaba: '🌐',
        pinduoduo: '🎁',
        aliexpress: '🚀',
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
            setUrlError('');
            setUrlState('idle');
        } catch {
            inputRef.current?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = url.trim();
        if (!trimmed) {
            setUrlError('Please paste a product link first.');
            setUrlState('error');
            return;
        }
        try {
            const parsed = new URL(trimmed);
            if (parsed.protocol !== 'https:') {
                setUrlError('Please enter a valid HTTPS product URL.');
                setUrlState('error');
                return;
            }
        } catch {
            setUrlError('Please enter a valid product URL.');
            setUrlState('error');
            return;
        }
        setUrlState('validating');
        
        router.post('/logistics/import/preview', { url: trimmed }, {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                setUrlState('error');
                setUrlError(errors.url || 'Failed to import product. Please try again.');
            },
            onFinish: () => {
                // If we get here and there are no errors, the redirect happened successfully.
                if (!urlError) {
                    setUrlState('idle');
                }
            }
        });
    };

    const renderSection = (section: any) => {
        const content = section.content || {};
        const products = section.products || [];

        switch (section.type) {
            case 'hero':
                return null; // Hero is handled separately now

            case 'featured_categories':
                // Re-enable if flag is on
                if (!featureFlags?.storefront_products_enabled) return null;
                return (
                    <section key={section.id} className="py-20 bg-white dark:bg-black transition-colors duration-300">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-4 font-serif">{t(section.title)}</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t(section.subtitle)}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {['Women', 'Men', 'Accessories', 'Beauty'].map((cat, i) => (
                                    <Link key={i} href={`/shop?category=${cat.toLowerCase()}`} className="group relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 block">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                                        <img src={`https://images.unsplash.com/photo-${['1483985988355-763728e1935b','1516826957135-7331811a5ebf','1492707892479-7bc8d5a4ee93','1596462502278-27bfdc403348'][i]}?w=600&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat} />
                                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                                            <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-6 py-3 text-brand-secondary dark:text-white font-bold uppercase tracking-widest text-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">{t(cat)}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'new_arrivals':
            case 'best_sellers':
            case 'trending':
            case 'recommended':
            case 'customer_favorites':
            case 'limited_stock':
                if (!featureFlags?.storefront_products_enabled) return null;
                if (products.length === 0) return null;
                return (
                    <section key={section.id} className={`py-20 transition-colors duration-300 ${['best_sellers', 'recommended'].includes(section.type) ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-black'}`}>
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex justify-between items-end mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-brand-secondary dark:text-white font-serif">{t(section.title)}</h2>
                                    {section.subtitle && <p className="text-gray-500 dark:text-gray-400 mt-2">{t(section.subtitle)}</p>}
                                </div>
                                <Link href="/shop" className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-white hover:text-brand-primary transition-colors">
                                    {t('home.view_all')} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                                {products.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="mt-10 text-center md:hidden">
                                <Link href="/shop" className="inline-block border border-gray-300 dark:border-gray-700 px-8 py-3 text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    {t('home.view_all')}
                                </Link>
                            </div>
                        </div>
                    </section>
                );

            case 'promo_split':
            case 'flash_sale':
            case 'brands':
            case 'instagram':
                if (!featureFlags?.storefront_products_enabled) return null;
                return null; // Simplifying the stub for brevity, but returning null hides it properly if disabled

            default:
                return null;
        }
    };

    return (
        <MainLayout title="Home" description="Shop from China, We Purchase & Deliver It for You">
            <Head>
                <title>PurchaseAsia — Cross-Border Logistics</title>
            </Head>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex snap-x snap-mandatory overflow-x-auto hide-scrollbar">
                {(banners && banners.length > 0) ? (
                    banners.map((banner: any, index: number) => {
                        const fallbackImg = "https://img.magnific.com/free-photo/stylish-happy-girl-shopping-portrait-modern-woman-with-shop-bag-laughing-smiling-satisfied_1258-119361.jpg?semt=ais_hybrid&w=740&q=80";
                        const dImg = banner.desktop_image_url || fallbackImg;
                        const mImg = banner.mobile_image_url || dImg;
                        
                        return (
                            <div key={banner.id} className="min-w-full snap-start relative flex-shrink-0" style={{ backgroundColor: banner.fallback_color }}>
                                <div className="absolute inset-0">
                                    <picture>
                                        <source media="(max-width: 767px)" srcSet={mImg} />
                                        <source media="(min-width: 768px)" srcSet={dImg} />
                                        <img src={dImg} className="w-full h-full object-cover" alt={banner.title_en || 'Hero Banner'} />
                                    </picture>
                                    {banner.theme_variant === 'light' && <div className="absolute inset-0 bg-black/40"></div>}
                                </div>
                                <div className={`container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10 flex h-full ${
                                    banner.content_alignment === 'top' ? 'items-start' : banner.content_alignment === 'bottom' ? 'items-end' : 'items-center'
                                } ${
                                    banner.text_position === 'left' ? 'justify-start text-left' : banner.text_position === 'right' ? 'justify-end text-right' : 'justify-center text-center'
                                }`}>
                                    <div className="max-w-2xl">
                                        {banner.eyebrow_en && (
                                            <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${banner.theme_variant === 'light' ? 'bg-red-50 text-brand-primary' : 'bg-brand-primary text-white'}`}>
                                                {t(banner.eyebrow_en) || t(banner.eyebrow_km)}
                                            </span>
                                        )}
                                        {banner.title_en && (
                                            <h1 className={`text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] font-serif tracking-tight ${banner.theme_variant === 'light' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                                {t(banner.title_en) || t(banner.title_km)}
                                            </h1>
                                        )}
                                        {banner.description_en && (
                                            <div 
                                                className={`text-xl mb-10 max-w-lg leading-relaxed font-light ${banner.text_position === 'center' ? 'mx-auto' : ''} ${banner.theme_variant === 'light' ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'}`}
                                                dangerouslySetInnerHTML={{ __html: t(banner.description_en) || t(banner.description_km) }}
                                            />
                                        )}
                                        
                                        {(banner.primary_button_label || banner.secondary_button_label) && (
                                            <div className={`flex flex-wrap items-center gap-4 ${banner.text_position === 'center' ? 'justify-center' : ''}`}>
                                                {banner.primary_button_label && (
                                                    <Link href={banner.primary_button_url || '#'} className="px-10 py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-secondary transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-1">
                                                        {t(banner.primary_button_label)}
                                                    </Link>
                                                )}
                                                {banner.secondary_button_label && (
                                                    <Link href={banner.secondary_button_url || '#'} className={`px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${banner.theme_variant === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-gray-900'}`}>
                                                        {t(banner.secondary_button_label)}
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Fallback to static banner requested by user
                    <div className="min-w-full relative bg-gray-50">
                        <div className="absolute inset-0">
                            <img src={page?.banner_image || "https://img.magnific.com/free-photo/stylish-happy-girl-shopping-portrait-modern-woman-with-shop-bag-laughing-smiling-satisfied_1258-119361.jpg?semt=ais_hybrid&w=740&q=80"} className="w-full h-full object-cover object-center" alt="Hero Background" />
                            {/* No dark overlay, kept bright */}
                        </div>
                        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
                            <div className="max-w-2xl">
                                <span className="inline-block py-1 px-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">Cross-Border Logistics</span>
                                <h1 className="text-4xl lg:text-6xl font-bold text-brand-secondary mb-4 leading-tight font-serif tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">Shop from Asia.<br />We purchase and<br />deliver it for you.</h1>
                                <p className="text-lg text-gray-800 mb-8 max-w-md leading-relaxed font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">Your trusted partner for international shipping.</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href="/pages/about-us" className="px-8 py-3.5 bg-brand-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-secondary transition-all rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-1">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* URL Input Section (Below Banner) */}
            <section className="py-12 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <div className="bg-gray-50 dark:bg-gray-800/80 backdrop-blur-sm p-6 lg:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-brand-secondary dark:text-white mb-4 text-center">Start Your Order</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Paste a product link from Taobao, Tmall, 1688, or AliExpress.</p>
                        
                        <form onSubmit={handleSubmit} className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <input 
                                type="url" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste a product link here..." 
                                className="block w-full pl-12 pr-24 py-4 lg:py-5 border-0 rounded-2xl text-gray-900 dark:text-white bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-brand-primary text-lg shadow-sm placeholder:text-gray-400"
                            />
                            <div className="absolute inset-y-2 right-2 flex items-center">
                                <button 
                                    type="button"
                                    onClick={handlePaste}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm border border-gray-200 dark:border-gray-600 flex items-center gap-2"
                                >
                                    📋 Paste
                                </button>
                            </div>
                        </form>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={handleSubmit} className="flex-1 bg-brand-primary text-white px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm hover:bg-brand-secondary hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2">
                                🛒 Get This Product
                            </button>
                            <button onClick={() => setIsManualOrderOpen(true)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2">
                                📝 Manual Order
                            </button>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                            <span>Supported: Taobao • Tmall • 1688 • Alibaba • Pinduoduo • AliExpress</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="py-16 bg-[#f4f4f4] border-t border-gray-200">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12 relative">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Our Services</h2>
                        <div className="w-16 h-1 bg-[#de4a5e] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Service 1 */}
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden text-center">
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 mx-auto mb-4 text-[#de4a5e] flex items-center justify-center">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#de4a5e] mb-4 font-khmer">សេវាកម្មទិញ</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-khmer">
                                    ពួកយើងជួយទិញទំនិញពីគ្រប់វិបសាយ ដែលលោកអ្នកចង់ទិញ មានដូចជា Taobao, Tmall, 1688, Pingduoduo. etc រួមជាមួយការធានា និងសុវត្ថិភាព។
                                </p>
                            </div>
                            <Link href="/pages/shopping-agent" className="bg-[#de4a5e] text-white py-3 text-sm font-khmer hover:bg-[#c93c4e] transition-colors w-full">
                                ព័ត៌មានលម្អិត &gt;
                            </Link>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden text-center">
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 mx-auto mb-4 text-[#de4a5e] flex items-center justify-center">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#de4a5e] mb-4 font-khmer">សេវាកម្មដឹកជញ្ជូនទំនិញ</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-khmer">
                                    ប្រើប្រាស់អាស័យដ្ឋានរបស់យើង ដើម្បី ផ្ញើទំនិញពីប្រទេសចិន មកខ្មែរ រឺរឺខ្មែរ ទៅចិនវិញ យ៉ាងឆាប់រហ័ស ងាយស្រួល ជាមួយប្រព័ន្ធ តាមដានទំនិញយ៉ាងច្បាស់លាស់។
                                </p>
                            </div>
                            <Link href="/pages/shipping-service" className="bg-[#de4a5e] text-white py-3 text-sm font-khmer hover:bg-[#c93c4e] transition-colors w-full">
                                ព័ត៌មានលម្អិត &gt;
                            </Link>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden text-center">
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 mx-auto mb-4 text-[#de4a5e] flex items-center justify-center">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#de4a5e] mb-4 font-khmer">សេវាកម្មបង់ប្រាក់</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-khmer">
                                    ធ្វើការបង់ប្រាក់ទៅកាន់អ្នកលក់ រឺរោងចក្រចិន នៅក្នុងប្រទេសចិន តាមរយៈធនាគារក្នុងស្រុក គ្រប់ទីកន្លែង សុវត្ថិភាព 24/7 ជាមួយ របាយការណ៍ទូទាត់ ជូនលោកអ្នក។
                                </p>
                            </div>
                            <Link href="/pages/payment-service" className="bg-[#de4a5e] text-white py-3 text-sm font-khmer hover:bg-[#c93c4e] transition-colors w-full">
                                ព័ត៌មានលម្អិត &gt;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Available Sites Section */}
            <section className="py-16 bg-[#f4f4f4]">
                <div className="container mx-auto px-4 lg:px-8 overflow-hidden">
                    <div className="text-center mb-12 relative">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Available Sites</h2>
                        <div className="w-16 h-1 bg-[#de4a5e] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="relative max-w-5xl mx-auto px-10">
                        {/* Fake slider arrows */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-3xl cursor-pointer hover:text-gray-600">&lt;</div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-3xl cursor-pointer hover:text-gray-600">&gt;</div>
                        
                        <div className="flex gap-10 overflow-x-auto pb-4 hide-scrollbar justify-center">
                            {[
                                { name: 'Taobao', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSKuxO7VPrnrIXrUoKXQGKeJIsiz67RLnlGH1_K9V-w&s=10' },
                                { name: 'Pinduoduo', img: 'https://gbaike-image.cdn.bcebos.com/35a85edf8db1cb1349541f11ad0d414e9258d109dd22/35a85edf8db1cb1349541f11ad0d414e9258d109dd22_url?x-bce-process=image/format,f_auto/resize,m_lfit,w_400,limit_1' },
                                { name: 'Alibaba', img: 'https://m.media-amazon.com/images/I/71IxKvGqiWL.png' },
                                { name: 'Lazada', img: 'https://static.vecteezy.com/system/resources/thumbnails/054/650/831/small_2x/lazada-logo-rounded-lazada-logo-free-png.png' },
                                { name: 'Shopee', img: 'https://cdn.prod.website-files.com/62ccab534b634e946221774e/645c32060b7c121638eee5e6_shopee.png' }
                            ].map((site, index) => (
                                <div key={index} className="flex-shrink-0 flex flex-col items-center gap-3">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow hover:shadow-md transition-shadow">
                                        <img src={site.img} alt={site.name} className="w-full h-full object-contain rounded-full" />
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{site.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Workflow Section */}
            <section className="py-20 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-16 font-serif">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-gray-50 dark:border-black mb-6">
                                🔗
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">1. Paste Link</h3>
                            <p className="text-gray-500 dark:text-gray-400">Find what you want on any supported Asian marketplace and paste the link.</p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-gray-50 dark:border-black mb-6">
                                💳
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">2. Pay Securely</h3>
                            <p className="text-gray-500 dark:text-gray-400">Checkout easily in your local currency. No hidden international fees.</p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-gray-50 dark:border-black mb-6">
                                📦
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">3. We Receive</h3>
                            <p className="text-gray-500 dark:text-gray-400">We receive, inspect, and safely repackage your items in our overseas warehouse.</p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-brand-primary mb-6">
                                ✈️
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">4. Global Delivery</h3>
                            <p className="text-gray-500 dark:text-gray-400">Fast and reliable international shipping straight to your doorstep.</p>
                        </div>
                    </div>

                    <div className="mt-20 rounded-3xl overflow-hidden relative h-[400px] shadow-2xl">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFCqSflPZKU3FNYGujh70-vVRqaGMgZdep5zFDp0BLWI4PpyMtJ2Lqeag&s=10" alt="Warehouse and Logistics" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-8 md:p-12 text-left">
                            <h3 className="text-3xl font-bold text-white mb-2">State of the Art Facilities</h3>
                            <p className="text-gray-200 max-w-2xl text-lg">Our modern consolidation warehouses ensure your goods are handled with the utmost care before their international journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other CMS Sections (Products, Categories, etc.) */}
            {sections && sections.filter((s: any) => s.type !== 'hero').map((section: any) => renderSection(section))}

            {/* Testimonials/Feedback Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-4 font-serif">What Our Customers Say</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Don't just take our word for it - hear from our satisfied shoppers.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah J.', role: 'Boutique Owner', text: 'Rafel made sourcing from Taobao incredibly easy. The interface is seamless and delivery was surprisingly fast!', rating: 5 },
                            { name: 'Michael T.', role: 'Tech Enthusiast', text: 'I used to struggle with translation and payments on Chinese sites. This platform solves all of that. Highly recommended.', rating: 5 },
                            { name: 'Elena R.', role: 'Regular Shopper', text: 'The warehouse consolidation saved me a lot on shipping fees. Their customer service is also top-notch.', rating: 4 }
                        ].map((review, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, j) => (
                                        <svg key={j} className={`w-5 h-5 ${j < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 italic">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-brand-secondary dark:text-white">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-secondary dark:text-white">{review.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Manual Order Modal Popup */}
            {isManualOrderOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg p-6 lg:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setIsManualOrderOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <div className="mb-6 text-center">
                            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📝</div>
                            <h2 className="text-2xl font-bold text-brand-secondary dark:text-white font-serif">Manual Order</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Enter the product details manually if the auto-import fails or the platform is not supported.</p>
                        </div>
                        
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" placeholder="e.g. Vintage Leather Jacket" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Original Product URL</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price (CNY)</label>
                                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                                    <input type="number" defaultValue="1" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Remarks / Specifications (Size, Color)</label>
                                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" rows={3} placeholder="e.g. Size M, Color Black" />
                            </div>
                            <div className="pt-4">
                                <button type="button" onClick={() => setIsManualOrderOpen(false)} className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-secondary transition-colors">
                                    Add to Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <PromoPopup popup={popup} />
            <SupportFAB />
        </MainLayout>
    );
}
