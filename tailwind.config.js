/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F1E6C9',
        panel: '#FBF6E9',
        yellow: {
          brand: '#F7D046',
        },
        orange: {
          brand: '#E8632C',
        },
        ink: '#181410',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #181410',
        brutalSm: '3px 3px 0px 0px #181410',
        brutalLg: '6px 6px 0px 0px #181410',
        brutalHover: '2px 2px 0px 0px #181410',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
}
