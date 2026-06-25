# StockSync

> **StockSync** is a modern multi-branch inventory management application built with React and a modern frontend stack. It provides an organized, responsive interface for managing products, branches, sales, and reporting across multiple store locations, with full Arabic (RTL) support and offline-first local storage.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

StockSync is designed as a complete inventory operations dashboard for retail chains operating across multiple branches. It demonstrates a clean, scalable frontend architecture using a normalized local data layer, predictable state management, and a polished RTL UI suitable for Arabic-speaking markets.

The app ships with a pre-seeded IndexedDB catalog (branches, users, products, stock items, and sales) so the entire dashboard is interactive on first load without any backend setup.

---

## Features

- **Dashboard** — at-a-glance KPIs (total invoices, today's revenue, low-stock count, active branches, active users).
- **Products** — searchable product catalog with SKU, category, brand, pricing, tax rate, and stock availability per branch.
- **Product Detail** — drill-down view per product with stock breakdown.
- **Branches** — manage multiple store locations (Riyadh, Jeddah, Dammam in the demo dataset).
- **Sales** — record and review sales transactions, line items, taxes, and discounts.
- **Reports** — operational reports foundation built on top of the local sales and stock data.
- **Settings** — identity, accounting (VAT, discounts), alerts (low-stock threshold), printing, and sync preferences.
- **Dark Mode** — full dark theme with persistent storage.
- **RTL First** — native Arabic UI (language tag `ar`, Arabic fonts via system stack).
- **Offline First** — fully functional offline using Dexie/IndexedDB; no backend required.

---

## Tech Stack

| Layer            | Technology                                                          |
| ---------------- | ------------------------------------------------------------------- |
| Build Tool       | [Vite 5](https://vitejs.dev/)                                       |
| UI Library       | [React 18](https://react.dev/)                                      |
| Routing          | [React Router DOM v6](https://reactrouter.com/)                     |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + React Redux        |
| Forms            | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) via `@hookform/resolvers` |
| Styling          | [TailwindCSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| Local Database   | [Dexie](https://dexie.org/) (IndexedDB wrapper)                     |
| Linting          | ESLint                                                              |
| Language         | JavaScript (ES Modules)                                             |

---

## Architecture

```
src/
├── components/      # Reusable UI (Sidebar layout)
├── features/        # Feature-scoped UI (Dashboard)
├── pages/           # Route-level components (Products, Sales, Reports, …)
├── store/           # Redux Toolkit slices (products, dashboard, settings)
├── db/              # Dexie database definition + seed data
├── models/          # Entity shape references
├── App.jsx          # Router + shell layout
├── main.jsx         # Entry point
└── index.css        # Tailwind directives + dark-mode overrides
```

- **State**: Redux Toolkit slices with `createAsyncThunk` for async Dexie reads/writes.
- **Persistence**: All entities are stored in IndexedDB via Dexie. `initializeDatabase()` seeds demo data on first run.
- **Routing**: Client-side `BrowserRouter` with a `Navigate` fallback for unknown routes.
- **Theming**: `dark` class toggled on `<html>` based on settings slice; Tailwind `darkMode: 'class'`.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or `pnpm` / `yarn` — adjust commands accordingly)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (default: http://localhost:4173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

On first launch the app automatically seeds the local IndexedDB with sample branches, users, products, stock items, and sales so all pages are immediately interactive.

---

## Available Scripts

| Script             | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server on port `4173`.            |
| `npm run build`    | Produce a production build in `dist/`.               |
| `npm run preview`  | Serve the production build locally for verification. |
| `npm run deploy`   | Publish the `dist/` folder to GitHub Pages (legacy). |

---

## Project Structure

```
.
├── public/                  # Static assets copied as-is to dist/
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── Sidebar.jsx
│   ├── db/
│   │   └── stockSyncDB.js   # Dexie schema + seed data
│   ├── features/
│   │   └── dashboard/
│   │       └── Dashboard.jsx
│   ├── models/
│   │   └── index.js
│   ├── pages/
│   │   ├── Branches.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   ├── Reports.jsx
│   │   ├── Sales.jsx
│   │   └── Settings.jsx
│   ├── store/
│   │   ├── dashboardSlice.js
│   │   ├── productSlice.js
│   │   ├── settingsSlice.js
│   │   └── index.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json              # Vercel deployment config (SPA rewrites + caching)
└── vite.config.js
```

---

## Deployment

### Vercel (recommended)

This repo includes a `vercel.json` that:

- Sets the framework preset to **Vite**.
- Builds with `npm run build` and serves the `dist/` output.
- Adds SPA rewrites so that client-side routes resolve to `index.html` on hard refresh.
- Caches hashed assets under `/assets/` for one year.

To deploy:

1. Push the repo to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the default settings — Vercel auto-detects Vite from `vercel.json`.
4. Click **Deploy**. The dashboard should load with full UI (not a blank page).

### GitHub Pages (legacy)

The repository still ships a `gh-pages` script in `package.json` (`npm run deploy`) for users who prefer GitHub Pages. When targeting GitHub Pages, change `base` in `vite.config.js` back to `/StockSync/` (or your repo name) so assets resolve correctly under the Pages subpath.

---

## Roadmap

- [ ] Replace Dexie/IndexedDB with a real backend API (REST or GraphQL).
- [ ] Authentication & role-based access (admin / manager / staff).
- [ ] Barcode scanner integration for the Sales page.
- [ ] PDF receipt generation using the printing settings.
- [ ] Real-time multi-branch sync queue processing.
- [ ] PWA support with service worker + offline shell.

---

## License

Released under the [MIT License](LICENSE).

---

> Built as a portfolio piece demonstrating production-quality React architecture, state management, and an Arabic-first responsive UI.
