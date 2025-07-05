/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
			},
			colors: {
				blue: {
					base: '#2C46B1',
					dark: '#2C4091',
				},
				gray: {
					100: '#F9F9FB',
					200: '#E4E6EC',
					300: '#CDCFD5',
					400: '#74798B',
					500: '#4D505C',
					600: '#1F2025',
				},
				feedback: {
					danger: '#B12C4D',
				},
			},
			fontSize: {
				xxs: ['10px', '14px'],
			},
			animation: {
				progress: 'progress 1s infinite linear',
			},
			keyframes: {
				progress: {
					'0%': {
						transform: 'translateX(0) scaleX(0)',
					},
					'40%': {
						transform: 'translateX(0%) scaleX(0.4)',
					},
					'100%': {
						transform: 'translateX(100%) scaleX(0.5)',
					},
				},
			},
		},
	},
	plugins: [],
}
