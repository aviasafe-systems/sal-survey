/*
================================================================================
FILE: SurveySMS/js/analytics/data-utils.js
VERSION: 1.0
REVISION DATE: 2026-06-16
PURPOSE: Data processing utilities for analytics
AFFECTED: analytics/airline-analytics.html, analytics/caan-analytics.html
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

const AIRLINES = [
    'Sita Air',
    'Tara Air',
    'Summit Air',
    'Buddha Air',
    'Yeti Airlines',
    'Shree Airlines',
    'Danfe Air'
];

const AIRLINE_TENANTS = {
    'Sita Air': 'sita-air',
    'Tara Air': 'tara-air',
    'Summit Air': 'summit-air',
    'Buddha Air': 'buddha-air',
    'Yeti Airlines': 'yeti-airlines',
    'Shree Airlines': 'shree-airlines',
    'Danfe Air': 'danfe-air'
};

// ============================================================
// DATA FUNCTIONS
// ============================================================

function getAirlineCompletionDate(tenantId) {
    return localStorage.getItem(`sms_${tenantId}_last_completion_date`) || null;
}

function getAirlineData(tenantId, airlineName) {
    const completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');
    if (completed === 0) return null;

    const allAnswers = [];
    for (let i = 1; i <= 5; i++) {
        const answers = JSON.parse(localStorage.getItem(`sms_${tenantId}_session_${i}_answers`) || '[]');
        if (answers.length > 0) {
            allAnswers.push(...answers);
        }
    }

    if (allAnswers.length === 0) return null;

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

    const allScores = Object.values(elementAverages);
    const overallAverage = allScores.length > 0 ?
        Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 100) / 100 :
        0;

    const targetScore = 4.5;
    const gaps = {};
    let criticalCount = 0;

    for (let i = 1; i <= 12; i++) {
        const current = elementAverages[i] || 0;
        const gap = Math.round((targetScore - current) * 100) / 100;

        let severity = 'Compliant';
        if (gap > 0 && gap <= 0.5) severity = 'Minor Gap';
        else if (gap > 0.5 && gap <= 1.0) severity = 'Moderate Gap';
        else if (gap > 1.0) { severity = 'Critical Gap';
            criticalCount++; }

        gaps[i] = {
            current: current,
            target: targetScore,
            gap: gap,
            severity: severity,
            name: ELEMENT_NAMES[i],
            pillar: ELEMENT_PILLARS[i]
        };
    }

    return {
        name: airlineName,
        tenantId: tenantId,
        sessionsCompleted: completed,
        totalSessions: 5,
        elementAverages: elementAverages,
        pillarAverages: pillarAverages,
        overallAverage: overallAverage,
        criticalGaps: criticalCount,
        gaps: gaps,
        totalQuestions: allAnswers.length,
        completionDate: getAirlineCompletionDate(tenantId)
    };
}

function loadAllAirlineData() {
    const data = {};
    
    AIRLINES.forEach(airline => {
        const tenantId = AIRLINE_TENANTS[airline];
        const airlineData = getAirlineData(tenantId, airline);
        if (airlineData && airlineData.sessionsCompleted > 0) {
            data[tenantId] = airlineData;
        }
    });

    const defaultData = getAirlineData('default', 'Default');
    if (defaultData && defaultData.sessionsCompleted > 0) {
        data['default'] = defaultData;
    }

    return data;
}

function consolidateAirlineData(airlines) {
    const airlineList = airlines || Object.values(loadAllAirlineData());
    if (airlineList.length === 0) return null;

    const consolidatedElements = {};
    const pillarScores = {};

    airlineList.forEach(airline => {
        for (const key in airline.elementAverages) {
            if (!consolidatedElements[key]) consolidatedElements[key] = [];
            consolidatedElements[key].push(airline.elementAverages[key]);
        }
    });

    const elementAverages = {};
    for (const key in consolidatedElements) {
        const scores = consolidatedElements[key];
        elementAverages[key] = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
    }

    const pillarData = {};
    for (const pillar of ['Policy', 'Risk Management', 'Assurance', 'Promotion']) {
        pillarData[pillar] = [];
    }

    airlineList.forEach(airline => {
        for (const pillar in airline.pillarAverages) {
            if (airline.pillarAverages[pillar] > 0) {
                pillarData[pillar].push(airline.pillarAverages[pillar]);
            }
        }
    });

    const pillarAverages = {};
    for (const pillar in pillarData) {
        const scores = pillarData[pillar];
        pillarAverages[pillar] = scores.length > 0 ?
            Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100 :
            0;
    }

    const allScores = Object.values(elementAverages);
    const overallAverage = allScores.length > 0 ?
        Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 100) / 100 :
        0;

    const targetScore = 4.5;
    const gaps = {};
    let criticalCount = 0;

    for (let i = 1; i <= 12; i++) {
        const current = elementAverages[i] || 0;
        const gap = Math.round((targetScore - current) * 100) / 100;

        let severity = 'Compliant';
        if (gap > 0 && gap <= 0.5) severity = 'Minor Gap';
        else if (gap > 0.5 && gap <= 1.0) severity = 'Moderate Gap';
        else if (gap > 1.0) { severity = 'Critical Gap';
            criticalCount++; }

        gaps[i] = {
            current: current,
            target: targetScore,
            gap: gap,
            severity: severity,
            name: ELEMENT_NAMES[i],
            pillar: ELEMENT_PILLARS[i]
        };
    }

    return {
        name: 'All Airlines (Consolidated)',
        tenantId: 'all',
        sessionsCompleted: airlineList.reduce((sum, a) => sum + a.sessionsCompleted, 0),
        totalSessions: airlineList.length * 5,
        airlinesCount: airlineList.length,
        elementAverages: elementAverages,
        pillarAverages: pillarAverages,
        overallAverage: overallAverage,
        criticalGaps: criticalCount,
        gaps: gaps,
        isConsolidated: true,
        airlineData: airlineList
    };
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ELEMENT_NAMES,
        ELEMENT_PILLARS,
        PILLAR_ICONS,
        PILLAR_COLORS,
        AIRLINES,
        AIRLINE_TENANTS,
        getAirlineData,
        getAirlineCompletionDate,
        loadAllAirlineData,
        consolidateAirlineData
    };
}