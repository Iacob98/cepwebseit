# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server (port 3030)
npm run lint         # ESLint (next core-web-vitals + typescript)
npx tsx scripts/seed-content.ts        # Seed content/ JSON files from hardcoded data
npx tsx scripts/generate-password-hash.ts  # Generate bcrypt hash for ADMIN_PASSWORD_HASH
```

No test framework is configured. Playwright is installed as a devDependency but no test files exist.

## Architecture

**Next.js 16 App Router** site for Arvernus GmbH (German heat pump & solar company). German-language UI throughout.

### Data Layer — JSON Files, No Database

All content lives as JSON files in `/content/`. The DAL (`src/lib/dal.ts`) provides `readJSON<T>/writeJSON` with atomic writes (tmp→rename). Every getter has a **hardcoded fallback** from `src/data/` or `src/lib/constants.ts`, so the site works with an empty content directory.

Content files: `company.json`, `hero-slides.json`, `testimonials.json`, `projects.json`, `faq.json`, `partners.json`, `team.json`, `timeline.json`, `articles.json`, `services.json`, `pages.json`, `contact-submissions.json`, `rechner-submissions.json`.

### Route Groups

- **`(marketing)/`** — Public pages with Header/Footer/MobileBottomBar/WhatsApp/CookieConsent. Server Components fetch data via DAL.
- **`(legal)/`** — Impressum/Datenschutz with minimal layout (no mobile bar).
- **`(admin)/admin/`** — Full CMS with CRUD for all content entities. Protected by middleware.

### Page Text Editing System

`pages.json` stores per-page section overrides keyed as `pages[slug][section][field]`. Pages call `getPageContent("slug")` and use a `t(section, field, fallback)` helper to read stored text or fall back to hardcoded defaults. Admin edits via `updatePageAction` which parses FormData keys like `hero.title`.

### Authentication

Single-admin password auth: bcrypt-verified password → JWT (jose, HS256, 24h) → `admin-token` httpOnly cookie. Middleware (`src/middleware.ts`) protects all `/admin/*` routes except `/admin/login`.

### Server Actions Pattern

All actions in `src/actions/` follow: validate with Zod → read current JSON via DAL → mutate → write JSON → `revalidatePath("/", "layout")` → redirect or return state. Admin actions use `FormData`; public actions accept typed objects.

Image uploads go to `public/uploads/` (max 10MB, JPEG/PNG/WebP).

### Components

- `src/components/layout/` — Header, Footer, MobileNav, MobileBottomBar, WhatsApp, CookieConsent, GTM
- `src/components/admin/` — AdminSidebar, AdminHeader, AdminForm, AdminImageUpload, DeleteConfirmDialog
- `src/components/sections/` — Page-specific sections (home, rechner steps, contact)
- `src/components/shared/` — Reusable across pages (CTABanner, PartnersSection, FAQAccordion, etc.)
- `src/components/ui/` — Primitives (Button, Card, Input, Select, Badge, ScrollReveal, etc.)

### Key Conventions

- Path alias: `@/*` maps to `./src/*`
- Tailwind CSS 4 (CSS-native `@import "tailwindcss"`) with CSS custom properties in `globals.css`
- Design tokens: `--primary: #1a7ab5`, `--secondary: #e8a020`, `--accent: #e8a020`
- Server Components by default; `"use client"` only for interactive pieces (forms, nav, animations, consent)
- Zod 4 for both content schemas (`dal-schemas.ts`) and form validation (`schemas.ts`)
- Featured partners: max 4 allowed, enforced in partner actions
- Multi-step rechner form: 5 steps with per-step Zod validation via `useMultiStepForm` hook
- Cookie-gated GTM: loads only after explicit cookie consent via custom DOM event
- Email notifications via nodemailer (silently skips if SMTP env vars missing)

### Environment Variables

`ADMIN_PASSWORD_HASH`, `JWT_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `NOTIFY_EMAIL`, `NEXT_PUBLIC_GTM_ID`
