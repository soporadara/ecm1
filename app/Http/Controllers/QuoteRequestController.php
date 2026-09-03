<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'description' => 'required|string',
        ]);

        \App\Models\QuoteRequest::create($validated);

        return back()->with('success', 'Quote request submitted successfully. We will contact you soon.');
    }
}
