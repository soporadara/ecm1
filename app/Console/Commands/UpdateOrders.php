<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;

class UpdateOrders extends Command
{
    protected $signature = 'orders:update-ids';
    protected $description = 'Update existing order IDs to the new format';

    public function handle()
    {
        $orders = Order::withTrashed()->orderBy('id')->get();
        $count = 0;
        $updated = 0;

        foreach ($orders as $order) {
            $letterIndex = (int) floor($count / 999);
            $letters = '';
            $num = $letterIndex;
            while ($num >= 0) {
                $letters = chr(65 + ($num % 26)) . $letters;
                $num = (int) floor($num / 26) - 1;
            }
            
            $number = ($count % 999) + 1;
            $code = 'ORD-' . $letters . str_pad((string) $number, 3, '0', STR_PAD_LEFT);
            
            if ($order->order_number !== $code) {
                $order->order_number = $code;
                $order->save();
                $updated++;
                $this->info("Updated Order ID {$order->id} to {$code}");
            }
            $count++;
        }
        $this->info("Finished checking {$count} orders. Updated {$updated} orders.");
    }
}
