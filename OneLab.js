function updateTests(inputField, testName, timeFrame) {
    const workingDays = parseFloat(document.getElementById('workingDays').value);
    const workingShifts = parseFloat(document.getElementById('workingShifts').value);
    const expectedGrowth = 1 + parseFloat(document.getElementById('expectedGrowth').value) / 100;

    const row = inputField.closest('tr');
    const yearlyInput = row.querySelector('.test-yearly');
    const monthlyInput = row.querySelector('.test-monthly');
    const dailyInput = row.querySelector('.test-daily');

    let yearlyValue = parseFloat(yearlyInput.value);
    let monthlyValue, dailyValue;

    if (timeFrame === 'yearly') {
        monthlyValue = yearlyValue / 12;
        dailyValue = yearlyValue / (workingDays * workingShifts * 4);
    } else if (timeFrame === 'monthly') {
        yearlyValue = parseFloat(monthlyInput.value) * 12;
        dailyValue = yearlyValue / (workingDays * workingShifts * 4);
    } else if (timeFrame === 'daily') {
        yearlyValue = parseFloat(dailyInput.value) * (workingDays * workingShifts * 4);
        monthlyValue = yearlyValue / 12;
    }

    yearlyInput.value = yearlyValue.toFixed(2);
    monthlyInput.value = monthlyValue.toFixed(2);
    dailyInput.value = dailyValue.toFixed(2);

    const projectedYearly = yearlyValue * Math.pow(expectedGrowth, 1);
    const projectedMonthly = projectedYearly / 12;
    const projectedDaily = projectedYearly / (workingDays * workingShifts * 4);

    row.querySelector('.test-yearly').value = projectedYearly.toFixed(2);
    row.querySelector('.test-monthly').value = projectedMonthly.toFixed(2);
    row.querySelector('.test-daily').value = projectedDaily.toFixed(2);
}

function getBestFit() {
    // This is where the logic will be implemented
    const bestFitResultElement = document.getElementById('bestFitResult');
    bestFitResultElement.textContent = "Best Fit will be displayed here.";
}
