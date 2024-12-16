document.addEventListener("DOMContentLoaded", async () => {
    const now = dayjs();
    const daysInMonth = now.daysInMonth();
    const firstDayOfMonth = now.startOf("month").day();
    const currentDay = now.date();

    const calendar = document.getElementById("calendar");

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const daysHeader = daysOfWeek
        .map((day) => `<div class="day-header">${day}</div>`)
        .join("");

    let daysHTML = '<div class="days-grid">';
    for (let i = 0; i < (firstDayOfMonth || 7) - 1; i++) {
        daysHTML += '<div class="day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDay ? "today" : "";
        daysHTML += `<div class="day ${isToday}">${day}</div>`;
    }
    daysHTML += "</div>";

    calendar.innerHTML = `
    <h2>${now.format("MMMM YYYY")}</h2>
    <div class="calendar-grid">
      ${daysHeader}
      ${daysHTML}
    </div>
  `;

    await getRandomFact();
});
