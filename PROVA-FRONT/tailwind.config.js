/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'visionai': "url('./images/visiona.jpg')",
        'visionai2': "url('./images/visiona2.jpg')",
      },
      colors: {
        'visiona': '#fe5000',
      },
    },
  },
  plugins: [],
}

