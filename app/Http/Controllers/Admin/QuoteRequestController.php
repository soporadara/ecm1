<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function index(Request $request)
    {
        $quotes = \App\Models\QuoteRequest::query()
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->input('status')))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', $search)
                        ->orWhere('email', 'like', $search)
                        ->orWhere('phone', 'like', $search);
                });
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return \Inertia\Inertia::render('Admin/QuoteRequests/Index', [
            'quotes' => $quotes,
            'filters' => $request->only(['search', 'status']),
            'statuses' => ['pending', 'quoted', 'closed'],
        ]);
    }

    public function update(Request $request, \App\Models\QuoteRequest $quoteRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,quoted,closed',
        ]);

        $quoteRequest->update($validated);

        return back()->with('success', 'Quote request updated.');
    }

    public function destroy(\App\Models\QuoteRequest $quoteRequest)
    {
        $quoteRequest->delete();

        return back()->with('success', 'Quote request deleted.');
    }
}
