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
				dex: {
					DEFAULT: '#29C6AD',
					light: '#48E0CE',
					dark: '#29736B',
				},
				ground: {
					100: '#E5D192',
					200: '#D7B770',
					300: '#C8A048',
				},
				rock: {
					200: '#DBB384',
					300: '#CC9B60',
					400: '#AE7A3B',
				},
			},
			scale: {
				175: '1.75',
				200: '2',
				250: '2.5',
			},
			gridTemplateColumns: {
				stats: '60px 40px 1fr',
			},
			height: {
				page: `calc(100vh - 28px - 38px)`,
			},
			shadow: {
				text: 'text-shadow: 2px 0px 0px #000',
				menu: 'text-shadow: 2px 0px 0px #9C9C9C',
			},
		},
	},
	plugins: [],
};
