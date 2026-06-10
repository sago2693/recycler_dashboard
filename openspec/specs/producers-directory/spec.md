## ADDED Requirements

### Requirement: Display producers list
The producers directory SHALL display a list of all waste producers (restaurants and households) with their name, type, and total residues produced.

#### Scenario: User views producers list
- **WHEN** the user navigates to the producers view
- **THEN** a list/table displays all producers showing name, type (restaurant or household), and total residues volume

### Requirement: Filter producers by type
The producers directory SHALL allow filtering the list by producer type.

#### Scenario: User filters by restaurants
- **WHEN** the user selects the "Restaurants" filter
- **THEN** only restaurant-type producers are displayed in the list

#### Scenario: User filters by households
- **WHEN** the user selects the "Households" filter
- **THEN** only household-type producers are displayed in the list

### Requirement: Display producer details
The producers directory SHALL show a detail view for each producer with volume metrics and assigned recycler information.

#### Scenario: User views producer details
- **WHEN** the user clicks on a producer in the list
- **THEN** the system shows the producer's name, address, type, monthly residue volume, primary material types, and assigned recycler name

### Requirement: Display producer status
Each producer entry SHALL display a status indicator showing whether they are active, inactive, or pending onboarding.

#### Scenario: User sees producer statuses
- **WHEN** the user views the producers list
- **THEN** each producer row includes a color-coded status badge (green for active, gray for inactive, yellow for pending)
