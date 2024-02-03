module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add more paths here if necessary
  ],
  theme: {
    extend: {
      // Add more theme extensions here if necessary
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cyberpunk", 
      "lofi", 
      "valentine", 
      "business", 
      "acid", 
      "cmyk",
      "cupcake", 
      "bumblebee", 
      "corporate", 
      "synthwave", 
      "retro", 
      "halloween", 
      "garden", 
      "forest", 
      "aqua", 
      "pastel", 
      "fantasy", 
      "wireframe", 
      "black", 
      "luxury", 
      "dracula", 
      "night", 
      "coffee", 
      "winter", 
      "dim", 
      "nord"
    ],
  },
  
}