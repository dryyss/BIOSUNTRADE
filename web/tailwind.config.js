/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // vert pomme du logo
          green: "#66BB2E",
          // jaune orangé du logo
          yellow: "#F5A623",
          // noir de fond
          black: "#111315",
          // blanc pour contrastes
          white: "#FFFFFF",
          // vert plus sombre pour hover
          greenDark: "#2E7D32",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};


