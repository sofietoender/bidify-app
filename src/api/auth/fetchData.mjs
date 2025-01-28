import { listingUrl } from "./constants.js";
import { displayListings } from "./displayData.mjs";

export async function fetchData(query = "", sortOption = "newest") {
	try {
		// Build URL based on search query or no query
		const url = query ? `${listingUrl}/search?q=${encodeURIComponent(query)}` : listingUrl;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}

		const { data } = await response.json();

		// Filter for active listings (those that haven't ended yet)
		const activeListings = data.filter((listing) => {
			const endDate = new Date(listing.endsAt);
			return endDate > new Date();
		});

		// Sort based on the selected option (newest or oldest)
		const sortedListings = activeListings.sort((a, b) => {
			const dateA = new Date(a.created);
			const dateB = new Date(b.created);
			return sortOption === "newest" ? dateB - dateA : dateA - dateB;
		});

		displayListings(sortedListings);
	} catch (error) {
		console.error("Fetch error:", error.message);
	}
}

export function addSearchListener() {
	const searchInput = document.getElementById("search-input");

	searchInput.addEventListener("input", async (e) => {
		const query = e.target.value.trim();
		const sortOption = document.getElementById("sort-dropdown").value;
		await fetchData(query, sortOption);
	});
}

export function addSortListener() {
	const sortDropdown = document.getElementById("sort-dropdown");

	sortDropdown.addEventListener("change", async (e) => {
		const sortOption = e.target.value;
		const query = document.getElementById("search-input").value.trim();
		await fetchData(query, sortOption);
	});
}
