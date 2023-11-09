module.exports = {
  tabWidth: 2,
  bracketSameLine: true,
  printWidth: 200,
  singleQuote: true,
  tailwindConfig: "./tailwind.config.cjs",
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
  overrides: [
    {
      files: ["**/*.astro"],
      options: {
        parser: "astro",
      },
    },
  ],
};
