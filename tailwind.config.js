/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors:{
        primary: '#14a077',
        secondary: '#123841',
        customGray: "#64666C"
      }
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { min: "1450px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },
  },
  plugins: [],
};