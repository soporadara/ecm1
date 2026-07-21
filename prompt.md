You are a senior Laravel, React, Inertia.js, TypeScript, Tailwind CSS, Firebase Authentication, e-commerce integration, cross-border purchasing and logistics platform engineer.


Do not create a separate project.
Do not rebuild the application from scratch.
Do not delete existing working features or database data.
Do not replace Laravel, React, Inertia, TypeScript, Tailwind or the current CMS architecture.

The existing project uses approximately:

- Laravel 12
- PHP 8.2+
- React 19
- Inertia.js 
- TypeScript
- Tailwind CSS 4
- Vite
- Existing CMS/admin system
- Existing products, categories, cart, checkout, orders and payments
- Existing authentication and permissions
- Existing storefront pages

The purpose of this update is to transform the public website from a normal product shop into a modern purchasing-agent and cross-border logistics platform.

The public website should work similarly to the purchasing flow of:

https://taobaooutlets.com/

Use that website only as workflow inspiration.

Do not copy its branding, visual design, code, text or assets.

Create a better, more modern, responsive and accessible interface.

==================================================
1. PRIMARY BUSINESS MODEL
==================================================

The company is not primarily selling its own products.

The main business model is:

1. Customer finds a product on an external marketplace.
2. Customer copies the product URL.
3. Customer pastes the URL into our website.
4. Our system detects the marketplace.
5. Our system attempts to retrieve the product information.
6. Customer chooses product variants, quantity and remarks.
7. Customer submits a purchasing request.
8. Our staff purchases the product for the customer.
9. The seller sends the product to our warehouse.
10. Our warehouse receives, inspects and measures the parcel.
11. The customer pays the final logistics cost.
12. We ship the parcel to the customer.
13. The customer tracks the parcel from the dashboard.

Supported marketplaces should initially include:

- Taobao
- Tmall
- 1688
- Alibaba
- Pinduoduo
- AliExpress

The architecture must support adding additional marketplaces later.

Customers may also use a “Ship for Me” service:

1. Customer buys directly from a marketplace.
2. Customer uses our warehouse address.
3. Customer registers the expected parcel in our website.
4. We receive the parcel.
5. We consolidate, measure and ship the parcel.

==================================================
2. IMPORTANT PRODUCT STOREFRONT CHANGE
==================================================

The current website contains normal product-store functionality.

Do not delete it.

Keep the current products, product categories, brands, collections, inventory, reviews, cart, checkout and product-related CMS modules.

However, hide all public product-store functionality for now.

Create a feature-flag system so administrators can restore it later.

Required feature flags:

- storefront_products_enabled
- storefront_product_search_enabled
- storefront_categories_enabled
- storefront_brands_enabled
- storefront_collections_enabled
- storefront_cart_enabled
- storefront_checkout_enabled
- external_purchase_enabled
- manual_order_enabled
- ship_for_me_enabled
- wallet_enabled
- parcel_forwarding_enabled
- parcel_consolidation_enabled
- marketplace_import_enabled

Initial values:

- storefront_products_enabled = false
- storefront_product_search_enabled = false
- storefront_categories_enabled = false
- storefront_brands_enabled = false
- storefront_collections_enabled = false
- storefront_cart_enabled = false
- storefront_checkout_enabled = false
- external_purchase_enabled = true
- manual_order_enabled = true
- ship_for_me_enabled = true
- wallet_enabled = true
- parcel_forwarding_enabled = true
- parcel_consolidation_enabled = true
- marketplace_import_enabled = true

When normal storefront flags are disabled:

- Remove all products from the homepage.
- Remove product cards and product sliders.
- Remove Shop from the public menu.
- Remove Products from the public menu.
- Remove Categories from the public menu.
- Remove Brands from the public menu.
- Remove Collections from the public menu.
- Remove normal storefront product search.
- Remove product links from the public footer.
- Remove disabled product routes from the public sitemap.
- Do not show product catalogue links in breadcrumbs.
- Redirect disabled public product routes to the homepage or return a branded 404.
- Do not delete any existing product data.
- Do not remove product CMS pages.
- Do not break existing admin product management.
- Allow an administrator to enable the store again later.

CMS modules and menu items must support:

- Enabled or disabled
- Draft
- Private
- Published
- Archived
- Show in admin sidebar
- Hide from admin sidebar
- Show on public website
- Hide from public website
- Sort order
- Role and permission requirement

The administrator must be able to hide a CMS module from the menu without deleting it.

==================================================
3. PUBLIC WEBSITE NAVIGATION
==================================================

Create a minimal and professional public navigation.

Desktop navigation:

- Home
- How It Works
- Shipping Rates
- Warehouses
- Track Parcel
- Contact
- Sign In or Account

Optional “More” menu:

- About Us
- Help Centre
- Prohibited Items
- Purchasing Policy
- Shipping Policy
- Refund and Claims Policy
- Privacy Policy
- Terms and Conditions

Do not show:

- Shop
- Products
- Categories
- Brands
- Collections
- Inventory
- Normal product search

Logged-in customer navigation:

- Dashboard
- Purchase Requests
- Purchase Cart
- Manual Orders
- Ship for Me
- My Parcels
- Consolidation
- Track Parcel
- Warehouse Addresses
- Wallet
- Transactions
- Notifications
- Profile
- Sign Out

Mobile navigation:

- Responsive slide-over menu
- Large touch targets
- Sticky bottom navigation
- Keep the product URL input easy to access

Suggested mobile bottom navigation:

- Home
- Paste Link
- Orders
- Parcels
- Account

==================================================
4. HOMEPAGE
==================================================

Create a polished, mobile-first logistics homepage.

The homepage must not contain normal store products.

Homepage sections in order:

A. Header

Include:

- Company logo
- Minimal navigation
- Language selector
- Currency selector
- Customer notifications
- Sign in or account button

B. Hero banner

The banner must be controlled through the CMS.

CMS fields:

