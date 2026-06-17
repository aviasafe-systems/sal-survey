/*
================================================================================
FILE: SurveySMS/js/login.js
VERSION: 7.1.0
REVISION DATE: 2026-06-17
PURPOSE: Login page logic - authentication using centralized credentials
DEPENDENCIES: credentials.js, translations.js
USAGE: login.html
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

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
    console.log('💡 Using centralized credential management (credentials.js)');
    
    // Log available users (for debugging)
    if (window.CREDENTIALS) {
        console.log(`👥 ${Object.keys(window.CREDENTIALS).length} users available`);
    }
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
// LOGIN HANDLER (UPDATED)
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

    // ============================================================
    // 🔐 AUTHENTICATION USING CREDENTIALS MODULE
    // ============================================================
    
    // Check if credentials module is loaded
    if (typeof validateCredentials === 'undefined') {
        console.error('❌ Credentials module not loaded!');
        if (errorEl) {
            errorEl.textContent = 'System error: Authentication service unavailable. Please refresh.';
            errorEl.classList.add('show');
        }
        return;
    }

    // Validate credentials
    const user = validateCredentials(email, password);

    if (user) {
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
            email: email,
            name: user.displayName,
            role: user.role,
            airline: user.airline,
            tenantId: user.tenantId,
            language: currentLang,
            picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.airline)}&background=0a2e4a&color=fff&size=128`,
            lastLogin: new Date().toISOString(),
            isDemo: user.metadata?.isDemo || true
        };

        localStorage.setItem('sms_user_data', JSON.stringify(userData));
        localStorage.setItem('sms_token', 'demo_token_' + Date.now());
        localStorage.setItem('sms_lang', currentLang);

        setTimeout(function() {
            redirectUser(userData);
        }, 1000);

    } else {
        console.log('❌ Login failed - Invalid credentials');
        if (errorEl) {
            // Check if user exists
            const userExists = typeof getUserByEmail === 'function' && getUserByEmail(email);
            errorEl.textContent = userExists ? 
                'Invalid password. Please try again.' : 
                'Email not found. Please check your credentials.';
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
function redirectUser(userData) {
    const tenantId = userData.tenantId;
    const role = userData.role;

    if (role === 'admin') {
        window.location.href = `admin.html`;
    } else if (role === 'caan') {
        window.location.href = `analytics/analytics.html?tenant=${tenantId}&role=caan&lang=${currentLang}`;
    } else if (role === 'safety_officer') {
        window.location.href = `dashboard.html?tenant=${tenantId}&role=safety&lang=${currentLang}`;
    } else {
        // Participant
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
    currentLang,
    handleLogin,
    goBack,
    redirectUser,
    toggleLanguage
};

console.log('🔐 Login page ready with centralized credential management');
console.log('💡 Using credentials.js for authentication');
console.log('💡 Demo Users (Participants): demo@*.com → Survey');
console.log('💡 Safety Officers: safety@*.com → Dashboard → Analytics');
console.log('💡 CAAN: demo@caan.gov.np → Analytics');
console.log('💡 Admin: admin@surveysms.com → Admin Panel');