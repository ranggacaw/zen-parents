<!-- PROMPTER:START -->
# Prompter Instructions

These instructions are for AI assistants working in this project.

Always open `@/prompter/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/prompter/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines
- Show Remaining Tasks

<!-- PROMPTER:END -->

# Project Conventions

## Stack

- Backend: Laravel 12 on PHP 8.2
- Frontend: Inertia.js + React + Tailwind CSS
- UI baseline: `resources/js/Components/ui` contains shadcn-style primitives
- Data store: PostgreSQL-first configuration, with SQLite remaining available for tests and local automation

## Architecture

- Keep the app as a Laravel monolith with server-side routing and Inertia page delivery.
- Prefer scoped, domain-oriented controllers over generic API layers unless a request explicitly needs an external API.
- Household ownership is the primary authorization boundary for students, applicants, transactions, and conversations.
- Favor small, direct React pages over premature component abstraction.

## Data And Seeding

- Representative demo data lives in `database/seeders/DatabaseSeeder.php`.
- When adding parent-facing modules, update seeded data so the dashboard and feature tests stay realistic.
- Store admissions uploads on the `public` disk unless the request introduces a different storage policy.

## Verification

- Minimum verification for meaningful changes: `php artisan test` and `npm run build`.
- If schema changes are involved, also run `php artisan migrate:fresh --seed` when feasible.
