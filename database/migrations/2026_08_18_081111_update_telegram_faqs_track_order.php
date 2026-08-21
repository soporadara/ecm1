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
        $faq = \App\Models\TelegramFaq::where('question_en', 'How to track my order?')->first();
        if ($faq) {
            $extra_en = " You can also use our Telegram bot <a href='https://t.me/mvmlogistic' target='_blank' class='text-brand-primary font-medium hover:underline'>@mvmlogistic</a> to follow up and track your order.";
            $extra_km = " អ្នកក៏អាចប្រើ Telegram bot របស់យើង <a href='https://t.me/mvmlogistic' target='_blank' class='text-brand-primary font-medium hover:underline'>@mvmlogistic</a> ដើម្បីតាមដានការបញ្ជាទិញរបស់អ្នកផងដែរ។";
            $extra_vi = " Bạn cũng có thể sử dụng Telegram bot của chúng tôi <a href='https://t.me/mvmlogistic' target='_blank' class='text-brand-primary font-medium hover:underline'>@mvmlogistic</a> để theo dõi đơn hàng.";
            
            $faq->update([
                'answer_en' => $faq->answer_en . $extra_en,
                'answer_km' => $faq->answer_km . $extra_km,
                'answer_vi' => $faq->answer_vi . $extra_vi,
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
