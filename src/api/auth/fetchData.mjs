import { listingsUrl } from "../../constants/constants.js";
import { displayListings } from "./displayData.mjs";

/**
 * fetchData - Fetches data from the listings API based on a search query and sorting option.
 *
 * This function fetches data either using a search query or without it. It applies sorting based on the
 * given sorting option ('newest' or 'oldest'). It also filters out listings that have expired and displays
 * only active listings using the displayListings function.
 *
 * @param {string} [query=""] - The search query to filter listings by (optional). If not provided, all listings will be fetched.
 * @param {string} [sortOption="newest"] - The sorting option to use. Can be either 'newest' or 'oldest'. Defaults to 'newest'.
 * @returns {Promise<void>} A promise that resolves when the data has been fetched and displayed.
 *
 * @throws {Error} Throws an error if the network response is not ok or if there is an issue with the fetch operation.
 */
export async function fetchData(query = "", sortOption = "newest") {
	try {
		let url;

		if (query) {
			// Uses the search endpoint if there is a query.
			url = `${listingsUrl}/search?q=${encodeURIComponent(query)}&limit=50&page=1&sort=created`;
		} else {
			// Uses the regular endpoint without a search query.
			url = `${listingsUrl}?limit=50&page=1&sort=created`;
		}

		// Adds sorting order based on the selected option.
		url += sortOption === "newest" ? `&sortOrder=desc` : `&sortOrder=asc`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}

		const { data } = await response.json();

		// Filters out expired listings
		const activeListings = data.filter((listing) => {
			const endDate = new Date(listing.endsAt);
			return endDate > new Date();
		});

		displayListings(activeListings);
	} catch (error) {
		console.error("Fetch error:", error.message);
	}
}

/**
 * addSearchListener - Adds an event listener to the search input field to trigger data fetching when the user types a query.
 *
 * This function adds an event listener to the search input element. It listens for 'input' events and fetches
 * the data based on the entered search query and the selected sorting option.
 *
 * @returns {void} This function does not return anything.
 */
export function addSearchListener() {
	const searchInput = document.getElementById("search-input");

	searchInput.addEventListener("input", async (e) => {
		const query = e.target.value.trim();
		const sortOption = document.getElementById("sort-dropdown").value;
		await fetchData(query, sortOption);
	});
}

/**
 * addSortListener - Adds an event listener to the sort dropdown to trigger data fetching when the user selects a sorting option.
 *
 * This function adds an event listener to the sort dropdown. It listens for 'change' events and fetches data
 * based on the selected sorting option and the current search query.
 *
 * @returns {void} This function does not return anything.
 */
export function addSortListener() {
	const sortDropdown = document.getElementById("sort-dropdown");

	sortDropdown.addEventListener("change", async (e) => {
		const sortOption = e.target.value;
		const query = document.getElementById("search-input").value.trim();
		await fetchData(query, sortOption);
	});
}
