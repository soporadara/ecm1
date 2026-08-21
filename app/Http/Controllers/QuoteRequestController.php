<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'product_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'weight' => 'nullable|string|max:255',
            'dimensions' => 'nullable|string|max:255',
            'shipping_method' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        \App\Models\QuoteRequest::create($validated);

        return back()->with('success', 'Quote request submitted successfully. We will contact you soon.');
    }
}
