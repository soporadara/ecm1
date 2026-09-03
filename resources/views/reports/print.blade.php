<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report - {{ ucfirst(str_replace('_', ' ', $type)) }}</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 40px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { margin: 0; font-size: 24px; color: #111; }
        .header p { margin: 5px 0; font-size: 14px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f9f9f9; font-weight: bold; }
        tr:nth-child(even) { background-color: #fafafa; }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        .actions { text-align: right; margin-bottom: 20px; }
        .btn { padding: 8px 16px; background-color: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .btn:hover { background-color: #333; }
    </style>
</head>
<body>
    <div class="actions no-print">
        <button class="btn" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <div class="header">
        <img src="{{ asset('logo.png') }}" alt="Logo" class="logo" style="max-height: 60px; margin-bottom: 15px;">
        <h1>{{ ucfirst(str_replace('_', ' ', $type)) }} Report</h1>
        <p>Generated on {{ now()->format('F j, Y, g:i a') }}</p>
        @if(isset($startDate) || isset($endDate))
            <p>Period: {{ $startDate ?? 'Beginning' }} to {{ $endDate ?? 'Now' }}</p>
        @endif
        @if(isset($customer))
            <p>Customer: {{ $customer->name }} ({{ $customer->customer_code }})</p>
        @endif
    </div>

    <table>
        <thead>
            <tr>
                @foreach($headers as $header)
                    <th>{{ $header }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @forelse($rows as $row)
                <tr>
                    @foreach($row as $cell)
                        <td>{{ $cell }}</td>
                    @endforeach
                </tr>
            @empty
                <tr>
                    <td colspan="{{ count($headers) }}" style="text-align: center; color: #999;">No data found for this report.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <script>
        // Automatically open print dialog when page loads
        window.onload = function() {
            window.print();
        };
    </script>
</body>
</html>
