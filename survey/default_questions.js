/**
 * ============================================================================
 * FILE: survey/default_questions.js
 * VERSION: 2.0.0
 * DATE: 2026-06-15
 * PURPOSE: ICAO Annex 19 compliant survey questions (24+3 demographic)
 * FRAMEWORK: ICAO Annex 19, Doc 9859 (4th Edition)
 * ============================================================================
 * CHANGELOG:
 * 2.0.0 (2026-06-15) - Added demographic questions, aligned with Supabase schema
 * 1.0.0 (2026-05-01) - Initial 24 ICAO questions
 * ============================================================================
 * QUESTION DISTRIBUTION:
 * - Demographics: 3 questions (department, role, experience)
 * - Pillar 1 (Safety Policy): 5 questions (q1_aware, q2, q3, q4, q5_spi)
 * - Pillar 2 (Risk Management): 8 questions (q6-q13_action_inform)
 * - Pillar 3 (Safety Assurance): 7 questions (q14-q20_corrective)
 * - Pillar 4 (Safety Promotion): 4 questions (q21-q24_comments)
 * TOTAL: 27 questions
 * ============================================================================
 */

const DEFAULT_QUESTIONS = [
    // ============================================================
    // DEMOGRAPHIC QUESTIONS (3)
    // ============================================================
    {
        id: 'department',
        category: 'demographic',
        type: 'select',
        required: true,
        question_en: 'Which department do you work in?',
        question_np: 'तपाईं कुन विभागमा काम गर्नुहुन्छ?',
        options: [
            { value: 'Flight Operations', label_en: 'Flight Operations', label_np: 'उडान सञ्चालन' },
            { value: 'Maintenance & Engineering', label_en: 'Maintenance & Engineering', label_np: 'मर्मत र ईन्जिनियरिङ्' },
            { value: 'Ground Operations', label_en: 'Ground Operations', label_np: 'ग्राउन्ड सञ्चालन' },
            { value: 'Administration & Finance', label_en: 'Administration & Finance', label_np: 'प्रशासन र वित्त' },
            { value: 'Corporate Safety', label_en: 'Corporate Safety', label_np: 'कर्पोरेट सुरक्षा' }
        ]
    },
    {
        id: 'employee_category',
        category: 'demographic',
        type: 'select',
        required: true,
        question_en: 'What is your role?',
        question_np: 'तपाईंको भूमिका के हो?',
        options: [
            { value: 'Flight Crew (Pilot/Co-pilot)', label_en: 'Flight Crew (Pilot/Co-pilot)', label_np: 'उडान चालक दल (पाइलट/सह-पाइलट)' },
            { value: 'Licensed Engineer / Technician', label_en: 'Licensed Engineer / Technician', label_np: 'लाइसेन्स प्राप्त ईन्जिनियर / प्राविधिक' },
            { value: 'Ground Staff / Handling', label_en: 'Ground Staff / Handling', label_np: 'ग्राउन्ड स्टाफ / ह्यान्डलिङ' },
            { value: 'Manager / Head of Department', label_en: 'Manager / Head of Department', label_np: 'प्रबन्धक / विभाग प्रमुख' },
            { value: 'Flight Dispatcher', label_en: 'Flight Dispatcher', label_np: 'उडान डिस्प्याचर' }
        ]
    },
    {
        id: 'years_experience',
        category: 'demographic',
        type: 'select',
        required: true,
        question_en: 'Years of experience in aviation?',
        question_np: 'उड्डयनमा अनुभवको वर्ष?',
        options: [
            { value: '<1', label_en: 'Less than 1 year', label_np: '१ वर्ष भन्दा कम' },
            { value: '1-3', label_en: '1-3 years', label_np: '१-३ वर्ष' },
            { value: '3-5', label_en: '3-5 years', label_np: '३-५ वर्ष' },
            { value: '5+', label_en: '5+ years', label_np: '५+ वर्ष' }
        ]
    },

    // ============================================================
    // PILLAR 1: SAFETY POLICY & OBJECTIVES (5 questions)
    // Elements: 1.1 Management Commitment, 1.2 Accountabilities, 
    //          1.3 Key Personnel, 1.4 Emergency Response, 1.5 Documentation
    // ============================================================
    {
        id: 'q1_aware',
        category: 'safety_policy',
        type: 'boolean',
        required: true,
        question_en: 'I am aware of my organisation\'s Safety Policy Statement.',
        question_np: 'म मेरो संस्थाको सुरक्षा नीति वक्तव्यको बारेमा सचेत छु।',
        options: [
            { value: 'True', label_en: 'Yes, I am aware', label_np: 'हो, म सचेत छु' },
            { value: 'False', label_en: 'No, I am not aware', label_np: 'होइन, म सचेत छैन' }
        ]
    },
    {
        id: 'q2',
        category: 'safety_policy',
        type: 'likert',
        required: true,
        question_en: 'Employees at all levels are regularly informed and reminded about the Safety Policy Statement.',
        question_np: 'सबै स्तरका कर्मचारीहरूलाई सुरक्षा नीति वक्तव्यको बारेमा नियमित रूपमा सूचित र सम्झाइन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q3',
        category: 'safety_policy',
        type: 'likert',
        required: true,
        question_en: 'The Safety Policy Statement clearly demonstrates the organisation\'s commitment to safety.',
        question_np: 'सुरक्षा नीति वक्तव्यले सुरक्षाप्रति संस्थाको प्रतिबद्धता स्पष्ट रूपमा देखाउँछ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q4',
        category: 'safety_policy',
        type: 'likert',
        required: true,
        question_en: 'The Safety Policy Statement is applicable and relevant to all employees, regardless of their role or level.',
        question_np: 'सुरक्षा नीति वक्तव्य सबै कर्मचारीहरूको लागि लागू र सान्दर्भिक छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q5_spi',
        category: 'safety_policy',
        type: 'likert',
        required: true,
        question_en: 'I am aware of our organisation\'s safety performance targets and how we are tracking against them.',
        question_np: 'म हाम्रो संस्थाको सुरक्षा कार्यसम्पादन लक्ष्यहरू र तिनको प्रगतिको बारेमा सचेत छु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },

    // ============================================================
    // PILLAR 2: SAFETY RISK MANAGEMENT (8 questions)
    // Elements: 2.1 Hazard Identification, 2.2 Risk Assessment & Mitigation
    // ============================================================
    {
        id: 'q6',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'I believe that our organisation has an effective hazard reporting process.',
        question_np: 'मलाई विश्वास छ कि हाम्रो संस्थाको प्रभावकारी जोखिम रिपोर्टिङ प्रक्रिया छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q7',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'I feel comfortable reporting safety concerns through our hazard reporting process.',
        question_np: 'म रिपोर्टिङ प्रक्रिया मार्फत सुरक्षा चिन्ताहरू रिपोर्ट गर्न सहज महसुस गर्छु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q8',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'Our hazard reporting process is easy to use.',
        question_np: 'हाम्रो जोखिम रिपोर्टिङ प्रक्रिया प्रयोग गर्न सजिलो छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q9',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'When I report a hazard, I receive confirmation that it has been received.',
        question_np: 'जब म जोखिम रिपोर्ट गर्छु, मलाई यो प्राप्त भएको पुष्टि प्राप्त हुन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q10',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'I have received training on how to identify and report hazards.',
        question_np: 'जोखिम पहिचान र रिपोर्ट कसरी गर्ने भन्ने बारे मैले तालिम पाएको छु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q11',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'Our organisation has a formal process for assessing risks identified through reporting.',
        question_np: 'हाम्रो संस्थासँग रिपोर्टिङ मार्फत पहिचान गरिएका जोखिमहरूको मूल्याङ्कन गर्ने औपचारिक प्रक्रिया छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q12_risk_assess',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'Risk assessments are conducted before implementing significant operational changes.',
        question_np: 'महत्त्वपूर्ण परिचालन परिवर्तनहरू लागू गर्नु अघि जोखिम मूल्याङ्कन गरिन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q13_action_inform',
        category: 'safety_risk_mgmt',
        type: 'likert',
        required: true,
        question_en: 'I am informed about actions taken after I report a safety concern.',
        question_np: 'म सुरक्षा चिन्ता रिपोर्ट गरेपछि लिइएका कार्यहरूको बारेमा जानकारी पाउँछु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },

    // ============================================================
    // PILLAR 3: SAFETY ASSURANCE (7 questions)
    // Elements: 3.1 Performance Monitoring, 3.2 Management of Change, 
    //          3.3 Continuous Improvement
    // ============================================================
    {
        id: 'q14',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Our organisation regularly monitors safety performance through audits and inspections.',
        question_np: 'हाम्रो संस्थाले नियमित रूपमा लेखापरीक्षण र निरीक्षण मार्फत सुरक्षा कार्यसम्पादनको निगरानी गर्दछ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q15',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Safety performance data is used to identify trends and areas for improvement.',
        question_np: 'सुरक्षा कार्यसम्पादन डाटा प्रवृत्तिहरू र सुधारका क्षेत्रहरू पहिचान गर्न प्रयोग गरिन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q16',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Our organisation has a formal process for managing safety risks during organizational changes.',
        question_np: 'हाम्रो संगठनसँग संगठनात्मक परिवर्तनहरूको समयमा सुरक्षा जोखिमहरू व्यवस्थापन गर्न औपचारिक प्रक्रिया छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q17',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Safety recommendations from audits are tracked and implemented.',
        question_np: 'लेखापरीक्षणबाट प्राप्त सुरक्षा सिफारिसहरू ट्र्याक र कार्यान्वयन गरिन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q18',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Our organisation learns from incidents and shares lessons across departments.',
        question_np: 'हाम्रो संस्था घटनाहरूबाट सिक्छ र पाठ विभागहरूमा साझा गर्दछ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q19',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'I have seen safety improvements resulting from previous survey feedback.',
        question_np: 'मैले अघिल्लो सर्वेक्षण प्रतिक्रियाबाट सुरक्षा सुधारहरू देखेको छु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q20_corrective',
        category: 'safety_assurance',
        type: 'likert',
        required: true,
        question_en: 'Corrective actions from safety investigations are completed in a timely manner.',
        question_np: 'सुरक्षा अनुसन्धानबाट सुधारात्मक कार्यहरू समयमै पूरा हुन्छन्।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },

    // ============================================================
    // PILLAR 4: SAFETY PROMOTION (4 questions)
    // Elements: 4.1 Training & Education, 4.2 Communication
    // ============================================================
    {
        id: 'q21',
        category: 'safety_promotion',
        type: 'likert',
        required: true,
        question_en: 'I have received adequate safety training for my role.',
        question_np: 'मैले मेरो भूमिकाको लागि पर्याप्त सुरक्षा तालिम पाएको छु।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q22',
        category: 'safety_promotion',
        type: 'likert',
        required: true,
        question_en: 'Safety training is updated regularly to address new hazards.',
        question_np: 'सुरक्षा तालिम नयाँ जोखिमहरू सम्बोधन गर्न नियमित रूपमा अद्यावधिक गरिन्छ।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q23_peer',
        category: 'safety_promotion',
        type: 'likert',
        required: true,
        question_en: 'My colleagues take safety seriously in their day-to-day work.',
        question_np: 'मेरा सहकर्मीहरूले उनीहरूको दैनिक कार्यमा सुरक्षालाई गम्भीरतापूर्वक लिन्छन्।',
        options: [
            { value: '1', label_en: 'Strongly Disagree', label_np: 'पूर्ण रूपमा असहमत' },
            { value: '2', label_en: 'Disagree', label_np: 'असहमत' },
            { value: '3', label_en: 'Neutral', label_np: 'तटस्थ' },
            { value: '4', label_en: 'Agree', label_np: 'सहमत' },
            { value: '5', label_en: 'Strongly Agree', label_np: 'पूर्ण रूपमा सहमत' }
        ]
    },
    {
        id: 'q24_comments',
        category: 'safety_promotion',
        type: 'free_text',
        required: false,
        question_en: 'Please share any additional comments, suggestions, or concerns regarding safety in our organisation.',
        question_np: 'कृपया हाम्रो संस्थामा सुरक्षाको बारेमा कुनै अतिरिक्त टिप्पणी, सुझाव वा चिन्ता साझा गर्नुहोस्।'
    }
];