<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class DemoResetCommand extends Command
{
    protected $signature = 'demo:reset';

    protected $description = 'Remove development-only demo records without deleting real application data.';

    private string $batchId = 'manual-order-demo-v1';

    public function handle(): int
    {
        if (app()->environment('production')) {
            $this->error('Production rejected. Demo reset is development-only.');
            return self::FAILURE;
        }

        DB::transaction(function () {
            foreach ([
                'order_item_urls',
                'order_images',
                'order_attachments',
                'order_status_histories',
                'order_messages',
                'receipts',
                'order_items',
                'orders',
                'contact_messages',
                'banners',
                'popups',
                'media',
                'users',
            ] as $table) {
                $this->deleteDemoRows($table);
            }
        });

        Storage::disk('public')->deleteDirectory('demo-order-images');
        Storage::disk('public')->deleteDirectory('demo-banners');
        Storage::disk('local')->deleteDirectory('demo-attachments');

        $this->info('Demo records reset safely.');

        return self::SUCCESS;
    }

    private function deleteDemoRows(string $table): void
    {
        if (!Schema::hasTable($table)) {
            return;
        }

        $query = DB::table($table);

        if (Schema::hasColumn($table, 'demo_batch_id')) {
            $query->where('demo_batch_id', $this->batchId);
        } elseif (Schema::hasColumn($table, 'is_demo')) {
            $query->where('is_demo', true);
        } else {
            return;
        }

        $query->delete();
    }
}
