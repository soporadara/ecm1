import { Head, usePage } from '@inertiajs/react';
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import MainLayout from '../../Layouts/MainLayout';

export default function Contact() {
    const { general_settings }: any = usePage().props;

    const phone = general_settings?.support_phone || general_settings?.phone || '+855 12 345 678';
    const email = general_settings?.support_email || general_settings?.email || 'support@rafel.com';
    const address = general_settings?.store_address || general_settings?.address || 'Phnom Penh, Cambodia';
    const telegram = general_settings?.telegram_url || 'https://t.me/support';
    const whatsapp = general_settings?.whatsapp_url || 'https://wa.me/85512345678';

    const contactCards = [
        { label: 'Telegram', value: '@support', href: telegram, icon: MessageCircle },
        { label: 'WhatsApp', value: phone, href: whatsapp, icon: MessageCircle },
        { label: 'Phone', value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}`, icon: Phone },
        { label: 'Email', value: email, href: `mailto:${email}`, icon: Mail },
        { label: 'Office', value: address, href: '#', icon: MapPin },
        { label: 'Business Hours', value: 'Monday to Saturday, 8:30 AM - 6:00 PM', href: '#', icon: Clock },
    ];
    const socialLinks = [1, 2, 3, 4]
        .map((index) => ({
            name: general_settings?.[`social_${index}_name`],
            url: general_settings?.[`social_${index}_url`],
            icon: general_settings?.[`social_${index}_icon`],
        }))
        .filter((item) => item.name && item.url);
    const aboutTitle = general_settings?.about_title || 'About our company';
    const aboutText = general_settings?.about_text || 'We help customers create manual orders, source products, coordinate logistics, and track deliveries with clear support from request to doorstep.';

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
                                        <card.icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-gray-900 dark:text-white">{card.label}</p>
                                        <p className="mt-1 break-words text-sm text-gray-500 group-hover:text-brand-primary">{card.value}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary">About Us</p>
                            <h2 className="mt-3 text-3xl font-black text-gray-950 dark:text-white">{aboutTitle}</h2>
                            <p className="mt-4 whitespace-pre-line text-base font-semibold leading-8 text-gray-600 dark:text-gray-300">{aboutText}</p>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary">Social</p>
                            <h2 className="mt-3 text-2xl font-black text-gray-950 dark:text-white">Follow and contact us</h2>
                            <div className="mt-5 grid gap-3">
                                {socialLinks.length > 0 ? socialLinks.map((link) => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex min-h-12 items-center justify-between rounded-xl border border-gray-100 px-4 text-sm font-black text-gray-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:border-gray-800 dark:text-gray-200"
                                    >
                                        <span className="inline-flex items-center gap-3">
                                            <Share2 className="h-4 w-4" aria-hidden="true" />
                                            {link.name}
                                            {link.icon && <span className="text-xs font-semibold text-gray-400">{link.icon}</span>}
                                        </span>
                                        <ExternalLink className="h-4 w-4 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
                                    </a>
                                )) : (
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Add social links in General Settings.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
