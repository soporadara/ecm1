<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt - {{ $receipt->receipt_number }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            font-size: 14px;
            margin: 0;
            padding: 20px;
        }
        .header {
            width: 100%;
            margin-bottom: 40px;
        }
        .header td {
            vertical-align: top;
        }
        .logo {
            max-height: 70px;
            margin-bottom: 10px;
        }
        .company-info {
            color: #666;
            font-size: 12px;
            line-height: 1.5;
        }
        .invoice-title {
            font-size: 36px;
            font-weight: bold;
            color: #1e3a8a; /* indigo-900 */
            text-transform: uppercase;
            margin: 0 0 10px 0;
            text-align: right;
        }
        .invoice-meta {
            background: #f8fafc;
            padding: 10px;
            border: 1px solid #e2e8f0;
            text-align: left;
            float: right;
            min-width: 180px;
        }
        .invoice-meta p {
            margin: 0 0 5px 0;
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: bold;
        }
        .invoice-meta .val {
            font-size: 14px;
            color: #0f172a;
            margin-bottom: 15px;
        }
        .invoice-meta .val:last-child {
            margin-bottom: 0;
        }
        .billing-section {
            width: 100%;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            padding: 20px 0;
            margin-bottom: 30px;
        }
        .billing-section td {
            vertical-align: top;
            width: 50%;
        }
        .section-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            color: #1e3a8a;
            margin: 0 0 10px 0;
            letter-spacing: 1px;
        }
        .customer-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 5px 0;
            color: #0f172a;
        }
        .customer-info {
            font-size: 13px;
            color: #475569;
            line-height: 1.6;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 4px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
        }
        .status-paid {
            background-color: #dcfce7;
            color: #166534;
        }
        .status-unpaid {
            background-color: #fee2e2;
            color: #991b1b;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        .items-table th {
            background-color: #1e3a8a;
            color: #ffffff;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
        }
        .items-table th.center { text-align: center; }
        .items-table th.right { text-align: right; }
        
        .items-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e2e8f0;
            color: #333;
        }
        .items-table td.center { text-align: center; }
        .items-table td.right { text-align: right; font-family: monospace; }
        
        .item-name {
            font-weight: bold;
            margin: 0 0 4px 0;
        }
        .item-desc {
            font-size: 12px;
            color: #64748b;
            margin: 0;
        }
        .totals-table {
            width: 100%;
            border-collapse: collapse;
        }
        .totals-table td {
            padding: 8px 12px;
            color: #475569;
        }
        .totals-table td.label {
            text-align: right;
            width: 75%;
        }
        .totals-table td.amount {
            text-align: right;
            font-family: monospace;
            font-size: 14px;
            width: 25%;
        }
        .totals-table tr.discount td { color: #dc2626; }
        .totals-table tr.grand-total td {
            border-top: 2px solid #1e3a8a;
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            padding-top: 15px;
        }
        .bottom-section {
            width: 100%;
            margin-top: -100px; /* Offset because totals table is right aligned */
        }
        .payment-info {
            width: 60%;
            padding-right: 40px;
            color: #64748b;
            font-size: 12px;
            line-height: 1.6;
        }
        .bank-method {
            margin-bottom: 15px;
            page-break-inside: avoid;
        }
        .bank-method img {
            max-width: 100px;
            max-height: 100px;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #94a3b8;
            font-size: 12px;
        }
        .watermark {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 120px;
            font-weight: bold;
            color: rgba(22, 101, 52, 0.05);
            text-transform: uppercase;
            z-index: -1;
        }
    </style>
</head>
<body>
    @php
        $currencyCode = $receipt->order->currency_code ?? 'USD';
        $currencySymbol = $currencyCode === 'VND' ? '₫' : '$';
    @endphp

    @if($receipt->payment_status === 'paid')
        <div class="watermark">PAID</div>
    @endif

    <table class="header">
        <tr>
            <td style="width: 50%;">
                <img src="{{ $logoUrl }}" class="logo" alt="Logo">
                <div class="company-info">
                    <strong>{{ $settings['site_name'] ?? 'MVM Logistics' }}</strong><br>
                    {{ $settings['site_description'] ?? 'Professional Logistics Services' }}<br>
                    {{ $settings['support_email'] ?? 'info@mvmlogistics.asia' }}<br>
                    {{ $settings['support_phone'] ?? '+855 31 766 9555' }}
                </div>
            </td>
            <td style="width: 50%; text-align: right;">
                <h1 class="invoice-title">INVOICE</h1>
                <div class="invoice-meta">
                    <p>Receipt No</p>
                    <div class="val">#{{ $receipt->receipt_number }}</div>
                    
                    <p>Date</p>
                    <div class="val">{{ $receipt->created_at->format('d M Y, h:i A') }}</div>
                </div>
            </td>
        </tr>
    </table>

    <table class="billing-section">
        <tr>
            <td style="border-left: 3px solid #4f46e5; padding-left: 15px;">
                <h3 class="section-title">Billed To</h3>
                <p class="customer-name">{{ $receipt->user->name ?? 'N/A' }}</p>
                <div class="customer-info">
                    Customer Code: <strong>{{ $receipt->user->customer_code ?? 'N/A' }}</strong><br>
                    Phone: {{ $receipt->user->phone_e164 ?? ($receipt->user->phone ?? 'N/A') }}<br>
                    @if(!empty($receipt->user->email))
                        Email: {{ $receipt->user->email }}
                    @endif
                </div>
            </td>
            <td style="text-align: right; border-right: 3px solid #4f46e5; padding-right: 15px;">
                <h3 class="section-title">Payment Status</h3>
                <span class="status-badge {{ $receipt->payment_status === 'paid' ? 'status-paid' : 'status-unpaid' }}">
                    {{ $receipt->payment_status }}
                </span>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th class="center" style="width: 15%;">Qty</th>
                <th class="right" style="width: 25%;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @php
            $snapshot = is_array($receipt->snapshot_json) ? $receipt->snapshot_json : json_decode($receipt->snapshot_json, true);
            $items = $snapshot['items'] ?? [];
            @endphp
            @forelse($items as $item)
                <tr>
                    <td>
                        <p class="item-name">{{ $item['name'] ?? ($item['product_name'] ?? 'Service Item') }}</p>
                        <p class="item-desc">
                            {{ $item['description'] ?? ($item['type'] ?? (isset($item['order_number']) ? 'Order REF: ' . $item['order_number'] : '')) }}
                        </p>
                    </td>
                    <td class="center">{{ $item['quantity'] ?? 1 }}</td>
                    <td class="right">--</td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" style="text-align: center; color: #94a3b8; font-style: italic;">No items recorded for this receipt.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <table class="totals-table">
        <tr>
            <td class="label">Subtotal</td>
            <td class="amount">{{ $currencySymbol }}{{ number_format($receipt->subtotal, 2) }}</td>
        </tr>
        <tr>
            <td class="label">Service & Shipping Fees</td>
            <td class="amount">{{ $currencySymbol }}{{ number_format($receipt->charges, 2) }}</td>
        </tr>
        @if($receipt->discount > 0)
            <tr class="discount">
                <td class="label">Discount</td>
                <td class="amount">- {{ $currencySymbol }}{{ number_format($receipt->discount, 2) }}</td>
            </tr>
        @endif
        <tr class="grand-total">
            <td class="label">TOTAL</td>
            <td class="amount">{{ $currencySymbol }}{{ number_format($receipt->total, 2) }}</td>
        </tr>
    </table>

    <table class="bottom-section">
        <tr>
            <td class="payment-info">
                <h3 class="section-title">Payment Information</h3>
                
                @if(isset($paymentMethods) && count($paymentMethods) > 0)
                    <p style="margin-bottom: 15px;">You can pay using the following methods:</p>
                    
                    @foreach($paymentMethods as $method)
                        <div class="bank-method">
                            <strong>{{ $method->bank_name }}</strong><br>
                            Account Name: {{ $method->account_name }}<br>
                            Account Number: <span style="font-family: monospace;">{{ $method->account_number }}</span><br>
                            
                            @if($method->qr_code_url)
                                @php
                                    $qrPath = public_path(str_replace('/storage/', 'storage/', $method->qr_code_url));
                                    $qrData = '';
                                    if(file_exists($qrPath)) {
                                        $type = pathinfo($qrPath, PATHINFO_EXTENSION);
                                        $data = file_get_contents($qrPath);
                                        $qrData = 'data:image/' . $type . ';base64,' . base64_encode($data);
                                    }
                                @endphp
                                @if($qrData)
                                    <img src="{{ $qrData }}" alt="QR Code">
                                @endif
                            @endif
                        </div>
                    @endforeach
                @else
                    <p>Paid via Wallet / Direct Transfer.</p>
                @endif
                
                <p style="margin-top: 20px;">All transactions are final. For questions concerning this invoice, please reach out to our support channel.</p>
            </td>
            <td style="width: 40%;"></td>
        </tr>
    </table>

    <div class="footer">
        <strong>{{ $settings['site_name'] ?? 'MVM Logistics' }}</strong><br>
        Thank you for choosing us for your logistics needs.
    </div>
</body>
</html>
