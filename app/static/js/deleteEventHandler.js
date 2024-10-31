export function deleteEvent(eventId, deleteEndpoint) {
    fetch(deleteEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event_id: eventId})
    })
        .then(response => {
            if (response.ok) {
                calendar.refetchEvents();
                closeModals();
            }
        })
        .catch(error => console.error('Błąd:', error));
}
