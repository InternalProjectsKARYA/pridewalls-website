# Pridewalls Real Estate Website

A production-focused real estate web application for showcasing Pridewalls residential projects (apartments, plots, and villas), highlighting amenities, location advantages, and collecting customer enquiries.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Build and Deployment](#build-and-deployment)
- [Known Gaps](#known-gaps)
- [Contributing](#contributing)

## Overview

This repository contains the Pridewalls marketing and project-discovery website built with Next.js App Router.

The application includes:
- A branded landing page with company highlights and CTAs
- A completed projects page
- Dynamic project detail pages by slug
- Project amenities, facilities, floor plans, site layout, and location highlights
- A contact/enquiry form UI with client-side validation

## Key Features

- Dynamic project pages using `src/app/projects/[slug]/page.tsx`
- Reusable UI components for project sections
- Rich static asset support via `public/` (images, master plans, logos)
- Framer Motion animations for interactive sections
- Form handling using `react-hook-form`
- Tailwind CSS v4 styling with utility-first approach

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript + React 19
- Styling: Tailwind CSS v4, `tailwindcss-animate`
- UI primitives: shadcn-style components + Radix patterns
- Animation: Framer Motion
- Forms: React Hook Form
- Icons: Lucide React
- Linting: ESLint

## Project Structure

```text
.
|-- public/                      # Static assets (images, logos, plans)
|-- src/
|   |-- app/
|   |   |-- page.tsx             # Landing page
|   |   |-- Completed/page.tsx   # Completed projects listing
|   |   \-- projects/[slug]/page.tsx  # Dynamic project detail route
|   |-- components/
|   |   |-- common/              # Shared project/feature components
|   |   |-- landingpage/         # Home page sections
|   |   \-- ui/                  # Reusable UI primitives
|   |-- hooks/                   # Custom React hooks
|   \-- lib/
|       |-- project-data.tsx     # Core app content/data source
|       |-- project-interface.ts # Type definitions
|       \-- utils.ts             # Utilities
|-- package.json
\-- README.md
```

## Routing

- `/` -> Main landing page
- `/Completed` -> Completed projects grid
- `/projects/[slug]` -> Project detail page

Current slugs defined in data:
- `Completed-Apartment`
- `premimum-plots`
- `premimum-villas`

## Data Model

Project and company content is currently managed in:
- `src/lib/project-data.tsx`

This includes:
- Project metadata (name, type, status, location)
- Media (cover image, galleries, layout images)
- Amenities, facilities, and highlights
- Pricing and area ranges
- Company profile, stats, and contact info

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev    # Start local development server
npm run build  # Create production build
npm run start  # Run production server
npm run lint   # Run ESLint checks
```

## Build and Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploy

You can deploy on any Node.js hosting platform that supports Next.js. Vercel is the simplest default option for App Router projects.

## Known Gaps

- `ContactForm` posts to `/api/enquiry`, but no API route is currently present in `src/app/api/`.
- Some project content appears to be placeholder/mixed content and may need final business copy review.
- Certain text entries include encoding artifacts that should be normalized to UTF-8 clean content.

## Contributing

1. Create a feature branch.
2. Make focused, testable changes.
3. Run lint/build checks locally.
4. Open a pull request with a clear summary and screenshots for UI changes.

---

For content updates, start with `src/lib/project-data.tsx` and related components in `src/components/common/`.
