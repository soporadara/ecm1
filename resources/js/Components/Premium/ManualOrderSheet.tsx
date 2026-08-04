import { X, User, Phone, MapPin, Package, DollarSign, ListOrdered, Tag, FileText, Paperclip, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ManualOrderSheet({ isOpen, onClose }: Props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Mock form state
    const [form, setForm] = useState({
        customer_name: '',
        phone_number: '',
        address: '',
        service: '',
        price: '',
        quantity: '1',
        discount: '0',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 z-[151] lg:hidden bg-white dark:bg-gray-950 rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
                    >
                        {/* Header Handle */}
                        <div className="flex justify-center pt-3 pb-1 shrink-0 bg-white dark:bg-gray-950">
                            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                        </div>

                        {/* Header Content */}
                        <div className="px-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-white dark:bg-gray-950">
                            <div>
                                <h2 className="text-xl font-black text-gray-950 dark:text-white">Create Order</h2>
                                <p className="text-xs font-bold text-gray-500">Quick manual entry</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto px-5 py-6">
                            <form id="manual-order-form" onSubmit={handleSubmit} className="space-y-5">
                                
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Customer Info</h3>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Customer Name"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="Phone Number"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Address / Location"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-900">
                                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Order Details</h3>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Service / Product Name"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <DollarSign className="w-5 h-5" />
                                            </div>
                                            <input 
                                                required
                                                type="number" 
                                                placeholder="Price"
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <ListOrdered className="w-5 h-5" />
                                            </div>
                                            <input 
                                                required
                                                type="number" 
                                                min="1"
                                                placeholder="Qty"
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-900">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 pt-3.5 pointer-events-none text-gray-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <textarea 
                                            placeholder="Notes (Optional)"
                                            rows={3}
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-[15px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 transition-shadow resize-none"
                                        />
                                    </div>
                                </div>

                            </form>
                            <div className="h-6" /> {/* Bottom spacing */}
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="px-5 py-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 shrink-0">
                            <motion.button
                                form="manual-order-form"
                                type="submit"
                                disabled={loading || success}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full relative flex items-center justify-center h-14 rounded-2xl text-white font-black text-lg transition-colors overflow-hidden ${
                                    success ? 'bg-green-500' : 'bg-brand-primary shadow-lg shadow-brand-primary/20'
                                }`}
                            >
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        </motion.div>
                                    ) : success ? (
                                        <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <CheckCircle2 className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            Submit Order
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
