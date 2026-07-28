<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\ManualOrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->get('date', now()->timezone('Asia/Phnom_Penh')->format('Y-m-d'));

        $totalCustomers = User::where('is_admin', false)->whereDate('created_at', $date)->count();
        $totalManualOrders = ManualOrder::whereDate('created_at', $date)->count();
        $totalProductsSold = ManualOrderItem::whereHas('manualOrder', function($q) use ($date) {
            $q->whereDate('created_at', $date);
        })->sum('quantity');
        $totalRevenue = ManualOrder::whereDate('created_at', $date)->where('payment_status', 'paid')->sum('total_amount');
        
        $pendingOrders = ManualOrder::whereDate('created_at', $date)->where('status', 'pending')->count();
        $inProgressOrders = ManualOrder::whereDate('created_at', $date)->whereIn('status', ['processing', 'packed', 'shipping'])->count();
        $deliveredOrders = ManualOrder::whereDate('created_at', $date)->where('status', 'delivered')->count();
        
        $unpaidOrders = ManualOrder::whereDate('created_at', $date)->where('payment_status', 'unpaid')->count();
        $paidOrders = ManualOrder::whereDate('created_at', $date)->where('payment_status', 'paid')->count();

        // Revenue by day chart (for the selected day, we can just show the hours or keep it as day)
        // If they pick a single date, showing a chart for 1 point is weird, but we will leave it grouping by date for now,
        // so it will just be a single point.
        $revenueChart = ManualOrder::whereDate('created_at', $date)
            ->where('payment_status', 'paid')
            ->selectRaw("DATE(CONVERT_TZ(created_at, '+00:00', '+07:00')) as date, SUM(total_amount) as revenue, COUNT(*) as orders")
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($row) => [
                'date' => $row->date,
                'revenue' => (float) $row->revenue,
                'orders' => (int) $row->orders,
            ]);

        // Recent Orders on that date
        $recentOrders = ManualOrder::with('user')
            ->whereDate('created_at', $date)
            ->latest()
            ->take(8)
            ->get()
            ->map(fn($order) => [
                'id' => $order->id,
                'number' => $order->order_number,
                'customer' => $order->user?->name ?? 'Guest',
                'customer_code' => $order->user?->customer_code ?? 'N/A',
                'total' => (float) $order->total_amount,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'created_at' => $order->created_at->timezone('Asia/Phnom_Penh')->format('d M Y, H:i'),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_customers' => $totalCustomers,
                'total_manual_orders' => $totalManualOrders,
                'total_products_sold' => (int) $totalProductsSold,
                'total_revenue' => (float) $totalRevenue,
                
                'pending_orders' => $pendingOrders,
                'in_progress_orders' => $inProgressOrders,
                'delivered_orders' => $deliveredOrders,
                
                'unpaid_orders' => $unpaidOrders,
                'paid_orders' => $paidOrders,
            ],
            'revenue_chart' => $revenueChart,
            'recent_orders' => $recentOrders,
            'date' => $date,
        ]);
    }
}
