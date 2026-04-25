## Context
Zen Parents is already positioned as a mobile-first parent portal and ships with an initial manifest, service worker registration, and a shared authenticated layout. The current implementation establishes the direction, but it does not yet define what "PWA-ready" and "fit for tabs and mobile" mean in a consistent, testable way across the authenticated shell.

For this proposal, the request is interpreted as improving the app for phone and tablet use while preserving a tab-like primary navigation model on small screens.

## Goals / Non-Goals
- Goals:
- Establish a clear PWA shell baseline for installability, standalone use, and offline-aware entry behavior.
- Define responsive UI requirements for phone and tablet widths in the authenticated parent portal.
- Keep the implementation centered on the existing Laravel, Inertia, React, and Tailwind stack.
- Non-Goals:
- Adding push notifications, background sync, or deep offline write support.
- Replacing Inertia with a separate client-side SPA architecture.
- Redesigning every page into a new visual language unrelated to the existing branded portal.

## Decisions
- Decision: Treat the current `AuthenticatedLayout` as the single source of truth for the parent app shell.
- Why: Navigation, install affordances, spacing, and safe-area behavior should stay centralized so the page components only adapt their own content density.

- Decision: Keep phone navigation as a bottom tab bar, and define a tablet-specific adaptation rather than forcing the exact same mobile chrome at all widths.
- Why: The current information architecture already maps cleanly to five primary destinations, but the existing fixed bottom bar is optimized for phones, not wider tablet layouts.

- Decision: Strengthen the existing native manifest and service worker approach instead of introducing a separate PWA framework.
- Why: The app already registers `/sw.js` and serves `/manifest.webmanifest`, so the minimal path is to improve those assets and the shell around them.

## Alternatives Considered
- Alternative: Keep the current layout and only tune CSS spacing.
- Why not chosen: That would not address manifest completeness, install affordances, standalone spacing, or offline entry behavior.

- Alternative: Introduce a heavier client-side PWA/plugin stack.
- Why not chosen: The existing implementation already has the right primitives, and this request does not justify a framework-level shift.

## Risks / Trade-offs
- Risk: Offline expectations can expand beyond a simple shell/offline-entry experience.
- Mitigation: Scope the requirements to resilient entry and previously visited assets, not full offline parity for authenticated data mutations.

- Risk: A tablet layout can drift into a desktop-only redesign.
- Mitigation: Keep requirements centered on touch ergonomics, readable density, and no horizontal overflow at tablet widths.

- Risk: Fixed navigation can conflict with safe areas and page actions.
- Mitigation: Make safe-area spacing and unobscured interactive content explicit requirements.

## Migration Plan
1. Update the shell assets and metadata first.
2. Update the shared authenticated shell.
3. Audit and refine page layouts starting with dashboard and other high-traffic parent views.
4. Validate install, standalone, offline-entry, phone, and tablet behavior before rollout.

## Open Questions
- None required for this proposal; implementation can proceed once the shell and responsive requirements are approved.
