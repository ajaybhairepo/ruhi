/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors mapped from your CSS variables
        ink: "var(--ink)",
        deep: "var(--deep)",
        cream: "var(--cream)",
        paper: "var(--paper)",
        line: "var(--line)",
        muted: "var(--muted)",
        lime: "var(--lime)",
        orange: "var(--orange)",
        white: "var(--white)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
