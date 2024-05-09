/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-gray": "#D9D9D9", 
        "light-gray": "#E2E2E2",
        "blue":"#0065ef",
        "light-blue":"#64ABFF",
        "dark-blue":"#013b8a",
        "light-blue":"#DDEBFF",

        "sidebar-white":"#616364",
        "sidebar-dark-blue":"#002b65",
        "sidebar-light-blue":"#2b486c"
      },
    },
  },
  plugins: [],
};
