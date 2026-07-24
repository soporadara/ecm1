<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = ContactMessage::with(['user', 'assignee'])
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->input('status')))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', $search)
                        ->orWhere('email', 'like', $search)
                        ->orWhere('customer_code', 'like', $search)
                        ->orWhere('order_number', 'like', $search)
                        ->orWhere('subject', 'like', $search);
                });
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $messages,
            'filters' => $request->only(['search', 'status']),
            'staff' => User::where('is_admin', true)->select('id', 'name')->orderBy('name')->get(),
            'statuses' => ['new', 'open', 'waiting_for_customer', 'resolved', 'closed', 'spam'],
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,open,waiting_for_customer,resolved,closed,spam'],
            'assigned_to' => ['nullable', 'exists:users,id'],
            'internal_notes' => ['nullable', 'string', 'max:3000'],
        ]);

        $contactMessage->update([
            ...$validated,
            'replied_at' => in_array($validated['status'], ['resolved', 'closed'], true)
                ? ($contactMessage->replied_at ?? now())
                : $contactMessage->replied_at,
        ]);

        return back()->with('success', 'Contact message updated.');
    }
}
