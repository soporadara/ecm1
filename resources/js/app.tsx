import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CurrencyProvider } from './Contexts/CurrencyContext';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Pengu';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialPageProps = props.initialPage.props as any;
        const defaultCurrency =
            initialPageProps?.auth?.user?.preferred_currency ||
            initialPageProps?.general_settings?.default_currency ||
            initialPageProps?.general_settings?.currency ||
            'USD';

        root.render(
            <CurrencyProvider defaultCurrency={defaultCurrency}>
                <App {...props} />
                <Toaster 
                    position="bottom-right"
                    toastOptions={{
                        className: '!bg-admin-surface !text-admin-text !shadow-xl !border !border-admin-border/50 !rounded-2xl',
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#ffffff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#ffffff',
                            },
                        },
                        duration: 4000,
                    }}
                />
            </CurrencyProvider>
        );
    },
    progress: {
        color: '#ff4c3b',
    },
});
