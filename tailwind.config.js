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
      boxShadow: {
        xs: "0 0 3px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        sized: {
          "0%": {
            transform: "scale(0.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "hover-sized": "sized 0.15s ease-out",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
