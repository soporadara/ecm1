const fs = require('fs');

const dictionary = {
  "en": {
    "nav": {
      "home": "Home",
      "shop": "Shop",
      "about": "About Us",
      "blog": "Blog",
      "contact": "Contact",
      "free_shipping": "Free Shipping on orders over $50"
    },
    "home": {
      "shop_now": "Shop Now",
      "view_lookbook": "View Lookbook",
      "explore_collection": "Explore Collection",
      "view_all": "View All",
      "discover_now": "Discover Now",
      "shop_the_sale": "Shop The Sale",
      "shop_the_look": "Shop The Look"
    },
    "benefits": {
      "free_shipping": "Free Shipping",
      "free_shipping_desc": "On all orders over $150",
      "secure_payment": "Secure Payment",
      "secure_payment_desc": "100% secure checkout",
      "easy_returns": "Easy Returns",
      "easy_returns_desc": "30 day return policy",
      "support": "24/7 Support",
      "support_desc": "Dedicated customer support"
    },
    "newsletter": {
      "title": "Join Our Newsletter",
      "subtitle": "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
      "placeholder": "Enter your email address",
      "button": "Subscribe",
      "footer_desc": "Subscribe to receive updates, access to exclusive deals, and more."
    },
    "footer": {
      "desc": "Discover the latest trends in fashion and style. Our curated collection brings you the finest quality apparel, designed to make you look and feel exceptional every day.",
      "shop": "Shop",
      "company": "Company",
      "about_us": "About Us",
      "careers": "Careers",
      "our_blog": "Our Blog",
      "contact_us": "Contact Us",
      "store_locator": "Store Locator",
      "privacy": "Privacy Policy",
      "terms": "Terms of Service",
      "rights": "All Rights Reserved."
    },
    "db": {
      "Spring Collection 2026": "Spring Collection 2026",
      "Elevate Your Everyday Style": "Elevate Your Everyday Style",
      "Shop by Category": "Shop by Category",
      "Explore our wide range of premium collections": "Explore our wide range of premium collections",
      "Women": "Women",
      "Men": "Men",
      "Accessories": "Accessories",
      "Beauty": "Beauty",
      "Trending Products": "Trending Products",
      "Handpicked for you": "Handpicked for you",
      "New Arrivals": "New Arrivals",
      "Latest additions to our collection": "Latest additions to our collection"
    }
  },
  "km": {
    "nav": {
      "home": "ទំព័រដើម",
      "shop": "ហាង",
      "about": "អំពីយើង",
      "blog": "អត្ថបទ",
      "contact": "ទំនាក់ទំនង",
      "free_shipping": "ដឹកជញ្ជូនដោយឥតគិតថ្លៃសម្រាប់តម្លៃលើសពី ៥០ ដុល្លារ"
    },
    "home": {
      "shop_now": "ទិញឥឡូវនេះ",
      "view_lookbook": "មើលកាតាឡុក",
      "explore_collection": "ស្វែងយល់ការប្រមូលម៉ូត",
      "view_all": "មើលទាំងអស់",
      "discover_now": "ស្វែងយល់ឥឡូវនេះ",
      "shop_the_sale": "ទិញទំនិញបញ្ចុះតម្លៃ",
      "shop_the_look": "ទិញម៉ូតនេះ"
    },
    "benefits": {
      "free_shipping": "ដឹកជញ្ជូនឥតគិតថ្លៃ",
      "free_shipping_desc": "រាល់ការបញ្ជាទិញលើសពី ១៥០ ដុល្លារ",
      "secure_payment": "ការទូទាត់ប្រកបដោយសុវត្ថិភាព",
      "secure_payment_desc": "សុវត្ថិភាព ១០០% ពេលទូទាត់",
      "easy_returns": "ងាយស្រួលក្នុងការប្តូរ",
      "easy_returns_desc": "គោលការណ៍ប្តូរទំនិញក្នុងរយៈពេល ៣០ ថ្ងៃ",
      "support": "សេវាកម្មអតិថិជន ២៤/៧",
      "support_desc": "ការគាំទ្រអតិថិជនប្រកបដោយការយកចិត្តទុកដាក់"
    },
    "newsletter": {
      "title": "ចុះឈ្មោះទទួលព្រឹត្តិបត្រព័ត៌មាន",
      "subtitle": "ចុះឈ្មោះដើម្បីទទួលបានការផ្តល់ជូនពិសេស រង្វាន់ និងប្រូម៉ូសិន។",
      "placeholder": "បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក",
      "button": "ជាវព័ត៌មាន",
      "footer_desc": "ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានថ្មីៗ និងការបញ្ចុះតម្លៃផ្តាច់មុខ។"
    },
    "footer": {
      "desc": "ស្វែងយល់ពីនិន្នាការចុងក្រោយបំផុតនៃម៉ូតសម្លៀកបំពាក់។ ការប្រមូលម៉ូតរបស់យើងផ្តល់ជូននូវសម្លៀកបំពាក់គុណភាពខ្ពស់បំផុត។",
      "shop": "ហាង",
      "company": "ក្រុមហ៊ុន",
      "about_us": "អំពីយើង",
      "careers": "ឱកាសការងារ",
      "our_blog": "អត្ថបទរបស់យើង",
      "contact_us": "ទំនាក់ទំនងយើង",
      "store_locator": "ទីតាំងហាង",
      "privacy": "គោលការណ៍ឯកជនភាព",
      "terms": "លក្ខខណ្ឌនៃសេវាកម្ម",
      "rights": "រក្សាសិទ្ធិគ្រប់យ៉ាង។"
    },
    "db": {
      "Spring Collection 2026": "ម៉ូតសម្លៀកបំពាក់រដូវផ្ការីក ២០២៦",
      "Elevate Your Everyday Style": "លើកកម្ពស់ស្ទីលប្រចាំថ្ងៃរបស់អ្នក",
      "Shop by Category": "ទិញតាមប្រភេទ",
      "Explore our wide range of premium collections": "ស្វែងយល់ពីជម្រើសជាច្រើនរបស់យើង",
      "Women": "សម្លៀកបំពាក់នារី",
      "Men": "សម្លៀកបំពាក់បុរស",
      "Accessories": "គ្រឿងអលង្ការ",
      "Beauty": "សម្រស់",
      "Trending Products": "ផលិតផលកំពុងពេញនិយម",
      "Handpicked for you": "ជ្រើសរើសពិសេសសម្រាប់អ្នក",
      "New Arrivals": "ផលិតផលថ្មី",
      "Latest additions to our collection": "ការបន្ថែមថ្មីៗបំផុតចូលក្នុងការប្រមូលរបស់យើង"
    }
  },
  "zh-CN": {
    "nav": {
      "home": "首页",
      "shop": "商店",
      "about": "关于我们",
      "blog": "博客",
      "contact": "联系我们",
      "free_shipping": "满 $50 免费送货"
    },
    "home": {
      "shop_now": "立即购物",
      "view_lookbook": "查看产品图册",
      "explore_collection": "探索系列",
      "view_all": "查看全部",
      "discover_now": "立即发现",
      "shop_the_sale": "特价购物",
      "shop_the_look": "购买此造型"
    },
    "benefits": {
      "free_shipping": "免费送货",
      "free_shipping_desc": "订单满 $150 免费",
      "secure_payment": "安全付款",
      "secure_payment_desc": "100% 安全结账",
      "easy_returns": "轻松退货",
      "easy_returns_desc": "30天退货政策",
      "support": "24/7 全天候支持",
      "support_desc": "专属客户支持"
    },
    "newsletter": {
      "title": "订阅我们的新闻通讯",
      "subtitle": "订阅以获取特别优惠、免费赠品和千载难逢的交易。",
      "placeholder": "输入您的电子邮件地址",
      "button": "订阅",
      "footer_desc": "订阅以接收更新、获取独家优惠等。"
    },
    "footer": {
      "desc": "发现最新时尚潮流。我们精心挑选的系列为您带来最优质的服装，让您每天看起来都光彩照人。",
      "shop": "商店",
      "company": "公司",
      "about_us": "关于我们",
      "careers": "招贤纳士",
      "our_blog": "我们的博客",
      "contact_us": "联系我们",
      "store_locator": "寻找门店",
      "privacy": "隐私政策",
      "terms": "服务条款",
      "rights": "版权所有。"
    },
    "db": {
      "Spring Collection 2026": "2026 春季系列",
      "Elevate Your Everyday Style": "提升您的日常风格",
      "Shop by Category": "按类别购物",
      "Explore our wide range of premium collections": "探索我们广泛的优质系列",
      "Women": "女装",
      "Men": "男装",
      "Accessories": "配饰",
      "Beauty": "美容",
      "Trending Products": "热门产品",
      "Handpicked for you": "为您精选",
      "New Arrivals": "新品上市",
      "Latest additions to our collection": "我们系列的最新添加"
    }
  }
};

for (const lang in dictionary) {
  fs.writeFileSync(`resources/js/locales/${lang}.json`, JSON.stringify(dictionary[lang], null, 2));
}

console.log('Translations generated!');
