## 1. Implementation
- [ ] 1.1 Update the PWA shell metadata, manifest, icons, and service worker behavior so the app is installable and resilient on supported mobile browsers.
- [ ] 1.2 Refine the root document and shared app bootstrapping for standalone mode, safe-area spacing, and install-state awareness.
- [ ] 1.3 Redesign the authenticated shell for touch-friendly phone navigation and tablet-optimized navigation/layout behavior.
- [ ] 1.4 Audit and update key parent-facing pages (`Dashboard`, `Finance`, `Conversations`, `Content`, `Students`, `Applicants`, `Profile`) so cards, forms, lists, and actions fit phone and tablet widths without overflow.
- [ ] 1.5 Add or update automated coverage for PWA document output and any server-rendered shell data that supports the new experience.

## 2. Validation
- [ ] 2.1 Run `php artisan test`.
- [ ] 2.2 Run `npm run build`.
- [ ] 2.3 Manually verify install flow, standalone launch, offline fallback entry, phone layout, and tablet layout in browser device emulation.