- Desktop image
- Mobile image
- Heading
- Description
- Primary CTA text
- Secondary CTA text
- Background setting
- Text alignment
- Text colour
- Overlay opacity
- Enabled
- Start date
- End date
- Sort order

Suggested heading:

“Shop from Asia. We purchase, receive and deliver it for you.”

Suggested supporting text:

“Paste a product link from Taobao, Tmall, 1688, Alibaba, Pinduoduo or AliExpress.”

C. Main product URL input

Place a large product URL input inside the hero area.

Include:

- URL field
- Paste from clipboard button
- Marketplace detection
- Submit button
- Loading state
- Error state
- Manual Order secondary button

Placeholder:

“Paste a product link from Taobao, 1688, Alibaba, Pinduoduo or AliExpress”

D. Supported marketplace section

Create cards for:

- Taobao
- Tmall
- 1688
- Alibaba
- Pinduoduo
- AliExpress

Each card should support:

- Logo
- Name
- Description
- Website URL
- App deep link
- Open Website button
- Open App button
- Copy-link instructions
- Enabled or disabled
- Marketplace status
- Maintenance message
- Sort order
- Supported countries

Do not claim that the company is an official marketplace partner unless confirmed.

E. How It Works

Use five clear steps:

1. Paste a product link
2. Select product options
3. We purchase the item
4. Item arrives at our warehouse
5. We deliver it to you

F. Services section

Show:

- Purchase for Me
- Ship for Me
- Product Inspection
- Parcel Consolidation
- Warehouse Receiving
- International Shipping
- Parcel Tracking

G. Shipping calculator preview

Fields:

- Origin warehouse
- Destination country
- Weight
- Length
- Width
- Height
- Shipping method
- Product type

Show:

- Estimated actual weight
- Estimated volumetric weight
- Chargeable weight
- Estimated shipping price
- Estimated delivery time

Clearly display:

“This is an estimate. Final shipping cost is based on the parcel’s actual warehouse measurement.”

H. Warehouse section

Display configurable warehouses such as:

- China
- Thailand
- Vietnam

Do not publicly display the full warehouse address to unauthenticated visitors.

Public users may see:

- Country
- City
- Available services
- Operating status
- Working hours
- Estimated delivery routes

Logged-in and phone-verified customers may see the full warehouse address.

I. Why Choose Us

Show:

- Transparent purchasing fees
- Secure customer wallet
- Warehouse inspection
- Parcel consolidation
- International delivery
- Customer support
- Real-time status tracking

J. FAQ

CMS-managed FAQ categories:

- Purchasing
- Product links
- Warehouses
- Shipping
- Payments
- Refunds
- Restricted products
- Accounts

K. Footer

Include:

- Company information
- Services
- Support links
- Policies
- Contact information
- Social links
- Language and currency
- Copyright

==================================================
5. PRODUCT URL DETECTION
==================================================

Create a reusable React component:

ProductUrlInput

Create backend URL validation and marketplace detection.

The system must detect a marketplace using the URL hostname.

Supported examples:

Taobao:

- taobao.com
- item.taobao.com
- m.taobao.com

Tmall:

- tmall.com
- detail.tmall.com

1688:

- 1688.com
- detail.1688.com
- m.1688.com

Alibaba:

- alibaba.com
- www.alibaba.com

Pinduoduo:

- pinduoduo.com
- mobile.yangkeduo.com
- yangkeduo.com

AliExpress:

- aliexpress.com
- www.aliexpress.com
- m.aliexpress.com

Do not place hostname lists directly in multiple frontend components.

Store marketplace domains in:

- Database configuration
- Or a centralized backend config with CMS management

The URL input must:

- Trim whitespace
- Decode encoded URLs safely
- Require HTTPS
- Normalize query parameters
- Remove tracking parameters where safe
- Detect shortened links
- Resolve redirects safely
- Extract external product ID where possible
- Reject unsupported websites
- Reject JavaScript URLs
- Reject data URLs
- Reject file URLs
- Reject localhost
- Reject IP-address URLs
- Reject private IP ranges
- Reject internal hostnames
- Prevent SSRF attacks
- Apply rate limiting
- Use background jobs for imports

Possible states:

- Empty
- Validating
- Marketplace detected
- Import queued
- Importing
- Import successful
- Unsupported marketplace
- Product unavailable
- Login required
- Phone verification required
- Import failed
- Manual review required

==================================================
6. MARKETPLACE PRODUCT IMPORT ARCHITECTURE
==================================================

Create a marketplace adapter architecture.

Suggested folder structure:

app/
  Marketplace/
    Contracts/
      MarketplaceAdapterInterface.php
    DTO/
      MarketplaceProductData.php
      MarketplaceVariantData.php
      MarketplaceOptionGroupData.php
      MarketplaceSellerData.php
    Adapters/
      TaobaoAdapter.php
      TmallAdapter.php
      Alibaba1688Adapter.php
      AlibabaAdapter.php
      PinduoduoAdapter.php
      AliExpressAdapter.php
      ManualOrderAdapter.php
    MarketplaceResolver.php
    MarketplaceUrlNormalizer.php
    MarketplaceImportService.php
    MarketplaceImportResult.php

Each adapter should implement:

- name(): string
- supports(string $url): bool
- normalizeUrl(string $url): string
- extractProductId(string $url): ?string
- import(string $url): MarketplaceProductData
- validateResult(MarketplaceProductData $data): bool

Use jobs:

- ImportMarketplaceProductJob
- RefreshMarketplaceProductJob
- DownloadMarketplaceProductImagesJob
- TranslateMarketplaceProductJob
- NotifyMarketplaceImportCompletedJob

Do not perform long external imports directly inside the web request.

The initial web request should:

1. Validate URL
2. Detect marketplace
3. Normalize URL
4. Create import record
5. Dispatch background job
6. Return import status ID

The frontend should poll or use events to show import progress.

==================================================
7. PRODUCT RETRIEVAL STRATEGY
==================================================

The system must support multiple product retrieval methods.

Priority order:

