export function displayListings(listings) {
	const container = document.getElementById("listings-container");
	container.innerHTML = "";

	const listingsWrapper = document.createElement("div");
	listingsWrapper.className = "flex gap-6 flex-wrap";

	listings.forEach((listing) => {
		const { id, title, media, _count, endsAt } = listing; // Use the id from the response
		const imageUrl = media && media.length > 0 ? media[0].url : "placeholder-image.jpg"; // Fallback image
		const bidCount = _count?.bids || 0;

		const endDate = new Date(endsAt);
		const formattedDate = endDate.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});

		// Create a link element for each listing card
		const cardLink = document.createElement("a");
		cardLink.href = `/auctions/listingDetail/index.html?id=${id}`; // Use the listing's ID as a query param
		cardLink.className = "w-60 overflow-hidden rounded-md bg-white shadow-md mx-auto";

		cardLink.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="w-full h-40 object-cover" />
            <p class="text-red mt-3 ml-3 text-base font-bold">${title}</p>
            <hr class="my-4 border-t-2 border-dotted border-gray" />
            <div class="flex items-center justify-between p-3">
                <div>
                    <p class="text-xs text-brown">Bids: ${bidCount}</p>
                    <p class="text-xs font-semibold text-customblack mt-1">${formattedDate}</p>
                </div>
                
            </div>
        `;

		// Append the card to the wrapper
		listingsWrapper.appendChild(cardLink);
	});

	// Append the wrapper to the container
	container.appendChild(listingsWrapper);
}
