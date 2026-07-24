import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { ImagePlus, Megaphone } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DEFAULT_POPUP_CREATIVE_SIZE, POPUP_CREATIVE_SIZES, getPopupCreativeSize } from '@/lib/popupCreativeSizes';

const inputClass = 'h-11 w-full rounded-xl border border-admin-border bg-white px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20';
const textareaClass = 'min-h-28 w-full rounded-xl border border-admin-border bg-white px-3 py-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        badge_text: 'DISCOUNT',
        heading: 'Save 20% on your next order',
        description: 'Create a manual order today and get support from request to delivery.',
        creative_size: DEFAULT_POPUP_CREATIVE_SIZE,
        link_url: '/manual-order',
        button_label: 'Order Now',
        accent_color: '#ff4c3b',
        starts_at: '',
        ends_at: '',
        is_active: true,
        image: null as File | null,
    });

    const previewUrl = data.image ? URL.createObjectURL(data.image) : null;
    const creativeSize = getPopupCreativeSize(data.creative_size);
    const creativeStyle = { aspectRatio: `${creativeSize.width} / ${creativeSize.height}` };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post('/admin/popups', {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Create Pop-up Ad">
            <Head title="Create Pop-up Ad - CMS" />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/admin/popups" className="text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-admin-text">Create Pop-up Ad</h1>
                        <p className="mt-1 text-sm font-semibold text-admin-text-muted">Add discount text, a public heading, an image, and a button for the homepage popup.</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <form onSubmit={submit} className="rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-sm">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-bold text-admin-text-muted sm:col-span-2">Internal Title
                                <input className={`${inputClass} mt-1.5`} value={data.title} onChange={(event) => setData('title', event.target.value)} placeholder="July discount popup" required />
                                {errors.title && <span className="mt-1 block text-xs text-red-600">{errors.title}</span>}
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Discount Badge Text
                                <input className={`${inputClass} mt-1.5`} value={data.badge_text} onChange={(event) => setData('badge_text', event.target.value)} placeholder="20% OFF" />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Accent Color
                                <input className={`${inputClass} mt-1.5 p-1`} type="color" value={data.accent_color} onChange={(event) => setData('accent_color', event.target.value)} />
                            </label>
                            <div className="sm:col-span-2">
                                <p className="mb-2 text-sm font-bold text-admin-text-muted">Popup Image Size</p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {POPUP_CREATIVE_SIZES.map((size) => (
                                        <button
                                            key={size.value}
                                            type="button"
                                            onClick={() => setData('creative_size', size.value)}
                                            className={`rounded-2xl border p-4 text-left transition ${
                                                data.creative_size === size.value
                                                    ? 'border-admin-primary bg-admin-primary/10 text-admin-primary shadow-sm'
                                                    : 'border-admin-border bg-admin-surface-muted text-admin-text hover:border-admin-primary/50'
                                            }`}
                                        >
                                            <span className="block text-sm font-black">{size.label}</span>
                                            <span className="mt-1 block text-xs font-black">{size.dimensions}</span>
                                            <span className="mt-2 block text-xs font-semibold text-admin-text-muted">{size.hint}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.creative_size && <span className="mt-1 block text-xs text-red-600">{errors.creative_size}</span>}
                            </div>
                            <label className="block text-sm font-bold text-admin-text-muted sm:col-span-2">Public Heading
                                <input className={`${inputClass} mt-1.5`} value={data.heading} onChange={(event) => setData('heading', event.target.value)} placeholder="Save 20% on your next order" />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted sm:col-span-2">Description
                                <textarea className={`${textareaClass} mt-1.5`} value={data.description} onChange={(event) => setData('description', event.target.value)} />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Button Text
                                <input className={`${inputClass} mt-1.5`} value={data.button_label} onChange={(event) => setData('button_label', event.target.value)} placeholder="Shop Now" />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Button Link
                                <input className={`${inputClass} mt-1.5`} value={data.link_url} onChange={(event) => setData('link_url', event.target.value)} placeholder="/manual-order" />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Starts At
                                <input className={`${inputClass} mt-1.5`} type="datetime-local" value={data.starts_at} onChange={(event) => setData('starts_at', event.target.value)} />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Ends At
                                <input className={`${inputClass} mt-1.5`} type="datetime-local" value={data.ends_at} onChange={(event) => setData('ends_at', event.target.value)} />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted sm:col-span-2">Popup Image
                                <span className="mt-1.5 flex min-h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-admin-border bg-admin-surface-muted text-sm font-bold text-admin-text-muted">
                                    <ImagePlus className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Upload image for {creativeSize.dimensions}
                                    <input type="file" accept="image/*" className="sr-only" onChange={(event) => setData('image', event.target.files?.[0] || null)} />
                                </span>
                                <span className="mt-1 block text-xs font-semibold text-admin-text-muted">Recommended: {creativeSize.dimensions}. JPG, PNG, or WebP up to 12MB.</span>
                                {errors.image && <span className="mt-1 block text-xs text-red-600">{errors.image}</span>}
                            </label>
                        </div>

                        <div className="mt-5 flex items-center gap-4 border-t border-admin-border pt-5">
                            <label className="flex items-center gap-2 text-sm font-black text-admin-text">
                                <input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} />
                                Active now
                            </label>
                            <button disabled={processing} className="ml-auto min-h-11 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-lg shadow-admin-primary/20 disabled:opacity-60">
                                {processing ? 'Saving...' : 'Create Pop-up Ad'}
                            </button>
                        </div>
                    </form>

                    <aside className="rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-sm">
                        <h2 className="mb-4 text-lg font-black text-admin-text">Preview</h2>
                        <div className="rounded-2xl border border-admin-border bg-admin-surface-muted p-4">
                            <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black text-admin-text-muted">
                                <span>{creativeSize.label}</span>
                                <span>{creativeSize.dimensions}</span>
                            </div>
                            <div className="mx-auto max-h-[32rem] overflow-hidden rounded-2xl bg-white shadow-xl" style={creativeStyle}>
                                <div className="relative h-full w-full overflow-hidden">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-admin-surface-muted text-admin-text-muted">
                                            <Megaphone className="h-10 w-10" aria-hidden="true" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white sm:p-8">
                                        {data.badge_text && <span className="mx-auto mb-4 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest text-white" style={{ backgroundColor: data.accent_color }}>{data.badge_text}</span>}
                                        <h3 className="text-2xl font-black leading-tight text-white font-serif sm:text-3xl">{data.heading || 'Promotion heading'}</h3>
                                        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-white/85">{data.description || 'Promotion description will appear here.'}</p>
                                        <span className="mx-auto mt-5 inline-flex min-h-11 items-center rounded-xl px-6 text-sm font-black uppercase tracking-wider text-white" style={{ backgroundColor: data.accent_color }}>
                                            {data.button_label || 'Shop Now'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}
