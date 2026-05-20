/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper:   { DEFAULT: '#fcfcfc', 2: '#f7f7f6' },
        surface: { DEFAULT: '#f1f1ef', 2: '#e8e8e5' },
        ink:     { DEFAULT: '#0a0a0a', soft: '#2a2a2a', quiet: '#5e5e5b', faint: '#9a9a96' },
        rule:    { DEFAULT: '#e3e3e0', strong: '#c9c9c4' },
        accent:  { DEFAULT: '#2649c4' },
        signal:  { DEFAULT: '#15803d' },
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.022em',
        tighter3: '-0.035em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
