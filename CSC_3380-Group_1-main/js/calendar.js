// calendar.js
function clampToTrip(dateStr) {
  const trip = getCurrentTrip(); if (!trip) return dateStr;
  const d = new Date(dateStr);
  const s = new Date(trip.start);
  const e = new Date(trip.end);
  if (d < s) return trip.start;
  if (d > e) return trip.end;
  return dateStr;
}

function renderAgenda(dateISO) {
  const trip = getCurrentTrip(); if (!trip) return;
  const container = document.getElementById("agenda-list");
  const items = trip.agenda[dateISO] || [];
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

  container.querySelectorAll("button[data-rm]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeAgenda(dateISO, Number(btn.dataset.rm));
      renderAgenda(dateISO);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const trip = getCurrentTrip();
  if (!trip) return;

  const dateInput = document.getElementById("agenda-date");
  dateInput.min = trip.start;
  dateInput.max = trip.end;
  dateInput.value = trip.start;

  renderAgenda(trip.start);

  document.getElementById("add-agenda").addEventListener("click", () => {
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

  dateInput.addEventListener("change", () => renderAgenda(dateInput.value || trip.start));
});
