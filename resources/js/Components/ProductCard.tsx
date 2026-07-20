import { Link, useForm } from '@inertiajs/react';
import { useCurrency } from '../Contexts/CurrencyContext';

interface Product {
    id: number;
    name: string;
    slug: string;
    short_description?: string;
    price: string;
    sale_price: string | null;
    images: { path: string, is_hover_image: boolean }[] | null;
    category?: {
        name: string;
        slug: string;
    };
    is_featured?: boolean;
}

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { formatPrice } = useCurrency();
    const { post, processing } = useForm({
        product_id: product.id,
        quantity: 1
    });

    const addToCart = (e: React.FormEvent) => {
        e.preventDefault();
        post('/cart', { preserveScroll: true });
    };

    const mainImage = product.images?.find(img => !img.is_hover_image)?.path || product.images?.[0]?.path || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';
    const hoverImage = product.images?.find(img => img.is_hover_image)?.path || mainImage;
    
    // Calculate discount
    const discount = product.sale_price ? Math.round(((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price)) * 100) : 0;

    return (
        <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[4/5] mb-5">
                
                {/* Image Swap on Hover */}
                <Link href={`/shop/${product.slug}`} className="block w-full h-full relative">
                    <img 
                        src={mainImage} 
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    />
                    <img 
                        src={hoverImage} 
                        alt={product.name + " Alternate"}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                    />
                </Link>

                {/* Wishlist Heart Top Right */}
                <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-primary transition-colors focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>
            
            <div className="text-center w-full px-2">
                <h2 className="text-[20px] font-bold text-[#0a1b2a] dark:text-white mb-2 font-serif tracking-tight truncate">
                    <Link href={`/shop/${product.slug}`} className="hover:text-brand-primary transition-colors">
                        {product.name}
                    </Link>
                </h2>
                
                <div className="flex justify-center items-center gap-3">
                    {product.sale_price ? (
                        <>
                            <del className="text-gray-500 dark:text-gray-400 text-[16px]">{formatPrice(product.price)}</del>
                            <span className="text-[#f75b5b] font-medium text-[16px]">{formatPrice(product.sale_price)}</span>
                        </>
                    ) : (
                        <span className="text-gray-600 dark:text-gray-300 font-medium text-[16px]">{formatPrice(product.price)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
