/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral / Default
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Active / In-Progress (Blue)
        active: {
          light: '#2563EB',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
          text: '#FFFFFF',
        },
        // Success / Completed (Green)
        success: {
          light: '#DCFCE7',
          DEFAULT: '#22C55E',
          dark: '#15803D',
          text: '#14532D',
        },
        // Warning / Attention (Amber)
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          text: '#92400E',
        },
        // Error / Failed (Red)
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          text: '#7F1D1D',
        },
        // Info / System Message (Sky Blue)
        info: {
          light: '#E0F2FE',
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
          text: '#0C4A6E',
        },
      },
    },
  },
  plugins: [],
}
