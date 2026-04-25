# student-portfolio-admissions Specification

## Purpose
TBD - created by archiving change refactor-parent-portal-to-laravel-stack. Update Purpose after archive.
## Requirements
### Requirement: Child Portfolio Hub
The system SHALL present a child-centric home experience that distinguishes active students, PPDB applicants, and register-child actions for the authenticated parent.

#### Scenario: A parent opens the dashboard with multiple child states
- **WHEN** a parent has both enrolled students and PPDB applicants linked to the household
- **THEN** the dashboard shows separate entries for active-student and applicant journeys
- **AND** the parent can start a new child registration from the same home experience

### Requirement: New Child Registration
The system SHALL allow parents to register a new child using demographic, family, address, and health-related information required for onboarding and admissions.

#### Scenario: A parent registers a new child
- **WHEN** a parent completes the new-child registration form with the required onboarding data
- **THEN** the system creates a child record linked to the household
- **AND** the record is ready to continue into the PPDB admissions workflow when applicable

### Requirement: PPDB Admissions Workflow
The system SHALL support a PPDB workflow that captures school preference, special-needs status, transport, aid-program data, distance/time-to-school details, payment proof, supporting documents, and admissions status updates.

#### Scenario: A parent completes an applicant submission
- **WHEN** a parent submits the PPDB form and uploads the required payment proof and supporting documents
- **THEN** the system records the applicant submission and its admissions artifacts
- **AND** the applicant status becomes visible to the parent in the child hub
- **AND** related admissions follow-up can continue without re-entering prior submission data

### Requirement: Admissions Communication Handoff
The system SHALL provide a parent-visible handoff from an applicant record into admissions communication so status questions and follow-up requests remain tied to the applicant context.

#### Scenario: A parent needs clarification about an applicant status
- **WHEN** a parent opens communication from an applicant workflow
- **THEN** the system starts or opens an admissions conversation linked to the relevant applicant
- **AND** the parent does not need to re-identify the child in a separate channel

