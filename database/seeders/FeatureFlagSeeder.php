<?php

namespace Database\Seeders;

use App\Models\FeatureFlag;
use Illuminate\Database\Seeder;

class FeatureFlagSeeder extends Seeder
{
    public function run(): void
    {
        $flags = [
            // Storefront flags — disabled by default (logistics platform mode)
            [
                'name'  => 'storefront_products_enabled',
                'label' => 'Storefront Products',
                'description' => 'Show product catalogue on the public website.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_product_search_enabled',
                'label' => 'Storefront Product Search',
                'description' => 'Show product search bar on the public website.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_categories_enabled',
                'label' => 'Storefront Categories',
                'description' => 'Show product categories on the public website.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_brands_enabled',
                'label' => 'Storefront Brands',
                'description' => 'Show brands on the public website.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_collections_enabled',
                'label' => 'Storefront Collections',
                'description' => 'Show collections on the public website.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_cart_enabled',
                'label' => 'Storefront Cart',
                'description' => 'Allow customers to use the normal shopping cart.',
                'group' => 'storefront',
                'value' => false,
            ],
            [
                'name'  => 'storefront_checkout_enabled',
                'label' => 'Storefront Checkout',
                'description' => 'Allow customers to use the normal checkout.',
                'group' => 'storefront',
                'value' => false,
            ],

            // Logistics flags — enabled by default
            [
                'name'  => 'external_purchase_enabled',
                'label' => 'External Purchase (Purchase for Me)',
                'description' => 'Allow customers to submit purchase requests using marketplace product links.',
                'group' => 'logistics',
                'value' => true,
            ],
            [
                'name'  => 'manual_order_enabled',
                'label' => 'Manual Orders',
                'description' => 'Allow customers to submit manual order requests without a product link.',
                'group' => 'logistics',
                'value' => true,
            ],
            [
                'name'  => 'ship_for_me_enabled',
                'label' => 'Ship for Me',
                'description' => 'Allow customers to register expected parcels and use our warehouse address.',
                'group' => 'logistics',
                'value' => true,
            ],
            [
                'name'  => 'wallet_enabled',
                'label' => 'Customer Wallet',
                'description' => 'Enable the customer wallet and ledger system.',
                'group' => 'payments',
                'value' => true,
            ],
            [
                'name'  => 'parcel_forwarding_enabled',
                'label' => 'Parcel Forwarding',
                'description' => 'Allow parcel forwarding from our warehouses.',
                'group' => 'logistics',
                'value' => true,
            ],
            [
                'name'  => 'parcel_consolidation_enabled',
                'label' => 'Parcel Consolidation',
                'description' => 'Allow customers to consolidate multiple parcels into one shipment.',
                'group' => 'logistics',
                'value' => true,
            ],
            [
                'name'  => 'marketplace_import_enabled',
                'label' => 'Marketplace Product Import',
                'description' => 'Enable background import of product data from marketplace URLs.',
                'group' => 'logistics',
                'value' => true,
            ],
        ];

        foreach ($flags as $flag) {
            FeatureFlag::updateOrCreate(
                ['name' => $flag['name']],
                $flag
            );
        }
    }
}
