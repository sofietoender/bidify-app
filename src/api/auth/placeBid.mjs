const placeBidBtn = document.getElementById("placeBidBtn");
const loginMessage = document.getElementById("loginMessage");

const accessToken = localStorage.getItem("accessToken");
const apiKey = "6ec6b26b-2699-4267-a499-2ad741f04936"; // New API key

if (accessToken) {
	placeBidBtn.classList.remove("hidden");
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

	const bidAmount = prompt("Enter your bid amount:");
	if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
		alert("Please enter a valid bid amount.");
		return;
	}

	try {
		// Make the POST request to place the bid
		const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`, // Access token from localStorage
				"X-Noroff-API-Key": apiKey, // Correct API key header
			},
			body: JSON.stringify({ amount: parseFloat(bidAmount) }),
		});

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

		const responseData = await response.json();
		console.log("Bid placed successfully:", responseData);
		alert("Your bid has been placed successfully!");
		window.location.reload();
	} catch (error) {
		console.error("Error placing bid:", error);
		alert("Failed to place bid. Please try again.");
	}
});
