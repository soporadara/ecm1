import { useEffect, useRef } from 'react';

interface Props {
    botUsername: string;
    onAuth: (user: any) => void;
}

export default function TelegramWidget({ botUsername, onAuth }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !botUsername) return;

        // Create global callback for the Telegram widget to trigger
        (window as any).onTelegramAuth = (user: any) => {
            onAuth(user);
        };

        // Clear wrapper container in case of multiple re-renders
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', botUsername);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '12'); // clean, modern rounded styling
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');

        containerRef.current.appendChild(script);

        return () => {
            // Clean up global function when component unmounts
            delete (window as any).onTelegramAuth;
        };
    }, [botUsername, onAuth]);

    return (
        <div className="w-full flex justify-center py-1">
            <div ref={containerRef} className="telegram-widget-wrapper" />
        </div>
    );
}
