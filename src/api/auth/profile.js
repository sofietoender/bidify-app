import { apiKey, baseUrl } from "./constants";

const accessToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("username");

if (!accessToken || !username) {
	window.location.href = "/login.html";
}

// Helper function to fetch data from the API
async function fetchData(url, options) {
	try {
		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

// Helper function to update the DOM with user data
function updateUserProfile(userData) {
	document.getElementById("banner").src = userData.banner.url;
	document.getElementById("avatar").src = userData.avatar.url;
	document.getElementById("username").textContent = userData.name;
	document.getElementById("userBio").textContent = userData.bio;
	document.getElementById("creditAmount").textContent = userData.credits;
}

// Fetch user data to populate the profile
async function fetchUserData() {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
		},
	};
	const data = await fetchData(`${baseUrl}/auction/profiles/${username}`, options);
	if (data) {
		updateUserProfile(data.data);
	}
}

// Open modal to update banner, avatar, or bio URL
function openModal(target) {
	const modal = document.getElementById("modal");
	modal.classList.remove("hidden");
	document.getElementById("imageUrl").value = "";
	document.getElementById("bio").value = "";

	const modalTitles = {
		banner: "Update Banner",
		avatar: "Update Avatar",
		bio: "Update Bio",
	};

	document.getElementById("modalTitle").textContent = modalTitles[target];
	modal.dataset.target = target;
	document.getElementById("bioUpdateContainer").classList.toggle("hidden", target !== "bio");
}

// Close modal
function closeModal() {
	document.getElementById("modal").classList.add("hidden");
}

// Update profile (banner, avatar, or bio)
async function updateProfile(formData) {
	const options = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	};

	const data = await fetchData(`${baseUrl}/auction/profiles/${username}`, options);
	if (data) {
		if (formData.banner) document.getElementById("banner").src = data.data.banner.url;
		if (formData.avatar) document.getElementById("avatar").src = data.data.avatar.url;
		if (formData.bio) document.getElementById("userBio").textContent = data.data.bio;
		closeModal();
	} else {
		alert("Failed to update profile.");
	}
}

// Event listeners for opening the modal
function addEditButtonListener(buttonId, target) {
	const button = document.getElementById(buttonId);
	if (button) {
		button.addEventListener("click", () => openModal(target));
	}
}

// Handle the update button click based on the modal target
async function handleUpdateClick() {
	const modal = document.getElementById("modal");
	const target = modal.dataset.target;
	let formData;

	if (target === "banner" || target === "avatar") {
		const imageUrl = document.getElementById("imageUrl").value;
		if (!imageUrl) return alert("Please enter a valid image URL.");
		formData = { [target]: { url: imageUrl } };
	} else if (target === "bio") {
		const bio = document.getElementById("bio").value;
		if (!bio) return alert("Please enter a valid bio.");
		formData = { bio };
	}

	await updateProfile(formData);
}

document.addEventListener("DOMContentLoaded", () => {
	// Fetch user data to populate the profile
	fetchUserData();

	// Open modal event listeners
	addEditButtonListener("editBannerBtn", "banner");
	addEditButtonListener("editAvatarBtn", "avatar");
	addEditButtonListener("editBioBtn", "bio");

	// Update button listener
	const updateBtn = document.getElementById("updateBtn");
	if (updateBtn) {
		updateBtn.addEventListener("click", handleUpdateClick);
	}

	// Cancel button listener
	const cancelBtn = document.getElementById("cancelBtn");
	if (cancelBtn) {
		cancelBtn.addEventListener("click", closeModal);
	}

	// Fetch user listings
	fetchUserListings();

	// Fetch user wins
	fetchUserWins();
});

// Fetch user listings
async function fetchUserListings() {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
		},
	};

	const data = await fetchData(`${baseUrl}/auction/profiles/${username}/listings`, options);
	if (data) {
		const listingsContainer = document.getElementById("userListings");
		listingsContainer.innerHTML = "";

		if (!data.data.length) {
			listingsContainer.innerHTML = "<p class='text-gray-600'>No listings found.</p>";
			return;
		}

		data.data.forEach((listing) => {
			const listingElement = createListingElement(listing);
			listingsContainer.appendChild(listingElement);
		});
	}
}

// Create a listing element for display
function createListingElement(listing) {
	const listingElement = document.createElement("div");
	listingElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "w-64");

	listingElement.innerHTML = `
		<img src="${listing.media[0]?.url}" alt="${listing.media[0]?.alt || "Listing Image"}" class="w-full h-32 object-cover rounded-md mb-2">
		<h3 class="text-lg font-bold">${listing.title}</h3>
		<p class="text-sm text-gray-600">${listing.description || "No description available."}</p>
		<p class="text-sm font-semibold mt-2">Bids: ${listing._count.bids}</p>
		<p class="text-sm text-gray-500">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
	`;

	return listingElement;
}

// Fetch user wins
async function fetchUserWins() {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
		},
	};

	const data = await fetchData(`${baseUrl}/auction/profiles/${username}/wins`, options);
	if (data) {
		const winsContainer = document.getElementById("userWins");
		winsContainer.innerHTML = "";

		if (!data.data.length) {
			winsContainer.innerHTML = "<p class='text-gray-600'>No wins found.</p>";
			return;
		}

		data.data.forEach((win) => {
			const winElement = createListingElement(win);
			winsContainer.appendChild(winElement);
		});
	}
}
