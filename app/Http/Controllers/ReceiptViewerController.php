<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptViewerController extends Controller
{
    public function show($receiptNumber)
    {
        $receipt = Receipt::where('receipt_number', $receiptNumber)->with(['user', 'order'])->firstOrFail();

        $settings = \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray();
        $logo = $settings['site_logo'] ?? null;
        if ($logo) {
            $logo = '/storage/' . $logo;
        }

        $paymentMethods = \App\Models\ReceiptPaymentMethod::where('is_active', true)->orderBy('sort_order')->get();

        return Inertia::render('Public/Receipt', [
            'receipt' => $receipt,
            'settings' => $settings,
            'logo' => $logo,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function downloadPdf($receiptNumber)
    {
        $receipt = Receipt::where('receipt_number', $receiptNumber)->with(['user', 'order'])->firstOrFail();
        $settings = \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray();
        $logoUrl = 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('logo.png')));
        $paymentMethods = \App\Models\ReceiptPaymentMethod::where('is_active', true)->orderBy('sort_order')->get();

        $pdf = Pdf::setOptions(['isRemoteEnabled' => true])
            ->loadView('receipt-pdf', compact('receipt', 'settings', 'logoUrl', 'paymentMethods'));
        $pdf->setPaper('A4', 'portrait');

        return $pdf->stream("Receipt-{$receipt->receipt_number}.pdf");
    }
}