1. Approved official marketplace API
2. Approved or licensed third-party product API
3. Permitted public structured metadata
4. Manual order fallback

Do not build one uncontrolled generic scraper for every website.

Do not bypass:

- Login requirements
- CAPTCHA
- Marketplace security controls
- Regional restrictions
- Rate limits
- Access controls

Do not use customer marketplace passwords.

Do not store marketplace session cookies.

Do not pretend that an import succeeded if information is incomplete.

For permitted public metadata, look for:

- JSON-LD
- Open Graph metadata
- Product meta tags
- Publicly embedded structured state

If reliable variants, pricing or availability cannot be retrieved, require manual review.

All adapters must return the same internal structure.

Suggested data structure:

- Marketplace
- External product ID
- Original URL
- Normalized URL
- Product title
- Translated product title
- Original price
- Minimum price
- Maximum price
- Currency
- Converted estimated price
- Main image
- Additional images
- Seller name
- Seller URL
- Seller rating, only if reliable
- Product options
- Product variants
- Variant prices
- Variant images
- Availability
- Stock, nullable
- Domestic shipping estimate, nullable
- Imported at
- Last refreshed at
- Import source
- Import confidence
- Raw source metadata
- Import errors

All imported product prices must be presented as estimates until staff confirms the purchase.

Use this message:

“Marketplace price is estimated and may change before purchase confirmation.”

If stock cannot be reliably confirmed, show:

“Availability will be confirmed by our purchasing team.”

==================================================
8. IMPORT CACHE AND DUPLICATES
==================================================

Do not re-import the same product unnecessarily.

Create a normalized URL hash.

Suggested duplicate key:

- Marketplace
- External product ID
- Normalized URL hash

When a customer pastes an existing product:

- Reuse a recent valid import
- Refresh only when import data is stale
- Allow force refresh for authorized staff
- Do not create duplicate images
- Do not create duplicate variants
- Store each customer’s own remarks separately

Suggested freshness:

- Product information cache: configurable
- Price refresh before quotation
- Price refresh before purchase
- Availability refresh before staff purchase

==================================================
9. IMPORTED PRODUCT REVIEW PAGE
==================================================

After successful import, show a modern product review page.

Desktop layout:

- Left: image gallery
- Centre: product details and variants
- Right: purchasing estimate and action panel

Mobile layout:

- Single-column
- Sticky bottom action
- Easy variant selection
- Large quantity controls

Display:

- Marketplace badge
- Original product link
- Product title
- Translated product title
- Original marketplace price
- Converted estimated price
- Currency
- Product gallery
- Seller information
- Availability
- Colour options
- Size options
- Other variant options
- Variant images
- Quantity selector
- Customer remarks
- Quick remark chips
- Estimated domestic shipping
- Estimated service fee
- Estimated international shipping rate
- Estimated arrival range
- Prohibited-item warning
- Return-policy disclaimer
- Open Original Product
- Add to Purchase Cart
- Request Purchase Now
- Report incorrect product information

Quick remark examples:

- Please inspect colour
- Please inspect size
- Please verify quantity
- Please request secure packaging
- Please contact me before purchasing
- Do not substitute the selected variant

Manage remark chips through CMS.

==================================================
10. MANUAL ORDER FALLBACK
==================================================

Manual ordering is required when:

- Marketplace is unsupported
- Product import fails
- Product page requires login
- Product is unavailable
- Variants cannot be retrieved
- Price cannot be confirmed
- Customer prefers manual entry

Manual order form fields:

- Product URL
- Marketplace
- Product title
- Product image upload
- Screenshot upload
- Selected colour
- Selected size
- Selected variant
- Quantity
- Expected price
- Currency
- Seller name
- Seller contact, optional
- Customer remarks
- Destination country
- Product category
- Restricted-item confirmation

Staff workflow:

- New request
- Under review
- Information required
- Quotation prepared
- Awaiting customer confirmation
- Approved
- Rejected
- Expired

Staff can:

- Correct product details
- Add product image
- Add source price
- Add domestic shipping
- Add purchasing fee
- Add deposit
- Add estimated delivery
- Request customer clarification
- Reject with reason
- Send quotation

==================================================
11. PURCHASE CART
==================================================

Create a separate “Purchase Cart”.

Do not use the normal storefront cart when storefront products are disabled.

Purchase Cart columns:

- Select item
- Product image
- Product title
- Marketplace
- Product URL
- Selected variant
- Quantity
- Source unit price
- Domestic shipping estimate
- Service fee
- Estimated subtotal
- Customer remarks
- Remove
- Edit

Purchase flow:

1. Select Items
2. Review Estimate
3. Confirm Customer Details
4. Pay Deposit
5. Purchase Request Submitted

Order estimate must show:

- Product subtotal
- Marketplace domestic shipping
- Purchasing service fee
- Discount
- Deposit required
- Estimated international shipping
- Estimated total
- Amount due now
- Remaining amount

Display:

“International shipping is estimated. Final cost is calculated after warehouse measurement.”

==================================================
12. SERVICE FEE RULES
==================================================

Create configurable purchasing fee rules.

Supported rule types:

- Percentage
- Fixed amount
- Percentage with minimum
- Percentage with maximum
- Marketplace-specific fee
- Category-specific fee
- Customer-tier fee
- Promotional fee
- Staff override with permission

Fields:

- Name
- Marketplace
- Product category
- Minimum product value
- Maximum product value
- Percentage
- Fixed amount
- Minimum fee
- Maximum fee
- Currency
- Customer group
- Priority
- Enabled
- Start date
- End date

Do not calculate money using JavaScript floating-point values.

Store money in integer minor units.

Perform authoritative financial calculations in Laravel.

==================================================
13. DEPOSIT RULES
==================================================

Create configurable deposit policies.

Supported policies:

- Full payment
- Percentage deposit
- Fixed deposit
- Marketplace-specific deposit
- Customer-specific deposit
- Staff override with permission

Fields:

- Name
- Percentage
- Fixed amount
- Minimum amount
- Maximum amount
- Currency
- Marketplace
- Customer group
- Enabled
- Priority

