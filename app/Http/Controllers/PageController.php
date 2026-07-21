<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        if ($page->is_private) {
            abort(404);
        }

        return Inertia::render('Page/Show', [
            'page' => $page
        ]);
    }
}
