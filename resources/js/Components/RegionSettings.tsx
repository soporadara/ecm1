import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '../Contexts/CurrencyContext';

interface RegionSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    language: string;
    languages: string[];
    changeLanguage: (lang: string) => void;
}

export default function RegionSettings({ isOpen, onClose, language, languages, changeLanguage }: RegionSettingsProps) {
    const { currentCurrency, setCurrentCurrency } = useCurrency();
    
    // Local state for the form so we only apply on Save
    const [selectedLang, setSelectedLang] = useState(language);
    const [selectedCurr, setSelectedCurr] = useState(currentCurrency);
    const modalRef = useRef<HTMLDivElement>(null);

    // Sync form with actual state when opened
    useEffect(() => {
        if (isOpen) {
            setSelectedLang(language);
            setSelectedCurr(currentCurrency);
        }
    }, [isOpen, language, currentCurrency]);

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSave = () => {
        changeLanguage(selectedLang);
        setCurrentCurrency(selectedCurr);
        onClose();
    };

    return (
        <div 
            ref={modalRef}
            className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden z-50 p-5 font-sans"
        >
            <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">Country</label>
                <div className="relative">
                    <select 
                        value={selectedCurr}
                        onChange={(e) => setSelectedCurr(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 pl-10 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    >
                        <option value="USD">United States - USD ($)</option>
                        <option value="KHR">Cambodia - KHR (៛)</option>
                        <option value="CNY">China - CNY (¥)</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {selectedCurr === 'USD' && <span className="text-lg">🇺🇸</span>}
                        {selectedCurr === 'KHR' && <span className="text-lg">🇰🇭</span>}
                        {selectedCurr === 'CNY' && <span className="text-lg">🇨🇳</span>}
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Language / ភាសា / 语言</label>
                <div className="relative">
                    <select 
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    >
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleSave}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
            >
                Save
            </button>
        </div>
    );
}
