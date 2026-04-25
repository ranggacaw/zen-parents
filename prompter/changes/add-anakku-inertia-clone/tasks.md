## 1. Implementation
- [x] 1.1 Add target-project routes and Inertia page endpoints for the Anakku entry point, student hub, and every `kid_detail_student*` destination.
- [x] 1.2 Build a shared student-center page shell for the cloned module, including the student header area, child summary block, action cards, and mobile navigation/back behavior.
- [x] 1.3 Port the schedule, RKH, attendance, report list, report detail, analytics overview, analytics final-score, and analytics per-subject screens with the same user-visible content structure as the source module.
- [x] 1.4 Replace legacy `?page=` query links with target-project navigation primitives such as named Laravel routes and Inertia `Link` usage while preserving the same reachable paths.
- [x] 1.5 Port the analytics graphs from `plugins/charts/charts-kids.js` into a React-compatible chart implementation used by the target project.
- [x] 1.6 Move or recreate the required kid assets from `_public/mhd/kids/` so every cloned screen renders its referenced imagery correctly.
- [x] 1.7 Review legacy hook-based interactions referenced by the source module, reproduce the ones that are actually defined for the flow, and make any undefined hooks degrade safely instead of leaving dead interactions.

## 2. Validation
- [x] 2.1 Click through the full Anakku flow in the target project from the entry card to every linked student page and confirm back navigation still works.
- [x] 2.2 Run the target project's backend and frontend validation commands, including `php artisan test` and `npm run build` or the nearest equivalents available in that repository.
