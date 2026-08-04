<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LogisticsController extends Controller
{
    public function howItWorks()
    {
        return Inertia::render('Logistics/HowItWorks');
    }

    public function shippingRates()
    {
        return Inertia::render('Logistics/ShippingRates');
    }

    public function warehouses()
    {
        return Inertia::render('Logistics/Warehouses');
    }

    public function track()
    {
        return Inertia::render('Logistics/Track');
    }

    public function contact()
    {
        $ch = curl_init('https://maps.app.goo.gl/22Bb8oBFDhVxrosV8');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
        $response = curl_exec($ch);
        curl_close($ch);
        \Log::info('CAMBODIA_REDIRECT:', [$response]);

        \Log::info('SETTINGS_CONTACT:', \App\Models\Setting::pluck('value', 'key')->toArray());
        
        // Ensure the correct open URLs and embed URLs are set based on user's shortlinks
        \App\Models\Setting::updateOrCreate(['key' => 'cambodia_map_open_url'], ['value' => 'https://maps.app.goo.gl/22Bb8oBFDhVxrosV8?g_st=ic']);
        \App\Models\Setting::updateOrCreate(['key' => 'vietnam_map_open_url'], ['value' => 'https://maps.app.goo.gl/aPY4XLhLnp1XYfKP9?g_st=ic']);
        
        \App\Models\Setting::updateOrCreate(['key' => 'cambodia_map_embed_url'], ['value' => 'https://maps.google.com/maps?q=loc:11.6441475,104.9126435&z=17&output=embed']);
        \App\Models\Setting::updateOrCreate(['key' => 'vietnam_map_embed_url'], ['value' => 'https://maps.google.com/maps?q=loc:11.076760,106.173980&z=17&output=embed']);
        
        return Inertia::render('Logistics/Contact');
    }
}
