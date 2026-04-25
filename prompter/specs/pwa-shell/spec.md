# pwa-shell Specification

## Purpose
TBD - created by archiving change update-pwa-mobile-shell. Update Purpose after archive.
## Requirements
### Requirement: Installable Parent Portal Shell
The system SHALL expose a branded, installable PWA shell for the parent portal, including manifest metadata, application icons, theme metadata, and install guidance that matches the configured school branding.

#### Scenario: Supported browser offers installation
- **WHEN** a signed-in parent opens the portal in a browser that supports app installation
- **THEN** the shell presents an install affordance without interrupting the current task
- **AND** the installed app uses school-branded name, theme color, and icon metadata

#### Scenario: Installed app launches as an app shell
- **WHEN** a parent launches the installed app from their device home screen
- **THEN** the portal opens in standalone mode at the configured start experience
- **AND** the shell preserves brand styling without browser chrome-dependent layout issues

### Requirement: Offline-Aware Shell Entry
The system SHALL provide resilient offline-aware behavior for the parent portal shell so that previously visited shell assets and a fallback entry experience remain available during temporary network loss.

#### Scenario: Network loss during shell revisit
- **WHEN** a parent revisits the app shell while their network connection is unavailable
- **THEN** the service worker serves cached shell assets or an offline fallback entry instead of a browser network error
- **AND** the experience clearly indicates that fresh household data may be unavailable until connectivity returns

#### Scenario: Service worker cache rotation
- **WHEN** a new shell version is deployed
- **THEN** outdated caches are retired during service worker activation
- **AND** the current shell assets remain available for subsequent visits

### Requirement: Standalone Safe-Area Support
The system SHALL account for mobile browser and standalone safe areas so fixed navigation, headers, and actions remain visible and tappable on supported devices.

#### Scenario: Standalone app on a device with insets
- **WHEN** a parent uses the installed app on a device with top or bottom safe-area insets
- **THEN** shell spacing prevents content or navigation from being clipped by the system UI
- **AND** primary actions remain reachable without overlapping the viewport edge

