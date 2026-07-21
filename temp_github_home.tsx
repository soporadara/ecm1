import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import ProductCard from '../Components/ProductCard';
import PromoPopup from '../Components/PromoPopup';
import SupportFAB from '../Components/SupportFAB';

export default function Home({ sections, popup }: any) {
    const { t } = useTranslation();
    
    const renderSection = (section: any) => {
        const content = section.content_data || {};
        const products = section.products || [];

        switch (section.type) {
            case 'hero':
                return (
                    <section key={section.id} className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                        <div className="absolute inset-0">
                            {content.media_type === 'video' ? (
                                <video 
                                    src={content.media_url} 
                                    className="w-full h-full object-cover" 
                                    autoPlay muted loop playsInline
                                />
                            ) : (
                                <img 
                                    src={content.media_url || "https://wpocean.com/html/tf/pengu/assets/images/slider/8.png"} 
                                    className="w-full h-full object-cover" 
                                    alt="Hero Background" 
                                />
                            )}
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
                            <div className="max-w-2xl">
                                <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                                    {content.discount || 'New Collection'}
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-bold text-brand-secondary dark:text-white mb-6 leading-[1.1] font-serif tracking-tight">
                                    {section.title ? section.title : t('home.hero_title')}
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
                                    {section.subtitle ? section.subtitle : t('home.hero_subtitle')}
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href={content.button_link || '/shop'} className="px-10 py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-secondary transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-1">
                                        {content.button_text || t('home.shop_now')}
                                    </Link>
                                    <Link href="/shop" className="px-10 py-4 bg-white dark:bg-gray-800 text-brand-secondary dark:text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700">
                                        {t('home.view_lookbook')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'featured_categories':
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
                return (
                    <section key={section.id} className="py-10">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[content.left, content.right].map((promo: any, idx: number) => promo && (
                                    <div key={idx} className="relative h-[400px] overflow-hidden group bg-gray-900">
                                        <img src={promo.image} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" alt={promo.title} />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
                                            <span className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">{promo.subtitle}</span>
                                            <h3 className="text-4xl font-bold text-white font-serif mb-6">{promo.title}</h3>
                                            <Link href="/shop" className="bg-white text-brand-secondary px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-colors">
                                                Discover Now
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'flash_sale':
                return (
                    <section key={section.id} className="py-24 bg-brand-secondary text-white relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white fill-current"><polygon points="0,100 100,0 100,100"/></svg>
                        </div>
                        <div className="container mx-auto px-4 lg:px-8 relative z-10">
                            <div className="flex flex-col lg:flex-row items-center gap-16">
                                <div className="w-full lg:w-1/3">
                                    <span className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4 block">Limited Time Offer</span>
                                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight">{section.title}</h2>
                                    <p className="text-gray-300 mb-8 text-lg">{section.subtitle}</p>
                                    
                                    {/* Mock Countdown */}
                                    <div className="flex gap-4 mb-10">
                                        {[
                                            { label: 'Days', value: '02' },
                                            { label: 'Hours', value: '14' },
                                            { label: 'Mins', value: '35' },
                                            { label: 'Secs', value: '59' }
                                        ].map((t, i) => (
                                            <div key={i} className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur rounded">
                                                <span className="text-2xl md:text-3xl font-bold">{t.value}</span>
                                                <span className="text-xs uppercase tracking-wider text-gray-400">{t.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Link href="/shop" className="inline-block bg-brand-primary text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-brand-primary/30">
                                        Shop The Sale
                                    </Link>
                                </div>
                                <div className="w-full lg:w-2/3">
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.slice(0,3).map((product: any) => (
                                            <div key={product.id} className="bg-white rounded overflow-hidden text-brand-secondary">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'featured_collection':
                return (
                    <section key={section.id} className="py-20">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                                <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden group">
                                    <img src={content.image || "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80"} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Collection" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
                                        <h3 className="text-4xl font-bold text-white font-serif mb-4">{section.title}</h3>
                                        <p className="text-gray-200 mb-8 max-w-md">{section.subtitle}</p>
                                        <Link href="/shop" className="inline-flex w-max items-center bg-white text-brand-secondary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-colors">
                                            {t('home.explore_collection')} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="grid grid-cols-2 gap-6 h-full">
                                        {products.slice(0,4).map((product: any) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'benefits':
                return (
                    <section key={section.id} className="py-16 border-t border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-300">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                                {[
                                    { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', title: t('benefits.free_shipping'), desc: t('benefits.free_shipping_desc') },
                                    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: t('benefits.secure_payment'), desc: t('benefits.secure_payment_desc') },
                                    { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: t('benefits.easy_returns'), desc: t('benefits.easy_returns_desc') },
                                    { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: t('benefits.support'), desc: t('benefits.support_desc') }
                                ].map((b, i) => (
                                    <div key={i} className={`flex items-center justify-center gap-4 ${i !== 0 ? 'pt-8 md:pt-0' : ''}`}>
                                        <div className="text-brand-primary">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-secondary dark:text-white text-lg">{b.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'newsletter':
                return (
                    <section key={section.id} className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                        <div className="container mx-auto px-4 lg:px-8">
                            
                            {/* Our Services */}
                            <div className="mb-20">
                                <h2 className="text-3xl font-bold text-center text-brand-secondary dark:text-white mb-12 font-serif">{t('services.title')}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Shopping Agent */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center border-t-4 border-brand-primary">
                                        <div className="w-16 h-16 mx-auto mb-6 text-brand-primary flex items-center justify-center">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-4">{t('services.shopping_agent')}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                            {t('services.shopping_agent_desc')}
                                        </p>
                                        <Link href="/pages/shopping-agent" className="inline-block bg-brand-primary hover:bg-brand-secondary transition-colors text-white text-xs font-bold px-6 py-2 rounded-full w-full">
                                            Read More &gt;
                                        </Link>
                                    </div>
                                    
                                    {/* Shipping Service */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center border-t-4 border-brand-primary">
                                        <div className="w-16 h-16 mx-auto mb-6 text-brand-primary flex items-center justify-center">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-4">{t('services.shipping_service')}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                            {t('services.shipping_service_desc')}
                                        </p>
                                        <Link href="/pages/shipping-service" className="inline-block bg-brand-primary hover:bg-brand-secondary transition-colors text-white text-xs font-bold px-6 py-2 rounded-full w-full">
                                            Read More &gt;
                                        </Link>
                                    </div>
                                    
                                    {/* Payment Service */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center border-t-4 border-brand-primary">
                                        <div className="w-16 h-16 mx-auto mb-6 text-brand-primary flex items-center justify-center">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-4">{t('services.payment_service')}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                            {t('services.payment_service_desc')}
                                        </p>
                                        <Link href="/pages/payment-service" className="inline-block bg-brand-primary hover:bg-brand-secondary transition-colors text-white text-xs font-bold px-6 py-2 rounded-full w-full">
                                            Read More &gt;
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Available Sites */}
                            <div className="border-t border-gray-200 dark:border-gray-800 pt-16 text-center">
                                <h3 className="text-2xl font-bold text-brand-secondary dark:text-white mb-8 relative inline-block">
                                    <span className="relative z-10 px-4 bg-gray-50 dark:bg-gray-900">{t('services.available_sites')}</span>
                                    <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-brand-primary -z-0 -translate-y-1/2"></span>
                                </h3>
                                
                                <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
                                    <a href="https://taobao.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSKuxO7VPrnrIXrUoKXQGKeJIsiz67RLnlGH1_K9V-w&s=10" alt="Taobao" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-brand-primary font-medium">Taobao</span>
                                    </a>
                                    <a href="https://alibaba.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                            <img src="https://m.media-amazon.com/images/I/71IxKvGqiWL.png" alt="Alibaba" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-brand-primary font-medium">Alibaba</span>
                                    </a>
                                    <a href="https://shopee.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                            <img src="https://cdn.prod.website-files.com/62ccab534b634e946221774e/645c32060b7c121638eee5e6_shopee.png" alt="Shopee" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-brand-primary font-medium">Shopee</span>
                                    </a>
                                    <a href="https://lazada.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                            <img src="https://static.vecteezy.com/system/resources/thumbnails/054/650/831/small_2x/lazada-logo-rounded-lazada-logo-free-png.png" alt="Lazada" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-brand-primary font-medium">Lazada</span>
                                    </a>
                                    <a href="https://pinduoduo.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                            <img src="https://gbaike-image.cdn.bcebos.com/35a85edf8db1cb1349541f11ad0d414e9258d109dd22/35a85edf8db1cb1349541f11ad0d414e9258d109dd22_url?x-bce-process=image/format,f_auto/resize,m_lfit,w_400,limit_1" alt="Pinduoduo" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs text-gray-500 group-hover:text-brand-primary font-medium">Pinduoduo</span>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                );

            case 'lookbook':
                return (
                    <section key={section.id} className="py-0 relative">
                        <div className="w-full h-[70vh] min-h-[600px] relative bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${content.image || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80'})` }}>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <h2 className="text-5xl lg:text-7xl font-bold text-white font-serif mb-6">{section.title}</h2>
                                <p className="text-xl text-white/90 mb-10 max-w-lg">{section.subtitle}</p>
                                <Link href="/shop" className="bg-white text-brand-secondary px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-primary hover:text-white transition-all shadow-xl">
                                    Shop The Look
                                </Link>
                            </div>
                        </div>
                    </section>
                );

            case 'blog_posts':
                return (
                    <section key={section.id} className="py-24 bg-white dark:bg-black transition-colors duration-300">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-4 font-serif">{section.title}</h2>
                                <p className="text-gray-500 dark:text-gray-400">Read our latest news, trends and styling tips.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[1,2,3].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="relative overflow-hidden aspect-[3/2] rounded mb-6">
                                            <img src={`https://images.unsplash.com/photo-${['1490481651871-ab68de25d43d','1445205170230-053b83016050','1483985988355-763728e1935b'][i-1]}?w=800&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog" />
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-brand-gray dark:text-gray-400 uppercase tracking-widest mb-3">
                                            <span>Fashion</span>
                                            <span>•</span>
                                            <span>March 12, 2026</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-secondary dark:text-white mb-3 font-serif group-hover:text-brand-primary transition-colors">The Ultimate Guide to Spring Fashion</h3>
                                        <p className="text-gray-500 dark:text-gray-400 line-clamp-2">Discover the essential pieces you need to transition your wardrobe into the new season seamlessly.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
                
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <Head title="Premium Lifestyle E-Commerce" />
            {sections.map((section: any) => renderSection(section))}
            {popup && <PromoPopup popup={popup} />}
            <SupportFAB />
        </MainLayout>
    );
}
