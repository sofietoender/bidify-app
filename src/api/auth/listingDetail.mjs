import { baseUrl } from "./constants.js"; // Adjust the import path based on your file structure

export async function fetchListingDetails() {
	// Get the listing ID from the URL query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const listingId = urlParams.get("id");

	if (!listingId) {
		console.error("No listing ID found in URL.");
		document.getElementById("listing-detail-container").innerHTML = "<p>No listing ID found in the URL.</p>";
		return;
	}

	try {
		// Fetch the listing data using the listing ID
		const response = await fetch(`${baseUrl}/${listingId}?_bids=true&_seller=true`);

		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}

		const result = await response.json(); // Get the entire response
		const listing = result.data; // Extract the listing data from the response

		// Display the listing details
		displayListingDetails(listing);
	} catch (error) {
		console.error("Error fetching listing details:", error.message);
		document.getElementById("listing-detail-container").innerHTML = "<p>Error loading listing details.</p>";
	}
}

function displayListingDetails(listing) {
	const { title, media, _count, endsAt, description, price, bids } = listing; // Destructure the listing
	const bidCount = _count?.bids || 0;
	const endDate = new Date(endsAt);
	const formattedDate = endDate.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

	// Sort the bids from highest to lowest
	const sortedBids = bids?.sort((a, b) => b.amount - a.amount) || [];

	// Update the price to show the highest bid if there are any bids
	const highestBidAmount = sortedBids.length > 0 ? sortedBids[0].amount : price;

	const container = document.getElementById("listing-detail-container");

	// Inject the listing details into the page
	container.innerHTML = `
        <div class="flex">
            <!-- Main Image -->
            <div class="flex-1">
                <img src="${media && media.length > 0 ? media[0].url : "placeholder-image.jpg"}" alt="${title}" class="w-full border-red border rounded-md h-80 object-cover" />
            </div>
            <!-- Image Gallery -->
            <div class=" ml-3 flex-1 grid grid-cols-3 gap-2">
                ${
									media && media.length > 0
										? media
												.map(
													(image) => `
                    <img src="${image.url}" alt="${title}" class="w-full h-32 object-cover rounded-md border border-red cursor-pointer" />
                `
												)
												.join("")
										: "<p>No additional images available.</p>"
								}
            </div>
        </div>

		

        <h1 class="text-2xl font-bold mt-4">${title}</h1>
        <p class="text-gray-700 mt-2">${description || "No description available."}</p>
        <hr class="my-4 border-t-2 border-dotted border-gray" />
        <div class="flex items-center justify-between p-3">
            <div>
                <p class="text-xs text-brown">Bids: ${bidCount}</p>
                <p class="text-xs font-semibold text-customblack mt-1">Ends: ${formattedDate}</p>
            </div>
			
            <div class="bg-brown rounded-full p-0.5 w-[80px]">
			
                <p class="text-center font-bold text-[12px] text-white p-0.5">$${highestBidAmount || "N/A"}</p>
            </div>
        </div>
        
    `;

	// Display bids
	const bidsContainer = document.getElementById("bids-container");
	if (sortedBids.length > 0) {
		sortedBids.forEach((bid) => {
			const { amount, bidder } = bid;
			const { name, avatar } = bidder;

			const bidElement = document.createElement("div");
			bidElement.className = "p-4 border-b border-gray-200";
			bidElement.innerHTML = `
                <div class="flex items-center">
                    <img src="${avatar.url}" alt="${avatar.alt}" class="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <p class="font-semibold">${name}</p>
                    </div>
                </div>
                <div class="mt-2">
                    <p class="text-lg font-bold text-brown">Bid: $${amount}</p>
                </div>
            `;
			bidsContainer.appendChild(bidElement);
		});
	} else {
		bidsContainer.innerHTML = "<p>No bids placed yet.</p>";
	}
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchListingDetails);
