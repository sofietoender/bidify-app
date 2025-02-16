export default {
	build: {
		rollupOptions: {
			input: {
				main: "index.html",
				createListing: "auctions/newListing/index.html",
				profile: "auth/profile/index.html",
				login: "auth/login/index.html",
				register: "auth/register/index.html",
				listingDetail: "auctions/listingDetail/index.html",
			},
		},
	},
};
