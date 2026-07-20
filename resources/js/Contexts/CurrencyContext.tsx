import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CurrencyData = {
    code: string;
    symbol: string;
    rate: number; // multiplier from USD
};

interface CurrencyContextType {
    currentCurrency: string;
    currencies: Record<string, CurrencyData>;
    setCurrentCurrency: (code: string) => void;
    formatPrice: (usdPrice: number | string) => string;
    isLoadingRates: boolean;
}

const defaultCurrencies: Record<string, CurrencyData> = {
    'USD': { code: 'USD', symbol: '$', rate: 1 },
    'KHR': { code: 'KHR', symbol: '៛', rate: 4100 }, // Default fallback
    'CNY': { code: 'CNY', symbol: '¥', rate: 7.2 },
};

const CurrencyContext = createContext<CurrencyContextType>({
    currentCurrency: 'USD',
    currencies: defaultCurrencies,
    setCurrentCurrency: () => {},
    formatPrice: (p) => `$${p}`,
    isLoadingRates: false,
});

export const useCurrency = () => useContext(CurrencyContext);

interface ProviderProps {
    children: ReactNode;
}

export const CurrencyProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentCurrency, setCurrentCurrencyState] = useState('USD');
    const [currencies, setCurrencies] = useState<Record<string, CurrencyData>>(defaultCurrencies);
    const [isLoadingRates, setIsLoadingRates] = useState(true);

    useEffect(() => {
        // Load saved currency from localStorage
        const savedCurrency = localStorage.getItem('currency');
        if (savedCurrency && defaultCurrencies[savedCurrency]) {
            setCurrentCurrencyState(savedCurrency);
        }

        // Fetch live exchange rates
        const fetchRates = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                const data = await response.json();
                
                if (data && data.rates) {
                    setCurrencies({
                        'USD': { code: 'USD', symbol: '$', rate: 1 },
                        'KHR': { code: 'KHR', symbol: '៛', rate: data.rates.KHR || 4100 },
                        'CNY': { code: 'CNY', symbol: '¥', rate: data.rates.CNY || 7.2 },
                    });
                }
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
            } finally {
                setIsLoadingRates(false);
            }
        };

        fetchRates();
    }, []);

    const setCurrentCurrency = (code: string) => {
        if (currencies[code]) {
            setCurrentCurrencyState(code);
            localStorage.setItem('currency', code);
        }
    };

    const formatPrice = (usdPrice: number | string) => {
        const price = typeof usdPrice === 'string' ? parseFloat(usdPrice) : usdPrice;
        if (isNaN(price)) return 'N/A';

        const curr = currencies[currentCurrency];
        if (!curr) return `$${price.toFixed(2)}`;

        const converted = price * curr.rate;

        // Formatting rules
        if (curr.code === 'KHR') {
            // Riel is usually whole numbers, round to nearest 100
            const rounded = Math.round(converted / 100) * 100;
            return `${curr.symbol}${rounded.toLocaleString('en-US')}`;
        }
        
        return `${curr.symbol}${converted.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currentCurrency, currencies, setCurrentCurrency, formatPrice, isLoadingRates }}>
            {children}
        </CurrencyContext.Provider>
    );
};
