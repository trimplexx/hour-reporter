import {displayError} from './errorDisplay.js';

export function setupFormSubmission(dynamicForm, errorContainer) {
    dynamicForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(dynamicForm);
        const actionUrl = dynamicForm.getAttribute('action');

        errorContainer.innerHTML = '';
        errorContainer.classList.add('d-none');

        fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        if (data.errors) displayError(data.errors, errorContainer);
                        else if (data.error) displayError([data.error], errorContainer);
                    });
                } else {
                    return response.json().then(data => {
                        alert(data.message);
                        window.location.reload();
                    });
                }
            })
            .catch(err => {
                displayError(['Wystąpił błąd. Proszę spróbować ponownie.'], errorContainer);
            });
    });
}
