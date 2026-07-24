<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withCommands([
        \App\Console\Commands\DemoSeedCommand::class,
        \App\Console\Commands\DemoResetCommand::class,
    ])
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->redirectGuestsTo(function ($request) {
            return $request->is('admin') || $request->is('admin/*') || $request->is('cms') || $request->is('cms/*')
                ? route('cms.login')
                : route('login');
        });
        $middleware->alias([
            'is_admin' => \App\Http\Middleware\IsAdmin::class,
            'storefront' => \App\Http\Middleware\CheckStorefrontEnabled::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
