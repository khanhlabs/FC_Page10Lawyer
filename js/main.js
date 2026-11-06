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

const datePicker = document.querySelector(".date-picker");
const dateInput = datePicker?.querySelector(".date-field");

if (datePicker && dateInput) {
    const calendar = document.createElement("div");
    calendar.className = "date-calendar";
    calendar.hidden = true;
    datePicker.appendChild(calendar);

    let displayedMonth = new Date();
    let selectedDate = null;

    function formatDate(date) {
        return date.toLocaleDateString("en-GB");
    }

    function renderCalendar() {
        const year = displayedMonth.getFullYear();
        const month = displayedMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const previousMonthDays = new Date(year, month, 0).getDate();
        const startDay = (firstDay.getDay() + 6) % 7;
        const totalDays = Math.ceil((startDay + daysInMonth) / 7) * 7;

        calendar.innerHTML = `
            <div class="date-calendar-header">
                <button class="date-calendar-nav" type="button" data-month="-1" aria-label="Previous month">&lsaquo;</button>
                <span class="date-calendar-title">${displayedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                <button class="date-calendar-nav" type="button" data-month="1" aria-label="Next month">&rsaquo;</button>
            </div>
            <div class="date-calendar-week">
                ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => `<span>${day}</span>`).join("")}
            </div>
            <div class="date-calendar-days">
                ${Array.from({ length: totalDays }, (_, index) => {
                    const dayOffset = index - startDay;
                    const day = dayOffset < 0
                        ? previousMonthDays + dayOffset + 1
                        : dayOffset >= daysInMonth ? dayOffset - daysInMonth + 1 : dayOffset + 1;
                    const date = new Date(year, month + (dayOffset < 0 ? -1 : dayOffset >= daysInMonth ? 1 : 0), day);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isMuted = date.getMonth() !== month;
                    return `<button class="date-calendar-day${isMuted ? " is-muted" : ""}${isSelected ? " is-selected" : ""}" type="button" data-date="${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}">${day}</button>`;
                }).join("")}
            </div>
        `;
    }

    dateInput.addEventListener("click", () => {
        calendar.hidden = !calendar.hidden;
        if (!calendar.hidden) renderCalendar();
    });

    calendar.addEventListener("click", (event) => {
        const monthButton = event.target.closest("[data-month]");
        const dayButton = event.target.closest("[data-date]");

        if (monthButton) {
            displayedMonth.setMonth(displayedMonth.getMonth() + Number(monthButton.dataset.month));
            renderCalendar();
            return;
        }

        if (dayButton) {
            const [year, month, day] = dayButton.dataset.date.split("-").map(Number);
            selectedDate = new Date(year, month - 1, day);
            dateInput.value = formatDate(selectedDate);
            calendar.hidden = true;
        }
    });

    document.addEventListener("click", (event) => {
        if (!datePicker.contains(event.target)) calendar.hidden = true;
    });
}