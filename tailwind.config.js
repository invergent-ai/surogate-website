/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#ffaf10',
          yellow: '#ffe845',
          aubergine: '#2a102d',
          'aubergine-2': '#1a0a1c',
          'aubergine-hover': '#3d1d42',
          wine: '#9b1f61',
          powder: '#bdccd4',
          fog: '#f2f3f5',
          mist: '#fafafa',
          steel: '#8e999f',
          graphite: '#403e4a',
          border: '#e6e3eb',
          line: '#f0eef3',
          cream: '#fff7e6',
          warm: '#f8f6fa',
        },
      },
      backgroundImage: {
        'grad-sun': 'linear-gradient(135deg, #ffaf10 0%, #ffe845 100%)',
        'grad-sun-horiz': 'linear-gradient(90deg, #ffe845 0%, #ffaf10 100%)',
        'grad-wine': 'linear-gradient(135deg, #9b1f61 0%, #2a102d 100%)',
        'grad-dusk': 'linear-gradient(180deg, #2a102d 0%, #1a0a1c 100%)',
        'grad-payoff': 'linear-gradient(180deg, #fff7e6 0%, #ffffff 100%)',
        'evening-glow': 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255, 175, 16, 0.22) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 50% 0%, rgba(155, 31, 97, 0.35) 0%, transparent 55%)',
        'evening-glow-flip': 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255, 175, 16, 0.22) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(155, 31, 97, 0.35) 0%, transparent 55%)',
        'timeline-rail': 'linear-gradient(90deg, transparent 0%, rgba(255, 175, 16, 0.55) 12%, rgba(255, 232, 69, 0.55) 50%, rgba(255, 175, 16, 0.55) 92%, transparent 100%)',
      },
      letterSpacing: {
        'hl-tight': '-0.028em',
        'display': '-0.035em',
        'wider-2': '0.18em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,.07), 0 20px 60px -30px rgba(0,0,0,.65)',
        'sun-glow': '0 0 70px -20px rgba(255, 175, 16, 0.28), 0 0 1px 0 rgba(255, 175, 16, 0.10)',
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.05)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s ease both',
      },
    },
  },
  plugins: [],
}
