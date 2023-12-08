import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        xxs: "4px",
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "64px",
      },
      fontSize: {
        m: "16px",
        l: "18px",
        xl: "24px",
        xxl: "32px",
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
      colors: {
        primary1: "#FE8C5C",
        primary2: "#DFC8FF",
        primary3: "#94E7EC",
        primary4: "#FFBFC0",
        secondary: "#745659",
        dark: "#4B2520",
        pastel1: "#FFF8EB",
        pastel2: "#FEEBC7",
        pastel3: "#E9D1BF",
      },
    },
  },
  plugins: [],
};
export default config;
