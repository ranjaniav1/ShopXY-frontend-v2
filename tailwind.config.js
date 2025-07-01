/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      colors: {
        body: "var(--body)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tsecondary: "var(--t-secondary)",
        tprimary:"var(--t-primary)",
        tactive:"var(--t-active)"
      },
    },
  },
  plugins: []
};
