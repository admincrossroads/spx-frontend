/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
  colors: {
    spiral: {
      deep: "#0A3C78",
      bright: "#2B7FFF",
      gold: "#F4A300",
      sand: "#F8EFD9",
    },
    slateText: "#1A1A1A",
    graphite: "#6B6B6B",
    mist: "#F4F5F7",
    teal: "#0FA3B1",
    coral: "#F25F5C",
    royal: "#7353BA",
    emerald: "#1FA774",
  },
  borderRadius: {
    lg: "0.75rem",
    xl: "1rem",
  },
},

  },
  plugins: [],
};
