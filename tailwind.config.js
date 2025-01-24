module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{html,js,ts,mjs}",
		"./auth/**/*.{html,js}", // Add paths for other folders like /auth
		"./**/*.html", // Ensure this includes all HTML files
		"./**/*.js", // Ensure this includes all JS files
		"./**/*.mjs", // Ensure this includes all MJS files
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
