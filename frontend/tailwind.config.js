/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0F",
        surface: "#131319",
        surface2: "#1A1A22",
        line: "#26262F",
        ink: "#F3F3F6",
        muted: "#8B8B99",
        violet: {
          DEFAULT: "#7C5CFF",
          soft: "#9D85FF",
          dim: "#5439C9",
        },
        mint: "#3FE6C4",
        amber: "#FFB454",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 20px 60px -15px rgba(124,92,255,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
