/*
================================================================================
FILE: SurveySMS/js/safety-dashboard.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Safety Officer Dashboard - Analytics view with 4 pillars, pie chart, gap analysis, and CAP
DEPENDENCIES: utils.js, storage.js, auth.js, translations.js, Chart.js (CDN)
USAGE: safety-dashboard.html
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// CONFIGURATION
// ============================================================
const ELEMENT_NAMES = {
    1: 'Safety Policy & Objectives',
    2: 'Safety Accountabilities',
    3: 'Hazard Identification',
    4: 'Risk Assessment & Mitigation',
    5: 'Safety Performance Monitoring',
    6: 'Internal Safety Audits',
    7: 'Management of Change',
    8: 'Continuous Improvement',
    9: 'Safety Training & Competence',
    10: 'Safety Communication',
    11: 'Safety Culture',
    12: 'Emergency Response Planning'
};

const ELEMENT_PILLARS = {
    1: 'Policy',
    2: 'Policy',
    3: 'Risk Management',
    4: 'Risk Management',
    5: 'Assurance',
    6: 'Assurance',
    7: 'Assurance',
    8: 'Assurance',
    9: 'Promotion',
    10: 'Promotion',
    11: 'Promotion',
    12: 'Assurance'
};

const PILLAR_ICONS = {
    'Policy': 'fa-bullseye',
    'Risk Management': 'fa-chart-line',
    'Assurance': 'fa-check-circle',
    'Promotion': 'fa-users'
};

const PILLAR_COLORS = {
    'Policy': '#2e7daf',
    'Risk Management': '#e8a838',
    'Assurance': '#28a745',
    'Promotion': '#dc3545'
};

const TARGET_SCORE = 4.5;

// ============================================================
// STATE
// ============================================================
let tenantId = null;
let airlineName = null;
let airlineData = null;
let userData = null;
let elementChart = null;
let gapChart = null;
let pillarChart = null;

// ============================================================
// AUTO-DETECT TENANT WITH DATA
// ============================================================
function detectTenantWithData() {
    console.log('🔍 Scanning for tenant with survey data...');

    const allKeys = Object.keys(localStorage);
    const sessionKeys = allKeys.filter(k => k.startsWith('sms_') && k.includes('_session_1_answers'));

    for (const key of sessionKeys) {
        const match = key.match(/sms_([^_]+)_session_1_answers/);
        if (match) {
            const possibleTenant = match[1];
            const completed = localStorage.getItem(`sms_${possibleTenant}_completed_sessions`);
            if (completed && parseInt(completed) > 0) {
                const answers = localStorage.getItem(`sms_${possibleTenant}_session_1_answers`);
                if (answers && JSON.parse(answers).length > 0) {
                    console.log(`🔍 Auto-detected tenant: ${possibleTenant} with ${completed} sessions`);
                    return possibleTenant;
                }
            }
        }
    }

    for (const key of allKeys) {
        if (key.startsWith('sms_') && key.endsWith('_completed_sessions')) {
            const tenant = key.replace('sms_', '').replace('_completed_sessions', '');
            const count = parseInt(localStorage.getItem(key) || '0');
            if (count > 0) {
                console.log(`🔍 Found tenant with data: ${tenant} (${count} sessions)`);
                return tenant;
            }
        }
    }

    console.log('⚠️ No tenant with survey data found');
    return null;
}

// ============================================================
// GET AIRLINE DATA FROM LOCALSTORAGE
// ============================================================
function getAirlineData(tenantId, airlineName) {
    console.log(`🔍 Fetching data for tenant: ${tenantId}`);

    let actualTenantId = tenantId;
    let completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');

    if (completed === 0) {
        const detected = detectTenantWithData();
        if (detected) {
            actualTenantId = detected;
            completed = parseInt(localStorage.getItem(`sms_${detected}_completed_sessions`) || '0');
            console.log(`🔍 Using auto-detected tenant: ${actualTenantId}`);
        }
    }

    if (completed === 0) {
        console.log(`⚠️ No completed sessions found for tenant: ${tenantId}`);
        return null;
    }

    tenantId = actualTenantId;
    console.log(`📊 Tenant: ${tenantId}, Completed sessions: ${completed}`);

    const allAnswers = [];
    for (let i = 1; i <= 5; i++) {
        const answers = JSON.parse(localStorage.getItem(`sms_${tenantId}_session_${i}_answers`) || '[]');
        if (answers.length > 0) {
            allAnswers.push(...answers);
            console.log(`📂 Loaded session ${i}: ${answers.length} answers`);
        }
    }

    if (allAnswers.length === 0) {
        console.log(`⚠️ No answers found for tenant: ${tenantId}`);
        return null;
    }

    console.log(`📊 Total answers aggregated: ${allAnswers.length}`);

    // ============================================================
    // CALCULATE ELEMENT AVERAGES
    // ============================================================
    const elementScores = {};
    const questionsPerElement = 2;

    allAnswers.forEach((answer, index) => {
        if (answer !== null && answer !== undefined) {
            const elementIndex = Math.floor(index / questionsPerElement) + 1;
            if (!elementScores[elementIndex]) elementScores[elementIndex] = [];
            elementScores[elementIndex].push(answer);
        }
    });

    const elementAverages = {};
    for (const key in elementScores) {
        const scores = elementScores[key];
        elementAverages[key] = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
    }

    // ============================================================
    // CALCULATE PILLAR AVERAGES
    // ============================================================
    const pillarScores = {};
    for (const pillar of ['Policy', 'Risk Management', 'Assurance', 'Promotion']) {
        pillarScores[pillar] = { scores: [], elements: [] };
    }

    for (let i = 1; i <= 12; i++) {
        const pillar = ELEMENT_PILLARS[i];
        if (elementAverages[i] !== undefined) {
            pillarScores[pillar].scores.push(elementAverages[i]);
            pillarScores[pillar].elements.push(i);
        }
    }

    const pillarAverages = {};
    for (const pillar in pillarScores) {
        const scores = pillarScores[pillar].scores;
        pillarAverages[pillar] = scores.length > 0 ?
            Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100 :
            0;
    }

    // ============================================================
    // CALCULATE OVERALL AVERAGE
    // ============================================================
    const allScores = Object.values(elementAverages);
    const overallAverage = allScores.length > 0 ?
        Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 100) / 100 :
        0;

    // ============================================================
    // CALCULATE GAPS
    // ============================================================
    const gaps = {};
    let criticalCount = 0;

    for (let i = 1; i <= 12; i++) {
        const current = elementAverages[i] || 0;
        const gap = Math.round((TARGET_SCORE - current) * 100) / 100;

        let severity = 'Compliant';
        if (gap > 0 && gap <= 0.5) severity = 'Minor Gap';
        else if (gap > 0.5 && gap <= 1.0) severity = 'Moderate Gap';
        else if (gap > 1.0) { severity = 'Critical Gap';
            criticalCount++; }

        gaps[i] = {
            current: current,
            target: TARGET_SCORE,
            gap: gap,
            severity: severity,
            name: ELEMENT_NAMES[i],
            pillar: ELEMENT_PILLARS[i]
        };
    }

    const completionDate = localStorage.getItem(`sms_${tenantId}_last_completion_date`) || null;

    if (!airlineName || airlineName === 'Aviation Organization') {
        if (typeof window !== 'undefined' && window.CREDENTIALS) {
            for (const [email, data] of Object.entries(window.CREDENTIALS)) {
                if (data.tenantId === tenantId) {
                    airlineName = data.airline || data.displayName || tenantId;
                    break;
                }
            }
        }
        if (!airlineName || airlineName === 'Aviation Organization') {
            airlineName = tenantId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
    }

    console.log(`✅ Data loaded for ${airlineName}:`);
    console.log(`   Sessions completed: ${completed}`);
    console.log(`   Overall average: ${overallAverage}`);
    console.log(`   Critical gaps: ${criticalCount}`);

    return {
        name: airlineName,
        tenantId: tenantId,
        sessionsCompleted: completed,
        elementAverages: elementAverages,
        pillarAverages: pillarAverages,
        overallAverage: overallAverage,
        criticalGaps: criticalCount,
        gaps: gaps,
        totalQuestions: allAnswers.length,
        completionDate: completionDate
    };
}

// ============================================================
// GET SURVEY PERIOD
// ============================================================
function getSurveyPeriod(completionDate) {
    if (!completionDate) return 'Not available';
    const date = new Date(completionDate);
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Safety Officer Dashboard Loaded');

    // ============================================================
    // GET USER DATA
    // ============================================================
    if (typeof getCurrentUser === 'function') {
        userData = getCurrentUser();
    } else {
        userData = JSON.parse(localStorage.getItem('sms_user_data') || '{}');
    }

    if (!userData || !userData.email) {
        console.warn('⚠️ No user data found, redirecting to login');
        window.location.href = 'login.html';
        return;
    }

    console.log(`👤 User: ${userData.email}`);
    console.log(`🎭 Role: ${userData.role}`);
    console.log(`📋 Tenant from user: ${userData.tenantId}`);

    // ============================================================
    // AUTO-DETECT TENANT FOR SAFETY OFFICER
    // ============================================================
    if (userData.role === 'safety_officer') {
        const currentTenant = userData.tenantId || 'default';
        let hasData = localStorage.getItem(`sms_${currentTenant}_completed_sessions`);
        let dataCount = hasData ? parseInt(hasData) : 0;

        if (!hasData || dataCount === 0) {
            console.log('🔍 Scanning for tenant with data...');
            const detected = detectTenantWithData();
            if (detected) {
                userData.tenantId = detected;
                if (typeof window !== 'undefined' && window.CREDENTIALS) {
                    for (const [email, data] of Object.entries(window.CREDENTIALS)) {
                        if (data.tenantId === detected) {
                            userData.airline = data.airline || data.displayName;
                            break;
                        }
                    }
                }
                if (!userData.airline) {
                    userData.airline = detected.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
                localStorage.setItem('sms_user_data', JSON.stringify(userData));
                console.log(`🔧 Updated user data with detected tenant: ${detected}`);
            }
        }
    }

    // ============================================================
    // VERIFY ROLE
    // ============================================================
    if (userData.role !== 'safety_officer') {
        console.warn('⚠️ User is not a safety officer, redirecting...');
        window.location.href = 'dashboard.html';
        return;
    }

    tenantId = userData.tenantId || 'default';
    airlineName = userData.airline || 'Aviation Organization';

    console.log(`🏢 Airline: ${airlineName}`);
    console.log(`📋 Tenant ID: ${tenantId}`);

    // ============================================================
    // UPDATE UI
    // ============================================================
    const avatarEl = document.getElementById('userAvatar');
    if (avatarEl) {
        avatarEl.src = userData.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(airlineName) + '&background=0a2e4a&color=fff&size=128';
    }

    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = userData.name || airlineName;

    const emailEl = document.getElementById('userEmail');
    if (emailEl) emailEl.textContent = userData.email || '';

    const badgeEl = document.getElementById('tenantBadge');
    if (badgeEl) {
        badgeEl.innerHTML = `
            ${airlineName}
            <span class="demo-badge">DEMO</span>
        `;
    }

    const airlineNameEl = document.getElementById('airlineName');
    if (airlineNameEl) airlineNameEl.textContent = airlineName;

    // ============================================================
    // LOAD DATA
    // ============================================================
    airlineData = getAirlineData(tenantId, airlineName);

    if (!airlineData) {
        console.log(`⚠️ No data found for ${airlineName} (${tenantId})`);
        const noDataEl = document.getElementById('noDataMessage');
        if (noDataEl) noDataEl.style.display = 'block';

        const statsEl = document.getElementById('statsGrid');
        if (statsEl) statsEl.style.display = 'none';

        const chartsEl = document.getElementById('chartsSection');
        if (chartsEl) chartsEl.style.display = 'none';

        const pillarWrapper = document.querySelector('.pillar-summary-wrapper');
        if (pillarWrapper) pillarWrapper.style.display = 'none';

        const periodEl = document.getElementById('surveyPeriod');
        if (periodEl) periodEl.textContent = 'No survey completed yet';

        const noDataMsg = document.querySelector('#noDataMessage p');
        if (noDataMsg) {
            noDataMsg.textContent = `No survey data found for ${airlineName}. Please ensure the survey has been completed.`;
        }
        return;
    }

    const periodEl = document.getElementById('surveyPeriod');
    if (periodEl) periodEl.textContent = getSurveyPeriod(airlineData.completionDate);

    console.log(`✅ Data loaded successfully for ${airlineName}`);
    console.log(`📊 Sessions completed: ${airlineData.sessionsCompleted}`);
    console.log(`📈 Overall average: ${airlineData.overallAverage}`);
    console.log(`⚠️ Critical gaps: ${airlineData.criticalGaps}`);

    renderAll();
});

// ============================================================
// RENDER FUNCTIONS
// ============================================================
function renderAll() {
    renderStats();
    renderPillarSummary();
    renderPillarChart();
    renderGapAnalysis();
    renderCAP();
    renderCharts();
}

function renderStats() {
    const completedEl = document.getElementById('completedSessions');
    if (completedEl) completedEl.textContent = airlineData.sessionsCompleted || 0;

    const avgEl = document.getElementById('avgScore');
    if (avgEl) avgEl.textContent = (airlineData.overallAverage || 0).toFixed(1);

    const gapsEl = document.getElementById('criticalGaps');
    if (gapsEl) gapsEl.textContent = airlineData.criticalGaps || 0;
}

function renderPillarSummary() {
    const container = document.getElementById('pillarSummary');
    if (!container) return;
    container.innerHTML = '';

    const pillarOrder = ['Policy', 'Risk Management', 'Assurance', 'Promotion'];
    const pillarDescriptions = {
        'Policy': 'Management commitment, safety accountabilities, and documented safety policies',
        'Risk Management': 'Hazard identification, risk assessment, and mitigation strategies',
        'Assurance': 'Performance monitoring, audits, and continuous improvement processes',
        'Promotion': 'Training, communication, and fostering a positive safety culture'
    };

    pillarOrder.forEach(pillar => {
        const score = airlineData.pillarAverages[pillar] || 0;
        const status = score >= 4.0 ? 'strong' : (score >= 3.0 ? 'moderate' : 'weak');
        const statusLabel = score >= 4.0 ? 'Strong' : (score >= 3.0 ? 'Moderate' : 'Weak');
        const statusIcon = score >= 4.0 ? '✅' : (score >= 3.0 ? '⚠️' : '🔴');

        const elements = [];
        for (let i = 1; i <= 12; i++) {
            if (ELEMENT_PILLARS[i] === pillar) {
                elements.push(i);
            }
        }

        const card = document.createElement('div');
        card.className = `pillar-card pillar-${pillar.toLowerCase().replace(' ', '-')}`;
        card.innerHTML = `
            <div class="pillar-header">
                <h4><i class="fas ${PILLAR_ICONS[pillar]}"></i> ${pillar}</h4>
                <span class="pillar-score ${score >= 4.0 ? 'good' : (score >= 3.0 ? 'average' : 'poor')}">${score.toFixed(1)}</span>
            </div>
            <div class="pillar-elements">
                Elements: ${elements.map(e => `<span>${e}</span>`).join('')}
            </div>
            <div class="pillar-elements" style="font-size:0.75rem;margin-top:4px;color:#6c757d;">
                ${pillarDescriptions[pillar]}
            </div>
            <div class="pillar-status ${status}">
                ${statusIcon} ${statusLabel} - ${score >= 4.0 ? 'No immediate action needed' : (score >= 3.0 ? 'Some improvement needed' : 'Immediate attention required')}
            </div>
        `;
        container.appendChild(card);
    });
}

function renderPillarChart() {
    const canvas = document.getElementById('pillarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const pillarOrder = ['Policy', 'Risk Management', 'Assurance', 'Promotion'];
    const colors = ['#2e7daf', '#e8a838', '#28a745', '#dc3545'];
    const scores = pillarOrder.map(p => airlineData.pillarAverages[p] || 0);

    if (pillarChart) pillarChart.destroy();

    pillarChart = new Chart(ctx, {
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

    const container = document.getElementById('pillarLegend');
    if (!container) return;
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

function renderGapAnalysis() {
    const container = document.getElementById('gapGrid');
    if (!container) return;
    container.innerHTML = '';

    if (!airlineData.gaps) {
        container.innerHTML =
            `<div style="text-align:center;padding:30px;color:#6c757d;grid-column:1/-1;">No gap data available.</div>`;
        return;
    }

    const sortedGaps = Object.keys(airlineData.gaps).sort((a, b) => airlineData.gaps[b].gap - airlineData.gaps[a].gap);

    sortedGaps.forEach(key => {
        const gap = airlineData.gaps[key];
        const severityClass = gap.severity.includes('Critical') ? 'critical' :
            gap.severity.includes('Moderate') ? 'moderate' :
            gap.severity.includes('Minor') ? 'minor' : 'compliant';

        const item = document.createElement('div');
        item.className = `gap-item ${severityClass}`;

        const gapDisplay = gap.gap <= 0 ? '+' + Math.abs(gap.gap).toFixed(1) : '-' + gap.gap.toFixed(1);
        const gapClass = gap.gap <= 0 ? 'positive' : (gap.gap <= 0.5 ? 'neutral' : 'negative');

        item.innerHTML = `
            <div class="element-name">
                <span style="font-weight:700;color:#0a2e4a;">Element ${key}</span>
                <span style="font-weight:400;color:#6c757d;font-size:0.85rem;display:block;">${gap.name}</span>
                <span class="pillar-tag">${gap.pillar}</span>
            </div>
            <div class="score">
                <span class="current">${gap.current.toFixed(1)}</span>
                <span class="target">/ 5.0</span>
                <span class="gap-value ${gapClass}">${gapDisplay}</span>
            </div>
        `;

        container.appendChild(item);
    });
}

function renderCAP() {
    const container = document.getElementById('capGrid');
    if (!container) return;
    container.innerHTML = '';

    if (!airlineData.gaps) {
        container.innerHTML =
            `<div style="grid-column:1/-1;text-align:center;padding:30px;color:#6c757d;">No corrective actions needed.</div>`;
        return;
    }

    const pillarGroups = {};
    for (const key in airlineData.gaps) {
        const gap = airlineData.gaps[key];
        if (gap.gap > 0.3) {
            if (!pillarGroups[gap.pillar]) pillarGroups[gap.pillar] = [];
            pillarGroups[gap.pillar].push({ key, gap });
        }
    }

    if (Object.keys(pillarGroups).length === 0) {
        container.innerHTML =
            `<div style="grid-column:1/-1;text-align:center;padding:30px;color:#28a745;">
                <i class="fas fa-check-circle" style="font-size:2rem;display:block;margin-bottom:10px;"></i>
                <h4 style="color:#28a745;">Excellent! No corrective actions needed.</h4>
            </div>`;
        return;
    }

    const actionTemplates = {
        'Policy': [
            'Review and update safety policy documents to align with ICAO Annex 19 requirements.',
            'Establish clear safety accountabilities and responsibilities at all organizational levels.',
            'Conduct management safety briefings to reinforce commitment to safety.'
        ],
        'Risk Management': [
            'Implement a formal hazard identification and risk assessment process.',
            'Develop risk mitigation strategies with clear timelines and responsibilities.',
            'Conduct regular risk assessment training for all relevant personnel.'
        ],
        'Assurance': [
            'Establish safety performance indicators (SPIs) to monitor safety performance.',
            'Implement a regular internal safety audit program.',
            'Develop a management of change process for operational changes.'
        ],
        'Promotion': [
            'Develop and implement a comprehensive safety training program.',
            'Establish effective safety communication channels across the organization.',
            'Foster a positive safety culture through leadership engagement.'
        ]
    };

    const severityOrder = { 'Critical Gap': 0, 'Moderate Gap': 1, 'Minor Gap': 2 };

    for (const pillar in pillarGroups) {
        pillarGroups[pillar].sort((a, b) => {
            return severityOrder[a.gap.severity] - severityOrder[b.gap.severity];
        });

        const topGap = pillarGroups[pillar][0];
        const priorityClass = topGap.gap.severity.includes('Critical') ? 'high' :
            topGap.gap.severity.includes('Moderate') ? 'medium' : 'low';
        const priorityLabel = topGap.gap.severity.includes('Critical') ? 'HIGH' :
            topGap.gap.severity.includes('Moderate') ? 'MEDIUM' : 'LOW';

        const actions = actionTemplates[pillar] || ['Review and improve safety management practices.'];

        const card = document.createElement('div');
        card.className = `cap-item priority-${priorityClass}`;
        card.innerHTML = `
            <div class="cap-header">
                <span class="cap-pillar"><i class="fas ${PILLAR_ICONS[pillar]}"></i> ${pillar}</span>
                <span class="cap-priority ${priorityClass}">${priorityLabel} PRIORITY</span>
            </div>
            <div class="cap-title">${pillar} Improvement Plan</div>
            <div class="cap-current">
                Current score: ${topGap.gap.current.toFixed(1)}/5.0 | Gap: ${topGap.gap.gap.toFixed(1)} points
                ${pillarGroups[pillar].length > 1 ? `| ${pillarGroups[pillar].length} elements affected` : ''}
            </div>
            <div class="cap-action">
                <i class="fas fa-check-circle"></i>
                <strong>Recommended Actions:</strong>
                <ul style="margin-top:5px;padding-left:20px;font-size:0.85rem;color:#495057;">
                    ${actions.slice(0, 3).map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        `;
        container.appendChild(card);
    }
}

function renderCharts() {
    // Element Chart
    const elementCanvas = document.getElementById('elementChart');
    if (!elementCanvas) return;

    const ctx1 = elementCanvas.getContext('2d');
    let labels = [],
        scores = [],
        colors = [];

    if (airlineData.elementAverages) {
        const sortedKeys = Object.keys(airlineData.elementAverages).sort((a, b) => parseInt(a) - parseInt(b));
        labels = sortedKeys.map(key => `E${key}`);
        scores = sortedKeys.map(key => airlineData.elementAverages[key]);
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

    if (elementChart) elementChart.destroy();

    elementChart = new Chart(ctx1, {
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

    // Gap Chart
    const gapCanvas = document.getElementById('gapChart');
    if (!gapCanvas) return;

    const ctx2 = gapCanvas.getContext('2d');
    let gapLabels = [],
        gapData = [],
        gapColors = [];

    if (airlineData.gaps) {
        const sortedGaps = Object.keys(airlineData.gaps).sort((a, b) => airlineData.gaps[b].gap - airlineData.gaps[a].gap);
        gapLabels = sortedGaps.map(key => `E${key}`);
        gapData = sortedGaps.map(key => airlineData.gaps[key].gap);
        gapColors = gapData.map(gap => {
            if (gap <= 0) return '#28a745';
            if (gap <= 0.5) return '#ffc107';
            if (gap <= 1.0) return '#fd7e14';
            return '#dc3545';
        });
    } else {
        gapLabels = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12'];
        gapData = new Array(12).fill(0);
        gapColors = new Array(12).fill('#dee2e6');
    }

    if (gapChart) gapChart.destroy();

    gapChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: gapLabels,
            datasets: [{
                label: 'Gap to Target (4.5)',
                data: gapData,
                backgroundColor: gapColors,
                borderColor: gapColors.map(c => c),
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

// ============================================================
// EXPORT FUNCTIONS
// ============================================================
function exportPDF() {
    const element = document.getElementById('dashboardContainer');
    if (!element) return;

    const btn = document.querySelector('.btn-export.pdf');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Safety_Report_${airlineName}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save().then(function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
            console.log('✅ PDF exported');
        }).catch(function(err) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            alert('PDF export failed. Please use Print > Save as PDF.');
        });
    } else {
        alert('PDF export requires html2pdf library. Please use Print > Save as PDF.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function exportExcel() {
    if (!airlineData) {
        alert('No data to export.');
        return;
    }

    let csv = `Safety Report - ${airlineName}\n`;
    csv += `Generated: ${new Date().toLocaleString()}\n`;
    csv += `Survey Period: ${document.getElementById('surveyPeriod')?.textContent || 'N/A'}\n\n`;
    csv += 'PILLAR SUMMARY\n';
    csv += 'Pillar,Average Score,Status\n';
    for (const pillar in airlineData.pillarAverages) {
        const score = airlineData.pillarAverages[pillar] || 0;
        const status = score >= 4.0 ? 'Strong' : (score >= 3.0 ? 'Moderate' : 'Weak');
        csv += `${pillar},${score.toFixed(1)},${status}\n`;
    }
    csv += '\nELEMENT DETAILS\n';
    csv += 'Element,Name,Pillar,Current Score,Target Score,Gap,Severity\n';
    for (const key in airlineData.gaps) {
        const gap = airlineData.gaps[key];
        csv +=
            `Element ${key},${gap.name},${gap.pillar},${gap.current.toFixed(1)},4.5,${gap.gap.toFixed(1)},${gap.severity}\n`;
    }
    csv += '\nSUMMARY\n';
    csv += `Completed Surveys,${airlineData.sessionsCompleted || 0}\n`;
    csv += `Overall Average,${airlineData.overallAverage.toFixed(1)}\n`;
    csv += `Critical Gaps,${airlineData.criticalGaps}\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Safety_Report_${airlineName}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ Excel export complete!');
}

// ============================================================
// LOGOUT
// ============================================================
function logout() {
    if (typeof logoutUser === 'function') {
        logoutUser(true);
    } else {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('sms_user_data');
            localStorage.removeItem('sms_token');
            window.location.href = 'index.html';
        }
    }
}

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__safetyDashboard = {
    airlineData,
    tenantId,
    airlineName,
    exportPDF,
    exportExcel,
    logout,
    getSurveyPeriod,
    getAirlineData,
    detectTenantWithData
};

console.log('🛡️ Safety Officer Dashboard ready');
console.log(`🏢 Airline: ${airlineName}`);
console.log(`📋 Tenant ID: ${tenantId}`);
console.log(`📊 Data loaded: ${airlineData ? 'Yes' : 'No'}`);
console.log(`📅 Survey Period: ${document.getElementById('surveyPeriod')?.textContent || 'Loading...'}`);