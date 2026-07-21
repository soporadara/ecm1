<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PageController extends Controller
{
    private function sanitizeHtml($html)
    {
        if (empty($html)) return $html;
        
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        // Ensure UTF-8 is loaded correctly
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();

        $xpath = new \DOMXPath($dom);
        
        // Remove all script, iframe, object, embed, applet tags
        $nodes = $xpath->query('//script | //iframe | //object | //embed | //applet');
        foreach ($nodes as $node) {
            $node->parentNode->removeChild($node);
        }

        // Remove dangerous attributes and javascript: URLs
        $nodes = $xpath->query('//*');
        foreach ($nodes as $node) {
            $attributes = [];
            foreach ($node->attributes as $attr) {
                $attributes[] = $attr;
            }
            foreach ($attributes as $attr) {
                // Remove on* event handlers
                if (stripos($attr->name, 'on') === 0) {
                    $node->removeAttribute($attr->name);
                }
                // Remove javascript: hrefs
                if ($attr->name === 'href' || $attr->name === 'src') {
                    if (preg_match('/^\s*javascript:/i', $attr->value)) {
                        $node->removeAttribute($attr->name);
                    }
                }
            }
        }

        $cleanHtml = $dom->saveHTML();
        // Remove the xml tag we prepended
        $cleanHtml = str_replace('<?xml encoding="utf-8" ?>', '', $cleanHtml);
        return trim($cleanHtml);
    }

    public function index()
    {
        $pages = Page::latest()->paginate(15);
        
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:pages',
            'content' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'banner_image' => 'nullable',
            'is_published' => 'boolean',
            'is_private' => 'boolean'
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if (isset($validated['content'])) {
            $validated['content'] = $this->sanitizeHtml($validated['content']);
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('pages', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => $page->is_system ? 'nullable|string|max:255' : 'nullable|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'banner_image' => 'nullable',
            'is_published' => 'boolean',
            'is_private' => 'boolean'
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        if ($page->is_system) {
            unset($validated['slug']); // Never change the slug of a system page
        }

        if (isset($validated['content'])) {
            $validated['content'] = $this->sanitizeHtml($validated['content']);
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('pages', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        if (!$page->is_deletable) {
            return redirect()->route('admin.pages.index')->with('error', 'This system page cannot be deleted.');
        }

        $page->delete();

        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}
