import { Link } from '@inertiajs/react';

interface MegaMenuProps {
    categories: any[];
    collections: any[];
    brands: any[];
    onClose?: () => void;
}

export default function MegaMenu({ categories, collections, brands, onClose }: MegaMenuProps) {
    const categoryImages: Record<string, string> = {
        'Men': 'https://images.unsplash.com/photo-1516826957135-7331811a5ebf?w=100&q=80',
        'Women': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&q=80',
        'Kids': 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=100&q=80',
        'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
        'Accessories': 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=100&q=80',
        'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80',
        'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&q=80',
    };
    const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80';

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50 transform origin-top transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible mt-[1px]">
            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="mb-6">
                    <h3 className="text-gray-900 font-medium text-[14px]">Accessories</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl">
                    
                    {/* All item */}
                    <Link href="/shop" prefetch={['mount', 'hover']} className="flex items-center gap-4 group/item" onClick={onClose}>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 group-hover/item:shadow-md transition-shadow">
                            <img src={defaultImage} alt="All" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform" />
                        </div>
                        <span className="text-[13px] text-gray-600 font-medium group-hover/item:text-brand-primary transition-colors">All</span>
                    </Link>

                    {/* Dynamic categories */}
                    {categories?.map((cat) => (
                        <Link key={cat.id} href={`/shop?category=${cat.slug}`} prefetch={['mount', 'hover']} className="flex items-center gap-4 group/item" onClick={onClose}>
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 group-hover/item:shadow-md transition-shadow">
                                <img src={categoryImages[cat.name] || defaultImage} alt={cat.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform" />
                            </div>
                            <span className="text-[13px] text-gray-600 font-medium group-hover/item:text-brand-primary transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                    
                </div>
            </div>
        </div>
    );
}
