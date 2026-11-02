/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aiesec: {
          blue: '#037EF3',
          darkBlue: '#0258AA',
          navy: '#0A2540',
          deep: '#060E1A',
        },
        ogv: {
          DEFAULT: '#F85A40',
          dark: '#D9432B',
          light: '#FF7D66',
          bg: '#FFF5F4',
        },
        ogt: {
          DEFAULT: '#0CB9C1',
          dark: '#08969C',
          light: '#3CE5ED',
          orange: '#F48924',
          bg: '#F0FDFA',
        },
        b2c: {
          DEFAULT: '#6366F1',
          purple: '#8B5CF6',
          dark: '#4F46E5',
          light: '#A5B4FC',
          bg: '#EEF2FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
