const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("pass").value;

	const data = { email, password };

	try {
		const response = await fetch("https://v2.api.noroff.dev/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

		const responseData = await response.json();
		console.log("Login Response Data:", responseData);

		const accessToken = responseData.data.accessToken;
		const name = responseData.data.name;

		if (accessToken && name) {
			// Save the token and name to localStorage
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("username", name);
			console.log("Access token and username saved:", accessToken, name);

			window.location.href = "feed/index.html";
		} else {
			console.error("Access token or name is missing in the response.");
		}
	} catch (error) {
		console.error("Error:", error);
	}
});
