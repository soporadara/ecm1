<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Pengu') }}</title>
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
        @inertia
    </body>
</html>
