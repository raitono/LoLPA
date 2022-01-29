const colors = require('tailwindcss/colors');

const nord = {
  nord0: '#2E3440',
  nord1: '#3B4252',
  nord2: '#434C5E',
  nord3: '#4C566A',
  nord4: '#D8DEE9',
  nord5: '#E5E9F0',
  nord6: '#ECEFF4',
  nord7: '#8FBCBB',
  nord8: '#88C0D0',
  nord9: '#81A1C1',
  nord10: '#5E81AC',
  nord11: '#BF616A',
  nord12: '#D08770',
  nord13: '#EBCB8B',
  nord14: '#A3BE8C',
  nord15: '#B48EAD',
};

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        success: colors.green,
        error: colors.red,
        background: {
          default: nord.nord0,
        },
        'on-background': {
          default: nord.nord6,
          muted: nord.nord4,
        },
        surface: {
          default: nord.nord1,
        },
        'on-surface': {
          default: nord.nord6,
        },
        foreground: {
          default: nord.nord2,
        },
        'on-foreground': {
          default: nord.nord6,
        },
        attention: {
          primary: nord.nord7,
          secondary: nord.nord8,
          tertiary: nord.nord9,
          quarternary: nord.nord10,
        },
      },
      gridTemplateRows: {
        'team-info': 'minmax(0, 2fr) repeat(5, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwind-nord'),
  ],
};
