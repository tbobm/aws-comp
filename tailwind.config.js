/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cost-savings': 'var(--color-cost-savings)',
        'cost-savings-light': 'var(--color-cost-savings-light)',
        'cost-increase': 'var(--color-cost-increase)',
        'cost-increase-light': 'var(--color-cost-increase-light)',
        'cost-neutral': 'var(--color-cost-neutral)',
        'cost-neutral-light': 'var(--color-cost-neutral-light)',
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'hover': 'var(--shadow-hover)',
        'active': 'var(--shadow-active)',
      },
      transitionDuration: {
        'quick': 'var(--duration-quick)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'standard': 'var(--ease-standard)',
        'decelerate': 'var(--ease-decelerate)',
        'accelerate': 'var(--ease-accelerate)',
      },
    },
  },
  plugins: [],
}
