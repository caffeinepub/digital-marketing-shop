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
                deepTeal: {
                    100: 'oklch(var(--deepTeal-100))',
                    200: 'oklch(var(--deepTeal-200))',
                    300: 'oklch(var(--deepTeal-300))',
                    400: 'oklch(var(--deepTeal-400))',
                    500: 'oklch(var(--deepTeal-500))',
                    600: 'oklch(var(--deepTeal-600))',
                    700: 'oklch(var(--deepTeal-700))',
                    800: 'oklch(var(--deepTeal-800))',
                    900: 'oklch(var(--deepTeal-900))',
                },
                warmGold: {
                    100: 'oklch(var(--warmGold-100))',
                    200: 'oklch(var(--warmGold-200))',
                    300: 'oklch(var(--warmGold-300))',
                    400: 'oklch(var(--warmGold-400))',
                    500: 'oklch(var(--warmGold-500))',
                    600: 'oklch(var(--warmGold-600))',
                    700: 'oklch(var(--warmGold-700))',
                    800: 'oklch(var(--warmGold-800))',
                    900: 'oklch(var(--warmGold-900))',
                },
                charcoalGray: {
                    100: 'oklch(var(--charcoalGray-100))',
                    200: 'oklch(var(--charcoalGray-200))',
                    300: 'oklch(var(--charcoalGray-300))',
                    400: 'oklch(var(--charcoalGray-400))',
                    500: 'oklch(var(--charcoalGray-500))',
                    600: 'oklch(var(--charcoalGray-600))',
                    700: 'oklch(var(--charcoalGray-700))',
                    800: 'oklch(var(--charcoalGray-800))',
                    900: 'oklch(var(--charcoalGray-900))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'depth-sm': '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
                'depth-md': '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                'depth-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                'depth-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
