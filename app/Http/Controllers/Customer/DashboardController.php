<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderStatusPresenter;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(OrderStatusPresenter $presenter)
    {
        $user = auth()->user();

        $orders = Order::where('user_id', $user->id);

        return Inertia::render('Customer/Dashboard', [
            'stats' => [
                'total' => (clone $orders)->count(),
                'pending' => (clone $orders)->whereIn('status', ['pending', 'pending_review'])->count(),
                'delivering' => (clone $orders)->whereIn('status', ['shipped', 'arrived_destination'])->count(),
                'completed' => (clone $orders)->whereIn('status', ['delivered', 'completed'])->count(),
            ],
            'recentOrders' => $orders->withCount('items')->latest()->take(8)->get()->map(fn (Order $order) => $presenter->decorate($order)),
        ]);
    }
}
