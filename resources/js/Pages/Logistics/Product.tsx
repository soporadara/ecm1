import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useState } from 'react';
import ErrorBoundary from '../../Components/ErrorBoundary';

interface ImportedProduct {
    marketplace: string;
    original_id: string;
    original_url: string;
    title: string;
    original_title: string;
    description: string;
    price_cny: number;
    price_usd: number;
    seller_name: string;
    main_image: string;
    images: string[];
    variants: any[];
    options: any[];
}

export default function ImportedProductPage({ importResult, importJob }: { importResult: any, importJob?: string }) {
    
    // Check for provider failure state first
    const isFailed = importResult?.status === 'failed' || !importResult?.success;
    const importedProduct = importResult?.data;

    // 3. NORMALIZE IMPORT DATA
    const normalizeImportedProduct = (product?: any | null) => ({
        provider: product?.provider ?? product?.marketplace ?? 'taobao',
        source_url: product?.source_url ?? product?.original_url ?? '',
        normalized_url: product?.normalized_url ?? '',
        external_product_id: product?.external_product_id ?? product?.original_id ?? '',
        selected_external_sku_id: product?.selected_external_sku_id ?? null,
        title: product?.title ?? 'Unknown Product',
        translated_title: product?.translated_title ?? '',
        short_description: product?.short_description ?? '',
        full_description: product?.full_description ?? product?.description ?? '',
        source_currency: product?.source_currency ?? 'CNY',
        source_price: product?.source_price ?? product?.price_cny ?? null,
        converted_usd_price: product?.converted_usd_price ?? product?.price_usd ?? null,
        converted_khr_price: product?.converted_khr_price ?? null,
        images: Array.isArray(product?.images) ? product.images : [],
        variants: Array.isArray(product?.variants) ? product.variants : [],
        options: Array.isArray(product?.options) ? product.options : (Array.isArray(product?.option_groups) ? product.option_groups : []),
        metadata:
            product?.metadata && typeof product.metadata === 'object' && !Array.isArray(product.metadata)
                ? product.metadata
                : {},
        seller:
            product?.seller && typeof product.seller === 'object'
                ? product.seller
                : { name: product?.seller_name || '' },
        delivery:
            product?.delivery && typeof product.delivery === 'object'
                ? product.delivery
                : {},
        prices:
            product?.prices && typeof product.prices === 'object'
                ? product.prices
                : {},
        attributes:
            product?.attributes && typeof product.attributes === 'object'
                ? product.attributes
                : {},
        main_image: product?.main_image ?? (Array.isArray(product?.images) && product.images.length > 0 ? product.images[0] : '')
    });

    const safeProduct = normalizeImportedProduct(importedProduct);

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const [remarks, setRemarks] = useState('');
    const [activeImage, setActiveImage] = useState(safeProduct.main_image);

    let currentPriceCny = safeProduct.price_cny;
    let selectedVariant = null;

    const handleAddToCart = () => {
        // Check if options are fully selected
        if (Object.keys(selectedOptions).length !== safeProduct.options.length) {
            alert('Please select all options.');
            return;
        }

        router.post('/logistics/import/confirm', {
            importJob: importJob,
            quantity: quantity,
            options: Object.values(selectedOptions),
            remarks: remarks
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                alert('Added to order successfully!');
            }
        });
    };

    if (Object.keys(selectedOptions).length === safeProduct.options.length) {
        selectedVariant = safeProduct.variants.find(v => {
            return v.attributes.every((attr: any) => selectedOptions[attr.name] === attr.value);
        });
        if (selectedVariant) {
            currentPriceCny = selectedVariant.price_cny;
            if (selectedVariant.image) {
                setActiveImage(selectedVariant.image);
            }
        }
    }



    return (
        <ErrorBoundary>
            <MainLayout title={isFailed ? 'Import Failed' : safeProduct.title} description={safeProduct.description}>
                <Head>
                    <title>{isFailed ? 'Import Failed' : safeProduct.title} — PurchaseAsia</title>
                </Head>

                <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    
                    {isFailed ? (
                        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 border border-red-100 dark:border-red-900 text-center shadow-sm">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {importResult?.error?.message || 'The provider did not return usable product information.'}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">
                                Please check the link, try again, or create a Manual Order instead.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href="/logistics/import"
                                    className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Back to Import
                                </Link>
                                <button className="px-6 py-2.5 rounded-lg border border-transparent bg-brand-primary text-white text-sm font-bold uppercase tracking-widest shadow-sm hover:bg-brand-secondary transition-colors">
                                    Manual Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header Banner */}
                            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-6 py-4 rounded-xl flex items-center gap-4 mb-8 border border-green-200 dark:border-green-800">
                                <span className="text-xl">✅</span>
                                <div>
                                    <p className="font-bold text-sm uppercase tracking-wider">Product Imported Successfully</p>
                                    <p className="text-xs opacity-80">This product details were fetched from <strong>{safeProduct.provider}</strong>.</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row">
                                
                                {/* Left: Images */}
                                <div className="w-full lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
                                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4 relative">
                                        <img src={activeImage} className="w-full h-full object-cover" alt="Product" />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-widest text-brand-secondary">
                                            {safeProduct.provider}
                                        </div>
                                    </div>
                                    
                                    {/* Thumbnails */}
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {safeProduct.images.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setActiveImage(img)}
                                                className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === img ? 'border-brand-primary' : 'border-transparent hover:border-gray-300'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Details & Purchasing Form */}
                                <div className="w-full lg:w-1/2 p-6 lg:p-10">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-brand-secondary dark:text-white mb-2 leading-tight">
                                        {safeProduct.title}
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-serif italic">
                                        {safeProduct.original_title}
                                    </p>

                                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 mb-8">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-3xl font-bold text-brand-primary font-serif">¥ {currentPriceCny.toFixed(2)}</span>
                                            <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">CNY</span>
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">Estimated: ${((currentPriceCny * 1.05) / 7.2).toFixed(2)} USD</p>
                                    </div>

                                    <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }} className="space-y-6">
                                        
                                        {/* Options Selection */}
                                        {safeProduct.options.map((option, optIdx) => (
                                            <div key={optIdx}>
                                                <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3">
                                                    {option.name}
                                                </label>
                                                <div className="flex flex-wrap gap-3">
                                                    {option.values.map((val: string, valIdx: number) => {
                                                        const isSelected = selectedOptions[option.name] === val;
                                                        return (
                                                            <button
                                                                key={valIdx}
                                                                type="button"
                                                                onClick={() => setSelectedOptions({ ...selectedOptions, [option.name]: val })}
                                                                className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                                                    isSelected 
                                                                        ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-[0_0_0_1px_rgba(220,38,38,1)]' 
                                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                                }`}
                                                            >
                                                                {val}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Quantity & Remarks */}
                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex gap-6 mb-6">
                                                <div>
                                                    <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3">Quantity</label>
                                                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 h-12 w-32">
                                                        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-500 hover:text-brand-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 h-full font-bold">-</button>
                                                        <input type="number" value={quantity} readOnly className="w-full text-center bg-transparent outline-none font-bold text-brand-secondary dark:text-white" />
                                                        <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-500 hover:text-brand-primary transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 h-full font-bold">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary dark:text-gray-300 mb-3">Remarks for Buyer</label>
                                                    <input 
                                                        type="text" 
                                                        value={remarks}
                                                        onChange={(e) => setRemarks(e.target.value)}
                                                        className="w-full px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-brand-secondary dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary h-12" 
                                                        placeholder="Any special instructions..." 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            Add to Purchase List
                                        </button>
                                        
                                        <p className="text-center text-xs text-gray-400 mt-4">
                                            The final price may vary slightly based on actual seller charges and domestic shipping. We will confirm before deducting your wallet.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
        </ErrorBoundary>
    );
}
