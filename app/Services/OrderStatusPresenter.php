<?php

namespace App\Services;

use App\Models\Order;

class OrderStatusPresenter
{
    public function decorate(Order $order): array
    {
        return $this->augmentArray($order->toArray());
    }

    public function augmentArray(array $order): array
    {
        $status = $this->customerStatus($order['status'] ?? null);

        return [
            ...$order,
            'customer_status' => $status['code'],
            'customer_status_label' => $status['label'],
            'customer_status_tone' => $status['tone'],
            'payment_status_label' => $this->paymentStatusLabel($order['payment_status'] ?? null),
            'purchase_readiness_label' => $this->purchaseReadinessLabel($order['purchase_readiness'] ?? null),
        ];
    }

    public function customerStatus(?string $internalStatus): array
    {
        return match ($internalStatus) {
            'draft' => ['code' => 'draft', 'label' => 'Draft', 'tone' => 'gray'],
            'delivered', 'completed' => ['code' => 'delivered', 'label' => 'Delivered', 'tone' => 'green'],
            default => ['code' => 'in_progress', 'label' => 'Progress', 'tone' => 'blue'],
        };
    }

    public function paymentStatusLabel(?string $paymentStatus): string
    {
        return match ($paymentStatus) {
            'paid' => 'Paid',
            default => 'Unpaid',
        };
    }

    public function purchaseReadinessLabel(?string $purchaseReadiness): string
    {
        return match ($purchaseReadiness) {
            'ready' => 'Ready to Purchase',
            'purchased' => 'Purchased',
            default => 'Not Ready',
        };
    }
}
