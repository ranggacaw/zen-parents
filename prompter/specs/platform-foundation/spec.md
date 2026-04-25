# platform-foundation Specification

## Purpose
TBD - created by archiving change refactor-parent-portal-to-laravel-stack. Update Purpose after archive.
## Requirements
### Requirement: Laravel Application Foundation
The system SHALL be implemented as a Laravel application that delivers the parent portal through Inertia.js with React, uses shadcn/ui as the default component baseline, and stores operational data in PostgreSQL.

#### Scenario: A new environment boots the platform
- **WHEN** a new deployment environment is provisioned
- **THEN** the application runs on Laravel with PostgreSQL as its primary database
- **AND** parent-facing screens are delivered through Inertia.js and React
- **AND** the default UI component baseline supports shadcn/ui-driven styling and composition

### Requirement: School-Branded Mobile PWA Shell
The system SHALL provide a mobile-first, installable web experience with school-configurable branding, navigation, and baseline offline resilience for shell assets and recent read-only views.

#### Scenario: A parent installs and reopens the portal
- **WHEN** a parent visits the portal on a supported mobile browser and chooses to install it
- **THEN** the application presents an installable PWA shell with school branding assets
- **AND** the primary navigation and shared layout remain optimized for mobile usage
- **AND** recently visited shell assets and read-only pages remain available during short network interruptions

### Requirement: Deployment-Ready School Configuration
The system SHALL support deployment-specific school configuration for branding, domain settings, and feature flags without requiring code changes per school.

#### Scenario: A school configures its branded deployment
- **WHEN** an operator sets school-level branding and module configuration for a deployment
- **THEN** the portal reflects the configured school name, visual identity, and enabled modules
- **AND** the configuration can be changed without rebuilding the application for each branding update

