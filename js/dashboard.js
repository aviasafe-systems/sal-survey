/*
================================================================================
FILE: SurveySMS/js/dashboard.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Dashboard page logic - session management, progress tracking using auth module
DEPENDENCIES: utils.js, storage.js, auth.js, translations.js
USAGE: dashboard.html (CAAN) and safety-dashboard.html (Safety Officers)
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// CONFIGURATION
// ============================================================
const SESSIONS = [
    {
        id: 1,
        title: {
            en: 'Baseline Assessment',
            np: 'आधारभूत मूल्याङ्कन'
        },
        description: {
            en: 'Establish your safety management baseline across all 12 SMS elements.',
            np: 'सबै १२ एसएमएस तत्वहरूमा तपाईंको सुरक्षा व्यवस्थापन आधारभूत स्थापना गर्नुहोस्।'
        },
        icon: 'fa-flag-checkered',
        questions: 24,
        estimatedTime: '15-20 min'
    },
    {
        id: 2,
        title: {
            en: 'Follow-up Evaluation',
            np: 'अनुगमन मूल्याङ्कन'
        },
        description: {
            en: 'Evaluate progress and identify emerging safety trends.',
            np: 'प्रगति मूल्याङ्कन गर्नुहोस् र उदीयमान सुरक्षा प्रवृत्तिहरू पहिचान गर्नुहोस्।'
        },
        icon: 'fa-chart-line',
        questions: 24,
        estimatedTime: '15-20 min'
    },
    {
        id: 3,
        title: {
            en: 'Progress Review',
            np: 'प्रगति समीक्षा'
        },
        description: {
            en: 'Measure improvement and track corrective action effectiveness.',
            np: 'सुधार मापन गर्नुहोस् र सुधारात्मक कार्यको प्रभावकारिता ट्र्याक गर्नुहोस्।'
        },
        icon: 'fa-gauge-high',
        questions: 24,
        estimatedTime: '15-20 min'
    },
    {
        id: 4,
        title: {
            en: 'Advanced Assessment',
            np: 'उन्नत मूल्याङ्कन'
        },
        description: {
            en: 'Deep dive into complex safety management areas.',
            np: 'जटिल सुरक्षा व्यवस्थापन क्षेत्रहरूमा गहिरो अध्ययन गर्नुहोस्।'
        },
        icon: 'fa-microscope',
        questions: 24,
        estimatedTime: '15-20 min'
    },
    {
        id: 5,
        title: {
            en: 'Final Assessment',
            np: 'अन्तिम मूल्याङ्कन'
        },
        description: {
            en: 'Complete comprehensive gap analysis and generate final report.',
            np: 'व्यापक ग्याप विश्लेषण पूरा गर्नुहोस् र अन्तिम रिपोर्ट उत्पन्न गर्नुहोस्।'
        },
        icon: 'fa-trophy',
        questions: 24,
        estimatedTime: '15-20 min'
    }
];

// ============================================================
// STATE
// ============================================================
let userData = null;
let tenantId = null;
let airlineName = null;
let currentLang = 'en';
let userRole = 'participant';

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Dashboard Loaded');

    // ============================================================
    // 🔐 AUTHENTICATION USING AUTH MODULE
    // ============================================================
    
    // Get user data from auth module
    if (typeof getCurrentUser === 'function') {
        userData = getCurrentUser();
    } else {
        // Fallback for compatibility
        userData = JSON.parse(localStorage.getItem('sms_user_data') || '{}');
    }

    if (!userData || !userData.email) {
        window.location.href = 'login.html';
        return;
    }

    tenantId = userData.tenantId || 'default';
    airlineName = userData.airline || userData.displayName || 'Aviation Organization';
    currentLang = userData.language || 'en';
    userRole = userData.role || 'participant';

    // Update UI
    updateUserUI();
    updateAirlineBranding();
    updateStats();
    renderSessions();
    updateViewReportButton();
    updateLanguageToggle();
    updateTranslations();
    
    console.log(`📊 Dashboard ready for: ${airlineName} (${userRole})`);
});

// ============================================================
// LANGUAGE FUNCTIONS
// ============================================================
function updateLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.textContent = currentLang === 'en' ? '🇳🇵 नेपाली' : '🇬🇧 English';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'np' : 'en';
    userData.language = currentLang;
    if (typeof setUserData === 'function') {
        setUserData(userData);
    } else {
        localStorage.setItem('sms_user_data', JSON.stringify(userData));
    }
    updateLanguageToggle();
    updateTranslations();
    renderSessions();
    updateViewReportButton();
    updateStats();
    updateAirlineBranding();
}

function updateTranslations() {
    const t = (key) => getTranslation(key, currentLang);

    document.title = t('dashboard_title') || 'Dashboard - Safety Management Survey';

    document.getElementById('labelCompleted').textContent = t('completed_sessions') || 'Completed Sessions';
    document.getElementById('labelCurrent').textContent = t('current_session') || 'Current Session';
    document.getElementById('labelQuestions').textContent = t('questions_answered') || 'Questions Answered';
    document.getElementById('labelProgress').textContent = t('overall_progress') || 'Overall Progress';

    document.getElementById('progressLabel').textContent = t('overall_survey_progress') || 'Overall Survey Progress';
    document.getElementById('progressText').textContent = t('progress_percent') || '0% Complete';

    document.getElementById('sessionsTitle').textContent = t('survey_sessions') || 'Survey Sessions';
    document.getElementById('sessionsDescription').textContent = t('sessions_description') || 'Complete all 5 sessions to generate your comprehensive SMS gap analysis report. Each session contains 24 questions and takes approximately 15-20 minutes.';

    document.getElementById('viewReportTitle').textContent = t('view_report_title') || 'View Your Analytics Report';
    document.getElementById('viewReportStatus').textContent = t('view_report_status') || 'Complete at least one session to generate your report.';
    document.getElementById('viewReportBtnText').textContent = t('view_report_btn') || 'View Analytics Report';

    document.getElementById('logoutBtnText').textContent = t('logout') || 'Logout';
}

// ============================================================
// UI UPDATE FUNCTIONS
// ============================================================
function updateUserUI() {
    document.getElementById('userAvatar').src = userData.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(airlineName) + '&background=0a2e4a&color=fff&size=128';
    document.getElementById('userName').textContent = userData.name || airlineName;
    document.getElementById('userEmail').textContent = userData.email || '';
    document.getElementById('tenantBadge').innerHTML = `
        ${airlineName}
        <span class="demo-badge">DEMO</span>
    `;
}

function updateAirlineBranding() {
    const t = (key) => getTranslation(key, currentLang);
    document.getElementById('airlineName').textContent = airlineName;
    document.getElementById('airlinePurpose').textContent =
        `${t('complete_survey_to_generate') || 'Complete the survey to generate your comprehensive SMS gap analysis report for'} ${airlineName}.`;
}

function updateStats() {
    const answers = JSON.parse(localStorage.getItem(`sms_${tenantId}_session_1_answers`) || '[]');
    const answered = answers.filter(a => a !== null && a !== undefined).length;
    const total = 24;
    const progress = Math.round((answered / total) * 100);
    const completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');

    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('answeredQuestions').textContent = answered;
    document.getElementById('completionStatus').textContent = progress + '%';
    document.getElementById('completedSessions').textContent = completed;
    document.getElementById('currentSession').textContent = completed + (answered > 0 ? 1 : 0);

    const progressEl = document.getElementById('progressPercent');
    progressEl.textContent = progress + '%';
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = progress + '% Complete';

    const statusEl = document.getElementById('surveyStatus');
    const t = (key) => getTranslation(key, currentLang);
    if (progress === 100) {
        statusEl.textContent = '✅ ' + (t('complete') || 'Complete');
        statusEl.style.color = '#28a745';
        document.getElementById('viewAnalyticsBtn').disabled = false;
    } else if (progress > 0) {
        statusEl.textContent = '⏳ ' + (t('in_progress') || 'In Progress');
        statusEl.style.color = '#e8a838';
        document.getElementById('viewAnalyticsBtn').disabled = true;
    } else {
        statusEl.textContent = '⏳ ' + (t('pending') || 'Pending');
        statusEl.style.color = '#6c757d';
        document.getElementById('viewAnalyticsBtn').disabled = true;
    }
}

function renderSessions() {
    const grid = document.getElementById('sessionsGrid');
    grid.innerHTML = '';

    const completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');
    const current = parseInt(localStorage.getItem(`sms_${tenantId}_current_session`) || '0');
    const t = (key) => getTranslation(key, currentLang);

    const hasData = localStorage.getItem(`sms_${tenantId}_session_1_answers`) !== null;

    if (!hasData && completed === 0) {
        grid.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-clipboard-list"></i>
                <h3>${t('no_data_title') || 'No Survey Data Found'}</h3>
                <p>${t('no_data_desc') || 'Click "Start Session" below to begin your first survey session.'}</p>
            </div>
        `;
    }

    SESSIONS.forEach((session, index) => {
        const sessionNumber = index + 1;
        const isCompleted = sessionNumber <= completed;
        const isCurrent = sessionNumber === completed + 1 && current > 0;
        const isLocked = sessionNumber > completed + 1;
        const isAvailable = sessionNumber === completed + 1 || isCompleted;

        const card = document.createElement('div');
        card.className = `session-card ${isLocked ? 'locked' : ''}`;

        let statusClass = 'status-pending';
        let statusText = t('not_started') || 'Not Started';
        let statusIcon = 'fa-circle';

        if (isCompleted) {
            statusClass = 'status-completed';
            statusText = t('completed') || 'Completed';
            statusIcon = 'fa-check-circle';
        } else if (isCurrent) {
            statusClass = 'status-in-progress';
            statusText = t('in_progress') || 'In Progress';
            statusIcon = 'fa-spinner fa-spin';
        } else if (isAvailable) {
            statusClass = 'status-pending';
            statusText = t('ready_to_start') || 'Ready to Start';
            statusIcon = 'fa-play-circle';
        } else {
            statusClass = 'status-locked';
            statusText = t('locked') || 'Locked';
            statusIcon = 'fa-lock';
        }

        const sessionNumberClass = isCompleted ? 'completed' : (isCurrent ? 'in-progress' : '');

        const titleText = session.title[currentLang] || session.title['en'];
        const descText = session.description[currentLang] || session.description['en'];

        let buttonText = t('start_session') || 'Start Session';
        if (isCompleted) {
            buttonText = t('retake') || 'Retake';
        } else if (isCurrent) {
            buttonText = t('continue') || 'Continue';
        } else if (isAvailable) {
            buttonText = t('start_session') || 'Start Session';
        } else {
            buttonText = t('locked') || 'Locked';
        }

        card.innerHTML = `
            <span class="session-number ${sessionNumberClass}">
                <i class="fas ${session.icon}"></i> ${t('session') || 'Session'} ${sessionNumber} of 5
            </span>
            <h3>${titleText}</h3>
            <p class="session-description">${descText}</p>
            <div class="meta">
                <span><i class="fas fa-question-circle"></i> ${session.questions} ${t('questions') || 'Questions'}</span>
                <span class="status">
                    <i class="fas ${statusIcon}"></i>
                    <span class="${statusClass}">${statusText}</span>
                </span>
            </div>
            <button class="btn btn-start ${isCompleted ? 'completed' : ''}" 
                    onclick="startSession(${sessionNumber})"
                    ${!isAvailable ? 'disabled' : ''}>
                <i class="fas ${isCompleted ? 'fa-redo' : (isCurrent ? 'fa-play' : (isAvailable ? 'fa-play' : 'fa-lock'))}"></i>
                ${buttonText}
            </button>
        `;

        grid.appendChild(card);
    });
}

// ============================================================
// VIEW REPORT BUTTON
// ============================================================
function updateViewReportButton() {
    const completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');
    const btn = document.getElementById('viewAnalyticsBtn');
    const status = document.getElementById('viewReportStatus');
    const t = (key) => getTranslation(key, currentLang);

    if (completed === 0) {
        btn.disabled = true;
        status.textContent = t('view_report_status') || 'Complete at least one session to generate your report.';
    } else if (completed === 5) {
        btn.disabled = false;
        status.textContent = t('view_report_complete') || '🎉 All 5 sessions complete! View your comprehensive gap analysis report.';
        btn.innerHTML = `
            <i class="fas fa-chart-pie"></i>
            ${t('view_full_report') || 'View Full Analytics Report'}
            <span class="badge">${t('complete') || 'COMPLETE'}</span>
        `;
        btn.style.background = '#28a745';
    } else {
        btn.disabled = false;
        status.textContent = t('view_report_progress') || `📊 ${completed} of 5 sessions complete. View your progress report.`;
        btn.innerHTML = `
            <i class="fas fa-chart-pie"></i>
            ${t('view_report_btn') || 'View Analytics Report'} (${completed}/5)
            <span class="badge">${t('progress') || 'PROGRESS'}</span>
        `;
        btn.style.background = '#0a2e4a';
    }

    document.getElementById('viewReportBtnText').textContent = t('view_report_btn') || 'View Analytics Report';
}

// ============================================================
// NAVIGATION
// ============================================================
function goToAnalytics() {
    window.location.href = `analytics/analytics.html?tenant=${tenantId}&lang=${currentLang}`;
}

function startSession(sessionNumber) {
    const completed = parseInt(localStorage.getItem(`sms_${tenantId}_completed_sessions`) || '0');
    const t = (key) => getTranslation(key, currentLang);

    if (sessionNumber > completed + 1) {
        alert(t('session_locked') || 'This session is locked. Please complete previous sessions first.');
        return;
    }

    if (sessionNumber <= completed) {
        if (!confirm(t('retake_confirm') || `You've already completed Session ${sessionNumber}. Would you like to retake it?`)) {
            return;
        }
        localStorage.removeItem(`sms_${tenantId}_session_${sessionNumber}_answers`);
    }

    localStorage.setItem(`sms_${tenantId}_current_session`, sessionNumber);
    localStorage.setItem(`sms_${tenantId}_current_answers`, JSON.stringify([]));
    localStorage.setItem(`sms_${tenantId}_session_start`, new Date().toISOString());

    window.location.href = `survey/survey.html?tenant=${tenantId}&session=${sessionNumber}&lang=${currentLang}`;
}

function logout() {
    const t = (key) => getTranslation(key, currentLang);
    if (confirm(t('logout_confirm') || 'Are you sure you want to logout?')) {
        if (typeof logoutUser === 'function') {
            logoutUser(true);
        } else {
            localStorage.removeItem('sms_user_data');
            localStorage.removeItem('sms_token');
            window.location.href = `login.html?lang=${currentLang}`;
        }
    }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'l' || e.key === 'L') {
        logout();
    }
    if (e.key === 's' || e.key === 'S') {
        startSession(1);
    }
    if (e.key === 'v' || e.key === 'V') {
        const btn = document.getElementById('viewAnalyticsBtn');
        if (!btn.disabled) {
            goToAnalytics();
        }
    }
});

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__dashboard = {
    userData,
    tenantId,
    airlineName,
    currentLang,
    SESSIONS,
    startSession,
    logout,
    goToAnalytics,
    toggleLanguage,
    updateStats,
    renderSessions,
    updateViewReportButton
};