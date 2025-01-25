export async function fetchData() {
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
