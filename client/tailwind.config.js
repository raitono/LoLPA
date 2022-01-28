module.exports = {
  content: [
    './public/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/index.{js,jsx,tsx}',
  ],
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
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
};
