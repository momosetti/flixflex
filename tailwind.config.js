/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffefef",
          100: "#fedbdb",
          200: "#febfbf",
          300: "#fd9393",
          400: "#fa6060",
          500: "#f63b3b",
          600: "#eb2525",
          700: "#d81d1d",
          800: "#af1e1e",
          900: "#8a1e1e",
        },
      },
    },
  },
  plugins: [],
};
