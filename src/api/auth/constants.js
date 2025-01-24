const baseUrl = "https://v2.api.noroff.dev/auction/listings";

async function fetchData() {
	try {
		const response = await fetch(baseUrl);
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		const { data } = await response.json();
		displayListings(data);
	} catch (error) {
		console.error("Fetch error:", error.message);
	}
}

function displayListings(listings) {
	const container = document.getElementById("listings-container");
	container.innerHTML = "";

	const listingsWrapper = document.createElement("div");
	listingsWrapper.className = "flex gap-6 flex-wrap";

	const filteredListings = listings.filter((listing) => listing.media && listing.media.length > 0 && listing.media[0].url).slice(0, 10);

	filteredListings.forEach((listing) => {
		const { title, media, _count, endsAt } = listing;
		const imageUrl = media[0].url;
		const bidCount = _count?.bids || 0;

		const endDate = new Date(endsAt);
		const formattedDate = endDate.toLocaleString("en-US", {
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});

		const card = document.createElement("div");
		card.className = "w-60 overflow-hidden rounded-md bg-white shadow-md mx-auto";

		card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="w-full h-40 object-cover" />
            <p class="text-red mt-3 ml-3 text-base font-bold">${title}</p>
            <hr class="my-4 border-t-2 border-dotted border-gray" />
            <div class="flex items-center justify-between p-3">
                <div>
                    <p class="text-xs text-brown">Bids: ${bidCount}</p>
                    <p class="text-xs font-semibold text-customblack mt-1">${formattedDate}</p>
                </div>
                <div class="bg-brown rounded-full p-0.5 w-[55px]">
                    <p class="text-center font-bold text-[12px] text-white p-0.5">$ ???</p>
                </div>
            </div>
        `;

		listingsWrapper.appendChild(card);
	});

	container.appendChild(listingsWrapper);
}

fetchData();
