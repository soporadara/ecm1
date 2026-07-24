import { Head, Link, router } from '@inertiajs/react';
import { Megaphone, Pencil, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { getPopupCreativeSize } from '@/lib/popupCreativeSizes';

interface Popup {
    id: number;
    title: string;
    badge_text: string | null;
    heading: string | null;
    description: string | null;
    link_url: string | null;
    button_label: string | null;
    accent_color: string | null;
    creative_size: string | null;
    image_url: string | null;
    is_active: boolean;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
}

interface Props {
    popups: {
        data: Popup[];
    };
}

function PopupThumbnail({ popup }: { popup: Popup }) {
    const [failed, setFailed] = useState(false);
    const creativeSize = getPopupCreativeSize(popup.creative_size);

    return (
        <div className="relative min-h-44 bg-admin-surface-muted">
            {popup.image_url && !failed ? (
                <img src={popup.image_url} alt={popup.title} className="h-full w-full object-cover" onError={() => setFailed(true)} />
            ) : (
                <div className="flex h-full min-h-44 items-center justify-center text-admin-text-muted">
                    <Megaphone className="h-8 w-8" aria-hidden="true" />
                </div>
            )}
            <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-black text-white backdrop-blur">
                {creativeSize.dimensions}
            </span>
        </div>
    );
}

export default function Index({ popups }: Props) {
    const deletePopup = (popup: Popup) => {
        if (!window.confirm(`Delete popup ad "${popup.title}"?`)) return;
        router.delete(`/admin/popups/${popup.id}`, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Pop-up Ads">
            <Head title="Pop-up Ads - CMS" />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-admin-text">Pop-up Ads</h1>
                        <p className="mt-1 text-sm font-semibold text-admin-text-muted">Create homepage popups with discount text, image, button, and schedule.</p>
                    </div>
                    <Link href="/admin/popups/create" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-lg shadow-admin-primary/20">
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        New Pop-up Ad
                    </Link>
                </div>

                {popups.data.length === 0 ? (
                    <div className="rounded-2xl border border-admin-border bg-admin-surface p-12 text-center shadow-sm">
                        <Megaphone className="mx-auto h-10 w-10 text-admin-text-muted" aria-hidden="true" />
                        <h2 className="mt-4 text-lg font-black text-admin-text">No pop-up ads yet</h2>
                        <p className="mt-2 text-sm font-semibold text-admin-text-muted">Add a promotion like a discount offer, service announcement, or seasonal campaign.</p>
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {popups.data.map((popup) => (
                            <article key={popup.id} className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm">
                                <div className="grid sm:grid-cols-[11rem_1fr]">
                                    <PopupThumbnail popup={popup} />
                                    <div className="p-5">
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-black ${popup.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {popup.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                            {popup.badge_text && (
                                                <span className="rounded-full px-2.5 py-1 text-xs font-black text-white" style={{ backgroundColor: popup.accent_color || '#ff4c3b' }}>
                                                    {popup.badge_text}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-lg font-black text-admin-text">{popup.title}</h2>
                                        <p className="mt-1 text-sm font-bold text-admin-text">{popup.heading || 'No public heading'}</p>
                                        <p className="mt-2 line-clamp-2 text-sm text-admin-text-muted">{popup.description || 'No description set.'}</p>
                                        <div className="mt-5 flex flex-wrap justify-end gap-3">
                                            <Link href={`/admin/popups/${popup.id}/edit`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-admin-border px-4 text-sm font-black text-admin-text">
                                                <Pencil className="h-4 w-4" aria-hidden="true" />
                                                Edit
                                            </Link>
                                            <button type="button" onClick={() => deletePopup(popup)} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-red-50 px-4 text-sm font-black text-red-700">
                                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
