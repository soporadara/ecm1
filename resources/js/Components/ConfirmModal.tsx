import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const confirmAction = (message: string): Promise<boolean> => {
    if (typeof window === 'undefined') return Promise.resolve(false);
    return new Promise((resolve) => {
        const event = new CustomEvent('show-confirm-modal', {
            detail: { 
                message, 
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
            }
        });
        window.dispatchEvent(event);
    });
};

export default function ConfirmModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);
    const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(null);

    useEffect(() => {
        const handleShow = (e: any) => {
            setMessage(e.detail.message);
            setOnConfirmCallback(() => e.detail.onConfirm);
            setOnCancelCallback(() => e.detail.onCancel);
            setIsOpen(true);
        };

        window.addEventListener('show-confirm-modal', handleShow);
        return () => window.removeEventListener('show-confirm-modal', handleShow);
    }, []);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirmCallback) onConfirmCallback();
        setIsOpen(false);
    };

    const handleCancel = () => {
        if (onCancelCallback) onCancelCallback();
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">Confirm Action</h3>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                        {message}
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-[#181818] px-6 py-4 flex items-center justify-end gap-3">
                    <button 
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
