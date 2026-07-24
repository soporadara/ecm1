<?php

namespace App\Services;

class MoneyService
{
    public const ALLOWED_CURRENCIES = ['USD', 'VND'];

    public function normalizeCurrency(?string $currency): string
    {
        return in_array($currency, self::ALLOWED_CURRENCIES, true) ? $currency : 'USD';
    }

    public function parseMinorUnit(string|int|float|null $value, ?string $currency): int
    {
        if ($value === null || $value === '') {
            return 0;
        }

        $amount = max((float) preg_replace('/[^\d.-]/', '', (string) $value), 0);

        return $this->normalizeCurrency($currency) === 'USD'
            ? (int) round($amount * 100)
            : (int) round($amount);
    }

    public function format(int|float|string|null $amount, ?string $currency): string
    {
        if ($amount === null || $amount === '') {
            return 'Pricing pending';
        }

        $numeric = (int) round((float) $amount);

        return $this->normalizeCurrency($currency) === 'VND'
            ? '₫' . number_format($numeric)
            : '$' . number_format($numeric / 100, 2);
    }
}
