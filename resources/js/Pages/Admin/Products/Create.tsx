import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Create({ auth, categories, brands, collections }: any) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        stock: '',
        sku: '',
        barcode: '',
        material: '',
        care_instructions: '',
        weight: '',
        dimensions: '',
        shipping_info: '',
        return_info: '',
        seo_title: '',
        seo_description: '',
        category_id: '',
        brand_id: '',
        collection_id: '',
        is_active: true,
        gallery: [] as { url: string; is_hover: boolean }[],
        variants: [] as { size: string; color: string; price: string; stock: string; sku: string }[],
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
        post('/admin/products');
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Create Product</h2>}>
            <Head title="Create Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm sm:rounded-lg">
                        
                        <h3 className="text-lg font-bold mb-4 border-b pb-2">Basic Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" value={data.name} onChange={e => {
                                    setData('name', e.target.value);
                                    setData('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                }} className="mt-1 block w-full rounded border-gray-300" required />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Slug</label>
                                <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} className="mt-1 block w-full rounded border-gray-300 bg-gray-50" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="mt-1 block w-full rounded border-gray-300" required>
                                    <option value="">Select Category</option>
                                    {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <select value={data.brand_id} onChange={e => setData('brand_id', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                    <option value="">Select Brand</option>
                                    {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Collection</label>
                                <select value={data.collection_id} onChange={e => setData('collection_id', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                    <option value="">Select Collection</option>
                                    {collections.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SKU</label>
                                <input type="text" value={data.sku} onChange={e => setData('sku', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-4 border-b pb-2">Pricing & Inventory</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="mt-1 block w-full rounded border-gray-300" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Compare-at (Sale) Price</label>
                                <input type="number" step="0.01" value={data.sale_price} onChange={e => setData('sale_price', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Base Stock</label>
                                <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="mt-1 block w-full rounded border-gray-300" required />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-4 border-b pb-2">Product Content</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Short Description (15-35 words)</label>
                            <textarea rows={2} value={data.short_description} onChange={e => setData('short_description', e.target.value)} className="mt-1 block w-full rounded border-gray-300"></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Full Description (HTML Supported)</label>
                            <textarea rows={6} value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded border-gray-300"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Material</label>
                                <input type="text" value={data.material} onChange={e => setData('material', e.target.value)} className="mt-1 block w-full rounded border-gray-300" placeholder="e.g. 100% Cotton" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Care Instructions</label>
                                <input type="text" value={data.care_instructions} onChange={e => setData('care_instructions', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Info</label>
                                <input type="text" value={data.shipping_info} onChange={e => setData('shipping_info', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Return Info</label>
                                <input type="text" value={data.return_info} onChange={e => setData('return_info', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="mb-8 border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Image Gallery</h3>
                                <button type="button" onClick={addGalleryImage} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700">Add Image</button>
                            </div>
                            {data.gallery.map((img, idx) => (
                                <div key={idx} className="flex gap-4 mb-4 items-center p-4 bg-gray-50 rounded border">
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500">Image URL</label>
                                        <input type="text" value={img.url} onChange={e => updateGalleryImage(idx, 'url', e.target.value)} className="w-full text-sm rounded border-gray-300" required />
                                    </div>
                                    <div className="flex items-center gap-2 mt-4">
                                        <input type="checkbox" checked={img.is_hover} onChange={e => updateGalleryImage(idx, 'is_hover', e.target.checked)} className="rounded text-brand-primary" />
                                        <span className="text-sm">Hover Image</span>
                                    </div>
                                    <button type="button" onClick={() => removeGalleryImage(idx)} className="text-red-500 hover:text-red-700 mt-4 px-2">Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Variants Section */}
                        <div className="mb-8 border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Variants</h3>
                                <button type="button" onClick={addVariant} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700">Add Variant</button>
                            </div>
                            {data.variants.map((variant, idx) => (
                                <div key={idx} className="flex gap-4 mb-4 items-end p-4 bg-gray-50 rounded border">
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500">Size</label>
                                        <input type="text" value={variant.size} onChange={e => updateVariant(idx, 'size', e.target.value)} className="w-full text-sm rounded border-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500">Color</label>
                                        <input type="text" value={variant.color} onChange={e => updateVariant(idx, 'color', e.target.value)} className="w-full text-sm rounded border-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500">Price (opt)</label>
                                        <input type="number" step="0.01" value={variant.price} onChange={e => updateVariant(idx, 'price', e.target.value)} className="w-full text-sm rounded border-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500">Stock</label>
                                        <input type="number" value={variant.stock} onChange={e => updateVariant(idx, 'stock', e.target.value)} className="w-full text-sm rounded border-gray-300" required />
                                    </div>
                                    <button type="button" onClick={() => removeVariant(idx)} className="text-red-500 hover:text-red-700 p-2">Remove</button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/products" className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200">Cancel</Link>
                            <button type="submit" disabled={processing} className="bg-brand-primary text-white px-6 py-2 rounded shadow hover:bg-red-600 disabled:opacity-50">Save Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
