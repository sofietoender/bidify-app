export function loadNavbar(containerId) {
	const container = document.getElementById(containerId);
	if (!container) {
		console.error(`Element with id ${containerId} not found.`);
		return;
	}

	// Opprett nav-elementet
	const nav = document.createElement("nav");
	nav.classList.add("border-b", "border-solid", "border-red-500", "p-3");

	nav.innerHTML = `
        <div class="mx-auto flex max-w-7xl items-center justify-between">
            <a href="/index.html" class="text-xl font-bold text-red-500">Bidify</a>
            <div class="block lg:hidden">
                <button id="menuButton">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div class="hidden space-x-4 lg:flex">
                <a href="/auctions/index.html" class="px-3 py-2 text-customblack">All auctions</a>
                <a href="/auth/profile/index.html" class="px-3 py-2 text-customblack">Profile</a>
            </div>
        </div>
        <div id="mobileMenu" class="hidden p-4 lg:hidden">
            <a href="/auctions/index.html" class="block rounded-md px-3 py-2 text-customblack">All auctions</a>
            <a href="/auth/profile/index.html" class="block rounded-md px-3 py-2 text-customblack">Profile</a>
        </div>
    `;

	container.appendChild(nav);
	addMenuToggle();
}
