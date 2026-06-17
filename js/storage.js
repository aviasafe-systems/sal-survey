/*
================================================================================
FILE: SurveySMS/js/storage.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: localStorage utilities for data persistence with error handling
DEPENDENCIES: utils.js (for getElement, setStorageItem)
USAGE: All pages with data persistence
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// STORAGE NAMESPACES
// ============================================================

const STORAGE_PREFIX = 'sms_';
const STORAGE_KEYS = {
    USER_DATA: 'sms_user_data',
    TOKEN: 'sms_token',
    LANG: 'sms_lang',
    COMPLETED_SESSIONS: 'completed_sessions',
    CURRENT_SESSION: 'current_session',
    CURRENT_ANSWERS: 'current_answers',
    SESSION_START: 'session_start',
    SESSION_ANSWERS: (tenantId, sessionNum) => `sms_${tenantId}_session_${sessionNum}_answers`,
    SESSION_COMPLETED: (tenantId, sessionNum) => `sms_${tenantId}_session_${sessionNum}_completed`,
    AIRLINE_DATA: (tenantId) => `sms_${tenantId}_airline_data`,
};

// ============================================================
// CORE STORAGE FUNCTIONS
// ============================================================

/**
 * Get item from localStorage with error handling
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed value or defaultValue
 */
function getItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        return JSON.parse(item);
    } catch (error) {
        console.warn(`Failed to parse localStorage key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Set item to localStorage with error handling
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} True if successful
 */
function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to set localStorage key "${key}":`, error);
        return false;
    }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if successful
 */
function removeItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Failed to remove localStorage key "${key}":`, error);
        return false;
    }
}

/**
 * Clear all items with storage prefix
 * @param {string} prefix - Prefix to match (default STORAGE_PREFIX)
 * @returns {number} Number of items cleared
 */
function clearItems(prefix = STORAGE_PREFIX) {
    try {
        const keys = Object.keys(localStorage);
        let count = 0;
        
        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
                count++;
            }
        });
        
        console.log(`✅ Cleared ${count} items with prefix "${prefix}"`);
        return count;
    } catch (error) {
        console.error('Failed to clear storage items:', error);
        return 0;
    }
}

// ============================================================
// USER STORAGE FUNCTIONS
// ============================================================

/**
 * Get user data from localStorage
 * @returns {object|null} User data or null
 */
function getUserData() {
    return getItem(STORAGE_KEYS.USER_DATA, null);
}

/**
 * Set user data to localStorage
 * @param {object} userData - User data object
 * @returns {boolean} True if successful
 */
function setUserData(userData) {
    return setItem(STORAGE_KEYS.USER_DATA, userData);
}

/**
 * Remove user data from localStorage
 * @returns {boolean} True if successful
 */
function removeUserData() {
    return removeItem(STORAGE_KEYS.USER_DATA);
}

/**
 * Get authentication token
 * @returns {string|null} Token or null
 */
function getToken() {
    return getItem(STORAGE_KEYS.TOKEN, null);
}

/**
 * Set authentication token
 * @param {string} token - Authentication token
 * @returns {boolean} True if successful
 */
function setToken(token) {
    return setItem(STORAGE_KEYS.TOKEN, token);
}

/**
 * Remove authentication token
 * @returns {boolean} True if successful
 */
function removeToken() {
    return removeItem(STORAGE_KEYS.TOKEN);
}

// ============================================================
// SURVEY STORAGE FUNCTIONS
// ============================================================

/**
 * Get survey answers for a specific session
 * @param {string} tenantId - Tenant identifier
 * @param {number} sessionNum - Session number (1-5)
 * @returns {array|null} Array of answers or null
 */
function getSessionAnswers(tenantId, sessionNum) {
    const key = STORAGE_KEYS.SESSION_ANSWERS(tenantId, sessionNum);
    return getItem(key, null);
}

/**
 * Set survey answers for a specific session
 * @param {string} tenantId - Tenant identifier
 * @param {number} sessionNum - Session number (1-5)
 * @param {array} answers - Array of answer values
 * @returns {boolean} True if successful
 */
function setSessionAnswers(tenantId, sessionNum, answers) {
    const key = STORAGE_KEYS.SESSION_ANSWERS(tenantId, sessionNum);
    return setItem(key, answers);
}

/**
 * Check if a session is completed
 * @param {string} tenantId - Tenant identifier
 * @param {number} sessionNum - Session number (1-5)
 * @returns {boolean} True if completed
 */
function isSessionCompleted(tenantId, sessionNum) {
    const key = STORAGE_KEYS.SESSION_COMPLETED(tenantId, sessionNum);
    return getItem(key, false);
}

/**
 * Mark session as completed
 * @param {string} tenantId - Tenant identifier
 * @param {number} sessionNum - Session number (1-5)
 * @returns {boolean} True if successful
 */
function completeSession(tenantId, sessionNum) {
    const key = STORAGE_KEYS.SESSION_COMPLETED(tenantId, sessionNum);
    return setItem(key, true);
}

/**
 * Get number of completed sessions for a tenant
 * @param {string} tenantId - Tenant identifier
 * @returns {number} Number of completed sessions
 */
function getCompletedSessionCount(tenantId) {
    let count = 0;
    for (let i = 1; i <= 5; i++) {
        if (isSessionCompleted(tenantId, i)) {
            count++;
        }
    }
    return count;
}

/**
 * Get current session number
 * @param {string} tenantId - Tenant identifier
 * @returns {number} Current session number (0 if none)
 */
function getCurrentSession(tenantId) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.CURRENT_SESSION}`;
    return getItem(key, 0);
}

