## Context
The source Anakku student experience is currently implemented as a PHP/PWA flow with include-based routing in `route.php` and page templates under `_views/multiverse/mhd/`. The main entry is the child card in `_views/multiverse/mhd/home.php`, which links into `_views/multiverse/mhd/kid_detail_student.php`.

From the student detail hub, the source flow branches into these linked screens:
- `kid_detail_student_schedule`
- `kid_detail_student_rkh`
- `kid_detail_student_report`
- `kid_detail_student_report_detail`
- `kid_detail_student_absensi`
- `kid_detail_student_analytic`
- `kid_detail_student_analytic_1`
- `kid_detail_student_analytic_2`

The flow also depends on:
- shared kid imagery under `_public/mhd/kids/`
- global mobile layout pieces in `_views/multiverse/mhd/layouts/menu.php` and `footer.php`
- chart rendering from `plugins/charts/charts-kids.js`
- hook-based interactions such as `data-menu="detailed-b"`, `data-menu="menu-story"`, and `data-menu="menu-transaction-1"`

Not every hook is locally defined inside the student flow. `detailed-b` is defined in `kid_detail_student_report_detail.php`, while `menu-story` has no local definition in the current codebase and `menu-transaction-1` is defined in `transaction.php`, not in the student pages that reference it.

## Goals / Non-Goals
- Goals:
- Reproduce the full linked Anakku student journey inside a Laravel + Inertia (React) project.
- Preserve the current screen structure, navigation graph, and visual hierarchy before adding any redesign.
- Carry over the module-specific assets and analytics behavior in a target-stack-friendly way.
- Make legacy interaction dependencies explicit so the clone does not ship with broken taps.
- Non-Goals:
- Rebuild unrelated modules such as transactions, academy, events, or account pages.
- Introduce new backend business logic beyond what is required to render the cloned flow.
- Redesign the module or normalize all content into a final production data model in the first pass.

## Decisions
- Decision: Treat the clone as one routed student-center flow made of multiple Inertia pages that share a common layout and student context.
  Rationale: The source pages are separate files but behave as a single child-monitoring journey.

- Decision: Replace `?page=` query routing with explicit Laravel routes and Inertia navigation.
  Rationale: The destination stack should use its own routing primitives rather than carry forward the legacy query-string router.

- Decision: Port analytics into React-compatible chart components instead of reusing the legacy DOM-driven plugin loader from `scripts/custom.js`.
  Rationale: The current chart behavior depends on global script discovery by `.graph`, which is not a good fit for Inertia page components.

- Decision: Preserve only working or intentionally mapped interactions for the first clone.
  Rationale: The source contains inherited hooks that are undefined or defined outside the module. The target clone should either wire them intentionally or downgrade them to non-breaking static UI instead of shipping dead interactions.

- Decision: Start from parity with the current hardcoded source content and data shape, then deepen backend integration only where the target project already has the needed domain data.
  Rationale: The source module itself is largely static, so parity is the smallest correct first implementation.

## Risks / Trade-offs
- Destination-project structure is unknown in this repository.
  Mitigation: Keep the proposal focused on capability and route coverage, not target-repo-specific file names.

- Some source interactions are ambiguous or partially wired.
  Mitigation: Require an explicit review of hook-based interactions during implementation and avoid silent broken links.

- The report detail screen is much larger and denser than the other pages.
  Mitigation: Treat it as part of the same flow but keep its content grouped into reusable display sections only if the target project truly benefits from that extraction.

## Migration Plan
1. Recreate the route graph in the Laravel + Inertia application.
2. Add a shared student-center layout and asset references.
3. Port the hub and linked pages in navigation order.
4. Replace legacy chart bootstrapping with React-compatible chart rendering.
5. Verify every source-linked path and interaction in the cloned flow.

## Open Questions
- Should the first implementation use fixture-backed data for parity, or must it be wired to real student records immediately in the target project?
- Should inherited hooks such as `menu-story` and `menu-transaction-1` be recreated as overlays in the target project, or is safe non-interactive fallback acceptable for the first clone?
