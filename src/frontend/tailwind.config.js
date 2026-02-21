import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                neonBlue: {
                    100: 'oklch(var(--neonBlue-100))',
                    200: 'oklch(var(--neonBlue-200))',
                    300: 'oklch(var(--neonBlue-300))',
                    400: 'oklch(var(--neonBlue-400))',
                    500: 'oklch(var(--neonBlue-500))',
                    600: 'oklch(var(--neonBlue-600))',
                    700: 'oklch(var(--neonBlue-700))',
                    800: 'oklch(var(--neonBlue-800))',
                    900: 'oklch(var(--neonBlue-900))',
                },
                electricPurple: {
                    100: 'oklch(var(--electricPurple-100))',
                    200: 'oklch(var(--electricPurple-200))',
                    300: 'oklch(var(--electricPurple-300))',
                    400: 'oklch(var(--electricPurple-400))',
                    500: 'oklch(var(--electricPurple-500))',
                    600: 'oklch(var(--electricPurple-600))',
                    700: 'oklch(var(--electricPurple-700))',
                    800: 'oklch(var(--electricPurple-800))',
                    900: 'oklch(var(--electricPurple-900))',
                },
                darkCharcoal: {
                    100: 'oklch(var(--darkCharcoal-100))',
                    200: 'oklch(var(--darkCharcoal-200))',
                    300: 'oklch(var(--darkCharcoal-300))',
                    400: 'oklch(var(--darkCharcoal-400))',
                    500: 'oklch(var(--darkCharcoal-500))',
                    600: 'oklch(var(--darkCharcoal-600))',
                    700: 'oklch(var(--darkCharcoal-700))',
                    800: 'oklch(var(--darkCharcoal-800))',
                    900: 'oklch(var(--darkCharcoal-900))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.1)',
                'depth-sm': '0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2)',
                'depth-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
                'depth-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'depth-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
                'neon-blue': '0 0 20px rgba(0, 243, 255, 0.3), 0 0 40px rgba(0, 243, 255, 0.1)',
                'neon-purple': '0 0 20px rgba(189, 0, 255, 0.3), 0 0 40px rgba(189, 0, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Poppins', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
