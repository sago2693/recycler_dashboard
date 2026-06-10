## 1. Project Setup

- [x] 1.1 Scaffold React + TypeScript project with Vite (`npm create vite@latest`)
- [x] 1.2 Install core dependencies: react-router-dom, recharts, tailwindcss, and shadcn/ui CLI
- [x] 1.3 Configure Tailwind CSS and initialize shadcn/ui with a clean theme
- [x] 1.4 Set up project folder structure: `src/components/`, `src/pages/`, `src/data/`, `src/lib/`

## 2. Mock Data

- [x] 2.1 Create recyclers mock data module (`src/data/recyclers.ts`) with 8–10 recycler entries including id, name, status, total items, total weight, monthly history, and recent activity
- [x] 2.2 Create producers mock data module (`src/data/producers.ts`) with 10–12 producer entries including id, name, type (restaurant/household), address, status, monthly volume, material types, and assigned recycler
- [x] 2.3 Create aggregated metrics mock data module (`src/data/metrics.ts`) with totals, monthly trends (12 months), and category breakdowns

## 3. App Shell & Navigation

- [x] 3.1 Create the root layout component with a persistent sidebar containing nav links for Dashboard, Recyclers, and Producers, plus the association name/logo
- [x] 3.2 Configure React Router with routes for `/` (redirect to dashboard), `/dashboard`, `/recyclers`, `/recyclers/:id`, and `/producers`
- [x] 3.3 Implement active route highlighting on the sidebar navigation links

## 4. Overview Dashboard Page

- [x] 4.1 Build metric summary cards (total items collected, total weight, active recyclers count)
- [x] 4.2 Build monthly collection trends line chart using Recharts
- [x] 4.3 Build material category breakdown chart (pie or bar chart)
- [x] 4.4 Build top 5 recyclers summary table

## 5. Recycler Profiles Pages

- [x] 5.1 Build recyclers list page with table showing name, status badge, and total items collected
- [x] 5.2 Build recycler detail/profile page with stat cards (total items, total weight, active months)
- [x] 5.3 Add monthly collections bar chart to recycler profile page
- [x] 5.4 Add recent activity feed/timeline showing last 10 collection entries with date, items, category, and location

## 6. Producers Directory Page

- [x] 6.1 Build producers list page with table showing name, type, total residues, and color-coded status badge
- [x] 6.2 Add type filter controls (All / Restaurants / Households) to the producers list
- [x] 6.3 Build producer detail view showing name, address, type, monthly volume, material types, and assigned recycler

## 7. Polish & Verification

- [x] 7.1 Verify all routes work correctly and default route redirects to dashboard
- [x] 7.2 Ensure responsive layout works on common screen sizes
- [x] 7.3 Run build (`npm run build`) and confirm no errors
