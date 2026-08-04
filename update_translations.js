const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'js', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const updates = {
    'en.json': { about_company: 'About our company', cambodia_office: 'Cambodia Office' },
    'km.json': { about_company: 'អំពីក្រុមហ៊ុនរបស់យើង', cambodia_office: 'ការិយាល័យកម្ពុជា' },
    'vi.json': { about_company: 'Về công ty chúng tôi', cambodia_office: 'Văn phòng Campuchia' }
};

for (const file of files) {
    const filePath = path.join(localesDir, file);
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.contact) {
        data.contact = {};
    }
    
    if (updates[file]) {
        data.contact.about_company = updates[file].about_company;
        data.contact.cambodia_office = updates[file].cambodia_office;
    } else {
        // Fallback for other languages
        data.contact.about_company = updates['en.json'].about_company;
        data.contact.cambodia_office = updates['en.json'].cambodia_office;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
}
