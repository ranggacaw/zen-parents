# SMS-Parents
## Executive Summary

**A mobile-first parent portal that unifies admissions, student progress, payments, communication, and school content in one school-branded PWA.**

---

## At a Glance

|                   |                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Product Type**  | School parent engagement and student information portal                                   |
| **Target Market** | K-12 schools in Indonesia and parents/guardians; current content is aligned to SD Muhammadiyah 12 Pamulang [ASSUMPTION] |
| **Platform**      | Mobile web / Progressive Web App (PWA)                                                    |
| **Technology**    | PHP, MySQL/MariaDB, Bootstrap, JavaScript, Chart.js, PSPDFKit, Swup                       |
| **Status**        | MVP / pilot-stage implementation with strong UI coverage and partial backend wiring [ASSUMPTION based on current code] |
| **Business Model**| School-licensed or white-label B2B deployment [ASSUMPTION]                                |
| **Traction**      | [TBD] No production usage or revenue metrics are present in the current repository         |

**Working note:** This brief is derived from the current codebase implementation. Items marked `[ASSUMPTION]` or `[TBD]` require business confirmation.

---

## What is SMS-Parents?

SMS-Parents is a parent-facing school portal designed to keep families connected to the full student journey, from new-child registration and PPDB admissions to daily learning visibility, payments, events, and school communications. The application is delivered as a mobile-first web experience with installable PWA behavior, giving schools an app-like channel without requiring a native mobile build.

In its current form, the product is structured as a school-branded parent companion for academic oversight, operational transactions, and engagement content. The implementation strongly reflects the workflow of a private K-12 school environment, with clear emphasis on Indonesian school operations, Muhammadiyah context, and guardian-centric access.

### The Problem We Solve

| Challenge | Impact |
| --------- | ------ |
| Parent information is fragmented across chat groups, paper notices, spreadsheets, and separate systems. | Families miss updates, staff repeat work, and school communication becomes reactive instead of structured. |
| Admissions and PPDB steps often require manual follow-up for forms, payment proof, and supporting documents. | Administrative workload increases and applicant families lack clear status visibility. |
| Academic progress is typically visible only at fixed reporting moments. | Parents cannot easily monitor schedules, attendance, learning plans, or performance trends between report cycles. |
| School payments for tuition, events, and extracurricular activities are handled through disconnected processes. | Reconciliation is slower, due dates are easier to miss, and payment context is unclear for parents. |
| Educational content and school engagement materials live in separate files or channels. | Parents and students receive a weaker digital experience and lower ongoing engagement with school programs. |

### Our Solution

SMS-Parents brings the parent journey into a single, school-branded mobile interface. It organizes child records, admissions tasks, academic visibility, payments, communications, and content around the parent as the primary user.

```text
Parent Access
    |
    v
Login / Signup / Recovery
    |
    v
Child Hub
    |
    +--> Active Student --> Schedule --> RKH --> Attendance --> Reports --> Analytics
    |
    +--> PPDB Applicant --> Registration --> Form PPDB --> Payment Proof --> Documents --> Admin Chat
    |
    +--> Shared Services --> Transactions --> Events --> Academy --> Articles --> Activities --> Partners --> Account
```

---

## Core Capabilities

### 1️⃣ Parent Access And Identity Management
- Login, account creation, and account recovery screens establish a dedicated guardian entry point.
- Session-based authentication supports parent access without requiring a separate native app account model.
- Profile management covers personal details, contact information, spouse/wali records, and photo uploads.
- Logout and account settings are surfaced directly inside the parent account area.

### 2️⃣ Child Portfolio And PPDB Admissions
- The home dashboard is child-centric and supports both active students and PPDB applicants.
- Parents can register a new child through a detailed intake form covering demographic, family, address, and health-related data.
- PPDB workflow screens cover school interest selection, special-needs status, transport, aid-card fields, and distance/time-to-school inputs.
- Applicant workflow includes registration fee handling, proof-of-payment upload, supporting document upload, and direct chat with admissions staff.

### 3️⃣ Academic Visibility And Student Monitoring
- Student detail pages provide profile information, class assignment, and child-specific navigation.
- Academic modules include class schedule, daily learning plan/RKH, report cards, attendance, and progress analytics.
- Report details extend beyond grades to include spiritual and social behavior, final averages, religious activities, extracurricular evaluation, advice, and physical development tracking.
- Parents can move from high-level semester summaries into detailed academic records in a few taps.

