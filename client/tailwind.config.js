import utils from "./src/helpers/utils";

/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@sira-ui/tailwind")({
      themes: [
        {
          name: "dark",
          colorScheme: "dark",
          prefersColorScheme: false,
          colors: {
            primary: "#634673",
            secondary: "#583533",
          },
        },
      ],
    }),
  ],
};
