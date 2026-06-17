/*
================================================================================
FILE: SurveySMS/js/thankyou.js
VERSION: 1.0
REVISION DATE: 2026-06-17
PURPOSE: Thank You page logic - language support, session cleanup, navigation
AFFECTED: thankyou.html
================================================================================
*/

// ============================================================
// STATE
// ============================================================
let currentLang = 'en';
let tenantId = null;

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🙏 Thank You Page Loaded');

    // Get language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    currentLang = urlParams.get('lang') || localStorage.getItem('sms_lang') || 'en';
    tenantId = urlParams.get('tenant') || 'default';

    // Update language
    updateLanguageToggle();
    updateTranslations();

    // Clear all session data when user reaches thank you page
    localStorage.removeItem('sms_user_data');
    localStorage.removeItem('sms_token');

    console.log('✅ Session cleared. User logged out.');
    console.log('💡 Thank You page ready in:', currentLang);
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

    // Page title
    document.title = t('thankyou_title') || 'Thank You - AviaSafeSystems';

    // Title and subtitle
    document.getElementById('thankyouTitle').textContent = t('thankyou_title') || 'Thank You!';
    document.getElementById('thankyouSubtitle').textContent = t('thankyou_subtitle') || 'धन्यवाद';

    // Message
    const messageEl = document.getElementById('thankyouMessage');
    const messageText = t('thankyou_message') || 'Dear Valued Partner,\n\nWe sincerely thank you for the opportunity provided to AviaSafeSystems to demonstrate our commitment to enhancing operational safety in the aviation industry.\n\nYour time and participation in this survey demonstration reflects your dedication to safety excellence and continuous improvement.\n\nTogether, we build a safer aviation future.';
    messageEl.innerHTML = messageText.replace(/\n/g, '<br><br>');

    // Namaste text
    document.getElementById('namasteText').textContent = t('thankyou_namaste') || '🙏 NAMASTE 🙏';
    document.getElementById('namasteMeaning').textContent = t('thankyou_namaste_meaning') || '"May the divine light in me, honor the divine light in you."';

    // Button
    document.getElementById('homeBtnText').textContent = t('thankyou_return') || 'Return to Home';

    // Footer
    document.getElementById('footerText').textContent = t('thankyou_footer') || 'AviaSafeSystems.com • ICAO Annex 19 SMS Platform';
}

// ============================================================
// NAVIGATION
// ============================================================
function goHome() {
    window.location.href = `index.html?lang=${currentLang}`;
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === 'h' || e.key === 'H') {
        goHome();
    }
});

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__thankyou = {
    currentLang,
    tenantId,
    goHome,
    toggleLanguage
};

console.log('🙏 Thank You page ready with English/Nepali support');
console.log('💡 Click the language toggle to switch between English and Nepali');
console.log('💡 Press Enter or "H" to return home');