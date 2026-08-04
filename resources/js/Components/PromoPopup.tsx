import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { getPopupCreativeSize } from '../lib/popupCreativeSizes';

interface PopupData {
    id: number;
    title: string;
    badge_text: string | null;
    heading: string | null;
    description: string | null;
    link_url: string | null;
    button_label: string | null;
    accent_color: string | null;
    image_path: string | null;
    creative_size: string | null;
}

interface PromoPopupProps {
    popup: PopupData | null;
}

export default function PromoPopup({ popup }: PromoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        if (!popup) return;
        setImageFailed(false);

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

    const creativeSize = getPopupCreativeSize(popup.creative_size);
    const modalMaxWidth = creativeSize.value === 'portrait_1080x1920' ? 'max-w-md' : creativeSize.value === 'square_1280x1280' ? 'max-w-2xl' : 'max-w-5xl';
    const creativeStyle = { aspectRatio: `${creativeSize.width} / ${creativeSize.height}` };
    const hasImage = Boolean(popup.image_path && !imageFailed);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                onClick={handleClose}
            ></div>
            
            {/* Modal */}
            <div className={`relative z-[101] w-full ${modalMaxWidth} transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 opacity-100 dark:bg-gray-900`}>
                <button 
                    onClick={handleClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
                    aria-label="Close promotion"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative max-h-[88vh] w-full overflow-hidden bg-transparent" style={creativeStyle}>
                    {hasImage ? (
                        <img src={popup.image_path || ''} alt={popup.title} className="absolute inset-0 h-full w-full object-cover" onError={() => setImageFailed(true)} />
                    ) : (
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${popup.accent_color || '#ff4c3b'}, #021d35)` }} />
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-10 text-center text-white drop-shadow-md">
                        {popup.badge_text && (
                            <span className="mx-auto mb-2 sm:mb-5 inline-flex w-fit rounded-full px-3 py-1 sm:px-4 sm:py-2 text-[0.6rem] sm:text-xs font-black uppercase tracking-[0.22em] text-white" style={{ backgroundColor: popup.accent_color || '#ff4c3b' }}>
                                {popup.badge_text}
                            </span>
                        )}
                        {popup.heading && (
                            <h2 className="text-lg sm:text-4xl font-black leading-tight text-white font-serif drop-shadow-lg">
                                {popup.heading}
                            </h2>
                        )}

                        {popup.description && (
                            <p className="mx-auto mt-1 sm:mt-5 max-w-md text-xs sm:text-base font-semibold leading-snug sm:leading-7 text-white/90 drop-shadow-lg">
                                {popup.description}
                            </p>
                        )}

                        {popup.link_url && (
                            <Link
                                href={popup.link_url}
                                onClick={handleClose}
                                className="mt-3 sm:mt-8 inline-flex min-h-[2.25rem] sm:min-h-12 w-full items-center justify-center rounded-xl px-4 sm:px-8 text-[0.65rem] sm:text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:brightness-95 sm:mx-auto sm:w-auto"
                                style={{ backgroundColor: popup.accent_color || '#ff4c3b' }}
                            >
                                {popup.button_label || 'Shop Now'}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
