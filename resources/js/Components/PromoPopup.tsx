import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface PopupData {
    id: number;
    title: string;
    heading: string | null;
    description: string | null;
    link_url: string | null;
    image_path: string | null;
}

interface PromoPopupProps {
    popup: PopupData | null;
}

export default function PromoPopup({ popup }: PromoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!popup) return;

        // For testing purposes, we check session storage so it resets when they close the tab,
        // rather than local storage which persists forever.
        const hasSeenPopup = sessionStorage.getItem(`has_seen_popup_${popup.id}`);
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 500); // reduced delay to 500ms
            return () => clearTimeout(timer);
        }
    }, [popup]);

    const handleClose = () => {
        setIsOpen(false);
        if (popup) {
            sessionStorage.setItem(`has_seen_popup_${popup.id}`, 'true');
        }
    };

    if (!isOpen || !popup) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-500 scale-100 opacity-100 flex flex-col z-[101]">
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md rounded-full p-2 text-gray-800 dark:text-white transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {popup.image_path && (
                    <div className="w-full h-48 sm:h-64 relative">
                        <img src={popup.image_path} alt={popup.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                )}

                <div className={`p-8 text-center ${!popup.image_path ? 'pt-12' : ''}`}>
                    {popup.heading && (
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
                            {popup.heading}
                        </h2>
                    )}
                    
                    {popup.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {popup.description}
                        </p>
                    )}

                    {popup.link_url && (
                        <Link 
                            href={popup.link_url}
                            onClick={handleClose}
                            className="inline-block w-full sm:w-auto bg-brand-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded hover:bg-brand-secondary transition-colors shadow-lg shadow-brand-primary/30"
                        >
                            Explore Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
