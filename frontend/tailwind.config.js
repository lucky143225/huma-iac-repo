/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        colorPulse: 'colorPulse 2s infinite',
        popUp: 'popUp 0.5s ease-out forwards',
        pulsePopUp: 'pulsePopUp 2s ease-out infinite',
      },
      keyframes: {
        colorPulse: {
          '0%': { color: '#4C6E91' },
          '50%': { color: '#F4A300' },
          '100%': { color: '#4C6E91' },
        },
        popUp: {
          '0%': {
            transform: 'scale(0.5) translateY(0)', // Start small and at normal position
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.2) translateY(-0.5rem)', // Pop up with scaling
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1) translateY(0)', // End at normal size and position
            opacity: '1',
          },
        },
        pulsePopUp: {
          '0%': {
            transform: 'scale(0.5) translateY(0)', // Start small and at normal position
            opacity: '0',
            color: '#4C6E91', // Initial color
          },
          '50%': {
            transform: 'scale(1.2) translateY(-0.5rem)', // Pop up and grow
            opacity: '1',
            color: '#F4A300', // Change to highlighted color
          },
          '100%': {
            transform: 'scale(1) translateY(0)', // End at normal size and position
            opacity: '1',
            color: '#4C6E91', // Revert to initial color
          },
        },
      },
    },
  },
  plugins: [],
}

