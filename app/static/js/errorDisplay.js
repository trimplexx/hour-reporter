export function displayError(errors, errorContainer) {
    errorContainer.innerHTML = errors.map(error => `<div>${error}</div>`).join('');
    errorContainer.classList.remove('d-none');
}
