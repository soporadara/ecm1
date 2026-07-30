import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import AdminLayout from '@/Layouts/AdminLayout';
import { Folder, FolderPlus, Trash2, Edit2, FileText, Search, Download, Maximize2, Minimize2, SquarePen, Type, ListTodo, Table, Paperclip, ChevronLeft } from 'lucide-react';

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        return new Promise(resolve => {
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
    };
}

export default function NotesIndex({ folders, notes, currentFolderId, isBin }: any) {
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mobileActivePane, setMobileActivePane] = useState<'folders' | 'list' | 'editor'>('folders');

    // Forms
    const folderForm = useForm({ name: '' });
    const noteForm = useForm({ title: '', content: '', note_folder_id: currentFolderId || '' });

    // Handle URL param for auto-selecting note after creation
    const { url } = usePage();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const noteId = urlParams.get('note_id');
        if (noteId && notes.length > 0) {
            const note = notes.find((n: any) => n.id === parseInt(noteId));
            if (note) setSelectedNote(note);
            // clean up url
            window.history.replaceState({}, '', url.split('&note_id')[0]);
        }
    }, [notes, url]);

    useEffect(() => {
        if (selectedNote) {
            noteForm.setData({
                title: selectedNote.title || '',
                content: selectedNote.content || '',
                note_folder_id: selectedNote.note_folder_id || ''
            });
            setMobileActivePane('editor');
        } else if (mobileActivePane === 'editor') {
            setMobileActivePane('list');
        }
    }, [selectedNote]);

    // Auto-save logic
    const saveNote = debounce((data: any) => {
        if (!selectedNote) return;
        router.put(`/admin/notes/${selectedNote.id}`, data, { preserveScroll: true, preserveState: true });
    }, 1000);

    const handleNoteChange = (field: string, value: string) => {
        noteForm.setData(field as any, value);
        const updatedData = { ...noteForm.data, [field]: value };
        saveNote(updatedData);
        // Optimistic update for UI
        setSelectedNote({ ...selectedNote, [field]: value });
    };

    const createNote = () => {
        router.post('/admin/notes', { title: 'Untitled Note', content: '', note_folder_id: currentFolderId }, { preserveScroll: true });
    };

    const handleFolderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFolderId) {
            folderForm.put(`/admin/note-folders/${editingFolderId}`, {
                preserveScroll: true,
                onSuccess: () => { setEditingFolderId(null); folderForm.reset(); }
            });
        } else {
            folderForm.post('/admin/note-folders', {
                preserveScroll: true,
                onSuccess: () => { setIsCreatingFolder(false); folderForm.reset(); }
            });
        }
    };

    const deleteFolder = async (id: number) => {
        if (await confirmAction('Are you sure you want to delete this folder?')) {
            router.delete(`/admin/note-folders/${id}`, { preserveScroll: true });
        }
    };

    const trashNote = (id: number) => {
        router.post(`/admin/notes/trash/${id}`, {}, { preserveScroll: true });
        if (selectedNote?.id === id) setSelectedNote(null);
    };

    const restoreNote = (id: number) => {
        router.post(`/admin/notes/restore/${id}`, {}, { preserveScroll: true });
        if (selectedNote?.id === id) setSelectedNote(null);
    };

    const deleteNote = async (id: number) => {
        if (await confirmAction('Delete permanently?')) {
            router.delete(`/admin/notes/${id}`, { preserveScroll: true });
            if (selectedNote?.id === id) setSelectedNote(null);
        }
    };

    const filteredNotes = notes.filter((n: any) => 
        (n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         n.content?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined });
    };

    return (
        <AdminLayout title="Team Notes">
            <Head title="Team Notes" />

            <div className={`flex flex-col md:flex-row bg-white dark:bg-admin-bg shadow border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'h-[calc(100vh-8rem)]'}`}>
                
                {/* Left Pane: Folders */}
                {!isFullscreen && (
                    <div className={`${mobileActivePane === 'folders' ? 'flex' : 'hidden md:flex'} w-full md:w-[260px] max-h-full flex-shrink-0 border-r border-gray-200/60 dark:border-gray-800 bg-[#f6f6f6] dark:bg-[#1e1e1e] flex-col`}>
                        <div className="px-4 py-6">
                            <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">Cloud Note</h2>
                            <div className="space-y-0.5">
                                <Link 
                                    href="/admin/notes"
                                    preserveState={true}
                                    onClick={() => setMobileActivePane('list')}
                                    className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${!currentFolderId && !isBin ? 'bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Folder className={`w-4 h-4 ${!currentFolderId && !isBin ? 'text-[#c9952a] dark:text-[#ffca28] fill-[#c9952a]/20' : 'text-gray-500 fill-gray-400/20'}`} />
                                        All Cloud Notes
                                    </div>
                                    <span className="text-[12px] opacity-60 font-normal">{notes.length}</span>
                                </Link>
                                <Link 
                                    href="/admin/notes?bin=1"
                                    preserveState={true}
                                    onClick={() => setMobileActivePane('list')}
                                    className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${isBin ? 'bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Trash2 className="w-4 h-4 opacity-70" />
                                        Recently Deleted
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="px-4 flex-1 overflow-y-auto">
                            <div className="flex items-center justify-between mb-2 px-2">
                                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Folders</h2>
                                <button 
                                    onClick={() => { setIsCreatingFolder(true); folderForm.reset(); setEditingFolderId(null); }}
                                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                >
                                    <FolderPlus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {isCreatingFolder && (
                                <form onSubmit={handleFolderSubmit} className="mb-2 px-2">
                                    <input 
                                        type="text" 
                                        autoFocus
                                        placeholder="Folder name"
                                        className="w-full bg-white border border-gray-300 rounded text-sm px-2 py-1 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]"
                                        value={folderForm.data.name}
                                        onChange={e => folderForm.setData('name', e.target.value)}
                                        onBlur={() => { if(!folderForm.data.name) setIsCreatingFolder(false); }}
                                    />
                                </form>
                            )}

                            <div className="space-y-0.5">
                                {folders.map((folder: any) => (
                                    <div key={folder.id} className="group relative">
                                        {editingFolderId === folder.id ? (
                                            <form onSubmit={handleFolderSubmit} className="px-2">
                                                <input 
                                                    type="text" 
                                                    autoFocus
                                                    className="w-full bg-white border border-gray-300 rounded text-sm px-2 py-1 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]"
                                                    value={folderForm.data.name}
                                                    onChange={e => folderForm.setData('name', e.target.value)}
                                                    onBlur={() => setEditingFolderId(null)}
                                                />
                                            </form>
                                        ) : (
                                            <Link 
                                                href={`/admin/notes?folder_id=${folder.id}`}
                                                preserveState={true}
                                                onClick={() => setMobileActivePane('list')}
                                                className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${currentFolderId == folder.id ? 'bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800'}`}
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <Folder className={`w-4 h-4 shrink-0 ${currentFolderId == folder.id ? 'text-[#c9952a] dark:text-[#ffca28] fill-[#c9952a]/20' : 'text-gray-500 fill-gray-400/20'}`} />
                                                    <span className="truncate">{folder.name}</span>
                                                </div>
                                                <span className="text-[12px] opacity-60 font-normal shrink-0">
                                                    {notes.filter((n: any) => n.folder_id === folder.id).length || 0}
                                                </span>
                                            </Link>
                                        )}

                                        {/* Hover Actions */}
                                        <div className={`absolute right-1 top-1/2 -translate-y-1/2 items-center gap-0.5 ${currentFolderId == folder.id ? 'flex text-white' : 'hidden group-hover:flex text-gray-500'}`}>
                                            <button 
                                                onClick={(e) => { e.preventDefault(); setEditingFolderId(folder.id); folderForm.setData('name', folder.name); }}
                                                className="p-1 hover:opacity-70 transition-opacity"
                                            >
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.preventDefault(); deleteFolder(folder.id); }}
                                                className="p-1 hover:opacity-70 transition-opacity"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Middle Pane: Note List */}
                {!isFullscreen && (
                    <div className={`${mobileActivePane === 'list' ? 'flex' : 'hidden md:flex'} w-full md:w-80 flex-1 md:flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-admin-surface flex-col`}>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <button onClick={() => setMobileActivePane('folders')} className="md:hidden flex items-center gap-1 -ml-2 text-[#c9952a] dark:text-[#ffca28] hover:opacity-70 transition-opacity px-2">
                                    <ChevronLeft className="w-5 h-5" />
                                    <span className="text-[15px]">Folders</span>
                                </button>
                                <h2 className="text-[17px] font-semibold text-gray-900 dark:text-admin-text hidden md:block">Notes</h2>
                            </div>
                            {!isBin && (
                                <button onClick={createNote} className="p-1.5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 rounded-md">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="px-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search team notes"
                                    className="w-full pl-10 pr-3 py-1.5 bg-[#f4f5f5] dark:bg-gray-900 border-none rounded-md text-[13px] focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-400"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {filteredNotes.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm">No notes found.</div>
                            ) : (
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {filteredNotes.map((note: any, idx: number) => (
                                        <div 
                                            key={note.id} 
                                            onClick={() => setSelectedNote(note)}
                                            className={`p-4 cursor-pointer transition-colors ${selectedNote?.id === note.id ? 'bg-[#FFC107] text-white' : 'bg-white hover:bg-[#f4f5f5] dark:bg-admin-surface dark:hover:bg-admin-surface-muted'}`}
                                        >
                                            <h3 className={`font-bold text-[14px] truncate mb-0.5 ${selectedNote?.id === note.id ? 'text-white' : 'text-gray-900 dark:text-admin-text'}`}>
                                                {note.title || 'Untitled Note'}
                                            </h3>
                                            <div className={`flex items-center gap-2 text-[12px] ${selectedNote?.id === note.id ? 'text-yellow-100' : 'text-gray-500'}`}>
                                                <span className="font-medium whitespace-nowrap">{formatDate(note.updated_at)}</span>
                                                <span className="truncate opacity-80">{note.content ? note.content.replace(/<[^>]*>?/gm, '').substring(0, 30) : 'No additional text'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Right Pane: Editor */}
                <div className={`${mobileActivePane === 'editor' ? 'flex' : 'hidden md:flex'} flex-1 bg-white dark:bg-admin-bg flex-col w-full min-w-0`}>
                    {selectedNote ? (
                        <>
                            <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/50 shrink-0">
                                <div className="flex items-center">
                                    <button onClick={() => { setSelectedNote(null); setMobileActivePane('list'); }} className="md:hidden flex items-center gap-1 -ml-2 text-[#c9952a] dark:text-[#ffca28] hover:opacity-70 transition-opacity px-2">
                                        <ChevronLeft className="w-5 h-5" />
                                        <div className="flex flex-col items-start leading-tight">
                                            <span className="text-[13px] font-semibold">{currentFolderId ? folders.find((f: any) => f.id == currentFolderId)?.name || 'Folder' : 'All Cloud Notes'}</span>
                                        </div>
                                    </button>
                                    <div className="hidden md:flex flex-col items-start ml-2 text-gray-400">
                                        <span className="text-[11px] font-medium">{formatDate(selectedNote.updated_at)} at {new Date(selectedNote.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="hidden sm:flex items-center gap-4 mr-2">
                                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><SquarePen className="w-[18px] h-[18px]" /></button>
                                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><Type className="w-[18px] h-[18px]" /></button>
                                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><ListTodo className="w-[18px] h-[18px]" /></button>
                                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><Table className="w-[18px] h-[18px]" /></button>
                                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><Paperclip className="w-[18px] h-[18px]" /></button>
                                    </div>
                                    {isBin ? (
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => restoreNote(selectedNote.id)} className="text-sm font-medium hover:text-green-600 transition-colors" title="Restore">Restore</button>
                                            <button onClick={() => deleteNote(selectedNote.id)} className="hover:text-red-600 transition-colors" title="Delete Forever"><Trash2 className="w-[18px] h-[18px]" /></button>
                                        </div>
                                    ) : (
                                        <button onClick={() => trashNote(selectedNote.id)} className="hover:text-red-500 transition-colors" title="Move to bin">
                                            <Trash2 className="w-[18px] h-[18px]" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 max-w-4xl w-full mx-auto">
                                <input
                                    type="text"
                                    value={selectedNote.title || ''}
                                    onChange={(e) => handleNoteChange('title', e.target.value)}
                                    placeholder="Title"
                                    className="w-full text-3xl font-bold text-gray-900 dark:text-admin-text bg-transparent border-none focus:ring-0 p-0 mb-4 placeholder-gray-300 dark:placeholder-gray-600"
                                    readOnly={isBin}
                                />
                                <textarea
                                    value={selectedNote.content || ''}
                                    onChange={(e) => handleNoteChange('content', e.target.value)}
                                    placeholder="Start typing your note here..."
                                    className="w-full h-full text-[15px] leading-relaxed text-gray-700 dark:text-admin-text bg-transparent border-none focus:ring-0 p-0 resize-none placeholder-gray-300 dark:placeholder-gray-600"
                                    readOnly={isBin}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                            <FileText className="w-16 h-16 mb-4 opacity-30" />
                            <p className="text-[17px] font-semibold text-gray-400">Select a note or create a new one</p>
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
}
