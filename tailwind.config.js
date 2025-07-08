/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e2e4d',      // Indigo foncé
        secondary: '#6c757d',    // Gris moyen
        success: '#00d994',      // Vert vif
        info: '#6cb2eb',         // Bleu clair
        warning: '#fcc421',      // Jaune
        danger: '#e0525d',       // Rouge
        light: '#f8f9fa',        // Gris très clair
        dark: '#343a40',         // Gris foncé

        blue: '#3490dc',
        indigo: '#2e2e4d',
        purple: '#9561e2',
        pink: '#f66d9b',
        red: '#e0525d',
        orange: '#f6993f',
        yellow: '#fcc421',
        green: '#00d994',
        teal: '#4dc0b5',
        cyan: '#6cb2eb',
        white: '#ffffff',
        gray: '#6c757d',
        'gray-dark': '#343a40',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
