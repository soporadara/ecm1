<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\Telegram\TelegramNotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendTelegramStatusNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $oldStatus;
    protected $newStatus;

    /**
     * Create a new job instance.
     */
    public function __construct(Order $order, string $oldStatus, string $newStatus)
    {
        $this->order = $order;
        $this->oldStatus = $oldStatus;
        $this->newStatus = $newStatus;
    }

    /**
     * Execute the job.
     */
    public function handle(TelegramNotificationService $telegramService): void
    {
        // Notify Customer
        $telegramService->sendOrderStatusCustomerNotification($this->order, $this->oldStatus, $this->newStatus);
        
        // Notify Admins
        $telegramService->sendOrderStatusAdminNotification($this->order, $this->oldStatus, $this->newStatus);
    }
}