Deposit calculation must be recorded in the purchase request.

Do not silently recalculate historical orders after settings change.

==================================================
14. PURCHASE REQUEST STATUS
==================================================

Create purchasing statuses:

- Draft
- Importing
- Manual review required
- Awaiting quotation
- Quotation ready
- Awaiting customer confirmation
- Awaiting deposit
- Payment under review
- Purchase requested
- Purchasing
- Purchased
- Seller preparing
- Seller shipped
- Arrived at warehouse
- Purchase cancelled
- Refund requested
- Refund pending
- Refunded
- Completed

Create status-history records.

Each status change must record:

- Purchase request
- Previous status
- New status
- Changed by
- Internal note
- Customer-visible note
- Timestamp
- Notification status

Use explicit allowed status transitions.

Do not allow arbitrary status changes.

==================================================
15. WAREHOUSE RECEIVING
==================================================

Create warehouse receiving functionality.

When an item arrives:

- Staff scans or enters tracking number
- Staff finds purchase request or expected parcel
- Staff records warehouse
- Staff records received date
- Staff records package quantity
- Staff records product quantity
- Staff records condition
- Staff uploads photos
- Staff records visible damage
- Staff records missing items
- Staff records actual weight
- Staff records dimensions
- System calculates volumetric weight
- System calculates chargeable weight
- Customer is notified

Warehouse receipt statuses:

- Expected
- Received
- Unmatched
- Under inspection
- Inspection completed
- Problem found
- Awaiting customer response
- Ready for consolidation
- Ready for shipping

==================================================
16. PRODUCT INSPECTION
==================================================

Create inspection services.

Inspection options:

- Basic exterior inspection
- Quantity inspection
- Colour inspection
- Size inspection
- Photo inspection
- Damage inspection
- Functional inspection, when supported
- Repacking
- Remove seller packaging
- Protective packaging

Inspection record fields:

- Parcel
- Inspection type
- Requested by customer
- Assigned staff
- Result
- Notes
- Customer-visible notes
- Images
- Video, optional
- Completed date
- Additional fee
- Status

==================================================
17. SHIP FOR ME
==================================================

Create a complete Ship for Me workflow.

Each authenticated customer receives a unique member code.

Example:

CUS45359

The customer dashboard should display warehouse addresses.

Warehouse address card fields:

- Country
- Warehouse name
- Recipient name
- Customer member code
- Phone number
- Local-language address
- English address
- Postal code
- Instructions
- Copy button for every field
- Supported marketplaces
- Warehouse status

Full warehouse addresses require:

- Authentication
- Verified phone number
- Active customer account

Create marketplace-specific address instructions for:

- Taobao
- Tmall
- 1688
- Alibaba
- Pinduoduo
- AliExpress

Customer can register an expected parcel.

Expected parcel fields:

- Marketplace
- Seller name
- Product order number
- Tracking number
- Product description
- Product quantity
- Declared value
- Currency
- Expected warehouse
- Product image
- Notes
- Destination address
- Restricted-item confirmation

==================================================
18. PARCEL MANAGEMENT
==================================================

Parcel statuses:

- Expected at warehouse
- Received
- Unmatched
- Under inspection
- Missing information
- Awaiting customer action
- Awaiting consolidation
- Ready for shipping
- Awaiting shipping payment
- Packed
- Dispatched
- In transit
- Customs processing
- Ready for collection
- Out for delivery
- Delivered
- Claim opened
- Returned
- Cancelled

Parcel fields:

- Customer
- Warehouse
- Member code
- Tracking number
- Marketplace
- Seller
- Purchase request
- Expected parcel
- Parcel number
- Actual weight
- Length
- Width
- Height
- Volumetric weight
- Chargeable weight
- Declared value
- Currency
- Customs category
- Parcel status
- Received date
- Storage start date
- Storage fee
- Parcel photos
- Internal notes
- Customer-visible notes

==================================================
19. PARCEL CONSOLIDATION
==================================================

Allow customers to combine multiple warehouse parcels into one shipment.

Consolidation flow:

1. Customer selects eligible parcels
2. Customer selects destination
3. Customer selects shipping method
4. Customer selects repacking preferences
5. Customer submits consolidation request
6. Staff reviews request
7. Staff repacks parcels
8. Staff records final weight and dimensions
9. System calculates final shipping cost
10. Customer pays
11. Shipment is dispatched

Consolidation options:

- Keep original packaging
- Remove seller packaging
- Combine boxes
- Add bubble wrap
- Add waterproof packaging
- Add fragile handling
- Add photo before shipping

==================================================
20. SHIPPING RATE SYSTEM
==================================================

Create configurable shipping rates.

Rate dimensions:

- Origin warehouse
- Destination country
- Destination province or city
- Shipping method
- Product category
- Chargeable weight
- Minimum charge
- Per-kilogram price
- Weight tier
- Volumetric divisor
- Customs fee
- Handling fee
- Fuel surcharge
- Remote-area surcharge
- Insurance
- Currency
- Delivery estimate
- Enabled
- Effective dates

Chargeable weight:

chargeable_weight = max(actual_weight, volumetric_weight)

Volumetric weight formula must be configurable.

Example:

length × width × height ÷ volumetric_divisor

All calculations must be performed on the server.

Store the calculation snapshot on the shipment.

==================================================
21. CUSTOMER DASHBOARD
==================================================

Create a modern customer dashboard.

Desktop:

- Collapsible sidebar
- Header
- Notification area
- Main content
- Contextual actions

Mobile:

- Drawer menu
- Bottom navigation
- Sticky actions

Dashboard summary cards:

- Wallet balance
- Purchase requests requiring action
- Parcels requiring action
- Parcels at warehouse
- Awaiting payment
- In transit
- Unread notifications

Quick actions:

- Paste product link
- Create manual order
- Add forwarding parcel
- Track parcel
- View warehouse address
- Top up wallet

Sidebar groups:

PURCHASING

