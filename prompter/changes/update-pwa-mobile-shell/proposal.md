# Change: Update parent portal PWA shell for mobile and tablet use

## Why
Zen Parents already includes a manifest, service worker, and a fixed bottom navigation, but the current experience is only partially PWA-ready and several authenticated pages still read like desktop layouts compressed onto smaller screens. The product context explicitly requires a mobile-first, PWA-ready parent portal, so the shell and page behavior need clearer requirements before implementation.

## What Changes
- Define a first-class PWA shell for branded installability, standalone behavior, safe-area support, and resilient offline entry behavior.
- Define adaptive authenticated navigation and layout rules for phone and tablet widths, using touch-friendly primary tabs and page reflow that avoids horizontal overflow.
- Audit the current parent-facing pages against those shell requirements so implementation can update the shared layout and the highest-traffic screens consistently.

## Impact
- Affected specs: `pwa-shell`, `responsive-parent-ui`
- Affected code: `public/manifest.webmanifest`, `public/sw.js`, `resources/views/app.blade.php`, `resources/js/app.jsx`, `resources/js/Layouts/AuthenticatedLayout.jsx`, `resources/css/app.css`, `resources/js/Pages/**/*.jsx`
