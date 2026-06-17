/*
================================================================================
FILE: SurveySMS/js/credentials.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Centralized credential management for all users
DEPENDENCIES: None (pure data file)
USAGE: Imported by login.js, admin.js, and authentication flows
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// CREDENTIALS CONFIGURATION
// ============================================================

/**
 * USER CREDENTIALS DATABASE
 * 
 * This file contains all user credentials for the SurveySMS application.
 * 
 * SECURITY NOTES:
 * - In development: Passwords are plaintext for demo purposes
 * - In production: Passwords MUST be hashed using bcrypt/Argon2
 * - Never commit this file with production credentials
 * - Use environment variables for sensitive data
 * 
 * MIGRATION PATH:
 * Phase 1 (Current): Local JSON storage
 * Phase 2: Environment variables with hashed passwords
 * Phase 3: Dedicated auth service (Google OAuth, Supabase Auth, etc.)
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
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@taraair.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@summitair.com.np': {
        password: 'password123',
        role: 'participant',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@buddhaair.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@yetiairlines.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@shreeairlines.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'demo@flydanfe.com': {
        password: 'password123',
        role: 'participant',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air (Participant)',
        redirect: 'survey',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
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
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@taraair.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Tara Air',
        tenantId: 'tara-air',
        displayName: 'Tara Air Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@summitair.com.np': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Summit Air',
        tenantId: 'summit-air',
        displayName: 'Summit Air Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@buddhaair.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Buddha Air',
        tenantId: 'buddha-air',
        displayName: 'Buddha Air Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@yetiairlines.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Yeti Airlines',
        tenantId: 'yeti-airlines',
        displayName: 'Yeti Airlines Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@shreeairlines.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Shree Airlines',
        tenantId: 'shree-airlines',
        displayName: 'Shree Airlines Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },
    'safety@flydanfe.com': {
        password: 'password123',
        role: 'safety_officer',
        airline: 'Danfe Air',
        tenantId: 'danfe-air',
        displayName: 'Danfe Air Safety Officer',
        redirect: 'dashboard',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    },

    // ============================================================
    // CAAN REGULATOR
    // ============================================================
    'demo@caan.gov.np': {
        password: 'password123',
        role: 'caan',
        airline: 'CAAN',
        tenantId: 'caan',
        displayName: 'CAAN (Regulator)',
        redirect: 'analytics',
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
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
        metadata: {
            isDemo: true,
            createdAt: '2026-06-17'
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Validate user credentials
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {object|null} User object if valid, null otherwise
 */
function validateCredentials(email, password) {
    const user = CREDENTIALS[email];
    
    if (!user) {
        console.warn(`⚠️ User not found: ${email}`);
        return null;
    }
    
    // In production, use bcrypt.compare() here
    if (user.password === password) {
        console.log(`✅ Valid credentials for: ${email}`);
        return user;
    }
    
    console.warn(`❌ Invalid password for: ${email}`);
    return null;
}

/**
 * Get user by email
 * @param {string} email - User's email address
 * @returns {object|null} User object if found, null otherwise
 */
function getUserByEmail(email) {
    return CREDENTIALS[email] || null;
}

/**
 * Get all users with a specific role
 * @param {string} role - User role (participant, safety_officer, caan, admin)
 * @returns {Array} Array of users with the specified role
 */
function getUsersByRole(role) {
    const users = [];
    for (const [email, userData] of Object.entries(CREDENTIALS)) {
        if (userData.role === role) {
            users.push({
                email: email,
                ...userData
            });
        }
    }
    return users;
}

/**
 * Get all airlines and their tenant IDs
 * @returns {Array} Array of airline objects
 */
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
    
    // Update with role flags
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

// ============================================================
// EXPORT
// ============================================================

// For browser
if (typeof window !== 'undefined') {
    window.CREDENTIALS = CREDENTIALS;
    window.validateCredentials = validateCredentials;
    window.getUserByEmail = getUserByEmail;
    window.getUsersByRole = getUsersByRole;
    window.getAirlines = getAirlines;
}

// For Node.js (if using in build process)
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