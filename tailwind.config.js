module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{html,js,ts,mjs}", // Include .mjs in the src directory
		"./**/*.html", // Ensure all HTML files are included
		"./**/*.js", // Include all JS files
		"!./node_modules/**/*", // Exclude node_modules
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
