function addMenuToggle() {
	const menuButton = document.getElementById("menuButton");
	const mobileMenu = document.getElementById("mobileMenu");

	if (menuButton && mobileMenu) {
		menuButton.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
		});
	} else {
		console.error("Menu elements not found.");
	}
}

export function loadNavbar(containerId) {
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
                 
                    <a href="/auth/profile/index.html" class="px-3 py-2 text-customblack">Profile</a>
                     <a href="/auth/login/index.html" class="px-3 py-2 text-customblack">Log in</a>
                    <a href="/auth/register/index.html" class="px-3 py-2 text-customblack">Register</a>
                </div>
            </div>
            <div id="mobileMenu" class="hidden p-4 lg:hidden">
               
                <a href="/auth/profile/index.html" class="block rounded-md px-3 py-2 text-customblack">Profile</a>
                <a href="/auth/login/index.html" class="block rounded-md px-3 py-2 text-customblack">Log in</a>
                <a href="/auth/regsiter/index.html" class="block rounded-md px-3 py-2 text-customblack">Register</a>
            </div>
        </nav>
    `;

	const container = document.getElementById(containerId);
	if (container) {
		container.innerHTML = navbarHtml;
		addMenuToggle();
	} else {
		console.error(`Element with id ${containerId} not found.`);
	}
}
