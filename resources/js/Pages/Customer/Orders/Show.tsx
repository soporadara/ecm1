import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { useCurrency } from '../../../Contexts/CurrencyContext';

const label = (value: any) => String(value || 'not set').replace(/_/g, ' ');
const statusToneClass: Record<string, string> = {
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-50 text-blue-700',
};

export default function CustomerOrderShow({ order }: any) {
    const { formatAmount } = useCurrency();
    const items = order.items || [];
    const histories = order.status_histories || [];

    return (
        <MainLayout title={order.order_number || 'Order'}>
            <Head title={order.order_number || 'Order'} />

            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Link href="/my-orders" className="text-sm font-bold text-brand-primary hover:underline">Back to orders</Link>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white font-serif">{order.order_number}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{order.title}</p>
                    </div>
                    <span className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`}>
                        {order.customer_status_label || 'In Progress'}
                    </span>
                </div>

                {order.customer_visible_note && (
                    <div className="mb-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-sm font-medium text-gray-700 dark:text-gray-200">
                        {order.customer_visible_note}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requested Products</h2>
                            <div className="space-y-5">
                                {items.map((item: any, index: number) => (
                                    <article key={item.id} className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-wider text-gray-400">Product {index + 1}</p>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.product_name}</h3>
                                                <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white">{formatAmount(item.line_total || Number(item.price || 0) * Number(item.quantity || 0), order.currency_code || 'USD')}</p>
                                        </div>
                                        {(item.type || item.color || item.size) && (
                                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                                {[item.type, item.color, item.size].filter(Boolean).join(' / ')}
                                            </p>
                                        )}
                                        {item.description && <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>}
                                        {item.customer_notes && <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">{item.customer_notes}</p>}

                                        {item.urls?.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {item.urls.map((url: any) => (
                                                    <a key={url.id} href={url.url} target="_blank" rel="noreferrer" className="block truncate text-sm font-semibold text-brand-primary hover:underline">
                                                        {url.domain || url.url}
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {item.images?.length > 0 && (
                                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                {item.images.map((image: any) => (
                                                    <a key={image.id} href={image.url} target="_blank" rel="noreferrer" className="aspect-square overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
                                                        <img src={image.thumbnail_url || image.url} alt={image.original_filename || 'Reference'} className="h-full w-full object-cover" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {item.attachments?.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {item.attachments.map((file: any) => (
                                                    <a key={file.id} href={file.download_url} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:text-brand-primary dark:border-gray-700 dark:text-gray-200">
                                                        {file.original_filename}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Status Timeline</h2>
                            <div className="space-y-4">
                                {histories.length === 0 ? (
                                    <p className="text-sm text-gray-500">No timeline updates yet.</p>
                                ) : histories.map((history: any) => (
                                    <div key={history.id} className="border-l-2 border-brand-primary pl-4">
                                        <p className="font-bold capitalize text-gray-900 dark:text-white">{history.customer_status_label || label(history.to_status)}</p>
                                        {history.public_message && <p className="text-sm text-gray-600 dark:text-gray-300">{history.public_message}</p>}
                                        <p className="text-xs text-gray-400">{new Date(history.created_at).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h2>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between"><dt>Currency</dt><dd className="font-bold">{order.currency_code || 'USD'}</dd></div>
                                <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold">{formatAmount(order.subtotal_amount, order.currency_code || 'USD')}</dd></div>
                                <div className="flex justify-between"><dt>Logistics fee</dt><dd className="font-bold">{formatAmount(order.logistics_fee_amount, order.currency_code || 'USD')}</dd></div>
                                <div className="flex justify-between"><dt>Service fee</dt><dd className="font-bold">{formatAmount(order.service_fee_amount, order.currency_code || 'USD')}</dd></div>
                                <div className="flex justify-between"><dt>Delivery fee</dt><dd className="font-bold">{formatAmount(order.delivery_fee_amount, order.currency_code || 'USD')}</dd></div>
                                <div className="flex justify-between"><dt>Discount</dt><dd className="font-bold">{formatAmount(order.discount_amount, order.currency_code || 'USD')}</dd></div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between text-base dark:border-gray-800"><dt className="font-bold">Total</dt><dd className="font-black">{formatAmount(order.final_total_amount || order.estimated_total_amount, order.currency_code || 'USD')}</dd></div>
                            </dl>
                            <div className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                <p>Pricing: {label(order.pricing_status)}</p>
                                <p>Payment: {order.payment_status_label || 'Unpaid'}</p>
                                <p>Purchase: {order.purchase_readiness_label || 'Not Ready'}</p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delivery Snapshot</h2>
                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <p><span className="font-bold text-gray-900 dark:text-white">Name:</span> {order.customer_name_snapshot}</p>
                                <p><span className="font-bold text-gray-900 dark:text-white">Email:</span> {order.customer_email_snapshot}</p>
                                <p><span className="font-bold text-gray-900 dark:text-white">Phone:</span> {order.customer_phone_snapshot}</p>
                                <p className="whitespace-pre-line"><span className="font-bold text-gray-900 dark:text-white">Address:</span> {order.delivery_address_snapshot || order.shipping_address}</p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Support</h2>
                            <div className="grid gap-3">
                                <Link href="/manual-order" className="rounded-xl bg-brand-primary px-4 py-3 text-center text-sm font-black uppercase tracking-wider text-white hover:bg-brand-secondary">Create Another Manual Order</Link>
                                <Link href="/contact" className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold hover:text-brand-primary dark:border-gray-700">Contact Us</Link>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
}
