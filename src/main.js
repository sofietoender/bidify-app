import "./style.css";
import { loadNavbar } from "../src/components/navbar.mjs";
import { fetchData, addSearchListener, addSortListener } from "./api/auth/fetchData.mjs";

function router() {
	loadNavbar("navbar-container");

	const path = window.location.pathname.replace(/\/$/, "");

	switch (path) {
		case "":
		case "/index.html":
			fetchData();
			addSearchListener();
			addSortListener();
			break;

		case "/auth/profile":
		case "/auth/login":
		case "/auth/register":
		case "/auctions/newListing":
		case "/auctions/listingDetail":
			break;

		default:
			console.warn("Unhandled route:", path);
	}
}

document.addEventListener("DOMContentLoaded", router);
