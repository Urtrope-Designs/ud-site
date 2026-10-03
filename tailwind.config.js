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
      muted: 'var(--ud-text-muted-color)',
      divider: 'var(--ud-divider-color)',
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
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'headline': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // The plugin's defaults are dark grays meant for light backgrounds;
            // point them all at the site palette. `colors.primary` is an object
            // (light/DEFAULT/dark), so reference `.DEFAULT` explicitly.
            // Size and leading inherit from <body> (16px, 18px on laptop+, at 1.6).
            fontSize: '1em',
            lineHeight: '1.6',
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-lead': theme('colors.text'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-counters': theme('colors.secondary.DEFAULT'),
            '--tw-prose-bullets': theme('colors.secondary.DEFAULT'),
            '--tw-prose-hr': theme('colors.secondary.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text'),
            '--tw-prose-quote-borders': theme('colors.secondary.DEFAULT'),
            '--tw-prose-captions': theme('colors.muted'),
            '--tw-prose-code': theme('colors.text'),
            '--tw-prose-th-borders': theme('colors.secondary.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.secondary.DEFAULT'),
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.headline').join(', '),
            },
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
