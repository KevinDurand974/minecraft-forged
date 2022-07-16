/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        primary: "#36393f",
        secondary: "#2f3136",
        "s-alt": "#292b2f",
        tertiary: "#202225",
        "t-alt": "#292b2f",
        normal: "#dcddde",
        muted: "#a3a6aa",
        accent: "#de9454",
      },
      fontSize: {
        "6.5xl": ["4rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
