<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderSubmitted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $orderId;
    public $orderNumber;
    public $customerName;
    public $totalAmount;

    /**
     * Create a new event instance.
     */
    public function __construct($orderId, $orderNumber, $customerName, $totalAmount)
    {
        $this->orderId = $orderId;
        $this->orderNumber = $orderNumber;
        $this->customerName = $customerName;
        $this->totalAmount = $totalAmount;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('admin.notifications');
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'order_id' => $this->orderId,
            'order_number' => $this->orderNumber,
            'customer_name' => $this->customerName,
            'total_amount' => $this->totalAmount,
            'message' => 'New manual order ' . $this->orderNumber . ' from ' . $this->customerName,
        ];
    }
}
