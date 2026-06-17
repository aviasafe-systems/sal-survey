/*
================================================================================
FILE: SurveySMS/js/analytics/chart-utils.js
VERSION: 1.0
REVISION DATE: 2026-06-16
PURPOSE: Chart rendering utilities for analytics
AFFECTED: analytics/airline-analytics.html, analytics/caan-analytics.html
================================================================================
*/

function renderPillarChart(data, canvasId, legendId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const pillarOrder = ['Policy', 'Risk Management', 'Assurance', 'Promotion'];
    const colors = ['#2e7daf', '#e8a838', '#28a745', '#dc3545'];
    const scores = pillarOrder.map(p => data.pillarAverages[p] || 0);

    // Destroy existing chart if any
    if (window.pillarChartInstance) {
        window.pillarChartInstance.destroy();
    }

    window.pillarChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: pillarOrder,
            datasets: [{
                data: scores,
                backgroundColor: colors,
                borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
                borderWidth: 3,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value.toFixed(1)} / 5.0`;
                        }
                    }
                }
            },
            cutout: '68%'
        }
    });

    // Render legend
    const container = document.getElementById(legendId);
    container.innerHTML = '';
    pillarOrder.forEach((label, index) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="color-box" style="background:${colors[index]};"></span>
            <span>${label}</span>
            <span class="score">${scores[index].toFixed(1)}</span>
        `;
        container.appendChild(item);
    });
}

function renderElementChart(data, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    let labels = [], scores = [], colors = [];

    if (data.elementAverages) {
        const sortedKeys = Object.keys(data.elementAverages).sort((a, b) => parseInt(a) - parseInt(b));
        labels = sortedKeys.map(key => `E${key}`);
        scores = sortedKeys.map(key => data.elementAverages[key]);
        colors = scores.map(score => {
            if (score >= 4.0) return '#28a745';
            if (score >= 3.0) return '#ffc107';
            if (score >= 2.0) return '#fd7e14';
            return '#dc3545';
        });
    } else {
        labels = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12'];
        scores = new Array(12).fill(0);
        colors = new Array(12).fill('#dee2e6');
    }

    if (window.elementChartInstance) {
        window.elementChartInstance.destroy();
    }

    window.elementChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score (out of 5)',
                data: scores,
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 1,
                borderRadius: 4,
                maxBarThickness: 35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.parsed.y.toFixed(1)} / 5.0`;
                        }
                    }
                }
            },
            scales: {
                y: { min: 0, max: 5, ticks: { stepSize: 1 }, title: { display: true, text: 'Score' } }
            }
        }
    });
}

function renderGapChart(data, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    let labels = [], dataPoints = [], colors = [];

    if (data.gaps) {
        const sortedGaps = Object.keys(data.gaps).sort((a, b) => data.gaps[b].gap - data.gaps[a].gap);
        labels = sortedGaps.map(key => `E${key}`);
        dataPoints = sortedGaps.map(key => data.gaps[key].gap);
        colors = dataPoints.map(gap => {
            if (gap <= 0) return '#28a745';
            if (gap <= 0.5) return '#ffc107';
            if (gap <= 1.0) return '#fd7e14';
            return '#dc3545';
        });
    } else {
        labels = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12'];
        dataPoints = new Array(12).fill(0);
        colors = new Array(12).fill('#dee2e6');
    }

    if (window.gapChartInstance) {
        window.gapChartInstance.destroy();
    }

    window.gapChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gap to Target (4.5)',
                data: dataPoints,
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 1,
                borderRadius: 4,
                maxBarThickness: 35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const gap = context.parsed.y;
                            if (gap <= 0) return `✅ Compliant (${Math.abs(gap).toFixed(1)} above target)`;
                            return `⚠️ Gap: ${gap.toFixed(1)} points`;
                        }
                    }
                }
            },
            scales: {
                y: { min: 0, max: 2.5, ticks: { stepSize: 0.5 }, title: { display: true, text: 'Gap Size' } }
            }
        }
    });
}