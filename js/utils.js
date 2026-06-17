/*
================================================================================
FILE: SurveySMS/js/utils.js
VERSION: 1.0.0
REVISION DATE: 2026-06-17
PURPOSE: Core utility functions - formatting, validation, DOM helpers
DEPENDENCIES: None (pure utility library)
USAGE: All pages
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

// ============================================================
// STRING UTILITIES
// ============================================================

/**
 * Capitalize first letter of a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
function capitalize(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - Input string
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default '...')
 * @returns {string} Truncated string
 */
function truncate(str, length = 50, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + suffix;
}

/**
 * Sanitize string to prevent XSS
 * @param {string} str - Input string
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Slugify a string for URLs
 * @param {string} str - Input string
 * @returns {string} Slugified string
 */
function slugify(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// ============================================================
// VALIDATION UTILITIES
// ============================================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length (default 8)
 * @returns {object} Validation result with score and feedback
 */
function validatePassword(password, minLength = 8) {
    const result = {
        isValid: false,
        score: 0,
        feedback: []
    };

    if (!password || typeof password !== 'string') {
        result.feedback.push('Password is required');
        return result;
    }

    if (password.length < minLength) {
        result.feedback.push(`Password must be at least ${minLength} characters`);
    } else {
        result.score += 25;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        result.score += 25;
    } else {
        result.feedback.push('Include both uppercase and lowercase letters');
    }

    if (/\d/.test(password)) {
        result.score += 25;
    } else {
        result.feedback.push('Include at least one number');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        result.score += 25;
    } else {
        result.feedback.push('Include at least one special character');
    }

    result.isValid = result.score >= 75 && result.feedback.length === 0;
    return result;
}

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} True if value exists and is not empty
 */
function isRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
}

// ============================================================
// DATE/TIME UTILITIES
// ============================================================

/**
 * Format date to localized string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default 'en-US')
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
function formatDate(date, locale = 'en-US', options = {}) {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (!(d instanceof Date) || isNaN(d)) return '';
    
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return d.toLocaleDateString(locale, { ...defaultOptions, ...options });
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
function getRelativeTime(date) {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (!(d instanceof Date) || isNaN(d)) return '';
    
    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    const rtf = new Intl.RelativeTimeFormatter('en', { numeric: 'auto' });

    if (diffYear > 0) return rtf.format(-diffYear, 'year');
    if (diffMonth > 0) return rtf.format(-diffMonth, 'month');
    if (diffWeek > 0) return rtf.format(-diffWeek, 'week');
    if (diffDay > 0) return rtf.format(-diffDay, 'day');
    if (diffHour > 0) return rtf.format(-diffHour, 'hour');
    if (diffMin > 0) return rtf.format(-diffMin, 'minute');
    return rtf.format(-diffSec, 'second');
}

// ============================================================
// DOM UTILITIES
// ============================================================

/**
 * Get element by ID with error handling
 * @param {string} id - Element ID
 * @param {boolean} required - Throw error if element not found
 * @returns {Element|null} DOM element or null
 */
function getElement(id, required = false) {
    const el = document.getElementById(id);
    if (required && !el) {
        throw new Error(`Element with ID "${id}" not found`);
    }
    return el;
}

/**
 * Show/hide element
 * @param {string|Element} target - Element ID or DOM element
 * @param {boolean} show - True to show, false to hide
 * @param {string} display - Display style (default 'block')
 */
function toggleElement(target, show, display = 'block') {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;
    el.style.display = show ? display : 'none';
}

/**
 * Add loading state to element
 * @param {string|Element} target - Element ID or DOM element
 * @param {string} message - Loading message
 * @param {boolean} isLoading - True to show loading, false to remove
 */
function setLoading(target, message = 'Loading...', isLoading = true) {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;
    
    if (isLoading) {
        el.dataset.originalContent = el.innerHTML;
        el.innerHTML = `<span class="spinner"></span> ${message}`;
        el.disabled = true;
    } else {
        if (el.dataset.originalContent) {
            el.innerHTML = el.dataset.originalContent;
            delete el.dataset.originalContent;
        }
        el.disabled = false;
    }
}

/**
 * Scroll to element smoothly
 * @param {string|Element} target - Element ID or DOM element
 * @param {number} offset - Offset from top (default 80)
 */
function scrollToElement(target, offset = 80) {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

// ============================================================
// STORAGE HELPERS (temporary - will be moved to storage.js)
// ============================================================

/**
 * Safely parse JSON from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed value or defaultValue
 */
function getStorageItem(key, defaultValue = null) {
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
 * Safely set JSON to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} True if successful
 */
function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to set localStorage key "${key}":`, error);
        return false;
    }
}

// ============================================================
// EXPOSE FOR BROWSER AND TESTING
// ============================================================

// For browser
if (typeof window !== 'undefined') {
    window.utils = {
        capitalize,
        truncate,
        sanitizeString,
        slugify,
        isValidEmail,
        validatePassword,
        isRequired,
        formatDate,
        getRelativeTime,
        getElement,
        toggleElement,
        setLoading,
        scrollToElement,
        getStorageItem,
        setStorageItem
    };
}

// For Node.js (if used in build process)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        capitalize,
        truncate,
        sanitizeString,
        slugify,
        isValidEmail,
        validatePassword,
        isRequired,
        formatDate,
        getRelativeTime,
        getElement,
        toggleElement,
        setLoading,
        scrollToElement,
        getStorageItem,
        setStorageItem
    };
}

console.log('🛠️ Utils module loaded successfully');
console.log('💡 Available utilities: validation, formatting, DOM helpers');
