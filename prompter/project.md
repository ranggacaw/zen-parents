# Project Context

## Purpose

Zen Parents is a mobile-first parent portal for school admissions, academics, finance, communication, and school-managed content. The repository now implements a Laravel monolith with Inertia and React rather than a legacy PHP portal.

## Tech Stack

- PHP 8.2
- Laravel 12
- Inertia.js
- React
- Tailwind CSS
- PostgreSQL-first runtime configuration
- SQLite for automated tests and simple local runs

## Project Conventions

### Code Style

- Prefer small, explicit Laravel controllers and Eloquent relationships.
- Keep React pages straightforward and colocated under `resources/js/Pages`.
- Use existing shadcn-style primitives from `resources/js/Components/ui` before adding new UI abstractions.
- Keep changes tightly scoped to the requested module.

### Architecture Patterns

- Server routes render Inertia pages; avoid introducing a separate SPA/API split unless required.
- Household ownership is the core authorization boundary for parent-visible records.
- Domain entities are modeled directly in Eloquent with audit-friendly status fields.
- School branding and feature flags are shared through `config/school.php` and Inertia shared props.

### Testing Strategy

- Use feature tests for parent journeys and access-control behavior.
- Run `php artisan test` for backend verification.
- Run `npm run build` to validate frontend bundles.
- Refresh fixtures with `php artisan migrate:fresh --seed` when schema or seed data changes.

### Git Workflow

- Follow Prompter change proposals for new capabilities or major architectural changes.
- Keep implementation aligned with the proposal task list before marking tasks complete.

## Domain Context

- Parent users belong to a household.
- Households own students, applicants, transactions, and conversations.
- Students expose schedules, learning plans, attendance, reports, and performance snapshots.
- Applicants carry admissions data, uploaded proof, and an admissions messaging handoff.
- Finance includes both ledger items and event-linked payment flows.

## Important Constraints

- Parent data must remain scoped to the signed-in household.
- The product should remain mobile-first and PWA-ready.
- PostgreSQL is the target production database even though tests can run on SQLite.

## External Dependencies

- No payment gateway or external SIS is implemented yet.
- No third-party messaging provider is required for the current in-app conversation experience.
