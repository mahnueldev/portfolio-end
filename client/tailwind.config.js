/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      colors: {
        // Configure your color palette here
        transparent: 'transparent',
        light: {
          100: '#F8FAFC',
          200: '#ECEBF0',
          300: '#D5D6DF',
          400: '#878998',
          500: '#7A7D89',
          600: '#696977',
        },
        dark: {
          100: '#575968',
          200: '#525365',
          300: '#404254',
          400: '#3F424D',
          500: '#383B47',
          600: '#323542',
        },
        green: {
          100: '#A3C6B0',
          200: '#7FFDAD',
          300: '#46D078',
        },
        blue: {
          100: '#DDECFF',
          200: '#4198FF',
          
        },
      },
      dropShadow: {
        '3xl': '5px 5px 15px rgb(0 0 0 / 75%)',
      },
    },
    fontFamily: {
      sans: ['Asap'],
      serif: ['Britannic Bold'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '6.052rem',
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
  },
  plugins: [],
};
