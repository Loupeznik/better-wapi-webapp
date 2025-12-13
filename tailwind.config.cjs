const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		heroui({
			defaultTheme: "dark",
			defaultExtendTheme: "dark",
			layout: {
				disabledOpacity: 0.3,
				radius: {
					small: "4px",
					medium: "6px",
					large: "8px",
				},
				borderWidth: {
					small: "0px",
					medium: "0px",
					large: "0px",
				},
			},
		}),
	],
};
