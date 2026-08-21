<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #1c55c0;
            font-size: 24px;
            margin-bottom: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            font-size: 12px;
        }
        th {
            background-color: #f8f9fa;
            color: #495057;
            font-weight: bold;
            text-transform: uppercase;
        }
        tr:nth-child(even) {
            background-color: #fdfdfd;
        }
        .status {
            font-weight: bold;
        }
        .footer {
            text-align: center;
            font-size: 10px;
            color: #777;
            margin-top: 40px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <h1>{{ $title }}</h1>
    
    <table>
        <thead>
            <tr>
                <th>Order Number</th>
                @if(!$customer)
                <th>Customer</th>
                @endif
                <th>Total Amount</th>
                <th>Estimated Total</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>{{ $order->order_number }}</td>
                    @if(!$customer)
                    <td>{{ $order->user ? $order->user->name : 'Guest' }}</td>
                    @endif
                    <td>${{ number_format($order->total_amount, 2) }}</td>
                    <td>${{ number_format($order->estimated_total, 2) }}</td>
                    <td class="status">{{ str_replace('_', ' ', $order->status) }}</td>
                    <td class="status">{{ str_replace('_', ' ', $order->payment_status) }}</td>
                    <td>{{ $order->created_at->format('M d, Y H:i') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generated on {{ now()->format('F j, Y H:i:s') }}
    </div>
</body>
</html>
