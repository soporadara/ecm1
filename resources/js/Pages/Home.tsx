import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import SupportFAB from '../Components/SupportFAB';
import PromoPopup from '../Components/PromoPopup';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Globe2, PackageCheck, ShoppingBag, Truck, Plus, Minus, ShoppingCart } from 'lucide-react';
import MobileDashboard from '../Components/Premium/MobileDashboard';

export default function Home({ banners, bannerMode = 'slideshow', page, marketplaces = [], popup = null, testimonials = [], recentBlogs = [], telegramFaqs = [] }: any) {
    const { t, i18n } = useTranslation();
    const manualOrderHref = '/manual-order';
    const sitesScrollerRef = useRef<HTMLDivElement>(null);
    
    // Auto-playing slideshow logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const faqCategoriesOrder = ['Ordering', 'Shipping', 'Warehouse', 'Tracking', 'Payment', 'Problems', 'General'];
    const groupedFaqs = telegramFaqs?.reduce((acc: any, faq: any) => {
        const category = faq.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(faq);
        return acc;
    }, {}) || {};
    
    const availableCategories = Object.keys(groupedFaqs).sort((a, b) => {
        const indexA = faqCategoriesOrder.indexOf(a);
        const indexB = faqCategoriesOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const hasBanners = banners && banners.length > 0;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        description: '',
    });
    
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

    const detailedServices = [
        { title: t('services.china_cam'), desc: t('services.china_cam_desc'), icon: Globe2 },
        { title: t('services.vn_cam'), desc: t('services.vn_cam_desc'), icon: Truck },
        { title: t('services.cam_vn'), desc: t('services.cam_vn_desc'), icon: PackageCheck },
        { title: t('services.warehouse'), desc: t('services.warehouse_desc'), icon: PackageCheck },
        { title: t('services.transportation'), desc: t('services.transportation_desc'), icon: Truck },
        { title: t('services.tracking'), desc: t('services.tracking_desc'), icon: CheckCircle2 },
        { title: t('services.payment'), desc: t('services.payment_desc'), icon: ClipboardList },
        { title: t('services.order_help'), desc: t('services.order_help_desc'), icon: ShoppingCart },
    ];

    const whyChooseCards = [
        { title: t('why.expertise'), desc: t('why.expertise_desc'), icon: Globe2 },
        { title: t('why.cost'), desc: t('why.cost_desc'), icon: ShoppingBag },
        { title: t('why.tracking'), desc: t('why.tracking_desc'), icon: Truck },
        { title: t('why.payment'), desc: t('why.payment_desc'), icon: ClipboardList },
        { title: t('why.warehouse'), desc: t('why.warehouse_desc'), icon: PackageCheck },
        { title: t('why.network'), desc: t('why.network_desc'), icon: CheckCircle2 },
    ];

    const workflowSteps = [
        {
            title: t('how_it_works.step1_title', 'Submit Your Order'),
            description: t('how_it_works.step1_desc', 'Send us the product/order information. (Status: Pending Review, Quote Provided)'),
            icon: ClipboardList,
        },
        {
            title: t('how_it_works.step2_title', 'We Purchase / Collect'),
            description: t('how_it_works.step2_desc', 'MVM coordinates purchasing and warehouse handling. (Status: Approved, Purchased)'),
            icon: ShoppingBag,
        },
        {
            title: t('how_it_works.step3_title', 'Cross-Border Shipping'),
            description: t('how_it_works.step3_desc', 'Your goods are transported from China/Vietnam to Cambodia, or Cambodia to Vietnam. (Status: Warehouse Received, Shipped)'),
            icon: Globe2,
        },
        {
            title: t('how_it_works.step4_title', 'Track Your Shipment'),
            description: t('how_it_works.step4_desc', 'Monitor warehouse arrival, shipping status, and destination delivery. (Status: Arrived)'),
            icon: PackageCheck,
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
                <title>MVM Logistic — Cross-Border Logistics</title>
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
                                        {banner.video_file_path || banner.video_url ? (
                                            <video 
                                                src={banner.video_file_path ? `/storage/${banner.video_file_path}` : banner.video_url} 
                                                autoPlay muted loop playsInline 
                                                className="h-full w-full object-cover object-center" 
                                            />
                                        ) : (
                                            <picture>
                                                <source media="(max-width: 767px)" srcSet={mImg} />
                                                <source media="(min-width: 768px)" srcSet={dImg} />
                                                <img src={dImg} className="h-full w-full object-cover object-center" alt={banner.title_en || 'Hero Banner'} />
                                            </picture>
                                        )}
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
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white">{t('services.title')}</p>
                        <h2 className="mt-3 text-3xl font-black text-gray-950 dark:text-white lg:text-5xl font-serif">{t('services.subtitle')}</h2>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {detailedServices.map((service) => (
                            <div
                                key={service.title}
                                data-service-card="true"
                                className="ui-card group flex flex-col p-6"
                            >
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:scale-105 dark:bg-white/10 dark:text-white">
                                    <service.icon className="h-6 w-6" aria-hidden="true" />
                                </span>
                                <h3 className="mt-6 text-xl font-black leading-tight text-gray-950 dark:text-white">{service.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center flex flex-col items-center justify-center gap-6">
                        <p className="max-w-2xl text-base font-semibold leading-7 text-gray-600 dark:text-gray-300">{t('services.manual_order_support')}</p>
                        <div className="flex flex-col items-center justify-center gap-6">
                            <Link
                                href={manualOrderHref}
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-10 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-500/20 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 w-full sm:w-auto"
                            >
                                {t('services.create_manual_order')}
                            </Link>
                            <div className="flex flex-col items-center w-full sm:w-auto">
                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Telegram Bot</span>
                                <a
                                    href="https://t.me/mvmlogisticskhbot"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#24A1DE] px-10 text-sm font-black tracking-wider text-white shadow-lg shadow-[#24A1DE]/20 transition hover:bg-[#1d82b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A1DE]/60 w-full sm:w-auto"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                                    mvmlogisticskhbot
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                        {/* Why Choose MVM */}
            <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
                            {t('why.title', 'Why Choose MVM?')}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseCards.map((card) => (
                            <div key={card.title} className="ui-card p-6 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c55c0]/10 text-[#1c55c0] dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                                    <card.icon className="h-6 w-6" />
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{card.desc}</p>
                            </div>
                        ))}
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
                                <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:bg-white/10 dark:text-white">
                                    <step.icon className="h-7 w-7" aria-hidden="true" />
                                </span>
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-brand-primary dark:text-white">0{index + 1}</p>
                                <h3 className="text-xl font-black text-brand-secondary dark:text-white">{step.title}</h3>
                                <p className="mt-3 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white">{t('testimonials.title', 'Customer Reviews')}</p>
                        <h2 className="mt-3 text-3xl lg:text-4xl font-black text-gray-950 dark:text-white mb-12 font-serif">{t('testimonials.subtitle', 'What Our Customers Say')}</h2>
                    </div>
                        
                    <div className="w-full relative">
                        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 items-stretch py-4 px-4 lg:px-8">
                                {[...testimonials, ...testimonials, ...testimonials].map((testimonial: any, index: number) => (
                                    <div key={`${testimonial.id}-${index}`} className="w-[350px] md:w-[400px] shrink-0 bg-gray-50 dark:bg-gray-900 rounded-[20px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between text-left">
                                        <div>
                                            <div className="flex gap-1 mb-4 text-[#ef5a3d]">
                                                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-8 italic">"{testimonial.content.startsWith('home.testimonial') ? t(testimonial.content) : testimonial.content}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                                                {testimonial.image_path ? (
                                                    <img src={`/storage/${testimonial.image_path}`} alt={testimonial.customer_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg">
                                                        {testimonial.customer_name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-950 dark:text-white text-sm">{testimonial.customer_name}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                    Verified Customer
                                                </p>
                                            </div>
                                        </div>
                                        {(testimonial.product_image_1 || testimonial.product_image_2) && (
                                            <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                                                {testimonial.product_image_1 && (
                                                    <img 
                                                        src={`/storage/${testimonial.product_image_1}`} 
                                                        alt="Product" 
                                                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-700" 
                                                    />
                                                )}
                                                {testimonial.product_image_2 && (
                                                    <img 
                                                        src={`/storage/${testimonial.product_image_2}`} 
                                                        alt="Product" 
                                                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-700" 
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                </section>
            )}

            {/* Recent Blogs Section */}
            {recentBlogs && recentBlogs.length > 0 && (
                <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-primary dark:text-white">Latest Updates</p>
                                <h2 className="mt-3 text-3xl lg:text-4xl font-black text-gray-950 dark:text-white font-serif">Recent Articles</h2>
                            </div>
                            <Link href="/blog" className="shrink-0 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors inline-flex items-center gap-2">
                                View All Posts
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentBlogs.map((post: any) => (
                                <article key={post.id} className="group bg-white dark:bg-gray-950 rounded-[20px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl hover:-translate-y-1">
                                    <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        {post.category && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bold text-brand-primary dark:text-black tracking-wide uppercase shadow-sm">
                                                {post.category.name}
                                            </div>
                                        )}
                                    </Link>
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                                            <time>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                            <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 10 Min</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-light line-clamp-2 text-sm">
                                            {post.seo_description || 'Read more about this topic in our latest article.'}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* About MVM Logistics Application Purpose Section (Google Verification & SEO) */}
            <section className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-white dark:bg-white/10 text-xs font-black uppercase tracking-wider rounded-full mb-3">
                        {t('home.about.eyebrow', 'Official Application Purpose')}
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl mb-6">
                        {t('home.about.title', 'About MVM Logistics')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
                        {t('home.about.description', '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> is a premier cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.') && (
                            <span dangerouslySetInnerHTML={{ __html: t('home.about.description', '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> is a premier cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.') }} />
                        )}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('home.about.feature1.title', 'Cross-Border Logistics')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('home.about.feature1.desc', 'Streamlined freight forwarding and customs clearing for imported goods.')}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('home.about.feature2.title', 'Manual Product Sourcing')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('home.about.feature2.desc', 'Submit manual buy requests and let our team handle purchasing and payment confirmation.')}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/50">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('home.about.feature3.title', 'Secure Account Access')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('home.about.feature3.desc', 'Sign in securely via Google Authentication or Phone PIN to track your personal orders.')}</p>
                        </div>
                    </div>
                </div>
            </section>

                        {/* FAQs Grouped by Category */}
            {telegramFaqs && telegramFaqs.length > 0 && (
                <section className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-white dark:bg-white/10 text-xs font-black uppercase tracking-wider rounded-full mb-3">
                                {t('faq.support_badge', 'Support & Knowledge Base')}
                            </span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl uppercase">
                                {t('faq.title', 'FREQUENTLY ASKED QUESTIONS')}
                            </h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                {t('faq.subtitle', 'Find answers to common questions about our cross-border logistics services.')}
                            </p>
                        </div>
                        <div className="space-y-12">
                            {availableCategories.map((category) => (
                                <div key={category} className="space-y-4">
                                    <h3 className="text-xl font-black text-brand-primary dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
                                        {t(`faq.categories.${category.toLowerCase()}`, category)}
                                    </h3>
                                    <div className="space-y-4">
                                        {groupedFaqs[category].map((faq: any) => {
                                            const isOpen = openFaq === faq.id;
                                            const question = i18n.language === 'km' ? (faq.question_km || faq.question) : i18n.language === 'vi' ? (faq.question_vi || faq.question) : (faq.question_en || faq.question || faq.question_km || faq.question_vi);
                                            const answer = i18n.language === 'km' ? (faq.answer_km || faq.answer) : i18n.language === 'vi' ? (faq.answer_vi || faq.answer) : (faq.answer_en || faq.answer || faq.answer_km || faq.answer_vi);
                                            return (
                                                <div 
                                                    key={faq.id} 
                                                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#1c55c0] shadow-md dark:border-blue-600' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
                                                >
                                                    <button 
                                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white dark:bg-gray-900 focus:outline-none"
                                                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                                                    >
                                                        <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                                                            {question}
                                                        </span>
                                                        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#1c55c0] text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                                        </span>
                                                    </button>
                                                    
                                                    <div 
                                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                                    >
                                                        <div 
                                                            className="p-5 md:p-6 pt-0 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 dark:border-gray-800/50 mt-2 [&>a]:text-brand-primary [&>a]:font-medium hover:[&>a]:underline"
                                                            dangerouslySetInnerHTML={{ __html: answer }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}



            {/* Get a Quote Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto ui-card p-8 md:p-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white font-serif">{t('quote.title', 'Request a Shipping Quote')}</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('quote.subtitle', 'Fill out the details below to get an estimated shipping cost.')}</p>
                        </div>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { 
                            e.preventDefault(); 
                            post(route('quote-requests.store'), {
                                onSuccess: () => {
                                    alert(t('quote.success_alert', 'Quote Request Submitted! We will contact you soon.'));
                                    reset();
                                }
                            });
                        }}>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('quote.name', 'Name')}</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50" placeholder={t('quote.name_placeholder', 'Your Name')} required />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('quote.email', 'Email')}</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50" placeholder={t('quote.email_placeholder', 'Your Email Address')} />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('quote.phone', 'Phone / Telegram')}</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50" placeholder={t('quote.phone_placeholder', 'Your Phone Number')} required />
                                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('quote.description', 'Quote Description')}</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary/50" placeholder={t('quote.description_placeholder', 'Please describe what you need to ship...')} required></textarea>
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>
                            
                            <div className="md:col-span-2 mt-4 text-center">
                                <button disabled={processing} type="submit" className="inline-flex min-h-14 items-center justify-center rounded-xl bg-brand-primary px-10 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-brand-primary/20 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 disabled:opacity-50">
                                    {processing ? '...' : t('quote.submit_btn', 'Get Quote')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <SupportFAB />
            <PromoPopup popup={popup} />

            {/* Lightbox */}
            {lightboxImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setLightboxImage(null)}
                >
                    <div className="relative max-w-5xl w-full flex justify-center items-center h-full">
                        <button 
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center transition"
                            onClick={() => setLightboxImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <img 
                            src={lightboxImage} 
                            alt="Preview" 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
