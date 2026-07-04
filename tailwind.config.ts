import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- essencial
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // aqui depois você define os tokens semânticos
        // ex: background, foreground, primary, muted, etc.
      },
    },
  },
  plugins: [],
};

export default config;