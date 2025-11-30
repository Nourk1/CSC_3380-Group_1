// Calendar View - Shows agenda items in a monthly calendar

let currentMonth = new Date();

function renderCalendar() {
  const trip = getCurrentTrip();
  const grid = document.getElementById('calendar-grid');
  const monthTitle = document.getElementById('current-month');
  
  if (!grid || !monthTitle) return;

  // Update month title
  monthTitle.textContent = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Get days in month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Build calendar HTML
  let html = '';
  
  // Day headers
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    html += `<div class="calendar-day-header">${day}</div>`;
  });

  // Empty cells before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  // Days of the month
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const isToday = dateStr === todayStr;
    const isInTrip = trip ? isDateInTrip(date, trip) : false;
    const agenda = trip?.agenda?.[dateStr] || [];

    let classes = 'calendar-day';
    if (isInTrip) classes += ' in-trip';
    if (isToday) classes += ' today';

    html += `<div class="${classes}">
      <div class="day-number">${day}</div>
      <div class="agenda-items">
        ${agenda.slice(0, 3).map(item => {
          const icon = item.tag === 'Travel' ? '✈️' : 
                      item.tag === 'Lodging' ? '🏠' : 
                      item.time ? '🕐' : '';
          const itemClass = item.tag === 'Travel' ? 'travel' : 
                           item.tag === 'Lodging' ? 'lodging' : '';
          return `
            <div class="agenda-item ${itemClass}" title="${item.text}">
              ${icon ? `<span class="agenda-item-icon">${icon}</span>` : ''}
              <span>${item.text}</span>
            </div>
          `;
        }).join('')}
        ${agenda.length > 3 ? `<div class="agenda-more">+${agenda.length - 3} more</div>` : ''}
      </div>
    </div>`;
  }

  grid.innerHTML = html;
}

function isDateInTrip(date, trip) {
  const dateStr = date.toISOString().split('T')[0];
  return dateStr >= trip.start && dateStr <= trip.end;
}

function changeMonth(delta) {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1);
  renderCalendar();
}

function goToToday() {
  currentMonth = new Date();
  renderCalendar();
}

document.addEventListener('DOMContentLoaded', () => {
  const trip = getCurrentTrip();
  
  if (trip) {
    // Start at trip start month
    currentMonth = new Date(trip.start + 'T00:00:00');
  }

  renderCalendar();

  // Navigation buttons
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const todayBtn = document.getElementById('today-btn');

  if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));
  if (todayBtn) todayBtn.addEventListener('click', goToToday);
});
