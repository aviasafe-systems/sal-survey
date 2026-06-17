/*
================================================================================
FILE: SurveySMS/js/landing.js
VERSION: 2.0
REVISION DATE: 2026-06-17
PURPOSE: Landing page logic - navigation, element rendering
REVISED PURPOSE: Simplified for marketing page (English only)
AFFECTED: index.html
================================================================================
*/

// ============================================================
// ELEMENTS DATA
// ============================================================
const ELEMENTS = [
    { id: 1, name: 'Safety Policy & Objectives', pillar: 'Policy' },
    { id: 2, name: 'Safety Accountabilities', pillar: 'Policy' },
    { id: 3, name: 'Hazard Identification', pillar: 'Risk Management' },
    { id: 4, name: 'Risk Assessment & Mitigation', pillar: 'Risk Management' },
    { id: 5, name: 'Safety Performance Monitoring', pillar: 'Assurance' },
    { id: 6, name: 'Internal Safety Audits', pillar: 'Assurance' },
    { id: 7, name: 'Management of Change', pillar: 'Assurance' },
    { id: 8, name: 'Continuous Improvement', pillar: 'Assurance' },
    { id: 9, name: 'Safety Training & Competence', pillar: 'Promotion' },
    { id: 10, name: 'Safety Communication', pillar: 'Promotion' },
    { id: 11, name: 'Safety Culture', pillar: 'Promotion' },
    { id: 12, name: 'Emergency Response Planning', pillar: 'Assurance' }
];

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SMS Gap Analysis Platform Ready');

    // Render elements
    renderElements();

    // Enable begin button
    const btn = document.getElementById('btnBegin');
    if (btn) {
        btn.disabled = false;
    }

    // Scroll to top button
    window.addEventListener('scroll', function() {
        const btn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
});

// ============================================================
// RENDER ELEMENTS
// ============================================================
function renderElements() {
    const grid = document.getElementById('elementsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    ELEMENTS.forEach(el => {
        const div = document.createElement('div');
        div.className = 'element-item';
        div.innerHTML = `
            <span class="num">${el.id}</span>
            <span class="label">${el.name}</span>
            <span class="pillar-tag">${el.pillar}</span>
        `;
        grid.appendChild(div);
    });
}

// ============================================================
// BEGIN SURVEY
// ============================================================
function beginSurvey() {
    console.log('🔍 Begin Survey button clicked!');

    const btn = document.getElementById('btnBegin');
    if (!btn) return;

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Loading...`;

    // Redirect to login page
    const loginUrl = `login.html`;

    console.log(`🔗 Redirecting to: ${loginUrl}`);

    setTimeout(function() {
        window.location.href = loginUrl;
    }, 800);
}

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__landing = {
    beginSurvey,
    ELEMENTS
};

console.log('📋 Click "Start Your Gap Analysis" to begin');