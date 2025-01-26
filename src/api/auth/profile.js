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
