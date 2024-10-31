document.addEventListener('input', function () {
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    let totalEarnings = 0;
    document.querySelectorAll('.work-hours').forEach((hoursCell, index) => {
        const hours = parseFloat(hoursCell.textContent) || 0;
        const earnings = hours * hourlyRate;
        document.querySelectorAll('.earnings')[index].innerText = `${earnings.toFixed(2)} PLN`;
        totalEarnings += earnings;
    });
    document.getElementById('totalEarnings').innerText = `${totalEarnings.toFixed(2)} 'PLN`;
});