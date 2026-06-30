# Surogate Website - React Version

This is a React conversion of the Surogate LLM training framework website, built with Vite, React, Tailwind CSS, and Lucide icons.

## Features

- Modern React components with hooks
- Tailwind CSS for styling
- Lucide React icons
- Dark/Light theme toggle with localStorage persistence
- Responsive mobile menu
- Smooth scrolling navigation
- All original features preserved from the HTML version

## Project Structure

```
surogate-react/
├── public/
│   └── images/          # Logo and favicon assets
├── src/
│   ├── components/
│   │   ├── Header.jsx   # Navigation and theme toggle
│   │   ├── Hero.jsx     # Hero section with feature card
│   │   ├── Features.jsx # Features grid
│   │   ├── Recipes.jsx  # Training recipes section
│   │   ├── Quickstart.jsx # Installation and quickstart
│   │   ├── Hardware.jsx # Hardware requirements
│   │   └── Footer.jsx   # Footer section
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles and Tailwind
│   └── main.jsx         # Entry point
├── index.html           # HTML template
└── tailwind.config.js   # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd surogate-react
```

2. Install dependencies (if not already done):
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at http://localhost:5173/

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Analytics

The site runs two analytics tools in parallel:

- **Google Analytics 4** (`G-QDJWS8ZM50`) — loaded via `next/script` in `app/layout.jsx`.
- **PostHog** — product analytics + session replay, sending to the **same project as
  the surogate-ops app** so anonymous marketing visitors stitch into one cross-domain
  funnel through to signup/login.

PostHog is initialised client-side in `components/PostHogProvider.jsx` (mounted in the
root layout) using the config in `lib/analytics.js`: autocapture, history-change
pageviews, session replay, and exception capture — mirroring the surogate-ops setup.

Hand-placed conversion events are emitted from CTAs via `components/TrackedLink.jsx`
(or the `track()` helper in already-client components):

| Event                       | Where                                              |
| --------------------------- | -------------------------------------------------- |
| `cta_signin_clicked`        | Hero "Sign in", nav (mobile) "Sign in"             |
| `cta_signup_clicked`        | Home CTA, pricing "Start free"                     |
| `github_star_clicked`       | Hero "Give us a Star"                              |
| `pricing_plan_selected`     | Pricing plan cards (`{ plan, billing }`)           |
| `pricing_pick_plan_clicked` | Pricing CTA "Pick a plan"                          |
| `contact_sales_clicked`     | Enterprise card, pricing "Talk to a human"         |
| `nav_link_clicked`          | Primary nav links (`{ label, location }`)          |
| `footer_link_clicked`       | Footer links (`{ label, section }`)                |

Defaults point at the shared EU-cloud project; override per environment with
`NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` (see `.env.example`). The project
token is write-only and safe to ship in the static bundle. Because the site is a static
export (`output: 'export'`), there is no server to reverse-proxy ingestion — events go
directly to PostHog cloud, exactly like the app.

## License

Apache-2.0
