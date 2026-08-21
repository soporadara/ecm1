<?php

namespace App\Services\Telegram;

use App\Models\Order;
use App\Models\User;
use App\Models\TelegramFaq;

class TelegramCustomerService
{
    protected TelegramBotService $bot;

    public function __construct(TelegramBotService $bot)
    {
        $this->bot = $bot;
    }

    public function handleCommand(string $command, ?User $customer, $chatId)
    {
        if ($command === '/language') {
            return $this->sendLanguageMenu($chatId);
        }

        if (preg_match('/^\/q(\d+)$/', $command, $matches)) {
            $index = (int)$matches[1];
            
            $lang = 'en';
            if ($customer) {
                $lang = $customer->preferred_language;
            } else {
                $lang = \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            }
            
            return $this->sendFaqAnswer($chatId, $index, $lang);
        }

        $lang = 'en';
        if ($customer) {
            $lang = $customer->preferred_language ?? 'en';
        } else {
            $lang = \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
        }

        switch ($command) {
            case '/start':
                return $this->sendWelcomeMenu($chatId, null, 'all');
            case '/track':
                return $this->trackOrders($chatId, null, $customer);
            default:
                return $this->sendWelcomeMenu($chatId, null, $lang);
        }
    }

    public function handleTextMessage(string $text, ?User $customer, $chatId)
    {
        $lang = 'en';
        if ($customer) {
            $lang = $customer->preferred_language ?? 'en';
        } else {
            $lang = \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
        }

        // Match against all possible button labels in all languages (including emoji prefix)
        // Track button labels: en='Track My Order', km='តាមដានការបញ្ជាទិញ', vi='Theo dõi Đơn hàng'
        if (str_contains($text, 'Track') || str_contains($text, 'Theo d') || str_contains($text, 'តាមដាន')) {
            if (!$customer) return false;
            $this->trackOrders($chatId, null, $customer);
            return true;
        }

        // Receipt button labels: en='Receipts', km='វិក្កយបត្រ', vi='Biên lai'
        if (str_contains($text, 'Receipt') || str_contains($text, 'Bi') || str_contains($text, 'វិក្ក')) {
            // Narrow "Bi" check — only match Biên lai not random words
            if (str_contains($text, 'Receipts') || str_contains($text, 'Receipt') || str_contains($text, 'Biên lai') || str_contains($text, 'វិក្ក')) {
                if (!$customer) return false;
                $this->sendReceiptMenu($chatId, null, $customer);
                return true;
            }
        }

        // FAQ button labels: en='FAQ', km='សំណួរញឹកញាប់', vi='Câu hỏi thường gặp'
        if (str_contains($text, 'FAQ') || str_contains($text, 'Câu hỏi') || str_contains($text, 'សំណួរ')) {
            $this->sendFaqList($chatId, null, $lang);
            return true;
        }

        // Contact button labels: en='Contact Us', km='ទាក់ទងយើង', vi='Liên hệ Chúng tôi'
        if (str_contains($text, 'Contact') || str_contains($text, 'Liên hệ') || str_contains($text, 'ទាក់ទង')) {
            $this->sendContactUs($chatId, null, $lang);
            return true;
        }

        // Language button labels: en='Change Language', km='ផ្លាស់ប្តូរភាសា', vi='Đổi Ngôn ngữ'
        if (str_contains($text, 'Language') || str_contains($text, 'Ngôn ngữ') || str_contains($text, 'ភាសា') || str_contains($text, 'ផ្លាស់ប្តូរ') || str_contains($text, 'Đổi')) {
            $this->sendLanguageMenu($chatId, $lang);
            return true;
        }

        // Website button labels: en='Visit Website', km='ចូលមើលគេហទំព័រ', vi='Truy cập Website'
        if (str_contains($text, 'Website') || str_contains($text, 'Truy cập') || str_contains($text, 'គេហទំព័រ') || str_contains($text, 'ចូលមើល')) {
            $msgs = [
                'en' => "🌐 Visit our website: " . config('app.url'),
                'km' => "🌐 ចូលមើលគេហទំព័ររបស់យើង: " . config('app.url'),
                'vi' => "🌐 Truy cập website của chúng tôi: " . config('app.url'),
            ];
            $this->bot->sendMessage($chatId, $msgs[$lang] ?? $msgs['en']);
            return true;
        }

        return false;
    }