- Dashboard
- Purchase Requests
- Purchase Cart
- Manual Orders

LOGISTICS

- Ship for Me
- Expected Parcels
- My Parcels
- Consolidation
- Shipments
- Tracking
- Warehouse Addresses

PAYMENTS

- Wallet
- Top Up
- Transactions
- Refunds

ACCOUNT

- Delivery Addresses
- Profile
- Phone and Login
- Notifications
- Support

Hide menu items when their feature is disabled or the customer lacks permission.

==================================================
22. FIREBASE AUTHENTICATION
==================================================

Implement Firebase Authentication.

Primary login method:

- Phone number with SMS OTP

Secondary login method:

- Continue with Google

Optional login method:

- Email and password, controlled by feature setting

Do not use the text “Google+”.

Use:

“Continue with Google”

Authentication architecture:

1. React uses Firebase Web SDK.
2. Customer signs in with phone OTP or Google.
3. Firebase returns an ID token.
4. React sends the ID token to Laravel over HTTPS.
5. Laravel verifies the Firebase ID token.
6. Laravel finds or creates a local user.
7. Laravel creates a normal secure application session.
8. Laravel roles and permissions remain authoritative.

Laravel must verify:

- Token signature
- Expiration
- Issuer
- Audience
- Firebase project
- Firebase UID

Do not trust:

- UID sent without a verified token
- Client-supplied user role
- Client-supplied permissions
- Client-supplied phone verification status

Suggested user fields:

- firebase_uid
- phone_e164
- phone_verified_at
- email
- email_verified_at
- firebase_provider
- preferred_language
- preferred_currency
- last_login_at
- account_status

Account linking:

- Prevent duplicate accounts
- Link verified phone and Google identity
- Require ownership verification before linking
- Use E.164 phone format
- Handle an existing email safely
- Handle an existing phone number safely

A verified phone number is required before:

- Submitting a purchase request
- Paying a deposit
- Creating an expected parcel
- Viewing a full warehouse address
- Requesting parcel shipment
- Withdrawing wallet funds
- Changing sensitive account settings

Firebase security:

- Do not store OTP codes in plaintext
- Do not log OTP codes
- Do not log Firebase ID tokens
- Do not expose service account credentials
- Store server credentials only in environment secrets
- Add authentication rate limits
- Add abuse protection
- Use reCAPTCHA where required
- Regenerate Laravel session after login
- Apply CSRF protection
- Allow local account disabling
- Log important authentication events

If local email/password login remains:

- Use Laravel Hash
- Never use reversible encryption
- Never store plaintext passwords
- Never manually encrypt passwords
- Do not duplicate Firebase passwords in Laravel

==================================================
23. MARKETPLACE APP LINKS
==================================================

Marketplace cards should offer:

- Open Website
- Open App
- Copy Link Guide

A browser cannot reliably know whether a marketplace app is installed.

Do not display:

- “App installed”
- “App not installed”

Use:

- “Open App”
- “Continue on Website”
- “App link unavailable”

Requirements:

- Only attempt app opening after a direct customer click
- Use approved universal links or deep links
- Provide a timed website fallback
- Do not leave users on a blank page
- Use normal marketplace website on desktop
- Support iOS and Android configuration
- Allow CMS to disable app links
- Allow country-specific availability
- Allow platform-specific links

==================================================
24. WALLET
==================================================

Create or refine the customer wallet.

Wallet includes:

- Available balance
- Pending balance
- Reserved balance
- Required balance
- Wallet ledger
- Top-up requests
- Purchase payments
- Shipping payments
- Refunds
- Adjustments
- Withdrawals, only if enabled

Use an immutable wallet ledger.

Every balance change must have a ledger entry.

Ledger fields:

- Wallet
- Transaction type
- Direction
- Amount
- Currency
- Balance before
- Balance after
- Reference type
- Reference ID
- Idempotency key
- Description
- Created by
- Created at

Do not directly update balance without a ledger transaction.

Use:

- Database transactions
- Row locking
- Idempotency
- Authorization policies

==================================================
25. TOP-UP
==================================================

Top-up methods must be CMS-configurable.

Supported types:

- Online payment gateway
- QR payment
- Bank transfer
- Manual top-up
- Office cash payment, optional

Manual top-up fields:

- Customer
- Amount
- Currency
- Payment method
- Bank or provider
- Transaction reference
- Receipt upload
- Notes
- Status
- Reviewed by
- Reviewed at
- Rejection reason

Statuses:

- Pending
- Under review
- Approved
- Rejected
- Cancelled

Only approved requests change wallet balance.

==================================================
26. CUSTOMER DELIVERY ADDRESSES
==================================================

Create customer delivery addresses.

Fields:

- Name
- Phone
- Country
- Province
- City
- District
- Commune
- Postal code
- Street address
- Delivery instructions
- Latitude, optional
- Longitude, optional
- Default address
- Active

Require phone verification before using an address for shipment.

==================================================
27. TRACKING
==================================================

Create parcel and shipment tracking.

Public tracking page:

- Accept tracking number
- Do not expose customer private information
- Show status timeline
- Show public events only
- Show last updated time
- Show estimated delivery when available

Authenticated tracking page:

- Full parcel details
- Shipment information
- Warehouse milestones
- Payment requirements
- Customer actions
- Support link

Tracking event fields:

- Shipment
- Parcel
- Status
- Event code
- Location
- Public description
- Internal description
- Event time
- Source
- Created by

==================================================
28. NOTIFICATIONS
==================================================

Create notification support for:

- In-app notifications
- Email
- SMS, optional
- Other channels only if already supported

Events:

- Import completed
- Import failed
- Manual review required
- Quotation ready
- Customer confirmation required
- Deposit required
- Payment approved
- Product purchased
- Seller shipped
- Parcel received
- Inspection issue
- Actual weight recorded
- Shipping payment required
- Consolidation completed
- Shipment dispatched
- Tracking updated
- Delivered
- Refund processed
- Support response

Allow customers to configure optional notifications.

Do not allow disabling critical transactional notifications.

