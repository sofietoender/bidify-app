import { baseUrl } from "./constants.js";
import { displayListings } from "./displayData.mjs";

export async function fetchData(query = "") {
	try {
		// Dynamisk bygging av URL basert på søk eller ikke
		const url = query ? `${baseUrl}/search?q=${encodeURIComponent(query)}` : baseUrl;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}

		const { data } = await response.json();

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
		await fetchData(query);
	});
}
