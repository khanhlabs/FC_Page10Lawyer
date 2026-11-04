const menuToggle = document.querySelector(".menu-toggle");
const navbarNav = document.querySelector(".navbar-nav");
const navbarMenu = document.querySelector(".navbar-menu");
const navLinks = document.querySelectorAll(".nav-item a");

// Toggle menu
menuToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

// Click navigation item
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// Click outside
document.addEventListener("click", (event) => {
    if (
        !menuToggle.contains(event.target) &&
        !navbarMenu.contains(event.target)
    ) {
        closeMenu();
    }
});

// Close menu
function closeMenu() {
    navbarMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

// Press Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});