==================================================
29. CMS ADMIN
==================================================

Refine the existing CMS.

Do not create a completely separate CMS unless the current architecture makes it unavoidable.

CMS modules:

DASHBOARD

- Overview
- Pending actions
- Recent purchases
- Warehouse activity
- Payment review
- System health

PURCHASING

- Purchase Requests
- Imported Products
- Marketplace Imports
- Manual Orders
- Purchase Cart Recovery
- Quotations
- Purchasing Fees
- Deposit Rules

MARKETPLACES

- Marketplaces
- Marketplace Domains
- Marketplace Adapters
- Import Logs
- Parser Status
- Maintenance Settings

LOGISTICS

- Warehouses
- Warehouse Addresses
- Expected Parcels
- Warehouse Receipts
- Inspections
- Parcels
- Consolidation Requests
- Shipments
- Tracking Events
- Shipping Methods
- Shipping Zones
- Shipping Rates

CUSTOMERS

- Customers
- Customer Addresses
- Phone Verification Status
- Customer Groups
- Customer Notes
- Account Status

PAYMENTS

- Wallets
- Wallet Ledger
- Top-Up Requests
- Payment Transactions
- Refunds
- Withdrawal Requests
- Manual Adjustments

CONTENT

- Homepage Sections
- Banners
- Pages
- Menus
- FAQs
- Testimonials
- Contact Information
- Supported Countries
- Languages
- Currencies

SYSTEM

- Feature Flags
- Settings
- Roles
- Permissions
- Audit Logs
- Notification Templates
- Scheduled Jobs
- System Status

EXISTING STORE MODULES

Keep:

- Products
- Categories
- Brands
- Collections
- Inventory
- Discounts
- Reviews
- Returns

Allow each module to be:

- Enabled
- Disabled
- Private
- Published
- Hidden from admin sidebar
- Hidden from public storefront
- Permission protected

==================================================
30. CMS MENU BUILDER
==================================================

Create or refine CMS menu management similar to WordPress.

Menu fields:

- Menu name
- Menu location
- Menu item label
- Menu item type
- Internal route
- Custom URL
- Parent item
- Sort order
- Open in new tab
- Icon
- Enabled
- Visibility
- Required role
- Required permission
- Feature flag dependency

Menu locations:

- Public header
- Public footer
- Customer dashboard sidebar
- Customer mobile navigation
- Admin sidebar

Do not hard-code every menu item when CMS configuration is available.

==================================================
31. HOMEPAGE CMS BUILDER
==================================================

Allow administrators to control homepage sections.

Each homepage section supports:

- Name
- Type
- Enabled
- Sort order
- Draft or published
- Start date
- End date
- Heading
- Description
- CTA
- Desktop image
- Mobile image
- Background
- Text colour
- Maximum width
- Section spacing
- Additional JSON configuration
- Preview

Section types:

- Hero
- Marketplaces
- How It Works
- Services
- Shipping Calculator
- Warehouses
- Benefits
- Testimonials
- FAQ
- Contact CTA
- Custom content

==================================================
32. MARKETPLACE CMS SETTINGS
==================================================

Marketplace fields:

- Name
- Slug
- Domains
- Logo
- Brand colour
- Website URL
- Android app link
- iOS app link
- Universal link
- Import enabled
- Manual fallback enabled
- Marketplace enabled
- Status
- Maintenance message
- Supported countries
- Sort order
- Fee rule
- Deposit rule
- Cache lifetime
- Product ID patterns
- Tracking parameter rules

==================================================
33. DESIGN SYSTEM
==================================================

Create a better UI than the reference screenshots.

Style:

- Modern logistics platform
- Premium but friendly
- Clean
- Spacious
- Mobile-first
- Professional
- Reliable
- Strong typography
- Accessible contrast
- Clear status communication
- Consistent spacing
- Rounded cards
- Subtle borders
- Minimal shadows
- Limited gradients
- No crowded panels
- No fake statistics
- No fake ratings
- No fake testimonials

Create reusable components:

- PublicAppShell
- CustomerDashboardShell
- AdminShell
- PublicHeader
- PublicFooter
- DashboardSidebar
- MobileNavigation
- PageHeader
- ProductUrlInput
- MarketplaceCard
- MarketplaceBadge
- StatusBadge
- StatusTimeline
- MoneyDisplay
- FeeBreakdown
- ShippingEstimate
- WarehouseAddressCard
- CopyField
- EmptyState
- ErrorState
- LoadingSkeleton
- DataTable
- FilterBar
- SearchInput
- Modal
- Drawer
- ConfirmationDialog
- Toast
- FileUploader
- ImageGallery
- QuantitySelector
- VariantSelector
- PhoneVerificationGate

Support:

- Light theme
- Dark theme
- System theme

Meet WCAG AA where practical.

==================================================
34. DATABASE DESIGN
==================================================

Audit the current database before creating new tables.

Do not create duplicate concepts when an existing table can be extended safely.

Suggested new tables:

- feature_flags
- marketplaces
- marketplace_domains
- marketplace_imports
- imported_products
- imported_product_images
- imported_product_option_groups
- imported_product_options
- imported_product_variants
- manual_order_requests
- purchase_requests
- purchase_request_items
- purchase_request_status_histories
- purchasing_fee_rules
- deposit_rules
- warehouses
- warehouse_addresses
- expected_parcels
- warehouse_receipts
- parcel_inspections
- parcels
- parcel_items
- parcel_measurements
- parcel_status_histories
- consolidation_requests
- consolidation_request_items
- shipping_methods
- shipping_zones
- shipping_rates
- shipments
- tracking_events
- wallets
- wallet_ledger_entries
- top_up_requests
- payment_transactions
- refunds
- customer_addresses
- homepage_sections
- banners
- marketplace_settings

Use:

- Foreign keys
- Proper indexes
- Unique constraints
- Integer minor units for money
- Currency codes
- Decimal-safe weight fields
- Soft deletes only when appropriate
- Immutable ledger records
- Immutable status history
- JSON only for truly dynamic source data

