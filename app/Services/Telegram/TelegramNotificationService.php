<?php

namespace App\Services\Telegram;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class TelegramNotificationService
{
    protected TelegramBotService $bot;

    public function __construct(TelegramBotService $bot)
    {
        $this->bot = $bot;
    }

    public function sendOrderCreatedAdminNotification(Order $order)
    {
        if (!config('telegram.admin_notifications_enabled')) return;

        $adminChatId = config('telegram.admin_chat_id');
        $admins = [];

        if ($adminChatId) {
            $admins = [(object)['telegram_id' => $adminChatId]];
        } else {
            $admins = User::where('is_admin', true)->whereNotNull('telegram_id')->get();
            if ($admins->isEmpty()) return;
        }

        $text = "🛒 *NEW ORDER*\n\n";
        $text .= "Order: #{$order->order_number}\n";
        $text .= "Time: " . $order->created_at->format('M d, Y H:i') . "\n";
        $text .= "Customer: " . TelegramMessageFormatter::escapeSimple($order->customer_name_snapshot ?? 'Unknown') . "\n";
        $text .= "Total: $" . number_format($order->total_amount, 2) . "\n";

        $markup = [
            'inline_keyboard' => [
                [['text' => '👁️ View Order', 'callback_data' => "view_order_{$order->id}"]]
            ]
        ];

        foreach ($admins as $admin) {
            $this->bot->sendMessage($admin->telegram_id, $text, $markup);
        }
    }

    public function sendOrderStatusAdminNotification(Order $order, string $oldStatus, string $newStatus)
    {
        if (!config('telegram.admin_notifications_enabled')) return;

        $adminChatId = config('telegram.admin_chat_id');
        $admins = [];

        if ($adminChatId) {
            $admins = [(object)['telegram_id' => $adminChatId]];
        } else {
            $admins = User::where('is_admin', true)->whereNotNull('telegram_id')->get();
            if ($admins->isEmpty()) return;
        }

        $text = "🔄 *ORDER STATUS UPDATED*\n\n";
        $text .= "Order: #{$order->order_number}\n";
        $text .= "Customer: " . ($order->user->name ?? 'Unknown') . "\n";
        $text .= "Changed From: " . ucfirst($oldStatus) . "\n";
        $text .= "Changed To: *" . ucfirst($newStatus) . "*\n";

        $markup = [
            'inline_keyboard' => [
                [['text' => '👁️ View Order', 'callback_data' => "view_order_{$order->id}"]]
            ]
        ];

        foreach ($admins as $admin) {
            $this->bot->sendMessage($admin->telegram_id, $text, $markup);
        }
    }

    public function sendOrderStatusCustomerNotification(Order $order, string $oldStatus, string $newStatus)
    {
        if (!config('telegram.customer_notifications_enabled')) return;
        
        $customer = $order->user;
        if (!$customer || !$customer->telegram_id) return;

        $lang = $customer->preferred_language ?? \Illuminate\Support\Facades\Cache::get("tg_lang_{$customer->telegram_id}", 'en');

        $statusLabels = [
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

        $headers = [
            'en' => "📦 *Order Update*",
            'km' => "📦 *ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ*",
            'vi' => "📦 *Cập nhật Đơn hàng*"
        ];

        $totals = [
            'en' => "Total Amount",
            'km' => "ចំនួនសរុប",
            'vi' => "Tổng số tiền"
        ];

        $translatedNewStatus = $statusLabels[$lang][$newStatus] ?? ucfirst(str_replace('_', ' ', $newStatus));
        $header = $headers[$lang] ?? $headers['en'];
        $totalLabel = $totals[$lang] ?? $totals['en'];
        $totalVal = number_format($order->final_total_amount, 2) . " " . ($order->currency_code ?? 'USD');

        $text = "{$header}\n\n";

        if ($oldStatus !== $newStatus) {
            if ($lang === 'km') {
                $text .= "ការបញ្ជាទិញរបស់អ្នក *#{$order->order_number}* ត្រូវបាន *{$translatedNewStatus}*\n\n";
            } elseif ($lang === 'vi') {
                $text .= "Đơn hàng *#{$order->order_number}* của bạn đã *{$translatedNewStatus}*\n\n";
            } else {
                $text .= "Your order *#{$order->order_number}* has been *{$translatedNewStatus}*\n\n";
            }
        } else {
            if ($lang === 'km') {
                $text .= "ការបញ្ជាទិញរបស់អ្នក *#{$order->order_number}* ត្រូវបានធ្វើបច្ចុប្បន្នភាព។\n\n";
            } elseif ($lang === 'vi') {
                $text .= "Đơn hàng *#{$order->order_number}* của bạn đã được cập nhật.\n\n";
            } else {
                $text .= "Your order *#{$order->order_number}* has been updated.\n\n";
            }
        }

        $text .= "{$totalLabel}: *{$totalVal}*\n";
        
        if ($order->tracking_number) {
            $trackingLabels = ['en' => 'Tracking', 'km' => 'លេខតាមដាន', 'vi' => 'Mã theo dõi'];
            $trackingLabel = $trackingLabels[$lang] ?? $trackingLabels['en'];
            $text .= "\n{$trackingLabel}: {$order->tracking_number}";
        }

        $trackBtns = [
            'en' => '📦 Track Order',
            'km' => '📦 តាមដានការបញ្ជាទិញ',
            'vi' => '📦 Theo dõi Đơn hàng'
        ];

        $markup = [
            'inline_keyboard' => [
                [['text' => $trackBtns[$lang] ?? $trackBtns['en'], 'callback_data' => "track_order_{$order->id}"]]
            ]
        ];

        $this->bot->sendMessage($customer->telegram_id, $text, $markup);
    }

    public function sendNewCustomerAdminNotification(User $customer)
    {
        if (!config('telegram.admin_notifications_enabled')) return;

        $adminChatId = config('telegram.admin_chat_id');
        $admins = [];

        if ($adminChatId) {
            $admins = [(object)['telegram_id' => $adminChatId]];
        } else {
            $admins = User::where('is_admin', true)->whereNotNull('telegram_id')->get();
            if ($admins->isEmpty()) return;
        }

        $text = "👤 *NEW CUSTOMER REGISTERED*\n\n";
        $text .= "Name: " . TelegramMessageFormatter::escapeSimple($customer->name) . "\n";
        $text .= "Customer Code: " . TelegramMessageFormatter::escapeSimple($customer->customer_code) . "\n";
        $text .= "Email: " . TelegramMessageFormatter::escapeSimple($customer->email ?? 'N/A') . "\n";
        $text .= "Phone: " . TelegramMessageFormatter::escapeSimple($customer->phone_e164 ?? 'N/A') . "\n";
        $text .= "Time: " . $customer->created_at->format('M d, Y H:i') . "\n";

        foreach ($admins as $admin) {
            $this->bot->sendMessage($admin->telegram_id, $text);
        }
    }
}
