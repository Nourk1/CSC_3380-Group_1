const STORAGE_KEY = "tripit.v2"; // Key is used to store everything to a browser's localStorage.

function loadState() { // Loads all stored data from localStorage.
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { trips: [], currentTripId: null }; }
  catch { return { trips: [], currentTripId: null }; }
}

function saveState(state) { // Saves the state to localStorage.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getState() { return loadState(); } // A getter to load the latest stored data.

function createTrip({ name, start, end }) { // Creates a new trip and makes it active.
  const st = loadState();
  const id = crypto.randomUUID();
  st.trips.push({ id, name, start, end, agenda: {}, packing: [], weatherCache: {} });
  st.currentTripId = id;
  saveState(st);
  return id;
}

function listTrips() { return loadState().trips; } // Returns an array of all of the saved trips.

function setCurrentTrip(id) { // Sets a specific trip as 'active'.
  const st = loadState();
  st.currentTripId = id;
  saveState(st);
}

function removeTrip(id) { // Removes a trip based on its ID.
  const st = loadState();
  const idx = st.trips.findIndex(t => t.id === id);
  if (idx >= 0) st.trips.splice(idx, 1);
  if (st.currentTripId === id) {
    st.currentTripId = st.trips[0]?.id ?? null;
  }
  saveState(st);
}

function getCurrentTrip() { // Gets the currently selected trip.
  const st = loadState();
  return st.trips.find(t => t.id === st.currentTripId) || null;
}

function updateTrip(partial) { // Updates the current trip's data.
  const st = loadState();
  const idx = st.trips.findIndex(t => t.id === st.currentTripId);
  if (idx === -1) return;
  st.trips[idx] = { ...st.trips[idx], ...partial };
  saveState(st);
}

function upsertAgenda(dateISO, entry) { // Creates a new agenda for a specific date.
  const trip = getCurrentTrip();
  if (!trip) return;
  const day = trip.agenda[dateISO] || [];
  day.push(entry);
  trip.agenda[dateISO] = day;
  updateTrip({ agenda: trip.agenda });
}

function removeAgenda(dateISO, index) { // Removes an agenda for a specific date.
  const trip = getCurrentTrip();
  if (!trip || !trip.agenda[dateISO]) return;
  trip.agenda[dateISO].splice(index, 1);
  updateTrip({ agenda: trip.agenda });
}

function setPacking(list) { // Replaces the current trip's packing list.
  const trip = getCurrentTrip();
  if (!trip) return;
  trip.packing = list;
  updateTrip({ packing: list });
}

function cacheWeather(city, payload) { // Caches the weather data for a city.
  const trip = getCurrentTrip();
  if (!trip) return;
  trip.weatherCache[city.toLowerCase()] = { payload, cachedAt: Date.now() };
  updateTrip({ weatherCache: trip.weatherCache });
}

function getCachedWeather(city) { // Retrieves the cached weather for a city.
  const trip = getCurrentTrip();
  if (!trip) return null;
  const hit = trip.weatherCache[city?.toLowerCase?.()];
  if (!hit) return null;
  return (Date.now() - hit.cachedAt) < 6 * 3600 * 1000 ? hit.payload : null;
}
