<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\OrderImage;
use App\Services\Telegram\TelegramBotService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class SendTelegramImageNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $imagePath;
    protected $caption;

    /**
     * Create a new job instance.
     */
    public function __construct(Order $order, string $imagePath, string $caption = 'New logistics image attached.')
    {
        $this->order = $order;
        $this->imagePath = $imagePath;
        $this->caption = $caption;
    }

    /**
     * Execute the job.
     */
    public function handle(TelegramBotService $bot): void
    {
        if (!config('telegram.customer_notifications_enabled')) return;

        $customer = $this->order->user;
        if (!$customer || !$customer->telegram_id) return;

        // Ensure the file exists
        $absolutePath = Storage::disk('public')->path($this->imagePath);
        if (!file_exists($absolutePath)) return;

        $captionText = "📸 *Logistics Update*\n\n";
        $captionText .= "Order: #{$this->order->order_number}\n\n";
        $captionText .= $this->caption;

        $markup = [
            'inline_keyboard' => [
                [['text' => '📦 Track Order', 'callback_data' => "track_order_{$this->order->id}"]]
            ]
        ];

        $bot->sendDocument($customer->telegram_id, $absolutePath, $captionText, $markup);
    }
}
