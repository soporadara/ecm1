<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('telegram_faqs', function (Blueprint $table) {
            if (!Schema::hasColumn('telegram_faqs', 'category')) {
                $table->string('category')->nullable()->after('id');
            }
        });

        // Set category for existing ones
        DB::table('telegram_faqs')->whereNull('category')->update(['category' => 'General']);

        // Insert new FAQs
        $newFaqs = [
            ['category' => 'Ordering', 'question_en' => 'How do I place an order?', 'answer_en' => 'You can place an order directly through our website by submitting a Manual Order request, or by sending us a message on Telegram with the product details and links.'],
            ['category' => 'Ordering', 'question_en' => 'Can MVM purchase products for me?', 'answer_en' => 'Yes, MVM provides full purchasing services. You send us the product link and details, we buy it for you and arrange the shipment.'],
            ['category' => 'Ordering', 'question_en' => 'What information do I need to provide?', 'answer_en' => 'Please provide the product link, quantity, color, size, and any other specific variations required for the purchase.'],
            
            ['category' => 'Shipping', 'question_en' => 'Which countries do you ship from/to?', 'answer_en' => 'We currently specialize in logistics from China to Cambodia, Vietnam to Cambodia, and Cambodia to Vietnam.'],
            ['category' => 'Shipping', 'question_en' => 'How long does delivery take?', 'answer_en' => 'Delivery times depend on the origin and shipping method. Standard transit from China or Vietnam to Cambodia typically takes 3-7 business days.'],
            ['category' => 'Shipping', 'question_en' => 'How is shipping calculated?', 'answer_en' => 'Shipping is calculated based on the actual weight or volumetric weight of the package, whichever is greater, and the selected shipping method.'],
            ['category' => 'Shipping', 'question_en' => 'Do you handle large/bulk shipments?', 'answer_en' => 'Yes, we handle bulk logistics for business customers and offer sea freight options for larger cargo.'],
            
            ['category' => 'Warehouse', 'question_en' => 'Can I send products to your warehouse?', 'answer_en' => 'Yes, if you purchase items yourself, you can use our China or Vietnam warehouse address for receiving.'],
            ['category' => 'Warehouse', 'question_en' => 'Do you inspect packages?', 'answer_en' => 'We perform standard external packaging checks upon receipt. Detailed product inspection can be requested for an additional fee.'],
            ['category' => 'Warehouse', 'question_en' => 'Can you consolidate multiple packages?', 'answer_en' => 'Yes, we can consolidate multiple orders into a single shipment to save on shipping costs.'],
            
            ['category' => 'Tracking', 'question_en' => 'How can I track my shipment?', 'answer_en' => 'You can track your shipment in real-time through your account dashboard on our website or by using our Telegram bot.'],
            ['category' => 'Tracking', 'question_en' => 'When will my tracking status update?', 'answer_en' => 'Tracking statuses are updated immediately when packages reach key milestones: Warehouse Received, Shipped, Arrived, and Delivered.'],
            
            ['category' => 'Payment', 'question_en' => 'What payment methods do you accept?', 'answer_en' => 'We accept ABA KHQR, standard bank transfers, and direct cash payments at our office.'],
            ['category' => 'Payment', 'question_en' => 'Will I receive a payment receipt?', 'answer_en' => 'Yes, a digital receipt will be generated and available in your account once payment is verified.'],
            ['category' => 'Payment', 'question_en' => 'Are there additional customs or handling fees?', 'answer_en' => 'Standard cross-border shipping quotes typically include standard clearing fees. Any exceptional customs duties will be communicated transparently.'],
            
            ['category' => 'Problems', 'question_en' => 'What happens if my package is damaged?', 'answer_en' => 'Please report any damage with photos within 24 hours of delivery so we can investigate and assist with claims.'],
            ['category' => 'Problems', 'question_en' => 'What happens if an item is missing?', 'answer_en' => 'If an item is missing, contact our support team immediately. We will check warehouse records to trace the missing item.'],
            ['category' => 'Problems', 'question_en' => 'What happens if my shipment is delayed?', 'answer_en' => 'In case of severe weather, customs holdups, or transit delays, we will notify you and provide updated delivery estimates.'],
        ];

        foreach ($newFaqs as $faq) {
            $faq['created_at'] = now();
            $faq['updated_at'] = now();
            $faq['is_active'] = true;
            DB::table('telegram_faqs')->insert($faq);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('telegram_faqs', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
