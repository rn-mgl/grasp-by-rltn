/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "pr-blk": "#0D0D0D",
        "pr-wht": "#F2F2F2",
        "pr-gry": "#E1E6E2",
        "pr-grn": "#45C4B0",
        "pr-blu": "#13678A",
        "pr-ylw": "#B5EBB5",
        "pr-red": "#F54B50",
        "pr-orng": "#F2AA52",
        "pr-vlt": "#D0ADFF",
        "pr-pnk": "#F291D0",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serf"],
        Work: ["Work Sans", "sans-serif"],
      },
      dropShadow: {
        "custom-shadow": "0 0.3rem 0.3rem rgb(0, 0, 0, 0.3)",
      },
      gradientColorStops: {
        "green-gradient": "linear-gradient(to bottom-right, #012030, #45C4B0, #DAFDBA)",
      },
      screens: {
        "mobile-s": "320px",
        "mobile-m": "375px",
        "mobile-l": "425px",
        tablet: "768px",
        "laptop-s": "1024px",
        "laptop-l": "1440px",
        "4k": "2560px",
      },
    },
  },
  plugins: [],
};
