/*
================================================================================
FILE: SurveySMS/js/questions/question-bank.js
VERSION: 1.0
REVISION DATE: 2026-06-17
PURPOSE: Complete ICAO Annex 19 SMS Question Bank (50+ questions in EN & NP)
AFFECTED: Survey page, Analytics, Gap Analysis
================================================================================
*/

const QUESTION_BANK = {
    // ============================================================
    // ELEMENT 1: Safety Policy & Objectives (4 questions)
    // ============================================================
    element1: {
        id: 1,
        name: {
            en: 'Safety Policy & Objectives',
            np: 'सुरक्षा नीति र उद्देश्यहरू'
        },
        pillar: 'Policy',
        questions: [
            {
                id: 'q1_1',
                text: {
                    en: 'Does your organization have a documented safety policy that is endorsed by senior management?',
                    np: 'के तपाईंको संस्थासँग वरिष्ठ व्यवस्थापनद्वारा समर्थित दस्तावेजीकृत सुरक्षा नीति छ?'
                },
                options: [
                    { value: 1, label: { en: 'No, we don\'t have a safety policy', np: 'हामीसँग सुरक्षा नीति छैन' } },
                    { value: 2, label: { en: 'We have a policy but it\'s outdated', np: 'हामीसँग नीति छ तर पुरानो छ' } },
                    { value: 3, label: { en: 'We have a documented policy but it\'s not widely communicated', np: 'हामीसँग दस्तावेजीकृत नीति छ तर व्यापक रूपमा सञ्चार गरिएको छैन' } },
                    { value: 4, label: { en: 'We have a documented and communicated policy', np: 'हामीसँग दस्तावेजीकृत र सञ्चार गरिएको नीति छ' } },
                    { value: 5, label: { en: 'We have a comprehensive policy that is regularly reviewed', np: 'हामीसँग नियमित रूपमा समीक्षा गरिने व्यापक नीति छ' } }
                ]
            },
            {
                id: 'q1_2',
                text: {
                    en: 'How clearly are safety objectives defined and communicated throughout your organization?',
                    np: 'तपाईंको संस्थामा सुरक्षा उद्देश्यहरू कति स्पष्ट रूपमा परिभाषित र सञ्चार गरिएका छन्?'
                },
                options: [
                    { value: 1, label: { en: 'Not defined at all', np: 'परिभाषित छैन' } },
                    { value: 2, label: { en: 'Vaguely defined, not communicated', np: 'अस्पष्ट रूपमा परिभाषित, सञ्चार छैन' } },
                    { value: 3, label: { en: 'Defined but poorly communicated', np: 'परिभाषित तर कमजोर सञ्चार' } },
                    { value: 4, label: { en: 'Clearly defined and communicated to most staff', np: 'स्पष्ट रूपमा परिभाषित र अधिकांश कर्मचारीमा सञ्चार' } },
                    { value: 5, label: { en: 'Clearly defined, communicated, and understood by all staff', np: 'स्पष्ट रूपमा परिभाषित, सञ्चार र सबै कर्मचारीले बुझेका' } }
                ]
            },
            {
                id: 'q1_3',
                text: {
                    en: 'Is there a clear commitment from senior management to safety demonstrated through resource allocation?',
                    np: 'के स्रोत विनियोजन मार्फत वरिष्ठ व्यवस्थापनको सुरक्षाप्रति स्पष्ट प्रतिबद्धता छ?'
                },
                options: [
                    { value: 1, label: { en: 'No commitment or resources', np: 'कुनै प्रतिबद्धता वा स्रोत छैन' } },
                    { value: 2, label: { en: 'Minimal commitment, inadequate resources', np: 'न्यूनतम प्रतिबद्धता, अपर्याप्त स्रोत' } },
                    { value: 3, label: { en: 'Some commitment, limited resources', np: 'केही प्रतिबद्धता, सीमित स्रोत' } },
                    { value: 4, label: { en: 'Clear commitment with adequate resources', np: 'पर्याप्त स्रोतको साथ स्पष्ट प्रतिबद्धता' } },
                    { value: 5, label: { en: 'Strong commitment with dedicated resources', np: 'समर्पित स्रोतको साथ बलियो प्रतिबद्धता' } }
                ]
            },
            {
                id: 'q1_4',
                text: {
                    en: 'How often is the safety policy reviewed and updated?',
                    np: 'सुरक्षा नीति कति पटक समीक्षा र अद्यावधिक गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never reviewed', np: 'कहिल्यै समीक्षा गरिएको छैन' } },
                    { value: 2, label: { en: 'Rarely (every 2+ years)', np: 'विरलै (२+ वर्षमा)' } },
                    { value: 3, label: { en: 'Occasionally (annually)', np: 'कहिलेकाहीँ (वार्षिक)' } },
                    { value: 4, label: { en: 'Regularly (semi-annually)', np: 'नियमित (अर्ध-वार्षिक)' } },
                    { value: 5, label: { en: 'Continuously reviewed and improved', np: 'निरन्तर समीक्षा र सुधार' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 2: Safety Accountabilities (4 questions)
    // ============================================================
    element2: {
        id: 2,
        name: {
            en: 'Safety Accountabilities',
            np: 'सुरक्षा जवाफदेहिताहरू'
        },
        pillar: 'Policy',
        questions: [
            {
                id: 'q2_1',
                text: {
                    en: 'Are safety accountabilities clearly defined for all levels of management and staff?',
                    np: 'के व्यवस्थापन र कर्मचारीका सबै तहहरूका लागि सुरक्षा जवाफदेहिताहरू स्पष्ट रूपमा परिभाषित छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No accountabilities defined', np: 'कुनै जवाफदेहिता परिभाषित छैन' } },
                    { value: 2, label: { en: 'Vaguely defined for senior management only', np: 'केवल वरिष्ठ व्यवस्थापनको लागि अस्पष्ट रूपमा परिभाषित' } },
                    { value: 3, label: { en: 'Defined for management but not all staff', np: 'व्यवस्थापनको लागि परिभाषित तर सबै कर्मचारीको लागि होइन' } },
                    { value: 4, label: { en: 'Clearly defined for all levels', np: 'सबै तहहरूको लागि स्पष्ट रूपमा परिभाषित' } },
                    { value: 5, label: { en: 'Comprehensive accountabilities with performance metrics', np: 'प्रदर्शन मेट्रिक्सको साथ व्यापक जवाफदेहिता' } }
                ]
            },
            {
                id: 'q2_2',
                text: {
                    en: 'How well do employees understand their safety responsibilities?',
                    np: 'कर्मचारीहरूले आफ्नो सुरक्षा जिम्मेवारीहरू कति राम्ररी बुझ्छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No understanding', np: 'कुनै बुझाइ छैन' } },
                    { value: 2, label: { en: 'Limited understanding', np: 'सीमित बुझाइ' } },
                    { value: 3, label: { en: 'Basic understanding', np: 'आधारभूत बुझाइ' } },
                    { value: 4, label: { en: 'Good understanding', np: 'राम्रो बुझाइ' } },
                    { value: 5, label: { en: 'Excellent understanding and ownership', np: 'उत्कृष्ट बुझाइ र स्वामित्व' } }
                ]
            },
            {
                id: 'q2_3',
                text: {
                    en: 'Is there a designated safety manager or department with clear authority?',
                    np: 'के स्पष्ट अधिकारको साथ नामित सुरक्षा प्रबन्धक वा विभाग छ?'
                },
                options: [
                    { value: 1, label: { en: 'No dedicated safety function', np: 'कुनै समर्पित सुरक्षा कार्य छैन' } },
                    { value: 2, label: { en: 'Part-time safety role with limited authority', np: 'सीमित अधिकारको साथ अंशकालिक सुरक्षा भूमिका' } },
                    { value: 3, label: { en: 'Designated safety manager with some authority', np: 'केही अधिकारको साथ नामित सुरक्षा प्रबन्धक' } },
                    { value: 4, label: { en: 'Full-time safety department with clear authority', np: 'स्पष्ट अधिकारको साथ पूर्ण-समय सुरक्षा विभाग' } },
                    { value: 5, label: { en: 'Well-resourced safety department with executive authority', np: 'कार्यकारी अधिकारको साथ राम्रो स्रोत सुरक्षा विभाग' } }
                ]
            },
            {
                id: 'q2_4',
                text: {
                    en: 'Are safety performance measures included in performance reviews and appraisals?',
                    np: 'के सुरक्षा प्रदर्शन मापदण्डहरू प्रदर्शन समीक्षा र मूल्याङ्कनमा समावेश छन्?'
                },
                options: [
                    { value: 1, label: { en: 'Not included at all', np: 'समावेश छैन' } },
                    { value: 2, label: { en: 'Informally mentioned', np: 'अनौपचारिक रूपमा उल्लेख गरिएको' } },
                    { value: 3, label: { en: 'Included for some positions', np: 'केही पदहरूको लागि समावेश' } },
                    { value: 4, label: { en: 'Included for all management positions', np: 'सबै व्यवस्थापन पदहरूको लागि समावेश' } },
                    { value: 5, label: { en: 'Included for all staff with measurable targets', np: 'मापन योग्य लक्ष्यहरूको साथ सबै कर्मचारीको लागि समावेश' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 3: Hazard Identification (4 questions)
    // ============================================================
    element3: {
        id: 3,
        name: {
            en: 'Hazard Identification',
            np: 'जोखिम पहिचान'
        },
        pillar: 'Risk Management',
        questions: [
            {
                id: 'q3_1',
                text: {
                    en: 'Does your organization have a systematic process for identifying hazards?',
                    np: 'के तपाईंको संस्थासँग जोखिम पहिचान गर्नको लागि व्यवस्थित प्रक्रिया छ?'
                },
                options: [
                    { value: 1, label: { en: 'No hazard identification process', np: 'कुनै जोखिम पहिचान प्रक्रिया छैन' } },
                    { value: 2, label: { en: 'Informal, ad-hoc process', np: 'अनौपचारिक, तत्काल प्रक्रिया' } },
                    { value: 3, label: { en: 'Basic process with limited coverage', np: 'सीमित कभरेजको साथ आधारभूत प्रक्रिया' } },
                    { value: 4, label: { en: 'Systematic process covering most operations', np: 'अधिकांश सञ्चालनहरू कभर गर्ने व्यवस्थित प्रक्रिया' } },
                    { value: 5, label: { en: 'Comprehensive, proactive hazard identification program', np: 'व्यापक, सक्रिय जोखिम पहिचान कार्यक्रम' } }
                ]
            },
            {
                id: 'q3_2',
                text: {
                    en: 'How frequently are hazard identification activities conducted?',
                    np: 'जोखिम पहिचान गतिविधिहरू कति पटक सञ्चालन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never', np: 'कहिल्यै' } },
                    { value: 2, label: { en: 'Rarely (yearly or less)', np: 'विरलै (वार्षिक वा कम)' } },
                    { value: 3, label: { en: 'Occasionally (quarterly)', np: 'कहिलेकाहीँ (त्रैमासिक)' } },
                    { value: 4, label: { en: 'Regularly (monthly)', np: 'नियमित (मासिक)' } },
                    { value: 5, label: { en: 'Continuously (real-time)', np: 'निरन्तर (वास्तविक-समय)' } }
                ]
            },
            {
                id: 'q3_3',
                text: {
                    en: 'Are employees encouraged and trained to identify and report hazards?',
                    np: 'के कर्मचारीहरूलाई जोखिम पहिचान र रिपोर्ट गर्न प्रोत्साहित र तालिम दिइन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No encouragement or training', np: 'कुनै प्रोत्साहन वा तालिम छैन' } },
                    { value: 2, label: { en: 'Minimal encouragement, no training', np: 'न्यूनतम प्रोत्साहन, कुनै तालिम छैन' } },
                    { value: 3, label: { en: 'Some encouragement and basic training', np: 'केही प्रोत्साहन र आधारभूत तालिम' } },
                    { value: 4, label: { en: 'Active encouragement with regular training', np: 'नियमित तालिमको साथ सक्रिय प्रोत्साहन' } },
                    { value: 5, label: { en: 'Strong encouragement with comprehensive training', np: 'व्यापक तालिमको साथ बलियो प्रोत्साहन' } }
                ]
            },
            {
                id: 'q3_4',
                text: {
                    en: 'Is there a formal hazard reporting system in place?',
                    np: 'के त्यहाँ औपचारिक जोखिम रिपोर्टिङ प्रणाली छ?'
                },
                options: [
                    { value: 1, label: { en: 'No reporting system', np: 'कुनै रिपोर्टिङ प्रणाली छैन' } },
                    { value: 2, label: { en: 'Informal reporting only', np: 'केवल अनौपचारिक रिपोर्टिङ' } },
                    { value: 3, label: { en: 'Basic reporting system', np: 'आधारभूत रिपोर्टिङ प्रणाली' } },
                    { value: 4, label: { en: 'Formal, accessible reporting system', np: 'औपचारिक, पहुँचयोग्य रिपोर्टिङ प्रणाली' } },
                    { value: 5, label: { en: 'Comprehensive reporting system with confidentiality', np: 'गोपनीयताको साथ व्यापक रिपोर्टिङ प्रणाली' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 4: Risk Assessment & Mitigation (4 questions)
    // ============================================================
    element4: {
        id: 4,
        name: {
            en: 'Risk Assessment & Mitigation',
            np: 'जोखिम मूल्याङ्कन र न्यूनीकरण'
        },
        pillar: 'Risk Management',
        questions: [
            {
                id: 'q4_1',
                text: {
                    en: 'Does your organization use a formal risk assessment methodology?',
                    np: 'के तपाईंको संस्थाले औपचारिक जोखिम मूल्याङ्कन पद्धति प्रयोग गर्दछ?'
                },
                options: [
                    { value: 1, label: { en: 'No formal methodology', np: 'कुनै औपचारिक पद्धति छैन' } },
                    { value: 2, label: { en: 'Basic, informal approach', np: 'आधारभूत, अनौपचारिक दृष्टिकोण' } },
                    { value: 3, label: { en: 'Standardized methodology', np: 'मानकीकृत पद्धति' } },
                    { value: 4, label: { en: 'Comprehensive methodology with tools', np: 'उपकरणहरूको साथ व्यापक पद्धति' } },
                    { value: 5, label: { en: 'Advanced methodology with automation', np: 'स्वचालनको साथ उन्नत पद्धति' } }
                ]
            },
            {
                id: 'q4_2',
                text: {
                    en: 'How well are risk mitigation strategies developed and implemented?',
                    np: 'जोखिम न्यूनीकरण रणनीतिहरू कति राम्ररी विकास र कार्यान्वयन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No mitigation strategies', np: 'कुनै न्यूनीकरण रणनीति छैन' } },
                    { value: 2, label: { en: 'Poorly developed strategies', np: 'कमजोर रूपमा विकसित रणनीतिहरू' } },
                    { value: 3, label: { en: 'Basic strategies with limited implementation', np: 'सीमित कार्यान्वयनको साथ आधारभूत रणनीतिहरू' } },
                    { value: 4, label: { en: 'Well-developed strategies with good implementation', np: 'राम्रो कार्यान्वयनको साथ राम्रो विकसित रणनीतिहरू' } },
                    { value: 5, label: { en: 'Comprehensive strategies with effective implementation', np: 'प्रभावकारी कार्यान्वयनको साथ व्यापक रणनीतिहरू' } }
                ]
            },
            {
                id: 'q4_3',
                text: {
                    en: 'Are risk assessments conducted for all operational changes?',
                    np: 'के सबै परिचालन परिवर्तनहरूको लागि जोखिम मूल्याङ्कन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never conducted', np: 'कहिल्यै गरिएन' } },
                    { value: 2, label: { en: 'Rarely conducted', np: 'विरलै गरिन्छ' } },
                    { value: 3, label: { en: 'Conducted for major changes only', np: 'केवल प्रमुख परिवर्तनहरूको लागि गरिन्छ' } },
                    { value: 4, label: { en: 'Conducted for most changes', np: 'धेरैजसो परिवर्तनहरूको लागि गरिन्छ' } },
                    { value: 5, label: { en: 'Conducted for all changes, big and small', np: 'सबै परिवर्तनहरूको लागि गरिन्छ, ठूला र साना' } }
                ]
            },
            {
                id: 'q4_4',
                text: {
                    en: 'How effective is the risk communication process?',
                    np: 'जोखिम सञ्चार प्रक्रिया कति प्रभावकारी छ?'
                },
                options: [
                    { value: 1, label: { en: 'No communication', np: 'कुनै सञ्चार छैन' } },
                    { value: 2, label: { en: 'Poor communication', np: 'कमजोर सञ्चार' } },
                    { value: 3, label: { en: 'Basic communication', np: 'आधारभूत सञ्चार' } },
                    { value: 4, label: { en: 'Good communication', np: 'राम्रो सञ्चार' } },
                    { value: 5, label: { en: 'Excellent communication with all stakeholders', np: 'सबै सरोकारवालाहरूसँग उत्कृष्ट सञ्चार' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 5: Safety Performance Monitoring (4 questions)
    // ============================================================
    element5: {
        id: 5,
        name: {
            en: 'Safety Performance Monitoring',
            np: 'सुरक्षा प्रदर्शन अनुगमन'
        },
        pillar: 'Assurance',
        questions: [
            {
                id: 'q5_1',
                text: {
                    en: 'Does your organization have established safety performance indicators?',
                    np: 'के तपाईंको संस्थासँग स्थापित सुरक्षा प्रदर्शन सूचकहरू छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No indicators defined', np: 'कुनै सूचक परिभाषित छैन' } },
                    { value: 2, label: { en: 'Basic reactive indicators only', np: 'केवल आधारभूत प्रतिक्रियात्मक सूचकहरू' } },
                    { value: 3, label: { en: 'Mix of reactive and proactive indicators', np: 'प्रतिक्रियात्मक र सक्रिय सूचकहरूको मिश्रण' } },
                    { value: 4, label: { en: 'Comprehensive performance indicators', np: 'व्यापक प्रदर्शन सूचकहरू' } },
                    { value: 5, label: { en: 'Advanced leading and lagging indicators', np: 'उन्नत अग्रणी र पछिल्ला सूचकहरू' } }
                ]
            },
            {
                id: 'q5_2',
                text: {
                    en: 'How frequently are safety performance reports generated?',
                    np: 'सुरक्षा प्रदर्शन रिपोर्टहरू कति पटक उत्पन्न गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never generated', np: 'कहिल्यै उत्पन्न गरिएको छैन' } },
                    { value: 2, label: { en: 'Annually or less', np: 'वार्षिक वा कम' } },
                    { value: 3, label: { en: 'Quarterly', np: 'त्रैमासिक' } },
                    { value: 4, label: { en: 'Monthly', np: 'मासिक' } },
                    { value: 5, label: { en: 'Weekly/Real-time', np: 'साप्ताहिक/वास्तविक-समय' } }
                ]
            },
            {
                id: 'q5_3',
                text: {
                    en: 'Are safety performance trends analyzed and acted upon?',
                    np: 'के सुरक्षा प्रदर्शन प्रवृत्तिहरूको विश्लेषण र कार्य गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Not analyzed', np: 'विश्लेषण गरिएको छैन' } },
                    { value: 2, label: { en: 'Minimal analysis', np: 'न्यूनतम विश्लेषण' } },
                    { value: 3, label: { en: 'Some analysis', np: 'केही विश्लेषण' } },
                    { value: 4, label: { en: 'Good analysis with action', np: 'कार्यको साथ राम्रो विश्लेषण' } },
                    { value: 5, label: { en: 'Advanced analysis with proactive action', np: 'सक्रिय कार्यको साथ उन्नत विश्लेषण' } }
                ]
            },
            {
                id: 'q5_4',
                text: {
                    en: 'Is safety performance data shared with all relevant stakeholders?',
                    np: 'के सुरक्षा प्रदर्शन डाटा सबै सान्दर्भिक सरोकारवालाहरूसँग साझा गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Not shared', np: 'साझा गरिएको छैन' } },
                    { value: 2, label: { en: 'Shared with management only', np: 'केवल व्यवस्थापनसँग साझा' } },
                    { value: 3, label: { en: 'Shared with some departments', np: 'केही विभागहरूसँग साझा' } },
                    { value: 4, label: { en: 'Shared widely', np: 'व्यापक रूपमा साझा' } },
                    { value: 5, label: { en: 'Transparently shared with all staff', np: 'सबै कर्मचारीहरूसँग पारदर्शी रूपमा साझा' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 6: Internal Safety Audits (4 questions)
    // ============================================================
    element6: {
        id: 6,
        name: {
            en: 'Internal Safety Audits',
            np: 'आन्तरिक सुरक्षा लेखापरीक्षण'
        },
        pillar: 'Assurance',
        questions: [
            {
                id: 'q6_1',
                text: {
                    en: 'Does your organization conduct regular internal safety audits?',
                    np: 'के तपाईंको संस्थाले नियमित आन्तरिक सुरक्षा लेखापरीक्षण गर्दछ?'
                },
                options: [
                    { value: 1, label: { en: 'No audits conducted', np: 'कुनै लेखापरीक्षण गरिएको छैन' } },
                    { value: 2, label: { en: 'Occasional informal audits', np: 'कहिलेकाहीँ अनौपचारिक लेखापरीक्षण' } },
                    { value: 3, label: { en: 'Regular scheduled audits', np: 'नियमित अनुसूचित लेखापरीक्षण' } },
                    { value: 4, label: { en: 'Comprehensive audit program', np: 'व्यापक लेखापरीक्षण कार्यक्रम' } },
                    { value: 5, label: { en: 'World-class audit system', np: 'विश्व-स्तरीय लेखापरीक्षण प्रणाली' } }
                ]
            },
            {
                id: 'q6_2',
                text: {
                    en: 'Are audit findings effectively tracked and closed out?',
                    np: 'के लेखापरीक्षण निष्कर्षहरू प्रभावकारी रूपमा ट्र्याक र बन्द गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Findings not tracked', np: 'निष्कर्षहरू ट्र्याक गरिएको छैन' } },
                    { value: 2, label: { en: 'Poor tracking', np: 'कमजोर ट्र्याकिङ' } },
                    { value: 3, label: { en: 'Basic tracking system', np: 'आधारभूत ट्र्याकिङ प्रणाली' } },
                    { value: 4, label: { en: 'Good tracking with follow-up', np: 'अनुगमनको साथ राम्रो ट्र्याकिङ' } },
                    { value: 5, label: { en: 'Comprehensive tracking with verification', np: 'प्रमाणीकरणको साथ व्यापक ट्र्याकिङ' } }
                ]
            },
            {
                id: 'q6_3',
                text: {
                    en: 'Are auditors properly trained and independent?',
                    np: 'के लेखापरीक्षकहरू उचित रूपमा तालिम प्राप्त र स्वतन्त्र छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No trained auditors', np: 'कुनै तालिमप्राप्त लेखापरीक्षक छैन' } },
                    { value: 2, label: { en: 'Minimal training', np: 'न्यूनतम तालिम' } },
                    { value: 3, label: { en: 'Adequately trained', np: 'पर्याप्त रूपमा तालिम प्राप्त' } },
                    { value: 4, label: { en: 'Well-trained and independent', np: 'राम्रो तालिम प्राप्त र स्वतन्त्र' } },
                    { value: 5, label: { en: 'Highly trained and fully independent', np: 'उच्च तालिम प्राप्त र पूर्ण रूपमा स्वतन्त्र' } }
                ]
            },
            {
                id: 'q6_4',
                text: {
                    en: 'How effective are corrective actions from audit findings?',
                    np: 'लेखापरीक्षण निष्कर्षहरूबाट सुधारात्मक कार्यहरू कति प्रभावकारी छन्?'
                },
                options: [
                    { value: 1, label: { en: 'Not effective', np: 'प्रभावकारी छैन' } },
                    { value: 2, label: { en: 'Minimally effective', np: 'न्यूनतम प्रभावकारी' } },
                    { value: 3, label: { en: 'Moderately effective', np: 'मध्यम प्रभावकारी' } },
                    { value: 4, label: { en: 'Highly effective', np: 'उच्च प्रभावकारी' } },
                    { value: 5, label: { en: 'Very effective with root cause analysis', np: 'मूल कारण विश्लेषणको साथ धेरै प्रभावकारी' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 7: Management of Change (4 questions)
    // ============================================================
    element7: {
        id: 7,
        name: {
            en: 'Management of Change',
            np: 'परिवर्तन व्यवस्थापन'
        },
        pillar: 'Assurance',
        questions: [
            {
                id: 'q7_1',
                text: {
                    en: 'Does your organization have a formal Management of Change (MOC) process?',
                    np: 'के तपाईंको संस्थासँग औपचारिक परिवर्तन व्यवस्थापन (MOC) प्रक्रिया छ?'
                },
                options: [
                    { value: 1, label: { en: 'No MOC process', np: 'कुनै MOC प्रक्रिया छैन' } },
                    { value: 2, label: { en: 'Informal process', np: 'अनौपचारिक प्रक्रिया' } },
                    { value: 3, label: { en: 'Basic MOC process', np: 'आधारभूत MOC प्रक्रिया' } },
                    { value: 4, label: { en: 'Comprehensive MOC process', np: 'व्यापक MOC प्रक्रिया' } },
                    { value: 5, label: { en: 'Advanced MOC with risk assessment', np: 'जोखिम मूल्याङ्कनको साथ उन्नत MOC' } }
                ]
            },
            {
                id: 'q7_2',
                text: {
                    en: 'Are safety impacts considered in all change management decisions?',
                    np: 'के सबै परिवर्तन व्यवस्थापन निर्णयहरूमा सुरक्षा प्रभावहरू विचार गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never considered', np: 'कहिल्यै विचार गरिएको छैन' } },
                    { value: 2, label: { en: 'Rarely considered', np: 'विरलै विचार गरिन्छ' } },
                    { value: 3, label: { en: 'Sometimes considered', np: 'कहिलेकाहीँ विचार गरिन्छ' } },
                    { value: 4, label: { en: 'Usually considered', np: 'सामान्यतया विचार गरिन्छ' } },
                    { value: 5, label: { en: 'Always considered and documented', np: 'सधैं विचार र दस्तावेजीकरण गरिन्छ' } }
                ]
            },
            {
                id: 'q7_3',
                text: {
                    en: 'How well is the MOC process communicated to all affected parties?',
                    np: 'MOC प्रक्रिया सबै प्रभावित पक्षहरूलाई कति राम्ररी सञ्चार गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No communication', np: 'कुनै सञ्चार छैन' } },
                    { value: 2, label: { en: 'Poor communication', np: 'कमजोर सञ्चार' } },
                    { value: 3, label: { en: 'Basic communication', np: 'आधारभूत सञ्चार' } },
                    { value: 4, label: { en: 'Good communication', np: 'राम्रो सञ्चार' } },
                    { value: 5, label: { en: 'Excellent communication with involvement', np: 'सहभागिताको साथ उत्कृष्ट सञ्चार' } }
                ]
            },
            {
                id: 'q7_4',
                text: {
                    en: 'Are post-change reviews conducted to verify safety effectiveness?',
                    np: 'के सुरक्षा प्रभावकारिता प्रमाणित गर्न परिवर्तन-पछिको समीक्षाहरू गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No reviews', np: 'कुनै समीक्षा छैन' } },
                    { value: 2, label: { en: 'Rarely reviewed', np: 'विरलै समीक्षा गरिन्छ' } },
                    { value: 3, label: { en: 'Sometimes reviewed', np: 'कहिलेकाहीँ समीक्षा गरिन्छ' } },
                    { value: 4, label: { en: 'Regularly reviewed', np: 'नियमित रूपमा समीक्षा गरिन्छ' } },
                    { value: 5, label: { en: 'Comprehensive post-implementation review', np: 'व्यापक कार्यान्वयन-पछिको समीक्षा' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 8: Continuous Improvement (4 questions)
    // ============================================================
    element8: {
        id: 8,
        name: {
            en: 'Continuous Improvement',
            np: 'निरन्तर सुधार'
        },
        pillar: 'Assurance',
        questions: [
            {
                id: 'q8_1',
                text: {
                    en: 'Does your organization have a structured continuous improvement program?',
                    np: 'के तपाईंको संस्थासँग संरचित निरन्तर सुधार कार्यक्रम छ?'
                },
                options: [
                    { value: 1, label: { en: 'No improvement program', np: 'कुनै सुधार कार्यक्रम छैन' } },
                    { value: 2, label: { en: 'Informal improvements only', np: 'केवल अनौपचारिक सुधारहरू' } },
                    { value: 3, label: { en: 'Basic improvement program', np: 'आधारभूत सुधार कार्यक्रम' } },
                    { value: 4, label: { en: 'Structured improvement program', np: 'संरचित सुधार कार्यक्रम' } },
                    { value: 5, label: { en: 'World-class continuous improvement culture', np: 'विश्व-स्तरीय निरन्तर सुधार संस्कृति' } }
                ]
            },
            {
                id: 'q8_2',
                text: {
                    en: 'How effectively are lessons learned from incidents and audits implemented?',
                    np: 'घटनाहरू र लेखापरीक्षणहरूबाट सिकिएका पाठहरू कति प्रभावकारी रूपमा कार्यान्वयन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Not implemented', np: 'कार्यान्वयन गरिएको छैन' } },
                    { value: 2, label: { en: 'Poorly implemented', np: 'कमजोर रूपमा कार्यान्वयन' } },
                    { value: 3, label: { en: 'Somewhat implemented', np: 'केही हदसम्म कार्यान्वयन' } },
                    { value: 4, label: { en: 'Well implemented', np: 'राम्रोसँग कार्यान्वयन' } },
                    { value: 5, label: { en: 'Systematically implemented and tracked', np: 'व्यवस्थित रूपमा कार्यान्वयन र ट्र्याक' } }
                ]
            },
            {
                id: 'q8_3',
                text: {
                    en: 'Are employees empowered to suggest and implement safety improvements?',
                    np: 'के कर्मचारीहरूलाई सुरक्षा सुधारहरू सुझाव र कार्यान्वयन गर्न सशक्तिकरण गरिएको छ?'
                },
                options: [
                    { value: 1, label: { en: 'No empowerment', np: 'कुनै सशक्तिकरण छैन' } },
                    { value: 2, label: { en: 'Limited empowerment', np: 'सीमित सशक्तिकरण' } },
                    { value: 3, label: { en: 'Some empowerment', np: 'केही सशक्तिकरण' } },
                    { value: 4, label: { en: 'Good empowerment with support', np: 'सहयोगको साथ राम्रो सशक्तिकरण' } },
                    { value: 5, label: { en: 'Full empowerment with recognition', np: 'मान्यताको साथ पूर्ण सशक्तिकरण' } }
                ]
            },
            {
                id: 'q8_4',
                text: {
                    en: 'How regularly is the SMS itself reviewed and improved?',
                    np: 'SMS आफैं कति नियमित रूपमा समीक्षा र सुधार गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never reviewed', np: 'कहिल्यै समीक्षा गरिएको छैन' } },
                    { value: 2, label: { en: 'Rarely reviewed', np: 'विरलै समीक्षा गरिन्छ' } },
                    { value: 3, label: { en: 'Periodically reviewed', np: 'आवधिक रूपमा समीक्षा' } },
                    { value: 4, label: { en: 'Regularly reviewed', np: 'नियमित रूपमा समीक्षा' } },
                    { value: 5, label: { en: 'Continuously improved', np: 'निरन्तर सुधार' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 9: Safety Training & Competence (4 questions)
    // ============================================================
    element9: {
        id: 9,
        name: {
            en: 'Safety Training & Competence',
            np: 'सुरक्षा तालिम र योग्यता'
        },
        pillar: 'Promotion',
        questions: [
            {
                id: 'q9_1',
                text: {
                    en: 'Does your organization provide adequate safety training for all employees?',
                    np: 'के तपाईंको संस्थाले सबै कर्मचारीहरूको लागि पर्याप्त सुरक्षा तालिम प्रदान गर्दछ?'
                },
                options: [
                    { value: 1, label: { en: 'No safety training', np: 'कुनै सुरक्षा तालिम छैन' } },
                    { value: 2, label: { en: 'Minimal training', np: 'न्यूनतम तालिम' } },
                    { value: 3, label: { en: 'Basic training for some', np: 'केहीको लागि आधारभूत तालिम' } },
                    { value: 4, label: { en: 'Comprehensive training for all', np: 'सबैको लागि व्यापक तालिम' } },
                    { value: 5, label: { en: 'Advanced, ongoing training program', np: 'उन्नत, निरन्तर तालिम कार्यक्रम' } }
                ]
            },
            {
                id: 'q9_2',
                text: {
                    en: 'Are training needs systematically identified and addressed?',
                    np: 'के तालिम आवश्यकताहरू व्यवस्थित रूपमा पहिचान र सम्बोधन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No identification process', np: 'कुनै पहिचान प्रक्रिया छैन' } },
                    { value: 2, label: { en: 'Informal identification', np: 'अनौपचारिक पहिचान' } },
                    { value: 3, label: { en: 'Basic identification', np: 'आधारभूत पहिचान' } },
                    { value: 4, label: { en: 'Systematic identification', np: 'व्यवस्थित पहिचान' } },
                    { value: 5, label: { en: 'Comprehensive needs analysis', np: 'व्यापक आवश्यकता विश्लेषण' } }
                ]
            },
            {
                id: 'q9_3',
                text: {
                    en: 'Is the effectiveness of safety training evaluated?',
                    np: 'के सुरक्षा तालिमको प्रभावकारिता मूल्याङ्कन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No evaluation', np: 'कुनै मूल्याङ्कन छैन' } },
                    { value: 2, label: { en: 'Basic satisfaction surveys', np: 'आधारभूत सन्तुष्टि सर्वेक्षण' } },
                    { value: 3, label: { en: 'Some competency assessment', np: 'केही योग्यता मूल्याङ्कन' } },
                    { value: 4, label: { en: 'Good competency evaluation', np: 'राम्रो योग्यता मूल्याङ्कन' } },
                    { value: 5, label: { en: 'Advanced evaluation with behavior change', np: 'व्यवहार परिवर्तनको साथ उन्नत मूल्याङ्कन' } }
                ]
            },
            {
                id: 'q9_4',
                text: {
                    en: 'Are safety competencies required for job roles clearly defined?',
                    np: 'के कामको भूमिकाहरूको लागि आवश्यक सुरक्षा योग्यताहरू स्पष्ट रूपमा परिभाषित छन्?'
                },
                options: [
                    { value: 1, label: { en: 'Not defined', np: 'परिभाषित छैन' } },
                    { value: 2, label: { en: 'Vaguely defined', np: 'अस्पष्ट रूपमा परिभाषित' } },
                    { value: 3, label: { en: 'Somewhat defined', np: 'केही हदसम्म परिभाषित' } },
                    { value: 4, label: { en: 'Clearly defined', np: 'स्पष्ट रूपमा परिभाषित' } },
                    { value: 5, label: { en: 'Comprehensive competency framework', np: 'व्यापक योग्यता ढाँचा' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 10: Safety Communication (4 questions)
    // ============================================================
    element10: {
        id: 10,
        name: {
            en: 'Safety Communication',
            np: 'सुरक्षा सञ्चार'
        },
        pillar: 'Promotion',
        questions: [
            {
                id: 'q10_1',
                text: {
                    en: 'Is there effective two-way safety communication throughout the organization?',
                    np: 'के संस्थामा प्रभावकारी दुई-तर्फी सुरक्षा सञ्चार छ?'
                },
                options: [
                    { value: 1, label: { en: 'No communication', np: 'कुनै सञ्चार छैन' } },
                    { value: 2, label: { en: 'Limited top-down only', np: 'केवल सीमित माथि-तल' } },
                    { value: 3, label: { en: 'Some two-way communication', np: 'केही दुई-तर्फी सञ्चार' } },
                    { value: 4, label: { en: 'Good two-way communication', np: 'राम्रो दुई-तर्फी सञ्चार' } },
                    { value: 5, label: { en: 'Excellent open communication culture', np: 'उत्कृष्ट खुला सञ्चार संस्कृति' } }
                ]
            },
            {
                id: 'q10_2',
                text: {
                    en: 'Are safety information and reports shared effectively across departments?',
                    np: 'के सुरक्षा जानकारी र रिपोर्टहरू विभागहरूमा प्रभावकारी रूपमा साझा गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'No sharing', np: 'कुनै साझेदारी छैन' } },
                    { value: 2, label: { en: 'Limited sharing', np: 'सीमित साझेदारी' } },
                    { value: 3, label: { en: 'Some sharing', np: 'केही साझेदारी' } },
                    { value: 4, label: { en: 'Good sharing', np: 'राम्रो साझेदारी' } },
                    { value: 5, label: { en: 'Comprehensive sharing and collaboration', np: 'व्यापक साझेदारी र सहकार्य' } }
                ]
            },
            {
                id: 'q10_3',
                text: {
                    en: 'How effective are safety meetings and briefings?',
                    np: 'सुरक्षा बैठक र ब्रीफिङहरू कति प्रभावकारी छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No meetings held', np: 'कुनै बैठकहरू आयोजना गरिएको छैन' } },
                    { value: 2, label: { en: 'Ineffective meetings', np: 'प्रभावहीन बैठकहरू' } },
                    { value: 3, label: { en: 'Moderately effective', np: 'मध्यम प्रभावकारी' } },
                    { value: 4, label: { en: 'Effective meetings', np: 'प्रभावकारी बैठकहरू' } },
                    { value: 5, label: { en: 'Highly effective with actionable outcomes', np: 'कार्ययोग्य परिणामहरूको साथ अत्यधिक प्रभावकारी' } }
                ]
            },
            {
                id: 'q10_4',
                text: {
                    en: 'Are safety messages adapted for different audiences and roles?',
                    np: 'के सुरक्षा सन्देशहरू विभिन्न दर्शक र भूमिकाहरूको लागि अनुकूलित छन्?'
                },
                options: [
                    { value: 1, label: { en: 'One-size-fits-all', np: 'सबैको लागि एउटै' } },
                    { value: 2, label: { en: 'Minimal adaptation', np: 'न्यूनतम अनुकूलन' } },
                    { value: 3, label: { en: 'Some adaptation', np: 'केही अनुकूलन' } },
                    { value: 4, label: { en: 'Good adaptation', np: 'राम्रो अनुकूलन' } },
                    { value: 5, label: { en: 'Excellent targeted communication', np: 'उत्कृष्ट लक्षित सञ्चार' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 11: Safety Culture (4 questions)
    // ============================================================
    element11: {
        id: 11,
        name: {
            en: 'Safety Culture',
            np: 'सुरक्षा संस्कृति'
        },
        pillar: 'Promotion',
        questions: [
            {
                id: 'q11_1',
                text: {
                    en: 'How would you describe the overall safety culture in your organization?',
                    np: 'तपाईं आफ्नो संस्थाको समग्र सुरक्षा संस्कृतिलाई कसरी वर्णन गर्नुहुन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Reactive/blame culture', np: 'प्रतिक्रियात्मक/दोष संस्कृति' } },
                    { value: 2, label: { en: 'Compliant/minimal culture', np: 'अनुपालन/न्यूनतम संस्कृति' } },
                    { value: 3, label: { en: 'Developing safety culture', np: 'विकासशील सुरक्षा संस्कृति' } },
                    { value: 4, label: { en: 'Positive safety culture', np: 'सकारात्मक सुरक्षा संस्कृति' } },
                    { value: 5, label: { en: 'World-class safety culture', np: 'विश्व-स्तरीय सुरक्षा संस्कृति' } }
                ]
            },
            {
                id: 'q11_2',
                text: {
                    en: 'Are employees willing to report safety concerns without fear of reprisal?',
                    np: 'के कर्मचारीहरू प्रतिशोधको डर बिना सुरक्षा चिन्ताहरू रिपोर्ट गर्न इच्छुक छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No, fear of reprisal', np: 'होइन, प्रतिशोधको डर' } },
                    { value: 2, label: { en: 'Reluctant to report', np: 'रिपोर्ट गर्न अनिच्छुक' } },
                    { value: 3, label: { en: 'Some willingness', np: 'केही इच्छुकता' } },
                    { value: 4, label: { en: 'Good willingness', np: 'राम्रो इच्छुकता' } },
                    { value: 5, label: { en: 'Strong reporting culture', np: 'बलियो रिपोर्टिङ संस्कृति' } }
                ]
            },
            {
                id: 'q11_3',
                text: {
                    en: 'Is safety considered a core value, not just a priority?',
                    np: 'के सुरक्षालाई केवल प्राथमिकता मात्र नभई मूल मान मानिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Not a value', np: 'मान होइन' } },
                    { value: 2, label: { en: 'Low priority', np: 'कम प्राथमिकता' } },
                    { value: 3, label: { en: 'Important priority', np: 'महत्त्वपूर्ण प्राथमिकता' } },
                    { value: 4, label: { en: 'Core value', np: 'मूल मान' } },
                    { value: 5, label: { en: 'Deeply embedded value', np: 'गहिरो रूपमा सम्मिलित मान' } }
                ]
            },
            {
                id: 'q11_4',
                text: {
                    en: 'How engaged are employees in safety initiatives and activities?',
                    np: 'कर्मचारीहरू सुरक्षा पहल र गतिविधिहरूमा कति संलग्न छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No engagement', np: 'कुनै संलग्नता छैन' } },
                    { value: 2, label: { en: 'Minimal engagement', np: 'न्यूनतम संलग्नता' } },
                    { value: 3, label: { en: 'Some engagement', np: 'केही संलग्नता' } },
                    { value: 4, label: { en: 'Good engagement', np: 'राम्रो संलग्नता' } },
                    { value: 5, label: { en: 'High engagement and ownership', np: 'उच्च संलग्नता र स्वामित्व' } }
                ]
            }
        ]
    },

    // ============================================================
    // ELEMENT 12: Emergency Response Planning (4 questions)
    // ============================================================
    element12: {
        id: 12,
        name: {
            en: 'Emergency Response Planning',
            np: 'आपतकालीन प्रतिक्रिया योजना'
        },
        pillar: 'Assurance',
        questions: [
            {
                id: 'q12_1',
                text: {
                    en: 'Does your organization have comprehensive emergency response plans?',
                    np: 'के तपाईंको संस्थासँग व्यापक आपतकालीन प्रतिक्रिया योजनाहरू छन्?'
                },
                options: [
                    { value: 1, label: { en: 'No emergency plans', np: 'कुनै आपतकालीन योजना छैन' } },
                    { value: 2, label: { en: 'Basic, outdated plans', np: 'आधारभूत, पुराना योजनाहरू' } },
                    { value: 3, label: { en: 'Adequate plans for some scenarios', np: 'केही परिदृश्यहरूको लागि पर्याप्त योजनाहरू' } },
                    { value: 4, label: { en: 'Comprehensive plans for all scenarios', np: 'सबै परिदृश्यहरूको लागि व्यापक योजनाहरू' } },
                    { value: 5, label: { en: 'Advanced, regularly tested plans', np: 'उन्नत, नियमित रूपमा परीक्षण गरिएका योजनाहरू' } }
                ]
            },
            {
                id: 'q12_2',
                text: {
                    en: 'How frequently are emergency response drills conducted?',
                    np: 'आपतकालीन प्रतिक्रिया अभ्यासहरू कति पटक सञ्चालन गरिन्छ?'
                },
                options: [
                    { value: 1, label: { en: 'Never conducted', np: 'कहिल्यै सञ्चालन गरिएको छैन' } },
                    { value: 2, label: { en: 'Rarely (yearly or less)', np: 'विरलै (वार्षिक वा कम)' } },
                    { value: 3, label: { en: 'Occasionally (semi-annually)', np: 'कहिलेकाहीँ (अर्ध-वार्षिक)' } },
                    { value: 4, label: { en: 'Regularly (quarterly)', np: 'नियमित (त्रैमासिक)' } },
                    { value: 5, label: { en: 'Frequently (monthly) with varied scenarios', np: 'बारम्बार (मासिक) विविध परिदृश्यहरूको साथ' } }
                ]
            },
            {
                id: 'q12_3',
                text: {
                    en: 'Are emergency roles and responsibilities clearly defined and understood?',
                    np: 'के आपतकालीन भूमिका र जिम्मेवारीहरू स्पष्ट रूपमा परिभाषित र बुझिएका छन्?'
                },
                options: [
                    { value: 1, label: { en: 'Not defined', np: 'परिभाषित छैन' } },
                    { value: 2, label: { en: 'Vaguely defined', np: 'अस्पष्ट रूपमा परिभाषित' } },
                    { value: 3, label: { en: 'Somewhat defined', np: 'केही हदसम्म परिभाषित' } },
                    { value: 4, label: { en: 'Clearly defined', np: 'स्पष्ट रूपमा परिभाषित' } },
                    { value: 5, label: { en: 'Clearly defined with regular training', np: 'नियमित तालिमको साथ स्पष्ट रूपमा परिभाषित' } }
                ]
            },
            {
                id: 'q12_4',
                text: {
                    en: 'How effective is the emergency communication system?',
                    np: 'आपतकालीन सञ्चार प्रणाली कति प्रभावकारी छ?'
                },
                options: [
                    { value: 1, label: { en: 'No system', np: 'कुनै प्रणाली छैन' } },
                    { value: 2, label: { en: 'Poorly functioning', np: 'कमजोर रूपमा कार्य गर्दै' } },
                    { value: 3, label: { en: 'Adequate system', np: 'पर्याप्त प्रणाली' } },
                    { value: 4, label: { en: 'Good system', np: 'राम्रो प्रणाली' } },
                    { value: 5, label: { en: 'Excellent, redundant system', np: 'उत्कृष्ट, अनावश्यक प्रणाली' } }
                ]
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
    for (const elementKey in QUESTION_BANK) {
        const element = QUESTION_BANK[elementKey];
        element.questions.forEach(q => {
            allQuestions.push({
                ...q,
                elementId: element.id,
                elementName: element.name[lang] || element.name['en'],
                text: q.text[lang] || q.text['en'],
                options: q.options.map(opt => ({
                    value: opt.value,
                    label: opt.label[lang] || opt.label['en']
                }))
            });
        });
    }
    return allQuestions;
}

// Get questions for a specific session (24 questions)
function getSessionQuestions(sessionNumber, lang = 'en', questionsPerSession = 24) {
    const allQuestions = getAllQuestions(lang);
    const totalQuestions = allQuestions.length;
    
    // Deterministic shuffle based on session number
    const shuffled = shuffleArray(allQuestions, sessionNumber);
    
    const startIndex = (sessionNumber - 1) * questionsPerSession;
    const endIndex = Math.min(startIndex + questionsPerSession, shuffled.length);
    
    return shuffled.slice(startIndex, endIndex);
}

// Deterministic shuffle
function shuffleArray(array, seed) {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let randomIndex;
    let seedValue = seed * 123456789;
    
    while (currentIndex !== 0) {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        randomIndex = Math.floor((seedValue / 233280) * currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = 
        [shuffled[randomIndex], shuffled[currentIndex]];
    }
    
    return shuffled;
}

// Get question by ID
function getQuestionById(id, lang = 'en') {
    const allQuestions = getAllQuestions(lang);
    return allQuestions.find(q => q.id === id);
}

// Get questions by element
function getQuestionsByElement(elementId, lang = 'en') {
    const allQuestions = getAllQuestions(lang);
    return allQuestions.filter(q => q.elementId === elementId);
}

// Get question bank statistics
function getQuestionBankStats() {
    const allQuestions = getAllQuestions('en');
    const elementStats = {};
    
    for (const elementKey in QUESTION_BANK) {
        const element = QUESTION_BANK[elementKey];
        elementStats[element.id] = {
            name: element.name,
            questionCount: element.questions.length
        };
    }
    
    return {
        totalQuestions: allQuestions.length,
        totalElements: Object.keys(QUESTION_BANK).length,
        elementStats: elementStats
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
        getQuestionsByElement,
        getQuestionBankStats
    };
}

// For browser use
window.QuestionBank = {
    QUESTION_BANK,
    getAllQuestions,
    getSessionQuestions,
    getQuestionById,
    getQuestionsByElement,
    getQuestionBankStats
};

// Log stats on load
console.log('📚 Question Bank Loaded:');
console.log(getQuestionBankStats());
console.log('🌐 Supports English (en) and Nepali (np)');