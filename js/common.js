function fmtDate(d) { return new Date(d).toLocaleDateString(); }

function renderCurrentTripPill(el) {
  const trip = getCurrentTrip();
  el.innerHTML = trip
    ? `<div class="badge">Current</div> <strong>${trip.name}</strong> · ${fmtDate(trip.start)} → ${fmtDate(trip.end)}`
    : `<span class="muted">No trip selected</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("header nav a").forEach(a => {
    const target = a.getAttribute("href");
    if (target === here) a.classList.add("active");
    else a.classList.remove("active");
  });

  const slot = document.getElementById("current-trip");
  if (slot) renderCurrentTripPill(slot);

  const createForm = document.getElementById("create-trip-form");
  const list = document.getElementById("trip-list");
  let rangeEl = document.getElementById("trip-range");

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
      if (slot) renderCurrentTripPill(slot);
    });
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
        </div>`;
      list.appendChild(li);
    });

    list.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        setCurrentTrip(btn.dataset.id);
        bootstrapHome();
        const slot2 = document.getElementById("current-trip");
        if (slot2) renderCurrentTripPill(slot2);
      });
    });
  }

  bootstrapHome();

  const trip = getCurrentTrip();
  if (trip && (rangeEl)) {
    rangeEl.textContent = `${fmtDate(trip.start)} → ${fmtDate(trip.end)}`;
  }
});