### 4️⃣ Analytics And Performance Insight
- Chart-driven pages visualize overall performance trends, knowledge scores, skills scores, and subject-level performance.
- Comparison views position the child against highest score and average score benchmarks.
- Filter controls indicate a long-term grade-span view across school levels, suggesting cross-year performance continuity.
- Academic analytics complement report cards with a more visual trend-oriented experience.

### 5️⃣ Finance, Events, And School Operations
- Transactions cover multiple payment categories including tuition/SPP, extracurricular activity fees, and event payments.
- Parents can review transaction type, amount, due date, status, and transaction ID from the app.
- Event modules provide schedule, location, logistics, cost, and map access.
- Event detail pages connect directly into payment workflows, reducing friction between school announcement and settlement.

### 6️⃣ Communication, Content, And Engagement
- Chat screens provide direct parent-to-school communication with staff contact lists and message threads.
- Academy pages offer e-book access for student learning materials and embed a PDF reader in the product experience.
- Article pages publish school news and PPDB information in a shareable format.
- Activity and partner sections support extracurricular discovery and school-affiliated promotions.
- Theme settings, dark mode, color highlights, and background customization increase the app-like feel and school branding flexibility.

---

## Key Benefits

| Benefit | Description |
| ------- | ----------- |
| **⏱️ Faster Parent Coordination** | Parents can review key academic, operational, and admissions information from one mobile destination instead of asking staff across multiple channels. |
| **✅ Single School Experience** | The product combines child records, PPDB, finance, events, chat, and content inside one branded interface. |
| **📊 Better Visibility Into Student Progress** | Schedule, attendance, reports, and performance charts give parents a more continuous view of student development. |
| **🔐 Controlled Parent Access** | Session-based login and dedicated parent account flows create a distinct guardian experience rather than an open public information site. |
| **📁 More Structured Admissions** | New-child registration, payment proof, and document upload screens create a clearer PPDB operating model. |
| **🔄 Ongoing School Engagement** | Articles, academy content, events, activities, and chat keep the relationship active beyond billing or report-card periods. |

---

## User Roles Supported

| Role | Primary Functions |
| ---- | ----------------- |
| **Parent / Guardian** | Sign in, manage personal profile, review child records, complete admissions tasks, pay fees, read school content, and contact staff. |
| **Student / Applicant Record** | Acts as the tracked entity for academic data, admissions data, schedule, attendance, reports, and analytics. |
| **PPDB Admin** | Handles applicant communication, admissions coordination, and document/payment follow-up. |
| **Teacher / School Staff** | Provides instructional, attendance, report, and communication touchpoints for parent-facing workflows [ASSUMPTION]. |
| **Finance / Admin Office** | Issues school charges, tracks payment status, and serves as the operational source for transaction records. |
| **School Content Admin** | Publishes events, academic materials, articles, extracurricular information, and partner promotions [ASSUMPTION]. |

---

## System Architecture / Modules

```text
┌─────────────────────────────────────────────────────────────────────┐
│                           SMS-Parents PWA                          │
├─────────────────┬──────────────────┬────────────────┬──────────────┤
│ Auth & Session  │ Parent Dashboard │ Child Registry │ Account Mgmt │
│ Login/Signup    │ Child cards      │ New child form │ Profile/Wali │
├─────────────────┼──────────────────┼────────────────┼──────────────┤
│ Student Center  │ PPDB Applicant   │ Transactions   │ Events       │
│ Schedule/RKH    │ Form/Docs/Chat   │ Fees/History   │ Detail/Pay   │
├─────────────────┼──────────────────┼────────────────┼──────────────┤
│ Reports         │ Analytics        │ Content Hub    │ Comms        │
│ Rapor/Insights  │ Charts/Filters   │ Academy/Article│ Chat         │
└─────────────────┴──────────────────┴────────────────┴──────────────┘
                PHP Routing / Controllers / MySQL Data Layer
```

**12 functional modules** are visible in the current implementation, spanning identity, child management, academics, finance, content, and communication.

---

## Infrastructure Highlights

