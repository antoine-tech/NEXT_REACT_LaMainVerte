if (process.env.NODE_ENV === "production") {
    const tailwindcss = require('tailwindcss');
    module.exports = {
        plugins: [
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer')
        ],
    }
}