==================================================
35. SECURITY
==================================================

Implement strong security.

URL import security:

- HTTPS only
- Hostname allowlist
- Reject IP URLs
- Reject private IP ranges
- Reject localhost
- Re-check DNS after redirects
- Restrict redirect count
- Restrict response size
- Restrict request timeout
- Do not forward customer cookies
- Do not expose fetched HTML
- Run external imports in queues
- Rate limit imports
- Add import audit logs

Authentication security:

- Verify Firebase ID tokens
- Secure server sessions
- Regenerate session after login
- CSRF protection
- Secure cookies
- SameSite cookie policy
- Login rate limiting
- SMS abuse protection
- Account disable checks
- Security event logs

Application security:

- Authorization policies
- Role permissions
- Input validation
- File upload validation
- MIME validation
- Upload size limits
- Image re-encoding
- Signed URLs for private files
- XSS prevention
- SQL injection prevention
- Mass-assignment protection
- Sensitive-data masking
- Secret management
- Payment idempotency
- Wallet locking
- Duplicate submission prevention

Do not expose:

- Firebase server credentials
- Marketplace credentials
- Marketplace cookies
- Warehouse internal notes
- Other customer data
- Other customer parcels
- Full error stack traces
- Private supplier data

==================================================
36. PERFORMANCE
==================================================

Use:

- Laravel queues
- Job retries with exponential backoff
- Import timeout
- Cached marketplace configuration
- Cached shipping rates
- Normalized import deduplication
- Server-side pagination
- Server-side filtering
- Database indexes
- Eager loading
- Image thumbnails
- Lazy image loading
- Vite code splitting
- Deferred Inertia props
- Partial Inertia reloads
- Debounced URL validation
- Background translations
- Background image processing

Do not block the browser while importing a marketplace product.

==================================================
37. ERROR HANDLING
==================================================

Create user-friendly errors.

Do not show raw technical errors.

Examples:

Unsupported website:

“This marketplace is not currently supported. You can still submit a manual order.”

Import failed:

“We detected the marketplace, but we could not retrieve the product details. Please continue with manual review.”

Product unavailable:

“This product may be unavailable or require marketplace login. Our team can review the link manually.”

Invalid URL:

“Enter a valid HTTPS product URL.”

Phone required:

“Verify your phone number before continuing.”

Payment issue:

“We could not confirm your payment. Your balance has not been changed.”

==================================================
38. LOGGING AND AUDITING
==================================================

Audit important actions:

- Login
- Account linking
- Phone verification
- Feature flag changes
- Marketplace settings changes
- Import attempts
- Import failures
- Purchase status changes
- Quotation changes
- Wallet adjustments
- Top-up approval
- Payment callbacks
- Warehouse receiving
- Parcel measurement
- Consolidation
- Shipment creation
- Refund processing
- Permission changes

Audit record fields:

- User
- Staff user
- Action
- Entity type
- Entity ID
- Old values
- New values
- IP address
- User agent
- Timestamp

Do not place secrets or tokens in audit logs.

==================================================
39. TESTING
==================================================

Add tests for all critical workflows.

FEATURE FLAGS

- Products hidden when storefront is disabled
- Existing products remain in database
- Product CMS remains accessible
- Public product routes are blocked
- Hidden menu items do not render
- Feature flags can restore storefront later

URL DETECTION

- Taobao URL detected
- Tmall URL detected
- 1688 URL detected
- Alibaba URL detected
- Pinduoduo URL detected
- AliExpress URL detected
- Unsupported domain rejected
- HTTP URL rejected
- JavaScript URL rejected
- Localhost rejected
- Private IP rejected
- Redirect to private IP rejected
- Duplicate import reused

IMPORTS

- Import queued
- Successful import stored
- Failed import uses manual fallback
- Stale import refreshes
- Customer cannot access another customer’s private import
- Staff can review import errors

AUTHENTICATION

- Valid Firebase token creates session
- Invalid token rejected
- Expired token rejected
- Wrong Firebase audience rejected
- Disabled local user rejected
- Phone verification gate works
- Google and phone identities link safely
- Duplicate accounts are prevented

PURCHASING

- Purchase cart calculations
- Service fee percentage
- Minimum service fee
- Deposit percentage
- Fixed deposit
- Currency handling
- Quotation snapshot
- Allowed status transitions
- Unauthorized status changes rejected

WALLET

- Top-up approval creates ledger entry
- Rejected top-up does not change balance
- Duplicate payment callback is idempotent
- Concurrent deductions cannot overdraw wallet
- Unauthorized wallet adjustment rejected
- Ledger balance remains correct

WAREHOUSE

- Expected parcel registration
- Parcel matching
- Warehouse receipt
- Actual weight calculation
- Volumetric weight calculation
- Chargeable weight calculation
- Inspection result
- Customer ownership protection

CONSOLIDATION

- Eligible parcels can be selected
- Ineligible parcels rejected
- Final dimensions stored
- Final shipping fee calculated
- Customer cannot consolidate another customer’s parcel

CMS

- Banner publishing
- Homepage section ordering
- Menu item visibility
- Marketplace enable and disable
- Module hidden from sidebar
- Permissions enforced
- Feature flags updated

Run:

composer install
npm install
php artisan optimize:clear
php artisan migrate
php artisan route:list
php artisan test
npm run build

Do not report completion unless tests pass or clearly report remaining failures.

==================================================
40. IMPLEMENTATION PHASES
==================================================

PHASE 0: AUDIT

Before changing code, provide:

- Current application architecture
- Existing routes
- Existing authentication
- Existing CMS modules
- Existing product modules
- Existing cart and checkout
- Existing payment integration
- Existing roles and permissions
- Existing database tables
- Existing reusable frontend components
- Conflicts and migration risks
- Files to modify
- Files to create
- Implementation sequence

PHASE 1: PUBLIC DIRECTION

Implement:

