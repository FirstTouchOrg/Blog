import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
  content: ['src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'warm-gray': 'var(--color-warm-gray)'
      },
      fontFamily: {
        display: ['"Unbounded"', ...defaultTheme.fontFamily.sans],
        body: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        editorial: ['"Playfair Display"', 'Georgia', ...defaultTheme.fontFamily.serif]
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }]
      },
      letterSpacing: {
        editorial: '0.15em',
        magazine: '0.25em'
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-in': 'slide-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        blob: 'blob 18s infinite'
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)'
      }
    }
  },
  plugins: [typography()]
} satisfies Config;
