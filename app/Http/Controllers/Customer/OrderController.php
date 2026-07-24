<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\OrderAttachment;
use App\Models\Order;
use App\Services\OrderStatusPresenter;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(OrderStatusPresenter $presenter)
    {
        $orders = Order::where('user_id', auth()->id())
            ->withCount('items')
            ->withSum('items', 'quantity')
            ->latest()
            ->paginate(15)
            ->through(fn (Order $order) => $presenter->decorate($order));

        return Inertia::render('Customer/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order, OrderStatusPresenter $presenter)
    {
        abort_unless($order->user_id === auth()->id(), 403);

        $order->load([
            'items.urls',
            'items.images',
            'items.attachments',
            'images',
            'attachments',
            'receipts',
            'statusHistories' => fn ($query) => $query->oldest(),
        ]);

        $orderData = $presenter->augmentArray($order->toArray());
        $orderData['status_histories'] = collect($orderData['status_histories'] ?? [])->map(function (array $history) use ($presenter) {
            $status = $presenter->customerStatus($history['to_status'] ?? null);

            return [
                ...$history,
                'customer_status_label' => $status['label'],
            ];
        })->values();
        $orderData['images'] = $order->images->map(fn ($image) => [
            ...$image->toArray(),
            'url' => Storage::disk($image->disk ?? 'public')->url($image->path),
            'thumbnail_url' => $image->thumbnail_path
                ? Storage::disk($image->disk ?? 'public')->url($image->thumbnail_path)
                : null,
        ])->values();
        $orderData['attachments'] = $order->attachments->map(fn ($attachment) => [
            ...$attachment->toArray(),
            'download_url' => route('attachments.download', $attachment),
        ])->values();
        $orderData['items'] = $order->items->map(function ($item) {
            $itemData = $item->toArray();
            $itemData['images'] = $item->images->map(fn ($image) => [
                ...$image->toArray(),
                'url' => Storage::disk($image->disk ?? 'public')->url($image->path),
                'thumbnail_url' => $image->thumbnail_path
                    ? Storage::disk($image->disk ?? 'public')->url($image->thumbnail_path)
                    : null,
            ])->values();
            $itemData['attachments'] = $item->attachments->map(fn ($attachment) => [
                ...$attachment->toArray(),
                'download_url' => route('attachments.download', $attachment),
            ])->values();

            return $itemData;
        })->values();

        return Inertia::render('Customer/Orders/Show', [
            'order' => $orderData,
        ]);
    }

    public function track()
    {
        return $this->index();
    }

    public function downloadAttachment(OrderAttachment $attachment)
    {
        abort_unless($attachment->order?->user_id === auth()->id() || auth()->user()?->can('orders.view'), 403);

        return Storage::disk($attachment->disk)->download($attachment->path, $attachment->original_filename);
    }
}
