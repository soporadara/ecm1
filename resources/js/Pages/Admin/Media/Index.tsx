import { Head, useForm, router } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Media {
    id: number;
    name: string;
    url: string;
    mime_type: string;
    size: string;
    created_at: string;
}

interface Paginated {
    data: Media[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function MediaIndex({ media }: { media: Paginated }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, progress, reset } = useForm({
        files: [] as File[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploading(true);
            const filesArray = Array.from(e.target.files);
            setData('files', filesArray);
            
            // Immediately submit after state update hack since Inertia form needs a tick
            setTimeout(() => {
                router.post('/admin/media', { files: filesArray }, {
                    forceFormData: true,
                    onSuccess: () => toast.success('Files uploaded successfully'),
                    onError: () => toast.error('Failed to upload files'),
                    onFinish: () => {
                        setUploading(false);
                        reset();
                        if (fileInputRef.current) fileInputRef.current.value = '';
                    }
                });
            }, 50);
        }
    };

    const handleDelete = async (id: number) => {
        if (!(await confirmAction('Delete this file permanently?'))) return;
        router.delete(`/admin/media/${id}`, {
            onSuccess: () => toast.success('File deleted successfully'),
            onError: () => toast.error('Failed to delete file'),
        });
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard!');
    };

    return (
        <AdminLayout
            title="Media Library"
            actions={
                <div>
                    <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {uploading ? 'Uploading...' : 'Upload Files'}
                    </button>
                </div>
            }
        >
            <Head title="Media Library — Rafel CMS" />

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Media Library</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your product images and other files.</p>
            </div>

            {uploading && progress && (
                <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 shadow-sm">
                    <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-indigo-700 dark:text-indigo-400">Uploading files...</span>
                        <span className="text-indigo-700 dark:text-indigo-400">{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                    </div>
                </div>
            )}

            {media.data.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed p-12 text-center shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">No media files</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by uploading a file.</p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >
                        Upload a file
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {media.data.map(file => (
                        <div key={file.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-900 relative overflow-hidden group-hover:opacity-90">
                                {file.mime_type.startsWith('image/') ? (
                                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                
                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button 
                                        onClick={() => copyToClipboard(file.url)}
                                        className="p-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                                        title="Copy URL"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                    </button>
                                    <a 
                                        href={file.url} target="_blank" rel="noreferrer"
                                        className="p-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                                        title="Open in new tab"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                    <button 
                                        onClick={() => handleDelete(file.id)}
                                        className="p-1.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50"
                                        title="Delete"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate" title={file.name}>{file.name}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-[10px] text-gray-500 dark:text-gray-500 uppercase">{file.mime_type.split('/')[1]}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-600">{file.size}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Pagination Placeholder */}
            {media.last_page > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    {/* Basic pagination for now */}
                </div>
            )}
        </AdminLayout>
    );
}
