<?php

namespace App\Http\Controllers;

use App\Services\ProductImportService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\ImportedProductResource;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Cart;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class ProductImportController extends Controller
{
    protected ProductImportService $importService;

    public function __construct(ProductImportService $importService)
    {
        $this->importService = $importService;
    }

    public function index()
    {
        return Inertia::render('Logistics/Import');
    }

    public function preview(Request $request)
    {
        $request->validate([
            'url' => 'required|url'
        ]);

        try {
            // Validate and normalize the URL before importing
            $normalizedUrl = trim($request->url);
            
            // Temporary fix: using existing mock service for now until provider is built.
            // The existing service mocks the response array.
            $result = $this->importService->importFromUrl($normalizedUrl);
            
            if (($result['status'] ?? 'completed') === 'completed' && isset($result['data'])) {
                $result['data'] = (new ImportedProductResource($result['data']))->resolve();
            }

            // Generate a temporary job ID for the draft state
            $jobId = uniqid('import_');
            // Cache the FULL result so we can read the status (success/failed) in the UI
            Cache::put($jobId, $result, now()->addHours(1));

            // Redirect to the GET route for showing the preview, following Inertia best practices
            return redirect()->route('logistics.import.show', ['importJob' => $jobId]);

        } catch (\Exception $e) {
            return back()->withErrors(['url' => $e->getMessage()]);
        }
    }

    public function show($importJob)
    {
        $cachedResult = Cache::get($importJob);

        if (!$cachedResult) {
            return redirect('/')->withErrors(['url' => 'Import session expired or invalid.']);
        }

        return Inertia::render('Logistics/Product', [
            'importResult' => $cachedResult,
            'importJob' => $importJob
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'importJob' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'options' => 'nullable|array',
            'remarks' => 'nullable|string'
        ]);

        $cachedResult = Cache::get($request->importJob);

        if (!$cachedResult || ($cachedResult['status'] ?? 'failed') === 'failed') {
            return back()->withErrors(['error' => 'Import session expired or invalid. Please try importing again.']);
        }

        $data = $cachedResult['data'] ?? $cachedResult;
        
        DB::beginTransaction();
        try {
            // Find or create product
            $product = Product::updateOrCreate(
                [
                    'marketplace_id' => $data['external_product_id'],
                    // Store source url in original_url if your migration supports it, else just match by marketplace_id
                ],
                [
                    'name' => $data['title'],
                    'slug' => \Illuminate\Support\Str::slug($data['title']) . '-' . $data['external_product_id'],
                    'description' => $data['full_description'] ?? $data['short_description'] ?? '',
                    'price' => $data['converted_usd_price'] ?? ($data['source_price'] ? ($data['source_price'] / 7.2) : 0),
                    'status' => 'draft', // or published depending on business logic
                    // Assume there is a way to distinguish imported products, e.g. marketplace domain
                    'category_id' => null, // Put in a default category if needed
                    'is_imported' => true,
                ]
            );

            // Handle variants
            $variant = null;
            if (!empty($request->options)) {
                $optionsString = json_encode($request->options);
                $variant = ProductVariant::firstOrCreate(
                    [
                        'product_id' => $product->id,
                        'name' => implode(' / ', $request->options),
                    ],
                    [
                        'price' => $product->price,
                        'stock' => 999, // default
                    ]
                );
            }

            // Get or create cart
            $sessionId = Session::getId();
            $cart = null;
            if (auth()->check()) {
                $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);
                if ($cart->session_id !== $sessionId) {
                    $cart->update(['session_id' => $sessionId]);
                }
            } else {
                $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
            }

            // Add to cart
            $cartItem = $cart->items()
                ->where('product_id', $product->id)
                ->where('product_variant_id', $variant ? $variant->id : null)
                ->first();

            if ($cartItem) {
                $cartItem->increment('quantity', $request->quantity);
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'product_variant_id' => $variant ? $variant->id : null,
                    'quantity' => $request->quantity,
                    'price' => $product->price
                ]);
            }

            DB::commit();

            return redirect()->route('cart.index')->with('success', 'Product added to your order successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to add product to order: ' . $e->getMessage()]);
        }
    }

    public function retry($importJob)
    {
        // TODO: Retry import
    }
}
