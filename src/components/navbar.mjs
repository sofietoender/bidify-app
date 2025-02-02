function addMenuToggle() {
	const menuButton = document.getElementById("menuButton");
	const mobileMenu = document.getElementById("mobileMenu");

	if (menuButton && mobileMenu) {
		menuButton.addEventListener("click", () => {
			// Toggle visibility and stack the links vertically
			mobileMenu.classList.toggle("hidden"); // Show/hide the mobile menu
			mobileMenu.classList.toggle("flex"); // Make sure it's a flex container
			mobileMenu.classList.toggle("flex-col"); // Stack links vertically
			mobileMenu.classList.toggle("space-y-4"); // Add space between links
		});
	} else {
		console.error("Menu elements not found.");
	}
}

export function loadNavbar(containerId) {
	const accessToken = localStorage.getItem("accessToken"); // Get the access token from localStorage

	// Navbar links for logged-in users
	const loggedInLinks = `
		<a href="/auth/profile/index.html" class="px-3 py-2 text-customblack">Profile</a>
		<a href="/auctions/newListing/index.html" class="px-3 py-2 text-customblack">Create listing</a>
		<a href="/index.html" id="logoutButton" class="px-3 py-2 text-customblack">Log out</a>
	`;

	// Navbar links for non-logged-in users
	const loggedOutLinks = `
		<a href="/auth/login/index.html" class="px-3 py-2 text-customblack">Log in</a>
		<a href="/auth/register/index.html" class="px-3 py-2 text-customblack">Register</a>
	`;

	const navbarHtml = `
		<nav>
			<div class="mx-auto flex max-w-7xl items-center justify-between border-solid border-b-red p-3">
				<a href="/index.html" class="text-xl font-bold text-red">Bidify</a>
				<div class="block lg:hidden">
					<button id="menuButton">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>
				<div class="hidden space-x-4 lg:flex">
					${accessToken ? loggedInLinks : loggedOutLinks} 
				</div>
			</div>
			<div id="mobileMenu" class="hidden p-4 lg:hidden items-center">
				${accessToken ? loggedInLinks : loggedOutLinks} 
			</div>
		</nav>
	`;

	const container = document.getElementById(containerId);
	if (container) {
		container.innerHTML = navbarHtml;
		addMenuToggle();
		if (accessToken) {
			document.getElementById("logoutButton")?.addEventListener("click", logout);
		}
	} else {
		console.error(`Element with id ${containerId} not found.`);
	}
}

function logout() {
	// Clear the access token and reload the page
	localStorage.removeItem("accessToken");
	location.reload();
}
