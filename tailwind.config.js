/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'scale-up': 'scaleUp 1s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      colors: {
        'primary': '#e2c765',
        'white': '#ffffff', // Default white (optional)
        'charcoal-gray': '#2e2e2e',
        'button-cta': '#c7a647',
        'link-icons': '#6574e2',
      },
      fontFamily: {
        sans: ["Lato", "serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}