module.exports = {
  tabWidth: 2,
  bracketSameLine: true,
  printWidth: 200,
  singleQuote: true,
  tailwindConfig: './tailwind.config.cjs',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
