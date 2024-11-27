/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to all your components
  ],
  theme: {
    extend: {
      colors: {
        darkTeal: "#15263F",
        // teal: "#315A70",
        lightTeal: "#6C9BA1",
        white: "#fff",
        black: "#000",
      }, fontFamily: {
        lateef: ['Lateef', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],

      },
      animation: {
        'fade-in-down': 'fadeInDown 1s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
    },
  },
  plugins: [],
}