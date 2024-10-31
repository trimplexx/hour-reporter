import {resetStudyModal, toggleOptionalFields, closeModals} from './modalUtils.js';
import {deleteEvent} from './deleteEventHandler.js';

export function openWorkModal(eventId, eventData) {
    const form = document.getElementById('workForm');
    form.setAttribute('action', form.getAttribute('data-update-endpoint'));
    document.getElementById('workEventId').value = eventId;
    document.getElementById('workDate').value = eventData.date;
    document.getElementById('startTime').value = eventData.start_time;
    document.getElementById('endTime').value = eventData.end_time;

    const deleteButton = document.getElementById('deleteWorkButton');
    deleteButton.style.display = 'inline';
    deleteButton.onclick = () => deleteEvent(eventId, '/delete_work_hours');

    new bootstrap.Modal(document.getElementById('workModal')).show();
}

export function openStudyModal(eventId, eventData) {
    resetStudyModal();
    const form = document.getElementById('dynamicForm');
    if (!form) return console.warn("Formularz dynamicForm nie jest dostępny.");

    form.setAttribute('action', form.getAttribute('data-update-endpoint'));

    // Ustawianie wartości pól formularza
    document.getElementById('studyEventId')?.setAttribute('value', eventId);
    document.getElementById('studyDates')?.setAttribute('value', eventData.date || '');
    document.getElementById('studyStartTime')?.setAttribute('value', eventData.start_time || '');
    document.getElementById('studyEndTime')?.setAttribute('value', eventData.end_time || '');
    document.getElementById('subjectName')?.setAttribute('value', eventData.subject_name || '');
    document.getElementById('courseType')?.setAttribute('value', eventData.course_type_id || '');

    toggleOptionalFields(eventData);

    const deleteButton = document.getElementById('deleteStudyButton');
    if (deleteButton) {
        deleteButton.style.display = 'inline';
        deleteButton.onclick = () => deleteEvent(eventId, '/delete_study_schedule');
    }

    new bootstrap.Modal(document.getElementById('studyModal')).show();
}
