import {openWorkModal, openStudyModal} from './eventModalHandler.js';

export function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const loadingSpinner = document.getElementById('loadingSpinner');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        locale: 'pl',
        editable: false,
        selectable: false,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        slotMinTime: '06:00:00',
        slotMaxTime: '22:00:00',
        expandRows: true,
        contentHeight: '100%',
        slotDuration: '01:00:00',
        aspectRatio: 2,
        events: function (info, successCallback, failureCallback) {
            const startDate = info.startStr.split("T")[0];
            const endDate = info.endStr.split("T")[0];

            // Pokaż spinner
            loadingSpinner.style.display = 'block';

            fetch(`/get_calendar_events?start=${startDate}&end=${endDate}`)
                .then(response => {
                    if (!response.ok) throw new Error('Wystąpił nieoczekiwany błąd');
                    return response.json();
                })
                .then(events => {
                    successCallback(events);
                })
                .catch(error => {
                    failureCallback(error);
                })
                .finally(() => {
                    // Ukryj spinner po zakończeniu ładowania
                    loadingSpinner.style.display = 'none';
                });
        },

        datesSet: function () {
            calendar.refetchEvents();
        },
        eventClick: function (info) {
            const eventId = info.event.id;
            const eventData = info.event.extendedProps;

            if (eventData.type === 'work') {
                openWorkModal(eventId, eventData);
            } else if (eventData.type === 'study') {
                openStudyModal(eventId, eventData);
            }
        }
    });

    calendar.render();
    return calendar;
}
