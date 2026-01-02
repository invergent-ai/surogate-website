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

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Key Components

### Header
- Sticky navigation with smooth scrolling
- Theme toggle (dark/light mode)
- Mobile responsive menu
- Logo and navigation links

### Hero
- Eye-catching hero section with gradient effects
- Feature highlight card
- Call-to-action buttons
- Technology badges

### Features
- Grid layout of framework features
- Icon-based feature cards
- Responsive design

### Recipes
- Training recipe showcase
- BF16, FP8, and NVFP4 options
- Performance categorization

### Quickstart
- Installation instructions
- Configuration examples
- Code snippets with syntax highlighting

### Hardware
- GPU architecture support
- Hardware requirements
- Links to documentation

## Theme System

The site supports dark and light themes with automatic persistence:
- Theme preference saved to localStorage
- Smooth transitions between themes
- Theme-aware logo display
- Custom color overrides for light theme

## Deployment

The built application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions workflow
- **Other**: Upload `dist/` folder contents

## Customization

### Updating Colors

Edit [tailwind.config.js](tailwind.config.js) to modify the color scheme.

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to [App.jsx](src/App.jsx)
3. Update navigation links in [Header.jsx](src/components/Header.jsx)

### Modifying Styles

Global styles are in [src/index.css](src/index.css). Component-specific styles use Tailwind utility classes.

## License

Apache-2.0