    public function handleCallback(string $data, ?User $customer, $chatId, $messageId, $callbackQueryId)
    {
        if (str_starts_with($data, 'lang_')) {
            $lang = str_replace('lang_', '', $data);
            if (in_array($lang, ['en', 'km', 'vi'])) {
                if ($customer) {
                    $customer->preferred_language = $lang;
                    $customer->save();
                } else {
                    \Illuminate\Support\Facades\Cache::put("tg_lang_{$chatId}", $lang, now()->addDays(365));
                }
                
                $msg = "Language updated to English.";
                if ($lang === 'km') $msg = "ភាសាត្រូវបានផ្លាស់ប្តូរទៅជាភាសាខ្មែរ។";
                if ($lang === 'vi') $msg = "Ngôn ngữ đã được thay đổi thành Tiếng Việt.";
                
                $this->bot->answerCallbackQuery($callbackQueryId);
                
                // Send the confirmation message and attach the newly translated persistent keyboard
                $markup = $this->getPersistentKeyboard($lang);
                
                if ($messageId) {
                    try {
                        $this->bot->deleteMessage($chatId, $messageId);
                    } catch (\Exception $e) {}
                }

                return $this->bot->sendMessage($chatId, $msg, $markup);
            }
        }

        if ($data === 'customer_menu') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            return $this->sendWelcomeMenu($chatId, $messageId, $lang);
        }

