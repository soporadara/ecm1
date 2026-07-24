# CMS Security

CMS security blocks are separate from customer Firebase authentication.

## Failed Login Tracking

Failed CMS logins are recorded in `cms_login_attempts` with:

- Masked email and keyed email hash
- IP address
- Privacy-safe device hash
- User-agent summary
- Failure category
- Attempt timestamp

Passwords, Firebase tokens, OAuth tokens, and invasive browser fingerprints are never stored.

## Thresholds

- 5 failed attempts within 15 minutes create a temporary 15-minute block.
- 10 failed attempts within 30 minutes create a temporary 24-hour block.

Blocks are not permanent unless created manually later by a Super Admin workflow.

## Access Control

Super Admins can review active blocks and recent failed attempts at:

`/admin/security/access-control`

The page can release active blocks. Customer login attempts are intentionally not shown or blocked here.

## CLI Recovery

Use the recovery command if a staff member is blocked:

```bash
php artisan cms:security:unblock --ip=127.0.0.1
php artisan cms:security:unblock --email=admin@example.com
php artisan cms:security:unblock --device=DEVICE_HASH
php artisan cms:security:unblock --all-temporary
```

The command reports how many active CMS blocks were released.
