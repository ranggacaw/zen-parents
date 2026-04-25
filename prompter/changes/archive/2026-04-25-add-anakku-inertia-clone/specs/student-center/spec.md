## ADDED Requirements
### Requirement: Anakku Student Entry And Hub
The system SHALL provide a Laravel + Inertia clone of the Anakku student module that starts from an Anakku child entry point and opens a student detail hub equivalent to the current `kid_detail_student` experience.

#### Scenario: Parent opens the student hub from Anakku
- **WHEN** the parent selects the active-student card from the Anakku area
- **THEN** the application opens a student detail page that shows the child's summary information, class badge, profile details, and the same primary action cards as the source module

### Requirement: Linked Student Academic Views
The system SHALL include every student-facing screen currently linked from the source `kid_detail_student` flow.

#### Scenario: Parent opens a linked student screen
- **WHEN** the parent uses the student hub actions for schedule, RKH, report, attendance, or analytics
- **THEN** the application opens the corresponding cloned screen in the Laravel + Inertia project

#### Scenario: Parent drills deeper into report and analytics pages
- **WHEN** the parent selects a report summary or analytics subview from within the flow
- **THEN** the application opens the cloned report-detail or analytics-detail page without leaving the Anakku student journey

### Requirement: Route And Link Parity
The system SHALL preserve the current Anakku student navigation graph while replacing the legacy `?page=` links with target-project routing and Inertia navigation.

#### Scenario: Source links are mapped into target routes
- **WHEN** the clone is implemented in the Laravel + Inertia project
- **THEN** each source destination from `home -> kid_detail_student -> kid_detail_student*` has a reachable target route and uses target-native navigation primitives instead of query-string page routing

### Requirement: Visual And Asset Parity
The system SHALL carry over the module-specific visual assets and content structures needed to keep the cloned Anakku flow recognizable.

#### Scenario: Cloned pages render source imagery and layout cues
- **WHEN** the parent opens the cloned student pages
- **THEN** each page renders its required kid imagery, screen title, section labels, semester or class context, and card/list structure without broken asset references

### Requirement: Analytics Parity
The system SHALL render the student analytics views with target-compatible chart behavior equivalent to the source graphs.

#### Scenario: Parent opens analytics pages
- **WHEN** the parent visits the analytics overview or either analytics detail screen
- **THEN** the application shows the expected chart series and labels for overall, knowledge, skills, and subject-level performance in a React-compatible rendering approach

### Requirement: Legacy Interaction Handling
The system SHALL explicitly handle hook-based interactions referenced by the source Anakku module.

#### Scenario: Source interaction is defined within the student flow
- **WHEN** a source interaction has a working in-flow definition, such as `detailed-b` in the report detail page
- **THEN** the clone preserves that interaction or maps it to an equivalent target-project detail pattern

#### Scenario: Source interaction is undefined or inherited from outside the module
- **WHEN** a source interaction is referenced but not locally supported by the cloned flow, such as `menu-story` or `menu-transaction-1`
- **THEN** the clone documents the chosen handling and degrades safely instead of leaving a broken or dead interaction
