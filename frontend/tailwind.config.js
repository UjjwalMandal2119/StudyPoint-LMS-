/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Palette
        'lms-bg': '#f3f5f9',
        'lms-card': '#ffffff',
        'lms-code': '#0f172a',
        // Brand & Navy Tones
        'navy-dark': '#0f172a',
        'navy-primary': '#1e3a8a',
        'navy-hover': '#2563eb',
        // Accents & Borders
        'accent-amber': '#f59e0b',
        'lms-border': '#e2e8f0',
        // Status & Difficulty Badges
        'status-easy': { bg: '#dcfce7', text: '#166534' },
        'status-mid': { bg: '#fef3c7', text: '#92400e' },
        'status-hard': { bg: '#fee2e2', text: '#991b1b' },
        // Callout Banner Colors
        'info-banner': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
        'warn-banner': { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412' },
        'tip-banner':  { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.08)',
        lift: '0 10px 25px -5px rgb(15 23 42 / 0.15)',
      },
    },
  },
  plugins: [],
};