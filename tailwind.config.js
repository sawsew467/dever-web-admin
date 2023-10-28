/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primaryBlue: "#1A56DB",
        primaryGreen: "#046C4E",
        primaryGreenBland: "#DEF7EC",
        primaryYellowBland: "#FDF6B2",
        primaryBrown: "#723B13",
        primaryRed: "#9B1C1C",
        primaryRedBland: "#FDE8E8",
        dark: "#282828",
        darkHover: "#3f3f3f",
        darkSemi: "#575757"
      },
      boxShadow: {
        primary: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        secondary: "4px 4px 8px 0px rgba(0, 0, 0, 0.10)"
      },
      transitionProperty: {
        'height': 'height'
      },
      variants: {
        height: ['responsive', 'hover', 'focus']
    }
    },
  },
  darkMode: 'class',
  plugins: [
    require("flowbite/plugin"),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar-hide')
  ],
}
