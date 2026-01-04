// Shared functions for all algorithm pages
console.log('✅ algorithm_common.js loaded successfully');

// Color palette for Gantt chart
const colors = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#ed64a6', '#38b2ac', '#f56565'];

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
    const validationDiv = document.getElementById('validation-message');
    validationDiv.textContent = message;
    validationDiv.className = type ? `validation-msg ${type}` : '';
}

// Parse backend response and create table
function parseAndDisplayResults(responseText) {
    const lines = responseText.trim().split('\n');

    // Parse process data
    const processes = [];
    let avgWaitingTime = 0;
    let avgTurnaroundTime = 0;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('Average Waiting Time:')) {
            avgWaitingTime = parseFloat(line.split(':')[1].trim());
        } else if (line.startsWith('Average Turnaround Time:')) {
            avgTurnaroundTime = parseFloat(line.split(':')[1].trim());
        } else if (line && !line.startsWith('Process')) {
            const parts = line.split('\t').filter(p => p.trim());
            if (parts.length >= 5) {
                processes.push({
                    process: `P${parts[0]}`,
                    arrivalTime: parseInt(parts[1]),
                    burstTime: parseInt(parts[2]),
                    waitingTime: parseInt(parts[3]),
                    turnaroundTime: parseInt(parts[4])
                });
            }
        }
    }

    // Create Gantt chart data
    const ganttData = createGanttData(processes);

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

        <div class="gantt-chart">
            <div class="gantt-title">Gantt Chart</div>
            <div class="gantt-bar-container">
                ${ganttData.bars}
            </div>
            <div class="gantt-time">
                ${ganttData.times}
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
        const completionTime = p.arrivalTime + p.turnaroundTime;
        html += `
            <tr>
                <td><strong>${p.process}</strong></td>
                <td>${p.arrivalTime}</td>
                <td>${p.burstTime}</td>
                <td>${p.waitingTime}</td>
                <td>${p.turnaroundTime}</td>
                <td>${completionTime}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    return html;
}

// Create Gantt chart visualization
function createGanttData(processes) {
    let currentTime = 0;
    let bars = '';
    let times = `<span style="flex: 0 0 30px;">${currentTime}</span>`;

    processes.forEach((p, index) => {
        // Add idle time if process hasn't arrived yet
        if (currentTime < p.arrivalTime) {
            const idleWidth = (p.arrivalTime - currentTime) * 40;
            bars += `<div class="gantt-bar" style="flex: 0 0 ${idleWidth}px; background: #e2e8f0; color: #718096;">Idle</div>`;
            times += `<span style="flex: 0 0 ${idleWidth}px;">${p.arrivalTime}</span>`;
            currentTime = p.arrivalTime;
        }

        const width = p.burstTime * 40;
        const color = colors[index % colors.length];
        bars += `<div class="gantt-bar" style="flex: 0 0 ${width}px; background: ${color};">${p.process}</div>`;
        currentTime += p.burstTime;
        times += `<span style="flex: 0 0 ${width}px;">${currentTime}</span>`;
    });

    return { bars, times };
}

// Generic fetch and display function
function fetchAndDisplayResults(url, formData) {
    const outputSection = document.getElementById('output-section');
    outputSection.innerHTML = '<div class="spinner"></div><p style="text-align: center; color: #4a5568; margin-top: 20px;">Processing...</p>';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            if (data.includes('ERROR')) {
                outputSection.innerHTML = `
                    <div style="padding: 20px; background: #fed7d7; color: #c53030; border-radius: 8px; text-align: center;">
                        <strong>Error:</strong> ${data}
                    </div>
                `;
            } else {
                outputSection.innerHTML = parseAndDisplayResults(data);
                showValidationMessage('Algorithm executed successfully!', 'success');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            outputSection.innerHTML = `
                <div style="padding: 20px; background: #fed7d7; color: #c53030; border-radius: 8px; text-align: center;">
                    <strong>Error:</strong> An error occurred while processing. Please try again.
                </div>
            `;
            showValidationMessage('Error executing algorithm!', 'error');
        });
}
