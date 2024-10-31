document.addEventListener('DOMContentLoaded', function () {
    const beginForm = document.getElementById('beginWorkForm');
    const endForm = document.getElementById('endWorkForm');
    const toggleButton = document.getElementById('toggleWorkButton');

    function closeModal(modalId) {
        const modalElement = document.querySelector(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }

    if (beginForm) {
        beginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const response = await fetch(beginForm.action, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams(new FormData(beginForm))
            });
            if (response.ok) {
                toggleButton.textContent = 'Zakończ pracę';
                toggleButton.className = 'btn btn-danger';
                toggleButton.setAttribute('data-bs-target', '#endWorkModal');
                closeModal('#beginWorkModal');
            }
        });
    }

    if (endForm) {
        endForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const response = await fetch(endForm.action, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams(new FormData(endForm))
            });
            if (response.ok) {
                toggleButton.textContent = 'Rozpocznij pracę';
                toggleButton.className = 'btn btn-primary';
                toggleButton.setAttribute('data-bs-target', '#beginWorkModal');
                closeModal('#endWorkModal');
            }
        });
    }
});