        if ($data === 'track_orders') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            return $this->trackOrders($chatId, $messageId, $customer);
        }

        if (str_starts_with($data, 'track_order_items_')) {
            $orderId = str_replace('track_order_items_', '', $data);
            return $this->viewOrderItems($chatId, $messageId, $orderId, $callbackQueryId, $customer);
        }

        if (str_starts_with($data, 'track_order_')) {
            $orderId = str_replace('track_order_', '', $data);
            return $this->viewOrderDetails($chatId, $messageId, $orderId, $callbackQueryId, $customer);
        }

        if ($data === 'customer_faq') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            return $this->sendFaqList($chatId, $messageId, $lang);
        }
        
        if (str_starts_with($data, 'faq_')) {
            $index = (int)str_replace('faq_', '', $data);
            $this->bot->answerCallbackQuery($callbackQueryId);
            $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            return $this->sendFaqAnswer($chatId, $index, $lang);
        }
        
        if ($data === 'contact_us') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            return $this->sendContactUs($chatId, $messageId, $lang);
        }

        if ($data === 'change_language') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$chatId}", 'en');
            return $this->sendLanguageMenu($chatId, $lang);
        }

        if ($data === 'receipt_menu') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            return $this->sendReceiptMenu($chatId, $messageId, $customer);
        }

        if (str_starts_with($data, 'rcpt_gen_')) {
            $orderId = str_replace('rcpt_gen_', '', $data);
            return $this->generateReceipt($chatId, $messageId, $orderId, $callbackQueryId, $customer);
        }

        if (str_starts_with($data, 'download_receipt_')) {
            $receiptId = str_replace('download_receipt_', '', $data);
            return $this->downloadReceiptPdf($chatId, $receiptId, $callbackQueryId);
        }

        $this->bot->answerCallbackQuery($callbackQueryId);
    }

    private function getPersistentKeyboard($lang = 'en')
    {
        $buttons = [
            'en' => ['Track My Order', 'FAQ', 'Visit Website', 'Contact Us', 'Change Language', 'Receipts'],
            'km' => ['តាមដានការបញ្ជាទិញ', 'សំណួរញឹកញាប់', 'ចូលមើលគេហទំព័រ', 'ទាក់ទងយើង', 'ផ្លាស់ប្តូរភាសា', 'វិក្កយបត្រ'],
            'vi' => ['Theo dõi Đơn hàng', 'Câu hỏi thường gặp', 'Truy cập Website', 'Liên hệ Chúng tôi', 'Đổi Ngôn ngữ', 'Biên lai']
        ];
        $btn = $buttons[$lang] ?? $buttons['en'];

        return [
            'keyboard' => [
                [
                    ['text' => '📦 ' . $btn[0], 'style' => 'primary'],
                    ['text' => '🧾 ' . $btn[5], 'style' => 'success'],
                ],
                [
                    ['text' => '❓ ' . $btn[1], 'style' => 'primary'],
                    ['text' => '☎️ ' . $btn[3], 'style' => 'primary']
                ],
                [
                    ['text' => '🌐 ' . $btn[2], 'style' => 'primary'],
                    ['text' => '🌍 ' . $btn[4], 'style' => 'primary']
                ]
            ],
            'resize_keyboard' => true,
            'is_persistent' => true
        ];
    }

    private function sendWelcomeMenu($chatId, $messageId = null, $lang = 'en')
    {
        // 'all' mode: show trilingual welcome (for /start first use)
        if ($lang === 'all') {
            $text = "👋 *Welcome to MVM Logistics!*\n"
                  . "សូមស្វាគមន៍មកកាន់ MVM Logistics!\n"
                  . "Chào mừng đến với MVM Logistics!\n\n"
                  . "👇 Please select an option below to continue\n"
                  . "សូមជ្រើសរើសជម្រើសខាងក្រោម\n"
                  . "Vui lòng chọn tùy chọn bên dưới:";
            // Default to English keyboard for first-time users
            $markup = $this->getPersistentKeyboard('en');
        } else {
            $titles = [
                'en' => "👋 *Welcome to MVM Logistics!*\n\n👇 Please select an option below to continue:",
                'km' => "👋 *សូមស្វាគមន៍មកកាន់ MVM Logistics!*\n\n👇 សូមជ្រើសរើសជម្រើសខាងក្រោម៖",
                'vi' => "👋 *Chào mừng đến với MVM Logistics!*\n\n👇 Vui lòng chọn tùy chọn bên dưới:"
            ];
            $text = $titles[$lang] ?? $titles['en'];
            $markup = $this->getPersistentKeyboard($lang);
        }

        // Since we are changing to a ReplyKeyboardMarkup, we cannot edit an existing message
        // We must always send a new message to show the keyboard.
        if ($messageId) {
            try {
                // Delete the old menu message to keep chat clean if we are replacing an inline menu
                $this->bot->deleteMessage($chatId, $messageId);
            } catch (\Exception $e) {
                // Ignore if it fails to delete
            }
        }
        
        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function trackOrders($chatId, $messageId, User $customer)
    {
        $lang = $customer->preferred_language ?? 'en';
        $orders = Order::where('user_id', $customer->id)
            ->whereNotIn('status', ['draft'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $backTexts = ['en' => '⬅️ Back', 'km' => '⬅️ ត្រឡប់ក្រោយ', 'vi' => '⬅️ Quay lại'];
        $backBtn = $backTexts[$lang] ?? $backTexts['en'];

        if ($orders->isEmpty()) {
            $texts = [
                'en' => "You don't have any active orders right now.",
                'km' => "អ្នកមិនមានការបញ្ជាទិញសកម្មនៅពេលនេះទេ។",
                'vi' => "Bạn không có đơn hàng nào đang hoạt động lúc này."
            ];
            $text = $texts[$lang] ?? $texts['en'];
            $markup = [
                'inline_keyboard' => [
                    [['text' => $backBtn, 'callback_data' => 'customer_menu', 'style' => 'danger']]
                ]
            ];
            
            if ($messageId) {
                return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
            }
            return $this->bot->sendMessage($chatId, $text, $markup);
        }

        $titles = [
            'en' => "📦 *Your Recent Orders*\n\nSelect an order to view its status:",
            'km' => "📦 *ការបញ្ជាទិញថ្មីៗរបស់អ្នក*\n\nជ្រើសរើសការបញ្ជាទិញដើម្បីមើលស្ថានភាព៖",
            'vi' => "📦 *Đơn hàng gần đây của bạn*\n\nChọn một đơn hàng để xem trạng thái:"
        ];
        $text = $titles[$lang] ?? $titles['en'];
        $markup = ['inline_keyboard' => []];

        foreach ($orders as $order) {
            $markup['inline_keyboard'][] = [
                ['text' => "{$order->order_number} - " . ucfirst($order->status), 'callback_data' => "track_order_{$order->id}", 'style' => 'primary']
            ];
        }

        $markup['inline_keyboard'][] = [['text' => $backBtn, 'callback_data' => 'customer_menu', 'style' => 'danger']];

        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function viewOrderDetails($chatId, $messageId, $orderId, $callbackId, User $customer)
    {
        $this->bot->answerCallbackQuery($callbackId);
        $order = Order::with('receipts')->where('id', $orderId)->where('user_id', $customer->id)->first();
        $lang = $customer->preferred_language ?? 'en';

        if (!$order) {
            $texts = [
                'en' => "Order not found.",
                'km' => "រកមិនឃើញការបញ្ជាទិញទេ។",
                'vi' => "Không tìm thấy đơn hàng."
            ];
            return $this->bot->editMessageText($chatId, $messageId, $texts[$lang] ?? $texts['en']);
        }

        $labels = [
            'en' => ['Order', 'Date', 'Status', 'Tracking', 'Refresh', 'Back to Orders', 'View Details / Items', 'View Receipt (Web)', '📥 Download PDF'],
            'km' => ['ការបញ្ជាទិញ', 'កាលបរិច្ឆេទ', 'ស្ថានភាព', 'លេខតាមដាន', 'ផ្ទុកឡើងវិញ', 'ត្រឡប់ទៅការបញ្ជាទិញ', 'មើលព័ត៌មានលម្អិត', 'មើលបង្កាន់ដៃ (គេហទំព័រ)', '📥 ទាញយក PDF'],
            'vi' => ['Đơn hàng', 'Ngày', 'Trạng thái', 'Mã theo dõi', 'Làm mới', 'Quay lại Đơn hàng', 'Xem Chi tiết / Sản phẩm', 'Xem Hóa đơn (Web)', '📥 Tải PDF']
        ];
        $lbl = $labels[$lang] ?? $labels['en'];

        $text = "📦 *{$lbl[0]} {$order->order_number}*\n\n";
        $text .= "📅 *{$lbl[1]}:* " . $order->created_at->format('M d, Y') . "\n";
        $text .= "🚚 *{$lbl[2]}:*\n" . $this->getStatusProgress($order->status, $lang) . "\n\n";
        if ($order->tracking_number) {
            $text .= "📍 *{$lbl[3]}:* {$order->tracking_number}\n";
        }

        $markup = [
            'inline_keyboard' => [
                [['text' => '🛍️ ' . $lbl[6], 'callback_data' => "track_order_items_{$order->id}", 'style' => 'primary']]
            ]
        ];

        if ($order->receipts && $order->receipts->isNotEmpty()) {
            $receipt = $order->receipts->first();
            $markup['inline_keyboard'][] = [['text' => '🧾 ' . $lbl[7], 'url' => url('/r/' . $receipt->receipt_number), 'style' => 'success']];
            $markup['inline_keyboard'][] = [['text' => $lbl[8], 'callback_data' => "download_receipt_{$receipt->id}", 'style' => 'success']];
        }

        $markup['inline_keyboard'][] = [['text' => '🔄 ' . $lbl[4], 'callback_data' => "track_order_{$order->id}", 'style' => 'primary']];
        $markup['inline_keyboard'][] = [['text' => '⬅️ ' . $lbl[5], 'callback_data' => 'track_orders', 'style' => 'danger']];

        return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
    }

    private function viewOrderItems($chatId, $messageId, $orderId, $callbackId, User $customer)
    {
        $this->bot->answerCallbackQuery($callbackId);
        $order = Order::with(['items.images', 'items.urls'])->where('id', $orderId)->where('user_id', $customer->id)->first();
        $lang = $customer->preferred_language ?? 'en';

        if (!$order) {
            return;
        }

        $labels = [
            'en' => ['Items for Order', 'Product', 'Qty', 'Link', 'Price', 'Back to Order'],
            'km' => ['ទំនិញសម្រាប់ការបញ្ជាទិញ', 'ផលិតផល', 'ចំនួន', 'តំណ', 'តម្លៃ', 'ត្រឡប់ទៅការបញ្ជាទិញ'],
            'vi' => ['Sản phẩm của Đơn hàng', 'Sản phẩm', 'SL', 'Liên kết', 'Giá', 'Quay lại Đơn hàng']
        ];
        $lbl = $labels[$lang] ?? $labels['en'];

        $text = "🛍️ *{$lbl[0]} {$order->order_number}*\n\n";

        if ($order->items->isEmpty()) {
            $text .= "No items found.";
        } else {
            foreach ($order->items as $index => $item) {
                $text .= "*" . ($index + 1) . ". {$item->product_name}*\n";
                $text .= "📦 {$lbl[2]}: {$item->quantity}\n";
                if ($item->price > 0 || $item->final_unit_price > 0) {
                    $price = $item->final_unit_price ?? $item->price;
                    $text .= "💵 {$lbl[4]}: ¥" . number_format($price, 2) . "\n";
                }
                
                if ($item->description || $item->variant) {
                    $text .= "📝 " . trim("{$item->variant} {$item->description}") . "\n";
                }

                if ($item->urls && $item->urls->count() > 0) {
                    foreach ($item->urls as $url) {
                        $text .= "🔗 [{$lbl[3]}]({$url->url})\n";
                    }
                }

                if ($item->images && $item->images->count() > 0) {
                    foreach ($item->images as $img) {
                        $imgUrl = rtrim(config('app.url'), '/') . '/storage/' . $img->image_path;
                        $text .= "🖼️ [Image]({$imgUrl})\n";
                    }
                }
                $text .= "\n";
            }
        }

        $markup = [
            'inline_keyboard' => [
                [['text' => '⬅️ ' . $lbl[5], 'callback_data' => "track_order_{$order->id}", 'style' => 'danger']]
            ]
        ];

        return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
    }

    private function getStatusProgress($status, $lang = 'en')
    {
        $status = strtolower($status);
        $labels = [
            'en' => [
                'draft' => 'Draft', 'pending' => 'Pending', 'submitted' => 'Progress',
                'in_progress' => 'In Progress', 'processing' => 'Processing',
                'shipped' => 'Shipped', 'shipping' => 'Shipping',
                'delivered' => 'Delivered', 'completed' => 'Completed',
                'cancelled' => 'Cancelled'
            ],
            'km' => [
                'draft' => 'សេចក្តីព្រាង', 'pending' => 'កំពុងរង់ចាំ', 'submitted' => 'កំពុងដំណើរការ',
                'in_progress' => 'កំពុងដំណើរការ', 'processing' => 'កំពុងដំណើរការ',
                'shipped' => 'បានដឹកជញ្ជូន', 'shipping' => 'កំពុងដឹកជញ្ជូន',
                'delivered' => 'បានប្រគល់', 'completed' => 'បានបញ្ចប់',
                'cancelled' => 'បានលុបចោល'
            ],
            'vi' => [
                'draft' => 'Bản nháp', 'pending' => 'Đang chờ', 'submitted' => 'Đang xử lý',
                'in_progress' => 'Đang tiến hành', 'processing' => 'Đang xử lý',
                'shipped' => 'Đã giao hàng', 'shipping' => 'Đang vận chuyển',
                'delivered' => 'Đã nhận', 'completed' => 'Đã hoàn thành',
                'cancelled' => 'Đã hủy'
            ]
        ];
        
        $lbl = $labels[$lang][$status] ?? ucfirst($status);

        switch ($status) {
            case 'draft':
            case 'pending':
            case 'submitted':
                return "🔵 " . $lbl . "\n`[■□□□□]`";
            case 'in_progress':
            case 'processing':
                return "🟡 " . $lbl . "\n`[■■■□□]`";
            case 'shipped':
            case 'shipping':
                return "🟠 " . $lbl . "\n`[■■■■□]`";
            case 'delivered':
            case 'completed':
                return "🟢 " . $lbl . "\n`[■■■■■]`";
            case 'cancelled':
                return "🔴 " . $lbl . "\n`[✖✖✖✖✖]`";
            default:
                return "⚪ " . $lbl . "\n`[■■□□□]`";
        }
    }

    private function sendLanguageMenu($chatId, $lang = 'en')
    {
        $msgs = [
            'en' => "Please select your preferred language:",
            'km' => "សូមជ្រើសរើសភាសារបស់អ្នក៖",
            'vi' => "Vui lòng chọn ngôn ngữ của bạn:"
        ];
        $text = $msgs[$lang] ?? "Please select your preferred language / សូមជ្រើសរើសភាសារបស់អ្នក / Vui lòng chọn ngôn ngữ của bạn:";
        $markup = [
            'inline_keyboard' => [
                [
                    ['text' => '🇬🇧 English', 'callback_data' => 'lang_en', 'style' => 'primary'],
                    ['text' => '🇰🇭 ខ្មែរ', 'callback_data' => 'lang_km', 'style' => 'primary'],
                    ['text' => '🇻🇳 Tiếng Việt', 'callback_data' => 'lang_vi', 'style' => 'primary'],
                ]
            ]
        ];
        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function sendFaqAnswer($chatId, $index, $lang)
    {
        $faq = \App\Models\TelegramFaq::where('is_active', true)->orderBy('sort_order')->skip($index - 1)->first();
        if (!$faq) {
            return $this->bot->sendMessage($chatId, "FAQ not found.");
        }

        $answer = $faq->{'answer_' . $lang} ?: $faq->answer_en;
        $question = $faq->{'question_' . $lang} ?: $faq->question_en;
        
        $text = "❓ *{$question}*\n\n{$answer}";
        return $this->bot->sendMessage($chatId, $text);
    }

    private function sendFaqList($chatId, $messageId = null, $lang = 'en')
    {
        $faqs = TelegramFaq::where('is_active', true)->orderBy('sort_order')->get();
        
        $titles = [
            'en' => "❓ *Frequently Asked Questions*",
            'km' => "❓ *សំណួរដែលសួរញឹកញាប់*",
            'vi' => "❓ *Câu hỏi thường gặp*"
        ];
        $text = $titles[$lang] ?? $titles['en'];
        $text .= "\n\n";
        
        $markup = ['inline_keyboard' => []];
        
        $index = 1;
        foreach ($faqs as $faq) {
            $question = $faq->{'question_' . $lang} ?: $faq->question_en;
            // Clean up existing numbers like "1. " to prevent duplicate "1. 1."
            $cleanQuestion = preg_replace('/^\d+\.\s*/', '', $question);
            $markup['inline_keyboard'][] = [
                ['text' => "{$index}. {$cleanQuestion}", 'callback_data' => "faq_{$index}", 'style' => 'primary']
            ];
            $index++;
        }
        
        $backTexts = ['en' => '⬅️ Back', 'km' => '⬅️ ត្រឡប់ក្រោយ', 'vi' => '⬅️ Quay lại'];
        $markup['inline_keyboard'][] = [
            ['text' => $backTexts[$lang] ?? $backTexts['km'], 'callback_data' => 'customer_menu', 'style' => 'danger']
        ];

        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function sendContactUs($chatId, $messageId = null, $lang = 'en')
    {
        $titles = [
            'en' => "☎️ *Contact Us*",
            'km' => "☎️ *ទាក់ទងយើង*",
            'vi' => "☎️ *Liên hệ Chúng tôi*"
        ];
        $text = $titles[$lang] ?? $titles['km'];
        
        $text .= "\n\n";
        
        $settings = \Illuminate\Support\Facades\Cache::remember('general_settings', 60, function () {
            return \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray();
        });
        
        $supportEmail = $settings['support_email'] ?? 'info@mvmlogistics.asia';
        $supportPhone = $settings['support_phone'] ?? '+855 31 766 9555';
        $vnPhone = '(+84) 0813308055';
        
        $text .= "📧 Email: {$supportEmail}\n";
        $text .= "🇰🇭 KH Phone: {$supportPhone}\n";
        $text .= "🇻🇳 VN Phone: {$vnPhone}\n";
        $text .= "💬 Telegram: @mvmlogistic\n\n";
        
        $backTexts = ['en' => '⬅️ Back', 'km' => '⬅️ ត្រឡប់ក្រោយ', 'vi' => '⬅️ Quay lại'];
        $markup = [
            'inline_keyboard' => [
                [
                    ['text' => '💬 Chat with Sales', 'url' => 'https://t.me/mvmlogistic', 'style' => 'primary']
                ],
                [
                    ['text' => $backTexts[$lang] ?? $backTexts['km'], 'callback_data' => 'customer_menu', 'style' => 'danger']
                ]
            ]
        ];

        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function sendReceiptMenu($chatId, $messageId, User $customer)
    {
        $lang = $customer->preferred_language ?? 'en';
        $orders = Order::where('user_id', $customer->id)
            ->whereIn('status', ['in_progress', 'delivered', 'shipped', 'completed', 'pending', 'submitted'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $backTexts = ['en' => '⬅️ Back', 'km' => '⬅️ ត្រឡប់ក្រោយ', 'vi' => '⬅️ Quay lại'];
        $backBtn = $backTexts[$lang] ?? $backTexts['en'];

        if ($orders->isEmpty()) {
            $texts = [
                'en' => "You don't have any eligible orders to generate a receipt for.",
                'km' => "អ្នកមិនមានការបញ្ជាទិញដែលមានសិទ្ធិបង្កើតវិក្កយបត្រទេ។",
                'vi' => "Bạn không có đơn hàng đủ điều kiện để tạo biên lai."
            ];
            $text = $texts[$lang] ?? $texts['en'];
            $markup = ['inline_keyboard' => [[['text' => $backBtn, 'callback_data' => 'customer_menu', 'style' => 'danger']]]];
            if ($messageId) {
                return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
            }
            return $this->bot->sendMessage($chatId, $text, $markup);
        }

        $titles = [
            'en' => "🧾 *Generate Receipt*\n\nSelect an order below to generate its receipt:",
            'km' => "🧾 *បង្កើតវិក្កយបត្រ*\n\nជ្រើសរើសការបញ្ជាទិញខាងក្រោមដើម្បីបង្កើតវិក្កយបត្រ៖",
            'vi' => "🧾 *Tạo Biên lai*\n\nChọn một đơn hàng bên dưới để tạo biên lai:"
        ];
        $text = $titles[$lang] ?? $titles['en'];
        
        $markup = ['inline_keyboard' => []];

        foreach ($orders as $order) {
            $markup['inline_keyboard'][] = [
                ['text' => '📄 ' . $order->order_number . ' - $' . number_format($order->subtotal ?? 0, 2), 'callback_data' => "rcpt_gen_{$order->id}", 'style' => 'primary']
            ];
        }

        $markup['inline_keyboard'][] = [['text' => $backBtn, 'callback_data' => 'customer_menu', 'style' => 'danger']];

        if ($messageId) {
            return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
        }
        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function generateReceipt($chatId, $messageId, $orderId, $callbackId, User $customer)
    {
        $lang = $customer->preferred_language ?? 'en';
        $order = Order::with('items')->where('id', $orderId)->where('user_id', $customer->id)->first();
        if (!$order) {
            $errs = ['en' => 'Invalid order.', 'km' => 'ការបញ្ជាទិញមិនត្រឹមត្រូវទេ។', 'vi' => 'Đơn hàng không hợp lệ.'];
            $this->bot->answerCallbackQuery($callbackId, $errs[$lang] ?? $errs['en']);
            return;
        }
        
        $msgs = ['en' => 'Generating receipt...', 'km' => 'កំពុងបង្កើតវិក្កយបត្រ...', 'vi' => 'Đang tạo biên lai...'];
        $this->bot->answerCallbackQuery($callbackId, $msgs[$lang] ?? $msgs['en']);

        $subtotal = (float) ($order->subtotal_amount ?? $order->subtotal ?? 0);
        $charges = (float) ($order->logistics_fee_amount ?? $order->logistics_fee ?? 0) + (float) ($order->service_fee_amount ?? $order->service_fee ?? 0) + (float) ($order->delivery_fee_amount ?? $order->delivery_fee ?? 0);
        $discount = (float) ($order->discount_amount ?? $order->discount ?? 0);
        $items = [];

        foreach ($order->items as $item) {
            $itemArray = $item->toArray();
            $itemArray['order_number'] = $order->order_number;
            $items[] = $itemArray;
        }

        $total = max($subtotal + $charges - $discount, 0);

        $receipt = \App\Models\Receipt::create([
            'receipt_number' => \App\Models\Receipt::generateReceiptNumber(),
            'order_id' => $order->id,
            'user_id' => $customer->id,
            'snapshot_json' => [
                'orders' => [$order->order_number],
                'items' => $items,
            ],
            'subtotal' => $subtotal,
            'charges' => $charges,
            'discount' => $discount,
            'total' => $total,
            'payment_status' => 'paid',
            'generated_by' => $customer->id,
        ]);

        $url = route('public.receipt', $receipt->receipt_number);
        
        $texts = [
            'en' => "✅ *Receipt Generated!*\n\nYour receipt for order {$order->order_number} has been generated successfully.\n\n👉 [Click here to view or print your receipt]({$url})",
            'km' => "✅ *វិក្កយបត្របានបង្កើតដោយជោគជ័យ!*\n\nវិក្កយបត្រសម្រាប់ការបញ្ជាទិញ {$order->order_number} ត្រូវបានបង្កើតរួចរាល់។\n\n👉 [ចុចទីនេះដើម្បីមើល ឬបោះពុម្ពវិក្កយបត្ររបស់អ្នក]({$url})",
            'vi' => "✅ *Đã tạo Biên lai!*\n\nBiên lai cho đơn hàng {$order->order_number} đã được tạo thành công.\n\n👉 [Nhấp vào đây để xem hoặc in biên lai của bạn]({$url})"
        ];
        $text = $texts[$lang] ?? $texts['en'];
        
        $downloadLabels = [
            'en' => '📥 Download PDF',
            'km' => '📥 ទាញយក PDF',
            'vi' => '📥 Tải PDF'
        ];
        $btnDownload = $downloadLabels[$lang] ?? $downloadLabels['en'];

        $backTexts = ['en' => '⬅️ Back to Menu', 'km' => '⬅️ ត្រឡប់ទៅម៉ឺនុយ', 'vi' => '⬅️ Về Menu chính'];
        $btnBack = $backTexts[$lang] ?? $backTexts['en'];

        $markup = [
            'inline_keyboard' => [
                [['text' => $btnDownload, 'callback_data' => "download_receipt_{$receipt->id}", 'style' => 'success']],
                [['text' => $btnBack, 'callback_data' => 'customer_menu', 'style' => 'danger']]
            ]
        ];

        if ($messageId) {
            return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
        }
        return $this->bot->sendMessage($chatId, $text, $markup);
    }
    private function downloadReceiptPdf($chatId, $receiptId, $callbackQueryId)
    {
        $this->bot->answerCallbackQuery($callbackQueryId, "Generating PDF...");

        try {
            $receipt = \App\Models\Receipt::with('user')->find($receiptId);
            if (!$receipt) return;

            $settings = \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray();
            $logoUrl = 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('logo.png')));
            
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::setOptions(['isRemoteEnabled' => true])
                ->loadView('receipt-pdf', compact('receipt', 'settings', 'logoUrl'));
            $pdf->setPaper('A4', 'portrait');

            $filename = "Receipt-{$receipt->receipt_number}.pdf";
            $path = sys_get_temp_dir() . '/' . $filename;
            $pdf->save($path);

            $lang = $receipt->user->language ?? 'en';
            $captions = [
                'en' => "Here is your requested receipt.",
                'km' => "នេះគឺជាវិក្កយបត្រដែលអ្នកបានស្នើសុំ។",
                'vi' => "Đây là biên lai bạn yêu cầu."
            ];
            $caption = $captions[$lang] ?? $captions['en'];

            $success = $this->bot->sendDocument($chatId, $path, $caption);
            if (!$success) {
                throw new \Exception("Failed to send document to Telegram API");
            }
            
            @unlink($path); // Clean up temp file
        } catch (\Exception $e) {
            $this->bot->sendMessage($chatId, "❌ Failed to generate PDF: " . $e->getMessage());
        }
    }
}
