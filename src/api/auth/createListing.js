import { apiKey, baseUrl } from "./constants";

// Get access token from localStorage
function getAuthToken() {
	const accessToken = localStorage.getItem("accessToken");

	if (!accessToken) {
		console.error("Access token is missing. Redirecting to login.");
		window.location.href = "/login.html"; // Redirect if not logged in
	}

	return { accessToken, apiKey };
}

// Function to create a new listing
export async function createListing(event) {
	event.preventDefault(); // Prevent form from reloading the page

	const { accessToken, apiKey } = getAuthToken(); // Retrieve auth credentials

	// Gather form input values
	const title = document.getElementById("title").value.trim();
	const description = document.getElementById("description").value.trim();
	const endsAt = document.getElementById("endsAt").value;
	const tagsInput = document.getElementById("tags").value;
	const mediaInput = document.getElementById("media").value;
	const altTextInput = document.getElementById("alt-text").value;

	// Validate form inputs
	if (!title || !description || !endsAt) {
		console.error("All required fields must be filled out.");
		return;
	}

	// Format tags and media
	const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];
	const mediaUrls = mediaInput ? mediaInput.split(",").map((url) => url.trim()) : [];
	const altTexts = altTextInput ? altTextInput.split(",").map((alt) => alt.trim()) : [];
	const media = mediaUrls.map((url, index) => ({
		url,
		alt: altTexts[index] || "", // Use empty string if no alt text is provided
	}));

	// Construct listing object
	const listingData = { title, description, tags, media, endsAt };

	try {
		const response = await fetch(`${baseUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`, // Include token
				"X-Noroff-API-Key": apiKey, // Include API key
			},
			body: JSON.stringify(listingData),
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || "Failed to create listing");

		// Success message
		const message = document.getElementById("message");
		message.textContent = "Listing created successfully!";
		message.classList.add("text-green-600");

		// Reset form after successful submission
		document.getElementById("createListingForm").reset();
	} catch (error) {
		console.error("Error creating listing:", error);
		const message = document.getElementById("message");
		message.textContent = error.message;
		message.classList.add("text-red-600");
	}
}

// Add event listener to form submit after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("createListingForm");
	if (form) {
		form.addEventListener("submit", createListing);
	}
});
