/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          accent: '#ff8264',
          accentLight: '#fff5f2',
        }
      }
    }
  },
  plugins: [],
}
