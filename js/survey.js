/*
================================================================================
FILE: SurveySMS/js/survey.js
VERSION: 3.0
REVISION DATE: 2026-06-17
PURPOSE: Survey page logic - handles questions, answers, navigation, language
REVISED PURPOSE: Fixed AIRLINE_PURPOSES access, starts at Question 1, fixed page title
AFFECTED: survey/survey.html
================================================================================
*/

// ============================================================
// CONFIGURATION
// ============================================================
const QUESTIONS_PER_SESSION = 24;
const TOTAL_ELEMENTS = 12;
const QUESTIONS_PER_ELEMENT = 2;

// ============================================================
// AIRLINE PURPOSES (Localized)
// ============================================================
const AIRLINE_PURPOSES = {
    'sita-air': {
        en: 'Sita Air is conducting this survey to assess our safety culture, identify strengths, and develop corrective action plans in alignment with ICAO Annex 19 requirements.',
        np: 'सीता एयरले ICAO Annex 19 आवश्यकताहरू अनुरूप हाम्रो सुरक्षा संस्कृति मूल्याङ्कन गर्न, बलियो पक्षहरू पहिचान गर्न, र सुधारात्मक कार्य योजनाहरू विकास गर्न यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'tara-air': {
        en: 'Tara Air is conducting this survey to evaluate our safety management system and ensure compliance with international safety standards.',
        np: 'तारा एयरले हाम्रो सुरक्षा व्यवस्थापन प्रणालीको मूल्याङ्कन गर्न र अन्तर्राष्ट्रिय सुरक्षा मापदण्डहरूको अनुपालन सुनिश्चित गर्न यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'summit-air': {
        en: 'Summit Air is conducting this survey to strengthen our safety culture and operational excellence through employee feedback.',
        np: 'समिट एयरले कर्मचारी प्रतिक्रिया मार्फत हाम्रो सुरक्षा संस्कृति र परिचालन उत्कृष्टता बलियो बनाउन यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'buddha-air': {
        en: 'Buddha Air is conducting this survey to enhance our safety performance and maintain the highest standards of aviation safety.',
        np: 'बुद्ध एयरले हाम्रो सुरक्षा प्रदर्शन बढाउन र विमानन सुरक्षाको उच्चतम मापदण्डहरू कायम राख्न यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'yeti-airlines': {
        en: 'Yeti Airlines is conducting this survey to assess our safety management practices and drive continuous improvement.',
        np: 'यती एयरलाइन्सले हाम्रो सुरक्षा व्यवस्थापन अभ्यासहरूको मूल्याङ्कन गर्न र निरन्तर सुधारलाई अगाडि बढाउन यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'shree-airlines': {
        en: 'Shree Airlines is conducting this survey to evaluate our safety culture and risk management processes.',
        np: 'श्री एयरलाइन्सले हाम्रो सुरक्षा संस्कृति र जोखिम व्यवस्थापन प्रक्रियाहरूको मूल्याङ्कन गर्न यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    },
    'danfe-air': {
        en: 'Danfe Air is conducting this survey to assess our safety management system and commitment to aviation safety excellence.',
        np: 'दान्फे एयरले हाम्रो सुरक्षा व्यवस्थापन प्रणाली र विमानन सुरक्षा उत्कृष्टताप्रतिको प्रतिबद्धताको मूल्याङ्कन गर्न यो सर्वेक्षण सञ्चालन गरिरहेको छ।'
    }
};

// ============================================================
// STATE
// ============================================================
let currentQuestion = 0;
let answers = [];
let selectedValue = null;
let tenantId = null;
let airlineName = null;
let userData = null;
let questions = [];
let isAnswerSaved = false;
let currentLang = 'en';

// ============================================================
// ELEMENT NAMES
// ============================================================
function getElementName(num) {
    const names = {
        1: 'Safety Policy & Objectives',
        2: 'Safety Accountabilities',
        3: 'Hazard Identification',
        4: 'Risk Assessment & Mitigation',
        5: 'Safety Performance Monitoring',
        6: 'Internal Safety Audits',
        7: 'Management of Change',
        8: 'Continuous Improvement',
        9: 'Safety Training & Competence',
        10: 'Safety Communication',
        11: 'Safety Culture',
        12: 'Emergency Response Planning'
    };
    return names[num] || `Element ${num}`;
}

// ============================================================
// GET LOCALIZED PURPOSE
// ============================================================
function getLocalizedPurpose(tenantId, lang) {
    const purpose = AIRLINE_PURPOSES[tenantId];
    if (purpose) {
        return purpose[lang] || purpose['en'];
    }
    const defaultPurpose = {
        en: 'This survey is being conducted to assess our safety management system and compliance with ICAO Annex 19.',
        np: 'यो सर्वेक्षण हाम्रो सुरक्षा व्यवस्थापन प्रणाली र ICAO Annex 19 को अनुपालनको मूल्याङ्कन गर्न सञ्चालन गरिँदैछ।'
    };
    return defaultPurpose[lang] || defaultPurpose['en'];
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Survey Page Loaded');

    // Get URL params
    const urlParams = new URLSearchParams(window.location.search);
    tenantId = urlParams.get('tenant') || 'default';
    const sessionParam = parseInt(urlParams.get('session')) || 1;

    // Check authentication
    userData = JSON.parse(localStorage.getItem('sms_user_data') || '{}');

    if (!userData.email) {
        window.location.href = '../login.html';
        return;
    }

    // Set airline name and language
    airlineName = userData.airline || userData.displayName || 'Aviation Organization';
    currentLang = urlParams.get('lang') || userData.language || 'en';

    // Update page title
    document.title = `Safety Management Survey - ${airlineName}`;
    document.getElementById('surveyTitle').textContent = 'Safety Management Survey';
    document.getElementById('airlineName').textContent = airlineName;

    // Update airline purpose using the function
    const purpose = getLocalizedPurpose(tenantId, currentLang);
    document.getElementById('purposeText').textContent = purpose;

    // Update language toggle
    updateLanguageToggle();

    // Generate questions
    generateQuestions();

    // ===== FIX: ALWAYS START AT QUESTION 1 FOR DEMO =====
    // Clear any saved progress for this tenant to start fresh
    localStorage.removeItem(`sms_${tenantId}_session_1_answers`);
    localStorage.removeItem(`sms_${tenantId}_session_1_completed`);
    
    // Always start fresh
    answers = new Array(QUESTIONS_PER_SESSION).fill(null);
    currentQuestion = 0;
    selectedValue = null;
    isAnswerSaved = false;

    // Render
    document.getElementById('sessionBadge').textContent = 'Demo Session';
    renderQuestion();
    updateProgress();
    updateNavButtons();
    updateAnsweredCount();
    updateTranslations();

    console.log('📝 Survey started at Question 1 for:', airlineName);
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
    updateLanguageToggle();
    updateTranslations();
    renderQuestion();
    
    // Update purpose when language changes
    const purpose = getLocalizedPurpose(tenantId, currentLang);
    document.getElementById('purposeText').textContent = purpose;
}

function updateTranslations() {
    const t = (key) => getTranslation(key, currentLang);
    
    // Update header
    document.getElementById('surveyTitle').textContent = t('survey_title') || 'Safety Management Survey';
    
    // Update progress label
    const progressLabel = document.querySelector('.progress-label span:first-child');
    if (progressLabel) progressLabel.textContent = t('progress_label') || 'Survey Progress';
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.innerHTML = `<i class="fas fa-arrow-left"></i> ${t('previous') || 'Previous'}`;
    }
    
    if (nextBtn && currentQuestion < QUESTIONS_PER_SESSION - 1) {
        nextBtn.innerHTML = `${t('next') || 'Next'} <i class="fas fa-arrow-right"></i>`;
    } else if (nextBtn) {
        nextBtn.innerHTML = `<i class="fas fa-check"></i> ${t('complete_survey') || 'Complete Survey'}`;
    }
    
    // Update exit button
    const exitBtn = document.querySelector('.exit-btn');
    if (exitBtn) {
        const exitSpan = exitBtn.querySelector('span');
        if (exitSpan) exitSpan.textContent = t('exit') || 'Exit';
    }
    
    // Update answered count
    updateAnsweredCount();
}

