You are now performing a focused CMS dashboard refinement pass on the existing
Laravel 12 + React 19 + Inertia.js + TypeScript + Tailwind CSS application.

Do not rebuild the project.
Do not replace the current CMS architecture.
Do not change the storefront design unless required for shared components.
Do not remove working modules.
Do not create a second admin system.

The goal is to make the existing CMS:

- Faster
- Cleaner
- Easier to understand
- More professional
- More responsive
- More consistent
- More attractive
- Less cluttered
- Better on mobile
- Better in dark mode
- Better in light mode
- More similar in usability to WordPress and Shopify
- Fully navigable without unnecessary full-page reloads

==================================================
PRIMARY PROBLEMS TO FIX
==================================================

The current CMS still has these problems:

- Some admin pages feel slow
- Some interactions reload the full page unnecessarily
- Some buttons do not respond clearly
- Some buttons or menu items are missing
- Some routes may exist but are not visible in navigation
- Some menu items may be visible but not functional
- Some pages lack primary actions
- Some pages lack back buttons, filters, bulk actions, or quick actions
- Sidebar organization may be confusing
- Spacing and colors are inconsistent
- Hover states are weak or missing
- Dark mode may be incomplete
- Mobile navigation may be difficult to use
- Tables may be crowded
- Forms may be too long or unclear
- Success and error feedback may be inconsistent
- Empty and loading states may be missing
- The dashboard may feel like a template instead of a polished product

Audit all of these and repair them.

==================================================
1. AUDIT THE CURRENT CMS
==================================================

Inspect all existing admin pages, layouts, components, routes, controllers,
permissions, and navigation data.

Create an audit table with:

- Admin module
- Route
- Navigation item exists
- Primary action exists
- Secondary actions exist
- Working
- Partially working
- Broken
- Missing
- Full-page reload problem
- Mobile problem
- Dark-mode problem
- Accessibility problem
- Recommended fix

Audit at least:

- Dashboard
- Orders
- Products
- Categories
- Brands
- Collections
- Inventory
- Customers
- Payments
- Shipping
- Discounts
- Reviews
- Returns
- Pages
- Blog
- Media
- Menus
- Homepage Builder
- Themes
- Settings
- Users
- Roles
- Permissions
- Audit Logs
- Notifications
- Reports
- System Status

Search for:

- href="#"
- javascript:void(0)
- Empty click handlers
- Buttons without action
- Links to missing routes
- Routes not included in admin navigation
- Duplicate menu items
- Missing active states
- Missing permission checks
- Missing breadcrumbs
- Missing page titles
- Missing create buttons
- Missing save buttons
- Missing delete buttons
- Missing edit buttons
- Missing view buttons
- Missing bulk actions
- Missing pagination
- Missing filters
- Missing loading states
- Missing empty states
- Missing error states
- Inconsistent dark-mode classes
- Hardcoded colors
- Full window.location reloads
- Direct anchor navigation that should use Inertia
- Large duplicated components
- N+1 queries
- Excessive dashboard requests
- Unnecessary API calls

Do not stop after the audit.
Implement all launch-blocking and high-impact improvements.

==================================================
2. NO UNNECESSARY PAGE RELOADS
==================================================

Use Inertia navigation correctly.

Replace unnecessary full-page reloads with:

- Inertia Link
- router.get
- router.post
- router.put
- router.patch
- router.delete
- preserveState
- preserveScroll
- partial reloads
- deferred props where appropriate
- optimistic UI only when safe

Do not use:

- window.location.href
- window.location.reload
- plain anchor tags for internal admin routes
- manual fetch requests when an Inertia form is more appropriate
- duplicated React state that conflicts with server state

Use full reload only when genuinely required.

Examples that should not fully reload:

- Sidebar navigation
- Filters
- Sorting
- Pagination
- Status changes
- Search
- Mark notification as read
- Update menu order
- Toggle active status
- Change theme preference
- Save settings
- Bulk actions
- Update inventory
- Publish or unpublish content
- Switch dashboard date range

Use progress indicators for Inertia navigation.

