/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#E3B577",

          "secondary": "#ECEAE3",

          "accent": "#331A15",

          "neutral": "#1B1A1A",

          "base-100": "#ffffff",

          "info": "#3abff8",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
         
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee-secondary': '#ECEAE3',
      },
    },
  },
  plugins: [require("daisyui")],
}

