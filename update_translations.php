<?php

$files = [
    __DIR__ . '/resources/js/locales/en.json',
    __DIR__ . '/resources/js/locales/km.json'
];

$translations = [
    'profile.address.title' => 'Address & Contact Apps',
    'profile.address.line1' => 'Address line 1',
    'profile.address.line2' => 'Address line 2',
    'profile.address.city' => 'City',
    'profile.address.province' => 'Province',
    'profile.address.postal_code' => 'Postal code',
    'profile.address.country_code' => 'KH',
    'profile.address.telegram' => '@telegram',
    'profile.address.whatsapp' => 'WhatsApp number',
    'profile.address.notes' => 'Address notes',
    'profile.address.save' => 'Save Address',
    
    'dashboard.title' => 'Dashboard',
    'dashboard.head' => 'My Dashboard',
    'dashboard.heading' => 'Customer Dashboard',
    'dashboard.customer_id' => 'Customer ID',
    'dashboard.create_manual_order' => 'Create Manual Order',
    'dashboard.logout' => 'Logout',
    'dashboard.stats.total' => 'Total Orders',
    'dashboard.stats.pending' => 'Pending Review',
    'dashboard.stats.delivering' => 'Out for Delivery',
    'dashboard.stats.completed' => 'Completed',
    'dashboard.shortcuts.manual_order' => 'Create Manual Order',
    'dashboard.shortcuts.manual_desc' => 'Submit products you would like our team to purchase.',
    'dashboard.shortcuts.my_orders' => 'My Orders',
    'dashboard.shortcuts.orders_desc' => 'View active, completed, delayed, and cancelled orders.',
    'dashboard.shortcuts.receipts' => 'Receipts',
    'dashboard.shortcuts.receipts_desc' => 'View and download your completed order receipts.',
    'dashboard.shortcuts.support' => 'Contact Support',
    'dashboard.shortcuts.support_desc' => 'Ask our logistics team for help.',
    'dashboard.recent_orders' => 'Recent Orders',
    'dashboard.view_all' => 'View All >',
    'dashboard.order_number' => 'Order Number',
    'dashboard.date' => 'Date',
    'dashboard.items' => 'Items',
    'dashboard.items_count' => 'items',
    'dashboard.status' => 'Status',
    'dashboard.action' => 'Action',
    'dashboard.view_details' => 'View Details',
    'dashboard.no_orders' => 'No orders found.',
    'dashboard.create_first' => 'Create your first order',

    'contact.title' => 'Contact Us',
    'contact.description' => 'Contact support for manual orders, tracking, receipts, and account help.',
    'contact.support_center' => 'Support Center',
    'contact.support_text' => 'Reach our support team through your preferred channel for manual orders, delivery, receipts, and account help.',
    'contact.about_us' => 'About Us',
    'contact.vietnam_office' => 'Vietnam Office',
    'contact.open_map' => 'Open Map',
    'contact.cambodia_office' => 'Cambodia Office',
    'contact.about_company' => 'About MVM Logistics',
    'contact.about_text' => 'MVM Logistics is a premier cross-border logistics and manual order management application...',
    
    'manual_order.title' => 'Create Manual Order',
    'manual_order.customer_info' => 'Customer Information',
    'manual_order.delivery_address' => 'Delivery Address',
    'manual_order.requested_products' => 'Requested Products',
    'manual_order.additional_notes' => 'Additional Notes',
    'manual_order.request_summary' => 'Request Summary',
    'manual_order.product_urls' => 'Product URLs',
    'manual_order.add_url' => '+ Add Another URL',
    'manual_order.view' => 'View',
    'manual_order.remove' => 'Remove',

    'orders.title' => 'My Orders',
    'orders.search' => 'Search orders...',
    'orders.no_orders' => 'No Orders Found',
    'orders.no_orders_msg' => "You don't have any orders matching this status.",
    'orders.track' => 'Track',
    'orders.contact' => 'Contact',
    'orders.items' => 'Items',
    'orders.view_details' => 'View Details',
    'orders.tabs.all' => 'All',
    'orders.tabs.progress' => 'Progress',
    'orders.tabs.purchased' => 'Purchased',
    'orders.tabs.warehouse' => 'Warehouse',
    'orders.tabs.shipped' => 'Shipped',
    'orders.tabs.delivered' => 'Delivered',
    
    'status.pending_review' => 'Pending Review',
    'status.quote_provided' => 'Quote Provided',
    'status.approved' => 'Approved',
    'status.purchased' => 'Purchased',
    'status.warehouse_received' => 'Warehouse Received',
    'status.shipped' => 'Shipped',
    'status.arrived_destination' => 'Arrived',
    'status.delivered' => 'Delivered',
    'status.cancelled' => 'Cancelled',
    'status.delayed' => 'Delayed',
    
    'status.Unpaid' => 'Unpaid',
    'status.Paid' => 'Paid',
    'status.Partial' => 'Partial'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        $json = file_get_contents($file);
        $data = json_decode($json, true);
        
        foreach ($translations as $key => $value) {
            // we inject new keys flatly, or you can expand to nested. 
            // since we used dot notation like "orders.title", we can split it.
            $parts = explode('.', $key);
            $current = &$data;
            foreach ($parts as $i => $part) {
                if ($i === count($parts) - 1) {
                    if (!isset($current[$part])) {
                        $current[$part] = $value;
                    }
                } else {
                    if (!isset($current[$part])) {
                        $current[$part] = [];
                    }
                    $current = &$current[$part];
                }
            }
        }
        
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo "Updated $file\n";
    } else {
        echo "File not found: $file\n";
    }
}