==================================================
3. ADMIN SHELL REDESIGN
==================================================

Refine the existing admin shell.

Desktop structure:

- Collapsible left sidebar
- Compact top header
- Breadcrumbs
- Page title
- Page description
- Primary action
- Optional secondary actions
- Main content area
- Optional contextual right panel only where helpful

Sidebar requirements:

- Clear grouped navigation
- Clean icons
- Consistent spacing
- Active route indicator
- Active parent indicator
- Expandable groups
- Collapsed icon-only mode
- Tooltip in collapsed mode
- Smooth width transition
- Remember collapsed preference
- Permission-aware items
- Searchable navigation
- Keyboard accessible
- Avoid too many nested levels

Recommended navigation groups:

OVERVIEW
- Dashboard
- Notifications

COMMERCE
- Orders
- Products
- Categories
- Brands
- Collections
- Inventory
- Customers
- Reviews
- Returns

CONTENT
- Pages
- Blog
- Media
- Menus
- Homepage Builder
- Reusable Sections
- FAQs
- Testimonials

MARKETING
- Discounts
- Coupons
- Promotions
- Newsletter
- Campaigns

OPERATIONS
- Payments
- Shipping
- Taxes
- Reports

APPEARANCE
- Themes
- Customize
- Header
- Footer
- Typography
- Colors

ADMINISTRATION
- Users
- Roles
- Permissions
- Audit Logs
- Settings
- System Status

Only show items the current user can access.

==================================================
4. LIGHT MODE AND DARK MODE
==================================================

Implement a complete theme system for the CMS.

Modes:

- Light
- Dark
- System

Add a theme toggle in the admin header.

Persist preference safely.

Use system preference when mode is System.

Create semantic design tokens instead of hardcoded colors:

- --admin-bg
- --admin-surface
- --admin-surface-muted
- --admin-sidebar
- --admin-sidebar-text
- --admin-text
- --admin-text-muted
- --admin-border
- --admin-accent
- --admin-accent-hover
- --admin-success
- --admin-warning
- --admin-error
- --admin-info
- --admin-focus
- --admin-overlay

Requirements:

- All admin pages support dark mode
- Tables support dark mode
- Forms support dark mode
- Modals support dark mode
- Drawers support dark mode
- Charts support dark mode
- Tooltips support dark mode
- Empty states support dark mode
- Skeletons support dark mode
- Toasts support dark mode
- No low-contrast text
- No bright white flashes during navigation
- No unreadable disabled buttons
- No hardcoded white backgrounds that break dark mode

Avoid pure black for large surfaces.
Use a refined dark navy or charcoal palette.

==================================================
5. CLEAN COLOR SYSTEM
==================================================

Use a restrained professional color palette.

Light mode:

- Soft neutral page background
- White primary surfaces
- Dark charcoal text
- Neutral borders
- One primary accent
- Muted success, warning, and error colors

Dark mode:

- Deep navy or charcoal background
- Slightly lighter surfaces
- High-contrast text
- Subtle borders
- Muted accent backgrounds
- Clear status colors

Do not use too many unrelated colors.

Use color consistently:

- Primary action
- Secondary action
- Destructive action
- Success
- Warning
- Error
- Neutral
- Disabled

Do not use color alone to communicate state.

==================================================
6. BUTTON SYSTEM
==================================================

Create one reusable admin button system.

Button variants:

- Primary
- Secondary
- Ghost
- Outline
- Destructive
- Success
- Link
- Icon-only

Button sizes:

- Small
- Medium
- Large

Required states:

- Default
- Hover
- Focus
- Active
- Loading
- Disabled
- Success feedback
- Error feedback

Hover effects:

- Small background transition
- Slight border transition
- Subtle icon movement
- No exaggerated scaling
- No large bouncing effects

Use 150–220ms transitions.

Icon-only buttons must have:

- Tooltip
- Accessible label
- Visible focus state

Do not leave buttons with no event or route.

Audit and repair:

