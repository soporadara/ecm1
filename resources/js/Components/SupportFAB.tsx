import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function SupportFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const { general_settings }: any = usePage().props;

    let links: any[] = [];
    if (general_settings?.fab_links) {
        try {
            links = JSON.parse(general_settings.fab_links);
        } catch (e) {
            links = [];
        }
    } else {
        // Fallback to legacy settings if fab_links is not configured
        if (general_settings?.fab_email) links.push({ id: 'email', name: 'Email', url: `mailto:${general_settings.fab_email}`, icon_url: null });
        if (general_settings?.fab_phone) links.push({ id: 'phone', name: 'Phone', url: `tel:${general_settings.fab_phone}`, icon_url: null });
        if (general_settings?.fab_messenger) links.push({ id: 'messenger', name: 'Messenger', url: general_settings.fab_messenger, icon_url: null });
        if (general_settings?.fab_telegram) links.push({ id: 'telegram', name: 'Telegram', url: general_settings.fab_telegram, icon_url: null });
    }

    if (!links || links.length === 0) {
        return null;
    }

    return (
        <>
            {/* Transparent overlay for clicking outside */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[80]" 
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
                {/* Expanded Icons (Visible when clicked) */}
                <div 
                    className={`flex flex-col gap-3 transition-all duration-300 transform origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    {links.map((link) => {
                        let linkUrl = link.url;
                        if (!linkUrl.startsWith('http') && !linkUrl.startsWith('mailto:') && !linkUrl.startsWith('tel:')) {
                            linkUrl = `https://${linkUrl}`;
                        }

                        // Determine fallback colors for legacy keys (if no icon provided)
                        let fallbackBg = 'bg-gray-600';
                        if (link.id === 'phone' || link.name.toLowerCase().includes('whatsapp') || link.name.toLowerCase().includes('phone')) fallbackBg = 'bg-green-500';
                        else if (link.id === 'messenger' || link.name.toLowerCase().includes('messenger')) fallbackBg = 'bg-[#00B2FF]';
                        else if (link.id === 'telegram' || link.name.toLowerCase().includes('telegram')) fallbackBg = 'bg-[#0088cc]';
                        else if (link.name.toLowerCase().includes('tiktok')) fallbackBg = 'bg-black';

                        return (
                            <a 
                                key={link.id}
                                href={linkUrl} 
                                target={linkUrl.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 group"
                                title={link.name}
                            >
                                <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {link.name}
                                </span>
                                <div className={`w-10 h-10 ${link.icon_url ? 'bg-white' : fallbackBg} text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity overflow-hidden`}>
                                    {link.icon_url ? (
                                        <img src={link.icon_url} alt={link.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            {/* Generic icon if no image provided */}
                                            {link.name.toLowerCase().includes('phone') || link.id === 'phone' ? (
                                                <Phone className="w-5 h-5" />
                                            ) : link.name.toLowerCase().includes('mail') || link.id === 'email' ? (
                                                <Mail className="w-5 h-5" />
                                            ) : (
                                                <MessageCircle className="w-5 h-5" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Main Toggle Button */}
                <div 
                    className="relative flex items-center justify-center bg-brand-primary text-white p-4 rounded-full shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Support contacts"
                >
                    {/* Tooltip */}
                    {!isOpen && (
                        <div className="absolute right-full mr-4 bg-gray-900 dark:bg-gray-800 text-white text-sm font-bold py-2 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Contact Us
                            {/* Little triangle arrow pointing right */}
                            <div className="absolute top-1/2 -mt-1 -right-1 border-t-4 border-t-transparent border-l-4 border-l-gray-900 dark:border-l-gray-800 border-b-4 border-b-transparent"></div>
                        </div>
                    )}

                    {/* Pulse ring */}
                    <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20"></div>
                    
                    {/* Icon flips on open/close */}
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {isOpen ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
