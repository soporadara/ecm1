<?php

namespace App\Services\Telegram;

use App\Models\Order;
use App\Models\User;

class TelegramAdminService
{
    protected TelegramBotService $bot;

    public function __construct(TelegramBotService $bot)
    {
        $this->bot = $bot;
    }

    public function handleCommand(string $command, User $admin, $chatId)
    {
        if (!$admin->is_admin) {
            return $this->bot->sendMessage($chatId, "❌ Unauthorized.");
        }

        switch ($command) {
            case '/admin':
            case '/start':
                return $this->sendAdminMenu($chatId);
            default:
                return $this->bot->sendMessage($chatId, "Unrecognized command. Use /admin to open the menu.");
        }
    }

    public function handleCallback(string $data, User $admin, $chatId, $messageId, $callbackQueryId)
    {
        if (!$admin->is_admin) {
            return $this->bot->answerCallbackQuery($callbackQueryId, "Unauthorized.");
        }

        if ($data === 'admin_menu') {
            $this->bot->answerCallbackQuery($callbackQueryId);
            return $this->sendAdminMenu($chatId, $messageId);
        }

        if ($data === 'admin_orders_draft') {
            return $this->showOrdersList($chatId, $messageId, 'draft', $callbackQueryId);
        }

        if ($data === 'admin_orders_in_progress') {
            return $this->showOrdersList($chatId, $messageId, 'in_progress', $callbackQueryId);
        }

        if (str_starts_with($data, 'view_order_')) {
            $orderId = str_replace('view_order_', '', $data);
            return $this->viewOrder($chatId, $messageId, $orderId, $callbackQueryId, $admin);
        }

        if (str_starts_with($data, 'view_user_')) {
            $userId = str_replace('view_user_', '', $data);
            return $this->viewUser($chatId, $messageId, $userId, $callbackQueryId, $admin);
        }

        if (str_starts_with($data, 'pdf_order_')) {
            $orderId = str_replace('pdf_order_', '', $data);
            return $this->exportOrderPdf($chatId, $orderId, $callbackQueryId, $admin);
        }

        $this->bot->answerCallbackQuery($callbackQueryId);
    }

    public function handleTextMessage(string $text, User $admin, $chatId)
    {
        // Check if there's an active search state
        $stateKey = 'tg_admin_state_' . $chatId;
        
        // If the user clicks a menu button while in a state, clear the state and handle it as a menu command
        if (
            str_contains($text, 'New Orders') || str_contains($text, '🆕') ||
            str_contains($text, 'In Progress') || str_contains($text, '📦') ||
            str_contains($text, 'Search Order') || str_contains($text, '🔎') ||
            str_contains($text, 'Search Users') || str_contains($text, '👥') ||
            str_contains($text, 'Dashboard Stats') || str_contains($text, '📊') ||
            str_contains($text, 'Settings') || str_contains($text, '⚙️')
        ) {
            \Illuminate\Support\Facades\Cache::forget($stateKey);
            $state = null;
        } else {
            $state = \Illuminate\Support\Facades\Cache::get($stateKey);
        }

        if ($state === 'search_order') {
            \Illuminate\Support\Facades\Cache::forget($stateKey);
            $orderNumber = trim($text);
            $orderNumber = strtoupper($orderNumber);
            if (!str_starts_with($orderNumber, 'ORD-')) {
                $orderNumber = 'ORD-' . $orderNumber;
            }
            
            $order = Order::where('order_number', $orderNumber)->first();
            
            if (!$order) {
                return $this->bot->sendMessage($chatId, "Not correct order number.");
            }
            
            return $this->viewOrder($chatId, null, $order->id, null, $admin);
        }

        if ($state === 'search_user') {
            \Illuminate\Support\Facades\Cache::forget($stateKey);
            $query = trim($text);
            
            $customerCodeQuery = strtoupper($query);
            if (!str_starts_with($customerCodeQuery, 'MVM-')) {
                if (is_numeric($query)) {
                    $customerCodeQuery = 'MVM-' . str_pad($query, 3, '0', STR_PAD_LEFT);
                } else {
                    $customerCodeQuery = 'MVM-' . $customerCodeQuery;
                }
            }

            // Search users by name, email, phone, or customer_code
            $users = User::where('is_admin', false)
                ->where(function($q) use ($query, $customerCodeQuery) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('email', 'like', "%{$query}%")
                      ->orWhere('phone_e164', 'like', "%{$query}%")
                      ->orWhere('customer_code', 'like', "%{$customerCodeQuery}%")
                      ->orWhere('customer_code', 'like', "%{$query}%");
                })
                ->limit(5)
                ->get();
            
            if ($users->isEmpty()) {
                return $this->bot->sendMessage($chatId, "No users found matching '{$query}'.");
            }
            
            $msg = "👥 *Search Results:*\nSelect a user to view details:";
            $markup = ['inline_keyboard' => []];
            
            foreach ($users as $u) {
                $displayName = TelegramMessageFormatter::escapeSimple($u->name);
                $code = $u->customer_code ?? 'N/A';
                $markup['inline_keyboard'][] = [
                    ['text' => "{$displayName} ({$code})", 'callback_data' => "view_user_{$u->id}"]
                ];
            }
            $markup['inline_keyboard'][] = [['text' => '🔵 Cancel', 'callback_data' => 'admin_menu']];
            
            return $this->bot->sendMessage($chatId, $msg, $markup);
        }

