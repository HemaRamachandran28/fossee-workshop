/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#050508',
          900: '#0c0c14',
          800: '#12121e',
          700: '#1a1a2e',
          600: '#22223e',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      backgroundImage: {
        'mesh-1': 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(45,212,191,0.1) 0%, transparent 60%)',
        'mesh-2': 'radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 30% 20%, rgba(251,113,133,0.08) 0%, transparent 50%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 60px rgba(139,92,246,0.25)',
        'glow-teal': '0 0 60px rgba(45,212,191,0.2)',
        'card': '0 1px 1px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 1px 1px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
