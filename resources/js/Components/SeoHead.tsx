import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string;
}

export default function SeoHead({ title, description, image, keywords }: SeoHeadProps) {
    const { seo_settings }: any = usePage().props;

    const baseTitle = seo_settings?.meta_title || 'Pengu Store';
    const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const finalDescription = description || seo_settings?.meta_description || 'Welcome to our premium e-commerce store.';
    const finalKeywords = keywords || seo_settings?.meta_keywords || '';
    const finalImage = image || seo_settings?.og_image || '';
    const twitterHandle = seo_settings?.twitter_handle || '';

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": baseTitle,
        "image": finalImage || "https://mvmlogistics.asia/logo.png",
        "url": "https://mvmlogistics.asia",
        "email": "info@mvmlogistics.asia",
        "telephone": ["+855317669555", "+84813308055"],
        "areaServed": ["Cambodia", "Vietnam"]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Cross-Border Logistics",
        "provider": {
            "@type": "LocalBusiness",
            "name": baseTitle
        },
        "description": "Proxy purchasing, customs clearance, and package tracking from China/Vietnam to Cambodia."
    };

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {finalKeywords && <meta name="keywords" content={finalKeywords} />}
            
            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            {finalImage && <meta property="og:image" content={finalImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            {finalImage && <meta name="twitter:image" content={finalImage} />}
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

            {/* JSON-LD Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        </Head>
    );
}
