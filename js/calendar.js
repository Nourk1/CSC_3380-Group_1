function clampToTrip(dateStr) { // Make sure a given date is clamped so it stays within a selected trip's range. 
  const trip = getCurrentTrip(); if (!trip) return dateStr;
  
  const d = new Date(dateStr); // Convert the 'Date' objects.
  const s = new Date(trip.start);
  const e = new Date(trip.end);
  
  if (d < s) return trip.start; // If the date is before the start or end date, return them respectively.
  if (d > e) return trip.end;
  return dateStr;
}

function renderAgenda(dateISO) { // Based on the specific date, render the agenda list.
  const trip = getCurrentTrip(); if (!trip) return;
  const container = document.getElementById("agenda-list");
  const items = trip.agenda[dateISO] || [];
  // Dynamically build the agenda list.
  container.innerHTML = ` 
    <h3>${new Date(dateISO).toLocaleDateString()}</h3>
    <ul class="list">
      ${items.map((it, i) => `
        <li>
          <div>
            <strong>${it.time || "—"}</strong> · ${it.text}
            ${it.tag ? ` <span class="badge">${it.tag}</span>` : ""}
          </div>
          <button class="danger" data-rm="${i}">Remove</button>
        </li>`).join("")}
    </ul>
  `;

  container.querySelectorAll("button[data-rm]").forEach(btn => { // For each 'Remove' button, add event listeners.
    btn.addEventListener("click", () => {
      removeAgenda(dateISO, Number(btn.dataset.rm));
      renderAgenda(dateISO);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => { // When the page is ready, initialize the agenda functionality.
  const trip = getCurrentTrip();
  if (!trip) return;

  const dateInput = document.getElementById("agenda-date"); // Set the date input's limits to the start and end dates of the trip. 
  dateInput.min = trip.start;
  dateInput.max = trip.end;
  dateInput.value = trip.start;

  renderAgenda(trip.start); // Render the agenda for the first trip by default.

  document.getElementById("add-agenda").addEventListener("click", () => { // For the 'Add to day' button, add event listeners.
    const dateISO = clampToTrip(dateInput.value || trip.start);
    const text = document.getElementById("agenda-item").value.trim();
    const time = document.getElementById("agenda-time").value;
    if (!text) return;
    const inferredTag = /flight|plane|depart|arrival/i.test(text) ? "Travel" :
                        /check-?in|check-?out/i.test(text) ? "Lodging" : "";
    upsertAgenda(dateISO, { text, time, tag: inferredTag });
    document.getElementById("agenda-item").value = "";
    document.getElementById("agenda-time").value = "";
    renderAgenda(dateISO);
  });

  dateInput.addEventListener("change", () => renderAgenda(dateInput.value || trip.start)); // When the selected date changes, update the agenda view.
});
