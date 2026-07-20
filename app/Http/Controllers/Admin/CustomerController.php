<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('is_admin', false)
            ->withCount('orders')
            ->withSum(['orders' => fn($q) => $q->whereIn('status', ['completed', 'processing'])], 'total_amount')
            ->orderByDesc('created_at')
            ->paginate(20)
            ->through(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'orders_count' => $u->orders_count,
                'total_spent' => (float) ($u->orders_sum_total_amount ?? 0),
                'created_at' => $u->created_at->timezone('Asia/Phnom_Penh')->format('d M Y'),
            ]);

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function show(User $user)
    {
        $orders = $user->orders()->latest()->take(10)->get()->map(fn($o) => [
            'id' => $o->id,
            'number' => '#' . str_pad($o->id, 5, '0', STR_PAD_LEFT),
            'total' => (float) $o->total_amount,
            'status' => $o->status,
            'created_at' => $o->created_at->timezone('Asia/Phnom_Penh')->format('d M Y, H:i'),
        ]);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->timezone('Asia/Phnom_Penh')->format('d M Y'),
            ],
            'orders' => $orders,
        ]);
    }
}
