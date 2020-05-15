module.exports = function({ env }) {
    return {
        style:{
            postcss: {
                plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                ]
            }

        }
    };
}
