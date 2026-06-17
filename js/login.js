/*
================================================================================
FILE: SurveySMS/js/login.js
VERSION: 7.0
REVISION DATE: 2026-06-17
PURPOSE: Login page logic - authentication, language support
REVISED PURPOSE: Added safety officer credentials for each airline
AFFECTED: login.html
================================================================================
*/

// ============================================================
// CONFIGURATION - USER DATABASE
// ============================================================
const USER_DB = {
    // ===== AIRLINE USERS - SURVEY PARTICIPANTS =====
    'demo@sitaair.com.np': {
        email: 'demo@sitaair.com.np',
        password: 'password123',
        role: 'participant',
        airline: 'Sita Air',
        tenantId: 'sita-air',
        displayName: 'Sita Air (Participant)',
        redirect: 'survey'
    },
    'demo@taraair.com': {
        email: 'demo@taraair.com',
        password: 'password123',
        role: 'participant',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air (Participant)',
        redirect: 'survey'
    },
    'demo@summitair.com.np': {
        email: 'demo@summitair.com.np',
        password: 'password123',
        role: 'participant',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air (Participant)',
        redirect: 'survey'
    },
    'demo@buddhaair.com': {
        email: 'demo@buddhaair.com',
        password: 'password123',
        role: 'participant',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air (Participant)',
        redirect: 'survey'
    },
    'demo@yetiairlines.com': {
        email: 'demo@yetiairlines.com',
        password: 'password123',
        role: 'participant',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines (Participant)',
        redirect: 'survey'
    },
    'demo@shreeairlines.com': {
        email: 'demo@shreeairlines.com',
        password: 'password123',
        role: 'participant',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines (Participant)',
        redirect: 'survey'
    },
    'demo@flydanfe.com': {
        email: 'demo@flydanfe.com',
        password: 'password123',
        role: 'participant',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air (Participant)',
        redirect: 'survey'
    },
    
    // ===== AIRLINE USERS - SAFETY OFFICERS =====
    'safety@sitaair.com.np': {
        email: 'safety@sitaair.com.np',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Sita Air',
        tenantId: 'sita-air',
        displayName: 'Sita Air Safety Officer',
        redirect: 'dashboard'
    },
    'safety@taraair.com': {
        email: 'safety@taraair.com',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air Safety Officer',
        redirect: 'dashboard'
    },
    'safety@summitair.com.np': {
        email: 'safety@summitair.com.np',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air Safety Officer',
        redirect: 'dashboard'
    },
    'safety@buddhaair.com': {
        email: 'safety@buddhaair.com',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air Safety Officer',
        redirect: 'dashboard'
    },
    'safety@yetiairlines.com': {
        email: 'safety@yetiairlines.com',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines Safety Officer',
        redirect: 'dashboard'
    },
    'safety@shreeairlines.com': {
        email: 'safety@shreeairlines.com',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines Safety Officer',
        redirect: 'dashboard'
    },
    'safety@flydanfe.com': {
        email: 'safety@flydanfe.com',
        password: 'password123',
        role: 'safety_officer',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air Safety Officer',
        redirect: 'dashboard'
    },
    
    // ===== CAAN USER =====
    'demo@caan.gov.np': {
        email: 'demo@caan.gov.np',
        password: 'password123',
        role: 'caan',
        airline: 'CAAN',
        tenantId: 'caan',
        displayName: 'CAAN (Regulator)',
        redirect: 'analytics'
    },
    
    // ===== ADMIN USER =====
    'admin@surveysms.com': {
        email: 'admin@surveysms.com',
        password: 'survey2026',
        role: 'admin',
        airline: 'Administrator',
        tenantId: 'admin',
        displayName: 'Administrator',
        redirect: 'admin'
    }
};

// ============================================================
// STATE
// ============================================================
let currentLang = 'en';
let isLoggingIn = false;

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Login Page Loaded');

    // Get language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    currentLang = urlParams.get('lang') || localStorage.getItem('sms_lang') || 'en';

    // Update UI
    updateLanguageToggle();
    updateTranslations();

    // Clear fields
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (emailField) {
        emailField.value = '';
        emailField.setAttribute('autocomplete', 'off');
        emailField.setAttribute('autocorrect', 'off');
        emailField.setAttribute('autocapitalize', 'off');
        emailField.setAttribute('spellcheck', 'false');
    }
    
    if (passwordField) {
        passwordField.value = '';
        passwordField.setAttribute('autocomplete', 'new-password');
        passwordField.setAttribute('autocorrect', 'off');
        passwordField.setAttribute('autocapitalize', 'off');
        passwordField.setAttribute('spellcheck', 'false');
    }

    console.log('💡 Login page ready in:', currentLang);
    console.log('💡 Available roles: Participant (demo@), Safety Officer (safety@)');
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

    document.title = t('login_title') || 'Sign In - SMS Gap Analysis';
    const loginTitle = document.getElementById('loginTitle');
    if (loginTitle) loginTitle.textContent = t('login_title') || 'Welcome Back';
    
    const loginSubtitle = document.getElementById('loginSubtitle');
    if (loginSubtitle) loginSubtitle.textContent = t('login_subtitle') || 'Sign in to continue your SMS Gap Analysis journey';
    
    const emailLabel = document.getElementById('emailLabel');
    if (emailLabel) emailLabel.textContent = t('email_label') || 'Email Address';
    
    const emailField = document.getElementById('email');
    if (emailField) emailField.placeholder = t('email_placeholder') || 'Enter your email address';
    
    const passwordLabel = document.getElementById('passwordLabel');
    if (passwordLabel) passwordLabel.textContent = t('password_label') || 'Password';
    
    const passwordField = document.getElementById('password');
    if (passwordField) passwordField.placeholder = t('password_placeholder') || 'Enter your password';
    
    const loginBtnText = document.getElementById('loginBtnText');
    if (loginBtnText) loginBtnText.textContent = t('login_btn') || 'Sign In';
    
    const backLinkText = document.getElementById('backLinkText');
    if (backLinkText) backLinkText.textContent = t('back_home') || 'Back to Home';
    
    const footerNote = document.getElementById('footerNote');
    if (footerNote) footerNote.textContent = t('footer_note') || 'sms.aviasafesystems.com • Secure • ICAO Annex 19';

    // Features
    const feature1 = document.getElementById('feature1');
    if (feature1) feature1.innerHTML = `<i class="fas fa-check-circle"></i> ${t('feature1') || '24 Questions'}`;
    
    const feature2 = document.getElementById('feature2');
    if (feature2) feature2.innerHTML = `<i class="fas fa-check-circle"></i> ${t('feature2') || '12 SMS Elements'}`;
    
    const feature3 = document.getElementById('feature3');
    if (feature3) feature3.innerHTML = `<i class="fas fa-check-circle"></i> ${t('feature3') || 'Progress Tracking'}`;
    
    const feature4 = document.getElementById('feature4');
    if (feature4) feature4.innerHTML = `<i class="fas fa-check-circle"></i> ${t('feature4') || 'Gap Analysis'}`;

    // Error messages
    const errorMsg = document.getElementById('errorMessage');
    if (errorMsg) errorMsg.textContent = t('login_error') || 'Invalid credentials. Please try again.';
    
    const successMsg = document.getElementById('successMessage');
    if (successMsg) successMsg.textContent = t('login_success') || 'Login successful! Redirecting...';
}

