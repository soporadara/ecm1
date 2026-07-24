<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentSettingController extends Controller
{
    private array $orderMessageFields = [
        'request_quote_page_title' => 'Manual Order Page Title',
        'request_quote_introduction' => 'Manual Order Introduction',
        'logistics_fee_notice' => 'Logistics Fee Notice',
        'pricing_disclaimer' => 'Pricing Disclaimer',
        'submit_button_text' => 'Submit Button Text',
        'submission_success_title' => 'Submission Success Title',
        'submission_success_description' => 'Submission Success Description',
        'view_order_button_text' => 'View Order Button Text',
        'create_another_request_button_text' => 'Create Another Manual Order Button Text',
    ];

    public function orderMessages()
    {
        $settings = ContentSetting::where('group', 'order_messages')
            ->where('locale', 'en')
            ->pluck('value', 'key');

        return Inertia::render('Admin/ContentSettings/OrderMessages', [
            'fields' => $this->orderMessageFields,
            'settings' => $settings,
        ]);
    }

    public function storeOrderMessages(Request $request)
    {
        $validated = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string', 'max:2000'],
        ]);

        foreach ($this->orderMessageFields as $key => $label) {
            ContentSetting::updateOrCreate(
                ['group' => 'order_messages', 'key' => $key, 'locale' => 'en'],
                [
                    'value' => $validated['settings'][$key] ?? '',
                    'value_type' => str_contains($key, 'description') || str_contains($key, 'introduction') || str_contains($key, 'notice') || str_contains($key, 'disclaimer') ? 'textarea' : 'text',
                    'is_public' => true,
                    'updated_by' => auth('admin')->id(),
                ]
            );
        }

        return back()->with('success', 'Quote wording updated.');
    }
}
