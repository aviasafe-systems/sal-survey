/*
================================================================================
FILE: gap-analysis/questions/question-bank.js
VERSION: 2.0.0
REVISION DATE: 2026-06-18
PURPOSE: Complete ICAO Annex 19 SMS Question Bank - 20 bilingual questions (EN/NP)
         Based on Safety Survey Questionnaire with mixed response types
DEPENDENCIES: None
USAGE: survey/survey.html
AUTHOR: Ghanshyam Acharya
CODE OWNER: aviasafetysystems.com
================================================================================
*/

const QUESTION_BANK = {
    // ============================================================
    // SECTION A: Safety Policy (4 questions)
    // ============================================================
    sectionA: {
        id: 'A',
        name: {
            en: 'Safety Policy',
            np: 'सुरक्षा नीति'
        },
        description: {
            en: 'Please indicate your awareness and perception of the safety policy.',
            np: 'कृपया सुरक्षा नीतिप्रति तपाईंको जानकारी र धारणा संकेत गर्नुहोस्।'
        },
        questions: [
            {
                id: 'q1',
                text: {
                    en: 'I am aware of my organization\'s safety policy statement.',
                    np: 'म मेरो संस्थाको सुरक्षा नीति कथनबारे जानकार छु।'
                },
                type: 'yesno',
                options: [
                    { value: 1, label: { en: 'Aware', np: 'जानकार' } },
                    { value: 0, label: { en: 'Unaware', np: 'अज्ञान' } }
                ]
            },
            {
                id: 'q2',
                text: {
                    en: 'Employees at all levels are regularly informed and reminded about the Safety Policy Statement.',
                    np: 'सबै तहका कर्मचारीहरूलाई नियमित रूपमा सुरक्षा नीति कथनको बारेमा जानकारी र सम्झाइन्छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q3',
                text: {
                    en: 'The safety policy statement clearly demonstrates the company\'s commitment to safety.',
                    np: 'सुरक्षा नीति कथनले कम्पनीको सुरक्षाप्रतिको प्रतिबद्धता स्पष्ट रूपमा देखाउँछ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q4',
                text: {
                    en: 'The safety policy statement is applicable and relevant to all employees, regardless of their roles or level in the organization.',
                    np: 'सुरक्षा नीति कथन संस्थामा उनीहरूको भूमिका वा स्तरको पर्वाह नगरी सबै कर्मचारीहरूका लागि लागू र सान्दर्भिक छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            }
        ]
    },

    // ============================================================
    // SECTION B: Hazard Reporting Culture (7 questions)
    // ============================================================
    sectionB: {
        id: 'B',
        name: {
            en: 'Hazard Reporting Culture',
            np: 'जोखिम रिपोर्टिङ संस्कृति'
        },
        description: {
            en: 'Please indicate your experience and comfort with hazard reporting.',
            np: 'कृपया जोखिम रिपोर्टिङको साथ तपाईंको अनुभव र सहजता संकेत गर्नुहोस्।'
        },
        questions: [
            {
                id: 'q5',
                text: {
                    en: 'I believe that my company has an effective hazard reporting process.',
                    np: 'म विश्वास गर्छु कि मेरो कम्पनीसँग प्रभावकारी जोखिम रिपोर्टिङ प्रक्रिया छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q6',
                text: {
                    en: 'I feel comfortable reporting issues with the hazard reporting process.',
                    np: 'म जोखिम रिपोर्टिङ प्रक्रियाको साथ समस्याहरू रिपोर्ट गर्न सहज महसुस गर्छु।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q7',
                text: {
                    en: 'I think our hazard reporting process is very easy to use.',
                    np: 'मलाई लाग्छ हाम्रो जोखिम रिपोर्टिङ प्रक्रिया प्रयोग गर्न धेरै सजिलो छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q8',
                text: {
                    en: 'I think that reporting issues has obvious value for my safety.',
                    np: 'मलाई लाग्छ समस्याहरू रिपोर्ट गर्नु मेरो सुरक्षाको लागि स्पष्ट मूल्य हो।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q9',
                text: {
                    en: 'I never feel pressure to NOT report some types of issues.',
                    np: 'मलाई केही प्रकारका समस्याहरू रिपोर्ट नगर्न कहिल्यै दबाब महसुस हुँदैन।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q10',
                text: {
                    en: 'I always report any dangerous work practice I see.',
                    np: 'मैले देखेको कुनै पनि खतरनाक कार्य अभ्यास म सधैं रिपोर्ट गर्छु।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q11',
                text: {
                    en: 'I think management gives good feedback regarding the company\'s safety performance.',
                    np: 'मलाई लाग्छ व्यवस्थापनले कम्पनीको सुरक्षा प्रदर्शनको बारेमा राम्रो प्रतिक्रिया दिन्छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            }
        ]
    },

    // ============================================================
    // SECTION C: Safety Guidance from SMS (6 questions)
    // ============================================================
    sectionC: {
        id: 'C',
        name: {
            en: 'Safety Guidance from SMS',
            np: 'SMS बाट सुरक्षा मार्गदर्शन'
        },
        description: {
            en: 'Please indicate the availability and effectiveness of safety guidance.',
            np: 'कृपया सुरक्षा मार्गदर्शनको उपलब्धता र प्रभावकारिता संकेत गर्नुहोस्।'
        },
        questions: [
            {
                id: 'q12',
                text: {
                    en: 'I feel that I am given enough training to easily complete my tasks.',
                    np: 'मलाई लाग्छ मलाई मेरा कार्यहरू सजिलै पूरा गर्न पर्याप्त तालिम दिइएको छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q13',
                text: {
                    en: 'I have checklists that I use to complete routine tasks.',
                    np: 'मसँग दिनचर्या कार्यहरू पूरा गर्न प्रयोग गर्ने चेकलिस्टहरू छन्।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q14',
                text: {
                    en: 'I have procedures that I can consult if I don\'t know how to complete one of my duties.',
                    np: 'यदि मलाई मेरो एउटा कर्तव्य कसरी पूरा गर्ने भन्ने थाहा छैन भने मसँग परामर्श गर्न सक्ने प्रक्रियाहरू छन्।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q15',
                text: {
                    en: 'I think that I am kept informed when changes are made which may affect safety.',
                    np: 'मलाई लाग्छ जब सुरक्षालाई असर गर्न सक्ने परिवर्तनहरू गरिन्छ भने मलाई जानकारी दिइन्छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q16',
                text: {
                    en: 'In case of an emergency, I can use an emergency response document to follow for what to do and who to contact.',
                    np: 'आपतकालीन अवस्थामा, म के गर्ने र कसलाई सम्पर्क गर्ने भनेर पालना गर्न आपतकालीन प्रतिक्रिया कागजात प्रयोग गर्न सक्छु।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q17',
                text: {
                    en: 'I feel management does a good job following up with me regarding issues I have reported.',
                    np: 'मलाई लाग्छ व्यवस्थापनले मैले रिपोर्ट गरेका समस्याहरूको बारेमा मसँग राम्रो अनुगमन गर्दछ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            }
        ]
    },

    // ============================================================
    // SECTION D: Employee Feelings About SMS (3 questions)
    // ============================================================
    sectionD: {
        id: 'D',
        name: {
            en: 'Employee Feelings About SMS',
            np: 'SMS बारे कर्मचारीको भावना'
        },
        description: {
            en: 'Please indicate your overall feelings about the Safety Management System.',
            np: 'कृपया सुरक्षा व्यवस्थापन प्रणालीको बारेमा तपाईंको समग्र भावना संकेत गर्नुहोस्।'
        },
        questions: [
            {
                id: 'q18',
                text: {
                    en: 'I feel that I was adequately trained on the purpose and goals of our SMS.',
                    np: 'मलाई लाग्छ मलाई हाम्रो SMS को उद्देश्य र लक्ष्यहरूमा पर्याप्त तालिम दिइएको थियो।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q19',
                text: {
                    en: 'Safety audits/inspections are carried out regularly.',
                    np: 'सुरक्षा लेखापरीक्षण/निरीक्षणहरू नियमित रूपमा गरिन्छ।'
                },
                type: 'likert',
                options: [
                    { value: 1, label: { en: 'Strongly Disagree', np: 'पूर्ण रूपमा असहमत' } },
                    { value: 2, label: { en: 'Disagree', np: 'असहमत' } },
                    { value: 3, label: { en: 'No opinion', np: 'कुनै धारणा छैन' } },
                    { value: 4, label: { en: 'Agree', np: 'सहमत' } },
                    { value: 5, label: { en: 'Strongly Agree', np: 'पूर्ण रूपमा सहमत' } }
                ]
            },
            {
                id: 'q20',
                text: {
                    en: 'Is there anything further you would like to add? (Optional)',
                    np: 'के तपाईं थप केही थप्न चाहनुहुन्छ? (ऐच्छिक)'
                },
                type: 'text',
                placeholder: {
                    en: 'Please share any additional comments, concerns, or suggestions...',
                    np: 'कृपया कुनै अतिरिक्त टिप्पणी, चिन्ता, वा सुझावहरू साझा गर्नुहोस्...'
                }
            }
        ]
    }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Get all questions as a flat array with language support
function getAllQuestions(lang = 'en') {
    const allQuestions = [];
    const sections = ['sectionA', 'sectionB', 'sectionC', 'sectionD'];
    
    sections.forEach(sectionKey => {
        const section = QUESTION_BANK[sectionKey];
        section.questions.forEach(q => {
            allQuestions.push({
                ...q,
                sectionId: section.id,
                sectionName: section.name[lang] || section.name['en'],
                text: q.text[lang] || q.text['en'],
                options: q.options ? q.options.map(opt => ({
                    value: opt.value,
                    label: opt.label[lang] || opt.label['en']
                })) : [],
                placeholder: q.placeholder ? (q.placeholder[lang] || q.placeholder['en']) : ''
            });
        });
    });
    return allQuestions;
}

// Get questions for a specific session (20 questions - all in one session)
function getSessionQuestions(sessionNumber = 1, lang = 'en') {
    // All 20 questions are in one session
    return getAllQuestions(lang);
}

// Get question by ID
function getQuestionById(id, lang = 'en') {
    const allQuestions = getAllQuestions(lang);
    return allQuestions.find(q => q.id === id);
}

// Get questions by section
function getQuestionsBySection(sectionId, lang = 'en') {
    const allQuestions = getAllQuestions(lang);
    return allQuestions.filter(q => q.sectionId === sectionId);
}

// Get question bank statistics
function getQuestionBankStats() {
    const allQuestions = getAllQuestions('en');
    const sectionStats = {};
    
    for (const sectionKey of ['sectionA', 'sectionB', 'sectionC', 'sectionD']) {
        const section = QUESTION_BANK[sectionKey];
        sectionStats[section.id] = {
            name: section.name,
            questionCount: section.questions.length
        };
    }
    
    return {
        totalQuestions: allQuestions.length,
        totalSections: Object.keys(QUESTION_BANK).length,
        sectionStats: sectionStats,
        responseTypes: {
            yesno: allQuestions.filter(q => q.type === 'yesno').length,
            likert: allQuestions.filter(q => q.type === 'likert').length,
            text: allQuestions.filter(q => q.type === 'text').length
        }
    };
}

// ============================================================
// EXPORT
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QUESTION_BANK,
        getAllQuestions,
        getSessionQuestions,
        getQuestionById,
        getQuestionsBySection,
        getQuestionBankStats
    };
}

// For browser use
window.QuestionBank = {
    QUESTION_BANK,
    getAllQuestions,
    getSessionQuestions,
    getQuestionById,
    getQuestionsBySection,
    getQuestionBankStats
};

// Log stats on load
console.log('📚 New Question Bank Loaded (Version 2.0.0):');
console.log(getQuestionBankStats());
console.log('🌐 Supports English (en) and Nepali (np)');
console.log('📋 20 questions across 4 sections');
console.log('📊 Mixed response types: Yes/No, Likert (5-point), Open-ended text');