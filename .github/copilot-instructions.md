# Copilot Instructions

## Project

React 19 single-page application built with Vite 8 and Tailwind CSS 4. The app is an Indonesian BNSP photography certification LSP prototype migrated from `lsp-template/`.

## Commands

- Install: `npm install`
- Development server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Lint application source: `npm run lint`

There is no test runner or test script in the repository.

## Source Architecture

- `src/main.jsx` mounts `App.jsx` in React `StrictMode`.
- `src/App.jsx` owns routing, public pages, authentication screens, and the dashboard prototype. Routes use URL hashes: `/`, `/tentang`, `/skema`, `/alur`, `/tuk`, `/asesor`, `/jadwal`, `/verifikasi`, `/berita`, `/kontak`, `/login`, `/register`, and `/dashboard`.
- `src/data.js` contains seed data used until Laravel endpoints replace it. Every seed-data block is preceded by `// DUMMY DATA`.
- `src/api.js` is the Laravel API boundary. `apiRequest` reads `VITE_LARAVEL_API_URL` and `VITE_USE_MOCK_API`.
- `src/index.css` initializes Tailwind CSS 4 and project theme tokens; use utility classes in JSX rather than creating parallel component CSS.
- `lsp-template/` is the reference implementation. It is not application source and is excluded from ESLint.

## Tailwind and UI Conventions

The active palette is defined with Tailwind theme tokens in `src/index.css`:

- `navy`, `navy-deep`
- `blue-lsp`, `sky-lsp`, `amber-lsp`
- `ice-lsp`, `surface-lsp`, `border-lsp`, `muted-lsp`

Keep the indigo/blue/amber visual system, large rounded cards, and Jakarta Sans typography. Public navigation and repeated page chrome should remain in `App.jsx` instead of introducing a component framework.

Responsive behavior uses Tailwind breakpoints; primary desktop content uses a `1180px` maximum width. Avoid generic gradient-heavy or violet styling.

## Laravel Integration

Copy `.env.example` to `.env` when configuring the backend.

- `VITE_LARAVEL_API_URL` - Laravel API base URL, default `http://127.0.0.1:8000/api`.
- `VITE_USE_MOCK_API=true` - keep the prototype independent of the backend.
- Set `VITE_USE_MOCK_API=false` when Laravel API calls should be executed.

Replace data imports from `src/data.js` with API state or hooks as endpoints become available. Add Bearer-token handling and API response normalization in `src/api.js` rather than scattering fetch logic through components.

## Dummy Data

Do not present prototype names, prices, statistics, testimonials, licenses, contact details, or application statuses as backend-verified facts. Preserve `DUMMY DATA` comments next to placeholder blocks so future sessions can identify values to replace.
