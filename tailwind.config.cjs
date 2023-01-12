/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", './src/**/*.{svelte,js,ts}'], theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#7c3aed",
                    "secondary": "#fc719f",
                    "accent": "#34d399",
                    "neutral": "#374151",
                    "base-100": "#0b0b0b",
                    "info": "#5D7ACB",
                    "success": "#21C468",
                    "warning": "#F0B505",
                    "error": "#E87382",
                },
            }
        ],
    }
}
