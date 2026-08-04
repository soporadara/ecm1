<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>MVM Logistics - Cross-Border Logistics</title>
        <script>
            (() => {
                try {
                    const saved = localStorage.getItem('theme');
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.classList.toggle('dark', saved === 'dark' || (!saved && prefersDark));
                } catch (error) {}
            })();
        </script>
        
        @php
            $favicon = \Illuminate\Support\Facades\Schema::hasTable('settings') ? \App\Models\Setting::where('group', 'general')->where('key', 'store_favicon')->value('value') : null;
            $faviconHref = $favicon ?: '/favicon.png';
            $faviconPath = parse_url($faviconHref, PHP_URL_PATH);
            if (is_string($faviconPath) && str_starts_with($faviconPath, '/')) {
                $publicFaviconPath = public_path(ltrim($faviconPath, '/'));
                if (file_exists($publicFaviconPath)) {
                    $faviconHref .= (str_contains($faviconHref, '?') ? '&' : '?') . 'v=' . filemtime($publicFaviconPath);
                }
            }
        @endphp
        <link rel="icon" type="image/png" sizes="512x512" href="{{ $faviconHref }}">
        <link rel="shortcut icon" href="/favicon.ico?v={{ file_exists(public_path('favicon.ico')) ? filemtime(public_path('favicon.ico')) : time() }}">
        <link rel="apple-touch-icon" href="{{ $faviconHref }}">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!-- Google Bot Crawler Data (Bots don't execute JS, so we need raw HTML here) -->
        <div style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;">
            <h1>MVM Logistics</h1>
            <p>MVM Logistics is a cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.</p>
            <a href="https://mvmlogistics.asia/privacy-policy">Privacy Policy</a>
            <a href="https://mvmlogistics.asia/terms-of-service">Terms of Service</a>
        </div>
        @inertia
    </body>
</html>
