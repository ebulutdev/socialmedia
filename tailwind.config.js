/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#10B981',
          'green-dark': '#059669',
          'green-light': '#34D399',
        },
        dark: {
          bg: '#1A1A1A',
          card: '#2A2A2A',
          'card-light': '#3A3A3A',
        },
      },
    },
  },
  plugins: [],
}
