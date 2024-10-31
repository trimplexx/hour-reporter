export function addField(optionKey, initialValue = null) {
    const additionalFieldsContainer = document.getElementById("additionalFields");
    const fieldConfig = {
        day_of_week: {label: "Dzień Tygodnia", type: "dropdown", name: "day_of_week"},
        instructor_name: {label: "Prowadzący", type: "text", name: "instructor_name"},
        room: {label: "Sala", type: "text", name: "room"},
        week_type: {label: "Typ Tygodnia", type: "dropdown", name: "week_type_id"}
    }[optionKey];

    if (!fieldConfig) return;

    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add("mb-3", "field-wrapper");
    fieldWrapper.setAttribute("data-field-key", optionKey);

    const label = document.createElement("label");
    label.classList.add("form-label", "text-neutral-200");
    label.textContent = fieldConfig.label;
    fieldWrapper.appendChild(label);

    let input;
    if (fieldConfig.type === "dropdown") {
        input = document.createElement("select");
        input.classList.add("form-select", "bg-neutral-700", "border-0", "text-neutral-300");
        input.name = fieldConfig.name;

        if (optionKey === "day_of_week") {
            ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"].forEach(day => {
                const opt = document.createElement("option");
                opt.value = day;
                opt.textContent = day;
                input.appendChild(opt);
            });
        } else if (optionKey === "week_type") {
            ["Parzysty", "Nieparzysty"].forEach((option, index) => {
                const opt = document.createElement("option");
                opt.value = index + 1;
                opt.textContent = option;
                input.appendChild(opt);
            });
        }
    } else {
        input = document.createElement("input");
        input.type = fieldConfig.type;
        input.classList.add("form-control", "bg-neutral-700", "border-0", "text-neutral-300");
        input.name = fieldConfig.name;
    }

    if (initialValue) input.value = initialValue;
    input.required = true;
    fieldWrapper.appendChild(input);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn", "btn-outline-danger", "btn-sm", "mt-1");
    removeButton.textContent = "Usuń";
    removeButton.addEventListener("click", () => additionalFieldsContainer.removeChild(fieldWrapper));
    fieldWrapper.appendChild(removeButton);

    additionalFieldsContainer.appendChild(fieldWrapper);
}

window.addField = addField;