## ADDED Requirements

### Requirement: Display recycler list
The recycler profiles view SHALL display a list of all registered recyclers with their name, status (active/inactive), and total items collected.

#### Scenario: User views recycler list
- **WHEN** the user navigates to the recyclers view
- **THEN** a list/table of all recyclers is displayed showing name, status badge, and total items collected

### Requirement: View individual recycler profile
The recycler profiles view SHALL allow navigating to a detail page for a specific recycler showing their full stats and activity.

#### Scenario: User selects a recycler
- **WHEN** the user clicks on a recycler in the list
- **THEN** the system navigates to that recycler's profile page

### Requirement: Display recycler statistics
The recycler profile page SHALL display the recycler's collection statistics including total items, total weight, items by category, and a monthly activity chart.

#### Scenario: User views recycler stats
- **WHEN** the user views a recycler's profile page
- **THEN** the page displays stat cards (total items, total weight, active months) and a bar chart of monthly collections

### Requirement: Display recycler recent updates
The recycler profile page SHALL display a chronological feed of the recycler's recent collection activities.

#### Scenario: User views recent activity
- **WHEN** the user views a recycler's profile page
- **THEN** a feed/timeline shows the last 10 collection entries with date, items collected, category, and location
