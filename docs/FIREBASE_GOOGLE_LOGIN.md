# Firebase Google Login

This project uses Firebase Google Sign-In only for the customer-facing website. CMS Super Admin and Admin login remains the separate Laravel password login at `/cms/login`.

## Firebase Project Setup

1. Create or open a Firebase project.
2. Add a Web app in Firebase project settings.
3. Enable Authentication -> Sign-in method -> Google.
4. Add the production domain and local development hosts to Authorized domains, such as `localhost` and `127.0.0.1`.

## Frontend Environment

Add these values to `.env` for Vite:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

These Web SDK values are not service-account secrets, but they should still be managed through environment configuration and not hardcoded in React components.

## Server Credentials

Create a Firebase service account JSON file in Firebase project settings and store it outside public, resources, and source-controlled paths.

Recommended examples:

```env
FIREBASE_CREDENTIALS=/absolute/private/path/firebase-service-account.json
GOOGLE_APPLICATION_CREDENTIALS=/absolute/private/path/firebase-service-account.json
FIREBASE_PROJECT_ID=your-firebase-project-id
```

Never commit the service-account JSON. The repository ignores common service-account filenames and `storage/firebase/*.json`.

## Laravel Verification

The endpoint `POST /auth/firebase/google` accepts:

```json
{
  "id_token": "Firebase ID token"
}
```

Laravel verifies the signed Firebase ID token with `kreait/laravel-firebase`, reads the verified UID and email claims, and then creates the normal Laravel customer session. The backend never trusts a frontend email, UID, role, customer ID, or permissions value.

## Customer Account Rules

- New customers receive a backend-generated permanent customer code such as `CUS-2026-000001`.
- Existing customer records are linked only when the verified Google email safely matches a non-privileged customer account.
- Admin, Super Admin, staff, store manager, and editor accounts are never linked as customers.
- Disabled customer accounts are rejected with a customer-safe error.
- Customers missing required profile fields are redirected to `/profile/complete`.

## Local Auth Emulator

Install Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init emulators
```

Select Authentication Emulator, then start it:

```bash
firebase emulators:start --only auth
```

For local React development:

```env
VITE_FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
```

The frontend connects to the emulator only in Vite development mode when this variable is configured. Do not configure the emulator host in production.

## Production Deployment

1. Configure Firebase authorized production domains.
2. Set all `VITE_FIREBASE_*` values during frontend build.
3. Set `FIREBASE_CREDENTIALS` or `GOOGLE_APPLICATION_CREDENTIALS` on the server.
4. Keep cookies secure, HTTP-only, and SameSite protected.
5. Run migrations before serving traffic.

## Troubleshooting

- Unauthorized domain: add the host in Firebase Authentication authorized domains.
- Blank login or disabled button: check that all required `VITE_FIREBASE_*` values are present at build time.
- Backend verification failure: check the service-account path, Firebase project ID, and server logs.
- Popup blocked: allow pop-ups or retry on a browser that supports Firebase popup sign-in.
- Mobile redirects: Firebase may use redirect fallback when popup sign-in cannot complete safely.

## Security Warnings

Do not log Firebase ID tokens, OAuth access tokens, refresh tokens, service-account private keys, or full Google profile responses. Server logs should keep only safe diagnostic details such as error class, action, IP address, and user agent.
