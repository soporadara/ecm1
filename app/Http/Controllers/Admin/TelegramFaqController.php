<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TelegramFaq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TelegramFaqController extends Controller
{
    public function index()
    {
        $faqs = TelegramFaq::orderBy('sort_order')->get();
        return Inertia::render('Admin/TelegramFaqs/Index', [
            'faqs' => $faqs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_en' => 'required|string|max:255',
            'question_km' => 'required|string|max:255',
            'question_vi' => 'required|string|max:255',
            'answer_en' => 'required|string',
            'answer_km' => 'required|string',
            'answer_vi' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        TelegramFaq::create($validated);

        return redirect()->back()->with('success', 'Telegram FAQ created successfully.');
    }

    public function update(Request $request, TelegramFaq $telegramFaq)
    {
        $validated = $request->validate([
            'question_en' => 'required|string|max:255',
            'question_km' => 'required|string|max:255',
            'question_vi' => 'required|string|max:255',
            'answer_en' => 'required|string',
            'answer_km' => 'required|string',
            'answer_vi' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $telegramFaq->update($validated);

        return redirect()->back()->with('success', 'Telegram FAQ updated successfully.');
    }

    public function destroy(TelegramFaq $telegramFaq)
    {
        $telegramFaq->delete();
        return redirect()->back()->with('success', 'Telegram FAQ deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:telegram_faqs,id',
            'orders.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->orders as $order) {
            TelegramFaq::where('id', $order['id'])->update(['sort_order' => $order['sort_order']]);
        }

        return redirect()->back()->with('success', 'FAQ order updated successfully.');
    }
}
