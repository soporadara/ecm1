<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $faqs = \App\Models\TelegramFaq::where('answer_en', 'like', '%"Prohibited Items"%')->get();
        foreach ($faqs as $faq) {
            $faq->update([
                'answer_en' => str_replace('"Prohibited Items"', '<a href="/prohibited-items" class="text-brand-primary font-medium hover:underline">"Prohibited Items"</a>', $faq->answer_en),
                'answer_km' => str_replace('"ទំនិញហាមឃាត់"', '<a href="/prohibited-items" class="text-brand-primary font-medium hover:underline">"ទំនិញហាមឃាត់"</a>', $faq->answer_km),
                'answer_vi' => str_replace('"Mặt hàng bị cấm"', '<a href="/prohibited-items" class="text-brand-primary font-medium hover:underline">"Mặt hàng bị cấm"</a>', $faq->answer_vi),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down migration needed for data update
    }
};
