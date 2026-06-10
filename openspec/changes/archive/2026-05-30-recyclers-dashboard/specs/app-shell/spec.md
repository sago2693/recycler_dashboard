## ADDED Requirements

### Requirement: Application layout with sidebar navigation
The app shell SHALL provide a persistent sidebar navigation with links to all three main views: Overview Dashboard, Recyclers, and Producers.

#### Scenario: User sees navigation
- **WHEN** the application loads
- **THEN** a sidebar is visible with navigation links labeled "Dashboard", "Recyclers", and "Producers", plus the association's name/logo at the top

### Requirement: Active route highlighting
The app shell SHALL visually highlight the navigation link corresponding to the current view.

#### Scenario: User is on the dashboard page
- **WHEN** the user is viewing the overview dashboard
- **THEN** the "Dashboard" navigation link is visually highlighted as active

### Requirement: Client-side routing
The app shell SHALL use client-side routing so navigation between views does not trigger a full page reload.

#### Scenario: User navigates between views
- **WHEN** the user clicks a navigation link
- **THEN** the view changes without a full page reload and the browser URL updates accordingly

### Requirement: Default route
The app shell SHALL redirect to the overview dashboard when the user visits the root URL.

#### Scenario: User visits root URL
- **WHEN** the user navigates to the root path "/"
- **THEN** the system redirects to and displays the overview dashboard view
