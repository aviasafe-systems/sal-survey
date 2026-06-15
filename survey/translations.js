const TRANSLATIONS = {
  en: {
    // Page metadata
    pageTitle: "Sita Air SMS – Safety Culture Survey",
    heading: "Sita Air SMS",
    subheading:
      "This survey supports the continuous improvement of our Safety Management System in accordance with ICAO Annex 19, CAAN SMS requirements, FAA Order 8000.369, and EASA Regulation (EU) 376/2014.",

    // Progress
    progress: "Question {current} of {total}",

    // Buttons
    submit: "Submit Response",
    clear: "Clear All",
    download: "Download Data",

    // Category section headers
    section_safety_policy: "Safety Policy & Objectives",
    section_safety_risk_mgmt: "Safety Risk Management",
    section_safety_assurance: "Safety Assurance",
    section_safety_promotion: "Safety Promotion",

    // Validation
    requiredField: "This question requires an answer.",
    validationError: "Please answer all required questions before submitting.",

    // Submit flow
    submitSuccess:
      "Your response has been recorded. Thank you for contributing to safety.",
    submitError:
      "An error occurred while submitting. Please try again.",
    submitOffline:
      "Your response has been saved locally and will be submitted when connectivity is restored.",

    // localStorage / offline status
    statusSaved: "Response saved to local storage.",
    statusSynced: "Response synced to server.",
    statusPending: "Pending upload — {count} response(s) in queue.",
    statusOffline:
      "No internet connection. Responses are being stored locally.",
    statusOnline: "Connection restored. Syncing pending responses.",
    statusCleared: "Local data cleared.",

    // Download modal
    downloadTitle: "Export Survey Data",
    downloadIndividual:
      "Download Individual Response (JSON)",
    downloadBatch: "Download All Responses (CSV)",
    downloadClose: "Continue",

    // Landing page
    landing_title: "Sita Air",
    landing_subtitle: "Anonymous Safety Culture Assessment",
    landing_compliance: "Aligned with ICAO Annex 19 & Doc 9859",
    landing_about_title: "About This Survey",
    landing_about_body:
      "This Safety Culture Survey is designed to assess the safety climate within your organization. Your honest responses will help identify strengths and areas for improvement in our safety management system.\n\nThis survey implements the principles of:\n\u2022 ICAO Annex 19 \u2014 Safety Management\n\u2022 ICAO Doc 9859 \u2014 Safety Management Manual\n\u2022 Just Culture \u2014 Non-punitive reporting environment\n\nYour responses are completely anonymous. No personally identifiable information is collected. Data is stored only on your device and you control what to share.",
    landing_icao_title: "ICAO Compliance Framework",
    landing_icao_body:
      "This assessment tool is designed to support the Safety Culture component of ICAO Annex 19 (Safety Management) and follows the guidance framework outlined in ICAO Doc 9859 (Safety Management Manual), 4th Edition.\n\nThe survey structure addresses:\n\u2022 SMS Component 1: Safety Policy and Objectives\n\u2022 SMS Component 2: Safety Risk Management\n\u2022 SMS Component 3: Safety Assurance\n\u2022 SMS Component 4: Safety Promotion",
    landing_details_time: "5\u20137 minutes",
    landing_details_questions: "24 questions across 4 ICAO pillars",
    landing_details_privacy: "Anonymous \u2014 no personal data collected",
    landing_details_languages: "English & \u0928\u0947\u092a\u093e\u0932\u0940",
    landing_details_device: "Works on mobile, tablet, and desktop",
    landing_details_data: "You download and control your responses",
    landing_categories_title: "Assessment Categories",
    landing_start: "Begin Survey / \u0938\u0930\u094d\u0935\u0947\u0915\u094d\u0937\u0923 \u0938\u0941\u0930\u0941 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d",
    landing_privacy_note:
      "Your responses are anonymous and stored only on your device.",
    landing_leave_title: "Leave survey?",
    landing_leave_body: "Your progress is saved. You can return anytime.",
    landing_leave_stay: "Stay",
    landing_leave_leave: "Leave",

    // Footer
    footerJustCulture:
      "This survey operates under Just Culture principles. Information provided will not be used for punitive purposes and is protected under applicable safety data protection regulations.",
    footerRights: "© Sita Air — All rights reserved.",
  },

  np: {
    // Page metadata
    pageTitle: "सीता एयर SMS – सुरक्षा संस्कृति सर्वेक्षण",
    heading: "सीता एयर SMS",
    subheading:
      "यो सर्वेक्षण ICAO Annex 19, CAAN SMS आवश्यकताहरू, FAA Order 8000.369, र EASA Regulation (EU) 376/2014 अनुरूप हाम्रो सुरक्षा व्यवस्थापन प्रणालीको निरन्तर सुधारलाई समर्थन गर्दछ।",

    // Progress
    progress: "प्रश्न {current} / {total}",

    // Buttons
    submit: "प्रतिक्रिया पेश गर्नुहोस्",
    clear: "सबै मेट्नुहोस्",
    download: "डाटा डाउनलोड गर्नुहोस्",

    // Category section headers
    section_safety_policy: "सुरक्षा नीति र उद्देश्यहरू",
    section_safety_risk_mgmt: "सुरक्षा जोखिम व्यवस्थापन",
    section_safety_assurance: "सुरक्षा आश्वासन",
    section_safety_promotion: "सुरक्षा प्रवर्द्धन",

    // Validation
    requiredField: "यो प्रश्नको उत्तर आवश्यक छ।",
    validationError:
      "कृपया पेश गर्नुअघि सबै आवश्यक प्रश्नहरूको उत्तर दिनुहोस्।",

    // Submit flow
    submitSuccess:
      "तपाईंको प्रतिक्रिया रेकर्ड गरिएको छ। सुरक्षामा योगदान गर्नुभएकोमा धन्यवाद।",
    submitError:
      "पेश गर्दा त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।",
    submitOffline:
      "तपाईंको प्रतिक्रिया स्थानीय रूपमा सुरक्षित गरिएको छ र जडान पुनर्स्थापित हुँदा पेश गरिनेछ।",

    // localStorage / offline status
    statusSaved: "प्रतिक्रिया स्थानीय भण्डारणमा सुरक्षित गरियो।",
    statusSynced: "प्रतिक्रिया सर्भरमा सिङ्क गरियो।",
    statusPending:
      "पेश हुन बाँकी — {count} वटा प्रतिक्रिया(हरू) लाइनमा छन्।",
    statusOffline:
      "इन्टरनेट जडान छैन। प्रतिक्रियाहरू स्थानीय रूपमा भण्डारण भइरहेका छन्।",
    statusOnline:
      "जडान पुनर्स्थापित भयो। पेश हुन बाँकी प्रतिक्रियाहरू सिङ्क हुँदैछन्।",
    statusCleared: "स्थानीय डाटा मेटियो।",

    // Download modal
    downloadTitle: "सर्वेक्षण डाटा निर्यात गर्नुहोस्",
    downloadIndividual:
      "व्यक्तिगत प्रतिक्रिया डाउनलोड गर्नुहोस् (JSON)",
    downloadBatch: "सबै प्रतिक्रियाहरू डाउनलोड गर्नुहोस् (CSV)",
    downloadClose: "जारी राख्नुहोस्",

    // Landing page
    landing_title: "सीता एयर",
    landing_subtitle: "गोप्य सुरक्षा संस्कृति मूल्याङ्कन",
    landing_compliance: "ICAO Annex 19 र Doc 9859 सँग मेल खाने",
    landing_about_title: "यस सर्वेक्षणको बारेमा",
    landing_about_body:
      "यो सुरक्षा संस्कृति सर्वेक्षण तपाईंको संस्था भित्रको सुरक्षा वातावरणको मूल्याङ्कन गर्न डिजाइन गरिएको छ। तपाईंको इमान्दार प्रतिक्रियाहरूले हाम्रो सुरक्षा व्यवस्थापन प्रणालीमा शक्तिहरू र सुधारका लागि क्षेत्रहरू पहिचान गर्न मद्दत गर्नेछ।\n\nयस सर्वेक्षणले निम्न सिद्धान्तहरू कार्यान्वयन गर्दछ:\n\u2022 ICAO Annex 19 \u2014 सुरक्षा व्यवस्थापन\n\u2022 ICAO Doc 9859 \u2014 सुरक्षा व्यवस्थापन पुस्तिका\n\u2022 जस्ट कल्चर \u2014 गैर-दण्डात्मक रिपोर्टिङ वातावरण\n\nतपाईंको प्रतिक्रियाहरू पूर्ण रूपमा गोप्य छन्। कुनै पनि व्यक्तिगत पहिचान योग्य जानकारी सङ्कलन गरिँदैन। डाटा केवल तपाईंको उपकरणमा भण्डारण गरिन्छ र तपाईंले के साझा गर्ने नियन्त्रण गर्नुहुन्छ।",
    landing_icao_title: "ICAO अनुपालन ढाँचा",
    landing_icao_body:
      "यो मूल्याङ्कन उपकरण ICAO Annex 19 (सुरक्षा व्यवस्थापन) को सुरक्षा संस्कृति घटकलाई समर्थन गर्न र ICAO Doc 9859 (सुरक्षा व्यवस्थापन पुस्तिका), चौथो संस्करणमा उल्लिखित मार्गदर्शन ढाँचा पालना गर्न डिजाइन गरिएको हो।\n\nसर्वेक्षण संरचनाले सम्बोधन गर्दछ:\n\u2022 SMS घटक 1: सुरक्षा नीति र उद्देश्यहरू\n\u2022 SMS घटक 2: सुरक्षा जोखिम व्यवस्थापन\n\u2022 SMS घटक 3: सुरक्षा आश्वासन\n\u2022 SMS घटक 4: सुरक्षा प्रवर्द्धन",
    landing_details_time: "५\u2013७ मिनेट",
    landing_details_questions: "४ ICAO स्तम्भहरूमा २४ प्रश्नहरू",
    landing_details_privacy: "गोप्य \u2014 कुनै व्यक्तिगत डाटा सङ्कलन गरिँदैन",
    landing_details_languages: "अङ्ग्रेजी र नेपाली",
    landing_details_device: "मोबाइल, ट्याब्लेट र डेस्कटपमा काम गर्छ",
    landing_details_data: "तपाईं आफ्नो प्रतिक्रिया डाउनलोड र नियन्त्रण गर्नुहुन्छ",
    landing_categories_title: "मूल्याङ्कन कोटीहरू",
    landing_start: "सर्वेक्षण सुरु गर्नुहोस् / Begin Survey",
    landing_privacy_note:
      "तपाईंको प्रतिक्रियाहरू गोप्य छन् र तपाईंको उपकरणमा मात्र भण्डारण गरिन्छ।",
    landing_leave_title: "सर्वेक्षण छोड्ने?",
    landing_leave_body: "तपाईंको प्रगति सुरक्षित गरिएको छ। तपाईं कुनै पनि समय फर्कन सक्नुहुन्छ।",
    landing_leave_stay: "रहने",
    landing_leave_leave: "छोड्ने",

    // Footer
    footerJustCulture:
      "यो सर्वेक्षण न्यायपूर्ण संस्कृति सिद्धान्तहरू अन्तर्गत सञ्चालन हुन्छ। प्रदान गरिएको जानकारी दण्डात्मक उद्देश्यका लागि प्रयोग गरिनेछैन र लागू सुरक्षा डाटा संरक्षण नियमहरू अन्तर्गत संरक्षित छ।",
    footerRights:
      "© सीता एयर — सर्वाधिकार सुरक्षित।",
  },
};
