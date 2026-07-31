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

    /**
     * Export all manual orders across all customers to CSV.
     */
    public function exportAllOrders(Request $request)
    {
        $orders = ManualOrder::with(['user', 'items'])
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
            ->get();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=all_orders_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Order Number', 'Customer', 'Invoice Number', 'Receipt Number', 'Total Amount', 'Budget', 'Status', 'Payment Status', 'Created At'];

        $callback = function() use($orders, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($orders as $order) {
                $row['Order Number']  = $order->order_number;
                $row['Customer']  = $order->user ? $order->user->name : 'Guest';
                $row['Invoice Number']    = $order->invoice_number;
                $row['Receipt Number']    = $order->receipt_number;
                $row['Total Amount']  = $order->total_amount;
                $row['Budget']  = $order->budget;
                $row['Status']  = $order->status;
                $row['Payment Status']  = $order->payment_status;
                $row['Created At']  = $order->created_at->format('Y-m-d H:i:s');

                fputcsv($file, array($row['Order Number'], $row['Customer'], $row['Invoice Number'], $row['Receipt Number'], $row['Total Amount'], $row['Budget'], $row['Status'], $row['Payment Status'], $row['Created At']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Export customer orders to CSV.
     */
    public function exportCustomerOrders(Request $request, User $customer)
    {
        $orders = ManualOrder::where('user_id', $customer->id)
            ->with(['items'])
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
            ->get();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=orders_{$customer->customer_code}_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Order Number', 'Invoice Number', 'Receipt Number', 'Total Amount', 'Budget', 'Status', 'Payment Status', 'Created At'];

        $callback = function() use($orders, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($orders as $order) {
                $row['Order Number']  = $order->order_number;
                $row['Invoice Number']    = $order->invoice_number;
                $row['Receipt Number']    = $order->receipt_number;
                $row['Total Amount']  = $order->total_amount;
                $row['Budget']  = $order->budget;
                $row['Status']  = $order->status;
                $row['Payment Status']  = $order->payment_status;
                $row['Created At']  = $order->created_at->format('Y-m-d H:i:s');

                fputcsv($file, array($row['Order Number'], $row['Invoice Number'], $row['Receipt Number'], $row['Total Amount'], $row['Budget'], $row['Status'], $row['Payment Status'], $row['Created At']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Display the specified manual order for editing.
     */
    public function show(ManualOrder $order)
    {
        $order->load(['user', 'items', 'files']);
        
        return Inertia::render('Admin/Logistics/Orders/Show', [
            'order' => $order,
            'statuses' => ['pending', 'processing', 'packed', 'shipping', 'delivered', 'cancelled'],
            'paymentStatuses' => ['unpaid', 'partial', 'paid', 'refunded'],
            'auditLogs' => [],
        ]);
    }

    /**
     * Update the manual order status and other details.
     */
    public function update(Request $request, ManualOrder $order)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'payment_status' => 'required|string',
            'internal_note' => 'nullable|string',
            'public_message' => 'nullable|string',
            'currency_code' => 'required|string',
            'subtotal' => 'nullable|numeric',
            'logistics_fee' => 'nullable|numeric',
            'service_fee' => 'nullable|numeric',
            'delivery_fee' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'pricing_notes' => 'nullable|string',
        ]);

        $totalAmount = ($validated['subtotal'] ?? 0) 
            + ($validated['logistics_fee'] ?? 0) 
            + ($validated['service_fee'] ?? 0) 
            + ($validated['delivery_fee'] ?? 0) 
            - ($validated['discount'] ?? 0);

        $order->update([
            'status' => $validated['status'],
            'payment_status' => $validated['payment_status'],
            'internal_note' => $validated['internal_note'],
            'customer_visible_note' => $validated['public_message'],
            'currency_code' => $validated['currency_code'],
            'subtotal_amount' => $validated['subtotal'] ?? 0,
            'logistics_fee_amount' => $validated['logistics_fee'] ?? 0,
            'service_fee_amount' => $validated['service_fee'] ?? 0,
            'delivery_fee_amount' => $validated['delivery_fee'] ?? 0,
            'discount_amount' => $validated['discount'] ?? 0,
            'total_amount' => max($totalAmount, 0),
            'pricing_notes' => $validated['pricing_notes'],
        ]);

        return back()->with('success', 'Order updated successfully.');
    }
}