- **Server-side delivery** - The product uses PHP with include-based routing via `index.php` and `route.php`, which keeps deployment simple and tightly coupled to the school-branded front end.
- **Database integration** - MySQL/MariaDB is used through `mysqli`, with stored procedures such as `user_single` and `select_master_status` supporting account and profile data retrieval.
- **Mobile-first UI shell** - Bootstrap, custom CSS, bottom-tab navigation, and notch-safe viewport settings create an app-like experience optimized for phones.
- **PWA installability** - A web manifest, service worker, install prompts, splash assets, and offline/online messaging support add-to-home-screen behavior.
- **Dynamic page transitions** - Swup-based AJAX navigation reduces full-page reload feel and improves responsiveness.
- **Analytics layer** - Chart.js is used for student performance visualization across multiple academic views.
- **Embedded document viewing** - PSPDFKit powers in-app PDF/eBook reading for academy materials.
- **Theme personalization** - Dark mode plus multiple highlight and background options make the experience more configurable and school-brand ready.
- **Multi-tenant foundation** - The codebase uses a `multiverse` / `verse` structure, indicating support for school-specific branding or deployment variants.

---

## Education Workflow Coverage

### Academic Visibility
- ✅ Child-centric home dashboard with active student and applicant cards
- ✅ Student profile, class placement, and child-specific detail pages
- ✅ Schedule, daily learning plan/RKH, attendance, report cards, and analytics

### Parent Monitoring Workflow
```text
Parent Login → Home / Child Hub → Select Student → Schedule / RKH / Attendance / Report / Analytics → Ongoing follow-up
```

### Admissions And PPDB
- ✅ New child registration form with demographic and family data capture
- ✅ PPDB form with school preference, special-needs, transport, and aid-program fields
- ✅ Registration fee handling, payment proof upload, supporting document upload, and admin chat

### Admissions Workflow
```text
Create Account / Sign In → Register Child → Complete PPDB Form → Upload Payment Proof → Upload Documents → Chat With PPDB Admin → Test / Interview Coordination
```

### Finance And Event Operations
- ✅ Filterable transaction log by payment status and payment type
- ✅ Event listings with date, time, location, cost, and logistic notes
- ✅ Payment handoff from event detail into transaction management

### Payment Workflow
```text
School Issues Charge / Event → Parent Reviews Detail → Pay Now → Transaction Appears In History → Status Reviewed By Parent
```

### Communication And Engagement
- ✅ Staff chat list and conversation screen with attachment actions
- ✅ Academy e-books rendered inside the app via embedded PDF viewer
- ✅ Articles, extracurricular discovery, and partner promotions extend the value beyond core school admin

### Engagement Workflow
```text
Home → More Menu → Chat / Academy / Article / Activity / Partners → Consume Content Or Take Action
```

---

## Dashboard / Analytics

| Widget | Purpose |
| ------ | ------- |
| **Active Student Card** | Gives parents immediate access to the enrolled child’s class, profile, and core academic modules. |
| **Applicant Child Card** | Surfaces the PPDB applicant track separately from the active-student track. |
| **Register Child CTA** | Starts new-child onboarding and PPDB registration. |
| **Semester Report Cards** | Summarize academic averages before parents drill into full report detail. |
| **Attendance Day View** | Shows subject-level attendance for a selected calendar date. |
| **RKH Daily Plan View** | Displays planned learning and activity items for a given day. |
| **Overall Performance Chart** | Compares child performance against average and top benchmarks. |
| **Knowledge / Skills Charts** | Separates performance by score type for more nuanced interpretation. |
| **Subject-Level Trend Charts** | Visualizes performance history for subjects such as Mathematics, Bahasa Indonesia, and IPA. |
| **Transaction Filter Panel** | Helps parents narrow financial records by status and category. |

---

## Competitive Advantages

| Feature | SMS-Parents | Traditional Methods |
| ------- | ----------- | ------------------- |
| Centralized child view | ✅ Student and applicant states are visible in one parent dashboard | ❌ Child information is spread across forms, files, and chat threads |
| Digital admissions workflow | ✅ PPDB form, payment proof, documents, and admin contact live in one place | ❌ Admissions require manual follow-up and disconnected status checks |
| Continuous academic visibility | ✅ Schedule, attendance, RKH, report cards, and charts are accessible on demand | ❌ Parents rely on periodic updates or separate systems |
| Payment transparency | ✅ Parents can see amounts, due dates, status, and transaction history | ❌ Payments are often tracked through bank transfers and manual confirmation |
| App-like mobile access | ✅ Installable PWA supports mobile-first usage without app-store friction | ❌ Browser-only or office-bound systems feel less accessible on phones |
| Rich engagement beyond admin tasks | ✅ E-books, articles, events, activities, and partner offers keep parents engaged | ❌ Communication is limited to notices and occasional updates |

---

## Roadmap Considerations

