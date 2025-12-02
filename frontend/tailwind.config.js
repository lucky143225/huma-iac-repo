/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  // Updated content to include jsx/tsx since you are using React
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // Existing animations
        colorPulse: 'colorPulse 2s infinite',
        popUp: 'popUp 0.5s ease-out forwards',
        pulsePopUp: 'pulsePopUp 2s ease-out infinite',
        rolloutTop: 'rolloutTop 0.8s ease-in-out forwards',
        
        // Merged & New animations for Hero UI
        'slide-up': 'slideUp 0.8s ease-out forwards', // Added 'forwards' to prevent disappearing
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'bounce-slow': 'bounceSlow 2s infinite',
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
      },
      keyframes: {
        // Existing keyframes
        rolloutTop: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        colorPulse: {
          '0%': { color: '#4C6E91' },
          '50%': { color: '#4C6E91' },
          '100%': { color: '#4C6E91' },
        },
        popUp: {
          '0%': { transform: 'scale(0.5) translateY(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2) translateY(-0.5rem)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        pulsePopUp: {
          '0%': { transform: 'scale(0.5) translateY(0)', opacity: '0', color: '#000000' },
          '50%': { transform: 'scale(1.2) translateY(-0.5rem)', opacity: '1', color: '#F4A300' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1', color: '#000000' },
        },

        // New Keyframes for Hero UI
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' },
        },
      },
    },
  },
  plugins: [
    // Plugin to generate animation-delay utility classes
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
  ],
}
