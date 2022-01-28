module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
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
