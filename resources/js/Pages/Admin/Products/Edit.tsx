import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Edit({ product, categories, brands, collections }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        slug: product.slug || '',
        short_description: product.short_description || '',
        description: product.description || '',
        price: product.price || '',
        sale_price: product.sale_price || '',
        stock: product.stock || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        material: product.material || '',
        care_instructions: product.care_instructions || '',
        weight: product.weight || '',
        dimensions: product.dimensions || '',
        shipping_info: product.shipping_info || '',
        return_info: product.return_info || '',
        seo_title: product.seo_title || '',
        seo_description: product.seo_description || '',
        category_id: product.category_id || '',
        brand_id: product.brand_id || '',
        collection_id: product.collection_id || '',
        is_active: product.is_active ?? true,
        gallery: (product.images || []).map((img: any) => ({ url: img.path, is_hover: img.is_hover_image })),
        variants: product.variants || [],
    });

    // Variants
    const addVariant = () => setData('variants', [...data.variants, { size: '', color: '', price: '', stock: '0', sku: '' }]);
    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...data.variants];
        (newVariants[index] as any)[field] = value;
        setData('variants', newVariants);
    };
    const removeVariant = (index: number) => setData('variants', data.variants.filter((_, i) => i !== index));

    // Gallery
    const addGalleryImage = () => setData('gallery', [...data.gallery, { url: '', is_hover: false }]);
    const updateGalleryImage = (index: number, field: string, value: any) => {
        const newGallery = [...data.gallery];
        (newGallery[index] as any)[field] = value;
        setData('gallery', newGallery);
    };
    const removeGalleryImage = (index: number) => setData('gallery', data.gallery.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/products/${product.id}`, {
            onSuccess: () => toast.success('Product updated successfully!')
        });
    };

    return (
        <AdminLayout title="Edit Product">
            <Head title={`Edit ${product.name} - Admin`} />
            
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products" className="text-gray-500 hover:text-brand-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
                    <p className="text-sm text-gray-500 mt-1">{product.name}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">Basic Info</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input type="text" value={data.name} onChange={e => {
                                setData('name', e.target.value);
                                setData('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                            }} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                            <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-400" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                            <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" required>
                                <option value="">Select Category</option>
                                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                            <select value={data.brand_id} onChange={e => setData('brand_id', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary">
                                <option value="">Select Brand</option>
                                {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Collection</label>
                            <select value={data.collection_id} onChange={e => setData('collection_id', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary">
                                <option value="">Select Collection</option>
                                {collections.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SKU</label>
                            <input type="text" value={data.sku} onChange={e => setData('sku', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">Pricing & Inventory</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                            <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compare-at (Sale) Price</label>
                            <input type="number" step="0.01" value={data.sale_price} onChange={e => setData('sale_price', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Stock</label>
                            <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" required />
                        </div>
                    </div>
                </div>

                {/* Product Content */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">Product Content</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                            <textarea rows={2} value={data.short_description} onChange={e => setData('short_description', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
                            <textarea rows={6} value={data.description} onChange={e => setData('description', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Material</label>
                                <input type="text" value={data.material} onChange={e => setData('material', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Care Instructions</label>
                                <input type="text" value={data.care_instructions} onChange={e => setData('care_instructions', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Info</label>
                                <input type="text" value={data.shipping_info} onChange={e => setData('shipping_info', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Info</label>
                                <input type="text" value={data.return_info} onChange={e => setData('return_info', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 dark:text-white">Image Gallery</h3>
                        <button type="button" onClick={addGalleryImage} className="bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            + Add Image
                        </button>
                    </div>
                    <div className="p-6">
                        {data.gallery.length === 0 && <p className="text-gray-500 text-sm italic">No images added yet.</p>}
                        {data.gallery.map((img, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-4 mb-4 items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg flex-shrink-0 border border-gray-300 dark:border-gray-600">
                                    {img.url ? <img src={img.url} className="w-full h-full object-cover" /> : null}
                                </div>
                                <div className="flex-1 w-full">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Image URL</label>
                                    <input type="text" value={img.url} onChange={e => updateGalleryImage(idx, 'url', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" required />
                                </div>
                                <div className="flex items-center gap-2 sm:mt-5">
                                    <input type="checkbox" checked={img.is_hover} onChange={e => updateGalleryImage(idx, 'is_hover', e.target.checked)} className="rounded border-gray-300 dark:border-gray-600 text-brand-primary focus:ring-brand-primary dark:bg-gray-800" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Hover Image</span>
                                </div>
                                <button type="button" onClick={() => removeGalleryImage(idx)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 sm:mt-5 px-2 font-medium text-sm transition-colors">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Variants Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 dark:text-white">Variants</h3>
                        <button type="button" onClick={addVariant} className="bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            + Add Variant
                        </button>
                    </div>
                    <div className="p-6">
                        {data.variants.length === 0 && <p className="text-gray-500 text-sm italic">No variants added yet.</p>}
                        {data.variants.map((variant, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4 items-end p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="sm:col-span-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Size</label>
                                    <input type="text" value={variant.size} onChange={e => updateVariant(idx, 'size', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Color</label>
                                    <input type="text" value={variant.color} onChange={e => updateVariant(idx, 'color', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Price (+/-)</label>
                                    <input type="number" step="0.01" value={variant.price} onChange={e => updateVariant(idx, 'price', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Stock</label>
                                    <input type="number" value={variant.stock} onChange={e => updateVariant(idx, 'stock', e.target.value)} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" required />
                                </div>
                                <div className="sm:col-span-1 flex justify-end">
                                    <button type="button" onClick={() => removeVariant(idx)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 font-medium text-sm transition-colors mb-1">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/products" className="px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50">
                        {processing ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
