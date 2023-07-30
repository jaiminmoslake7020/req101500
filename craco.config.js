// craco.config.js
module.exports = {
  typescript: {
    enableTypeChecking: false /* (default value)  */
  },
  eslint: {
    enabled: false
  },
  style: {
    postOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
