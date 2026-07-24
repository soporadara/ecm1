<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach ([
            'users',
            'orders',
            'order_items',
            'order_item_urls',
            'order_images',
            'order_attachments',
            'order_status_histories',
            'order_messages',
            'receipts',
            'contact_messages',
            'banners',
            'popups',
            'media',
        ] as $tableName) {
            if (!Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (!Schema::hasColumn($tableName, 'is_demo')) {
                    $table->boolean('is_demo')->default(false)->index();
                }
                if (!Schema::hasColumn($tableName, 'demo_batch_id')) {
                    $table->string('demo_batch_id')->nullable()->index();
                }
            });
        }

        if (Schema::hasTable('banners')) {
            Schema::table('banners', function (Blueprint $table) {
                if (!Schema::hasColumn('banners', 'header_theme')) {
                    $table->string('header_theme')->default('dark')->after('theme_variant');
                }
            });
        }
    }

    public function down(): void
    {
        foreach ([
            'users',
            'orders',
            'order_items',
            'order_item_urls',
            'order_images',
            'order_attachments',
            'order_status_histories',
            'order_messages',
            'receipts',
            'contact_messages',
            'banners',
            'popups',
            'media',
        ] as $tableName) {
            if (!Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                $drop = array_values(array_filter(['is_demo', 'demo_batch_id'], fn ($column) => Schema::hasColumn($tableName, $column)));
                if ($drop !== []) {
                    $table->dropColumn($drop);
                }
            });
        }

        if (Schema::hasTable('banners') && Schema::hasColumn('banners', 'header_theme')) {
            Schema::table('banners', fn (Blueprint $table) => $table->dropColumn('header_theme'));
        }
    }
};