### Current State
- The implementation covers a broad set of parent workflows across access, academics, finance, admissions, content, and communication.
- The UX is strongly optimized for mobile and already includes installable PWA patterns, theme personalization, and embedded documents/charts.
- Several workflows appear to be partially wired, with some forms still posting to `#` and some routes missing in the router.
- A number of screens still contain static demo values, placeholder document labels, or sample content, indicating prototype or pilot maturity rather than production-hardening.
- Business metrics, pricing model confirmation, and formal product specs are not present in the repository.

### Potential Enhancements

| Priority | Enhancement |
| -------- | ----------- |
| High | Complete missing auth and route wiring for login, signup, forgot-password, and redirect paths. |
| High | Connect profile, spouse/wali, child registration, and PPDB forms to live backend controllers and validation. |
| High | Add formal document management and payment confirmation flows with audit-ready status updates. |
| High | Introduce push/in-app notifications for attendance changes, new charges, event reminders, and PPDB milestones. |
| Medium | Add teacher-side and admin-side operational dashboards to complement the parent-facing experience. |
| Medium | Replace static academic and finance data with school-system integrations and live records. |
| Medium | Improve search, filtering, and history across chat, transactions, events, and academic modules. |
| Medium | Refine service worker caching so offline capability aligns with actual app routes and assets. |
| Low | Expand partner monetization and school-commerce opportunities inside the partner section. |
| Low | Extend the multi-school / white-label model with configurable branding, domain, and module toggles. |

---

## Technical Foundation

| Component | Choice | Why |
| --------- | ------ | --- |
| **Application Shell** | PHP include-based rendering | Keeps deployment straightforward and tightly integrated with server-side session handling. |
| **Routing** | `index.php` + `route.php` switch routing | Simple page dispatch model for multi-screen mobile web apps. |
| **Database** | MySQL/MariaDB via `mysqli` | Familiar stack for operational school systems and lightweight hosting. |
| **Data Access Pattern** | Direct queries plus stored procedures | Supports simple CRUD while allowing reusable school data lookups. |
| **UI Framework** | Bootstrap + custom styles | Speeds up responsive mobile UI delivery and consistent component styling. |
| **Interaction Layer** | Vanilla JavaScript + custom app shell | Minimizes framework overhead while enabling form UX, menus, and page utilities. |
| **Page Transitions** | Swup | Creates smoother app-like navigation between pages. |
| **Analytics** | Chart.js | Provides lightweight charting for academic progress views. |
| **Document Viewer** | PSPDFKit | Enables embedded e-book and PDF consumption directly in the app. |
| **Installability** | Web manifest + service worker | Delivers PWA behavior and home-screen installation. |
| **Asset Strategy** | Lazy loading and modular plugin loading | Improves perceived performance on media-heavy mobile pages. |
| **Branding Model** | Multiverse / verse-based structure | Supports school-specific branding and potential white-label deployments. |

---

## Getting Started

### For New Implementations
1. Confirm the target school, branding, parent role model, and deployment domain.
2. Configure database connectivity, school identity assets, and `multiverse`/`verse` settings.
3. Map live data sources for parents, students, PPDB, transactions, events, academic records, and content.
4. Complete currently unwired controller paths for account management, child registration, PPDB submission, and document handling.
5. Validate PWA behavior, PDF assets, chart data, and mobile QA before live rollout.

### For Existing Users
- Sign in or create an account.
- Complete parent and spouse/wali profile details.
- Review the child cards on the home dashboard.
- Open the student or PPDB track based on the child’s current status.
- Monitor schedule, attendance, reports, analytics, transactions, and events as needed.
- Use chat, academy, article, activity, and partner modules for ongoing school engagement.

---

## Summary

SMS-Parents transforms school-parent engagement by:

1. Consolidating the parent journey across admissions, academics, finance, and communication.
2. Giving families a mobile-first, app-like experience without requiring a native app rollout.
3. Turning report cards, attendance, and schedules into continuously accessible parent insights.
4. Reducing operational friction in PPDB registration, school payments, and event participation.
5. Extending the school relationship through content, e-books, extracurricular discovery, and staff communication.

---

## Document Information

| Item | Details |
| ---- | ------- |
| **Version** | 1.0 |
| **Date** | 2026-04-25 |
| **Classification** | Internal / Executive Review |
| **Full Specification Reference** | No formal product spec exists in `prompter/specs/`; this brief is derived from the current implementation in `route.php`, `_views/multiverse/mhd/`, `_controllers/`, `_manifest.json`, and `_service-worker.js`. |
