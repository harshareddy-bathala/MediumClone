/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medium's exact color palette
        black: '#242424',
        'gray-dark': '#6B6B6B',
        'gray-medium': '#757575',
        'gray-light': '#F2F2F2',
        'gray-border': '#E6E6E6',
        green: '#1A8917',
        'green-dark': '#0F7B0F',
        highlight: '#FFC017',
        'highlight-dark': '#F7B801',
        white: '#FFFFFF',
        'bg-light': '#FAFAFA',
      },
      fontFamily: {
        // Medium's typography system
        charter: ['gt-super', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'gt-america': ['sohne', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['gt-super', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['sohne', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Medium's typography scale
        'display': ['80px', { lineHeight: '84px', fontWeight: '400' }],
        'headline': ['64px', { lineHeight: '68px', fontWeight: '400' }],
        'title-large': ['48px', { lineHeight: '52px', fontWeight: '400' }],
        'title': ['40px', { lineHeight: '44px', fontWeight: '400' }],
        'title-medium': ['32px', { lineHeight: '36px', fontWeight: '400' }],
        'title-small': ['24px', { lineHeight: '28px', fontWeight: '400' }],
        'body-large': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'story': '680px',
        'container': '1192px',
      },
      screens: {
        'xs': '320px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1192px',
        'xl': '1400px',
      },
      boxShadow: {
        'medium': '0 2px 4px rgba(0,0,0,.1)',
        'medium-lg': '0 8px 16px rgba(0,0,0,.1)',
        'modal': '0 20px 60px rgba(0,0,0,.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-clap': 'pulseClap 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseClap: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}