import {addField} from './fieldHandler.js';
import {setupFormSubmission} from './formHandler.js';
import {initializeCalendar} from './calendarSetup.js';

document.addEventListener("DOMContentLoaded", () => {
    const dynamicForm = document.getElementById("dynamicForm");
    const errorContainer = document.createElement("div");
    dynamicForm.prepend(errorContainer);
    errorContainer.classList.add("alert", "alert-danger", "d-none");

    setupFormSubmission(dynamicForm, errorContainer);

    const fieldDropdown = document.getElementById("fieldDropdown");
    const additionalFieldsContainer = document.getElementById("additionalFields");

    // Obsługa dodawania dodatkowych pól
    fieldDropdown.addEventListener("change", () => {
        const selectedOption = fieldDropdown.value;
        if (selectedOption && !additionalFieldsContainer.querySelector(`[data-field-key="${selectedOption}"]`)) {
            addField(selectedOption);
        }
        fieldDropdown.value = "";
    });

    const dateSelectionType = document.getElementById("dateSelectionType");
    const singleDateContainer = document.getElementById("singleDateContainer");
    const dateRangeContainer = document.getElementById("dateRangeContainer");

    // Obsługa zmiany typu daty
    dateSelectionType.addEventListener("change", () => {
        if (dateSelectionType.value === "range") {
            singleDateContainer.style.display = "none";
            dateRangeContainer.style.display = "block";
        } else {
            singleDateContainer.style.display = "block";
            dateRangeContainer.style.display = "none";
        }
    });

    // Dodawanie pojedynczej daty
    const dateInput = document.getElementById("studyDates");
    const selectedDatesContainer = document.getElementById("selectedDatesContainer");

    dateInput.addEventListener("change", function () {
        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Sprawdzenie, czy data już została dodana
        const existingDates = Array.from(selectedDatesContainer.querySelectorAll("input[name='dates[]']"))
            .map(input => input.value);
        if (existingDates.includes(selectedDate)) {
            alert("Ta data została już dodana.");
            dateInput.value = "";
            return;
        }

        // Utworzenie ukrytego pola dla każdej daty
        const dateField = document.createElement("input");
        dateField.type = "hidden";
        dateField.name = "dates[]";  // Upewnij się, że nazwa jest poprawna
        dateField.value = selectedDate;
        selectedDatesContainer.appendChild(dateField);

        // Tworzenie wizualnej etykiety dla daty
        const dateBadge = document.createElement("div");
        dateBadge.classList.add("date-badge", "bg-secondary", "text-white", "mb-2", "p-2", "rounded", "d-flex", "align-items-center");
        dateBadge.textContent = selectedDate;

        // Przycisk usuwania dla każdej dodanej daty
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add("btn-close", "btn-close-white", "ms-2");
        removeButton.addEventListener("click", () => {
            selectedDatesContainer.removeChild(dateBadge);
            selectedDatesContainer.removeChild(dateField);
        });
        dateBadge.appendChild(removeButton);

        // Dodanie etykiety i ukrytego pola do kontenera
        selectedDatesContainer.appendChild(dateBadge);
        dateInput.value = "";  // Resetowanie pola daty po dodaniu daty
    });

    // Dodawanie zakresu dat
    const addRangeButton = document.getElementById("addRangeButton");

    addRangeButton.addEventListener("click", function () {
        const startDate = document.getElementById("studyDateStart").value;
        const endDate = document.getElementById("studyDateEnd").value;

        if (!startDate || !endDate) {
            alert("Proszę wybrać oba daty dla zakresu.");
            return;
        }

        // Sprawdzenie, czy zakres już został dodany
        const existingRanges = Array.from(selectedDatesContainer.querySelectorAll("input[name='date_range[]']"))
            .map(input => input.value);
        const newRange = `${startDate} - ${endDate}`;
        if (existingRanges.includes(newRange)) {
            alert("Ten zakres został już dodany.");
            return;
        }

        const dateRangeField = document.createElement("input");
        dateRangeField.type = "hidden";
        dateRangeField.name = "date_range[]";  // Upewnij się, że nazwa jest poprawna
        dateRangeField.value = newRange;
        selectedDatesContainer.appendChild(dateRangeField);

        const rangeBadge = document.createElement("div");
        rangeBadge.classList.add("date-badge", "bg-secondary", "text-white", "mb-2", "p-2", "rounded");
        rangeBadge.textContent = newRange;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add("btn-close", "btn-close-white", "ms-2");
        removeButton.addEventListener("click", () => {
            selectedDatesContainer.removeChild(rangeBadge);
            selectedDatesContainer.removeChild(dateRangeField);
        });
        rangeBadge.appendChild(removeButton);

        selectedDatesContainer.appendChild(rangeBadge);
    });

});

// Obsługa kalendarza
document.addEventListener('DOMContentLoaded', () => {
    const calendar = initializeCalendar();

    document.querySelector('[data-bs-target="#workModal"]').addEventListener('click', () => {
        const form = document.getElementById('workForm');
        form.reset();
        form.setAttribute('action', form.getAttribute('data-add-endpoint'));
        document.getElementById('workEventId').value = "";
        document.getElementById('deleteWorkButton').style.display = 'none';
    });

    document.querySelector('[data-bs-target="#studyModal"]').addEventListener('click', () => {
        
        const form = document.getElementById('dynamicForm');
        form.reset();
        form.setAttribute('action', form.getAttribute('data-add-endpoint'));
        document.getElementById('studyEventId').value = "";
        document.getElementById('deleteStudyButton').style.display = 'none';
    });
});
