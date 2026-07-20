<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', '30');

        $days = match ($period) {
            '7' => 7,
            '30' => 30,
            '90' => 90,
            default => 30,
        };

        $since = now()->subDays($days);

        // Revenue & Orders — column is total_amount
        $revenueData = Order::where('created_at', '>=', $since)
            ->whereIn('status', ['completed', 'processing', 'shipped'])
            ->selectRaw('SUM(total_amount) as revenue, COUNT(*) as count')
            ->first();

        $totalRevenue = $revenueData->revenue ?? 0;
        $totalOrders = $revenueData->count ?? 0;

        // Previous period for comparison
        $prevSince = now()->subDays($days * 2);
        $prevRevenue = Order::whereBetween('created_at', [$prevSince, $since])
            ->whereIn('status', ['completed', 'processing', 'shipped'])
            ->sum('total_amount') ?? 0;

        $revenueGrowth = $prevRevenue > 0 ? round((($totalRevenue - $prevRevenue) / $prevRevenue) * 100, 1) : 0;

        // Customers
        $newCustomers = User::where('created_at', '>=', $since)->where('is_admin', false)->count();

        // Average Order Value
        $aov = $totalOrders > 0 ? round($totalRevenue / $totalOrders, 2) : 0;

        // Pending orders
        $pendingOrders = Order::where('status', 'pending')->count();

        // Low stock
        $lowStock = Product::where('stock', '<=', 5)->where('stock', '>', 0)->count();
        $outOfStock = Product::where('stock', 0)->count();

        // Total products
        $totalProducts = Product::count();

        // Revenue by day chart — using total_amount
        $revenueChart = Order::where('created_at', '>=', $since)
            ->whereIn('status', ['completed', 'processing', 'shipped'])
            ->selectRaw("DATE(CONVERT_TZ(created_at, '+00:00', '+07:00')) as date, SUM(total_amount) as revenue, COUNT(*) as orders")
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($row) => [
                'date' => $row->date,
                'revenue' => (float) $row->revenue,
                'orders' => (int) $row->orders,
            ]);

        // Recent Orders
        $recentOrders = Order::with('user')
            ->latest()
            ->take(8)
            ->get()
            ->map(fn($order) => [
                'id' => $order->id,
                'number' => '#' . str_pad($order->id, 5, '0', STR_PAD_LEFT),
                'customer' => $order->user?->name ?? 'Guest',
                'total' => (float) $order->total_amount,
                'status' => $order->status,
                'created_at' => $order->created_at->timezone('Asia/Phnom_Penh')->format('d M Y, H:i'),
            ]);

        // Low stock products
        $lowStockProducts = Product::where('stock', '<=', 5)
            ->orderBy('stock')
            ->take(5)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'stock' => $p->stock,
                'slug' => $p->slug,
            ]);

        // Top products — order_items uses price * quantity (no total column)
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->where('order_items.created_at', '>=', $since)
            ->selectRaw('products.id, products.name, products.slug, SUM(order_items.quantity) as sold, SUM(order_items.price * order_items.quantity) as revenue')
            ->groupBy('products.id', 'products.name', 'products.slug')
            ->orderByDesc('sold')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'revenue' => (float) $totalRevenue,
                'revenue_growth' => $revenueGrowth,
                'orders' => (int) $totalOrders,
                'pending_orders' => (int) $pendingOrders,
                'new_customers' => (int) $newCustomers,
                'aov' => (float) $aov,
                'low_stock' => (int) $lowStock,
                'out_of_stock' => (int) $outOfStock,
                'total_products' => (int) $totalProducts,
            ],
            'revenue_chart' => $revenueChart,
            'recent_orders' => $recentOrders,
            'low_stock_products' => $lowStockProducts,
            'top_products' => $topProducts,
            'period' => $period,
        ]);
    }
}
