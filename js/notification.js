// ==============================
// Notifications for Itinerary Planner
// ==============================

// ---------- STATE MANAGEMENT ----------
function getNotifications() {
  const st = loadState();
  return st.notifications || [];
}

function saveNotifications(list) {
  const st = loadState();
  st.notifications = list;
  saveState(st);
}

// ---------- UNIQUE ID ----------
function uuid() {
  return crypto.randomUUID();
}

// ---------- ADD NOTIFICATION ----------
async function addNotification(message, date, time, options = {}) {
  const notifications = getNotifications();

  // Prevent duplicates for same event & day
  const exists = notifications.some(
    (n) => n.message === message && n.date === date && n.time === time
  );
  if (exists) return;

  const newNotif = {
    id: uuid(),
    message,
    date,
    time,
    read: false,
    createdAt: new Date().toISOString(),
    type: options.type || "default"
  };

  notifications.push(newNotif);
  saveNotifications(notifications);

  updateNotificationBadge();
  renderNotifications();

  // Optional browser push
  if (options.browserPopup) {
    sendBrowserNotification("Trip Reminder", message);
  }
}

// ---------- MARK AS READ ----------
function markAsRead(id) {
  const list = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(list);
  updateNotificationBadge();
}

// ---------- DELETE ----------
function deleteNotification(id) {
  const filtered = getNotifications().filter((n) => n.id !== id);
  saveNotifications(filtered);
  updateNotificationBadge();
  renderNotifications();
}

// ---------- BROWSER NOTIFICATION POPUP ----------
function sendBrowserNotification(title, body) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
    return;
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification(title, { body });
      }
    });
  }
}

// ---------- UPCOMING EVENT CHECK ----------
function checkUpcomingEvents() {
  const trip = getCurrentTrip();
  if (!trip || !trip.agenda) return;

  const today = new Date();
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  Object.entries(trip.agenda).forEach(([date, items]) => {
    const eventDate = new Date(`${date}T00:00:00`);
    const diffDays = Math.floor((eventDate - dayStart) / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === 1) {
      const label = diffDays === 0 ? "Today" : "Tomorrow";

      items.forEach((item) => {
        const timeStr = item.time ? ` at ${item.time}` : "";
        const msg = `${label}${timeStr}: ${item.text}`;

        addNotification(msg, date, item.time, {
          type: "event-reminder",
          browserPopup: true // send popup too
        });
      });
    }
  });
}

// ---------- BADGE UPDATE ----------
function updateNotificationBadge() {
  const badge = document.getElementById("notif-badge");
  const bell = document.getElementById("notif-bell");
  const unread = getNotifications().filter((n) => !n.read).length;

  if (!badge || !bell) return;

  if (unread > 0) {
    badge.textContent = unread;
    badge.classList.remove("hidden");
    bell.textContent = "🔔";
  } else {
    badge.classList.add("hidden");
    bell.textContent = "🔕";
  }
}

// ---------- RENDER NOTIFICATION PANEL ----------
function renderNotifications() {
  const list = document.getElementById("notif-list");
  if (!list) return;

  const notifications = getNotifications().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (notifications.length === 0) {
    list.innerHTML = `
      <div class="empty-notifs">
        No notifications yet
      </div>
    `;
    return;
  }

  list.innerHTML = notifications
    .map((n) => {
      return `
        <div class="notif-item ${n.read ? "" : "unread"}" data-id="${n.id}">
          <div class="notif-header">
            <span class="notif-message">${n.message}</span>
            <button class="notif-delete" data-delete="${n.id}">✕</button>
          </div>
          <div class="notif-time">${new Date(n.createdAt).toLocaleString()}</div>
        </div>
      `;
    })
    .join("");

  // Click to mark read
  list.querySelectorAll(".notif-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (!e.target.classList.contains("notif-delete")) {
        markAsRead(el.dataset.id);
        el.classList.remove("unread");
      }
    });
  });

  // Delete button
  list.querySelectorAll(".notif-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNotification(btn.dataset.delete);
    });
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  const bell = document.getElementById("notif-bell");
  const panel = document.getElementById("notif-panel");
  const closeBtn = document.getElementById("close-notif");

  if (bell) {
    bell.addEventListener("click", () => {
      panel.classList.toggle("hidden");
      renderNotifications();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.classList.add("hidden");
    });
  }

  // Initial checks
  checkUpcomingEvents();
  updateNotificationBadge();

  // Check every minute
  setInterval(() => {
    checkUpcomingEvents();
    updateNotificationBadge();
  }, 60000);
});
