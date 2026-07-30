<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class AdminSystemNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $message;
    public $type;
    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $message, string $type = 'info', ?string $url = null)
    {
        $this->message = $message;
        $this->type = $type;
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification for the database.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'message' => $this->message,
            'type' => $this->type,
            'url' => $this->url,
        ];
    }

    /**
     * Get the broadcast representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->message,
            'type' => $this->type,
            'url' => $this->url,
        ]);
    }

    public function broadcastOn()
    {
        return new \Illuminate\Broadcasting\Channel('admin-notifications');
    }

    public function broadcastAs()
    {
        return 'AdminSystemNotification';
    }
}
