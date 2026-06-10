## Context

This is a greenfield web application for a recyclers association. The association chief needs visibility into collection operations, individual recycler performance, and producer relationships. The app is a demo — it must look polished, load fast, and work without a backend.

There is no existing codebase. The project starts from an empty repository.

## Goals / Non-Goals

**Goals:**
- Deliver a clean, intuitive single-page application with three main views
- Use modern tooling that enables rapid development and a polished result
- Embed realistic mock data so the demo is self-contained
- Keep the architecture simple — no over-engineering for a demo

**Non-Goals:**
- Real backend or database integration
- User authentication or role-based access control
- Real-time data updates or WebSocket connections
- Mobile-native app (responsive web is sufficient)
- Internationalization / localization

## Decisions

### 1. Framework: React with Vite

**Choice:** React 18+ bootstrapped with Vite.
**Rationale:** Vite gives instant dev server startup and fast builds. React has the largest ecosystem of charting and UI component libraries. For a demo, developer velocity matters most.
**Alternatives considered:**
- Vue/Nuxt — viable, but smaller ecosystem of chart libraries
- Next.js — SSR overhead unnecessary for a static demo app
- Plain HTML/JS — too slow to build a polished multi-view dashboard

### 2. UI Library: Tailwind CSS + shadcn/ui

**Choice:** Tailwind CSS for utility styling, shadcn/ui for pre-built components (cards, tables, badges).
**Rationale:** shadcn/ui components are copy-pasted into the project (no runtime dependency), look professional out of the box, and are highly customizable. Tailwind avoids writing custom CSS.
**Alternatives considered:**
- Material UI — heavier bundle, opinionated design
- Chakra UI — good but less polished dashboard aesthetics
- Bootstrap — dated look for modern dashboards

### 3. Charts: Recharts

**Choice:** Recharts for data visualization.
**Rationale:** Built on D3, but provides React-friendly declarative API. Good defaults for bar charts, line charts, and pie charts needed by the overview dashboard.
**Alternatives considered:**
- Chart.js (react-chartjs-2) — imperative API, less React-idiomatic
- Nivo — beautiful but heavier

### 4. Routing: React Router v6

**Choice:** React Router v6 for client-side navigation.
**Rationale:** Industry standard for React SPAs. Supports nested routes and layout routes cleanly.

### 5. Mock Data: Static JSON modules

**Choice:** Co-locate mock data as TypeScript modules in a `data/` directory.
**Rationale:** Simple imports, full type safety, no async loading complexity. Easy to replace with API calls later if needed.

### 6. Project Structure

```
src/
  components/       # Shared UI components
  pages/
    Dashboard/      # Overview dashboard (chief's view)
    Recyclers/      # Recycler list + profile detail
    Producers/      # Producers directory
  data/             # Mock data modules
  lib/              # Utilities
  App.tsx           # Root with router
  main.tsx          # Entry point
```

## Risks / Trade-offs

- **[Mock data staleness]** → Demo data is static; acceptable for a demo. Structure data modules so they can be swapped for API calls later.
- **[No persistence]** → Any "updates" shown are read-only views of mock data. If interactive features are needed later, would need state management (e.g., Zustand).
- **[Bundle size]** → Recharts + shadcn adds weight. Acceptable for a dashboard demo; could lazy-load chart components if needed.
