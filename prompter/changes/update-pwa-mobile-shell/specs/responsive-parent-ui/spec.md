## ADDED Requirements
### Requirement: Touch-First Primary Navigation
The system SHALL present the authenticated parent portal's primary destinations using touch-friendly navigation that behaves like app tabs on phones and remains clear and efficient on tablets.

#### Scenario: Phone navigation uses tab-style destinations
- **WHEN** a signed-in parent views an authenticated page on a phone-sized viewport
- **THEN** the shell shows the primary destinations for Home, Finance, Messages, Content, and Profile as a persistent touch-friendly tab navigation
- **AND** the active destination is visually distinguished
- **AND** the navigation does not obscure page content or actions

#### Scenario: Tablet navigation adapts to wider layouts
- **WHEN** a signed-in parent views an authenticated page on a tablet-sized viewport
- **THEN** the shell adapts navigation spacing, placement, or density for the wider viewport
- **AND** the navigation remains immediately available without feeling like a stretched phone footer

### Requirement: Responsive Parent Page Layouts
The system SHALL render parent-facing pages so cards, forms, lists, and detail sections fit phone and tablet widths without horizontal scrolling or clipped controls.

#### Scenario: Dashboard fits phone and tablet widths
- **WHEN** a parent opens the dashboard on a phone or tablet
- **THEN** summary cards, quick actions, recent activity, and supporting sections reflow to the available width
- **AND** important actions remain visible without requiring a horizontal scroll

#### Scenario: Forms and filters remain usable on smaller screens
- **WHEN** a parent uses admissions forms, conversation composers, profile forms, or finance filters on a phone-sized viewport
- **THEN** the inputs stack or resize to remain readable and tappable
- **AND** submission controls stay reachable above the navigation chrome

### Requirement: Mobile-First Content Density
The system SHALL prioritize concise headings, readable spacing, and touch-appropriate targets across parent-facing authenticated pages.

#### Scenario: Dense information remains scannable
- **WHEN** a page includes multiple cards, badges, or status summaries
- **THEN** the layout preserves readable text hierarchy and tap targets suitable for handheld use
- **AND** secondary information is visually de-emphasized before primary actions or statuses
