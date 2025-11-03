import { Calendar } from 'fullcalendar';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcaleNovember 2025ndar/interaction';


document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    initialView: 'dayGridMonth',
  })
  calendar.changeView
  calendar.render();
});