// ============================================================
// QUESTION GENERATION
// ============================================================
function generateQuestions() {
    questions = [];
    for (let i = 0; i < QUESTIONS_PER_SESSION; i++) {
        const elementIndex = Math.floor(i / QUESTIONS_PER_ELEMENT);
        const elementNum = elementIndex + 1;

        const questionTexts = [
            `How would you rate your organization's implementation of ${getElementName(elementNum)}?`,
            `How effective is your organization's approach to ${getElementName(elementNum)}?`,
            `How well does your organization manage ${getElementName(elementNum)}?`,
            `What is your assessment of your organization's ${getElementName(elementNum)}?`,
            `How confident are you in your organization's ${getElementName(elementNum)}?`
        ];

        const textIndex = (i % questionTexts.length);

        questions.push({
            id: i + 1,
            element: elementNum,
            elementName: getElementName(elementNum),
            text: questionTexts[textIndex],
            options: [
                { value: 1, label: 'Very Poor' },
                { value: 2, label: 'Poor' },
                { value: 3, label: 'Fair' },
                { value: 4, label: 'Good' },
                { value: 5, label: 'Excellent' }
            ]
        });
    }
}

// ============================================================
// RENDER QUESTION
// ============================================================
function renderQuestion() {
    const q = questions[currentQuestion];
    const area = document.getElementById('questionArea');
    const currentAnswer = selectedValue;

    const t = (key) => getTranslation(key, currentLang);

    area.innerHTML = `
        <div class="question-card">
            <div class="question-number">
                <i class="fas fa-question-circle"></i> 
                ${t('question') || 'Question'} ${currentQuestion + 1} ${t('of') || 'of'} ${QUESTIONS_PER_SESSION}
            </div>
            <div class="element-tag">
                <i class="fas fa-tag"></i> ${t('sms_element') || 'SMS Element'} ${q.element}: ${q.elementName}
            </div>
            <div class="question-text">${q.text}</div>
            <div class="options" id="optionsContainer">
                ${q.options.map(opt => `
                    <div class="option ${currentAnswer === opt.value ? 'selected' : ''}" 
                         data-value="${opt.value}"
                         onclick="selectOption(${opt.value})">
                        <div class="radio"></div>
                        <span class="label">${t(opt.label.toLowerCase().replace(' ', '_')) || opt.label}</span>
                    </div>
                `).join('')}
            </div>
            <div class="selection-pending ${!isAnswerSaved && selectedValue !== null ? 'show' : ''}" id="pendingIndicator">
                <i class="fas fa-info-circle"></i>
                <span>${t('selection_pending') || 'Selection pending. Click "Next" to save your answer.'}</span>
            </div>
            <div class="selection-feedback ${isAnswerSaved ? 'show success' : ''}" id="feedback">
                <i class="fas fa-check-circle"></i>
                <span>${isAnswerSaved ? (t('answer_saved') || 'Answer saved!') : ''}</span>
            </div>
        </div>
    `;

    // Update button text
    updateTranslations();
    updateNavButtons();
    updateAnsweredCount();
}

