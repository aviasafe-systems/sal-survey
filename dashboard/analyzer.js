// dashboard/analyzer.js
// ICAO 12 Elements Scoring Engine

const ICAO_ELEMENTS = {
    "q1_aware": { element: "1.1_commitment", weight: 0.08 },
    "q2": { element: "1.1_commitment", weight: 0.08 },
    "q3": { element: "1.2_accountability", weight: 0.08 },
    "q4": { element: "1.2_accountability", weight: 0.08 },
    "q5_spi": { element: "1.3_key_personnel", weight: 0.08 },
    "q6": { element: "1.4_emergency", weight: 0.06 },
    "q7": { element: "1.5_documentation", weight: 0.05 },
    "q8": { element: "2.1_hazard_id", weight: 0.15 },
    "q9": { element: "2.1_hazard_id", weight: 0.15 },
    "q10": { element: "2.1_hazard_id", weight: 0.15 },
    "q11": { element: "2.2_risk_mitigation", weight: 0.15 },
    "q12": { element: "2.2_risk_mitigation", weight: 0.15 },
    "q13_action_inform": { element: "3.1_performance", weight: 0.10 },
    "q14": { element: "3.1_performance", weight: 0.10 },
    "q15": { element: "3.2_change_mgmt", weight: 0.08 },
    "q16": { element: "3.2_change_mgmt", weight: 0.08 },
    "q17": { element: "3.3_improvement", weight: 0.07 },
    "q18": { element: "3.3_improvement", weight: 0.07 },
    "q19": { element: "3.3_improvement", weight: 0.07 },
    "q20_corrective": { element: "4.1_training", weight: 0.06 },
    "q21": { element: "4.1_training", weight: 0.06 },
    "q22": { element: "4.2_communication", weight: 0.04 },
    "q23_peer": { element: "4.2_communication", weight: 0.04 },
    "q24_comments": { element: "4.2_communication", weight: 0.04 }
};

const ELEMENT_NAMES = {
    "1.1_commitment": { name: "Management Commitment", pillar: 1, pillarName: "Safety Policy", threshold: 60 },
    "1.2_accountability": { name: "Safety Accountabilities", pillar: 1, pillarName: "Safety Policy", threshold: 60 },
    "1.3_key_personnel": { name: "Key Safety Personnel", pillar: 1, pillarName: "Safety Policy", threshold: 60 },
    "1.4_emergency": { name: "Emergency Response", pillar: 1, pillarName: "Safety Policy", threshold: 70 },
    "1.5_documentation": { name: "SMS Documentation", pillar: 1, pillarName: "Safety Policy", threshold: 70 },
    "2.1_hazard_id": { name: "Hazard Identification", pillar: 2, pillarName: "Risk Management", threshold: 50 },
    "2.2_risk_mitigation": { name: "Risk Assessment", pillar: 2, pillarName: "Risk Management", threshold: 50 },
    "3.1_performance": { name: "Performance Monitoring", pillar: 3, pillarName: "Safety Assurance", threshold: 60 },
    "3.2_change_mgmt": { name: "Management of Change", pillar: 3, pillarName: "Safety Assurance", threshold: 60 },
    "3.3_improvement": { name: "Continuous Improvement", pillar: 3, pillarName: "Safety Assurance", threshold: 65 },
    "4.1_training": { name: "Training & Education", pillar: 4, pillarName: "Safety Promotion", threshold: 70 },
    "4.2_communication": { name: "Safety Communication", pillar: 4, pillarName: "Safety Promotion", threshold: 70 }
};

function likertToPercentage(value) {
    const num = parseInt(value);
    if (isNaN(num)) return 0;
    return (num / 5) * 100;
}

function calculateICAOCompliance(responses) {
    const elementScores = {};
    
    // Initialize scores
    for (const [elemId, info] of Object.entries(ELEMENT_NAMES)) {
        elementScores[elemId] = { total: 0, count: 0, weight: 0 };
    }
    
    // Calculate element weights and collect scores
    for (const response of responses) {
        const mapping = ICAO_ELEMENTS[response.question_id];
        if (mapping && response.answer) {
            const elemId = mapping.element;
            if (elementScores[elemId]) {
                const score = likertToPercentage(response.answer);
                elementScores[elemId].total += score;
                elementScores[elemId].count++;
                elementScores[elemId].weight = mapping.weight;
            }
        }
    }
    
    // Calculate averages and weighted scores
    const elementResults = {};
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    for (const [elemId, data] of Object.entries(elementScores)) {
        const avgScore = data.count > 0 ? data.total / data.count : 0;
        const elementInfo = ELEMENT_NAMES[elemId];
        
        elementResults[elemId] = {
            name: elementInfo.name,
            pillar: elementInfo.pillar,
            pillarName: elementInfo.pillarName,
            score: Math.round(avgScore),
            raw: avgScore,
            weight: data.weight,
            weighted: (avgScore / 100) * data.weight,
            riskLevel: avgScore < elementInfo.threshold ? "Critical" : avgScore < 70 ? "High" : avgScore < 85 ? "Medium" : "Low",
            responseCount: data.count
        };
        
        totalWeightedScore += (avgScore / 100) * data.weight;
        totalWeight += data.weight;
    }
    
    // Calculate pillar averages
    const pillarTotals = { 1: { total: 0, count: 0 }, 2: { total: 0, count: 0 }, 3: { total: 0, count: 0 }, 4: { total: 0, count: 0 } };
    
    for (const result of Object.values(elementResults)) {
        pillarTotals[result.pillar].total += result.score;
        pillarTotals[result.pillar].count++;
    }
    
    const pillarScores = {
        1: pillarTotals[1].count ? Math.round(pillarTotals[1].total / pillarTotals[1].count) : 0,
        2: pillarTotals[2].count ? Math.round(pillarTotals[2].total / pillarTotals[2].count) : 0,
        3: pillarTotals[3].count ? Math.round(pillarTotals[3].total / pillarTotals[3].count) : 0,
        4: pillarTotals[4].count ? Math.round(pillarTotals[4].total / pillarTotals[4].count) : 0
    };
    
    const overall = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
    
    let riskLevel = "Low";
    if (overall < 50) riskLevel = "Critical";
    else if (overall < 65) riskLevel = "High";
    else if (overall < 80) riskLevel = "Medium";
    
    return {
        overall: Math.round(overall),
        riskLevel: riskLevel,
        pillars: pillarScores,
        elements: elementResults,
        responseCount: responses.length
    };
}

function loadResponsesFromLocalStorage() {
    try {
        const raw = localStorage.getItem('sms_pending_responses');
        if (!raw) return [];
        const all = JSON.parse(raw);
        return Array.isArray(all) ? all.filter(r => r.question_id) : [];
    } catch (e) {
        console.error("Failed to load responses:", e);
        return [];
    }
}