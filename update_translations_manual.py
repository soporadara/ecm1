import json
import os

translations = {
    'km.json': {
        'nav.contact_us': 'ទំនាក់ទំនងយើងខ្ញុំ',
        'login.continue_telegram': 'បន្តជាមួយ Telegram',
        'login.signup_telegram': 'បង្កើតគណនីជាមួយ Telegram',
        'login.signup_email': 'បង្កើតគណនីជាមួយអ៊ីមែល',
        'login.signup_phone': 'បង្កើតគណនីជាមួយលេខទូរស័ព្ទ',
        'login.email_or_phone': 'អាសយដ្ឋានអ៊ីមែល ឬលេខទូរស័ព្ទ'
    },
    'vi.json': {
        'nav.contact_us': 'Liên hệ với chúng tôi',
        'login.continue_telegram': 'Tiếp tục với Telegram',
        'login.signup_telegram': 'Đăng ký với Telegram',
        'login.signup_email': 'Đăng ký bằng Email',
        'login.signup_phone': 'Đăng ký bằng điện thoại',
        'login.email_or_phone': 'Địa chỉ email hoặc số điện thoại'
    }
}

for file, data in translations.items():
    filepath = os.path.join('/Applications/XAMPP/xamppfiles/htdocs/eco1/resources/js/locales', file)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = json.load(f)
    except FileNotFoundError:
        content = {}
    
    # Simple dot notation assignment
    for key, val in data.items():
        content[key] = val
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=4)
        
print("Translations added successfully.")