        if (str_contains($text, 'New Orders') || str_contains($text, '🆕')) {
            return $this->showOrdersList($chatId, null, 'draft', null);
        }
        
        if (str_contains($text, 'In Progress') || str_contains($text, '📦')) {
            return $this->showOrdersList($chatId, null, 'in_progress', null);
        }
        
        if (str_contains($text, 'Search Order') || str_contains($text, '🔎')) {
            \Illuminate\Support\Facades\Cache::put($stateKey, 'search_order', now()->addMinutes(10));
            return $this->bot->sendMessage($chatId, "Please type the order number (e.g. 001).");
        }
        
        if (str_contains($text, 'Search Users') || str_contains($text, '👥')) {
            \Illuminate\Support\Facades\Cache::put($stateKey, 'search_user', now()->addMinutes(10));
            return $this->bot->sendMessage($chatId, "Please type a name, email, phone number, or Customer ID (e.g. MVM-001) to search.");
        }
        
        if (str_contains($text, 'Dashboard Stats') || str_contains($text, '📊')) {
            return $this->showDashboardStats($chatId);
        }
        
        if (str_contains($text, 'Settings') || str_contains($text, '⚙️')) {
            return $this->bot->sendMessage($chatId, "🔧 Admin Settings:\n\nTo manage users, products, or advanced configurations, please visit the [CMS Dashboard](" . url('/admin') . ").", ['parse_mode' => 'Markdown']);
        }

