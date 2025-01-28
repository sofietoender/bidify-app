import { apiKey, listingsUrl } from "../../constants/constants";

const placeBidBtn = document.getElementById("placeBidBtn");
const loginMessage = document.getElementById("loginMessage");
const bidAmountInput = document.getElementById("bidAmountInput");
const bidErrorMessage = document.getElementById("bidErrorMessage");
const bidSuccessMessage = document.getElementById("bidSuccessMessage");

const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
	placeBidBtn.classList.remove("hidden");
	bidAmountInput.classList.remove("hidden");
} else {
	loginMessage.classList.remove("hidden");
}

placeBidBtn.addEventListener("click", async () => {
	if (!accessToken) {
		alert("You must be logged in to place a bid.");
		return;
	}

	const listingId = new URLSearchParams(window.location.search).get("id");
	if (!listingId) {
		console.error("Listing ID not found in URL.");
		return;
	}

	const bidAmount = bidAmountInput.value;
	if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
		bidErrorMessage.textContent = "Please enter a valid bid amount."; // Generic error
		bidErrorMessage.classList.remove("hidden");
		bidSuccessMessage.classList.add("hidden"); // Hide success message on error
		return;
	}

	// Hide error message when bid is valid
	bidErrorMessage.classList.add("hidden");

	try {
		// Make the POST request to place the bid
		const response = await fetch(`${listingsUrl}/${listingId}/bids`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`, // Access token from localStorage
				"X-Noroff-API-Key": apiKey,
			},
			body: JSON.stringify({ amount: parseFloat(bidAmount) }),
		});

		const responseData = await response.json();

		// Log the response to check its structure
		console.log("Response Data:", responseData);

		if (!response.ok) {
			// Check for API error message and display it
			const errorMessage = responseData?.errors?.[0]?.message || "An error occurred while placing the bid.";
			console.log("Error Message:", errorMessage); // Log the error message
			bidErrorMessage.textContent = errorMessage; // Set the actual error message
			bidErrorMessage.classList.remove("hidden");
			bidSuccessMessage.classList.add("hidden"); // Hide success message on error
			return;
		}

		console.log("Bid placed successfully:", responseData);

		// Show success message
		bidSuccessMessage.classList.remove("hidden");
		bidErrorMessage.classList.add("hidden"); // Hide error message if the bid is successful

		// Clear the input field and reload the page after a successful bid
		bidAmountInput.value = "";
		setTimeout(() => {
			window.location.reload();
		}, 2000); // Wait 2 seconds before reloading
	} catch (error) {
		console.error("Error placing bid:", error);
		bidErrorMessage.textContent = "Failed to place bid. Please try again."; // Default error message
		bidErrorMessage.classList.remove("hidden");
		bidSuccessMessage.classList.add("hidden"); // Hide success message on error
	}
});
