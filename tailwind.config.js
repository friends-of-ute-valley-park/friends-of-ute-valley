const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        orange: colors.orange
      }
    }
  },
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
