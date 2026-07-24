<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Services\CmsSecurityService;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('cms:security:unblock {--ip=} {--email=} {--device=} {--all-temporary}', function (CmsSecurityService $security) {
    $released = $security->unblock([
        'ip' => $this->option('ip'),
        'email' => $this->option('email'),
        'device' => $this->option('device'),
        'all_temporary' => (bool) $this->option('all-temporary'),
    ]);

    $this->info("Released {$released} CMS security block(s).");
})->purpose('Release CMS security blocks by IP, email, device, or all temporary blocks');