// ============================================================
// LOGIN HANDLER
// ============================================================
function handleLogin(event) {
    event.preventDefault();
    
    if (isLoggingIn) {
        console.log('⏳ Login already in progress...');
        return;
    }

    console.log('🔐 Login attempt');

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');
    const loginBtn = document.getElementById('loginBtn');
    const t = (key) => getTranslation(key, currentLang);

    if (errorEl) errorEl.classList.remove('show');
    if (successEl) successEl.classList.remove('show');

    const email = emailField ? emailField.value.trim().toLowerCase() : '';
    const password = passwordField ? passwordField.value.trim() : '';

    if (!email || !password) {
        if (errorEl) {
            errorEl.textContent = t('login_error') || 'Please enter both email and password.';
            errorEl.classList.add('show');
        }
        return;
    }

    const user = USER_DB[email];

    if (user && user.password === password) {
        console.log('✅ Login successful for:', email);
        console.log('👤 Role:', user.role);
        console.log('✈️ Airline:', user.airline);

        isLoggingIn = true;

        if (successEl) {
            successEl.textContent = t('login_success_message') || `✅ Welcome ${user.displayName}! Redirecting...`;
            successEl.classList.add('show');
        }

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = `<span class="spinner"></span> ${t('signing_in') || 'Signing in...'}`;
        }

        const userData = {
            email: user.email,
            name: user.displayName,
            role: user.role,
            airline: user.airline,
            tenantId: user.tenantId,
            language: currentLang,
            picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.airline)}&background=0a2e4a&color=fff&size=128`,
            lastLogin: new Date().toISOString()
        };

        localStorage.setItem('sms_user_data', JSON.stringify(userData));
        localStorage.setItem('sms_token', 'demo_token_' + Date.now());
        localStorage.setItem('sms_lang', currentLang);

        setTimeout(function() {
            redirectUser(user);
        }, 1000);

    } else {
        console.log('❌ Login failed - Invalid credentials');
        if (errorEl) {
            errorEl.textContent = user ? t('invalid_password') || 'Invalid password. Please try again.' : t('email_not_found') || 'Email not found. Please check your credentials.';
            errorEl.classList.add('show');
        }
        
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${t('login_btn') || 'Sign In'}`;
        }
        
        isLoggingIn = false;

        if (passwordField) {
            passwordField.value = '';
            passwordField.focus();
        }
    }

    return false;
}

// ============================================================
// REDIRECT USER BASED ON ROLE
// ============================================================
function redirectUser(user) {
    const tenantId = user.tenantId;

    if (user.role === 'admin') {
        window.location.href = `admin.html`;
    } else if (user.role === 'caan') {
        window.location.href = `analytics/analytics.html?tenant=${tenantId}&role=caan&lang=${currentLang}`;
    } else if (user.role === 'safety_officer') {
        // Safety Officer → Dashboard → Analytics
        window.location.href = `dashboard.html?tenant=${tenantId}&role=safety&lang=${currentLang}`;
    } else {
        // Participant → Survey
        window.location.href = `survey/survey.html?tenant=${tenantId}&session=1&lang=${currentLang}`;
    }
}

// ============================================================
// NAVIGATION
// ============================================================
function goBack() {
    window.location.href = `index.html?lang=${currentLang}`;
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.id === 'email' || activeElement.id === 'password')) {
            e.preventDefault();
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    }
    if (e.key === 'b' || e.key === 'B') {
        goBack();
    }
});

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__login = {
    USER_DB,
    currentLang,
    handleLogin,
    goBack,
    redirectUser,
    toggleLanguage
};

console.log('🔐 Login page ready');
console.log('💡 Demo Users (Participants): demo@*.com → Survey');
console.log('💡 Safety Officers: safety@*.com → Dashboard → Analytics');
console.log('💡 CAAN: demo@caan.gov.np → Analytics');
console.log('💡 Admin: admin@surveysms.com → Admin Panel');