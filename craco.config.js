const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  mode: isDevelopment ? 'development' : 'production',
};
