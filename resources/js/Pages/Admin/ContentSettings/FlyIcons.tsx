import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function FlyIcons({ settings }: { settings: any }) {
    let initialLinks: any[] = [];
    if (settings.fab_links) {
        try {
            initialLinks = JSON.parse(settings.fab_links);
        } catch (e) {
            initialLinks = [];
        }
    } else {
        if (settings.fab_email) initialLinks.push({ id: generateId(), name: 'Email', url: `mailto:${settings.fab_email}`, icon_url: null, icon_file: null });
        if (settings.fab_phone) initialLinks.push({ id: generateId(), name: 'Phone', url: `tel:${settings.fab_phone}`, icon_url: null, icon_file: null });
        if (settings.fab_messenger) initialLinks.push({ id: generateId(), name: 'Messenger', url: settings.fab_messenger, icon_url: null, icon_file: null });
        if (settings.fab_telegram) initialLinks.push({ id: generateId(), name: 'Telegram', url: settings.fab_telegram, icon_url: null, icon_file: null });
    }

    const { data, setData, post, processing, errors } = useForm({
        links: initialLinks,
    });

    const [previews, setPreviews] = useState<Record<string, string>>({});

    // Generate previews for newly selected files
    useEffect(() => {
        const newPreviews: Record<string, string> = {};
        data.links.forEach((link: any) => {
            if (link.icon_file instanceof File) {
                newPreviews[link.id] = URL.createObjectURL(link.icon_file);
            }
        });
        setPreviews(newPreviews);
        return () => {
            Object.values(newPreviews).forEach(url => URL.revokeObjectURL(url));
        };
    }, [data.links]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/fly-icons', { forceFormData: true });
    };

    const addLink = () => {
        setData('links', [...data.links, { id: generateId(), name: '', url: '', icon_url: null, icon_file: null }]);
    };

    const removeLink = (id: string) => {
        setData('links', data.links.filter((l: any) => l.id !== id));
    };

    const updateLink = (index: number, field: string, value: any) => {
        const newLinks = [...data.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setData('links', newLinks);
    };

    return (
        <AdminLayout title="Fly Icons">
            <Head title="Fly Icons" />
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Fly Icons (FAB)</h1>
                    <p className="text-sm text-admin-text-muted mt-1">Customize the floating contact buttons that appear on the storefront.</p>
                </div>
                <button 
                    onClick={addLink}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-admin-primary/10 text-admin-primary font-bold rounded-xl hover:bg-admin-primary/20 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Link
                </button>
            </div>

            <div className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm p-6">
                <form onSubmit={submit} className="space-y-6">
                    {data.links.length === 0 ? (
                        <div className="text-center py-12 bg-admin-surface-muted rounded-xl border border-dashed border-admin-border">
                            <p className="text-admin-text-muted font-bold">No icons added yet. Click "Add Link" to get started.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.links.map((link: any, index: number) => (
                                <div key={link.id} className="p-4 bg-admin-surface-muted rounded-xl border border-admin-border flex flex-col md:flex-row gap-4 items-start md:items-center relative">
                                    <button 
                                        type="button" 
                                        onClick={() => removeLink(link.id)}
                                        className="absolute top-4 right-4 md:static p-2 text-admin-danger hover:bg-admin-danger/10 rounded-lg transition"
                                        title="Remove Link"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <div className="flex-shrink-0 relative group">
                                        <div className="w-16 h-16 rounded-full border-2 border-admin-border overflow-hidden bg-white flex items-center justify-center relative">
                                            {previews[link.id] || link.icon_url ? (
                                                <img src={previews[link.id] || link.icon_url} alt="Icon preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-admin-text-muted opacity-50" />
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer">
                                                <span className="text-white text-xs font-bold">Upload</span>
                                            </div>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => updateLink(index, 'icon_file', e.target.files?.[0])}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                        <div>
                                            <label className="block text-xs font-bold text-admin-text-muted mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={link.name}
                                                onChange={e => updateLink(index, 'name', e.target.value)}
                                                className="w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50"
                                                placeholder="e.g. WhatsApp"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-admin-text-muted mb-1">URL / Link</label>
                                            <input
                                                type="text"
                                                value={link.url}
                                                onChange={e => updateLink(index, 'url', e.target.value)}
                                                className="w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50"
                                                placeholder="e.g. https://wa.me/..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-admin-text-muted mb-1">Icon URL (Optional)</label>
                                            <input
                                                type="text"
                                                value={link.icon_url || ''}
                                                onChange={e => updateLink(index, 'icon_url', e.target.value)}
                                                className="w-full bg-white border border-admin-border rounded-xl px-4 py-2.5 text-admin-text focus:ring-2 focus:ring-admin-primary/50"
                                                placeholder="e.g. https://example.com/icon.png"
                                            />
                                        </div>
                                    </div>
                                    
                                    {errors[`links.${index}.name`] && <p className="text-xs text-admin-danger mt-1 absolute bottom-1">{errors[`links.${index}.name`]}</p>}
                                    {errors[`links.${index}.url`] && <p className="text-xs text-admin-danger mt-1 absolute bottom-1">{errors[`links.${index}.url`]}</p>}
                                    {errors[`links.${index}.icon_file`] && <p className="text-xs text-admin-danger mt-1 absolute bottom-1">{errors[`links.${index}.icon_file`]}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={processing} className="px-6 py-3 bg-admin-primary text-white font-bold rounded-xl shadow-lg hover:bg-admin-primary/90 transition disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
