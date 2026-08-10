import json
import os

locales = ['en', 'km', 'vi']
base_path = '/Applications/XAMPP/xamppfiles/htdocs/eco1/resources/js/locales'

for lang in locales:
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'home' not in data:
            data['home'] = {}
        if 'about' not in data['home']:
            data['home']['about'] = {}
            
        if lang == 'en':
            data['home']['about'] = {
                'eyebrow': 'Official Application Purpose',
                'title': 'About MVM Logistics',
                'description': '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> is a premier cross-border logistics and manual order management application. Our platform empowers users to request product purchasing from international suppliers, calculate shipping costs, track real-time delivery statuses from warehouse arrival to destination, and manage payment receipts securely.',
                'feature1': { 'title': 'Cross-Border Logistics', 'desc': 'Streamlined freight forwarding and customs clearing for imported goods.' },
                'feature2': { 'title': 'Manual Product Sourcing', 'desc': 'Submit manual buy requests and let our team handle purchasing and payment confirmation.' },
                'feature3': { 'title': 'Secure Account Access', 'desc': 'Sign in securely via Google Authentication or Phone PIN to track your personal orders.' }
            }
            if 'footer' not in data: data['footer'] = {}
            data['footer']['prohibited_items'] = 'Prohibited Items'
            data['footer']['privacy_policy'] = 'Privacy Policy'
            data['footer']['terms_of_service'] = 'Terms of Service'
        elif lang == 'km':
            data['home']['about'] = {
                'eyebrow': 'គោលបំណងនៃការប្រើប្រាស់ផ្លូវការ',
                'title': 'អំពី MVM Logistics',
                'description': '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> គឺជាកម្មវិធីគ្រប់គ្រងការបញ្ជាទិញដោយដៃនិងភស្តុភារឆ្លងដែនឈានមុខគេ។ វេទិការបស់យើងផ្តល់សិទ្ធិអំណាចដល់អ្នកប្រើប្រាស់ក្នុងការស្នើសុំការទិញផលិតផលពីអ្នកផ្គត់ផ្គង់អន្តរជាតិ គណនាថ្លៃដឹកជញ្ជូន តាមដានស្ថានភាពដឹកជញ្ជូនក្នុងពេលជាក់ស្តែងពីការមកដល់ឃ្លាំងរហូតដល់គោលដៅ និងគ្រប់គ្រងវិក័យបត្រទូទាត់ប្រាក់ដោយសុវត្ថិភាព។',
                'feature1': { 'title': 'ភស្តុភារឆ្លងដែន', 'desc': 'ជួយសម្រួលដល់ការបញ្ជូនទំនិញ និងការបញ្ចេញគយសម្រាប់ទំនិញនាំចូល។' },
                'feature2': { 'title': 'ការស្វែងរកផលិតផលដោយដៃ', 'desc': 'ដាក់ស្នើសំណើទិញដោយដៃ ហើយអនុញ្ញាតឱ្យក្រុមការងាររបស់យើងរៀបចំការទិញ និងបញ្ជាក់ការទូទាត់។' },
                'feature3': { 'title': 'ការចូលប្រើគណនីដោយសុវត្ថិភាព', 'desc': 'ចូលដោយសុវត្ថិភាពតាមរយៈ Google ឬ PIN ទូរស័ព្ទ ដើម្បីតាមដានការបញ្ជាទិញផ្ទាល់ខ្លួនរបស់អ្នក។' }
            }
            if 'footer' not in data: data['footer'] = {}
            data['footer']['prohibited_items'] = 'ទំនិញហាមឃាត់'
            data['footer']['privacy_policy'] = 'គោលការណ៍ឯកជនភាព'
            data['footer']['terms_of_service'] = 'លក្ខខណ្ឌនៃសេវាកម្ម'
        elif lang == 'vi':
            data['home']['about'] = {
                'eyebrow': 'Mục đích ứng dụng chính thức',
                'title': 'Về MVM Logistics',
                'description': '<strong class="text-gray-900 dark:text-white font-bold">MVM Logistics</strong> là ứng dụng quản lý đơn hàng thủ công và logistics xuyên biên giới hàng đầu. Nền tảng của chúng tôi hỗ trợ người dùng yêu cầu mua sản phẩm từ các nhà cung cấp quốc tế, tính toán chi phí vận chuyển, theo dõi trạng thái giao hàng theo thời gian thực từ khi đến kho đến điểm đích và quản lý biên lai thanh toán một cách an toàn.',
                'feature1': { 'title': 'Logistics xuyên biên giới', 'desc': 'Tối ưu hóa việc giao nhận hàng hóa và thông quan cho hàng hóa nhập khẩu.' },
                'feature2': { 'title': 'Tìm kiếm sản phẩm thủ công', 'desc': 'Gửi yêu cầu mua hàng thủ công và để đội ngũ của chúng tôi xử lý việc mua hàng cũng như xác nhận thanh toán.' },
                'feature3': { 'title': 'Truy cập tài khoản an toàn', 'desc': 'Đăng nhập an toàn qua Google hoặc mã PIN điện thoại để theo dõi các đơn hàng cá nhân của bạn.' }
            }
            if 'footer' not in data: data['footer'] = {}
            data['footer']['prohibited_items'] = 'Hàng hoá cấm'
            data['footer']['privacy_policy'] = 'Chính sách bảo mật'
            data['footer']['terms_of_service'] = 'Điều khoản dịch vụ'
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
