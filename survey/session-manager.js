// SurveySMS/utils/storage.js
// Data persistence utilities

class StorageManager {
    constructor() {
        this.prefix = 'sms_';
        this.memory = new Map();
        this.useLocalStorage = typeof localStorage !== 'undefined';
    }

    // ============================================================
    // CORE OPERATIONS
    // ============================================================

    getKey(key) {
        return `${this.prefix}${key}`;
    }

    set(key, value, useMemory = false) {
        const fullKey = this.getKey(key);
        const serialized = JSON.stringify(value);

        if (useMemory) {
            this.memory.set(fullKey, serialized);
        }

        if (this.useLocalStorage) {
            try {
                localStorage.setItem(fullKey, serialized);
            } catch (e) {
                console.warn('LocalStorage set failed:', e);
                this.memory.set(fullKey, serialized);
            }
        } else {
            this.memory.set(fullKey, serialized);
        }

        return value;
    }

    get(key, defaultValue = null) {
        const fullKey = this.getKey(key);

        // Try memory first (fastest)
        if (this.memory.has(fullKey)) {
            try {
                return JSON.parse(this.memory.get(fullKey));
            } catch (e) {
                return this.memory.get(fullKey);
            }
        }

        // Try localStorage
        if (this.useLocalStorage) {
            try {
                const data = localStorage.getItem(fullKey);
                if (data !== null) {
                    try {
                        return JSON.parse(data);
                    } catch (e) {
                        return data;
                    }
                }
            } catch (e) {
                console.warn('LocalStorage get failed:', e);
            }
        }

        return defaultValue;
    }

    remove(key) {
        const fullKey = this.getKey(key);
        this.memory.delete(fullKey);
        if (this.useLocalStorage) {
            try {
                localStorage.removeItem(fullKey);
            } catch (e) {
                console.warn('LocalStorage remove failed:', e);
            }
        }
    }

    clear() {
        this.memory.clear();
        if (this.useLocalStorage) {
            try {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(this.prefix)) {
                        localStorage.removeItem(key);
                    }
                });
            } catch (e) {
                console.warn('LocalStorage clear failed:', e);
            }
        }
    }

    // ============================================================
    // CONVENIENCE METHODS
    // ============================================================

    setUserData(data) {
        return this.set('user_data', data);
    }

    getUserData() {
        return this.get('user_data', {});
    }

    setSurveyData(data) {
        return this.set('survey_data', data);
    }

    getSurveyData() {
        return this.get('survey_data', {});
    }

    setSessionData(data) {
        return this.set('session_data', data);
    }

    getSessionData() {
        return this.get('session_data', {});
    }

    setAnswers(tenantId, userId, sessionNumber, answers) {
        const key = `answers_${tenantId}_${userId}_${sessionNumber}`;
        return this.set(key, answers);
    }

    getAnswers(tenantId, userId, sessionNumber) {
        const key = `answers_${tenantId}_${userId}_${sessionNumber}`;
        return this.get(key, []);
    }

    // ============================================================
    // EXPORT/IMPORT
    // ============================================================

    exportData() {
        const data = {};
        if (this.useLocalStorage) {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    data[key] = localStorage.getItem(key);
                }
            });
        }
        // Add memory data
        this.memory.forEach((value, key) => {
            if (key.startsWith(this.prefix) && !data[key]) {
                data[key] = value;
            }
        });
        return data;
    }

    importData(data) {
        for (const key in data) {
            if (key.startsWith(this.prefix)) {
                if (this.useLocalStorage) {
                    try {
                        localStorage.setItem(key, data[key]);
                    } catch (e) {
                        console.warn('Import failed for key:', key, e);
                    }
                }
                this.memory.set(key, data[key]);
            }
        }
    }

    // ============================================================
    // STATISTICS
    // ============================================================

    getStats() {
        let count = 0;
        let size = 0;

        if (this.useLocalStorage) {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    count++;
                    size += (localStorage.getItem(key) || '').length;
                }
            });
        }

        this.memory.forEach((value) => {
            count++;
            size += (value || '').length;
        });

        return {
            totalKeys: count,
            totalSize: size,
            sizeInKB: Math.round(size / 1024 * 100) / 100,
            usingLocalStorage: this.useLocalStorage
        };
    }
}

// ============================================================
// EXPORT
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}

window.StorageManager = StorageManager;