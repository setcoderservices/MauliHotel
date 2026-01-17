export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D32F2F",
        accent: "#FF6F00",
        background: "#F9F6F1",
        textDark: "#333333",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        rozha: ["Rozha One", "serif"],
        cinzel: ["Cinzel", "serif"],
        vibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
