import json
import os

files = [
    'resources/js/locales/en.json',
    'resources/js/locales/km.json'
]

translations = {
    'profile.address.title': 'Address & Contact Apps',
    'profile.address.line1': 'Address line 1',
    'profile.address.line2': 'Address line 2',
    'profile.address.city': 'City',
    'profile.address.province': 'Province',
    'profile.address.postal_code': 'Postal code',
    'profile.address.country_code': 'KH',
    'profile.address.telegram': '@telegram',
    'profile.address.whatsapp': 'WhatsApp number',
    'profile.address.notes': 'Address notes',
    'profile.address.save': 'Save Address',
    
    'dashboard.title': 'Dashboard',
    'dashboard.head': 'My Dashboard',
    'dashboard.heading': 'Customer Dashboard',
    'dashboard.customer_id': 'Customer ID',
    'dashboard.create_manual_order': 'Create Manual Order',
    'dashboard.logout': 'Logout',
    'dashboard.stats.total': 'Total Orders',
    'dashboard.stats.pending': 'Pending Review',
    'dashboard.stats.delivering': 'Out for Delivery',
    'dashboard.stats.completed': 'Completed',
    'dashboard.shortcuts.manual_order': 'Create Manual Order',
    'dashboard.shortcuts.manual_desc': 'Submit products you would like our team to purchase.',
    'dashboard.shortcuts.my_orders': 'My Orders',
    'dashboard.shortcuts.orders_desc': 'View active, completed, delayed, and cancelled orders.',
    'dashboard.shortcuts.receipts': 'Receipts',
    'dashboard.shortcuts.receipts_desc': 'View and download your completed order receipts.',
    'dashboard.shortcuts.support': 'Contact Support',
    'dashboard.shortcuts.support_desc': 'Ask our logistics team for help.',
    'dashboard.recent_orders': 'Recent Orders',
    'dashboard.view_all': 'View All >',
    'dashboard.order_number': 'Order Number',
    'dashboard.date': 'Date',
    'dashboard.items': 'Items',
    'dashboard.items_count': 'items',
    'dashboard.status': 'Status',
    'dashboard.action': 'Action',
    'dashboard.view_details': 'View Details',
    'dashboard.no_orders': 'No orders found.',
    'dashboard.create_first': 'Create your first order',

    'contact.title': 'Contact Us',
    'contact.description': 'Contact support for manual orders, tracking, receipts, and account help.',
    'contact.support_center': 'Support Center',
    'contact.support_text': 'Reach our support team through your preferred channel for manual orders, delivery, receipts, and account help.',
    'contact.about_us': 'About Us',
    'contact.vietnam_office': 'Vietnam Office',
    'contact.open_map': 'Open Map',
    
    'manual_order.title': 'Create Manual Order',
    'manual_order.customer_info': 'Customer Information',
    'manual_order.delivery_address': 'Delivery Address',
    'manual_order.requested_products': 'Requested Products',
    'manual_order.additional_notes': 'Additional Notes',
    'manual_order.request_summary': 'Request Summary',
    'manual_order.product_urls': 'Product URLs',
    'manual_order.add_url': '+ Add Another URL',
    'manual_order.view': 'View',
    'manual_order.remove': 'Remove',

    'orders.title': 'My Orders',
    'orders.search': 'Search orders...',
    'orders.no_orders': 'No Orders Found',
    'orders.no_orders_msg': "You don't have any orders matching this status.",
    'orders.track': 'Track',
    'orders.contact': 'Contact',
    'orders.items': 'Items',
    'orders.view_details': 'View Details',
    'orders.tabs.all': 'All',
    'orders.tabs.progress': 'Progress',
    'orders.tabs.purchased': 'Purchased',
    'orders.tabs.warehouse': 'Warehouse',
    'orders.tabs.shipped': 'Shipped',
    'orders.tabs.delivered': 'Delivered',
    
    'status.pending_review': 'Pending Review',
    'status.quote_provided': 'Quote Provided',
    'status.approved': 'Approved',
    'status.purchased': 'Purchased',
    'status.warehouse_received': 'Warehouse Received',
    'status.shipped': 'Shipped',
    'status.arrived_destination': 'Arrived',
    'status.delivered': 'Delivered',
    'status.cancelled': 'Cancelled',
    'status.delayed': 'Delayed'
}

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        for k, v in translations.items():
            if k not in data:
                # If editing km.json, you could add km translated strings here
                # But for now, we inject English as fallback so it works, 
                # user can adjust Khmer strings directly if needed via their UI.
                data[k] = v
                
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
