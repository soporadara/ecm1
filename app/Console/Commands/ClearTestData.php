<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ManualOrder;
use App\Models\ManualOrderItem;
use App\Models\UserAddress;
use App\Models\Cart;
use App\Models\CartItem;

class ClearTestData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'system:clear-test-data {--force : Force the operation to run without prompting}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clears all test customers and their related transaction data to start from 0.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (! $this->option('force') && ! $this->confirm('This will DELETE all non-admin users and TRUNCATE all order data. Are you sure you want to continue?')) {
            $this->info('Operation cancelled.');
            return;
        }

        $this->info('Disabling foreign key constraints...');
        Schema::disableForeignKeyConstraints();

        $this->info('Deleting customers...');
        $deletedUsers = User::where('is_admin', false)->delete();
        $this->line("Deleted {$deletedUsers} customer(s).");

        $this->info('Truncating transaction tables...');
        Order::truncate();
        OrderItem::truncate();
        ManualOrder::truncate();
        ManualOrderItem::truncate();
        UserAddress::truncate();
        Cart::truncate();
        CartItem::truncate();
        $this->line('Transaction tables truncated successfully.');

        $this->info('Enabling foreign key constraints...');
        Schema::enableForeignKeyConstraints();

        $this->info('All test customers and related data have been successfully cleared! The next customer will start from MVM-000.');
    }
}
