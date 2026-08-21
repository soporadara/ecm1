import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { AlertOctagon, ShieldAlert, Award, FileText, HelpCircle, Package, Flame, HeartCrack } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

export default function ProhibitedItems() {
    const { t } = useTranslation();

    const categories = [
        {
            title: t('prohibited_items.narcotics.title'),
            subtitle: t('prohibited_items.narcotics.subtitle'),
            icon: HeartCrack,
            color: "from-rose-500 to-red-600",
            lightBg: "bg-rose-50/50 dark:bg-rose-950/10",
            textColor: "text-rose-600 dark:text-rose-400",
            items: [
                t('prohibited_items.narcotics.item1'),
                t('prohibited_items.narcotics.item2'),
                t('prohibited_items.narcotics.item3'),
                t('prohibited_items.narcotics.item4')
            ]
        },
        {
            title: t('prohibited_items.wildlife.title'),
            subtitle: t('prohibited_items.wildlife.subtitle'),
            icon: ShieldAlert,
            color: "from-amber-500 to-orange-600",
            lightBg: "bg-amber-50/50 dark:bg-amber-950/10",
            textColor: "text-amber-600 dark:text-amber-400",
            items: [
                t('prohibited_items.wildlife.item1'),
                t('prohibited_items.wildlife.item2'),
                t('prohibited_items.wildlife.item3'),
                t('prohibited_items.wildlife.item4')
            ]
        },
        {
            title: t('prohibited_items.weapons.title'),
            subtitle: t('prohibited_items.weapons.subtitle'),
            icon: Flame,
            color: "from-orange-500 to-red-600",
            lightBg: "bg-orange-50/50 dark:bg-orange-950/10",
            textColor: "text-orange-600 dark:text-orange-400",
            items: [
                t('prohibited_items.weapons.item1'),
                t('prohibited_items.weapons.item2'),
                t('prohibited_items.weapons.item3'),
                t('prohibited_items.weapons.item4')
            ]
        },
        {
            title: t('prohibited_items.adult.title'),
            subtitle: t('prohibited_items.adult.subtitle'),
            icon: AlertOctagon,
            color: "from-pink-500 to-rose-600",
            lightBg: "bg-pink-50/50 dark:bg-pink-950/10",
            textColor: "text-pink-600 dark:text-pink-400",
            items: [
                t('prohibited_items.adult.item1'),
                t('prohibited_items.adult.item2'),
                t('prohibited_items.adult.item3'),
                t('prohibited_items.adult.item4')
            ]
        }
    ];

    return (
        <MainLayout title={t('prohibited_items.page_title')} description={t('prohibited_items.page_desc')}>
            <Head title={`${t('prohibited_items.page_title')} - MVM Logistics`} />
            
            <div className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 sm:py-28">
                {/* Visual Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 opacity-30 dark:opacity-20 blur-3xl">
                    <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-red-200 dark:bg-red-900/30" />
                    <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-brand-primary/10" />
                </div>

                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                    {/* Header Block */}
                    <div className="text-center mb-16 sm:mb-24">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-rose-100 dark:border-rose-500/10"
                        >
                            <AlertOctagon className="w-10 h-10 text-rose-500 animate-pulse" />
                        </motion.div>
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl font-serif"
                        >
                            {t('prohibited_items.heading')}
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            {t('prohibited_items.subheading')}
                        </motion.p>
                    </div>

                    {/* Prohibited Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 mb-16">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={cat.title}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                    className="relative flex flex-col p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all overflow-hidden"
                                >
                                    {/* Top decorative gradient bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.color}`} />
                                    
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-2xl ${cat.lightBg} flex items-center justify-center shrink-0`}>
                                            <Icon className={`w-6 h-6 ${cat.textColor}`} />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{cat.subtitle}</span>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{cat.title}</h3>
                                        </div>
                                    </div>

                                    <ul className="space-y-3.5 flex-1">
                                        {cat.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                                <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gradient-to-r ${cat.color}`} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Secondary Info Block */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-50 dark:bg-gray-900 rounded-3xl p-8 border border-slate-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-start"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{t('prohibited_items.legal.title')}</h3>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                {t('prohibited_items.legal.p1')}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-4">
                                {t('prohibited_items.legal.p2')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
