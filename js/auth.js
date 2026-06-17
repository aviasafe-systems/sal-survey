/*
================================================================================
FILE: SurveySMS/js/auth.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Authentication utilities - login, logout, session management
DEPENDENCIES: credentials.js, storage.js, utils.js
USAGE: All authenticated pages
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// STATE
// ============================================================

let currentUser = null;
let isAuthenticated = false;
let authListeners = [];

// ============================================================
// AUTHENTICATION FUNCTIONS
// ============================================================

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {boolean} remember - Remember user (default false)
 * @returns {Promise<object>} User data or error
 */
async function login(email, password, remember = false) {
    console.log('🔐 Login attempt:', email);

    try {
        // Validate email format
        if (typeof isValidEmail !== 'undefined' && !isValidEmail(email)) {
            return { success: false, error: 'Invalid email format' };
        }

        // Check if credentials module is available
        if (typeof validateCredentials !== 'function') {
            console.error('❌ Credentials module not loaded');
            return { success: false, error: 'Authentication service unavailable' };
        }

        // Validate credentials
        const user = validateCredentials(email, password);

        if (!user) {
            console.warn('❌ Invalid credentials for:', email);
            return { success: false, error: 'Invalid email or password' };
        }

        // Create session data
        const userData = {
            email: email,
            name: user.displayName,
            role: user.role,
            airline: user.airline,
            tenantId: user.tenantId,
            language: localStorage.getItem('sms_lang') || 'en',
            picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.airline)}&background=0a2e4a&color=fff&size=128`,
            lastLogin: new Date().toISOString(),
            isDemo: user.metadata?.isDemo || true
        };

        // Store in localStorage
        if (typeof setUserData === 'function') {
            setUserData(userData);
            setToken('token_' + Date.now());
        } else {
            // Fallback to direct localStorage
            localStorage.setItem('sms_user_data', JSON.stringify(userData));
            localStorage.setItem('sms_token', 'token_' + Date.now());
        }

        // Update state
        currentUser = userData;
        isAuthenticated = true;

        // Notify listeners
        notifyListeners('login', userData);

        console.log('✅ Login successful:', email);
        console.log('👤 Role:', user.role);
        console.log('✈️ Airline:', user.airline);

        return { success: true, user: userData };

    } catch (error) {
        console.error('❌ Login error:', error);
        return { success: false, error: error.message || 'Login failed' };
    }
}

/**
 * Logout user - clear session
 * @param {boolean} redirect - Redirect to login page (default true)
 * @returns {Promise<boolean>} True if successful
 */
async function logout(redirect = true) {
    console.log('🔐 Logout attempt');

    try {
        // Clear localStorage
        if (typeof removeUserData === 'function') {
            removeUserData();
            removeToken();
        } else {
            localStorage.removeItem('sms_user_data');
            localStorage.removeItem('sms_token');
        }

        // Clear session data
        const sessionKeys = [
            'sms_completed_sessions',
            'sms_current_session',
            'sms_current_answers',
            'sms_session_start'
        ];
        sessionKeys.forEach(key => {
            try {
                localStorage.removeItem(key);
            } catch (e) {}
        });

        // Update state
        const previousUser = currentUser;
        currentUser = null;
        isAuthenticated = false;

        // Notify listeners
        notifyListeners('logout', previousUser);

        console.log('✅ Logout successful');

        if (redirect) {
            window.location.href = 'login.html';
        }

        return true;

    } catch (error) {
        console.error('❌ Logout error:', error);
        return false;
    }
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
function isLoggedIn() {
    // Check token in localStorage
    const token = typeof getToken === 'function' 
        ? getToken() 
        : localStorage.getItem('sms_token');
    
    if (!token) return false;

    // Check user data
    const userData = typeof getUserData === 'function'
        ? getUserData()
        : JSON.parse(localStorage.getItem('sms_user_data') || 'null');

    if (!userData) return false;

    // Update state
    currentUser = userData;
    isAuthenticated = true;

    return true;
}

/**
 * Get current user data
 * @returns {object|null} User data or null
 */
function getCurrentUser() {
    if (currentUser) return currentUser;

    const userData = typeof getUserData === 'function'
        ? getUserData()
        : JSON.parse(localStorage.getItem('sms_user_data') || 'null');

    if (userData) {
        currentUser = userData;
        isAuthenticated = true;
    }

    return currentUser;
}

/**
 * Check if user has a specific role
 * @param {string|array} roles - Role or array of roles
 * @returns {boolean} True if user has required role
 */
function hasRole(roles) {
    const user = getCurrentUser();
    if (!user) return false;

    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role);
}

/**
 * Check if user is a participant
 * @returns {boolean} True if participant
 */
function isParticipant() {
    return hasRole('participant');
}

/**
 * Check if user is a safety officer
 * @returns {boolean} True if safety officer
 */
function isSafetyOfficer() {
    return hasRole('safety_officer');
}

/**
 * Check if user is CAAN
 * @returns {boolean} True if CAAN
 */
function isCAAN() {
    return hasRole('caan');
}

/**
 * Check if user is admin
 * @returns {boolean} True if admin
 */
function isAdmin() {
    return hasRole('admin');
}

/**
 * Get user's tenant ID
 * @returns {string|null} Tenant ID or null
 */
function getTenantId() {
    const user = getCurrentUser();
    return user ? user.tenantId : null;
}

/**
 * Get user's airline name
 * @returns {string|null} Airline name or null
 */
function getAirlineName() {
    const user = getCurrentUser();
    return user ? user.airline : null;
}

// ============================================================
// AUTH EVENT SYSTEM
// ============================================================

/**
 * Register auth event listener
 * @param {function} listener - Callback function
 * @returns {function} Unsubscribe function
 */
function onAuthChange(listener) {
    if (typeof listener !== 'function') {
        console.warn('Auth listener must be a function');
        return () => {};
    }

    authListeners.push(listener);

    // Return unsubscribe function
    return () => {
        authListeners = authListeners.filter(l => l !== listener);
    };
}

/**
 * Notify all auth listeners
 * @param {string} event - Event type ('login' or 'logout')
 * @param {object} data - Event data
 */
function notifyListeners(event, data) {
    authListeners.forEach(listener => {
        try {
            listener(event, data);
        } catch (error) {
            console.error('Auth listener error:', error);
        }
    });
}

// ============================================================
// PROTECTED ROUTE GUARD
// ============================================================

/**
 * Protect a route - redirect to login if not authenticated
 * @param {string|array} requiredRoles - Required role(s)
 * @param {string} redirectUrl - Redirect URL (default 'login.html')
 * @returns {boolean} True if authenticated and authorized
 */
function protectRoute(requiredRoles = null, redirectUrl = 'login.html') {
    const user = getCurrentUser();

    if (!user) {
        console.warn('🔒 Route protected - redirecting to login');
        window.location.href = redirectUrl;
        return false;
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
        console.warn(`🔒 User role "${user.role}" not authorized for this route`);
        // Redirect to appropriate dashboard
        const redirectMap = {
            'participant': 'dashboard.html',
            'safety_officer': 'dashboard.html',
            'caan': 'analytics/analytics.html',
            'admin': 'admin.html'
        };
        window.location.href = redirectMap[user.role] || 'dashboard.html';
        return false;
    }

    return true;
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================

/**
 * Check if session is expired (30 minutes timeout)
 * @param {number} timeoutMinutes - Timeout in minutes (default 30)
 * @returns {boolean} True if session is expired
 */
function isSessionExpired(timeoutMinutes = 30) {
    const user = getCurrentUser();
    if (!user) return true;

    const lastLogin = user.lastLogin;
    if (!lastLogin) return true;

    const lastLoginTime = new Date(lastLogin).getTime();
    const currentTime = Date.now();
    const diffMinutes = (currentTime - lastLoginTime) / (1000 * 60);

    return diffMinutes > timeoutMinutes;
}

/**
 * Refresh session - update last login time
 * @returns {boolean} True if successful
 */
function refreshSession() {
    const user = getCurrentUser();
    if (!user) return false;

    user.lastLogin = new Date().toISOString();
    
    if (typeof setUserData === 'function') {
        return setUserData(user);
    } else {
        try {
            localStorage.setItem('sms_user_data', JSON.stringify(user));
            return true;
        } catch (error) {
            console.error('Failed to refresh session:', error);
            return false;
        }
    }
}

// ============================================================
// INITIALIZATION
// ============================================================

// Check authentication on load
document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        console.log('🔐 User already authenticated:', currentUser?.email);
    } else {
        console.log('🔐 No active session');
    }
});

// ============================================================
// EXPOSE FOR BROWSER AND TESTING
// ============================================================

// For browser
if (typeof window !== 'undefined') {
    window.auth = {
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        hasRole,
        isParticipant,
        isSafetyOfficer,
        isCAAN,
        isAdmin,
        getTenantId,
        getAirlineName,
        onAuthChange,
        protectRoute,
        isSessionExpired,
        refreshSession,
        // Expose state for debugging
        _currentUser: () => currentUser,
        _isAuthenticated: () => isAuthenticated
    };
    
    console.log('🔐 Auth module loaded successfully');
    console.log(`📊 Auth state: ${isLoggedIn() ? 'Authenticated' : 'Not authenticated'}`);
}

// For Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        hasRole,
        isParticipant,
        isSafetyOfficer,
        isCAAN,
        isAdmin,
        getTenantId,
        getAirlineName,
        onAuthChange,
        protectRoute,
        isSessionExpired,
        refreshSession
    };
}
