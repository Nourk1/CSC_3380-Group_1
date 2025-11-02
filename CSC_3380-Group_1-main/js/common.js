// common.js
function fmtDate(d) { return new Date(d).toLocaleDateString(); }

function renderCurrentTripPill(el) {
  const trip = getCurrentTrip();
  el.innerHTML = trip
    ? `<div class="badge">Current</div> <strong>${trip.name}</strong> · ${fmtDate(trip.start)} → ${fmtDate(trip.end)}`
    : `<span class="muted">No trip selected</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  // On every page: show current trip in a small slot if present
  const slot = document.getElementById("current-trip");
  if (slot) renderCurrentTripPill(slot);

  // Home page bootstrap
  const createForm = document.getElementById("create-trip-form");
  const list = document.getElementById("trip-list");
  const range = document.getElementById("trip-range");

  if (createForm) {
    createForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("trip-name").value.trim();
      const start = document.getElementById("trip-start").value;
      const end = document.getElementById("trip-end").value;
      if (!name || !start || !end) return;
      createTrip({ name, start, end });
      createForm.reset();
      bootstrapHome();
    });
  }

  function getTripStartDay(){
    const trip = getCurrentTrip();
    return trip.start;
  }
  
  function bootstrapHome() {
    if (!list) return;
    const trips = listTrips();
    list.innerHTML = "";
    if (trips.length === 0) {
      list.innerHTML = `<li class="muted">No trips yet — create one above.</li>`;
      return;
    }
    trips.forEach(t => {
      const li = document.createElement("li");
      const active = (getCurrentTrip()?.id === t.id) ? " (current)" : "";
      li.innerHTML = `
        <div>
          <strong>${t.name}</strong><div class="small">${fmtDate(t.start)} → ${fmtDate(t.end)}</div>
        </div>
        <div>
          <button class="secondary" data-id="${t.id}">${active ? "Selected" : "Select"}</button>
        </div>
        <div>
          <button class="danger" id="remove"> Remove </button>
        </div>`;
      list.appendChild(li);
    });

    list.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        setCurrentTrip(btn.dataset.id);
        bootstrapHome();
        const slot = document.getElementById("current-trip");
        if (slot) renderCurrentTripPill(slot);
      });
    })

    list.querySelectorAll("button[id]").forEach(btn => {
      btn.addEventListener("click", () => {
        removeTrip(btn.dataset.id);
        bootstrapHome();
      })
    });
  }

  bootstrapHome();

  // Calendar header date range (if present)
  const trip = getCurrentTrip();
  if (trip && (range = document.getElementById("trip-range"))) {
    range.textContent = `${fmtDate(trip.start)} → ${fmtDate(trip.end)}`;
  }
});
