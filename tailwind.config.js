/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
			screens: {
				'xsm': '425px',
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
}

