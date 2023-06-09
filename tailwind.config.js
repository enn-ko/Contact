/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    fontFamily: {
      'primary': ['Poppins', 'sans-serif'],
      'secondary': ['Roboto', 'sans-serif'],
    },

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1537px',
      // => @media (min-width: 1537px) { ... }
    }
,
    extend: {
      colors: {
        'background': '#232946',
        'headline': '#fffffe',
        'para': '#b8c1ec',
        'button': '#eebbc3',
        'button-text':'#232946',
      }

    },
  },
  plugins: [],
}


