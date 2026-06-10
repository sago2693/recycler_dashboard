## MODIFIED Requirements

### Requirement: Display recycler statistics
The recycler profile page SHALL display the recycler's collection statistics including total items, total weight, items by category (with category names in Spanish), and a monthly activity chart.

#### Scenario: User views recycler stats
- **WHEN** the user views a recycler's profile page
- **THEN** the page displays stat cards (total items, total weight, active months) and a bar chart of monthly collections, with all category names shown in Spanish

### Requirement: Display recycler recent updates
The recycler profile page SHALL display a chronological feed of the recycler's recent collection activities. Category names in the feed SHALL be displayed in Spanish.

#### Scenario: User views recent activity
- **WHEN** the user views a recycler's profile page
- **THEN** a feed/timeline shows the last 10 collection entries with date, items collected, category (in Spanish), and location
