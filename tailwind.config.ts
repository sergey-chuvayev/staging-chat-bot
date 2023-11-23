import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "64px",
      },
      p: {
        xxs: "4px",
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "64px",
      },
      m: {
        xxs: "4px",
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "64px",
      },
      body: {
        l: "18px",
        m: "16px",
        s: "14px",
      },
      rounded: {
        s: "4px",
        m: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
