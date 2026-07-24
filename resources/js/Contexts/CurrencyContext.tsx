import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'VND';

type CurrencyData = {
    code: CurrencyCode;
    symbol: string;
    label: string;
};

interface CurrencyContextType {
    currentCurrency: CurrencyCode;
    currencies: Record<CurrencyCode, CurrencyData>;
    setCurrentCurrency: (code: CurrencyCode) => void;
    formatAmount: (amount: number | string | null | undefined, code?: CurrencyCode) => string;
    formatPrice: (amount: number | string | null | undefined, code?: CurrencyCode) => string;
    isLoadingRates: boolean;
}

const defaultCurrencies: Record<CurrencyCode, CurrencyData> = {
    USD: { code: 'USD', symbol: '$', label: 'United States Dollar' },
    VND: { code: 'VND', symbol: '₫', label: 'Vietnamese Dong' },
};

const normalizeCurrency = (value: unknown): CurrencyCode => value === 'VND' ? 'VND' : 'USD';

const CurrencyContext = createContext<CurrencyContextType>({
    currentCurrency: 'USD',
    currencies: defaultCurrencies,
    setCurrentCurrency: () => {},
    formatAmount: (amount) => `$${(Number(amount || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    formatPrice: (amount) => `$${(Number(amount || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    isLoadingRates: false,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: ReactNode; defaultCurrency?: unknown }> = ({ children, defaultCurrency }) => {
    const detectedDefault = normalizeCurrency(defaultCurrency);
    const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyCode>(detectedDefault);

    useEffect(() => {
        const savedCurrency = localStorage.getItem('currency');
        setCurrentCurrencyState(normalizeCurrency(savedCurrency || detectedDefault));
    }, [detectedDefault]);

    const setCurrentCurrency = (code: CurrencyCode) => {
        const next = normalizeCurrency(code);
        setCurrentCurrencyState(next);
        localStorage.setItem('currency', next);
    };

    const formatAmount = (amount: number | string | null | undefined, code: CurrencyCode = currentCurrency) => {
        if (amount === null || amount === undefined || amount === '') {
            return 'Pending confirmation';
        }

        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount)) {
            return 'Pending confirmation';
        }

        if (code === 'VND') {
            return `₫${Math.round(numericAmount).toLocaleString('en-US')}`;
        }

        return `$${(Math.round(numericAmount) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <CurrencyContext.Provider value={{
            currentCurrency,
            currencies: defaultCurrencies,
            setCurrentCurrency,
            formatAmount,
            formatPrice: formatAmount,
            isLoadingRates: false,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};
