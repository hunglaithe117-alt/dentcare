# DentCare WordPress Migration

This project now includes a custom WordPress theme at:

`wordpress/wp-content/themes/dentcare`

The theme ports the current Next.js marketing site into WordPress while leaving the Next.js app untouched for comparison and rollback.

## Local WordPress Setup

1. Install local PHP and MySQL/MariaDB.
2. Create a database for WordPress.
3. Update `wordpress/wp-config.php` with the local database credentials.
4. Open the local WordPress URL and finish the installer.
5. Activate the `DentCare` theme.
6. In Settings > Permalinks, save a pretty permalink structure.

The theme registers routes for:

- `/fr`
- `/en`
- `/fr/legal-info`
- `/en/legal-info`
- `/fr/terms-and-conditions`
- `/en/terms-and-conditions`

Root `/` redirects to `/fr`.

## Required Plugins

Install and activate:

- Polylang
- Contact Form 7
- WP Mail SMTP or an equivalent SMTP plugin

Recommended Polylang settings:

- Languages: French (`fr`) and English (`en`)
- Default language: French
- URL mode: include language code in URL

Recommended Contact Form 7 fields:

```text
[text* name autocomplete:name]
[email* email autocomplete:email]
[tel phone autocomplete:tel]
[textarea* message]
[submit "Envoyer le Message"]
```

If Contact Form 7 is unavailable, the theme renders a fallback WordPress mail form. For production, prefer Contact Form 7 plus SMTP.

## Theme Data

The homepage text is loaded from:

- `assets/data/fr.json`
- `assets/data/en.json`

Product, gallery, hero, brand, shipping and legal mappings live in:

- `inc/data.php`

Images were copied from the current `public/` directory into:

- `assets/images/`
- root asset files such as `logo-light.svg`, `logo-dark.svg`, `robots.txt`, `sitemap.xml`

## QA Checklist

- Verify `/fr` and `/en` render the homepage.
- Verify the sticky header changes after scroll.
- Verify mobile menu opens and closes.
- Verify hero slider and dots.
- Verify product tabs and modal.
- Verify clinical image lightbox, Escape, previous and next.
- Verify FAQ accordion.
- Verify legal and terms pages for both languages.
- Verify contact form validation and SMTP delivery.
- Check browser console for JavaScript errors.
- Compare against the Next.js site at 1440px, 1024px, 768px, and 390px.

