/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',  // Tactical orange from logo
          dark: '#E05500',
          light: '#FF8C33'
        },
        secondary: '#FFB366',  // Lighter orange accent
        accent: '#FF4500',  // Hot orange for highlights
        dark: {
          DEFAULT: '#0A0A0A',  // Deep black
          100: '#141414',      // Slightly lighter
          200: '#1E1E1E',      // Military gray
          300: '#2A2A2A'       // Border gray
        },
        text: {
          primary: '#FAFAFA',   // White text
          secondary: '#B0B0B0', // Gray text
          tertiary: '#808080'   // Muted gray
        },
        tactical: {
          orange: '#FF6B00',
          amber: '#FFB366',
          slate: '#3A3A3A',
          charcoal: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 107, 0, 0.6)' }
        }
      }
    }
  },
  plugins: []
}
