import { Head, router, useForm } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import type { FormEvent, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';

interface Marketplace {
    id: number;
    name: string;
    name_km: string | null;
    name_en: string | null;
    name_vi: string | null;
    slug: string;
    logo: string | null;
    icon_path: string | null;
    icon_source_url: string | null;
    alt_text: string | null;
    brand_color: string | null;
    website_url: string | null;
    description: string | null;
    is_enabled: boolean;
    open_in_new_tab: boolean;
    import_enabled: boolean;
    manual_fallback_enabled: boolean;
    status: string;
    maintenance_message: string | null;
    sort_order: number;
    starts_at: string | null;
    ends_at: string | null;
}

interface Props {
    marketplaces: Marketplace[];
}

const emptySite = {
    name: '',
    name_km: '',
    name_en: '',
    name_vi: '',
    slug: '',
    website_url: '',
    icon_source_url: '',
    icon_path: '',
    alt_text: '',
    brand_color: '#ff4c3b',
    description: '',
    is_enabled: true,
    open_in_new_tab: true,
    import_enabled: false,
    manual_fallback_enabled: true,
    status: 'active',
    maintenance_message: '',
    sort_order: 0,
    starts_at: '',
    ends_at: '',
};

const toFormSite = (site: Marketplace) => ({
    name: site.name || '',
    name_km: site.name_km || '',
    name_en: site.name_en || '',
    name_vi: site.name_vi || '',
    slug: site.slug || '',
    website_url: site.website_url || '',
    icon_source_url: site.icon_source_url || '',
    icon_path: site.icon_path || '',
    alt_text: site.alt_text || '',
    brand_color: site.brand_color || '#ff4c3b',
    description: site.description || '',
    is_enabled: Boolean(site.is_enabled),
    open_in_new_tab: site.open_in_new_tab !== false,
    import_enabled: Boolean(site.import_enabled),
    manual_fallback_enabled: site.manual_fallback_enabled !== false,
    status: site.status || 'active',
    maintenance_message: site.maintenance_message || '',
    sort_order: site.sort_order || 0,
    starts_at: site.starts_at || '',
    ends_at: site.ends_at || '',
});

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block text-sm font-bold text-admin-text-muted">
            <span className="mb-1.5 block">{label}</span>
            {children}
        </label>
    );
}

const inputClass = 'h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20';

