import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import MainLayout from '../Layouts/MainLayout';
import { Moon, Globe, Info, ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function Settings() {
    const { t, i18n } = useTranslation();
    const { general_settings }: any = usePage().props;

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
        { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    ];

    return (
        <MainLayout title="Settings" description="App Settings and Preferences">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
                
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-4 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-primary transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-black text-gray-950 dark:text-white">Settings</h1>
                    </div>
                </div>

                <div className="px-5 mt-6 space-y-8">
                    
                    {/* Appearance */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2">Appearance</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <Moon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-950 dark:text-white">Dark Mode</span>
                                </div>
                                {/* Mock Toggle Switch since actual toggle is handled by MainLayout in this demo */}
                                <div className="w-12 h-7 bg-brand-primary rounded-full relative cursor-pointer">
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Language */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2">Language</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {languages.map((lang, index) => (
                                <button
                                    key={lang.code}
                                    onClick={() => i18n.changeLanguage(lang.code)}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${index !== languages.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block font-bold text-gray-950 dark:text-white">{lang.name}</span>
                                            <span className="text-xs font-medium text-gray-500">{lang.nativeName}</span>
                                        </div>
                                    </div>
                                    {i18n.language === lang.code && (
                                        <Check className="w-5 h-5 text-brand-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* App Info */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-2">About App</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-950 dark:text-white">Version</span>
                                </div>
                                <span className="text-sm font-bold text-gray-500">v2.0.0</span>
                            </div>
                            <Link href="/terms" className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800">
                                <span className="font-bold text-gray-950 dark:text-white ml-[56px]">Terms of Service</span>
                                <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                            </Link>
                            <Link href="/privacy" className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span className="font-bold text-gray-950 dark:text-white ml-[56px]">Privacy Policy</span>
                                <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </MainLayout>
    );
}
