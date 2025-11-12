/**
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'hsl(45 52% 97%)',
          foreground: 'hsl(24 32% 18%)',
        },
        brand: {
          DEFAULT: 'hsl(134 45% 38%)',
          foreground: 'hsl(0 0% 99%)',
          soft: 'hsl(134 45% 88%)',
        },
        muted: {
          DEFAULT: 'hsl(36 28% 90%)',
          foreground: 'hsl(24 18% 35%)',
        },
        accent: {
          DEFAULT: 'hsl(26 64% 54%)',
          foreground: 'hsl(36 84% 96%)',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
