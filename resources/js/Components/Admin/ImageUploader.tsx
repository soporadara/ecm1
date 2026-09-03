import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';

interface UploadingFile {
    id: string;
    file: File;
    progress: number;
    url?: string;
    error?: string;
}

interface ImageUploaderProps {
    onUploadSuccess: (url: string) => void;
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
    const [uploads, setUploads] = useState<UploadingFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image`);
                return;
            }

            const id = Math.random().toString(36).substring(7);
            const newUpload: UploadingFile = { id, file, progress: 0 };
            
            setUploads(prev => [newUpload, ...prev]);
            
            uploadFile(newUpload);
        });
        
        // Reset file input so the same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadFile = async (uploadInfo: UploadingFile) => {
        const formData = new FormData();
        formData.append('image', uploadInfo.file);

        try {
            const response = await window.axios.post('/admin/posts/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent: any) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploads(prev => prev.map(u => u.id === uploadInfo.id ? { ...u, progress: percentCompleted } : u));
                    }
                }
            });

            const url = response.data.url;
            setUploads(prev => prev.map(u => u.id === uploadInfo.id ? { ...u, progress: 100, url } : u));
            onUploadSuccess(url);
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Upload failed';
            setUploads(prev => prev.map(u => u.id === uploadInfo.id ? { ...u, error: errorMessage } : u));
            toast.error(errorMessage);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    };

    const removeUpload = (id: string) => {
        setUploads(prev => prev.filter(u => u.id !== id));
    };

    return (
        <div className="space-y-4">
            <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={e => handleFiles(e.target.files)} 
                />
                <div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                </div>
                <p className="text-[15px] font-bold text-gray-900 dark:text-gray-200">Click or drag images here to upload</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Images are uploaded instantly. Max size: 5MB</p>
            </div>

            {uploads.length > 0 && (
                <div className="space-y-3 mt-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Progress & Links</h4>
                    {uploads.map(upload => (
                        <div key={upload.id} className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-3.5 rounded-xl shadow-sm">
                            <div className="w-14 h-14 shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                {upload.url ? (
                                    <img src={upload.url} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate pr-4">{upload.file.name}</p>
                                    {!upload.url && !upload.error && <span className="text-xs font-bold text-brand-primary">{upload.progress}%</span>}
                                </div>
                                {!upload.url && !upload.error && (
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-1.5 overflow-hidden">
                                        <div className="bg-brand-primary h-full rounded-full transition-all duration-300" style={{ width: `${upload.progress}%` }}></div>
                                    </div>
                                )}
                                {upload.error && <p className="text-xs font-medium text-red-500 mt-1">{upload.error}</p>}
                                {upload.url && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <input type="text" readOnly value={upload.url} className="text-[13px] w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-primary" onClick={e => (e.target as HTMLInputElement).select()} />
                                        <button type="button" onClick={() => copyToClipboard(upload.url!)} className="shrink-0 text-[13px] font-bold bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-lg transition-colors">Copy</button>
                                    </div>
                                )}
                            </div>
                            <button type="button" onClick={() => removeUpload(upload.id)} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" title="Dismiss">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
