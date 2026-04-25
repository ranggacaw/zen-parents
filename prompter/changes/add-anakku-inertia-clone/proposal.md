# Change: Clone the Anakku student module into Laravel + Inertia

## Why
The current Anakku student experience exists only as a PHP include-based mobile flow in this repository. The team needs the same linked experience available in a Laravel + Inertia (React) application without losing the screens, navigation paths, or supporting assets that make up the module.

## What Changes
- Define a Laravel + Inertia clone of the Anakku student flow that starts from the child card entry point and opens the student detail hub.
- Include all linked student subpages currently reachable from `kid_detail_student`: schedule, RKH, report list, report detail, attendance, analytics overview, analytics final-score view, and analytics per-subject view.
- Define how source assets, chart behavior, and module-specific interactions are carried into the target stack.
- Preserve the current user-visible structure first, without expanding the scope into unrelated modules or new business logic.

## Impact
- Affected specs: `student-center`
- Source references: `route.php`, `_views/multiverse/mhd/home.php`, `_views/multiverse/mhd/kid_detail_student*.php`, `plugins/charts/charts-kids.js`, `_public/mhd/kids/**/*`
- Target implementation areas: Laravel web routes, Inertia page endpoints, React pages/components, shared mobile layout/navigation, chart rendering, and imported/static assets
