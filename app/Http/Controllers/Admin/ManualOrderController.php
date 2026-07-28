<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManualOrderController extends Controller
{
    /**
     * Display a listing of all customers for the Logistics CRM.
     */
    public function index(Request $request)
    {
        $customers = User::where('is_admin', false)
            ->withCount('manualOrders')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('customer_code', 'like', $search)
                        ->orWhere('name', 'like', $search)
                        ->orWhere('email', 'like', $search)
                        ->orWhere('phone_e164', 'like', $search);
                });
            })
            ->when($request->filled('start_date'), function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request->input('start_date'));
            })
            ->when($request->filled('end_date'), function ($query) use ($request) {
                $query->whereDate('created_at', '<=', $request->input('end_date'));
            })
            ->latest()
            ->paginate(15)
            ->through(function ($user) {
                // Determine last order date
                $lastOrder = $user->manualOrders()->latest()->first();
                return [
                    'id' => $user->id,
                    'customer_code' => $user->customer_code,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_e164,
                    'total_orders' => $user->manual_orders_count,
                    'last_order_date' => $lastOrder ? $lastOrder->created_at->format('M d, Y') : 'N/A',
                ];
            })
            ->withQueryString();

        return Inertia::render('Admin/Logistics/Customers', [
            'customers' => $customers,
            'filters' => (object) $request->only(['search', 'start_date', 'end_date']),
        ]);
    }

    /**
     * Display a specific customer and their manual orders.
     */
    public function customerOrders(Request $request, User $customer)
    {
        $orders = ManualOrder::where('user_id', $customer->id)
            ->with(['items', 'files', 'receipts'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where('order_number', 'like', $search);
            })
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->input('status')))
            ->when($request->filled('payment_status'), fn($q) => $q->where('payment_status', $request->input('payment_status')))
            ->when($request->filled('sort'), function ($query) use ($request) {
                if ($request->input('sort') === 'oldest') {
                    $query->oldest();
                } else {
                    $query->latest();
                }
            }, function ($query) {
                $query->latest();
            })
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Logistics/CustomerOrders', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'customer_code' => $customer->customer_code,
                'email' => $customer->email,
                'phone' => $customer->phone_e164,
                'address' => trim(implode(', ', array_filter([
                    $customer->address_line_1,
                    $customer->address_line_2,
                    $customer->city,
                    $customer->province,
                    $customer->country_code,
                ]))),
            ],
            'orders' => $orders,
            'filters' => (object) $request->only(['search', 'status', 'payment_status', 'sort']),
            'statuses' => ['pending', 'processing', 'packed', 'shipping', 'delivered', 'cancelled'],
            'paymentStatuses' => ['unpaid', 'partial', 'paid', 'refunded'],
        ]);
    }

    /**
     * Display a listing of all manual orders across all customers.
     */
    public function allOrders(Request $request)
    {
        $orders = ManualOrder::with(['user', 'items', 'receipts'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where('order_number', 'like', $search)
                    ->orWhereHas('user', function($q) use ($search) {
                        $q->where('name', 'like', $search)
                          ->orWhere('customer_code', 'like', $search);
                    });
            })
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->input('status')))
            ->when($request->filled('payment_status'), fn($q) => $q->where('payment_status', $request->input('payment_status')))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Logistics/Orders', [
            'orders' => $orders,
            'filters' => (object) $request->only(['search', 'status', 'payment_status']),
            'statuses' => ['pending', 'processing', 'packed', 'shipping', 'delivered', 'cancelled'],
            'paymentStatuses' => ['unpaid', 'partial', 'paid', 'refunded'],
        ]);
    }
}
