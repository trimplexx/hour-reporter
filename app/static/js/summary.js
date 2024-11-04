document.addEventListener('input', function () {
    const hourlyRateElement = document.getElementById('hourlyRate');

    if (hourlyRateElement) {
        const hourlyRate = parseFloat(hourlyRateElement.value) || 0;
        let totalEarnings = 0;

        document.querySelectorAll('.work-hours').forEach((hoursCell, index) => {
            const workHoursText = hoursCell.textContent.trim();
            const hoursMatch = workHoursText.match(/(\d+)h/);
            const minutesMatch = workHoursText.match(/(\d+)m/);

            const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
            const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

            const totalHours = hours + (minutes / 60);

            const earnings = totalHours * hourlyRate;
            document.querySelectorAll('.earnings')[index].innerText = `${earnings.toFixed(2)} PLN`;
            totalEarnings += earnings;
        });

        document.getElementById('totalEarnings').innerText = `${totalEarnings.toFixed(2)} PLN`;
    }
});

document.getElementById('exportPdfBtn').addEventListener('click', function () {
    const hourlyRate = document.getElementById('hourlyRate').value || 0;
    const url = this.getAttribute('data-url');
    window.location.href = `${url}&hourly_rate=${hourlyRate}`;
});

document.getElementById('exportExcelBtn').addEventListener('click', function () {
    const hourlyRate = document.getElementById('hourlyRate').value || 0;
    const url = this.getAttribute('data-url');
    window.location.href = `${url}&hourly_rate=${hourlyRate}`;
});
