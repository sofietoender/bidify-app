export default {
	build: {
		rollupOptions: {
			input: {
				main: "index.html",
				auctions: "auctions/index.html",
				listings: "auctions/listings/index.html",
				createListing: "auctions/newListing/index.html",
			},
		},
	},
};
