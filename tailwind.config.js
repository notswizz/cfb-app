module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add more paths here if necessary
  ],
  theme: {
    extend: {
      colors: {
        'charcoal-gray': '#36454F',
        'silver-gray': '#C0C0C0',
        'navy-blue': '#000080',
        'athletic-gold': '#D4AF37',
        'custom-black': '#000000', // Renamed to 'custom-black' to avoid conflict with Tailwind's default 'black'
        'custom-white': '#FFFFFF', // Renamed to 'custom-white' to avoid conflict with Tailwind's default 'white'
      },
      // Add more theme extensions here if necessary
    },
  },
  plugins: [
    require('daisyui')
  ],
}
