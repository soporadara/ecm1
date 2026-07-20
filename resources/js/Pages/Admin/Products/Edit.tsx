import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Edit({ auth, product, categories, brands, collections }: any) {
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
        put(`/admin/products/${product.id}`);
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Edit Product: {product.name}</h2>}>
            <Head title="Edit Product" />
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
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea rows={2} value={data.short_description} onChange={e => setData('short_description', e.target.value)} className="mt-1 block w-full rounded border-gray-300"></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Full Description</label>
                            <textarea rows={6} value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded border-gray-300"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Material</label>
                                <input type="text" value={data.material} onChange={e => setData('material', e.target.value)} className="mt-1 block w-full rounded border-gray-300" />
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
                                    <div className="w-16 h-16 bg-gray-200 overflow-hidden rounded flex-shrink-0">
                                        {img.url ? <img src={img.url} className="w-full h-full object-cover" /> : null}
                                    </div>
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

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/products" className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200">Cancel</Link>
                            <button type="submit" disabled={processing} className="bg-brand-primary text-white px-6 py-2 rounded shadow hover:bg-red-600 disabled:opacity-50">Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
