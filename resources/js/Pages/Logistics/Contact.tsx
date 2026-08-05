import { Head, usePage } from '@inertiajs/react';
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Contact() {
    const { general_settings }: any = usePage().props;
    const { t, i18n } = useTranslation();

    const phone = general_settings?.support_phone || general_settings?.phone || '+855 12 345 678';
    const email = general_settings?.support_email || general_settings?.email || 'support@rafel.com';
    const address = general_settings?.store_address || general_settings?.address || 'Phnom Penh, Cambodia';
    const telegram = general_settings?.telegram_url || 'https://t.me/support';
    const whatsapp = general_settings?.whatsapp_url || 'https://wa.me/85512345678';

    const contactCards = [
        { label: 'Messenger', value: 'MVMLogistics', href: 'https://m.me/MVMLogistics', icon: MessengerIcon, iconUrl: null },
        { label: 'Zalo', value: '0317669555', href: 'https://zalo.me/0317669555', icon: ZaloIcon, iconUrl: null },
        { label: 'Telegram', value: '0317669555', href: 'https://t.me/+855317669555', icon: TelegramIcon, iconUrl: null },
        { label: 'Phone', value: '0317669555', href: 'tel:0317669555', icon: Phone, iconUrl: null },
        { label: 'Email', value: 'info@mvmlogistics.asia', href: 'mailto:info@mvmlogistics.asia', icon: Mail, iconUrl: null },
        { label: 'Office', value: address, href: '#', icon: MapPin, iconUrl: null },
        { label: 'Business Hours', value: 'Monday to Saturday, 8:30 AM - 6:00 PM', href: '#', icon: Clock, iconUrl: null },
    ];

    const currentLang = i18n.language;

    const aboutTitle = currentLang === 'en' ? (general_settings?.about_title || t('contact.about_company')) : t('contact.about_company');
    const aboutText = currentLang === 'en' ? (general_settings?.about_text || t('contact.about_text')) : t('contact.about_text');

    // Helper to safely extract src if user pasted a full <iframe src="..."> HTML string instead of just a URL
    const getEmbedUrl = (embedUrl: string | undefined, address: string | undefined, defaultAddress: string) => {
        if (!embedUrl) {
            return `https://www.google.com/maps?q=${encodeURIComponent(address || defaultAddress)}&output=embed`;
        }
        if (embedUrl.includes('<iframe') && embedUrl.includes('src="')) {
            const match = embedUrl.match(/src="([^"]+)"/);
            if (match && match[1]) {
                return match[1];
            }
        }
        return embedUrl;
    };

    return (
        <MainLayout title="Contact Us" description="Contact support for manual orders, tracking, receipts, and account help.">
            <Head title="Contact Us" />

            <section className="bg-gray-50 py-16 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-primary">Support Center</p>
                        <h1 className="mt-4 text-4xl font-black text-gray-900 dark:text-white font-serif lg:text-6xl">Contact Us</h1>
                        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Reach our support team through your preferred channel for manual orders, delivery, receipts, and account help.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {contactCards.map((card) => (
                            <a
                                key={card.label}
                                href={card.href}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-800 dark:bg-gray-900"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                                        {card.iconUrl ? (
                                            <img src={card.iconUrl} alt={card.label} className="h-5 w-5 object-contain" />
                                        ) : (
                                            <card.icon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-gray-900 dark:text-white">{card.label}</p>
                                        <p className="mt-1 break-words text-sm text-gray-500 group-hover:text-brand-primary">{card.value}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12">
                        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary">About Us</p>
                            <h2 className="mt-3 text-3xl font-black text-gray-950 dark:text-white">{aboutTitle}</h2>
                            <p className="mt-4 whitespace-pre-line text-base font-semibold leading-8 text-gray-600 dark:text-gray-300">{aboutText}</p>
                        </section>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xl font-black text-gray-950 dark:text-white flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-brand-primary" />
                                    {t('contact.cambodia_office')}
                                </h3>
                                {general_settings?.cambodia_map_open_url && (
                                    <a href={general_settings.cambodia_map_open_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors dark:bg-gray-800 dark:text-gray-300">
                                        Open Map <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                            <iframe 
                                src={getEmbedUrl(general_settings?.cambodia_map_embed_url, general_settings?.cambodia_map_address, 'Phnom Penh, Cambodia')} 
                                width="100%" 
                                height="300" 
                                style={{ border: 0, borderRadius: '0.75rem', flexGrow: 1 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            {general_settings?.cambodia_map_address && (
                                <p className="mt-4 text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-pre-line border-t border-gray-100 dark:border-gray-800 pt-4">
                                    {general_settings.cambodia_map_address}
                                </p>
                            )}
                        </section>
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xl font-black text-gray-950 dark:text-white flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-brand-primary" />
                                    Vietnam Office
                                </h3>
                                {general_settings?.vietnam_map_open_url && (
                                    <a href={general_settings.vietnam_map_open_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors dark:bg-gray-800 dark:text-gray-300">
                                        Open Map <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                            <iframe 
                                src={getEmbedUrl(general_settings?.vietnam_map_embed_url, general_settings?.vietnam_map_address, 'Ho Chi Minh City, Vietnam')} 
                                width="100%" 
                                height="300" 
                                style={{ border: 0, borderRadius: '0.75rem', flexGrow: 1 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            {general_settings?.vietnam_map_address && (
                                <p className="mt-4 text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-pre-line border-t border-gray-100 dark:border-gray-800 pt-4">
                                    {general_settings.vietnam_map_address}
                                </p>
                            )}
                        </section>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

function MessengerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 3.22 1.45 6.06 3.73 7.89V22l2.31-1.28c1.2.33 2.5.51 3.96.51 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.18 12.35l-2.07-2.22-4.05 2.22 4.45-4.73 2.1 2.22 4.02-2.22-4.45 4.73z"/>
        </svg>
    );
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M9.78 18.65c-.27 0-.23-.1-.36-.47l-1.42-4.7 10.9-6.47c.5-.3.1-.14-.23.1L5.86 13.1l-.01.01-3.66-1.15c-.8-.25-.8-.8.16-1.18L21.2 3.1c.9-.33 1.7.22 1.4 1.58l-3.23 15.2c-.24 1.15-.92 1.43-1.88.9l-4.9-3.6-2.37 2.28c-.26.26-.48.48-.98.48z"/>
        </svg>
    );
}

function ZaloIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.65 1.43 5.01 3.67 6.54L4.5 21l4.83-2.12c.84.22 1.73.34 2.67.34 5.52 0 10-3.82 10-8.5S17.52 2 12 2zm-1.8 11.8H7.3v-1.2l2.3-3.2H7.5V8.2h4v1.2l-2.3 3.2h2.4v1.2z"/>
        </svg>
    );
}