- Feature flags
- Hide normal products
- Hide store menu links
- Public navigation
- CMS banner
- New homepage
- Marketplace cards
- How It Works
- Services
- FAQ
- Footer
- Responsive UI

PHASE 2: PRODUCT URL FLOW

Implement:

- Product URL input
- URL validation
- Marketplace detection
- URL normalization
- Import records
- Import queue job
- Import status screen
- Manual order fallback
- Rate limiting
- SSRF protection

PHASE 3: PRODUCT IMPORT

Implement:

- Marketplace adapter interface
- Marketplace resolver
- DTOs
- One reliable marketplace integration first
- Imported product page
- Images
- Variants
- Quantity
- Remarks
- Cache
- Refresh
- Manual fallback for unsupported data

Do not attempt all marketplaces with fragile scraping at once.

PHASE 4: PURCHASING

Implement:

- Purchase Cart
- Fee rules
- Deposit rules
- Purchase requests
- Quotations
- Status timeline
- Customer confirmation
- Deposit payment
- Admin purchasing workflow

PHASE 5: AUTHENTICATION

Implement:

- Firebase configuration
- Phone OTP
- Google sign-in
- Laravel token verification
- Local session
- Account linking
- Phone verification gates
- User profile changes

PHASE 6: CUSTOMER DASHBOARD

Implement:

- Dashboard layout
- Purchase requests
- Manual orders
- Parcel lists
- Wallet
- Notifications
- Addresses
- Responsive sidebar
- Mobile navigation

PHASE 7: SHIP FOR ME

Implement:

- Member codes
- Warehouse addresses
- Copy fields
- Marketplace instructions
- Expected parcels
- Parcel matching
- Customer notifications

PHASE 8: WAREHOUSE AND LOGISTICS

Implement:

- Warehouse receiving
- Parcel inspection
- Measurements
- Volumetric weight
- Consolidation
- Shipping methods
- Shipping rates
- Shipment creation
- Tracking events

PHASE 9: WALLET AND PAYMENTS

Implement:

- Wallet ledger
- Top-up requests
- Payment providers
- Manual payment review
- Refunds
- Idempotency
- Locking
- Audit trail

PHASE 10: CMS POLISH

Implement:

- CMS marketplace settings
- Homepage builder
- Menu builder
- Module visibility
- Feature flags
- Shipping rate management
- Warehouse management
- Fee rules
- Deposit rules
- Notification templates

PHASE 11: FINAL QUALITY

Implement:

- Accessibility
- Responsive review
- Security audit
- Performance review
- Empty states
- Error states
- Loading states
- Tests
- Production build
- Documentation

==================================================
41. REQUIRED OUTPUT AFTER EACH PHASE
==================================================

After each phase, provide:

- Summary of implementation
- Files created
- Files modified
- Migrations created
- Routes created
- Database changes
- Environment variables
- Commands executed
- Tests added
- Test results
- Build results
- Known limitations
- Next phase

Do not provide only designs or mockups.

Implement:

- Database
- Backend
- Frontend
- Validation
- Permissions
- Tests
- CMS controls

Do not mark a feature complete when only the frontend exists.

==================================================
42. ENVIRONMENT VARIABLES
==================================================

Document all required environment variables.

Possible variables:

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

MARKETPLACE_IMPORT_ENABLED=true
MARKETPLACE_IMPORT_TIMEOUT=15
MARKETPLACE_IMPORT_MAX_REDIRECTS=3
MARKETPLACE_IMPORT_MAX_RESPONSE_SIZE=
MARKETPLACE_IMPORT_CACHE_MINUTES=

QUEUE_CONNECTION=database

Add provider-specific variables only when an approved provider is selected.

Never commit secrets.

Update:

- .env.example
- Installation documentation
- Deployment documentation

==================================================
43. DOCUMENTATION
==================================================

Create documentation for:

- Local installation
- Production deployment
- Queue workers
- Scheduler
- Firebase setup
- Google authentication setup
- Phone OTP setup
- Marketplace configuration
- Adding a new marketplace adapter
- Manual order fallback
- Feature flags
- Restoring the normal storefront
- Warehouse management
- Shipping rates
- Wallet and payment configuration
- Security considerations
- Troubleshooting imports

==================================================
44. FINAL ACCEPTANCE CRITERIA
==================================================

The update is accepted only when:

- Existing store data is not deleted
- Existing store modules remain available in CMS
- Public store products are hidden
- Public product menu links are hidden
- Admin can restore the store later
- Admin can hide CMS modules from menus
- Homepage contains a CMS-controlled banner
- Homepage contains the product URL input
- Marketplace detection works
- URL security validation works
- Imports run in the background
- At least one marketplace adapter works reliably
- Other marketplaces support manual fallback
- Imported product review works
- Product variants can be selected
- Quantity can be selected
- Customer remarks work
- Purchase Cart works
- Fee calculation works
- Deposit calculation works
- Purchase requests work
- Staff quotation workflow works
- Phone OTP login works
- Google login works
- Laravel verifies Firebase tokens
- Phone verification is required for sensitive actions
- Customer dashboard works
- Warehouse addresses work
- Full warehouse address requires login and phone verification
- Ship for Me works
- Expected parcels work
- Warehouse receiving works
- Parcel measurements work
- Consolidation works
- Shipping rates work
- Wallet ledger is auditable
- Top-up works
- Tracking timeline works
- CMS settings work
- Mobile UI works well
- Authorization policies work
- Security protections are implemented
- Tests pass
- Production build succeeds
- Documentation is complete

==================================================
45. STARTING INSTRUCTION
==================================================

Start with Phase 0.

Audit the repository before implementing.

Do not assume the existing architecture.

Inspect:

- composer.json
- package.json
- routes
- controllers
- models
- migrations
- middleware
- policies
- authentication
- Inertia pages
- React components
- CMS modules
- menu configuration
- payment code
- product code
- cart code
- order code
- permissions
- tests

Then provide the audit report and implementation plan.

After the audit, immediately implement Phase 1.

Do not stop after providing recommendations.
Continue with actual code changes.