const fs = require('fs');

const files = [
    'resources/js/locales/en.json',
    'resources/js/locales/km.json'
];

const translations = {
    'profile': {
        'address': {
            'title': 'Address & Contact Apps',
            'line1': 'Address line 1',
            'line2': 'Address line 2',
            'city': 'City',
            'province': 'Province',
            'postal_code': 'Postal code',
            'country_code': 'KH',
            'telegram': '@telegram',
            'whatsapp': 'WhatsApp number',
            'notes': 'Address notes',
            'save': 'Save Address'
        }
    },
    'dashboard': {
        'title': 'Dashboard',
        'head': 'My Dashboard',
        'heading': 'Customer Dashboard',
        'customer_id': 'Customer ID',
        'create_manual_order': 'Create Manual Order',
        'logout': 'Logout',
        'stats': {
            'total': 'Total Orders',
            'pending': 'Pending Review',
            'delivering': 'Out for Delivery',
            'completed': 'Completed'
        },
        'shortcuts': {
            'manual_order': 'Create Manual Order',
            'manual_desc': 'Submit products you would like our team to purchase.',
            'my_orders': 'My Orders',
            'orders_desc': 'View active, completed, delayed, and cancelled orders.',
            'receipts': 'Receipts',
            'receipts_desc': 'View and download your completed order receipts.',
            'support': 'Contact Support',
            'support_desc': 'Ask our logistics team for help.'
        },
        'recent_orders': 'Recent Orders',
        'view_all': 'View All >',
        'order_number': 'Order Number',
        'date': 'Date',
        'items': 'Items',
        'items_count': 'items',
        'status': 'Status',
        'action': 'Action',
        'view_details': 'View Details',
        'no_orders': 'No orders found.',
        'create_first': 'Create your first order'
    },
    'contact': {
        'title': 'Contact Us',
        'description': 'Contact support for manual orders, tracking, receipts, and account help.',
        'support_center': 'Support Center',
        'support_text': 'Reach our support team through your preferred channel for manual orders, delivery, receipts, and account help.',
        'about_us': 'About Us',
        'vietnam_office': 'Vietnam Office',
        'open_map': 'Open Map',
        'cambodia_office': 'Cambodia Office'
    },
    'manual_order': {
        'title': 'Create Manual Order',
        'customer_info': 'Customer Information',
        'delivery_address': 'Delivery Address',
        'requested_products': 'Requested Products',
        'additional_notes': 'Additional Notes',
        'request_summary': 'Request Summary',
        'product_urls': 'Product URLs',
        'add_url': '+ Add Another URL',
        'view': 'View',
        'remove': 'Remove'
    },
    'orders': {
        'title': 'My Orders',
        'search': 'Search orders...',
        'no_orders': 'No Orders Found',
        'no_orders_msg': "You don't have any orders matching this status.",
        'track': 'Track',
        'contact': 'Contact',
        'items': 'Items',
        'view_details': 'View Details',
        'tabs': {
            'all': 'All',
            'progress': 'Progress',
            'purchased': 'Purchased',
            'warehouse': 'Warehouse',
            'shipped': 'Shipped',
            'delivered': 'Delivered'
        }
    },
    'status': {
        'pending_review': 'Pending Review',
        'quote_provided': 'Quote Provided',
        'approved': 'Approved',
        'purchased': 'Purchased',
        'warehouse_received': 'Warehouse Received',
        'shipped': 'Shipped',
        'arrived_destination': 'Arrived',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled',
        'delayed': 'Delayed',
        'Unpaid': 'Unpaid',
        'Paid': 'Paid',
        'Partial': 'Partial'
    }
};

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

for (const file of files) {
    if (fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        const newData = deepMerge(data, translations);
        fs.writeFileSync(file, JSON.stringify(newData, null, 2), 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
}
