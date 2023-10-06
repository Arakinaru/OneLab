function updateTests(inputField, testName, timeFrame) {
    const workingDays = parseFloat(document.getElementById('workingDays').value);
    const workingShifts = parseFloat(document.getElementById('workingShifts').value);
    const expectedGrowth = 1 + parseFloat(document.getElementById('expectedGrowth').value) / 100;

    const row = inputField.closest('tr');
    const yearlyInput = row.querySelector('.test-yearly');
    const monthlyInput = row.querySelector('.test-monthly');
    const dailyInput = row.querySelector('.test-daily');

    let yearlyValue = parseFloat(yearlyInput.value);
    let monthlyValue = parseFloat(monthlyInput.value);
    let dailyValue = parseFloat(dailyInput.value);

    if (timeFrame === 'yearly') {
        monthlyValue = yearlyValue / 12 * expectedGrowth;
        dailyValue = monthlyValue / 22;
    } else if (timeFrame === 'monthly') {
        yearlyValue = monthlyValue * 12 * expectedGrowth;
        dailyValue = monthlyValue / 22;
    } else if (timeFrame === 'daily') {
        monthlyValue = dailyValue * 22;
        yearlyValue = monthlyValue * 12 * expectedGrowth;
    }

    yearlyInput.value = yearlyValue.toFixed();
    monthlyInput.value = monthlyValue.toFixed();
    dailyInput.value = dailyValue.toFixed();

    inputField.addEventListener('input', () => {
        updateTests(inputField, inputField.dataset.testName, inputField.dataset.timeFrame);
    });
}

function clearAllFields() {
    // Get all the input fields on the page.
    const inputFields = document.querySelectorAll('input');

    // Clear the value of each input field.
    inputFields.forEach(inputField => {
        inputField.value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.test-yearly, .test-monthly, .test-daily');

    inputFields.forEach(inputField => {
        inputField.addEventListener('input', () => {
            updateTests(inputField, inputField.dataset.testName, inputField.dataset.timeFrame);
        });
    });
});

function getBestFit() {
    // Get the daily number of tests for each assay.
    const dailyBiochemicalTests = parseFloat(document.getElementById('biochemicalDaily').value);
    const dailyElectrolytesTests = parseFloat(document.getElementById('electrolytesDaily').value);
    const dailyImmunochemicalTests = parseFloat(document.getElementById('immunochemicalDaily').value);

    // Calculate the number of analyzers required for each assay.
    const numBiochemicalAnalyzers = Math.ceil(dailyBiochemicalTests / 10000);
    const numElectrolytesAnalyzers = Math.ceil(dailyElectrolytesTests / 12000);
    const numImmunochemicalAnalyzers = Math.ceil(dailyImmunochemicalTests / 800);

    // Generate a string representing the best fit analyzers.
    let bestFitAnalyzers = "";
    if (numBiochemicalAnalyzers > 0) {
        bestFitAnalyzers += `${numBiochemicalAnalyzers} "c 503" | `;
    }
    if (numElectrolytesAnalyzers > 0) {
        bestFitAnalyzers += `${numElectrolytesAnalyzers} "e 801" | `;
    }
    if (numImmunochemicalAnalyzers > 0) {
        bestFitAnalyzers += `${numImmunochemicalAnalyzers} "ISE"`;
    }

    // Remove the trailing pipe (`|`) from the string.
    bestFitAnalyzers = bestFitAnalyzers.substring(0, bestFitAnalyzers.length);

    // Display the best fit analyzers in the "Best Fit" field.
    document.getElementById('bestFitResult').textContent = bestFitAnalyzers;
}
function nextStep(){
    document.getElementById('selectionContent').style.display = 'block';
    document.getElementById('nextStepButton').style.opacity = '0.5';
    const scrollTrigger= document.getElementById('selectionContent')
    scrollTrigger.scrollIntoView({behavior: 'smooth'}, true)
}
function toggle1(element) {
    const content = document.querySelector('.content1');
    changeStyle(element,content)
}
function toggle2(element) {
    const content = document.querySelector('.content2');
    changeStyle(element,content)
}
function toggle3(element) {
    const content = document.querySelector('.content3');
    changeStyle(element,content)
}


function changeStyle(element, content) {
    if(element.checked){
        content.style.display = 'block';
    }
    else{
        content.style.display = 'none';
    }
}


