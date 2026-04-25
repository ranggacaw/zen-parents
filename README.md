# Zen Parents

Zen Parents is a Laravel 12 parent portal delivered with Inertia.js and React. It covers parent authentication, household access, child portfolio and PPDB admissions, academic visibility, finance and events, messaging, and school-managed content in a mobile-first PWA shell.

## Stack

- Laravel 12 + PHP 8.2
- Inertia.js + React
- Tailwind CSS
- shadcn-style UI primitives in `resources/js/Components/ui`
- PostgreSQL-first configuration in `.env.example`
- SQLite test/dev fallback still works for local automation

## Local Setup

1. Install dependencies with `composer install` and `npm install`.
2. Copy `.env.example` to `.env` and update database credentials.
3. Generate an app key with `php artisan key:generate`.
4. Run `php artisan migrate --seed`.
5. Start the app with `composer run dev`.

## Seeded Demo Account

- Email: `parent@example.com`
- Password: `password`

The seeder creates:

- One household with a parent account
- One active student with schedule, attendance, report, and analytics data
- One PPDB applicant with admissions documents and a linked conversation
- Finance ledger entries and an upcoming paid school event
- Academy materials, article content, activity data, and a partner promotion

## Quality Checks

- Run tests with `php artisan test`
- Build assets with `npm run build`
- Refresh demo data with `php artisan migrate:fresh --seed`

## Module Map

- `app/Http/Controllers/DashboardController.php`: parent home and shared summaries
- `app/Http/Controllers/ApplicantController.php`: child registration, PPDB submission, admissions handoff
- `app/Http/Controllers/StudentController.php`: academic visibility and analytics
- `app/Http/Controllers/FinanceController.php`: ledger filters and event payment handoff
- `app/Http/Controllers/ConversationController.php`: staff messaging threads
- `app/Http/Controllers/ContentController.php`: materials, articles, activities, partner content
- `database/migrations/2026_04_25_000001_create_parent_portal_domain_tables.php`: portal domain schema
- `database/seeders/DatabaseSeeder.php`: representative fixture data

## PWA Notes

- Manifest: `public/manifest.webmanifest`
- Service worker: `public/sw.js`
- Shared school branding config: `config/school.php`
