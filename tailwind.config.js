const tailwindcss = require('tailwindcss')
const theme = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./**/*.njk'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    colors: {
      bg: {
        DEFAULT: 'var(--ud-background-color)',
        dark: 'var(--ud-background-color-dark)',
      },
      text: 'var(--ud-text-color)',
      accent: 'var(--ud-accent-color)',
      primary: {
        light: 'var(--ud-primary-color-light)',
        DEFAULT: 'var(--ud-primary-color)',
        dark: 'var(--ud-primary-color-dark)',
      },
      secondary: {
        DEFAULT: 'var(--ud-secondary-color)',
        dark: 'var(--ud-secondary-color-dark)',
      },
    },
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            h2: {
              color: theme('colors.text')
            },
            a: {
              color: theme('colors.primary'),
              '&:visited': {
                color: theme('colors.primary.light')
              }
            }
          }
        }
      }),
    },
  },
  variants: {
    animation: ['motion-safe'],
    extend:  {
      textColor: ['visited']
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
