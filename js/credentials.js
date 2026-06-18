/*
================================================================================
FILE: SurveySMS/js/credentials.js
VERSION: 1.0.0
REVISION DATE: 2026-06-18
PURPOSE: Centralized credential management for all users
DEPENDENCIES: None (pure data file)
USAGE: Imported by login.js, admin.js, and authentication flows
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

const CREDENTIALS = {
    // ============================================================
    // AIRLINE PARTICIPANTS - SURVEY USERS
    // ============================================================
    'demo@sitaair.com.np': {
        password: 'password123',
        role: 'participant',
        airline: 'Sita Air',
        tenantId: 'sita-air',
        displayName: 'Sita Air (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@taraair.com.np': {
        password: 'password123',
        role: 'participant',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@summitair.com.np': {
        password: 'password123',
        role: 'participant',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@buddhaair.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@yetiairlines.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@shreeairlines.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'demo@flydanfe.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air (Participant)',
        redirect: 'survey',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },

    // ============================================================
    // SAFETY OFFICERS
    // ============================================================
    'safety@sitaair.com.np': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Sita Air',
        tenantId: 'sita-air',
        displayName: 'Sita Air Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@taraair.com.np': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@summitair.com.np': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@buddhaair.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@yetiairlines.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@shreeairlines.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },
    'safety@flydanfe.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air Safety Officer',
        redirect: 'safety_dashboard',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    },

    // ============================================================
    // 👇 CAAN USERS - ADD THESE
    // ============================================================
    'smd@caanepal.gov.np': {
        password: 'SafetyCAAN2024!',
        role: 'caan',
        airline: 'CAAN',
        tenantId: 'caan',
        displayName: 'CAAN (Regulator)',
        redirect: 'analytics',
        metadata: { isDemo: true, createdAt: '2026-06-18' }
    },
    'demo@caan.gov.np': {
        password: 'password123',
        role: 'caan',
        airline: 'CAAN',
        tenantId: 'caan',
        displayName: 'CAAN (Regulator)',
        redirect: 'analytics',
        metadata: { isDemo: true, createdAt: '2026-06-18' }
    },

    // ============================================================
    // ADMIN
    // ============================================================
    'admin@surveysms.com': {
        password: 'survey2026',
        role: 'admin',
        airline: 'Administrator',
        tenantId: 'admin',
        displayName: 'Administrator',
        redirect: 'admin',
        metadata: { isDemo: true, createdAt: '2026-06-17' }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function validateCredentials(email, password) {
    const user = CREDENTIALS[email];
    if (!user) {
        console.warn(`⚠️ User not found: ${email}`);
        return null;
    }
    if (user.password === password) {
        console.log(`✅ Valid credentials for: ${email}`);
        return user;
    }
    console.warn(`❌ Invalid password for: ${email}`);
    return null;
}

function getUserByEmail(email) {
    return CREDENTIALS[email] || null;
}

function getUsersByRole(role) {
    const users = [];
    for (const [email, userData] of Object.entries(CREDENTIALS)) {
        if (userData.role === role) {
            users.push({ email, ...userData });
        }
    }
    return users;
}

function getAirlines() {
    const airlines = [];
    const seen = new Set();
    for (const [email, userData] of Object.entries(CREDENTIALS)) {
        if (userData.airline && !seen.has(userData.airline)) {
            seen.add(userData.airline);
            airlines.push({
                name: userData.airline,
                tenantId: userData.tenantId,
                hasParticipant: false,
                hasSafetyOfficer: false
            });
        }
    }
    for (const airline of airlines) {
        airline.hasParticipant = Object.values(CREDENTIALS).some(
            u => u.airline === airline.name && u.role === 'participant'
        );
        airline.hasSafetyOfficer = Object.values(CREDENTIALS).some(
            u => u.airline === airline.name && u.role === 'safety_officer'
        );
    }
    return airlines;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.CREDENTIALS = CREDENTIALS;
    window.validateCredentials = validateCredentials;
    window.getUserByEmail = getUserByEmail;
    window.getUsersByRole = getUsersByRole;
    window.getAirlines = getAirlines;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CREDENTIALS,
        validateCredentials,
        getUserByEmail,
        getUsersByRole,
        getAirlines
    };
}

console.log('🔐 Credentials module loaded successfully');
console.log(`👥 Total users: ${Object.keys(CREDENTIALS).length}`);
console.log('💡 Phase 1: Local credential validation ready');
console.log('💡 Phase 2: Migration path to Google OAuth / Supabase Auth');