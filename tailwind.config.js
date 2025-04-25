// import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
                brand: {
                    blue: {
                        light: 'hsl(var(--brand-blue-light))',
                        DEFAULT: 'hsl(var(--brand-blue))',
                        dark: 'hsl(var(--brand-blue-dark))',
                    },
                    teal: {
                        light: 'hsl(var(--brand-teal-light))',
                        DEFAULT: 'hsl(var(--brand-teal))',
                    },
                },
                success: 'hsl(var(--success))',
                warning: 'hsl(var(--warning))',
                info: 'hsl(var(--info))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                'slide-in-bottom': {
                    '0%': { 
                        transform: 'translateY(10px)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                'slide-in-top': {
                    '0%': { 
                        transform: 'translateY(-10px)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                'slide-in-left': {
                    '0%': { 
                        transform: 'translateX(-10px)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'translateX(0)',
                        opacity: '1'
                    }
                },
                'slide-in-right': {
                    '0%': { 
                        transform: 'translateX(10px)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'translateX(0)',
                        opacity: '1'
                    }
                },
                'scale-in': {
                    '0%': { 
                        transform: 'scale(0.95)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-500px 0',
                    },
                    '100%': {
                        backgroundPosition: '500px 0',
                    },
                },
                'pulse-subtle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.85' },
                },
                'rotate-loader': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
                'slide-in-bottom': 'slide-in-bottom 0.2s ease-out',
                'slide-in-top': 'slide-in-top 0.2s ease-out',
                'slide-in-left': 'slide-in-left 0.2s ease-out',
                'slide-in-right': 'slide-in-right 0.2s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
                'shimmer': 'shimmer 2s infinite linear',
                'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
                'rotate-loader': 'rotate-loader 1.2s infinite linear',
      },
            boxShadow: {
                'glass': '0 0 15px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.03)',
                'glass-sm': '0 1px 3px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.08)',
                'glass-lg': '0 5px 30px rgba(0, 0, 0, 0.05), 0 1px 5px rgba(0, 0, 0, 0.03)',
                'glass-xl': '0 10px 50px rgba(0, 0, 0, 0.07), 0 2px 10px rgba(0, 0, 0, 0.05)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-glass': 'linear-gradient(to right bottom, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0.7))',
                'gradient-glass-dark': 'linear-gradient(to right bottom, rgb(20 25 30 / 0.9), rgb(20 25 30 / 0.7))',
                'shimmer': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)',
            },
            backdropFilter: {
                'glass': 'blur(16px)',
            },
    }
  },
  plugins: [require("tailwindcss-animate")],
} 
// satisfies Config;