/**
 * Set current session number
 * @param {string} tenantId - Tenant identifier
 * @param {number} sessionNum - Session number
 * @returns {boolean} True if successful
 */
function setCurrentSession(tenantId, sessionNum) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.CURRENT_SESSION}`;
    return setItem(key, sessionNum);
}

/**
 * Get current answers (in-progress)
 * @param {string} tenantId - Tenant identifier
 * @returns {array|null} Current answers or null
 */
function getCurrentAnswers(tenantId) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.CURRENT_ANSWERS}`;
    return getItem(key, null);
}

/**
 * Set current answers (in-progress)
 * @param {string} tenantId - Tenant identifier
 * @param {array} answers - Array of answers
 * @returns {boolean} True if successful
 */
function setCurrentAnswers(tenantId, answers) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.CURRENT_ANSWERS}`;
    return setItem(key, answers);
}

/**
 * Get session start time
 * @param {string} tenantId - Tenant identifier
 * @returns {string|null} ISO timestamp or null
 */
function getSessionStart(tenantId) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.SESSION_START}`;
    return getItem(key, null);
}

/**
 * Set session start time
 * @param {string} tenantId - Tenant identifier
 * @returns {boolean} True if successful
 */
function setSessionStart(tenantId) {
    const key = `sms_${tenantId}_${STORAGE_KEYS.SESSION_START}`;
    return setItem(key, new Date().toISOString());
}

// ============================================================
// AIRLINE DATA FUNCTIONS
// ============================================================

/**
 * Get airline data
 * @param {string} tenantId - Tenant identifier
 * @returns {object|null} Airline data or null
 */
function getAirlineData(tenantId) {
    const key = STORAGE_KEYS.AIRLINE_DATA(tenantId);
    return getItem(key, null);
}

/**
 * Set airline data
 * @param {string} tenantId - Tenant identifier
 * @param {object} data - Airline data object
 * @returns {boolean} True if successful
 */
function setAirlineData(tenantId, data) {
    const key = STORAGE_KEYS.AIRLINE_DATA(tenantId);
    return setItem(key, data);
}

// ============================================================
// SESSION CLEANUP
// ============================================================

/**
 * Clear all data for a specific tenant
 * @param {string} tenantId - Tenant identifier
 * @returns {number} Number of items cleared
 */
function clearTenantData(tenantId) {
    const prefix = `sms_${tenantId}`;
    return clearItems(prefix);
}

/**
 * Clear all survey data (all tenants)
 * @returns {number} Number of items cleared
 */
function clearAllSurveyData() {
    // Clear all items with prefix
    const count = clearItems('sms_');
    
    // Also clear specific keys that might not have prefix
    const extraKeys = ['sms_user_data', 'sms_token', 'sms_lang'];
    extraKeys.forEach(key => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    });
    
    return count;
}

// ============================================================
// STORAGE INFO
// ============================================================

/**
 * Get storage usage statistics
 * @returns {object} Storage statistics
 */
function getStorageStats() {
    let totalSize = 0;
    let itemCount = 0;
    const items = {};
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sms_')) {
            const value = localStorage.getItem(key);
            const size = (value || '').length;
            totalSize += size;
            itemCount++;
            items[key] = {
                size: size,
                sizeKB: (size / 1024).toFixed(2)
            };
        }
    }
    
    return {
        itemCount,
        totalSize,
        totalSizeKB: (totalSize / 1024).toFixed(2),
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
        items
    };
}

// ============================================================
// EXPOSE FOR BROWSER AND TESTING
// ============================================================

// For browser
if (typeof window !== 'undefined') {
    window.storage = {
        // Core
        getItem,
        setItem,
        removeItem,
        clearItems,
        
        // User
        getUserData,
        setUserData,
        removeUserData,
        getToken,
        setToken,
        removeToken,
        
        // Survey
        getSessionAnswers,
        setSessionAnswers,
        isSessionCompleted,
        completeSession,
        getCompletedSessionCount,
        getCurrentSession,
        setCurrentSession,
        getCurrentAnswers,
        setCurrentAnswers,
        getSessionStart,
        setSessionStart,
        
        // Airline
        getAirlineData,
        setAirlineData,
        
        // Cleanup
        clearTenantData,
        clearAllSurveyData,
        
        // Info
        getStorageStats,
        
        // Constants
        STORAGE_PREFIX,
        STORAGE_KEYS
    };
}

// For Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getItem,
        setItem,
        removeItem,
        clearItems,
        getUserData,
        setUserData,
        removeUserData,
        getToken,
        setToken,
        removeToken,
        getSessionAnswers,
        setSessionAnswers,
        isSessionCompleted,
        completeSession,
        getCompletedSessionCount,
        getCurrentSession,
        setCurrentSession,
        getCurrentAnswers,
        setCurrentAnswers,
        getSessionStart,
        setSessionStart,
        getAirlineData,
        setAirlineData,
        clearTenantData,
        clearAllSurveyData,
        getStorageStats,
        STORAGE_PREFIX,
        STORAGE_KEYS
    };
}

console.log('💾 Storage module loaded successfully');
console.log(`📊 Current storage: ${Object.keys(localStorage).filter(k => k.startsWith('sms_')).length} items`);
