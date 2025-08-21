/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'eco-green': '#10B981',
                'eco-blue': '#3B82F6',
                'eco-light': '#F0FDF4',
            },
        },
    },
    plugins: [],
};