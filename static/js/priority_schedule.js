// Priority Scheduling specific logic
let processCounter = 2;

// Add process
document.getElementById('add-process').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><strong>P${processCounter}</strong></td>
        <td><input type="number" class="arrival-time" min="0" value="0"></td>
        <td><input type="number" class="burst-time" min="1" value="1"></td>
        <td><input type="number" class="priority" min="1" value="1"></td>
        <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
    `;

    tbody.appendChild(newRow);
    processCounter++;
    validateInputs();
});

// Load example
document.getElementById('load-example').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    tbody.innerHTML = `
        <tr>
            <td><strong>P1</strong></td>
            <td><input type="number" class="arrival-time" min="0" value="0"></td>
            <td><input type="number" class="burst-time" min="1" value="4"></td>
            <td><input type="number" class="priority" min="1" value="2"></td>
            <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
        </tr>
        <tr>
            <td><strong>P2</strong></td>
            <td><input type="number" class="arrival-time" min="0" value="1"></td>
            <td><input type="number" class="burst-time" min="1" value="3"></td>
            <td><input type="number" class="priority" min="1" value="1"></td>
            <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
        </tr>
        <tr>
            <td><strong>P3</strong></td>
            <td><input type="number" class="arrival-time" min="0" value="2"></td>
            <td><input type="number" class="burst-time" min="1" value="5"></td>
            <td><input type="number" class="priority" min="1" value="4"></td>
            <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
        </tr>
        <tr>
            <td><strong>P4</strong></td>
            <td><input type="number" class="arrival-time" min="0" value="3"></td>
            <td><input type="number" class="burst-time" min="1" value="2"></td>
            <td><input type="number" class="priority" min="1" value="3"></td>
            <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
        </tr>
    `;
    processCounter = 5;
    showValidationMessage('Example data loaded successfully!', 'success');
});

// Clear all
document.getElementById('clear-all').addEventListener('click', function () {
    const tbody = document.getElementById('process-tbody');
    tbody.innerHTML = `
        <tr>
            <td><strong>P1</strong></td>
            <td><input type="number" class="arrival-time" min="0" value="0"></td>
            <td><input type="number" class="burst-time" min="1" value="1"></td>
            <td><input type="number" class="priority" min="1" value="1"></td>
            <td><button class="btn-remove" onclick="removeProcess(this)">✖</button></td>
        </tr>
    `;
    processCounter = 2;
    document.getElementById('output-section').innerHTML = `
        <div class="output-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p style="font-size: 16px; font-weight: 500;">No results yet</p>
            <p style="font-size: 14px; margin-top: 10px;">Run the algorithm to see scheduling results</p>
        </div>
    `;
    showValidationMessage('Table cleared!', 'success');
});

// Validate inputs
function validateInputs() {
    const arrivalInputs = document.querySelectorAll('.arrival-time');
    const burstInputs = document.querySelectorAll('.burst-time');
    const priorityInputs = document.querySelectorAll('.priority');

    let isValid = true;
    let errorMessage = '';

    arrivalInputs.forEach((input) => {
        if (input.value === '' || input.value < 0) {
            isValid = false;
            errorMessage = 'Please fill all arrival times with non-negative values!';
        }
    });

    burstInputs.forEach((input) => {
        if (input.value === '' || input.value <= 0) {
            isValid = false;
            errorMessage = 'Please fill all burst times with positive values!';
        }
    });

    priorityInputs.forEach((input) => {
        if (input.value === '' || input.value <= 0) {
            isValid = false;
            errorMessage = 'Please fill all priorities with positive values!';
        }
    });

    if (!isValid && errorMessage) {
        showValidationMessage(errorMessage, 'error');
    } else if (isValid) {
        showValidationMessage('', '');
    }

    return isValid;
}

// Add input listeners
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('arrival-time') ||
        e.target.classList.contains('burst-time') ||
        e.target.classList.contains('priority')) {
        validateInputs();
    }
});

// Run algorithm
document.getElementById('run-algo').addEventListener('click', function () {
    if (!validateInputs()) return;

    const arrivalInputs = document.querySelectorAll('.arrival-time');
    const burstInputs = document.querySelectorAll('.burst-time');
    const priorityInputs = document.querySelectorAll('.priority');

    const arrivalTimes = Array.from(arrivalInputs).map(input => input.value).join(' ');
    const burstTimes = Array.from(burstInputs).map(input => input.value).join(' ');
    const priorities = Array.from(priorityInputs).map(input => input.value).join(' ');

    fetchAndDisplayResults('/priority-scheduling', `arrival-time=${arrivalTimes}&burst-time=${burstTimes}&priority=${priorities}`);
});
