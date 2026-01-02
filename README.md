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

## License

Apache-2.0
