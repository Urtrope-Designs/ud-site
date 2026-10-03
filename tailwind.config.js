const tailwindcss = require('tailwindcss')
const theme = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './*.{njk,md,html}',
    './{_includes,about,feed,projects,work}/**/*.{njk,md,html}',
  ],
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
            // The plugin's defaults are dark grays meant for light backgrounds;
            // point them all at the site palette. `colors.primary` is an object
            // (light/DEFAULT/dark), so reference `.DEFAULT` explicitly.
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-lead': theme('colors.text'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-counters': theme('colors.secondary.DEFAULT'),
            '--tw-prose-bullets': theme('colors.secondary.DEFAULT'),
            '--tw-prose-hr': theme('colors.secondary.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text'),
            '--tw-prose-quote-borders': theme('colors.secondary.DEFAULT'),
            '--tw-prose-captions': theme('colors.secondary.DEFAULT'),
            '--tw-prose-code': theme('colors.text'),
            '--tw-prose-th-borders': theme('colors.secondary.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.secondary.DEFAULT'),
            a: {
              '&:visited': {
                color: theme('colors.primary.light')
              }
            }
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
