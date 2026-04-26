// Shared functions for all algorithm pages
console.log('✅ algorithm_common.js loaded successfully');

// Color palette for Gantt chart (Monochrome gradient)
const colors = ['#555555', '#666666', '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb'];

// Remove a process row
function removeProcess(button) {
    const tbody = document.getElementById('process-tbody');
    if (tbody.children.length > 1) {
        button.closest('tr').remove();
        validateInputs();
    } else {
        showValidationMessage('At least one process is required!', 'error');
    }
}

// Show validation message
function showValidationMessage(message, type) {
    const container = document.querySelector('.container') || document.body;

    // Remove any existing validation message
    const existingMsg = document.getElementById('validation-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Create new validation div
    const validationDiv = document.createElement('div');
    validationDiv.id = 'validation-message';
    validationDiv.textContent = message;
    validationDiv.className = type ? `validation-msg ${type}` : '';

    // Insert at the beginning of container or after header
    const header = document.querySelector('header');
    if (header) {
        header.parentNode.insertBefore(validationDiv, header.nextSibling);
    } else {
        container.insertBefore(validationDiv, container.firstChild);
    }

    // Remove element from DOM after animation completes
    if (type === 'success' || type === 'error') {
        const animationDuration = type === 'success' ? 3000 : 3000; // Match CSS animation duration
        setTimeout(() => {
            if (validationDiv.parentNode) {
                validationDiv.remove();
            }
        }, animationDuration);
    }
}

// Parse backend response and create table
function parseAndDisplayResults(data) {
    const processes = data.processes;
    const avgWaitingTime = data.average_waiting_time;
    const avgTurnaroundTime = data.average_turnaround_time;

    // Build output HTML
    let html = `
        <div class="summary-cards">
            <div class="summary-card">
                <h3>Average Waiting Time</h3>
                <div class="value">${avgWaitingTime.toFixed(2)}</div>
            </div>
            <div class="summary-card">
                <h3>Average Turnaround Time</h3>
                <div class="value">${avgTurnaroundTime.toFixed(2)}</div>
            </div>
            <div class="summary-card">
                <h3>Total Processes</h3>
                <div class="value">${processes.length}</div>
            </div>
        </div>
        <table class="result-table">
            <thead>
                <tr>
                    <th>Process</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    <th>Waiting Time</th>
                    <th>Turnaround Time</th>
                    <th>Completion Time</th>
                </tr>
            </thead>
            <tbody>
    `;

    processes.forEach((p, index) => {
        let processName = p.id;
        if (typeof processName === 'number') {
            processName = `P${processName}`;
        } else if (!String(processName).startsWith('P')) {
            processName = `P${processName}`;
        }

        // Find correct color based on process index or ID for row highlighting
        const processNum = parseInt(String(processName).replace('P', '')) || index;
        const color = colors[processNum % colors.length];

        html += `
            <tr style="border-left: 5px solid ${color}; background-color: ${color}15;">
                <td><strong>${processName}</strong></td>
                <td>${p.arrival_time}</td>
                <td>${p.burst_time}</td>
                <td>${p.waiting_time}</td>
                <td>${p.turnaround_time}</td>
                <td>${p.completion_time}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;
    return html;
}

// Generic fetch and display function
function fetchAndDisplayResults(url, formData) {
    const outputSection = document.getElementById('output-section');
    outputSection.innerHTML = '<div class="spinner"></div><p style="text-align: center; margin-top: 20px;">Processing...</p>';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                outputSection.innerHTML = `
                <div style="padding: 20px; background: rgba(102, 102, 102, 0.2); color: var(--text); border: 1px solid var(--border); border-radius: 8px; text-align: center;">
                    <strong>Error:</strong> ${data.error}
                </div>
            `;
                showValidationMessage('Error: ' + data.error, 'error');
            } else {
                outputSection.innerHTML = parseAndDisplayResults(data);
                showValidationMessage('Algorithm executed successfully!', 'success');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            outputSection.innerHTML = `
            <div style="padding: 20px; background: rgba(102, 102, 102, 0.2); color: var(--text); border: 1px solid var(--border); border-radius: 8px; text-align: center;">
                <strong>Error:</strong> ${error.message || 'An error occurred while processing'}
            </div>
        `;
            showValidationMessage('Error: ' + (error.message || 'Processing failed'), 'error');
        });
}