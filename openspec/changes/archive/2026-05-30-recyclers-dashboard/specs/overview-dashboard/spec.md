## ADDED Requirements

### Requirement: Display total collection metrics
The overview dashboard SHALL display aggregated metrics including total items collected, total weight collected, and number of active recyclers.

#### Scenario: Chief views total metrics
- **WHEN** the chief navigates to the overview dashboard
- **THEN** the system displays cards showing total items collected, total weight (kg), and count of active recyclers

### Requirement: Display collection trends over time
The overview dashboard SHALL display a line chart showing collection volumes over the past 12 months.

#### Scenario: Chief views monthly trend
- **WHEN** the chief views the overview dashboard
- **THEN** a line chart displays monthly collection totals for the last 12 months with labeled axes

### Requirement: Display category breakdown
The overview dashboard SHALL display a breakdown of collected items by material category (e.g., plastic, glass, paper, metal, organic).

#### Scenario: Chief views category distribution
- **WHEN** the chief views the overview dashboard
- **THEN** a pie or bar chart shows the percentage and quantity of each material category collected

### Requirement: Display top recyclers summary
The overview dashboard SHALL display a ranked list of the top 5 recyclers by total items collected.

#### Scenario: Chief sees top performers
- **WHEN** the chief views the overview dashboard
- **THEN** a summary table shows the top 5 recyclers with their names and total collection counts
