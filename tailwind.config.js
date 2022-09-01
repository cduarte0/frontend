/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      body: ['Inter', 'sans-serif']
    },
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    maxWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    colors: {
      primary: {
        default: '#3e64ff',
        hover: '#3251cf',
        disable: '#7b95ff'
      },
      secondary: {
        default: '#B1B4CE',
        dark: '#9CA3AF'
      },
      tertiary: '#F7F8FC',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      warning: '#FEB63F',
      danger: {
        default: '#EB1875',
        disable: '#ff7eb7'
      },
      dark: '#3C4458',
      gray: '#e2e8f0',
      success: {
        default: '#0BD455',
        disable: '#33c76994'
      },
      hazy: '#f3f3f7',
      zumthor: '#E0E7FF',
      info: '#32CECD',
      purple: '#64379f',
      darkorange: '#ff8c00'
    },
    extend: {
      fill: (theme) => ({
        success: theme('colors.success'),
        secondary: theme('colors.secondary'),
        white: theme('colors.white'),
        primary: theme('colors.primary'),
        danger: theme('colors.danger'),
        warning: theme('colors.warning'),
        purple: theme('colors.purple'),
        info: theme('colors.info')
      }),
      screens: {
        xxl: '1600px'
      },
      boxShadow: {
        default: '0 0 0.6rem rgba(159,181,226, 0.3)'
      },
      backgroundColor: {
        body: '#f4f4fb',
        tab: '#f9f9fd',
        'smoke-2': 'rgba(0, 0, 0, 0.2)'
      },
      borderRadius: (theme) => ({
        xl: theme('spacing.6')
      }),
      borderColor: (theme) => ({
        ...theme('colors')
      }),
      inset: {
        '-60': '-3.75rem',
        '4': '1rem'
      },
      spacing: {
        '13': '3.25rem',
        tiny: '0.125rem',
        '7': '1.75rem',
        '28': '6.75rem',
        '36': '9rem'
      },
      padding: (theme) => theme('spacing')
    }
  },
  variants: {
    borderWidth: ['responsive', 'first', 'hover', 'focus', 'last'],
    borderRadius: ['responsive', 'first', 'hover', 'focus', 'last']
  },
  plugins: [require('@tailwindcss/ui')],
  purge: false
}
