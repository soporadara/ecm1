# Authentication

## Public Customer Auth

The customer website uses React/Inertia pages with the normal public header on:

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/profile/complete`

Customer identity is provided by Firebase Authentication. The frontend signs the user in with Google or Firebase email/password, retrieves a Firebase ID token, and posts it to Laravel at `POST /auth/firebase/session`. Laravel verifies the token server-side before creating the normal Laravel customer session.

Customer sign-in redirects to `/` by default. If the customer originally opened a protected safe local route, the intended route is preserved. External URLs, `/admin`, and `/cms` paths are rejected.

Customer sign-up redirects to `/profile/complete?onboarding=1`. The customer may save their delivery profile or select Skip for Now. Skipping sends the customer to Home and does not block public browsing.

## Profile Onboarding

`App\Services\CustomerProfileCompletionService` owns profile-completion rules. Manual Order requires:

- Full name
- Verified login email
- Phone number
- Delivery address
- City or province
- Country
- Preferred language
- Preferred currency

If an incomplete customer opens `/manual-order`, Laravel stores the intended destination and redirects to `/profile/complete?gate=manual-order`. After saving required fields, the customer returns to `/manual-order`.

Direct Manual Order POST requests from incomplete customers are rejected with validation messages including `PROFILE_COMPLETION_REQUIRED`.

## CMS Separation

CMS authentication remains separate on `/cms/login`. Staff sign in with CMS email/password. Customer Firebase sign-in never creates CMS access, and CMS staff accounts are rejected from customer Firebase linking.

CMS users are validated by role/status after password authentication and redirected only to `/admin`.
