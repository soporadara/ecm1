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
                'name_en'     => 'Taobao',
                'name_km'     => 'Taobao',
                'name_vi'     => 'Taobao',
                'slug'        => 'taobao',
                'brand_color' => '#FF4400',
                'website_url' => 'https://www.taobao.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=taobao.com&sz=128',
                'alt_text'    => 'Taobao logo',
                'open_in_new_tab' => true,
                'android_app_url' => 'taobao://item.taobao.com',
                'ios_app_url'     => 'taobao://item.taobao.com',
                'description' => 'China\'s largest consumer-to-consumer marketplace with hundreds of millions of products.',
                'sort_order'  => 1,
                'domains'     => ['taobao.com', 'item.taobao.com', 'm.taobao.com', 's.taobao.com'],
            ],
            [
                'name'        => 'Alibaba',
                'name_en'     => 'Alibaba',
                'name_km'     => 'Alibaba',
                'name_vi'     => 'Alibaba',
                'slug'        => 'alibaba',
                'brand_color' => '#FF6A00',
                'website_url' => 'https://www.alibaba.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=alibaba.com&sz=128',
                'alt_text'    => 'Alibaba logo',
                'open_in_new_tab' => true,
                'description' => 'Global B2B marketplace connecting buyers with suppliers worldwide.',
                'sort_order'  => 2,
                'domains'     => ['alibaba.com', 'www.alibaba.com'],
            ],
            [
                'name'        => 'Tmall',
                'name_en'     => 'Tmall',
                'name_km'     => 'Tmall',
                'name_vi'     => 'Tmall',
                'slug'        => 'tmall',
                'brand_color' => '#FF0000',
                'website_url' => 'https://www.tmall.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=tmall.com&sz=128',
                'alt_text'    => 'Tmall logo',
                'open_in_new_tab' => true,
                'android_app_url' => 'tmall://detail.tmall.com',
                'ios_app_url'     => 'tmall://detail.tmall.com',
                'description' => 'Alibaba\'s premium business-to-consumer marketplace for brand-name goods.',
                'sort_order'  => 3,
                'domains'     => ['tmall.com', 'detail.tmall.com', 'chaoshi.tmall.com'],
            ],
            [
                'name'        => 'Goofish',
                'name_en'     => 'Goofish',
                'name_km'     => 'Goofish',
                'name_vi'     => 'Goofish',
                'slug'        => 'goofish',
                'brand_color' => '#F8D94E',
                'website_url' => 'https://www.goofish.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=goofish.com&sz=128',
                'alt_text'    => 'Goofish logo',
                'open_in_new_tab' => true,
                'description' => 'Alibaba resale marketplace for secondhand and discounted products.',
                'sort_order'  => 4,
                'domains'     => ['goofish.com', '2.taobao.com', 'idlefish.com'],
            ],
            [
                'name'        => '1688',
                'name_en'     => '1688',
                'name_km'     => '1688',
                'name_vi'     => '1688',
                'slug'        => '1688',
                'brand_color' => '#FF6A00',
                'website_url' => 'https://www.1688.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=1688.com&sz=128',
                'alt_text'    => '1688 logo',
                'open_in_new_tab' => true,
                'description' => 'Alibaba\'s wholesale marketplace for bulk purchasing direct from Chinese manufacturers.',
                'sort_order'  => 5,
                'domains'     => ['1688.com', 'detail.1688.com', 'm.1688.com'],
            ],
            [
                'name'        => 'Pinduoduo',
                'name_en'     => 'Pinduoduo',
                'name_km'     => 'Pinduoduo',
                'name_vi'     => 'Pinduoduo',
                'slug'        => 'pinduoduo',
                'brand_color' => '#E02020',
                'website_url' => 'https://www.pinduoduo.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=pinduoduo.com&sz=128',
                'alt_text'    => 'Pinduoduo logo',
                'open_in_new_tab' => true,
                'description' => 'China\'s fast-growing social commerce platform with competitive group-buying prices.',
                'sort_order'  => 6,
                'domains'     => ['pinduoduo.com', 'mobile.yangkeduo.com', 'yangkeduo.com'],
            ],
            [
                'name'        => 'TikTok Shop',
                'name_en'     => 'TikTok Shop',
                'name_km'     => 'TikTok Shop',
                'name_vi'     => 'TikTok Shop',
                'slug'        => 'tiktok-shop',
                'brand_color' => '#111111',
                'website_url' => 'https://shop.tiktok.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=128',
                'alt_text'    => 'TikTok Shop logo',
                'open_in_new_tab' => true,
                'description' => 'TikTok commerce marketplace for social shopping and creator-led products.',
                'sort_order'  => 7,
                'domains'     => ['shop.tiktok.com', 'tiktok.com'],
            ],
            [
                'name'        => 'JD',
                'name_en'     => 'JD',
                'name_km'     => 'JD',
                'name_vi'     => 'JD',
                'slug'        => 'jd',
                'brand_color' => '#E2231A',
                'website_url' => 'https://www.jd.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=jd.com&sz=128',
                'alt_text'    => 'JD logo',
                'open_in_new_tab' => true,
                'description' => 'Major Chinese marketplace with retail, electronics, and household categories.',
                'sort_order'  => 8,
                'domains'     => ['jd.com', 'www.jd.com', 'item.jd.com'],
            ],
            [
                'name'        => 'AliExpress',
                'name_en'     => 'AliExpress',
                'name_km'     => 'AliExpress',
                'name_vi'     => 'AliExpress',
                'slug'        => 'aliexpress',
                'brand_color' => '#FF4747',
                'website_url' => 'https://www.aliexpress.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=aliexpress.com&sz=128',
                'alt_text'    => 'AliExpress logo',
                'open_in_new_tab' => true,
                'description' => 'Alibaba\'s international retail marketplace offering direct shipping worldwide.',
                'sort_order'  => 9,
                'domains'     => ['aliexpress.com', 'www.aliexpress.com', 'm.aliexpress.com', 'aliexpress.ru'],
            ],
            [
                'name'        => 'Zhuan',
                'name_en'     => 'Zhuan',
                'name_km'     => 'Zhuan',
                'name_vi'     => 'Zhuan',
                'slug'        => 'zhuan',
                'brand_color' => '#F24A32',
                'website_url' => 'https://www.zhuanzhuan.com',
                'icon_source_url' => 'https://www.google.com/s2/favicons?domain=zhuanzhuan.com&sz=128',
                'alt_text'    => 'Zhuan logo',
                'open_in_new_tab' => true,
                'description' => 'Secondhand marketplace for phones, electronics, and consumer goods.',
                'sort_order'  => 10,
                'domains'     => ['zhuanzhuan.com', 'www.zhuanzhuan.com'],
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
