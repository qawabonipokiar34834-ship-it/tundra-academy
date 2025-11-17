/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Эта строка гарантирует, что App.jsx будет прочитан
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
