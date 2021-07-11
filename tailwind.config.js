const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', ...defaultTheme.fontFamily.sans],
        'headline': ['"Montserrat Alternates"', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'fade-in': '600ms ease-in forwards fade-in'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    },
  },
  variants: {
    animation: ['motion-safe']
  },
  plugins: [],
}