        return $this->bot->sendMessage($chatId, "Unrecognized option. Please use the menu below.");
    }

    private function sendAdminMenu($chatId, $messageId = null)
    {
        $text = "👑 *Admin Dashboard*\n\nPlease select an option below:";
        $markup = [
            'keyboard' => [
                [
                    ['text' => '🆕 New Orders', 'style' => 'primary'],
                    ['text' => '📦 In Progress', 'style' => 'primary'],
                ],
                [
                    ['text' => '🔎 Search Order', 'style' => 'primary'],
                    ['text' => '👥 Search Users', 'style' => 'primary'],
                ],
                [
                    ['text' => '📊 Dashboard Stats', 'style' => 'primary'],
                    ['text' => '⚙️ Settings', 'style' => 'primary'],
                ]
            ],
            'resize_keyboard' => true,
            'is_persistent' => true,
        ];

        if ($messageId) {
            // Delete the old inline message to keep chat clean when switching to reply keyboard
            $this->bot->deleteMessage($chatId, $messageId);
        }
        
        $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function showOrdersList($chatId, $messageId, $status, $callbackId = null)
    {
        if ($callbackId) {
            $this->bot->answerCallbackQuery($callbackId);
        }
        $orders = Order::where('status', $status)->orderBy('created_at', 'desc')->limit(5)->get();

        if ($orders->isEmpty()) {
            $text = "No orders found for status: " . ucfirst($status) . ".";
            $markup = [
                'inline_keyboard' => [
                    [['text' => '🔵 Back to Menu', 'callback_data' => 'admin_menu']]
                ]
            ];
            if ($messageId) {
                return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
            }
            return $this->bot->sendMessage($chatId, $text, $markup);
        }

        $text = "📦 *Orders (" . ucfirst($status) . ")*\nSelect an order to view:";
        $markup = ['inline_keyboard' => []];

        foreach ($orders as $order) {
            $markup['inline_keyboard'][] = [
                ['text' => "{$order->order_number} - $" . number_format($order->total_amount, 2), 'callback_data' => "view_order_{$order->id}"]
            ];
        }

        $markup['inline_keyboard'][] = [['text' => '🔵 Back to Menu', 'callback_data' => 'admin_menu']];

        if ($messageId) {
            return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
        }
        return $this->bot->sendMessage($chatId, $text, $markup);
    }

    private function viewOrder($chatId, $messageId, $orderId, $callbackId, User $admin)
    {
        $this->bot->answerCallbackQuery($callbackId);
        $order = Order::with(['user', 'items.images', 'items.urls'])->find($orderId);

        if (!$order) {
            return $this->bot->editMessageText($chatId, $messageId, "Order not found.");
        }

        $itemsText = "";
        foreach ($order->items as $item) {
            $safeName = TelegramMessageFormatter::escapeSimple($item->product_name);
            $itemsText .= "- {$safeName} (x{$item->quantity})\n";
            
            if ($item->urls && $item->urls->count() > 0) {
                foreach ($item->urls as $url) {
                    $itemsText .= "  🔗 [Link]({$url->url})\n";
                }
            }

            if ($item->images && $item->images->count() > 0) {
                foreach ($item->images as $img) {
                    $imgUrl = rtrim(config('app.url'), '/') . '/storage/' . $img->image_path;
                    $itemsText .= "  🖼️ [Image]({$imgUrl})\n";
                }
            }
        }

        $safeStatus = TelegramMessageFormatter::escapeSimple(ucfirst($order->status));

        $text = "🛒 *Order {$order->order_number}*\n\n";
        $text .= "👤 *Customer:* " . TelegramMessageFormatter::escapeSimple($order->user->name ?? $order->customer_name_snapshot ?? 'Unknown') . "\n";
        $text .= "💰 *Total:* $" . number_format($order->total_amount, 2) . "\n";
        $text .= "📊 *Status:* {$safeStatus}\n\n";
        $text .= "*Items:*\n{$itemsText}";

        $markup = [
            'inline_keyboard' => [
                [['text' => '📗 Generate PDF Receipt', 'callback_data' => "pdf_order_{$order->id}"]],
                [['text' => '🔵 Back', 'callback_data' => "admin_orders_{$order->status}"]]
            ]
        ];

        return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
    }

    private function exportOrderPdf($chatId, $orderId, $callbackId, User $admin)
    {
        $this->bot->answerCallbackQuery($callbackId, "Generating PDF Receipt...");
        
        $order = Order::with(['user', 'items', 'receipts'])->find($orderId);
        if (!$order) return;

        try {
            $receipt = $order->receipts->first();
            
            if (!$receipt) {
                // Generate receipt like customer bot does
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
                    'user_id' => $order->user_id ?? $admin->id,
                    'snapshot_json' => [
                        'orders' => [$order->order_number],
                        'items' => $items,
                    ],
                    'subtotal' => $subtotal,
                    'charges' => $charges,
                    'discount' => $discount,
                    'total' => $total,
                    'payment_status' => 'paid',
                    'generated_by' => $admin->id,
                ]);
            }

            $settings = \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray();
            $logoUrl = 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('logo.png')));
            
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::setOptions(['isRemoteEnabled' => true])
                ->loadView('receipt-pdf', compact('receipt', 'settings', 'logoUrl'));
            $pdf->setPaper('A4', 'portrait');

            $filename = "Receipt-{$receipt->receipt_number}.pdf";
            $path = sys_get_temp_dir() . '/' . $filename;
            $pdf->save($path);

            $caption = "🧾 Here is the receipt PDF for order {$order->order_number}.";
            
            $success = $this->bot->sendDocument($chatId, $path, $caption);
            if (!$success) {
                throw new \Exception("Failed to send document to Telegram API");
            }
            
            @unlink($path); // Clean up temp file
        } catch (\Exception $e) {
            $this->bot->sendMessage($chatId, "❌ Failed to generate PDF: " . $e->getMessage());
        }
    }

    private function viewUser($chatId, $messageId, $userId, $callbackId, User $admin)
    {
        $this->bot->answerCallbackQuery($callbackId);
        $user = User::find($userId);
        
        if (!$user) {
            return $this->bot->editMessageText($chatId, $messageId, "User not found.");
        }
        
        $orderCount = Order::where('user_id', $user->id)->count();
        
        $text = "👤 *Customer Details*\n\n";
        $text .= "🆔 *ID:* " . ($user->customer_code ?? 'N/A') . "\n";
        $text .= "📛 *Name:* " . TelegramMessageFormatter::escapeSimple($user->name) . "\n";
        $text .= "📧 *Email:* " . TelegramMessageFormatter::escapeSimple($user->email) . "\n";
        $text .= "📱 *Phone:* " . ($user->phone_e164 ?? 'N/A') . "\n";
        $text .= "📊 *Status:* " . ucfirst($user->account_status ?? 'Active') . "\n";
        $text .= "📦 *Total Orders:* {$orderCount}\n";
        
        $markup = [
            'inline_keyboard' => [
                [['text' => '🔵 Back to Menu', 'callback_data' => "admin_menu"]]
            ]
        ];
        
        return $this->bot->editMessageText($chatId, $messageId, $text, $markup);
    }

    private function showDashboardStats($chatId)
    {
        $today = now()->startOfDay();
        
        $newOrdersToday = Order::where('created_at', '>=', $today)->count();
        $pendingOrders = Order::where('status', 'draft')->count();
        $inProgressOrders = Order::where('status', 'in_progress')->count();
        $totalUsers = User::where('is_admin', false)->count();
        
        $text = "📊 *Dashboard Statistics*\n\n";
        $text .= "📈 *Orders Today:* {$newOrdersToday}\n";
        $text .= "🆕 *Pending (Draft):* {$pendingOrders}\n";
        $text .= "📦 *In Progress:* {$inProgressOrders}\n";
        $text .= "👥 *Total Customers:* {$totalUsers}\n\n";
        $text .= "For detailed reporting, please visit the CMS.";
        
        return $this->bot->sendMessage($chatId, $text);
    }

    public function notifyAdmins(string $message)
    {
        $admins = User::where('is_admin', true)->whereNotNull('telegram_id')->get();
        foreach ($admins as $admin) {
            try {
                $this->bot->sendMessage($admin->telegram_id, $message);
            } catch (\Exception $e) {
                // Ignore failure for one admin
            }
        }
    }
}
