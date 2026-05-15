/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F5D98B',
          400: '#E7B75F',
          500: '#C89B3C',
          600: '#A67C2A',
          700: '#7D5C1A',
        },
        charcoal: {
          900: '#0B0B0B',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C89B3C 0%, #E7B75F 50%, #C89B3C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B0B0B 0%, #1A1A1A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 155, 60, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(200, 155, 60, 0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(200, 155, 60, 0.3)',
        'gold-lg': '0 0 60px rgba(200, 155, 60, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
