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
        </Head>
    );
}