- Create
- Save
- Save draft
- Publish
- Update
- Delete
- Archive
- Restore
- Duplicate
- Preview
- Export
- Import
- Filter
- Sort
- Search
- Clear filters
- Bulk action
- Back
- Cancel
- Close
- View storefront

==================================================
7. MENU AND SIDEBAR INTERACTIONS
==================================================

Add polished menu interactions:

- Smooth expand/collapse
- Chevron rotation
- Active child highlighting
- Active parent highlighting
- Hover background
- Icon color transition
- Keyboard focus
- Tooltip in collapsed mode
- No accidental nested-menu closure
- Preserve expanded groups between navigations where useful

Do not overanimate.

Recommended duration:

- Hover: 150ms
- Expand/collapse: 200–250ms
- Sidebar collapse: 250ms

==================================================
8. PAGE HEADER STANDARD
==================================================

Every CMS page must use a consistent page header.

Include:

- Breadcrumbs
- Page title
- Short description
- Primary action
- Secondary actions
- Optional help link
- Optional View storefront link

Examples:

Products:
- Title: Products
- Description: Manage your store catalogue, pricing, media, and inventory.
- Primary action: Add product
- Secondary actions: Import, Export

Orders:
- Primary action: Create manual order, if supported
- Secondary actions: Export

Pages:
- Primary action: Add page

Menus:
- Primary action: Create menu
- Secondary action: Manage locations

Users:
- Primary action: Add user or Invite staff

Roles:
- Primary action: Create role

Do not leave admin pages without a clear next action.

==================================================
9. DASHBOARD PERFORMANCE AND UX
==================================================

Make the dashboard faster and easier to understand.

Use:

- Server-side aggregated queries
- Cached metrics
- Deferred secondary data
- Lazy-loaded charts
- Partial Inertia reloads
- Skeleton loading
- Date-range switching without full reload

Dashboard cards:

- Revenue
- Orders
- Customers
- Average order value
- Pending payments
- Pending refunds
- Low stock
- Conversion rate only when real analytics exist

Dashboard sections:

- Revenue chart
- Orders chart
- Recent orders
- Top products
- Low-stock products
- Failed payments
- Recent activity
- Draft content
- Quick actions

Do not show fake metrics.

Add useful quick actions:

- Add product
- View orders
- Create discount
- Add page
- Upload media
- View storefront

==================================================
10. DATA TABLE UX
==================================================

Create or refine one reusable DataTable component.

Features:

- Server-side search
- Server-side filters
- Server-side sorting
- Pagination
- Page size
- Column visibility
- Bulk selection
- Bulk actions
- Row actions
- Sticky header where useful
- Loading skeleton
- Empty state
- Error state
- URL-backed filters
- Clear filters
- Export
- Responsive mobile mode

Desktop:

- Compact readable rows
- Clear alignment
- Sticky action column where useful
- Hover row state
- Selected row state

Mobile:

- Convert dense rows into cards or expandable records
- Keep key fields visible
- Put secondary information inside expandable detail
- Avoid tiny horizontal scrolling where possible

Tables must support dark mode.

==================================================
11. FORM UX
==================================================

Standardize all admin forms.

Use:

- Clear section headings
- Helpful descriptions
- Required indicators
- Inline validation
- Error summary for long forms
- Consistent labels
- Consistent field spacing
- Save status
- Unsaved-change warning
- Sticky save bar on long pages
- Autosave only where safe
- Confirmation before destructive navigation

Split long forms into understandable tabs or sections.

Examples for product editor:

- General
- Media
- Pricing
- Inventory
- Variants
- Organization
- Shipping
- SEO

Avoid placing all product fields in one very long page.

Mobile:

- Full-width fields
- Stacked labels
- Sticky Save button
- Mobile-friendly media picker
- Easy tab navigation

==================================================
12. TOASTS, FEEDBACK, AND CONFIRMATIONS
==================================================

Create one consistent feedback system.

Toast types:

- Success
- Error
- Warning
- Information

Examples:

- Product saved
- Menu updated
- Role created
- User invited
- Settings published
- Upload failed
- Permission denied

Requirements:

