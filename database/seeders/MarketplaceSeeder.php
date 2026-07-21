<?php

namespace Database\Seeders;

use App\Models\Marketplace;
use App\Models\MarketplaceDomain;
use Illuminate\Database\Seeder;

class MarketplaceSeeder extends Seeder
{
    public function run(): void
    {
        $marketplaces = [
            [
                'name'        => 'Taobao',
                'slug'        => 'taobao',
                'brand_color' => '#FF4400',
                'website_url' => 'https://www.taobao.com',
                'android_app_url' => 'taobao://item.taobao.com',
                'ios_app_url'     => 'taobao://item.taobao.com',
                'description' => 'China\'s largest consumer-to-consumer marketplace with hundreds of millions of products.',
                'sort_order'  => 1,
                'domains'     => ['taobao.com', 'item.taobao.com', 'm.taobao.com', 's.taobao.com'],
            ],
            [
                'name'        => 'Tmall',
                'slug'        => 'tmall',
                'brand_color' => '#FF0000',
                'website_url' => 'https://www.tmall.com',
                'android_app_url' => 'tmall://detail.tmall.com',
                'ios_app_url'     => 'tmall://detail.tmall.com',
                'description' => 'Alibaba\'s premium business-to-consumer marketplace for brand-name goods.',
                'sort_order'  => 2,
                'domains'     => ['tmall.com', 'detail.tmall.com', 'chaoshi.tmall.com'],
            ],
            [
                'name'        => '1688',
                'slug'        => '1688',
                'brand_color' => '#FF6A00',
                'website_url' => 'https://www.1688.com',
                'description' => 'Alibaba\'s wholesale marketplace for bulk purchasing direct from Chinese manufacturers.',
                'sort_order'  => 3,
                'domains'     => ['1688.com', 'detail.1688.com', 'm.1688.com'],
            ],
            [
                'name'        => 'Alibaba',
                'slug'        => 'alibaba',
                'brand_color' => '#FF6A00',
                'website_url' => 'https://www.alibaba.com',
                'description' => 'Global B2B marketplace connecting buyers with suppliers worldwide.',
                'sort_order'  => 4,
                'domains'     => ['alibaba.com', 'www.alibaba.com'],
            ],
            [
                'name'        => 'Pinduoduo',
                'slug'        => 'pinduoduo',
                'brand_color' => '#E02020',
                'website_url' => 'https://www.pinduoduo.com',
                'description' => 'China\'s fast-growing social commerce platform with competitive group-buying prices.',
                'sort_order'  => 5,
                'domains'     => ['pinduoduo.com', 'mobile.yangkeduo.com', 'yangkeduo.com'],
            ],
            [
                'name'        => 'AliExpress',
                'slug'        => 'aliexpress',
                'brand_color' => '#FF4747',
                'website_url' => 'https://www.aliexpress.com',
                'description' => 'Alibaba\'s international retail marketplace offering direct shipping worldwide.',
                'sort_order'  => 6,
                'domains'     => ['aliexpress.com', 'www.aliexpress.com', 'm.aliexpress.com', 'aliexpress.ru'],
            ],
        ];

        foreach ($marketplaces as $data) {
            $domains = $data['domains'];
            unset($data['domains']);

            $marketplace = Marketplace::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );

            foreach ($domains as $domain) {
                MarketplaceDomain::updateOrCreate(
                    ['domain' => $domain],
                    ['marketplace_id' => $marketplace->id]
                );
            }
        }
    }
}
