<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\ManualOrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $customers = User::where('is_admin', false)->select('id', 'name', 'customer_code')->get();

        return Inertia::render('Admin/Logistics/Reports', [
            'customers' => $customers
        ]);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'type' => 'required|in:revenue,customer_activity,products',
            'format' => 'required|in:pdf,csv',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'customer_id' => 'required_if:type,customer_activity|exists:users,id',
        ]);

        $data = $this->getReportData($request);

        if ($request->format === 'csv') {
            return $this->generateCsv($request, $data);
        }

        return $this->generatePdf($request, $data);
    }

    private function getReportData(Request $request)
    {
        $type = $request->type;
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $customerId = $request->customer_id;

        $headers = [];
        $rows = [];
        $customer = null;

        if ($type === 'revenue' || $type === 'customer_activity') {
            $headers = ['Order Number', 'Date', 'Customer', 'Status', 'Payment Status', 'Total Amount'];
            
            $query = \App\Models\Order::with('user');
            
            if ($type === 'customer_activity') {
                $query->where('user_id', $customerId);
                $customer = User::find($customerId);
            }

            if ($startDate) {
                $query->whereDate('created_at', '>=', $startDate);
            }
            if ($endDate) {
                $query->whereDate('created_at', '<=', $endDate);
            }

            $orders = $query->orderBy('created_at', 'desc')->get();

            foreach ($orders as $order) {
                $rows[] = [
                    $order->order_number,
                    $order->created_at->format('Y-m-d H:i'),
                    $order->user ? $order->user->name : 'N/A',
                    ucfirst($order->status),
                    ucfirst($order->payment_status),
                    '$' . number_format($order->total_amount, 2),
                ];
            }
        } elseif ($type === 'products') {
            $headers = ['Product Name', 'Total Quantity Sold', 'Total Revenue'];
            
            $query = \App\Models\OrderItem::query();
            
            if ($startDate || $endDate) {
                $query->whereHas('order', function($q) use ($startDate, $endDate) {
                    if ($startDate) {
                        $q->whereDate('created_at', '>=', $startDate);
                    }
                    if ($endDate) {
                        $q->whereDate('created_at', '<=', $endDate);
                    }
                });
            }

            $items = $query->select('product_name', DB::raw('SUM(quantity) as total_quantity'), DB::raw('SUM(line_total) as total_revenue'))
                           ->groupBy('product_name')
                           ->orderByDesc('total_revenue')
                           ->get();

            foreach ($items as $item) {
                $rows[] = [
                    $item->product_name,
                    $item->total_quantity,
                    '$' . number_format($item->total_revenue, 2),
                ];
            }
        }

        return [
            'type' => $type,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'customer' => $customer,
            'headers' => $headers,
            'rows' => $rows,
        ];
    }

    private function generateCsv(Request $request, $data)
    {
        $filename = "report_{$request->type}_" . date('Y-m-d_H-i-s') . ".csv";
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');
            
            // Add metadata
            fputcsv($file, ['MVM Logistics - ' . ucfirst(str_replace('_', ' ', $data['type'])) . ' Report']);
            fputcsv($file, ['Generated on:', now()->format('Y-m-d H:i:s')]);
            if ($data['startDate'] || $data['endDate']) {
                fputcsv($file, ['Period:', ($data['startDate'] ?? 'Beginning') . ' to ' . ($data['endDate'] ?? 'Now')]);
            }
            if ($data['customer']) {
                fputcsv($file, ['Customer:', $data['customer']->name . ' (' . $data['customer']->customer_code . ')']);
            }
            fputcsv($file, []); // Empty line

            fputcsv($file, $data['headers']);
            
            foreach ($data['rows'] as $row) {
                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function generatePdf(Request $request, $data)
    {
        // Return a print-friendly HTML view that acts as a PDF document when printed
        return view('reports.print', $data);
    }
}