- Clear message
- Optional action
- Auto-dismiss only when appropriate
- Persistent errors until dismissed
- Screen-reader announcement
- Dark-mode support

Use confirmation dialogs for:

- Delete
- Archive
- Restore
- Refund
- Disable user
- Remove role
- Reset theme
- Clear cache

Do not use browser alert() or confirm().

==================================================
13. LOADING, EMPTY, AND ERROR STATES
==================================================

Every module must include:

Loading:
- Skeletons
- Button spinner
- Disabled duplicate submissions
- Inertia progress indicator

Empty:
- Clear explanation
- Helpful next action
- Suitable icon or illustration
- No blank white panel

Error:
- Clear summary
- Retry action
- Support reference or request ID for server errors
- Do not expose stack traces

Examples:

No products:
- “No products yet”
- Add product button
- Import products action

No orders:
- “Orders will appear here after customers check out.”

No search results:
- Show active filters
- Clear filters button

==================================================
14. GLOBAL ADMIN SEARCH
==================================================

Improve global search.

Search:

- Products
- Orders
- Customers
- Pages
- Blog posts
- Categories
- Settings

Features:

- Keyboard shortcut
- Fast overlay
- Debounced search
- Keyboard selection
- Recent searches
- Result grouping
- Permission-aware results
- No unauthorized data leakage
- Direct navigation with Inertia

==================================================
15. MISSING BUTTONS AND MENUS
==================================================

Audit the entire CMS and add missing actions.

At minimum verify these exist and work:

Dashboard:
- Quick actions
- View reports
- Change date range

Products:
- Add
- Edit
- View
- Duplicate
- Archive
- Delete
- Import
- Export
- Bulk update

Categories:
- Add
- Edit
- Reorder
- Activate
- Deactivate
- Delete safely

Orders:
- View
- Update status
- Add note
- Print invoice
- Print packing slip
- Refund where authorized
- Export

Customers:
- View
- Edit
- Disable
- View orders
- Add note

Pages:
- Add
- Edit
- Preview
- Publish
- Unpublish
- Duplicate
- Trash
- Restore

Blog:
- Add
- Edit
- Preview
- Publish
- Schedule
- Archive

Media:
- Upload
- Bulk upload
- Edit alt text
- Replace
- Delete
- Copy URL

Menus:
- Create
- Rename
- Duplicate
- Delete
- Save
- Assign location
- Preview

Themes:
- Preview
- Customize
- Save draft
- Publish
- Activate
- Restore

Users:
- Add
- Invite
- Edit
- Assign role
- Reset password
- Disable
- Revoke sessions

Roles:
- Create
- Clone
- Edit permissions
- Delete custom role

Settings:
- Save
- Test email
- Clear cache
- View system status

All actions must have:

- Backend route
- Validation
- Permission check
- Feedback
- Loading state
- Error handling

==================================================
16. RESPONSIVE MOBILE CMS
==================================================

Improve the mobile CMS significantly.

Requirements:

- Slide-out sidebar
- Compact header
- Search overlay
- Clear page title
- Sticky main action
- Responsive cards
- Mobile-friendly tables
- Filter drawer
- Sort drawer
- Large touch targets
- No horizontal overflow
- Safe-area padding
- Bottom-sheet actions where helpful
- Easy dark-mode toggle
- Easy account menu
- Easy back navigation

Test at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px

==================================================
17. ACCESSIBILITY
==================================================

Ensure:

- Keyboard navigation
- Visible focus states
- Correct button labels
- Accessible icon buttons
- Proper dialog semantics
- Focus trapping
- Escape closes overlays
- Focus returns to trigger
- Good color contrast
- Table accessibility
- Form error association
- Reduced-motion support
- Menu expansion state announced
- Dark mode remains accessible

==================================================
18. PERFORMANCE
==================================================

Backend improvements:

- Eager-load relationships
- Remove N+1 queries
- Add indexes
- Cache menu structure
- Cache permission checks where appropriate
- Cache theme settings
- Cache dashboard aggregates
- Use partial Inertia props
- Use deferred props
- Paginate all large datasets
- Avoid duplicate queries
- Queue exports and image processing where practical