function DraggableRow({ site, index, startEdit, deleteSite, editingId, saveEdit, editData, setEditData, inputClass, setEditingId }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: site.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`border-b border-admin-border last:border-0 bg-admin-surface ${isDragging ? 'shadow-lg relative' : ''}`}>
            {editingId === site.id ? (
                <form onSubmit={(event) => saveEdit(event, site)} className="grid gap-4 px-5 py-5 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Name"><input className={inputClass} value={editData.name} onChange={(event) => setEditData({ ...editData, name: event.target.value })} required /></Field>
                    <Field label="Website URL"><input className={inputClass} value={editData.website_url} onChange={(event) => setEditData({ ...editData, website_url: event.target.value })} /></Field>
                    <Field label="Khmer Name"><input className={inputClass} value={editData.name_km} onChange={(event) => setEditData({ ...editData, name_km: event.target.value })} /></Field>
                    <Field label="English Name"><input className={inputClass} value={editData.name_en} onChange={(event) => setEditData({ ...editData, name_en: event.target.value })} /></Field>
                    <Field label="Vietnamese Name"><input className={inputClass} value={editData.name_vi} onChange={(event) => setEditData({ ...editData, name_vi: event.target.value })} /></Field>
                    <Field label="Icon URL"><input className={inputClass} value={editData.icon_source_url} onChange={(event) => setEditData({ ...editData, icon_source_url: event.target.value })} /></Field>

                    <Field label="Status">
                        <select className={inputClass} value={editData.status} onChange={(event) => setEditData({ ...editData, status: event.target.value })}>
                            <option value="active">Active</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </Field>

                    <div className="flex flex-wrap items-center gap-4 xl:col-span-4 mt-2">
                        <button type="button" onClick={() => setEditingId(null)} className="ml-auto min-h-10 rounded-xl border border-admin-border px-5 text-sm font-black text-admin-text transition hover:bg-admin-surface-muted active:scale-[0.98]">Cancel</button>
                        <button className="min-h-10 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all">Save Changes</button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-[0.35fr_1.4fr_1.8fr_0.9fr] items-center gap-4 px-5 py-4">
                    <div className="flex items-center gap-2">
                        <button type="button" {...attributes} {...listeners} className="text-admin-text-muted hover:text-admin-text cursor-grab active:cursor-grabbing p-1 -ml-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
                        </button>
                        <span className="font-mono text-sm font-black text-admin-text-muted">{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden">
                            {site.logo || site.icon_source_url ? <img src={site.logo || site.icon_source_url || ''} alt={site.name} className="h-full w-full object-contain" /> : <span className="flex h-full w-full items-center justify-center bg-admin-surface-muted text-admin-text-muted font-bold text-lg">{site.name.charAt(0)}</span>}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-black text-admin-text">{site.name}</p>
                            <p className="truncate font-mono text-xs font-semibold text-admin-text-muted">{site.slug}</p>
                        </div>
                    </div>
                    <a href={site.website_url || '#'} target="_blank" rel="noreferrer" className="truncate text-sm font-semibold text-admin-primary hover:underline">{site.website_url || 'No URL'}</a>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => startEdit(site)} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition">Edit</button>
                        <button type="button" onClick={() => deleteSite(site)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition">Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MarketplacesIndex({ marketplaces }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState(emptySite);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const createForm = useForm(emptySite);

    const [items, setItems] = useState(marketplaces);
    
    useEffect(() => {
        setItems(marketplaces);
    }, [marketplaces]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                axios.post('/admin/available-sites/reorder', {
                    order: newItems.map(i => i.id)
                });
                
                return newItems;
            });
        }
    };

    const startEdit = (site: Marketplace) => {
        setEditingId(site.id);
        setEditData(toFormSite(site));
    };

    const saveEdit = (event: FormEvent, site: Marketplace) => {
        event.preventDefault();
        router.patch(`/admin/available-sites/${site.id}`, editData, {
            preserveScroll: true,
            onSuccess: () => setEditingId(null),
        });
    };

    const createSite = (event: FormEvent) => {
        event.preventDefault();
        createForm.post('/admin/available-sites', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setIsAddModalOpen(false);
            },
        });
    };

    const deleteSite = async (site: Marketplace) => {
        if (!(await confirmAction(`Delete ${site.name} from Available Sites?`))) return;
        router.delete(`/admin/available-sites/${site.id}`, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Available Sites - Admin" />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-admin-text">Available Sites</h1>
                        <p className="mt-1 text-sm font-semibold text-admin-text-muted">Manage the shopping-site carousel shown on the public homepage. Drag to reorder.</p>
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        + Add Site
                    </button>
                </div>

                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-admin-surface border border-admin-border rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-admin-border flex justify-between items-center sticky top-0 bg-admin-surface z-10">
                                <h2 className="text-lg font-black text-admin-text">Add New Site</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-admin-text-muted hover:text-admin-text p-2 bg-admin-surface-muted rounded-full transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <form onSubmit={createSite} className="p-6">
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    <Field label="Name">
                                        <input className={inputClass} value={createForm.data.name} onChange={(event) => createForm.setData('name', event.target.value)} required />
                                    </Field>

                                    <Field label="Website URL">
                                        <input className={inputClass} value={createForm.data.website_url} onChange={(event) => createForm.setData('website_url', event.target.value)} placeholder="https://example.com" />
                                    </Field>
                                    <Field label="Khmer Name">
                                        <input className={inputClass} value={createForm.data.name_km} onChange={(event) => createForm.setData('name_km', event.target.value)} />
                                    </Field>
                                    <Field label="English Name">
                                        <input className={inputClass} value={createForm.data.name_en} onChange={(event) => createForm.setData('name_en', event.target.value)} />
                                    </Field>
                                    <Field label="Vietnamese Name">
                                        <input className={inputClass} value={createForm.data.name_vi} onChange={(event) => createForm.setData('name_vi', event.target.value)} />
                                    </Field>
                                    <Field label="Icon URL">
                                        <input className={inputClass} value={createForm.data.icon_source_url} onChange={(event) => createForm.setData('icon_source_url', event.target.value)} placeholder="https://..." />
                                    </Field>
                                </div>
                                <div className="mt-6 flex justify-end gap-3 border-t border-admin-border pt-4">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-surface-muted transition-colors">Cancel</button>
                                    <button type="submit" disabled={createForm.processing} className="rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-50">Create Site</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-sm">
                    <div className="grid grid-cols-[0.35fr_1.4fr_1.8fr_0.9fr] gap-4 border-b border-admin-border bg-admin-surface-muted px-5 py-3 text-xs font-black uppercase tracking-wide text-admin-text-muted">
                        <span>No.</span>
                        <span>Site</span>
                        <span>URL</span>
                        <span className="text-right">Actions</span>
                    </div>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            {items.map((site, index) => (
                                <DraggableRow 
                                    key={site.id} 
                                    site={site} 
                                    index={index} 
                                    startEdit={startEdit} 
                                    deleteSite={deleteSite} 
                                    editingId={editingId} 
                                    saveEdit={saveEdit} 
                                    editData={editData} 
                                    setEditData={setEditData} 
                                    inputClass={inputClass}
                                    setEditingId={setEditingId}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </AdminLayout>
    );
}
