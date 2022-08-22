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
      zIndex: {
        100: "100",
      },
      backgroundOpacity: {
        99: "0.99",
      },
      minWidth: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
      maxWidth: {
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
      screens: {
        "lt-sm": { max: "639px" },
        "lt-md": { max: "767px" },
        "lt-lg": { max: "1023px" },
        "lt-xl": { max: "1279px" },
        "lt-2xl": { max: "1535px" },
        "lt-4xl": { max: "2159px" },
        "gt-sm": { min: "640px" },
        "gt-md": { min: "768px" },
        "gt-lg": { min: "1024px" },
        "gt-xl": { min: "1280px" },
        "gt-2xl": { min: "1536px" },
        "gt-4xl": { min: "2160px" },
        sm: { min: "640px", max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
        "2xl": { min: "1536px", max: "2159px" },
        "4xl": { min: "2160px", max: "9999px" },
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
        fadeOutDown: {
          "0%": {
            "transform-origin": "left center",
            overflow: "hidden",
            opacity: 0,
            height: 0,
          },
          "100%": {
            "transform-origin": "left center",
            overflow: "hidden",
            height: "100%",
            opacity: "100%",
          },
        },
        test: {
          "0%": {
            "transform-origin": "top",
            transform: "scaleY(0)",
            height: 0,
          },
          "100%": {
            "transform-origin": "top",
            transform: "scaleY(1)",
            height: "auto",
          },
        },
      },
      animation: {
        "hover-sized": "sized 0.15s ease-out",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeOutDown: "fadeOutDown 500ms ease-out 1",
        testIn: "test 500ms ease 1 reverse",
        testOut: "test 500ms ease 1 reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
