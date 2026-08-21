import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { CurrencyProvider } from './Contexts/CurrencyContext';

const appName = import.meta.env.VITE_APP_NAME || 'Pengu';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            const initialPageProps = props.initialPage.props as any;
            const defaultCurrency =
                initialPageProps?.auth?.user?.preferred_currency ||
                initialPageProps?.general_settings?.default_currency ||
                initialPageProps?.general_settings?.currency ||
                'USD';

            return (
                <CurrencyProvider defaultCurrency={defaultCurrency}>
                    <App {...props} />
                </CurrencyProvider>
            );
        },
    })
);
