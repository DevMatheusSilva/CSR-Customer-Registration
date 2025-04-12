/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/views/*.ejs"],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                'font-default': '#6DE6B9',
                'dark-default': '#232929',
                'light-default': '#303636',
                'mid-default': '#354040',
                'lighter-default': "#3f4b4b"
            }
        },
    },
    plugins: [],
};