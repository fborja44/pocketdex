import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Power Green Small"', 'Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				twilight: {
					DEFAULT: '#6B5A73',
				},
			},
			scale: {
				200: '2',
				250: '2.5',
			},
		},
	},
	plugins: [],
};
