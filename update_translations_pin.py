import json
import os

locales = ['en', 'km', 'vi']
base_path = '/Applications/XAMPP/xamppfiles/htdocs/eco1/resources/js/locales'

for lang in locales:
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if lang == 'en':
            data['home']['about']['feature3']['desc'] = 'Sign in securely via Google Authentication or Password to track your personal orders.'
        elif lang == 'km':
            data['home']['about']['feature3']['desc'] = 'ចូលដោយសុវត្ថិភាពតាមរយៈ Google ឬ លេខសម្ងាត់ ដើម្បីតាមដានការបញ្ជាទិញផ្ទាល់ខ្លួនរបស់អ្នក។'
        elif lang == 'vi':
            data['home']['about']['feature3']['desc'] = 'Đăng nhập an toàn qua Google hoặc Mật khẩu để theo dõi các đơn hàng cá nhân của bạn.'
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
