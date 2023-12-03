/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.html',
    './layout/**/*.ejs',
    './main.js',
    './assets/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '15px',
      screens: {
        sm: '540px',
        md: '767px',
        lg: '992px',
        xl: '1140px',
      },
    },
    extend: {
      screens: {
        sm: '540px',
        md: '767px',
        lg: '992px',
        xl: '1140px',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
      },
      colors: {
        purple: {
          dark: '#301E5F',
          DEFAULT: '#6A33F8',
          light: '#6A33FF',
        },
        gray: {
          DEFAULT: '#F8F8F8',
        },
      },
      fontSize: {
        '28px': ['28px', '38px']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'class',
  })],
};
