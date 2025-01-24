module.exports = {
	content: [
		"./index.html", // Includes the main index file
		"./**/index.html", // Includes any other index.html files in subdirectories
		"./src/**/*.{html,js,ts}", // Ensures JS files in src are included for styling
		"!./node_modules/**/*", // Excludes node_modules
		"./**/*.js", // Includes all JS files in the project
		"./**/*.mjs", // Includes all MJS files in the project
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
