import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import ProductCard from '../../Components/ProductCard';
import QuickCheckoutModal from '../../Components/QuickCheckoutModal';
import { useState, useEffect } from 'react';

export default function Show({ product, relatedProducts }: any) {
    const { auth } = usePage().props as any;
    
    // Cart Form
    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        product_variant_id: null as number | null,
        quantity: 1
    });

    // Review Form
    const reviewForm = useForm({
        rating: 5,
        comment: ''
    });

    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('description');
    
    // Image Gallery State
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    
    // Quick Checkout State
    const [isQuickCheckoutOpen, setIsQuickCheckoutOpen] = useState(false);

    // Extract unique sizes and colors
    const variants = product.variants || [];
    const sizes = Array.from(new Set(variants.map((v: any) => v.size).filter(Boolean)));
    const colors = Array.from(new Set(variants.map((v: any) => v.color).filter(Boolean)));
    
    // Auto-select if only one option exists
    useEffect(() => {
        if (sizes.length === 1 && !selectedSize) setSelectedSize(sizes[0] as string);
        if (colors.length === 1 && !selectedColor) setSelectedColor(colors[0] as string);
    }, [sizes, colors]);

    // Find active variant based on selection
    const activeVariant = variants.find((v: any) => {
        const sizeMatch = sizes.length === 0 || v.size === selectedSize;
        const colorMatch = colors.length === 0 || v.color === selectedColor;
        return sizeMatch && colorMatch;
    });

    useEffect(() => {
        setData('quantity', qty);
        if (activeVariant) {
            setData('product_variant_id', activeVariant.id);
        } else {
            setData('product_variant_id', null);
        }
    }, [qty, activeVariant]);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val > 0) setQty(val);
    };

    const addToCart = (e: React.FormEvent) => {
        e.preventDefault();
        if (variants.length > 0 && !activeVariant) {
            alert('Please select valid options.');
            return;
        }
        post('/cart', { preserveScroll: true });
    };

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        reviewForm.post(`/products/${product.id}/reviews`, {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset();
                alert('Review submitted successfully!');
            }
        });
    };

    // Gallery helpers
    const images = product.images?.length > 0 ? product.images : [{ id: 0, path: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' }];
    
    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const displayPrice = activeVariant?.price || product.sale_price || product.price;
    const stockToDisplay = activeVariant ? activeVariant.stock : product.stock;
    const discount = product.sale_price ? Math.round(((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price)) * 100) : 0;

    return (
        <MainLayout>
            <Head title={product.seo_title || product.name} />
            
            {/* Breadcrumbs */}
            <div className="bg-gray-100 dark:bg-gray-900 py-6 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <Link href="/" className="hover:text-brand-primary">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-brand-primary">Shop</Link>
                        <span>/</span>
                        {product.category && (
                            <>
                                <Link href={`/shop?category=${product.category.slug}`} className="hover:text-brand-primary">{product.category.name}</Link>
                                <span>/</span>
                            </>
                        )}
                        <span className="text-gray-900 dark:text-gray-200">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* Product Image Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-4">
                        <div 
                            className="w-full relative bg-gray-50 dark:bg-gray-800 rounded overflow-hidden cursor-zoom-in group flex items-center justify-center max-h-[500px]"
                            onClick={() => setIsLightboxOpen(true)}
                            style={{ minHeight: '400px' }}
                        >
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider z-10">
                                    -{discount}% Off
                                </span>
                            )}
                            <img 
                                src={images[activeImageIndex].path} 
                                alt={product.name} 
                                className="max-w-full max-h-[500px] object-contain transition-opacity duration-300"
                            />
                            {/* Hover Enlarge Icon */}
                            <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <div className="bg-white/80 dark:bg-black/60 rounded-full p-3 shadow-lg">
                                    <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 no-scrollbar">
                                {images.map((img: any, idx: number) => (
                                    <button 
                                        key={img.id || idx} 
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`w-20 md:w-full aspect-[4/5] shrink-0 border-2 rounded overflow-hidden transition-colors ${activeImageIndex === idx ? 'border-brand-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100'}`}
                                    >
                                        <img src={img.path} className="w-full h-full object-cover bg-gray-100 dark:bg-gray-800" alt="thumbnail" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="w-full lg:w-1/2">
                        {product.category && (
                            <div className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-2">
                                {product.category.name}
                            </div>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-secondary dark:text-white mb-4 font-serif tracking-tight leading-tight transition-colors duration-300">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            {product.sale_price && !activeVariant?.price ? (
                                <>
                                    <span className="text-3xl font-bold text-brand-primary">${product.sale_price}</span>
                                    <del className="text-xl text-gray-400 dark:text-gray-500">${product.price}</del>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-brand-secondary dark:text-white">${displayPrice}</span>
                            )}
                        </div>

                        {product.short_description && (
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light transition-colors duration-300">
                                {product.short_description}
                            </p>
                        )}

                        <div className="space-y-6 mb-8 border-t border-gray-100 dark:border-gray-800 pt-8 transition-colors duration-300">
                            {/* Color Selection */}
                            {colors.length > 0 && (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-bold text-brand-secondary dark:text-gray-200 uppercase tracking-wider">Color: {selectedColor || 'Select'}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((color: any) => (
                                            <button 
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-6 py-3 border text-sm font-medium transition-colors ${selectedColor === color ? 'border-brand-primary text-brand-primary bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary bg-white dark:bg-gray-800'}`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            {sizes.length > 0 && (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-bold text-brand-secondary dark:text-gray-200 uppercase tracking-wider">Size: {selectedSize || 'Select'}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size: any) => (
                                            <button 
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-[3rem] h-12 px-4 flex items-center justify-center border text-sm font-medium transition-colors ${selectedSize === size ? 'border-brand-primary text-brand-primary bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary bg-white dark:bg-gray-800'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 py-4 mb-8">
                            <div className="flex border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-14 w-full sm:w-32 items-center transition-colors duration-300">
                                <button 
                                    className="px-4 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary text-xl h-full flex items-center"
                                    onClick={() => qty > 1 && setQty(qty - 1)}
                                >-</button>
                                <input 
                                    type="number" 
                                    className="w-full text-center focus:outline-none font-bold text-lg bg-transparent dark:text-white"
                                    value={qty}
                                    onChange={handleQtyChange}
                                    min="1"
                                />
                                <button 
                                    className="px-4 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary text-xl h-full flex items-center"
                                    onClick={() => setQty(qty + 1)}
                                >+</button>
                            </div>

                            <button 
                                onClick={() => setIsQuickCheckoutOpen(true)}
                                disabled={stockToDisplay < 1 || (variants.length > 0 && !activeVariant)}
                                className="flex-1 h-14 bg-[#f75b5b] text-white font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:shadow-none"
                            >
                                {stockToDisplay < 1 ? 'Out of Stock' : (variants.length > 0 && !activeVariant) ? 'Select Options' : 'Buy Now'}
                            </button>
                            
                            <button 
                                onClick={addToCart}
                                disabled={processing || stockToDisplay < 1 || (variants.length > 0 && !activeVariant)}
                                className="flex-1 h-14 bg-gray-900 dark:bg-gray-700 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>

                        {/* Product Metas */}
                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-3 mb-10 py-6 border-t border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <p className="flex"><span className="w-32 font-medium text-brand-secondary dark:text-gray-300">Availability:</span> {stockToDisplay > 0 ? <span className="text-green-600 dark:text-green-400">{stockToDisplay} in stock</span> : <span className="text-red-600 dark:text-red-400">Out of stock</span>}</p>
                            <p className="flex"><span className="w-32 font-medium text-brand-secondary dark:text-gray-300">SKU:</span> {activeVariant?.sku || product.sku}</p>
                            {product.barcode && <p className="flex"><span className="w-32 font-medium text-brand-secondary dark:text-gray-300">Barcode:</span> {product.barcode}</p>}
                        </div>

                        {/* Accordion Tabs */}
                        <div className="border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                            <div className="border-b border-gray-200 dark:border-gray-800">
                                <button 
                                    onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}
                                    className="w-full flex justify-between items-center py-5 text-left font-bold text-brand-secondary dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors uppercase tracking-wider text-sm"
                                >
                                    Description
                                    <span className="text-xl font-light">{activeTab === 'description' ? '-' : '+'}</span>
                                </button>
                                {activeTab === 'description' && (
                                    <div className="pb-6 prose dark:prose-invert prose-sm text-gray-600 dark:text-gray-300 max-w-none transition-colors duration-300" dangerouslySetInnerHTML={{ __html: product.description || 'Premium quality product.' }} />
                                )}
                            </div>

                            <div className="border-b border-gray-200 dark:border-gray-800">
                                <button 
                                    onClick={() => setActiveTab(activeTab === 'reviews' ? '' : 'reviews')}
                                    className="w-full flex justify-between items-center py-5 text-left font-bold text-brand-secondary dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors uppercase tracking-wider text-sm"
                                >
                                    Reviews ({product.reviews?.length || 0})
                                    <span className="text-xl font-light">{activeTab === 'reviews' ? '-' : '+'}</span>
                                </button>
                                {activeTab === 'reviews' && (
                                    <div className="pb-6">
                                        {/* Review List */}
                                        <div className="space-y-6 mb-8">
                                            {product.reviews && product.reviews.length > 0 ? (
                                                product.reviews.map((review: any) => (
                                                    <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="font-bold text-gray-900 dark:text-white">{review.user?.name || 'User'}</div>
                                                            <div className="flex text-yellow-400 text-sm">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`} viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{review.comment}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
                                            )}
                                        </div>

                                        {/* Write a Review */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg transition-colors duration-300">
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Write a Review</h4>
                                            {auth.user ? (
                                                <form onSubmit={submitReview} className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                                                        <select 
                                                            className="w-full sm:w-1/3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm transition-colors"
                                                            value={reviewForm.data.rating}
                                                            onChange={e => reviewForm.setData('rating', parseInt(e.target.value))}
                                                        >
                                                            <option value={5}>5 Stars - Excellent</option>
                                                            <option value={4}>4 Stars - Good</option>
                                                            <option value={3}>3 Stars - Average</option>
                                                            <option value={2}>2 Stars - Poor</option>
                                                            <option value={1}>1 Star - Terrible</option>
                                                        </select>
                                                        {reviewForm.errors.rating && <p className="text-red-500 text-xs mt-1">{reviewForm.errors.rating}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comment</label>
                                                        <textarea 
                                                            rows={4}
                                                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm transition-colors"
                                                            value={reviewForm.data.comment}
                                                            onChange={e => reviewForm.setData('comment', e.target.value)}
                                                            placeholder="What did you like or dislike?"
                                                        />
                                                        {reviewForm.errors.comment && <p className="text-red-500 text-xs mt-1">{reviewForm.errors.comment}</p>}
                                                    </div>
                                                    <button 
                                                        type="submit" 
                                                        disabled={reviewForm.processing}
                                                        className="px-6 py-2 bg-brand-secondary text-white text-sm font-bold tracking-widest uppercase hover:bg-brand-primary transition-colors rounded disabled:opacity-50"
                                                    >
                                                        {reviewForm.processing ? 'Submitting...' : 'Submit Review'}
                                                    </button>
                                                </form>
                                            ) : (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    You must be <Link href="/login" className="text-brand-primary hover:underline">logged in</Link> to post a review.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16 transition-colors duration-300">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-center text-brand-secondary dark:text-white mb-10 font-serif">
                            You May Also Like
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct: any) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                    <button 
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
                        aria-label="Close lightbox"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {images.length > 1 && (
                        <button 
                            onClick={prevImage}
                            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50"
                            aria-label="Previous image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                    )}

                    <div className="w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 flex items-center justify-center cursor-default">
                        <img 
                            src={images[activeImageIndex].path} 
                            alt={product.name} 
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {images.length > 1 && (
                        <button 
                            onClick={nextImage}
                            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50"
                            aria-label="Next image"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    )}
                    
                    {/* Lightbox thumbnav */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                            {images.map((img: any, idx: number) => (
                                <button 
                                    key={img.id || idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-16 h-16 shrink-0 border-2 rounded transition-colors ${activeImageIndex === idx ? 'border-brand-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={img.path} className="w-full h-full object-cover" alt="thumbnail" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            <QuickCheckoutModal 
                isOpen={isQuickCheckoutOpen}
                onClose={() => setIsQuickCheckoutOpen(false)}
                product={product}
                variant={activeVariant}
                quantity={qty}
            />
        </MainLayout>
    );
}
