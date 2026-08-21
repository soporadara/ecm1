<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReceiptPaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ReceiptPaymentMethodController extends Controller
{
    public function index()
    {
        $methods = ReceiptPaymentMethod::orderBy('sort_order')->get();
        return Inertia::render('Admin/Logistics/ReceiptPayments/Index', [
            'methods' => $methods
        ]);
    }

    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info("ReceiptPaymentMethodController@store called", $request->all());
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'qr_code' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);
        \Illuminate\Support\Facades\Log::info("Validation passed", $validated);

        $data = $request->except(['logo', 'qr_code']);
        $data['is_active'] = $request->boolean('is_active');
        
        if ($request->hasFile('logo')) {
            $data['logo_url'] = '/storage/' . $request->file('logo')->store('receipts/banks', 'public');
        }
        
        if ($request->hasFile('qr_code')) {
            $data['qr_code_url'] = '/storage/' . $request->file('qr_code')->store('receipts/qrs', 'public');
        }

        ReceiptPaymentMethod::create($data);

        return back()->with('success', 'Payment method added successfully.');
    }

    public function update(Request $request, ReceiptPaymentMethod $receipt_payment)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'qr_code' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        $data = $request->except(['logo', 'qr_code']);
        $data['is_active'] = $request->boolean('is_active');
        
        if ($request->hasFile('logo')) {
            if ($receipt_payment->logo_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $receipt_payment->logo_url));
            }
            $data['logo_url'] = '/storage/' . $request->file('logo')->store('receipts/banks', 'public');
        }
        
        if ($request->hasFile('qr_code')) {
            if ($receipt_payment->qr_code_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $receipt_payment->qr_code_url));
            }
            $data['qr_code_url'] = '/storage/' . $request->file('qr_code')->store('receipts/qrs', 'public');
        }

        $receipt_payment->update($data);

        return back()->with('success', 'Payment method updated successfully.');
    }

    public function destroy(ReceiptPaymentMethod $receipt_payment)
    {
        if ($receipt_payment->logo_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $receipt_payment->logo_url));
        }
        if ($receipt_payment->qr_code_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $receipt_payment->qr_code_url));
        }
        $receipt_payment->delete();
        
        return back()->with('success', 'Payment method deleted successfully.');
    }
}
