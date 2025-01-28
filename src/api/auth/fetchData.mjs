import { listingUrl } from "./constants.js";
import { displayListings } from "./displayData.mjs";

export async function fetchData(query = "", sortOption = "newest") {
	try {
		let url;

		if (query) {
			// Bruker search-endepunktet hvis det er et søk
			url = `${listingUrl}/search?q=${encodeURIComponent(query)}&limit=50&page=1&sort=created`;
		} else {
			// Bruker det vanlige endepunktet uten søk
			url = `${listingUrl}?limit=50&page=1&sort=created`;
		}

		// Legger til sorteringsrekkefølge
		url += sortOption === "newest" ? `&sortOrder=desc` : `&sortOrder=asc`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}

		const { data } = await response.json();

		// Filtrer for aktive oppføringer (de som ikke har utløpt ennå)
		const activeListings = data.filter((listing) => {
			const endDate = new Date(listing.endsAt);
			return endDate > new Date();
		});

		displayListings(activeListings);
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
