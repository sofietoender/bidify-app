module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{html,js,ts}", // Sørger for at all JS i src inkluderes
		"!./node_modules/**/*",
	],
	theme: {
		extend: {
			colors: {
				beige: "#F6F4F0",
				red: "#D6482C",
				customblack: "#161613",
				brown: "#A58063",
				gray: "#AFA9A4",
				white: "#FFFFFF",
			},
		},
	},
	plugins: [],
};
