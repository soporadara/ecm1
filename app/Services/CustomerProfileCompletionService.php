<?php

namespace App\Services;

use App\Models\User;

class CustomerProfileCompletionService
{
    /**
     * @return array<string, string>
     */
    public function missingFields(User $customer): array
    {
        $missing = [];

        if (blank($customer->name)) {
            $missing['name'] = 'Full name';
        }


        if (blank($customer->phone_e164)) {
            $missing['phone_e164'] = 'Phone number';
        }

        if (blank($customer->address_line_1)) {
            $missing['address_line_1'] = 'Delivery address';
        }

        if (blank($customer->city) && blank($customer->province)) {
            $missing['city'] = 'City or province';
        }

        if (blank($customer->country_code)) {
            $missing['country_code'] = 'Country';
        }

        if (blank($customer->preferred_locale) && blank($customer->preferred_language)) {
            $missing['preferred_locale'] = 'Preferred language';
        }

        if (blank($customer->preferred_currency)) {
            $missing['preferred_currency'] = 'Preferred currency';
        }

        return $missing;
    }

    public function isComplete(User $customer): bool
    {
        return $this->missingFields($customer) === [];
    }

    public function canCreateManualOrder(User $customer): bool
    {
        return true;
    }

    public function completionRoute(): string
    {
        return route('profile.complete');
    }

    public function markCompleted(User $customer): void
    {
        if ($this->isComplete($customer)) {
            $customer->forceFill([
                'profile_completed_at' => $customer->profile_completed_at ?? now(),
                'profile_onboarding_skipped_at' => null,
                'customer_code' => $customer->customer_code ?: User::generateCustomerCode(),
            ])->save();
        }
    }
}