Frontend improvements:

- Route-level code splitting
- Lazy-load chart libraries
- Lazy-load rich editors
- Avoid unnecessary re-renders
- Memoize expensive derived values where justified
- Debounce search
- Cancel stale requests
- Keep sidebar and shell lightweight
- Reduce duplicated dependencies
- Optimize SVG icons
- Avoid rendering hidden mobile and desktop layouts simultaneously

Do not sacrifice correctness for optimistic UI.

==================================================
19. DARK MODE IMPLEMENTATION DETAILS
==================================================

Use one global theme provider or a consistent root-level class.

Avoid scattered per-page theme logic.

Ensure the mode applies before React paints to avoid flashing.

Persist preference using the existing safe client preference system.

If using local storage for visual preference only, keep it limited to theme
choice and do not store sensitive data.

Support:

- Light
- Dark
- System

Add:

- Theme toggle in header
- Theme selection in user preferences
- Keyboard-accessible control
- Tooltip
- Current mode indication

==================================================
20. TESTING
==================================================

Add or update tests for:

NAVIGATION
- Admin menu renders allowed items
- Unauthorized menu items are hidden
- Backend access is still denied without permission
- Internal navigation uses valid routes
- Active route state works

THEME
- Light mode
- Dark mode
- System mode preference
- No unreadable status styles

BUTTONS
- Primary actions exist
- Disabled state
- Loading state
- Destructive confirmation

CMS ACTIONS
- Product create
- Product update
- Page publish
- Menu save
- Role update
- User invite
- Settings save

PERFORMANCE
- Dashboard query count is reasonable
- Product list is paginated
- Search is debounced or server-limited
- No duplicate dashboard requests

MOBILE
- Navigation drawer works
- Dialog closes
- Tables render responsive alternative

Run:

php artisan optimize:clear
php artisan route:list
php artisan test
npm run build

Fix all test and build failures before reporting completion.

==================================================
21. IMPLEMENTATION ORDER
==================================================

Proceed in this order:

1. Audit all CMS pages, routes, buttons, and menus
2. Fix broken actions and missing routes
3. Replace unnecessary full-page reloads with Inertia navigation
4. Refine admin design tokens
5. Implement complete light/dark/system theme
6. Refine sidebar and top header
7. Standardize page headers
8. Standardize buttons
9. Standardize forms
10. Standardize data tables
11. Add consistent toasts and confirmations
12. Add loading, empty, and error states
13. Improve dashboard performance
14. Add missing buttons and menu items
15. Improve mobile CMS
16. Improve accessibility
17. Optimize backend queries and frontend bundles
18. Run tests and production build

Do not ask for approval after every small change.
Continue automatically through all high-impact issues.

Only stop for:

- A destructive production database operation
- A genuine route or architecture conflict
- Missing sensitive external credentials
- A decision that would remove existing functionality

==================================================
22. FINAL ACCEPTANCE
==================================================

Do not declare completion until:

- CMS navigation is clear
- CMS navigation is fast
- Internal routes do not unnecessarily reload the page
- Sidebar hover states are polished
- Button hover states are polished
- Light mode is complete
- Dark mode is complete
- System mode works
- Colors are clean and consistent
- Every admin page has a clear title and primary action
- Missing buttons have been added
- Missing menu items have been added
- Broken buttons have been repaired
- Broken menu links have been repaired
- Loading states exist
- Empty states exist
- Error states exist
- Toasts work
- Confirmations work
- Tables are responsive
- Forms are understandable
- Mobile admin is convenient
- Permissions still work
- CMS remains connected to the storefront
- Dashboard loads faster
- No important feature is hidden or lost
- Tests pass
- Production build succeeds
- Existing storefront, cart, checkout, orders, authentication, roles, and CMS
  functionality remain working

Begin by auditing the current CMS dashboard, sidebar, buttons, routes, and
missing actions. Then implement the improvements directly without rebuilding
unrelated modules.