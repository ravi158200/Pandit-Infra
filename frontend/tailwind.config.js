/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',      // Slate 900 (Deep modern steel background)
          cardDark: '#1e293b',  // Slate 800 (Card background in dark mode)
          navy: '#1e3a8a',      // Blue 900
          blue: '#3b82f6',      // Blue 500 (Primary branding blue)
          orange: '#ea580c',    // Orange 600 (Primary accent, heavy industry vibe)
          yellow: '#fbbf24',    // Amber 400 (Secondary accent, warning/safety gold)
          light: '#f8fafc',     // Slate 50 (Off-white background)
          border: '#e2e8f0',    // Slate 200
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
