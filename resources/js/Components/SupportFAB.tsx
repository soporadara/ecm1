import React, { useState } from 'react';

export default function SupportFAB() {
    const [isOpen, setIsOpen] = useState(false);

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
                    {/* Email */}
                    <a 
                        href="mailto:support@example.com" 
                        className="flex items-center gap-2 group"
                        title="Email Us"
                    >
                        <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                        <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                    </a>

                    {/* Phone */}
                    <a 
                        href="tel:+1234567890" 
                        className="flex items-center gap-2 group"
                        title="Call Us"
                    >
                        <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">Phone</span>
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                    </a>

                    {/* Messenger */}
                    <a 
                        href="https://m.me/yourpage" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group"
                        title="Messenger"
                    >
                        <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">Messenger</span>
                        <div className="w-10 h-10 bg-[#00B2FF] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#33c2ff] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.906 1.488 5.485 3.791 7.152v3.315c0 .356.398.56.7.35l3.203-2.227c.732.203 1.503.31 2.306.31 5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm1.093 12.59l-2.585-2.764-5.06 2.764 5.568-5.918 2.616 2.764 5.029-2.764-5.568 5.918z" />
                            </svg>
                        </div>
                    </a>

                    {/* Telegram */}
                    <a 
                        href="https://t.me/your_telegram_username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group"
                        title="Telegram"
                    >
                        <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">Telegram</span>
                        <div className="w-10 h-10 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#33a0d6] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-18 8.026c-.732.326-1.176 1.054-1.176 1.854s.444 1.528 1.176 1.854l4.636 2.067 2.112 5.922a1.765 1.765 0 0 0 1.666 1.18c.627 0 1.222-.31 1.583-.83l2.846-4.108 4.793 4.793c.31.31.737.485 1.176.485.457 0 .895-.19 1.206-.52.33-.35.5-.83.473-1.32l-2.023-17.75c-.05-.444-.27-.852-.618-1.144-.348-.293-.8-.43-1.25-.43z" fill="currentColor" stroke="none" />
                            </svg>
                        </div>
                    </a>
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
                            Click here to Contact Us
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
