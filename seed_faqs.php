<?php

use Illuminate\Support\Facades\DB;

$faqs = [
    [
        'question_en' => '1. What is MVM Logistics?',
        'question_km' => '1. តើ MVM Logistics គឺជាអ្វី?',
        'question_vi' => '1. MVM Logistics là gì?',
        'answer_en' => 'MVM Logistics is a cross-border logistics and e-commerce platform that helps you import products from international marketplaces like Taobao, 1688, Tmall, and JD easily and securely.',
        'answer_km' => 'MVM Logistics គឺជាវេទិកាដឹកជញ្ជូន និងពាណិជ្ជកម្មអេឡិចត្រូនិកឆ្លងដែន ដែលជួយអ្នកក្នុងការនាំចូលផលិតផលពីទីផ្សារអន្តរជាតិដូចជា Taobao, 1688, Tmall និង JD ដោយងាយស្រួល និងសុវត្ថិភាព។',
        'answer_vi' => 'MVM Logistics là nền tảng thương mại điện tử và hậu cần xuyên biên giới giúp bạn nhập khẩu sản phẩm từ các thị trường quốc tế như Taobao, 1688, Tmall và JD một cách dễ dàng và an toàn.',
        'sort_order' => 1,
        'is_active' => true,
    ],
    [
        'question_en' => '2. How to use the app?',
        'question_km' => '2. របៀបប្រើប្រាស់កម្មវិធី?',
        'question_vi' => '2. Cách sử dụng ứng dụng?',
        'answer_en' => 'To use the app, simply create an account, complete your profile with your shipping address, browse the supported marketplaces, and place orders directly or use the "Manual Order" feature for custom requests.',
        'answer_km' => 'ដើម្បីប្រើប្រាស់កម្មវិធី គ្រាន់តែបង្កើតគណនី បំពេញព័ត៌មានផ្ទាល់ខ្លួនជាមួយអាសយដ្ឋានដឹកជញ្ជូន ស្វែងរកទីផ្សារដែលគាំទ្រ និងបញ្ជាទិញផ្ទាល់ ឬប្រើមុខងារ "បញ្ជាទិញដោយដៃ" សម្រាប់តម្រូវការជាក់លាក់។',
        'answer_vi' => 'Để sử dụng ứng dụng, chỉ cần tạo tài khoản, hoàn tất hồ sơ với địa chỉ giao hàng, duyệt qua các thị trường được hỗ trợ và đặt hàng trực tiếp hoặc sử dụng tính năng "Đặt hàng thủ công" cho các yêu cầu tùy chỉnh.',
        'sort_order' => 2,
        'is_active' => true,
    ],
    [
        'question_en' => '3. How to create a manual order?',
        'question_km' => '3. របៀបបង្កើតការបញ្ជាទិញដោយដៃ (Manual Order)?',
        'question_vi' => '3. Cách tạo đơn hàng thủ công?',
        'answer_en' => 'Click on "Manual Order" in the menu. Paste the product link from any supported site (like Taobao), enter the product name, variant/color, price, and quantity. Our team will verify and process the order for you.',
        'answer_km' => 'ចុចលើ "ការបញ្ជាទិញដោយដៃ" នៅក្នុងម៉ឺនុយ។ ចម្លងតំណភ្ជាប់ផលិតផលពីគេហទំព័រដែលគាំទ្រ (ដូចជា Taobao) បញ្ចូលឈ្មោះផលិតផល ប្រភេទ/ពណ៌ តម្លៃ និងបរិមាណ។ ក្រុមការងារយើងខ្ញុំនឹងពិនិត្យ និងដំណើរការបញ្ជាទិញជូនអ្នក។',
        'answer_vi' => 'Nhấp vào "Đặt hàng thủ công" trong menu. Dán liên kết sản phẩm từ bất kỳ trang web nào được hỗ trợ (như Taobao), nhập tên sản phẩm, biến thể/màu sắc, giá cả và số lượng. Nhóm của chúng tôi sẽ xác minh và xử lý đơn hàng cho bạn.',
        'sort_order' => 3,
        'is_active' => true,
    ],
    [
        'question_en' => '4. How to track my order?',
        'question_km' => '4. របៀបតាមដានការបញ្ជាទិញរបស់ខ្ញុំ?',
        'question_vi' => '4. Cách theo dõi đơn hàng của tôi?',
        'answer_en' => 'Go to "My Orders" in your dashboard. You can view the real-time status of your order (e.g., Pending, Ordered, In Warehouse, Shipping, Completed) and chat directly with our support team regarding specific orders.',
        'answer_km' => 'ចូលទៅកាន់ "ការបញ្ជាទិញរបស់ខ្ញុំ" នៅក្នុងផ្ទាំងគ្រប់គ្រងរបស់អ្នក។ អ្នកអាចមើលស្ថានភាពជាក់ស្តែងនៃការបញ្ជាទិញ (ឧ. រង់ចាំបញ្ជាទិញ, បានបញ្ជាទិញ, នៅក្នុងឃ្លាំង, កំពុងដឹកជញ្ជូន, បានបញ្ចប់) និងជជែកផ្ទាល់ជាមួយក្រុមការងារគាំទ្ររបស់យើង។',
        'answer_vi' => 'Vào "Đơn hàng của tôi" trong bảng điều khiển. Bạn có thể xem trạng thái thời gian thực của đơn hàng (VD: Đang chờ, Đã đặt, Tại kho, Đang giao, Đã hoàn thành) và trò chuyện trực tiếp với nhóm hỗ trợ của chúng tôi.',
        'sort_order' => 4,
        'is_active' => true,
    ],
    [
        'question_en' => '5. What are the shipping rates?',
        'question_km' => '5. តើតម្លៃសេវាដឹកជញ្ជូនមានប៉ុន្មាន?',
        'question_vi' => '5. Phí vận chuyển là bao nhiêu?',
        'answer_en' => 'Shipping rates depend on the weight, dimensions, and destination of the package. You can view detailed shipping rates in the "Shipping Rates" section of our website.',
        'answer_km' => 'តម្លៃសេវាដឹកជញ្ជូនអាស្រ័យលើទម្ងន់ ទំហំ និងគោលដៅនៃកញ្ចប់ទំនិញ។ អ្នកអាចមើលតម្លៃសេវាដឹកជញ្ជូនលម្អិតនៅក្នុងផ្នែក "តម្លៃដឹកជញ្ជូន" នៃគេហទំព័ររបស់យើង។',
        'answer_vi' => 'Phí vận chuyển phụ thuộc vào trọng lượng, kích thước và điểm đến của gói hàng. Bạn có thể xem chi tiết phí vận chuyển trong phần "Phí Vận chuyển" trên trang web của chúng tôi.',
        'sort_order' => 5,
        'is_active' => true,
    ],
    [
        'question_en' => '6. Which warehouses are available?',
        'question_km' => '6. តើមានឃ្លាំងស្តុកទំនិញនៅទីណាខ្លះ?',
        'question_vi' => '6. Có những kho hàng nào?',
        'answer_en' => 'We currently operate international receiving warehouses in China (Guangzhou, Yiwu) and local distribution hubs in Cambodia. Check the "Warehouses" page for specific addresses to send your packages to.',
        'answer_km' => 'បច្ចុប្បន្នយើងមានឃ្លាំងទទួលទំនិញអន្តរជាតិនៅប្រទេសចិន (ក្វាងចូវ អុីវូ) និងឃ្លាំងចែកចាយក្នុងស្រុកនៅកម្ពុជា។ សូមពិនិត្យមើលទំព័រ "ឃ្លាំង" សម្រាប់អាសយដ្ឋានជាក់លាក់ដើម្បីផ្ញើកញ្ចប់ទំនិញរបស់អ្នក។',
        'answer_vi' => 'Hiện tại chúng tôi có các kho nhận hàng quốc tế tại Trung Quốc (Quảng Châu, Nghĩa Ô) và các trung tâm phân phối địa phương tại Campuchia. Kiểm tra trang "Kho hàng" để biết địa chỉ cụ thể gửi hàng.',
        'sort_order' => 6,
        'is_active' => true,
    ],
    [
        'question_en' => '7. How to contact support?',
        'question_km' => '7. របៀបទំនាក់ទំនងសេវាអតិថិជន?',
        'question_vi' => '7. Cách liên hệ hỗ trợ?',
        'answer_en' => 'You can contact our support team through this Telegram Bot by typing your message, or by using the Contact Form on our website. You can also chat directly on a specific order in the app.',
        'answer_km' => 'អ្នកអាចទាក់ទងក្រុមការងារគាំទ្ររបស់យើងតាមរយៈ Telegram Bot នេះដោយវាយសាររបស់អ្នក ឬដោយប្រើទម្រង់ទំនាក់ទំនងនៅលើគេហទំព័ររបស់យើង។ អ្នកក៏អាចជជែកផ្ទាល់លើការបញ្ជាទិញជាក់លាក់ណាមួយក្នុងកម្មវិធី។',
        'answer_vi' => 'Bạn có thể liên hệ với nhóm hỗ trợ của chúng tôi qua Bot Telegram này bằng cách nhập tin nhắn, hoặc qua Biểu mẫu Liên hệ trên trang web. Bạn cũng có thể trò chuyện trực tiếp trên một đơn hàng cụ thể trong ứng dụng.',
        'sort_order' => 7,
        'is_active' => true,
    ],
    [
        'question_en' => '8. Are there prohibited items?',
        'question_km' => '8. តើមានទំនិញហាមឃាត់ដែរឬទេ?',
        'question_vi' => '8. Có mặt hàng cấm nào không?',
        'answer_en' => 'Yes, we do not ship illegal items, weapons, hazardous materials, flammables, or perishables. Please check our "Prohibited Items" page for the full list of restricted goods.',
        'answer_km' => 'បាទ យើងមិនដឹកជញ្ជូនទំនិញខុសច្បាប់ អាវុធ សារធាតុគ្រោះថ្នាក់ វត្ថុងាយឆេះ ឬទំនិញខូចគុណភាពឡើយ។ សូមពិនិត្យមើលទំព័រ "ទំនិញហាមឃាត់" របស់យើងសម្រាប់បញ្ជីទំនិញដែលត្រូវបានរឹតបន្តឹង។',
        'answer_vi' => 'Có, chúng tôi không vận chuyển các mặt hàng bất hợp pháp, vũ khí, vật liệu nguy hiểm, chất dễ cháy hoặc hàng dễ hỏng. Vui lòng kiểm tra trang "Mặt hàng Cấm" để biết danh sách đầy đủ.',
        'sort_order' => 8,
        'is_active' => true,
    ],
    [
        'question_en' => '9. How to pay for my order?',
        'question_km' => '9. របៀបបង់ប្រាក់សម្រាប់ការបញ្ជាទិញ?',
        'question_vi' => '9. Cách thanh toán cho đơn hàng?',
        'answer_en' => 'We accept multiple payment methods including ABA Bank, KHQR, and local bank transfers. You will be prompted to make a payment when your order quote is approved.',
        'answer_km' => 'យើងទទួលយកវិធីសាស្រ្តបង់ប្រាក់ជាច្រើន រួមមាន ABA Bank, KHQR និងការផ្ទេរប្រាក់តាមធនាគារក្នុងស្រុក។ អ្នកនឹងត្រូវបានស្នើសុំឱ្យបង់ប្រាក់នៅពេលដែលតម្លៃបញ្ជាទិញរបស់អ្នកត្រូវបានអនុម័ត។',
        'answer_vi' => 'Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm ABA Bank, KHQR và chuyển khoản ngân hàng địa phương. Bạn sẽ được yêu cầu thanh toán khi báo giá đơn hàng được duyệt.',
        'sort_order' => 9,
        'is_active' => true,
    ],
    [
        'question_en' => '10. How long does shipping take?',
        'question_km' => '10. តើការដឹកជញ្ជូនចំណាយពេលប៉ុន្មាន?',
        'question_vi' => '10. Thời gian vận chuyển mất bao lâu?',
        'answer_en' => 'Standard shipping from our China warehouse to Cambodia usually takes 3 to 7 business days, depending on customs clearance and the specific service chosen.',
        'answer_km' => 'ការដឹកជញ្ជូនស្តង់ដារពីឃ្លាំងប្រទេសចិនរបស់យើងមកកម្ពុជា ជាធម្មតាចំណាយពេលពី 3 ទៅ 7 ថ្ងៃធ្វើការ អាស្រ័យលើការបោសសំអាតគយ និងសេវាកម្មជាក់លាក់ដែលបានជ្រើសរើស។',
        'answer_vi' => 'Vận chuyển tiêu chuẩn từ kho Trung Quốc đến Campuchia thường mất 3 đến 7 ngày làm việc, tùy thuộc vào thủ tục hải quan và dịch vụ được chọn.',
        'sort_order' => 10,
        'is_active' => true,
    ],
];

DB::table('telegram_faqs')->truncate();

foreach ($faqs as $faq) {
    DB::table('telegram_faqs')->insert(array_merge($faq, [
        'created_at' => now(),
        'updated_at' => now(),
    ]));
}

echo "Seeded " . count($faqs) . " FAQs successfully.\n";
exit;
