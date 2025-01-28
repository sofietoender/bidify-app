const NOROFF_API_URL = "https://v2.api.noroff.dev";
const apiKey = "6ec6b26b-2699-4267-a499-2ad741f04936"; // Provided API Key

const accessToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("username");

if (!accessToken || !username) {
	console.error("Access token or username is missing. Please log in.");
	window.location.href = "/login.html";
}

// Fetch user data to populate the profile
async function fetchUserData() {
	try {
		const options = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"X-Noroff-API-Key": apiKey,
			},
		};

		const response = await fetch(`${NOROFF_API_URL}/auction/profiles/${username}`, options);
		const data = await response.json();
		const userData = data.data;

		document.getElementById("banner").src = userData.banner.url;
		document.getElementById("avatar").src = userData.avatar.url;
		document.getElementById("username").textContent = userData.name;
		document.getElementById("userBio").textContent = userData.bio;
		document.getElementById("creditAmount").textContent = userData.credits;
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
}

// Open modal to update banner or avatar URL
function openModal(target) {
	const modal = document.getElementById("modal");
	modal.classList.remove("hidden");
	document.getElementById("imageUrl").value = ""; // Clear previous input
	document.getElementById("bio").value = ""; // Clear bio input

	if (target === "banner") {
		document.getElementById("modalTitle").textContent = "Update Banner";
		modal.dataset.target = "banner";
		document.getElementById("bioUpdateContainer").classList.add("hidden");
	} else if (target === "avatar") {
		document.getElementById("modalTitle").textContent = "Update Avatar";
		modal.dataset.target = "avatar";
		document.getElementById("bioUpdateContainer").classList.add("hidden");
	} else if (target === "bio") {
		document.getElementById("modalTitle").textContent = "Update Bio";
		modal.dataset.target = "bio";
		document.getElementById("bioUpdateContainer").classList.remove("hidden");
	}
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

	try {
		const response = await fetch(`${NOROFF_API_URL}/auction/profiles/${username}`, options);
		const data = await response.json();

		if (response.ok) {
			if (formData.banner) {
				// Assuming the response contains the updated banner data
				document.getElementById("banner").src = data.data.banner.url;
			} else if (formData.avatar) {
				document.getElementById("avatar").src = data.data.avatar.url;
			} else if (formData.bio) {
				document.getElementById("userBio").textContent = data.data.bio;
			}
			closeModal();
		} else {
			alert("Failed to update profile.");
		}
	} catch (error) {
		console.error("Error updating profile:", error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Fetch user data to populate the profile
	fetchUserData();

	// Open modal to update banner or avatar URL
	const editBannerBtn = document.getElementById("editBannerBtn");
	if (editBannerBtn) {
		editBannerBtn.addEventListener("click", () => {
			openModal("banner");
		});
	}

	const editAvatarBtn = document.getElementById("editAvatarBtn");
	if (editAvatarBtn) {
		editAvatarBtn.addEventListener("click", () => {
			openModal("avatar");
		});
	}

	const editBioBtn = document.getElementById("editBioBtn");
	if (editBioBtn) {
		editBioBtn.addEventListener("click", () => {
			openModal("bio");
		});
	}

	// Handle the update button click based on the modal target
	const updateBtn = document.getElementById("updateBtn");
	if (updateBtn) {
		updateBtn.addEventListener("click", async () => {
			const modal = document.getElementById("modal");
			const target = modal.dataset.target;

			if (target === "banner") {
				const imageUrl = document.getElementById("imageUrl").value;
				if (!imageUrl) {
					alert("Please enter a valid image URL.");
					return;
				}

				const formData = { banner: { url: imageUrl } }; // Correct format for banner
				await updateProfile(formData);
			} else if (target === "avatar") {
				const imageUrl = document.getElementById("imageUrl").value;
				if (!imageUrl) {
					alert("Please enter a valid image URL.");
					return;
				}

				const formData = { avatar: { url: imageUrl } }; // Correct format for avatar
				await updateProfile(formData);
			} else if (target === "bio") {
				const bio = document.getElementById("bio").value;
				if (!bio) {
					alert("Please enter a valid bio.");
					return;
				}

				const formData = { bio: bio }; // Correct format for bio
				await updateProfile(formData);
			}
		});
	}

	// Handle cancel button click
	const cancelBtn = document.getElementById("cancelBtn");
	if (cancelBtn) {
		cancelBtn.addEventListener("click", closeModal);
	}
});

// get listing på profile:

async function fetchUserListings() {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
		},
	};

	try {
		const response = await fetch(`${NOROFF_API_URL}/auction/profiles/${username}/listings`, options);
		const data = await response.json();
		const listings = data.data;

		const listingsContainer = document.getElementById("userListings");
		listingsContainer.innerHTML = "";

		if (!listings.length) {
			listingsContainer.innerHTML = "<p class='text-gray-600'>No listings found.</p>";
			return;
		}

		listings.forEach((listing) => {
			const listingElement = document.createElement("div");
			listingElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "w-64");

			listingElement.innerHTML = `
				<img src="${listing.media[0]?.url || "https://via.placeholder.com/150"}" alt="${listing.media[0]?.alt || "Listing Image"}" class="w-full h-32 object-cover rounded-md mb-2">
				<h3 class="text-lg font-bold">${listing.title}</h3>
				<p class="text-sm text-gray-600">${listing.description || "No description available."}</p>
				<p class="text-sm font-semibold mt-2">Bids: ${listing._count.bids}</p>
				<p class="text-sm text-gray-500">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
			`;

			listingsContainer.appendChild(listingElement);
		});
	} catch (error) {
		console.error("Error fetching user listings:", error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	fetchUserListings();
});

// Fetch users wins:

// Fetch user wins and display them
async function fetchUserWins() {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-API-Key": apiKey,
		},
	};

	try {
		const response = await fetch(`${NOROFF_API_URL}/auction/profiles/${username}/wins`, options);
		const data = await response.json();
		const wins = data.data;

		const winsContainer = document.getElementById("userWins");
		winsContainer.innerHTML = "";

		if (!wins.length) {
			winsContainer.innerHTML = "<p class='text-gray-600'>No wins found.</p>";
			return;
		}

		wins.forEach((win) => {
			const winElement = document.createElement("div");
			winElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "w-64");

			winElement.innerHTML = `
				<img src="${win.media[0]?.url || "https://via.placeholder.com/150"}" alt="${win.media[0]?.alt || "Winning Image"}" class="w-full h-32 object-cover rounded-md mb-2">
				<h3 class="text-lg font-bold">${win.title}</h3>
				<p class="text-sm text-gray-600">${win.description || "No description available."}</p>
				<p class="text-sm font-semibold mt-2">Bids: ${win._count.bids}</p>
				<p class="text-sm text-gray-500">Ended: ${new Date(win.endsAt).toLocaleDateString()}</p>
			`;

			winsContainer.appendChild(winElement);
		});
	} catch (error) {
		console.error("Error fetching user wins:", error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	fetchUserWins();
});