// ============================================================
// OPTION SELECTION
// ============================================================
function selectOption(value) {
    console.log('🔘 Option selected (temporary):', value);

    selectedValue = value;
    isAnswerSaved = false;

    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        const optValue = parseInt(opt.dataset.value);
        if (optValue === value) {
            opt.classList.add('selected');
            const radio = opt.querySelector('.radio');
            if (radio) {
                radio.textContent = '✓';
                radio.style.background = '#e8a838';
                radio.style.borderColor = '#e8a838';
            }
        } else {
            opt.classList.remove('selected');
            const radio = opt.querySelector('.radio');
            if (radio) {
                radio.textContent = '';
                radio.style.background = '';
                radio.style.borderColor = '';
            }
        }
    });

    const pending = document.getElementById('pendingIndicator');
    if (pending) {
        pending.classList.add('show');
        const t = (key) => getTranslation(key, currentLang);
        pending.innerHTML = `<i class="fas fa-info-circle"></i> <span>${t('selection_pending') || 'Selection pending. Click "Next" to save your answer.'}</span>`;
    }

    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.classList.remove('show');
        feedback.className = 'selection-feedback';
        feedback.innerHTML = '';
    }

    updateNavButtons();
}

// ============================================================
// SAVE ANSWER
// ============================================================
function saveCurrentAnswer() {
    if (selectedValue === null || selectedValue === undefined) {
        return false;
    }

    answers[currentQuestion] = selectedValue;
    isAnswerSaved = true;

    localStorage.setItem(`sms_${tenantId}_session_1_answers`, JSON.stringify(answers));

    const feedback = document.getElementById('feedback');
    if (feedback) {
        const t = (key) => getTranslation(key, currentLang);
        feedback.className = 'selection-feedback show success';
        feedback.innerHTML = `<i class="fas fa-check-circle"></i> <span>${t('answer_saved') || 'Answer saved!'}</span>`;
    }

    const pending = document.getElementById('pendingIndicator');
    if (pending) {
        pending.classList.remove('show');
    }

    console.log('✅ Answer saved:', selectedValue);

    updateProgress();
    updateAnsweredCount();
    updateNavButtons();

    return true;
}

