import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Index({ products }: any) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(`/admin/products/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Product deleted successfully.')
            });
        }
    };

    return (
        <AdminLayout 
            title="Products"
            actions={
                <Link 
                    href="/admin/products/create" 
                    className="inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Product
                </Link>
            }
        >
            <Head title="Products - Admin" />

            <div className="hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Products</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage your catalog and inventory.</p>
                </div>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Product</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Price</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Category</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Stock</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {products.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-admin-text-muted font-medium">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.data.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {product.images && product.images.length > 0 ? (
                                                    <img src={product.images[0].path} alt={product.name} className="h-12 w-12 rounded-xl object-cover bg-admin-bg border border-admin-border" />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-xl bg-admin-surface-muted border border-admin-border flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-admin-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-semibold text-admin-text">{product.name}</div>
                                                    <div className="text-xs font-medium text-admin-text-muted mt-1">{product.sku || 'No SKU'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.sale_price ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-admin-primary">${parseFloat(product.sale_price).toFixed(2)}</span>
                                                    <span className="text-xs font-medium text-admin-text-muted line-through">${parseFloat(product.price).toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="font-bold text-admin-text">${parseFloat(product.price).toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-admin-text-muted">
                                            {product.category?.name || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.stock > 0 ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-success/10 text-admin-success">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-admin-success"></span>
                                                    {product.stock} In Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-danger/10 text-admin-danger">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-admin-danger"></span>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link href={`/admin/products/${product.id}/edit`} className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {products.total > products.per_page && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm font-medium text-admin-text-muted">
                        Showing {products.from} to {products.to} of {products.total} results
                    </div>
                    <div className="flex gap-2">
                        {products.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    link.active 
                                        ? 'bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20' 
                                        : 'bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
