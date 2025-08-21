/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary-1': '#69db7c',
                'primary-2': '#51cf66',
                'primary-3': '#40c057',
                'secondary-3': '#74c0fc',
                'secondary-4': '#4dabf7',
                'secondary-5': '#339af0',
                'tertiary-1': '#F7FAFC',
                'tertiary-2': '#EDF2F7',
                'tertiary-3': '#CBD5E0',
                'tertiary-4': '#A0AEC0',
                'tertiary-5': '#4A5568',
            },
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
            },
            spacing: {
                'eco-xs': '0.25rem',
                'eco-sm': '0.5rem',
                'eco-md': '1rem',
                'eco-lg': '2rem',
            },
            borderRadius: {
                'eco-sm': '0.25rem',
                'eco-md': '0.5rem',
                'eco-lg': '1rem',
            },
            boxShadow: {
                'eco-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                'eco-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            fontFamily: {
                'eco-font': ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};