export function resetStudyModal() {
    const form = document.getElementById('dynamicForm');
    if (!form) return console.warn("Formularz dynamicForm nie jest dostępny.");

    document.getElementById('studyEventId')?.setAttribute('value', '');
    document.getElementById('studyDates')?.setAttribute('value', '');
    document.getElementById('studyStartTime')?.setAttribute('value', '');
    document.getElementById('studyEndTime')?.setAttribute('value', '');
    document.getElementById('subjectName')?.setAttribute('value', '');
    document.getElementById('courseType')?.setAttribute('value', '');

    const additionalFieldsContainer = document.getElementById("additionalFields");
    if (additionalFieldsContainer) additionalFieldsContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const studyModalTrigger = document.querySelector('[data-bs-target="#studyModal"]');

    if (studyModalTrigger) {
        studyModalTrigger.addEventListener('click', () => {
            resetStudyModal();
        });
    }
});

export function toggleOptionalFields(eventData) {
    const additionalFieldsContainer = document.getElementById("additionalFields");
    if (!additionalFieldsContainer) return console.warn("Container na dodatkowe pola nie jest dostępny.");

    ['day_of_week', 'instructor_name', 'room', 'week_type_id'].forEach(fieldKey => {
        if (eventData[fieldKey]) {
            window.addField(fieldKey, eventData[fieldKey]);
        }
    });
}

export function closeModals() {
    const workModal = bootstrap.Modal.getInstance(document.getElementById('workModal'));
    const studyModal = bootstrap.Modal.getInstance(document.getElementById('studyModal'));

    if (workModal) workModal.hide();
    if (studyModal) studyModal.hide();
}
