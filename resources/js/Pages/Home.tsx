import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import SupportFAB from '../Components/SupportFAB';
import PromoPopup from '../Components/PromoPopup';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Globe2, PackageCheck, ShoppingBag, Truck } from 'lucide-react';

export default function Home({ banners, bannerMode = 'slideshow', page, marketplaces = [], popup = null }: any) {
    const { t, i18n } = useTranslation();
    const manualOrderHref = '/manual-order';
    const sitesScrollerRef = useRef<HTMLDivElement>(null);
    
    // Auto-playing slideshow logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const hasBanners = banners && banners.length > 0;
    
    useEffect(() => {
        if (bannerMode !== 'slideshow' || !hasBanners || banners.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [bannerMode, banners, hasBanners]);

    const changeSlide = (direction: 'previous' | 'next') => {
        if (!hasBanners || banners.length <= 1) return;
        setCurrentSlide((prev) => {
            if (direction === 'previous') return (prev - 1 + banners.length) % banners.length;
            return (prev + 1) % banners.length;
        });
    };

    const services = [
        {
            title: t('services.product_purchasing'),
            description: t('services.product_purchasing_desc'),
            icon: ShoppingBag,
        },
        {
            title: t('services.logistics_delivery'),
            description: t('services.logistics_delivery_desc'),
            icon: PackageCheck,
        },
    ];

    const workflowSteps = [
        {
            title: t('how_it_works.request_items'),
            description: t('how_it_works.request_items_desc'),
            icon: ClipboardList,
        },
        {
            title: t('how_it_works.get_approved'),
            description: t('how_it_works.get_approved_desc'),
            icon: CheckCircle2,
        },
        {
            title: t('how_it_works.we_process'),
            description: t('how_it_works.we_process_desc'),
            icon: PackageCheck,
        },
        {
            title: t('how_it_works.delivery'),
            description: t('how_it_works.delivery_desc'),
            icon: Truck,
        },
    ];

    const siteName = (site: any) => {
        const key = `name_${i18n.language}`;
        return site?.[key] || site?.name_km || site?.name_en || site?.name || 'Shopping site';
    };

    const scrollSites = (direction: 'previous' | 'next') => {
        sitesScrollerRef.current?.scrollBy({
            left: direction === 'next' ? 360 : -360,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
    };

    return (
        <MainLayout title="Home" description="Logistics and Manual-Order Platform">
            <Head>
                <title>PurchaseAsia — Cross-Border Logistics</title>
            </Head>

            {/* Slideshow Banner Section */}
            <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                {hasBanners ? (
                    <div className="relative aspect-video md:aspect-auto md:h-[100svh] md:min-h-[620px]">
                        {banners.map((banner: any, index: number) => {
                            const fallbackImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80";
                            const dImg = banner.desktop_image_url || fallbackImg;
                            const mImg = banner.mobile_image_url || dImg;
                            
                            return (
                                <div 
                                    key={banner.id} 
                                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    style={{ backgroundColor: banner.fallback_color }}
                                >
                                    <div className="absolute inset-0">
                                        <picture>
                                            <source media="(max-width: 767px)" srcSet={mImg} />
                                            <source media="(min-width: 768px)" srcSet={dImg} />
                                            <img src={dImg} className="h-full w-full object-cover object-center" alt={banner.title_en || 'Hero Banner'} />
                                        </picture>
                                        {banner.theme_variant === 'light' && <div className="absolute inset-0 bg-black/10"></div>}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Slideshow dots */}
                        {banners.length > 1 && (
                            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                                {banners.map((_: any, index: number) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-brand-primary w-8' : 'bg-white/50 hover:bg-white'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                        {bannerMode === 'normal' && banners.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => changeSlide('previous')}
                                    className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-950 shadow-xl transition hover:-translate-y-[calc(50%+2px)] hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:bg-gray-950/90 dark:text-white"
                                    aria-label="Previous banner"
                                >
                                    <ChevronLeft className="h-7 w-7" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => changeSlide('next')}
                                    className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-950 shadow-xl transition hover:-translate-y-[calc(50%+2px)] hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:bg-gray-950/90 dark:text-white"
                                    aria-label="Next banner"
                                >
                                    <ChevronRight className="h-7 w-7" aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    // Default Fallback Banner
                    <div className="relative aspect-video md:aspect-auto md:h-[100svh] md:min-h-[620px]">
                        <div className="absolute inset-0">
                            <img src={page?.banner_image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"} className="w-full h-full object-cover object-center" alt="Logistics warehouse and shipping boxes" />
                        </div>
                    </div>
                )}
            </section>

            {/* Services Section */}
            <section className="relative z-30 border-y border-gray-100 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-primary">{t('services.title')}</p>
                        <h2 className="mt-3 text-3xl font-black text-gray-950 dark:text-white lg:text-5xl font-serif">{t('services.subtitle')}</h2>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                data-service-card="true"
                                className="group flex min-h-64 flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-px hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                            >
                                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:scale-105">
                                    <service.icon className="h-8 w-8" aria-hidden="true" />
                                </span>
                                <h3 className="mt-8 text-2xl font-black leading-tight text-gray-950 dark:text-white">{service.title}</h3>
                                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">{service.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <p className="mx-auto max-w-2xl text-base font-semibold leading-7 text-gray-600 dark:text-gray-300">{t('services.manual_order_support')}</p>
                        <Link
                            href={manualOrderHref}
                            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-7 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-500/20 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60"
                        >
                            {t('services.create_manual_order')}
                        </Link>
                    </div>
                </div>
            </section>

            {marketplaces.length > 0 && (
                <section className="relative z-30 border-b border-gray-100 bg-gray-100 py-14 dark:border-gray-800 dark:bg-gray-900" aria-labelledby="available-sites-title">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 text-center">
                            <h2 id="available-sites-title" className="text-3xl font-black text-gray-700 dark:text-white">{t('available_sites.title')}</h2>
                            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand-primary" />
                        </div>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => scrollSites('previous')}
                                className="absolute left-0 top-[48px] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 md:flex dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800"
                                aria-label={t('available_sites.previous')}
                            >
                                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                            </button>

                            <div
                                ref={sitesScrollerRef}
                                className="flex mx-auto w-fit max-w-full gap-7 overflow-x-auto scroll-smooth px-1 pb-4 md:px-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                                {marketplaces.map((site: any) => (
                                    <a
                                        key={site.id}
                                        href={site.website_url || '#'}
                                        target={site.open_in_new_tab === false ? undefined : '_blank'}
                                        rel={site.open_in_new_tab === false ? undefined : 'noopener noreferrer'}
                                        className="group flex w-28 shrink-0 flex-col items-center gap-3 rounded-2xl p-2 text-center transition hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60"
                                    >
                                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 transition group-hover:shadow-xl dark:bg-gray-950 dark:ring-gray-800">
                                            {site.logo ? (
                                                <img src={site.logo} alt={site.alt_text || siteName(site)} loading="lazy" className="h-12 w-12 rounded-xl object-contain" />
                                            ) : (
                                                <span className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ backgroundColor: site.brand_color || '#ff4c3b' }}>
                                                    <Globe2 className="h-6 w-6" aria-hidden="true" />
                                                </span>
                                            )}
                                        </span>
                                        <span className="line-clamp-2 text-sm font-bold text-gray-600 dark:text-gray-300">{siteName(site)}</span>
                                    </a>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => scrollSites('next')}
                                className="absolute right-0 top-[48px] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 md:flex dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800"
                                aria-label={t('available_sites.next')}
                            >
                                <ChevronRight className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Delivery Workflow Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-secondary dark:text-white mb-12 font-serif">{t('how_it_works.title')}</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {workflowSteps.map((step, index) => (
                            <div key={step.title} className="rounded-2xl border border-gray-100 bg-white p-7 text-left shadow-sm transition hover:-translate-y-px hover:shadow-xl dark:border-gray-800 dark:bg-gray-950">
                                <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                                    <step.icon className="h-7 w-7" aria-hidden="true" />
                                </span>
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-brand-primary">0{index + 1}</p>
                                <h3 className="text-xl font-black text-brand-secondary dark:text-white">{step.title}</h3>
                                <p className="mt-3 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SupportFAB />
            <PromoPopup popup={popup} />
        </MainLayout>
    );
}
