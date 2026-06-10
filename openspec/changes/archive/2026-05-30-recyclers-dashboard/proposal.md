## Why

A recyclers association needs a centralized dashboard to monitor collection metrics, track individual recycler performance, and manage relationships with waste producers (restaurants and households). Currently there is no unified view for the association's leadership to oversee operations. This demo application will showcase the core workflows in a simple, intuitive interface.

## What Changes

- Build a new web application serving as the association's operational dashboard
- Create an **overview dashboard** for the association chief showing aggregated metrics on collected recycled items (totals, trends, category breakdowns)
- Create a **recycler profiles** view to inspect individual recycler stats, activity history, and recent updates
- Create a **producers directory** view listing restaurants and households that generate residues, with volume and status information
- Implement client-side navigation between the three main views
- Seed the app with demo/mock data so it works standalone without a backend

## Capabilities

### New Capabilities
- `overview-dashboard`: Aggregated metrics view for the association chief — totals, trends, and category breakdowns of collected recyclable items
- `recycler-profiles`: Individual recycler profile pages showing stats, collection history, and recent activity updates
- `producers-directory`: Directory of waste producers (restaurants and households) with volume metrics and status indicators
- `app-shell`: Top-level application shell with navigation, layout, and routing across the three views

### Modified Capabilities
<!-- No existing capabilities to modify — this is a greenfield project. -->

## Impact

- **New codebase**: Entire front-end application created from scratch
- **Dependencies**: Will introduce a front-end framework, a charting library for metrics visualization, and a CSS/component library for rapid UI development
- **No backend required**: Demo data will be embedded/mocked in the client
- **Deployment**: Static site — can be served from any static host
