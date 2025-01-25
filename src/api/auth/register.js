// Register form and functionality
document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#registerForm");
	if (form) {
		form.addEventListener("submit", submitForm);
	}
});

// Handle form submission
async function submitForm(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);
	console.log(data);

	// Clean up the form data
	if (data.bio.trim() === "") {
		delete data.bio;
	}

	if (data.avatarUrl.trim() === "") {
		delete data.avatarUrl;
	} else {
		data.avatar = {
			url: data.avatarUrl,
			alt: `${data.name}'s avatar`,
		};
		delete data.avatarUrl;
	}

	console.log(data);

	try {
		await register(data);
		document.querySelector("#message").innerHTML =
			`<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">Successfully registered. Log in to create new listings or to bid on a listing</div>`;
	} catch (error) {
		console.log(error);
		document.querySelector("#message").innerHTML = `<div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">${error.message}</div>`;
	}
}

// API constants
const BASE_URL = "https://v2.api.noroff.dev";

// Register function
async function register(user) {
	const url = `${BASE_URL}/auth/register`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	};

	const response = await fetch(url, options);
	const json = await response.json();
	console.log(response);

	if (!response.ok) {
		throw new Error(json.errors?.[0]?.message || "Registration failed");
	}

	return json;
}
