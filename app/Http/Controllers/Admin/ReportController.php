<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\ManualOrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'type' => 'required|in:revenue,customer_activity',
            'format' => 'required|in:pdf,csv',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'customer_id' => 'required_if:type,customer_activity|exists:users,id',
        ]);

        if ($request->format === 'csv') {
            return $this->generateCsv($request);
        }

        return $this->generatePdf($request);
    }

    private function generateCsv(Request $request)
    {
        // Simple CSV generation logic for demonstration
        $filename = "report_{$request->type}_" . date('Y-m-d_H-i-s') . ".csv";
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function () use ($request) {
            $file = fopen('php://output', 'w');
            
            if ($request->type === 'revenue') {
                fputcsv($file, ['Order Number', 'Date', 'Status', 'Payment', 'Total']);
                $orders = ManualOrder::all();
                foreach ($orders as $order) {
                    fputcsv($file, [$order->order_number, $order->created_at, $order->status, $order->payment_status, $order->total_amount]);
                }
            } else {
                fputcsv($file, ['Order Number', 'Date', 'Status', 'Payment', 'Total']);
                $orders = ManualOrder::where('user_id', $request->customer_id)->get();
                foreach ($orders as $order) {
                    fputcsv($file, [$order->order_number, $order->created_at, $order->status, $order->payment_status, $order->total_amount]);
                }
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function generatePdf(Request $request)
    {
        // This is a stub for PDF generation. You would use laravel-dompdf or snappy.
        // For now, we'll return a simple HTML view or redirect back with a message.
        return redirect()->back()->with('error', 'PDF generation requires DomPDF or Snappy installed.');
    }
}
