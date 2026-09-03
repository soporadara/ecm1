<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Post;
use App\Models\Page;

class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            '/',
            '/contact',
            '/how-it-works',
            '/shipping-rates',
            '/warehouses',
            '/track',
            '/blog',
            '/login',
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars(url($url), ENT_XML1, 'UTF-8') . '</loc>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>' . ($url === '/' ? '1.0' : '0.8') . '</priority>';
            $xml .= '</url>';
        }

        // Add Blogs
        $blogs = Post::where('is_published', true)->get();
        foreach ($blogs as $blog) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars(url('/blog/' . $blog->slug), ENT_XML1, 'UTF-8') . '</loc>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '</url>';
        }

        // Add Pages
        $pages = Page::where('is_published', true)->where('is_system', false)->get();
        foreach ($pages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars(url('/pages/' . $page->slug), ENT_XML1, 'UTF-8') . '</loc>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return Response::make($xml, 200, [
            'Content-Type' => 'text/xml'
        ]);
    }
}
