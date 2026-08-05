import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function SupportFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const { general_settings }: any = usePage().props;

    const links = [
        { id: 'messenger', name: 'Messenger', url: 'https://m.me/MVMLogistics', icon_url: null },
        { id: 'zalo', name: 'Zalo', url: 'https://zalo.me/0317669555', icon_url: null },
        { id: 'telegram', name: 'Telegram', url: 'https://t.me/+855317669555', icon_url: null },
        { id: 'phone', name: 'Phone', url: 'tel:0317669555', icon_url: null },
        { id: 'email', name: 'Email', url: 'mailto:info@mvmlogistics.asia', icon_url: null },
    ];

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

            <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[110] flex flex-col items-end gap-3">
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
                        else if (link.id === 'zalo' || link.name.toLowerCase().includes('zalo')) fallbackBg = 'bg-blue-600';
                        else if (link.id === 'email' || link.name.toLowerCase().includes('email')) fallbackBg = 'bg-red-500';
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
                                            {link.id === 'phone' ? (
                                                <Phone className="w-5 h-5" />
                                            ) : link.id === 'email' ? (
                                                <Mail className="w-5 h-5" />
                                            ) : link.id === 'messenger' ? (
                                                <MessengerIcon />
                                            ) : link.id === 'telegram' ? (
                                                <TelegramIcon />
                                            ) : link.id === 'zalo' ? (
                                                <ZaloIcon />
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
                    className="relative flex items-center justify-center bg-orange-500 text-white p-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:bg-orange-600 hover:shadow-orange-600/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
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
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                    
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

function MessengerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 3.22 1.45 6.06 3.73 7.89V22l2.31-1.28c1.2.33 2.5.51 3.96.51 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.18 12.35l-2.07-2.22-4.05 2.22 4.45-4.73 2.1 2.22 4.02-2.22-4.45 4.73z"/>
        </svg>
    );
}

function TelegramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M9.78 18.65c-.27 0-.23-.1-.36-.47l-1.42-4.7 10.9-6.47c.5-.3.1-.14-.23.1L5.86 13.1l-.01.01-3.66-1.15c-.8-.25-.8-.8.16-1.18L21.2 3.1c.9-.33 1.7.22 1.4 1.58l-3.23 15.2c-.24 1.15-.92 1.43-1.88.9l-4.9-3.6-2.37 2.28c-.26.26-.48.48-.98.48z"/>
        </svg>
    );
}

function ZaloIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.65 1.43 5.01 3.67 6.54L4.5 21l4.83-2.12c.84.22 1.73.34 2.67.34 5.52 0 10-3.82 10-8.5S17.52 2 12 2zm-1.8 11.8H7.3v-1.2l2.3-3.2H7.5V8.2h4v1.2l-2.3 3.2h2.4v1.2z"/>
        </svg>
    );
}
