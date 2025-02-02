/**
 * Handles user login by sending credentials to the authentication API.
 * Redirects to the profile page upon successful login.
 */

import { loginUrl } from "../../constants/constants";

/**
 * Selects the login form element.
 * @type {HTMLFormElement}
 */
const form = document.getElementById("loginForm");

/**
 * Event listener for form submission.
 * Prevents default form submission and sends login request.
 */
form.addEventListener("submit", async (event) => {
	event.preventDefault();

	/**
	 * Retrieves email and password values from input fields.
	 * @type {string}
	 */
	const email = document.getElementById("email").value;
	const password = document.getElementById("pass").value;

	/**
	 * Login request payload.
	 * @type {{email: string, password: string}}
	 */
	const data = { email, password };

	try {
		const response = await fetch(`${loginUrl}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

		/**
		 * Response data from the API.
		 * @type {{data: {accessToken: string, name: string}}}
		 */
		const responseData = await response.json();
		console.log("Login Response Data:", responseData);

		const accessToken = responseData.data.accessToken;
		const name = responseData.data.name;

		if (accessToken && name) {
			// Save the token and name to localStorage
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("username", name);
			console.log("Access token and username saved:", accessToken, name);

			// Redirect to profile page
			window.location.href = "../profile/index.html";
		} else {
			console.error("Access token or name is missing in the response.");
		}
	} catch (error) {
		console.error("Error:", error);
	}
});