// ============================================================
// NAVIGATION
// ============================================================
function nextQuestion() {
    if (selectedValue === null || selectedValue === undefined) {
        const t = (key) => getTranslation(key, currentLang);
        alert(t('select_option') || 'Please select an answer before proceeding.');
        return;
    }

    saveCurrentAnswer();

    if (currentQuestion < QUESTIONS_PER_SESSION - 1) {
        currentQuestion++;
        selectedValue = answers[currentQuestion] || null;
        isAnswerSaved = answers[currentQuestion] !== null && answers[currentQuestion] !== undefined;
        renderQuestion();
        updateProgress();
        updateNavButtons();
        updateAnsweredCount();
        document.querySelector('.question-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        completeSurvey();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        if (!isAnswerSaved && selectedValue !== null) {
            selectedValue = answers[currentQuestion] || null;
            isAnswerSaved = answers[currentQuestion] !== null && answers[currentQuestion] !== undefined;
        }

        currentQuestion--;
        selectedValue = answers[currentQuestion] || null;
        isAnswerSaved = answers[currentQuestion] !== null && answers[currentQuestion] !== undefined;
        renderQuestion();
        updateProgress();
        updateNavButtons();
        updateAnsweredCount();
        document.querySelector('.question-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateNavButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = selectedValue === null || selectedValue === undefined;
}

function updateProgress() {
    const answered = answers.filter(a => a !== null && a !== undefined).length;
    const progress = Math.round((answered / QUESTIONS_PER_SESSION) * 100);

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('percentText').textContent = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${QUESTIONS_PER_SESSION}`;
}

function updateAnsweredCount() {
    const answered = answers.filter(a => a !== null && a !== undefined).length;
    const t = (key) => getTranslation(key, currentLang);
    document.getElementById('answeredCount').textContent = `${answered} ${t('of') || 'of'} ${QUESTIONS_PER_SESSION} ${t('answered') || 'answered'}`;
}

// ============================================================
// COMPLETE SURVEY
// ============================================================
function completeSurvey() {
    if (selectedValue !== null && !isAnswerSaved) {
        saveCurrentAnswer();
    }

    const unanswered = answers.filter(a => a === null || a === undefined);
    if (unanswered.length > 0) {
        const t = (key) => getTranslation(key, currentLang);
        alert(`${t('please_answer_all') || 'Please answer all questions before completing the survey.'} (${unanswered.length} ${t('remaining') || 'remaining'})`);
        const firstUnanswered = answers.findIndex(a => a === null || a === undefined);
        if (firstUnanswered !== -1) {
            currentQuestion = firstUnanswered;
            selectedValue = answers[currentQuestion] || null;
            isAnswerSaved = answers[currentQuestion] !== null && answers[currentQuestion] !== undefined;
            renderQuestion();
            updateProgress();
            updateNavButtons();
            updateAnsweredCount();
            document.querySelector('.question-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
    }

    // Mark as completed
    localStorage.setItem(`sms_${tenantId}_session_1_completed`, 'true');
    localStorage.setItem(`sms_${tenantId}_completed_sessions`, '5');
    localStorage.setItem(`sms_${tenantId}_last_completion_date`, new Date().toISOString());

    console.log('✅ Survey completed for:', tenantId);

    // Redirect to Thank You page
    window.location.href = `../thankyou.html?tenant=${tenantId}&lang=${currentLang}`;
}

// ============================================================
// EXIT SURVEY
// ============================================================
function exitSurvey() {
    const answeredCount = answers.filter(a => a !== null && a !== undefined).length;
    const totalQuestions = QUESTIONS_PER_SESSION;
    const t = (key) => getTranslation(key, currentLang);
    let message = '';

    if (answeredCount === 0) {
        message = t('exit_no_answers') || 'You haven\'t answered any questions yet. Your progress will not be saved.\n\nAre you sure you want to exit?';
    } else if (answeredCount === totalQuestions) {
        message = t('exit_all_answered') || 'You have completed all ' + totalQuestions + ' questions. Your responses are saved.\n\nAre you sure you want to exit?';
    } else {
        message = t('exit_partial') || 'You have answered ' + answeredCount + ' of ' + totalQuestions + ' questions. Your progress has been saved.\n\nYou can continue later. Are you sure you want to exit?';
    }

    if (confirm(message)) {
        window.location.href = `../thankyou.html?tenant=${tenantId}&lang=${currentLang}`;
    }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
        nextQuestion();
    }
    if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
        prevQuestion();
    }
    if (e.key >= '1' && e.key <= '5') {
        const options = document.querySelectorAll('.option');
        const index = parseInt(e.key) - 1;
        if (options[index]) {
            options[index].click();
        }
    }
    if (e.key === 'Escape') {
        exitSurvey();
    }
    if (e.key === 'Enter' && !document.getElementById('nextBtn').disabled) {
        nextQuestion();
    }
});

// ============================================================
// EXPOSE FOR TESTING
// ============================================================
window.__survey = {
    currentQuestion,
    answers,
    selectedValue,
    isAnswerSaved,
    tenantId,
    airlineName,
    currentLang,
    QUESTIONS_PER_SESSION,
    questions,
    renderQuestion,
    selectOption,
    saveCurrentAnswer,
    nextQuestion,
    prevQuestion,
    completeSurvey,
    exitSurvey,
    toggleLanguage,
    getLocalizedPurpose
};

console.log('📝 Survey ready - starting at Question 1');
console.log(`✈️ Airline: ${airlineName}`);
console.log(`📊 ${answers.filter(a => a !== null).length} of ${QUESTIONS_PER_SESSION} answered`);
console.log('💡 Select an option → Click "Next" to save');