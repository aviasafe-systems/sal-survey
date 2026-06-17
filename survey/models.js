// SurveySMS/survey/models.js
// Pydantic-style data models for SurveySMS
// These match the Supabase export headers

class SurveyResponse {
    constructor(data) {
        // Core fields - match Supabase export headers exactly
        this.id = data.id || null;
        this.tenant_id = data.tenant_id || data.tenantId || null;
        this.department = data.department || '';
        this.employee_category = data.employee_category || data.employeeCategory || '';
        
        // Overall score (calculated or raw)
        this.overall_score = data.overall_score || data.overallScore || 0;
        
        // ICAO Annex 19 - SMS Elements (Q1-Q12)
        this.q1_aware = data.q1_aware || data.q1 || 0;
        this.q2_policy = data.q2_policy || data.q2 || 0;
        this.q3_risk = data.q3_risk || data.q3 || 0;
        this.q4_safety = data.q4_safety || data.q4 || 0;
        this.q5_spi = data.q5_spi || data.q5 || 0;
        this.q6_training = data.q6_training || data.q6 || 0;
        this.q7_communication = data.q7_communication || data.q7 || 0;
        this.q8_reporting = data.q8_reporting || data.q8 || 0;
        this.q9_investigation = data.q9_investigation || data.q9 || 0;
        this.q10_emergency = data.q10_emergency || data.q10 || 0;
        this.q11_change = data.q11_change || data.q11 || 0;
        this.q12_continuous = data.q12_continuous || data.q12 || 0;
        
        // Metadata
        this.timestamp = data.timestamp || data.created_at || new Date().toISOString();
        this.submission_date = data.submission_date || this.timestamp;
    }
    
    // Calculate overall score from individual Q scores
    calculateOverallScore() {
        const scores = [
            this.q1_aware, this.q2_policy, this.q3_risk, this.q4_safety,
            this.q5_spi, this.q6_training, this.q7_communication, this.q8_reporting,
            this.q9_investigation, this.q10_emergency, this.q11_change, this.q12_continuous
        ];
        const validScores = scores.filter(s => typeof s === 'number' && s >= 0);
        if (validScores.length === 0) return 0;
        return parseFloat((validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2));
    }
    
    // Convert to plain object for Supabase
    toJSON() {
        return {
            tenant_id: this.tenant_id,
            department: this.department,
            employee_category: this.employee_category,
            overall_score: this.overall_score,
            q1_aware: this.q1_aware,
            q2_policy: this.q2_policy,
            q3_risk: this.q3_risk,
            q4_safety: this.q4_safety,
            q5_spi: this.q5_spi,
            q6_training: this.q6_training,
            q7_communication: this.q7_communication,
            q8_reporting: this.q8_reporting,
            q9_investigation: this.q9_investigation,
            q10_emergency: this.q10_emergency,
            q11_change: this.q11_change,
            q12_continuous: this.q12_continuous,
            submission_date: this.submission_date,
            timestamp: this.timestamp
        };
    }
    
    // Validate required fields
    validate() {
        const errors = [];
        if (!this.tenant_id) errors.push('tenant_id is required');
        if (!this.department) errors.push('department is required');
        if (!this.employee_category) errors.push('employee_category is required');
        return {
            valid: errors.length === 0,
            errors
        };
    }
}

// Analytics Model - for dashboard processing
class AnalyticsData {
    constructor(responses = []) {
        this.responses = responses.map(r => new SurveyResponse(r));
        this.summary = this.calculateSummary();
        this.gapAnalysis = this.calculateGapAnalysis();
    }
    
    calculateSummary() {
        if (this.responses.length === 0) return null;
        
        const total = this.responses.length;
        const avgOverall = parseFloat((this.responses.reduce((sum, r) => sum + r.overall_score, 0) / total).toFixed(2));
        
        // Calculate average per question
        const qAverages = {};
        for (let i = 1; i <= 12; i++) {
            const qKey = `q${i}`;
            const qScoreKey = i === 1 ? 'q1_aware' : 
                              i === 2 ? 'q2_policy' :
                              i === 3 ? 'q3_risk' :
                              i === 4 ? 'q4_safety' :
                              i === 5 ? 'q5_spi' :
                              i === 6 ? 'q6_training' :
                              i === 7 ? 'q7_communication' :
                              i === 8 ? 'q8_reporting' :
                              i === 9 ? 'q9_investigation' :
                              i === 10 ? 'q10_emergency' :
                              i === 11 ? 'q11_change' :
                              'q12_continuous';
            
            const scores = this.responses.map(r => r[qScoreKey]).filter(s => typeof s === 'number');
            if (scores.length > 0) {
                qAverages[qKey] = parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
            } else {
                qAverages[qKey] = 0;
            }
        }
        
        return {
            totalResponses: total,
            avgOverall: avgOverall,
            qAverages: qAverages,
            departments: this.getDepartmentBreakdown(),
            categories: this.getEmployeeCategoryBreakdown()
        };
    }
    
    getDepartmentBreakdown() {
        const deptMap = {};
        this.responses.forEach(r => {
            if (!deptMap[r.department]) deptMap[r.department] = { count: 0, scores: [] };
            deptMap[r.department].count++;
            deptMap[r.department].scores.push(r.overall_score);
        });
        
        const result = {};
        for (const [dept, data] of Object.entries(deptMap)) {
            result[dept] = {
                count: data.count,
                avgScore: parseFloat((data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(2))
            };
        }
        return result;
    }
    
    getEmployeeCategoryBreakdown() {
        const catMap = {};
        this.responses.forEach(r => {
            if (!catMap[r.employee_category]) catMap[r.employee_category] = { count: 0, scores: [] };
            catMap[r.employee_category].count++;
            catMap[r.employee_category].scores.push(r.overall_score);
        });
        
        const result = {};
        for (const [cat, data] of Object.entries(catMap)) {
            result[cat] = {
                count: data.count,
                avgScore: parseFloat((data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(2))
            };
        }
        return result;
    }
    
    calculateGapAnalysis() {
        // Annex 19 SMS elements - target scores (ideal: 4.0)
        const targetScore = 4.0;
        const gaps = {};
        
        for (let i = 1; i <= 12; i++) {
            const qKey = `q${i}`;
            const avgScore = this.summary?.qAverages?.[qKey] || 0;
            gaps[qKey] = {
                current: avgScore,
                target: targetScore,
                gap: parseFloat((targetScore - avgScore).toFixed(2)),
                severity: this.calculateSeverity(targetScore - avgScore)
            };
        }
        
        return gaps;
    }
    
    calculateSeverity(gap) {
        if (gap <= 0) return 'Green - Compliant';
        if (gap <= 0.5) return 'Yellow - Minor Gap';
        if (gap <= 1.0) return 'Orange - Moderate Gap';
        return 'Red - Critical Gap';
    }
}

// Export for use in both frontend and backend (via module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SurveyResponse, AnalyticsData };
}

// For browser use
window.SurveyModels = { SurveyResponse, AnalyticsData };