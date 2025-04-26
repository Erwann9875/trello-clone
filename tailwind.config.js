/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1a1b1e',
        foreground: '#fafafa',
        card: '#25262b',
        'card-hover': '#2c2e33',
        'card-active': '#2f3136',
        border: '#373A40',
        primary: '#228be6',
        secondary: '#868e96',
      },
    },
  },
  plugins: [],
};