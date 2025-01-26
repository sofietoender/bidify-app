import "./style.css";
import { loadNavbar } from "../src/components/navbar.mjs";
import { fetchData, addSearchListener, addSortListener } from "./api/auth/fetchData.mjs";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Load the navbar
		loadNavbar("navbar-container");

		// Fetch data and initialize listeners after DOM content is loaded
		await fetchData();
		addSearchListener();
		addSortListener();
	} catch (error) {
		console.error("Error during DOMContentLoaded:", error);
	}
});
