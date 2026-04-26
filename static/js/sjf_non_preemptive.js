let processCounter = 2;

document.getElementById('add-process').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" value="P${processCounter}" readonly></td>
        <td><input type="number" class="arrival-time" min="0" value="0"></td>
        <td><input type="number" class="burst-time" min="1" value="1"></td>
        <td class="action-col"><button class="remove-btn" onclick="removeProcess(this)">×</button></td>
    `;
    tbody.appendChild(newRow);
    processCounter++;
});

document.getElementById('load-example').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    tbody.innerHTML = `
        <tr>
            <td><input type="text" value="P1" readonly></td>
            <td><input type="number" class="arrival-time" min="0" value="0"></td>
            <td><input type="number" class="burst-time" min="1" value="5"></td>
            <td class="action-col"><button class="remove-btn" onclick="removeProcess(this)">×</button></td>
        </tr>
        <tr>
            <td><input type="text" value="P2" readonly></td>
            <td><input type="number" class="arrival-time" min="0" value="1"></td>
            <td><input type="number" class="burst-time" min="1" value="3"></td>
            <td class="action-col"><button class="remove-btn" onclick="removeProcess(this)">×</button></td>
        </tr>
        <tr>
            <td><input type="text" value="P3" readonly></td>
            <td><input type="number" class="arrival-time" min="0" value="2"></td>
            <td><input type="number" class="burst-time" min="1" value="8"></td>
            <td class="action-col"><button class="remove-btn" onclick="removeProcess(this)">×</button></td>
        </tr>
    `;
    processCounter = 4;
    showValidationMessage('Example data loaded!', 'success');
});

document.getElementById('clear-all').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    tbody.innerHTML = `
        <tr>
            <td><input type="text" value="P1" readonly></td>
            <td><input type="number" class="arrival-time" min="0" value="0"></td>
            <td><input type="number" class="burst-time" min="1" value="1"></td>
            <td class="action-col"><button class="remove-btn" disabled>×</button></td>
        </tr>
    `;
    processCounter = 2;
    document.getElementById('output-section').innerHTML = '';
    showValidationMessage('Table cleared!', 'success');
});

function validateInputs() {
    const arrivalInputs = document.querySelectorAll('.arrival-time');
    const burstInputs = document.querySelectorAll('.burst-time');
    let isValid = true;

    arrivalInputs.forEach((input) => {
        if (input.value === '' || parseInt(input.value) < 0) isValid = false;
    });

    burstInputs.forEach((input) => {
        if (input.value === '' || parseInt(input.value) <= 0) isValid = false;
    });

    return isValid;
}

document.getElementById('run-algo').addEventListener('click', function () {
    if (!validateInputs()) {
        showValidationMessage('Please fill all fields correctly!', 'error');
        return;
    }

    const arrivalInputs = document.querySelectorAll('.arrival-time');
    const burstInputs = document.querySelectorAll('.burst-time');
    const arrivalTimes = Array.from(arrivalInputs).map(input => input.value).join(' ');
    const burstTimes = Array.from(burstInputs).map(input => input.value).join(' ');

    const formData = `arrival-time=${arrivalTimes}&burst-time=${burstTimes}`;
    fetchAndDisplayResults('/sjf-non-preemptive', formData);
});
