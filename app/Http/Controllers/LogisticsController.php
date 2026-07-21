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
        return Inertia::render('Logistics/Contact');
    }
}
