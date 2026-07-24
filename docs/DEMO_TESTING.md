# Demo Testing

## Stack

- Backend: Laravel routes, controllers, middleware, migrations, models, seed commands, and tests.
- Frontend: React with Inertia and TypeScript components.

## Public Navigation

The public header and mobile drawer show exactly:

- Home
- Manual Order
- Contact

Blogs are not advertised in the public header, mobile drawer, or footer navigation. CMS blog management remains available under the CMS post management routes.

Manual Order links point to `/manual-order`. Logged-out visitors are sent to `/login` by Laravel auth middleware and return to `/manual-order` through the intended URL.

## Header Behavior

- Top state on the homepage: transparent fixed header with a subtle top gradient for contrast.
- Scroll threshold: 48px.
- Scrolled state: solid sticky-style header with light/dark surfaces, border, shadow, and backdrop blur.
- Header state is exposed with `data-header-state="transparent|solid"`.
- Header theme is exposed with `data-header-theme`.
- Banner records support `header_theme`; the storefront also uses a controlled gradient to keep text readable.

## Controls

- Language control is separate from currency.
- Supported languages: Khmer (`km`), English (`en`), Vietnamese (`vi`).
- Khmer is default.
- Supported currencies: USD and VND only.
- KHR and the Riel symbol are removed from active customer-facing controls and new manual-order validation.
- Customer profile fallback uses a human icon, not a letter avatar.
- CMS uses its own admin layout and does not inherit the public transparent header.

## Duplicate Menu Cleanup

Customer account navigation uses one destination for order tracking and history: `My Orders`.

Removed from customer header, mobile menu, footer, and dashboard shortcuts:

- Track Orders
- Order History
- Track My Orders
- View Order History

Old bookmarked routes redirect safely:

- `/track-orders` -> `/my-orders`
- `/order-history` -> `/my-orders`
- `/dashboard/track` -> `/my-orders`

## Homepage Services

The homepage service area now shows exactly two cards:

- Product Purchasing Service -> `/manual-order`
- Logistics and Delivery Service -> `/my-orders` or `/login` for guests

Available Sites is restored directly below the two service cards. Super Admins manage those sites in CMS at `/admin/available-sites`.

## Retired CMS Modules

These incomplete modules are no longer shown in the CMS sidebar:

- Manual Order Wording
- Media Library
- Contact Messages
- SEO

The public Contact page is static support information only. The old `/contact` POST submission route is removed.

## Demo Commands

```bash
composer install
npm install
php artisan migrate
php artisan demo:seed --fresh
npm run build
php artisan test tests/Feature/ManualOrderPlatformTest.php tests/Feature/CmsTest.php tests/Feature/ImportTest.php
```

Demo commands refuse to run in production and operate only on rows marked with `is_demo` and `demo_batch_id`.

## Demo Credentials

These are development-only credentials. Never use them in production.

Customer login: `/login`

Customer authentication is Google-only through Firebase. Demo customer records remain available for database, UI, and automated testing, but the public site no longer supports customer passwords, registration passwords, forgot-password, or temporary customer passwords.

CMS login: `/cms/login`

Customer 1:

- Email: `sokha.customer@example.test`
- Customer ID: `CUS-TEST-KH-0001`
- Language: Khmer
- Currency: USD

Customer 2:

- Email: `nguyen.customer@example.test`
- Customer ID: `CUS-TEST-VN-0002`
- Language: Vietnamese
- Currency: VND

Super Admin:

- Email: `superadmin@example.test`
- Password: `SuperAdmin@12345`
- Role: Super Admin

Admin:

- Email: `admin@example.test`
- Password: `Admin@12345`
- Role: Admin

## Demo Orders

- `ORD-TEST-KH-0001`: USD, processing internally, customer status In Progress, partially paid $25.00, outstanding $69.00.
- `ORD-TEST-KH-0002`: USD, delivered, final total $63.00, paid.
- `ORD-TEST-VN-0001`: VND, pricing review, customer status In Progress, unpaid.
- `ORD-TEST-VN-0002`: VND, delayed internally, customer status In Progress, final total 1530000, unpaid.

Receipt:

- `RCP-TEST-KH-0001`

## Demo Assets

Processed WebP image paths are created under:

- `storage/app/public/demo-order-images`
- `storage/app/public/demo-banners`

PDF fixtures are created under:

- `storage/app/private/demo-attachments/demo-size-guide.pdf`
- `storage/app/private/demo-attachments/demo-product-specification.pdf`

Demo banners are seeded as four local processed images with these titles:

- Create a Manual Order
- Product Purchasing Service
- Professional Logistics Support
- Track Your Order Progress

The current implementation uses generated local placeholder assets for demo banners if external import is unavailable.

## Test Commands

```bash
php artisan migrate
php artisan demo:seed
php artisan test
npm run test
npm run typecheck
npm run build
```

`npm run test` currently delegates to the TypeScript checker because no browser test runner is installed in this repository.

## Known Limitations

- Full visual screenshot capture requires a browser automation setup. Headless Chrome can verify rendered DOM locally, but Playwright is not installed in this project.
- Public blog routes remain directly accessible; they are CMS-managed content, but Blogs are no longer advertised in primary public navigation.
- Receipt PDF/image versioning and the full CMS Appearance -> Branding workflow remain partial compared with the long-form prompt; existing logo/favicon settings are still available in general settings.
