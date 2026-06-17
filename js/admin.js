/*
================================================================================
FILE: SurveySMS/js/admin.js
VERSION: 1.2.0
REVISION DATE: 2026-06-17
PURPOSE: Admin panel logic - authentication, data management, airline-specific dummy data
DEPENDENCIES: credentials.js, translations.js, auth.js, storage.js
USAGE: admin.html
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// STATE
// ============================================================
let currentLang = 'en';
let ADMIN_EMAIL = 'admin@surveysms.com';

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Admin Panel Loaded');

    // Get language from localStorage
    currentLang = localStorage.getItem('sms_lang') || 'en';

    // Get airlines from credentials module
    renderAirlines();

    // Populate airline selector
    populateAirlineSelector();

    // Update language
    updateLanguageToggle();
    updateTranslations();

    // Check if already logged in using auth module
    if (typeof isLoggedIn === 'function') {
        if (isLoggedIn()) {
            const userData = getCurrentUser();
            if (userData && userData.role === 'admin') {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('adminPanel').classList.add('show');
                console.log('✅ Admin already logged in');
            }
        }
    } else {
        // Fallback to localStorage check
        const userData = JSON.parse(localStorage.getItem('sms_user_data') || '{}');
        if (userData.email === ADMIN_EMAIL) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('adminPanel').classList.add('show');
            console.log('✅ Admin already logged in');
        }
    }

    console.log('💡 Admin panel ready in:', currentLang);
    console.log('💡 Admin email:', ADMIN_EMAIL);
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
    localStorage.setItem('sms_lang', currentLang);
    updateLanguageToggle();
    updateTranslations();
}

function updateTranslations() {
    const t = (key) => getTranslation(key, currentLang);

    document.title = t('admin_title') || 'Admin Panel - SurveySMS';

    // Header
    document.getElementById('adminTitle').textContent = t('admin_panel') || 'Admin Panel';
    document.getElementById('adminSubtitle').textContent = t('admin_subtitle') || 'Manage survey data and generate dummy responses';
    document.getElementById('adminBadge').textContent = t('restricted') || 'RESTRICTED';

    // Login
    document.getElementById('loginLabel').textContent = t('admin_password') || 'Admin Password';
    document.getElementById('loginPlaceholder').placeholder = t('enter_password') || 'Enter admin password';
    document.getElementById('loginBtnText').textContent = t('login') || 'Login';

    // Actions
    document.getElementById('actionWipeTitle').textContent = t('wipe_title') || 'Wipe All Survey Data';
    document.getElementById('actionWipeDesc').textContent = t('wipe_desc') || 'Completely remove all survey responses, sessions, and user data from localStorage.';
    document.getElementById('actionWipeBtn').textContent = t('wipe_btn') || 'Wipe All Data';

    document.getElementById('actionGenerateTitle').textContent = t('generate_title') || 'Generate All Dummy Data';
    document.getElementById('actionGenerateDesc').textContent = t('generate_desc') || 'Generate realistic survey responses for ALL airlines with random scores.';
    document.getElementById('actionGenerateBtn').textContent = t('generate_btn') || 'Generate All';

    document.getElementById('actionStatsTitle').textContent = t('stats_title') || 'Data Statistics';
    document.getElementById('actionStatsDesc').textContent = t('stats_desc') || 'View current data statistics including total sessions and airlines.';
    document.getElementById('actionStatsBtn').textContent = t('stats_btn') || 'View Stats';

    document.getElementById('actionResetTitle').textContent = t('reset_title') || 'Reset Demo User';
    document.getElementById('actionResetDesc').textContent = t('reset_desc') || 'Reset the demo user account to start fresh with a new session.';
    document.getElementById('actionResetBtn').textContent = t('reset_btn') || 'Reset Demo User';

    // Airlines section
    document.getElementById('airlinesTitle').textContent = t('available_airlines') || 'SAAS Provided To:';

    // Footer
    document.getElementById('footerText').textContent = t('admin_footer') || 'SurveySMS Admin Panel';
    document.getElementById('footerBack').textContent = t('back_dashboard') || 'Back to Dashboard';

    // Status messages
    document.getElementById('statusLoginSuccess').textContent = t('login_success') || '✅ Login successful! Welcome to the Admin Panel.';
    document.getElementById('statusWipeSuccess').textContent = t('wipe_success') || '✅ Successfully wiped {count} data items from localStorage.';
    document.getElementById('statusGenerateSuccess').textContent = t('generate_success') || '✅ Dummy data generated successfully!';
    document.getElementById('statusResetSuccess').textContent = t('reset_success') || '✅ Demo user reset successfully! You can now login again.';
}

// ============================================================
// LOGIN
// ============================================================
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('adminEmail')?.value?.trim() || ADMIN_EMAIL;
    const password = document.getElementById('adminPassword').value.trim();
    const errorEl = document.getElementById('loginError');
    const t = (key) => getTranslation(key, currentLang);

    // Use centralized credential validation
    if (typeof validateCredentials === 'function') {
        const user = validateCredentials(email, password);
        
        if (user && user.role === 'admin') {
            // Use auth module to set session
            if (typeof login === 'function') {
                login(email, password).then(result => {
                    if (result.success) {
                        document.getElementById('loginSection').style.display = 'none';
                        document.getElementById('adminPanel').classList.add('show');
                        errorEl.classList.remove('show');
                        console.log('✅ Admin login successful');
                        showStatus('success', t('login_success') || '✅ Login successful! Welcome to the Admin Panel.');
                        renderAirlines();
                        populateAirlineSelector();
                    }
                });
            } else {
                // Fallback
                const userData = {
                    email: email,
                    name: user.displayName,
                    role: user.role,
                    airline: user.airline,
                    tenantId: user.tenantId,
                    language: currentLang,
                    picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.airline)}&background=0a2e4a&color=fff&size=128`,
                    lastLogin: new Date().toISOString()
                };
                localStorage.setItem('sms_user_data', JSON.stringify(userData));
                localStorage.setItem('sms_token', 'admin_token_' + Date.now());
                
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('adminPanel').classList.add('show');
                errorEl.classList.remove('show');
                console.log('✅ Admin login successful');
                showStatus('success', t('login_success') || '✅ Login successful! Welcome to the Admin Panel.');
                renderAirlines();
                populateAirlineSelector();
            }
            return false;
        }
    }

    // Login failed
    errorEl.textContent = t('invalid_password') || 'Invalid credentials. Please try again.';
    errorEl.classList.add('show');
    console.log('❌ Admin login failed');
    return false;
}

// ============================================================
// RENDER AIRLINES
// ============================================================
function renderAirlines() {
    const container = document.getElementById('airlinesList');
    const title = document.getElementById('airlinesTitle');
    
    if (typeof getAirlines === 'function') {
        const airlines = getAirlines();
        const count = airlines.length;
        title.textContent = `SAAS Provided To: (${count})`;
        document.getElementById('tenantCount').textContent = `(${count})`;
        
        container.innerHTML = airlines.map(airline =>
            `<span class="airline-tag">
                <i class="fas fa-plane"></i> ${airline.name}
                ${airline.hasParticipant ? '<span class="badge-participant">👤</span>' : ''}
                ${airline.hasSafetyOfficer ? '<span class="badge-officer">🛡️</span>' : ''}
            </span>`
        ).join('');
        console.log(`✅ Rendered ${airlines.length} airlines from credentials`);
    } else {
        // Fallback
        const airlines = [
            'Sita Air', 'Tara Air', 'Summit Air', 'Buddha Air',
            'Yeti Airlines', 'Shree Airlines', 'Danfe Air'
        ];
        title.textContent = `SAAS Provided To: (${airlines.length})`;
        document.getElementById('tenantCount').textContent = `(${airlines.length})`;
        container.innerHTML = airlines.map(airline =>
            `<span class="airline-tag"><i class="fas fa-plane"></i> ${airline}</span>`
        ).join('');
        console.warn('⚠️ Credentials module not loaded, using hardcoded airlines');
    }
}

// ============================================================
// AIRLINE SELECTOR
// ============================================================
function populateAirlineSelector() {
    const select = document.getElementById('airlineSelector');
    if (!select) return;

    // Clear existing options except "All"
    while (select.options.length > 0) {
        select.remove(0);
    }

    // Add "All Airlines" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = '✈️ All Airlines';
    select.appendChild(allOption);

    // Get airlines from credentials
    let airlines = [];
    if (typeof getAirlines === 'function') {
        airlines = getAirlines();
    } else {
        airlines = [
            { name: 'Sita Air', tenantId: 'sita-air' },
            { name: 'Tara Air', tenantId: 'tara-air' },
            { name: 'Summit Air', tenantId: 'summit-air' },
            { name: 'Buddha Air', tenantId: 'buddha-air' },
            { name: 'Yeti Airlines', tenantId: 'yeti-airlines' },
            { name: 'Shree Airlines', tenantId: 'shree-airlines' },
            { name: 'Danfe Air', tenantId: 'danfe-air' }
        ];
    }

    // Add each airline
    airlines.forEach(airline => {
        const option = document.createElement('option');
        option.value = airline.tenantId || airline.name.toLowerCase().replace(/ /g, '-');
        option.textContent = `✈️ ${airline.name}`;
        select.appendChild(option);
    });

    // Add CAAN
    const caanOption = document.createElement('option');
    caanOption.value = 'caan';
    caanOption.textContent = '🏛️ CAAN';
    select.appendChild(caanOption);

    console.log(`✅ Populated airline selector with ${airlines.length + 2} options`);
}

// ============================================================
// GENERATE DUMMY DATA FOR SPECIFIC AIRLINE
// ============================================================
function generateDummyDataForAirline() {
    const select = document.getElementById('airlineSelector');
    const tenantId = select.value;
    const t = (key) => getTranslation(key, currentLang);

    // Get airline name for display
    let airlineName = 'All Airlines';
    if (tenantId !== 'all') {
        const option = select.options[select.selectedIndex];
        airlineName = option.textContent.replace('✈️ ', '').replace('🏛️ ', '');
    }

    if (!confirm(`This will generate dummy survey responses for:\n\n📊 ${airlineName}\n\nExisting data will be preserved.\n\nContinue?`)) {
        return;
    }

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> Generating...`;
    btn.disabled = true;

    setTimeout(() => {
        try {
            let results;
            if (tenantId === 'all') {
                results = generateDummyResponses();
            } else {
                results = generateDummyResponsesForTenant(tenantId);
            }

            btn.innerHTML = originalText;
            btn.disabled = false;

            showStatus('success', `
                <i class="fas fa-check-circle"></i>
                <strong>✅ Dummy data generated successfully!</strong><br>
                ${results.summary}
            `);

            console.log('✅ Dummy data generated:', results);
            
            // Refresh stats and airlines list
            renderAirlines();
        } catch (error) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            console.error('❌ Error generating dummy data:', error);
            showStatus('error', t('generate_error') || '❌ Error generating dummy data: ' + error.message);
        }
    }, 200);
}

function generateDummyResponsesForTenant(tenantId) {
    const results = {
        airlines: [],
        totalSessions: 0,
        summary: ''
    };

    // Find airline name from tenantId
    let airlineName = tenantId;
    let airlines = [];
    if (typeof getAirlines === 'function') {
        airlines = getAirlines();
        const found = airlines.find(a => a.tenantId === tenantId);
        if (found) airlineName = found.name;
    } else {
        const map = {
            'sita-air': 'Sita Air',
            'tara-air': 'Tara Air',
            'summit-air': 'Summit Air',
            'buddha-air': 'Buddha Air',
            'yeti-airlines': 'Yeti Airlines',
            'shree-airlines': 'Shree Airlines',
            'danfe-air': 'Danfe Air'
        };
        airlineName = map[tenantId] || tenantId;
    }

    // Generate 5 sessions with realistic scores
    const sessions = generateSessionsForAirline(airlineName, tenantId, 1);
    results.airlines.push({
        name: airlineName,
        tenantId: tenantId,
        sessions: sessions
    });
    results.totalSessions += sessions;

    results.summary = `
        Generated data for <strong>${airlineName}</strong><br>
        Total sessions created: <strong>${sessions}</strong><br>
        All 5 sessions complete (${sessions} total)
    `;

    return results;
}

// ============================================================
// WIPE DATA FOR SPECIFIC AIRLINE
// ============================================================
function wipeDataForAirline() {
    const select = document.getElementById('airlineSelector');
    const tenantId = select.value;
    const t = (key) => getTranslation(key, currentLang);

    // Get airline name for display
    let airlineName = 'All Airlines';
    let isAll = tenantId === 'all';
    if (!isAll) {
        const option = select.options[select.selectedIndex];
        airlineName = option.textContent.replace('✈️ ', '').replace('🏛️ ', '');
    }

    const confirmMsg = isAll
        ? '⚠️ WARNING: This will permanently delete ALL survey data for ALL airlines!\n\nAre you sure you want to continue?'
        : `⚠️ WARNING: This will permanently delete ALL survey data for:\n\n📊 ${airlineName}\n\nAre you sure you want to continue?`;

    if (!confirm(confirmMsg)) {
        return;
    }

    if (!confirm('🔴 LAST CHANCE: All data will be lost forever. Continue?')) {
        return;
    }

    try {
        let count = 0;
        const keys = Object.keys(localStorage);

        keys.forEach(key => {
            let shouldDelete = false;

            if (isAll) {
                // Delete all sms_ keys
                if (key.startsWith('sms_')) {
                    shouldDelete = true;
                }
            } else {
                // Delete only keys for specific tenant
                if (key.startsWith(`sms_${tenantId}_`)) {
                    shouldDelete = true;
                }
                // Also delete session keys that match
                if (key.includes(`session_`) && key.includes(tenantId)) {
                    shouldDelete = true;
                }
            }

            if (shouldDelete) {
                localStorage.removeItem(key);
                count++;
            }
        });

        console.log(`✅ Wiped ${count} items from localStorage for: ${airlineName}`);
        showStatus('success', `
            <i class="fas fa-check-circle"></i>
            <strong>✅ Successfully wiped ${count} data items for ${airlineName}!</strong>
        `);

        // Refresh stats and airlines list
        renderAirlines();
    } catch (error) {
        console.error('❌ Error wiping data:', error);
        showStatus('error', '❌ Error wiping data: ' + error.message);
    }
}

// ============================================================
// STATUS MESSAGES
// ============================================================
function showStatus(type, message) {
    const el = document.getElementById('statusMsg');
    el.className = `status-msg show ${type}`;
    el.innerHTML = message;

    clearTimeout(window.statusTimeout);
    window.statusTimeout = setTimeout(() => {
        el.classList.remove('show');
    }, 8000);
}

// ============================================================
// WIPE ALL DATA
// ============================================================
function wipeData() {
    const t = (key) => getTranslation(key, currentLang);

    if (!confirm(t('wipe_confirm1') || '⚠️ WARNING: This will permanently delete ALL survey data!\n\nAre you sure you want to continue?')) {
        return;
    }

    if (!confirm(t('wipe_confirm2') || '🔴 LAST CHANCE: All data will be lost forever. Continue?')) {
        return;
    }

    try {
        const keys = Object.keys(localStorage);
        let count = 0;

        keys.forEach(key => {
            if (key.startsWith('sms_') ||
                key.includes('session_') ||
                key.includes('survey_') ||
                key === 'sms_user_data' ||
                key === 'sms_token' ||
                key === 'sms_completed_sessions' ||
                key === 'sms_current_session' ||
                key === 'sms_current_answers' ||
                key === 'sms_session_start') {
                localStorage.removeItem(key);
                count++;
            }
        });

        console.log(`✅ Wiped ${count} items from localStorage`);
        showStatus('success', t('wipe_success').replace('{count}', count));
        
        // Refresh airlines list
        renderAirlines();
    } catch (error) {
        console.error('❌ Error wiping data:', error);
        showStatus('error', t('wipe_error') || '❌ Error wiping data: ' + error.message);
    }
}

// ============================================================
// GENERATE ALL DUMMY DATA
// ============================================================
function generateDummyData() {
    const t = (key) => getTranslation(key, currentLang);

    if (!confirm(t('generate_confirm') || 'This will generate dummy survey responses for all airlines.\n\nExisting data will be preserved.\n\nContinue?')) {
        return;
    }

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> ${t('generating') || 'Generating...'}`;
    btn.disabled = true;

    setTimeout(() => {
        try {
            const results = generateDummyResponses();
            btn.innerHTML = originalText;
            btn.disabled = false;

            showStatus('success', `
                <i class="fas fa-check-circle"></i>
                <strong>${t('generate_success') || 'Dummy data generated successfully!'}</strong><br>
                ${results.summary}
            `);

            console.log('✅ Dummy data generated:', results);
            
            // Refresh airlines list
            renderAirlines();
        } catch (error) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            console.error('❌ Error generating dummy data:', error);
            showStatus('error', t('generate_error') || '❌ Error generating dummy data: ' + error.message);
        }
    }, 200);
}

function generateDummyResponses() {
    const results = {
        airlines: [],
        totalSessions: 0,
        summary: ''
    };

    let airlines;
    if (typeof getAirlines === 'function') {
        airlines = getAirlines().map(a => a.name);
    } else {
        airlines = [
            'Sita Air', 'Tara Air', 'Summit Air', 'Buddha Air',
            'Yeti Airlines', 'Shree Airlines', 'Danfe Air'
        ];
    }

    const tenantMap = {
        'Sita Air': 'sita-air',
        'Tara Air': 'tara-air',
        'Summit Air': 'summit-air',
        'Buddha Air': 'buddha-air',
        'Yeti Airlines': 'yeti-airlines',
        'Shree Airlines': 'shree-airlines',
        'Danfe Air': 'danfe-air'
    };

    airlines.forEach((airline, index) => {
        const tenantId = tenantMap[airline] || airline.toLowerCase().replace(/ /g, '-');
        const sessions = generateSessionsForAirline(airline, tenantId, index);
        results.airlines.push({
            name: airline,
            tenantId: tenantId,
            sessions: sessions
        });
        results.totalSessions += sessions;
    });

    results.summary = `
        Generated data for <strong>${airlines.length}</strong> airlines<br>
        Total sessions created: <strong>${results.totalSessions}</strong><br>
        Each airline has <strong>5 sessions</strong> (${airlines.length * 5} total)
    `;

    return results;
}

function generateSessionsForAirline(airline, tenantId, seed) {
    let sessionsCreated = 0;

    for (let sessionNum = 1; sessionNum <= 5; sessionNum++) {
        const answers = generateSessionAnswers(seed + sessionNum);

        const key = `sms_${tenantId}_session_${sessionNum}_answers`;
        localStorage.setItem(key, JSON.stringify(answers));
        localStorage.setItem(`sms_${tenantId}_session_${sessionNum}_completed`, 'true');

        sessionsCreated++;
    }

    localStorage.setItem(`sms_${tenantId}_completed_sessions`, '5');
    localStorage.setItem(`sms_${tenantId}_current_session`, '0');

    const airlineData = {
        name: airline,
        tenantId: tenantId,
        sessionsCompleted: 5,
        totalSessions: 5,
        generatedAt: new Date().toISOString()
    };
    localStorage.setItem(`sms_${tenantId}_airline_data`, JSON.stringify(airlineData));

    let email = `demo@${tenantId}.com`;
    if (typeof window !== 'undefined' && window.CREDENTIALS) {
        for (const [e, u] of Object.entries(window.CREDENTIALS)) {
            if (u.airline === airline && u.role === 'participant') {
                email = e;
                break;
            }
        }
    }

    const userData = {
        email: email,
        name: `${airline} Demo User`,
        role: 'airline',
        airline: airline,
        tenantId: tenantId,
        picture: `https://ui-avatars.com/api/?name=${airline.replace(' ', '+')}&background=0a2e4a&color=fff&size=128`,
        completedSessions: 5,
        currentSession: 0,
        lastLogin: new Date().toISOString(),
        isDemo: true
    };
    localStorage.setItem(`sms_${tenantId}_user_data`, JSON.stringify(userData));

    console.log(`✅ Generated data for ${airline} (${tenantId})`);
    return sessionsCreated;
}

function generateSessionAnswers(seed) {
    const answers = [];
    const questionsPerSession = 24;

    let seedValue = seed * 1234567;

    for (let i = 0; i < questionsPerSession; i++) {
        const baseScore = (seedValue % 4) + 1;
        const variation = Math.floor((seedValue * 7 + i * 3) % 3);
        let score = Math.min(5, baseScore + variation);

        if (seed % 2 === 0) {
            score = Math.min(5, score + 1);
        }

        answers.push(score);

        seedValue = (seedValue * 9301 + 49297) % 233280;
    }

    return answers;
}

// ============================================================
// SHOW STATS
// ============================================================
function showStats() {
    const stats = getDataStats();
    const t = (key) => getTranslation(key, currentLang);

    let html = `
        <strong>📊 ${t('data_statistics') || 'Data Statistics'}</strong><br><br>
        <strong>${t('total_airlines') || 'Total Airlines'}:</strong> ${stats.airlines.length}<br>
        <strong>${t('total_sessions') || 'Total Sessions'}:</strong> ${stats.totalSessions}<br>
        <strong>${t('total_keys') || 'Total Keys'}:</strong> ${stats.totalKeys}<br>
        <strong>${t('storage_used') || 'Storage Used'}:</strong> ${stats.storageSize}<br><br>
        <strong>${t('airlines') || 'Airlines'}:</strong><br>
    `;

    stats.airlines.forEach(a => {
        html += `&nbsp;&nbsp;• ${a.name}: ${a.sessions} ${t('sessions') || 'sessions'}<br>`;
    });

    showStatus('info', html);
}

function getDataStats() {
    const airlines = [];
    let totalSessions = 0;
    let totalKeys = 0;
    let totalSize = 0;

    let airlineNames;
    if (typeof getAirlines === 'function') {
        airlineNames = getAirlines().map(a => a.name);
    } else {
        airlineNames = [
            'Sita Air', 'Tara Air', 'Summit Air', 'Buddha Air',
            'Yeti Airlines', 'Shree Airlines', 'Danfe Air'
        ];
    }

    const tenantMap = {
        'Sita Air': 'sita-air',
        'Tara Air': 'tara-air',
        'Summit Air': 'summit-air',
        'Buddha Air': 'buddha-air',
        'Yeti Airlines': 'yeti-airlines',
        'Shree Airlines': 'shree-airlines',
        'Danfe Air': 'danfe-air'
    };

    airlineNames.forEach(airline => {
        const tenantId = tenantMap[airline] || airline.toLowerCase().replace(/ /g, '-');
        let sessions = 0;

        for (let i = 1; i <= 5; i++) {
            const key = `sms_${tenantId}_session_${i}_answers`;
            const data = localStorage.getItem(key);
            if (data) {
                sessions++;
                totalSize += data.length;
            }
        }

        if (sessions > 0) {
            airlines.push({ name: airline, sessions: sessions });
            totalSessions += sessions;
        }
    });

    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('sms_')) {
            totalKeys++;
            totalSize += (localStorage.getItem(key) || '').length;
        }
    });

    return {
        airlines: airlines,
        totalSessions: totalSessions,
        totalKeys: totalKeys,
        storageSize: (totalSize / 1024).toFixed(2) + ' KB'
    };
}

// ============================================================
// RESET DEMO USER
// ============================================================
function resetDemoUser() {
    const t = (key) => getTranslation(key, currentLang);

    if (!confirm(t('reset_confirm') || 'Reset the demo user account? This will clear your current progress but keep generated data.')) {
        return;
    }

    try {
        localStorage.removeItem('sms_user_data');
        localStorage.removeItem('sms_token');
        localStorage.removeItem('sms_completed_sessions');
        localStorage.removeItem('sms_current_session');
        localStorage.removeItem('sms_current_answers');
        localStorage.removeItem('sms_session_start');

        for (let i = 1; i <= 5; i++) {
            localStorage.removeItem(`sms_session_${i}_answers`);
            localStorage.removeItem(`sms_session_${i}_completed`);
        }

        showStatus('success', t('reset_success') || '✅ Demo user reset successfully! You can now login again.');
        console.log('✅ Demo user reset');
    } catch (error) {
        console.error('❌ Error resetting demo user:', error);
        showStatus('error', t('reset_error') || '❌ Error resetting demo user: ' + error.message);
    }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginSection').style.display !== 'none') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
    if (e.key === 'Escape' && document.getElementById('adminPanel').classList.contains('show')) {
        const t = (key) => getTranslation(key, currentLang);
        if (confirm(t('logout_confirm') || 'Logout from admin panel?')) {
            if (typeof logout === 'function') {
                logout(false);
            } else {
                localStorage.removeItem('sms_user_data');
                localStorage.removeItem('sms_token');
            }
            document.getElementById('adminPanel').classList.remove('show');
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('adminPassword').value = '';
        }
    }
});

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__admin = {
    ADMIN_EMAIL,
    currentLang,
    wipeData,
    generateDummyData,
    generateDummyDataForAirline,
    wipeDataForAirline,
    showStats,
    resetDemoUser,
    toggleLanguage,
    renderAirlines,
    populateAirlineSelector
};

console.log('🔐 Admin Panel ready with centralized credential management');
console.log('💡 Using credentials.js for admin authentication');
console.log('💡 Click the language toggle to switch between English and Nepali');