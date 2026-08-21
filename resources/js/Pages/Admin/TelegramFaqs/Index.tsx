import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, GripVertical, Check, X } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import toast from 'react-hot-toast';
interface Faq {
    id: number;
    question_en: string;
    question_km: string;
    question_vi: string;
    answer_en: string;
    answer_km: string;
    answer_vi: string;
    sort_order: number;
    is_active: boolean;
}

function SortableTableRow({ faq, openEdit, handleDelete }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: faq.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? 'var(--admin-surface-muted)' : undefined,
        zIndex: isDragging ? 1 : 0,
        position: isDragging ? 'relative' as const : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className="grid grid-cols-12 items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition border-b border-slate-100 dark:border-white/5">
            <div className="col-span-1 flex items-center gap-2 text-slate-400">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-slate-600">
                    <GripVertical className="h-5 w-5" />
                </div>
            </div>
            <div className="col-span-4">
                <p className="font-bold text-slate-900 dark:text-white">{faq.question_en}</p>
                <p className="mt-0.5 text-xs text-slate-500 truncate">{faq.answer_en}</p>
            </div>
            <div className="col-span-3">
                {faq.is_active ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 dark:bg-green-500/20 dark:text-green-400">
                        <Check className="h-3.5 w-3.5" /> Active
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-400">
                        <X className="h-3.5 w-3.5" /> Inactive
                    </span>
                )}
            </div>
            <div className="col-span-4 flex justify-end gap-2">
                <button
                    onClick={() => openEdit(faq)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-primary dark:hover:bg-slate-800"
                >
                    <Pencil className="h-4 w-4" />
                </button>
                <button
                    onClick={() => handleDelete(faq)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default function Index({ faqs: initialFaqs }: { faqs: Faq[] }) {
    const [faqs, setFaqs] = useState(initialFaqs);
    const [isEditing, setIsEditing] = useState<Faq | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        question_en: '',
        question_km: '',
        question_vi: '',
        answer_en: '',
        answer_km: '',
        answer_vi: '',
        is_active: true,
        sort_order: 0,
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setFaqs((prev: Faq[]) => {
                const oldIndex = prev.findIndex((item) => item.id === active.id);
                const newIndex = prev.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(prev, oldIndex, newIndex);
                
                const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
                
                axios.post('/admin/telegram-faqs/reorder', {
                    orders: updatedItems.map(i => ({ id: i.id, sort_order: i.sort_order }))
                }).then(() => {
                    toast.success('FAQs reordered successfully');
                }).catch(() => {
                    toast.error('Failed to reorder FAQs');
                    setFaqs(prev);
                });

                return updatedItems;
            });
        }
    };

    const openEdit = (faq: Faq) => {
        setIsEditing(faq);
        setIsCreating(false);
        setData({
            question_en: faq.question_en || '',
            question_km: faq.question_km || '',
            question_vi: faq.question_vi || '',
            answer_en: faq.answer_en || '',
            answer_km: faq.answer_km || '',
            answer_vi: faq.answer_vi || '',
            is_active: faq.is_active,
            sort_order: faq.sort_order,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openCreate = () => {
        setIsCreating(true);
        setIsEditing(null);
        reset();
    };

    const closeForm = () => {
        setIsCreating(false);
        setIsEditing(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/telegram-faqs/${isEditing.id}`, {
                onSuccess: () => closeForm(),
            });
        } else {
            post('/admin/telegram-faqs', {
                onSuccess: () => closeForm(),
            });
        }
    };

    const handleDelete = (faq: Faq) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            destroy(`/admin/telegram-faqs/${faq.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Telegram FAQs" />
            
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Telegram FAQs</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage the Frequently Asked Questions that appear in your Telegram Bot.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                </button>
            </div>

            {(isCreating || isEditing) && (
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                    <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
                        {isCreating ? 'Create New FAQ' : 'Edit FAQ'}
                    </h2>
                    
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* English */}
                            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50">
                                <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">🇬🇧 English</h3>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Question</label>
                                    <input 
                                        type="text" 
                                        value={data.question_en}
                                        onChange={e => setData('question_en', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.question_en && <p className="mt-1 text-xs text-red-500">{errors.question_en}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Answer</label>
                                    <textarea 
                                        rows={8}
                                        value={data.answer_en}
                                        onChange={e => setData('answer_en', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.answer_en && <p className="mt-1 text-xs text-red-500">{errors.answer_en}</p>}
                                </div>
                            </div>

                            {/* Khmer */}
                            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50">
                                <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">🇰🇭 ខ្មែរ (Khmer)</h3>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Question</label>
                                    <input 
                                        type="text" 
                                        value={data.question_km}
                                        onChange={e => setData('question_km', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.question_km && <p className="mt-1 text-xs text-red-500">{errors.question_km}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Answer</label>
                                    <textarea 
                                        rows={8}
                                        value={data.answer_km}
                                        onChange={e => setData('answer_km', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.answer_km && <p className="mt-1 text-xs text-red-500">{errors.answer_km}</p>}
                                </div>
                            </div>

                            {/* Vietnamese */}
                            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-800/50">
                                <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">🇻🇳 Tiếng Việt</h3>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Question</label>
                                    <input 
                                        type="text" 
                                        value={data.question_vi}
                                        onChange={e => setData('question_vi', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.question_vi && <p className="mt-1 text-xs text-red-500">{errors.question_vi}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-900 dark:text-white">Answer</label>
                                    <textarea 
                                        rows={8}
                                        value={data.answer_vi}
                                        onChange={e => setData('answer_vi', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm text-slate-900 dark:text-white dark:border-white/10 dark:bg-slate-900"
                                    />
                                    {errors.answer_vi && <p className="mt-1 text-xs text-red-500">{errors.answer_vi}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded text-brand-primary focus:ring-brand-primary"
                                />
                                Active (Show in Bot)
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-2 text-sm font-bold text-white transition hover:bg-brand-primary/90 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : (isEditing ? 'Update FAQ' : 'Save FAQ')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
                <div className="grid grid-cols-12 gap-4 border-b border-slate-100 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <div className="col-span-1">Order</div>
                    <div className="col-span-4">Question (EN)</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-4 text-right">Actions</div>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={faqs.map(f => f.id)} strategy={verticalListSortingStrategy}>
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {faqs.map((faq) => (
                                <SortableTableRow 
                                    key={faq.id} 
                                    faq={faq} 
                                    openEdit={openEdit} 
                                    handleDelete={handleDelete} 
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>


                {faqs.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        <p>No FAQs created yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
