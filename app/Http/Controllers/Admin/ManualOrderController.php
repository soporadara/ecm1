<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
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
            ->withCount('orders')
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
            ->withMax('orders', 'created_at')
            ->orderByDesc('orders_max_created_at')
            ->orderByDesc('id')
            ->paginate(15)
            ->through(function ($user) {
                // Determine last order date
                $lastOrder = $user->orders()->latest()->first();
                return [
                    'id' => $user->id,
                    'customer_code' => $user->customer_code,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_e164,
                    'total_orders' => $user->orders_count,
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
        $orders = Order::where('user_id', $customer->id)
            ->with(['items', 'attachments', 'receipts'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', $search)
                      ->orWhereHas('receipts', fn ($receiptQuery) => $receiptQuery->where('receipt_number', 'like', $search));
                });
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
        $orders = Order::with(['user', 'items', 'receipts'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', $search)
                        ->orWhereHas('user', function($qUser) use ($search) {
                            $qUser->where('name', 'like', $search)
                                  ->orWhere('customer_code', 'like', $search);
                        })
                        ->orWhereHas('receipts', fn ($receiptQuery) => $receiptQuery->where('receipt_number', 'like', $search));
                });
            })
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->input('status')))
            ->when($request->filled('payment_status'), fn($q) => $q->where('payment_status', $request->input('payment_status')))
            ->when($request->filled('start_date'), fn($q) => $q->whereDate('created_at', '>=', $request->input('start_date')))
            ->when($request->filled('end_date'), fn($q) => $q->whereDate('created_at', '<=', $request->input('end_date')))
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
        $query = Order::with(['user', 'items'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', $search)
                        ->orWhereHas('user', function($qUser) use ($search) {
                            $qUser->where('name', 'like', $search)
                                  ->orWhere('customer_code', 'like', $search);
                        })
                        ->orWhereHas('receipts', fn ($receiptQuery) => $receiptQuery->where('receipt_number', 'like', $search));
                });
            })
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->input('status')))
            ->when($request->filled('payment_status'), fn($q) => $q->where('payment_status', $request->input('payment_status')))
            ->when($request->filled('start_date'), fn($q) => $q->whereDate('created_at', '>=', $request->input('start_date')))
            ->when($request->filled('end_date'), fn($q) => $q->whereDate('created_at', '<=', $request->input('end_date')))
            ->latest();

        if ($request->input('format') === 'pdf') {
            $ordersCount = $query->count();
            if ($ordersCount > 500) {
                return back()->with('error', 'Too many orders selected for PDF export (' . $ordersCount . '). Please use CSV export instead.');
            }
            $orders = $query->get();
            $pdf = Pdf::loadView('pdf.orders', [
                'orders' => $orders,
                'title' => 'All Orders Report',
                'customer' => null,
            ]);
            
            if ($request->input('preview') == '1') {
                return $pdf->stream('all_orders_' . date('Y-m-d') . '.pdf');
            }
            return $pdf->download('all_orders_' . date('Y-m-d') . '.pdf');
        }

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=all_orders_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Order Number', 'Customer', 'Total Amount', 'Estimated Total', 'Status', 'Payment Status', 'Created At'];

        $callback = function() use($query, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            $query->chunk(500, function ($orders) use ($file) {
                foreach ($orders as $order) {
                    $row['Order Number']  = $order->order_number;
                    $row['Customer']  = $order->user ? $order->user->name : 'Guest';
                    $row['Total Amount']  = $order->total_amount;
                    $row['Budget']  = $order->estimated_total;
                    $row['Status']  = $order->status;
                    $row['Payment Status']  = $order->payment_status;
                    $row['Created At']  = $order->created_at->format('Y-m-d H:i:s');

                    fputcsv($file, array($row['Order Number'], $row['Customer'], $row['Total Amount'], $row['Budget'], $row['Status'], $row['Payment Status'], $row['Created At']));
                }
            });

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Export customer orders to CSV.
     */
    public function exportCustomerOrders(Request $request, User $customer)
    {
        $query = Order::where('user_id', $customer->id)
            ->with(['items'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', $search)
                      ->orWhereHas('receipts', fn ($receiptQuery) => $receiptQuery->where('receipt_number', 'like', $search));
                });
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
            });

        if ($request->input('format') === 'pdf') {
            $ordersCount = $query->count();
            if ($ordersCount > 500) {
                return back()->with('error', 'Too many orders selected for PDF export (' . $ordersCount . '). Please use CSV export instead.');
            }
            $orders = $query->get();
            $pdf = Pdf::loadView('pdf.orders', [
                'orders' => $orders,
                'title' => 'Orders for ' . $customer->name,
                'customer' => $customer,
            ]);
            
            if ($request->input('preview') == '1') {
                return $pdf->stream('customer_orders_' . $customer->id . '_' . date('Y-m-d') . '.pdf');
            }
            return $pdf->download('customer_orders_' . $customer->id . '_' . date('Y-m-d') . '.pdf');
        }

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=customer_orders_" . $customer->id . "_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Order Number', 'Total Amount', 'Estimated Total', 'Status', 'Payment Status', 'Created At'];

        $callback = function() use($query, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            $query->chunk(500, function ($orders) use ($file) {
                foreach ($orders as $order) {
                    $row['Order Number']  = $order->order_number;
                    $row['Total Amount']  = $order->total_amount;
                    $row['Budget']  = $order->estimated_total;
                    $row['Status']  = $order->status;
                    $row['Payment Status']  = $order->payment_status;
                    $row['Created At']  = $order->created_at->format('Y-m-d H:i:s');

                    fputcsv($file, array($row['Order Number'], $row['Total Amount'], $row['Budget'], $row['Status'], $row['Payment Status'], $row['Created At']));
                }
            });

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Export all images for a customer's orders as a ZIP file.
     */
    public function exportCustomerImages(User $customer)
    {
        $orders = Order::where('user_id', $customer->id)->with('images')->get();
        
        $zipFileName = 'customer_' . $customer->customer_code . '_images.zip';
        $zipFilePath = storage_path('app/public/' . $zipFileName);

        $zip = new \ZipArchive();
        
        if ($zip->open($zipFilePath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $hasFiles = false;
            
            foreach ($orders as $order) {
                foreach ($order->images as $image) {
                    $imagePath = storage_path('app/public/' . $image->path);
                    if (file_exists($imagePath)) {
                        $zip->addFile($imagePath, 'Order_' . $order->order_number . '/' . basename($imagePath));
                        $hasFiles = true;
                    }
                }
            }
            
            $zip->close();
            
            if ($hasFiles) {
                return response()->download($zipFilePath)->deleteFileAfterSend(true);
            } else {
                @unlink($zipFilePath);
                return back()->with('error', 'No images found for this customer.');
            }
        }
        
        return back()->with('error', 'Could not create ZIP file.');
    }
}
