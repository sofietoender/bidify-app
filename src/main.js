import "./style.css";
import { loadNavbar } from "../src/components/navbar.mjs";
import { fetchData, addSearchListener } from "./api/auth/fetchData.mjs";

loadNavbar("navbar-container");
fetchData();

document.addEventListener("DOMContentLoaded", async () => {
	// Hent og vis alle oppføringer ved første last
	await fetchData();

	// Aktiver søkefunksjonalitet
	addSearchListener();
});
