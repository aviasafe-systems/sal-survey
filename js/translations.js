/*
================================================================================
FILE: SurveySMS/js/translations.js
VERSION: 3.0
REVISION DATE: 2026-06-17
PURPOSE: Global translation object for all pages (English & Nepali)
REVISED PURPOSE: Marketing focus on SMS Gap Analysis (ICAO Annex 19 & Doc 9859)
AFFECTED: All pages (Landing, Login, Dashboard, Survey, Thank You, Admin)
================================================================================
*/

const TRANSLATIONS = {
    // ============================================================
    // ENGLISH TRANSLATIONS
    // ============================================================
    en: {
        // ===== LANDING PAGE - GAP ANALYSIS FOCUS =====
        landing_header_title: 'SMS Gap Analysis Platform',
        landing_subtitle: 'AviaSafeSystems • ICAO Annex 19 • Doc 9859',
        four_pillars: 'Four Pillars',
        twelve_elements: 'Twelve Elements',
        icao_annex_19: 'ICAO Annex 19',
        select_language: 'Select Your Preferred Language',
        none_selected: 'None selected',
        
        // Hero Section
        hero_title: 'SMS Gap Analysis',
        hero_desc: 'The <strong>AviaSafeSystems SMS Gap Analysis Platform</strong> helps aviation organizations assess their Safety Management System against <strong>ICAO Annex 19</strong> and <strong>Doc 9859</strong> requirements.<br><br><strong>Identify gaps → Generate Corrective Action Plans → Track Continuous Improvement</strong>',
        
        // Why Section
        why_title: 'Why SMS Gap Analysis?',
        why_1: 'ICAO Annex 19 Compliance',
        why_1_desc: 'Ensure your organization meets international safety management standards.',
        why_2: 'Identify Safety Gaps',
        why_2_desc: 'Pinpoint weaknesses across all 12 SMS elements and 4 pillars.',
        why_3: 'Corrective Action Plans',
        why_3_desc: 'Receive prioritized, actionable recommendations for improvement.',
        why_4: 'Track Improvement',
        why_4_desc: 'Monitor progress over time with data-driven analytics.',
        
        // Pillars
        pillars_title: 'The 4 SMS Pillars (ICAO Annex 19)',
        pillar1_title: 'Safety Policy & Objectives',
        pillar1_desc: 'Management commitment, safety accountabilities, and documented safety policies',
        pillar2_title: 'Safety Risk Management',
        pillar2_desc: 'Hazard identification, risk assessment, and mitigation strategies',
        pillar3_title: 'Safety Assurance',
        pillar3_desc: 'Performance monitoring, audits, and continuous improvement processes',
        pillar4_title: 'Safety Promotion',
        pillar4_desc: 'Training, communication, and fostering a positive safety culture',
        
        // Elements
        elements_title: 'The 12 SMS Elements Assessed',
        
        // Deliverables
        deliverables_title: 'What You Get',
        deliverable_1: 'Gap Analysis Report',
        deliverable_1_desc: 'Comprehensive report identifying gaps across all 12 elements',
        deliverable_2: 'Corrective Action Plan',
        deliverable_2_desc: 'Prioritized recommendations with clear actions',
        deliverable_3: 'Visual Analytics',
        deliverable_3_desc: 'Interactive charts showing pillar and element scores',
        deliverable_4: 'Exportable Reports',
        deliverable_4_desc: 'PDF and Excel exports for sharing with stakeholders',
        
        // CTA
        cta_title: 'Ready to Assess Your SMS?',
        cta_desc: 'Complete the SMS Gap Analysis survey and get your comprehensive report in minutes.',
        cta_feature1: '5 Survey Sessions',
        cta_feature2: '24 Questions Each',
        cta_feature3: '15-20 Minutes',
        cta_feature4: 'Immediate Gap Analysis',
        btn_text: 'Start Your Gap Analysis',
        badge_text: 'FREE DEMO',
        
        // Contact
        contact_label: 'Questions? Contact the AviaSafeSystems team:',
        contact_availability: 'Available Sun-Fri, 9:00 AM - 6:00 PM (NPT)',
        
        // Footer
        footer_text: 'SMS Gap Analysis Platform',
        footer_built: 'Built with',
        footer_nepal: 'in Nepal',
        
        // Alerts
        alert_success: '✅ Language set to {lang}. You may now begin the survey.',
        alert_error: '⚠️ Please select a language first.',
        alert_loading: 'Loading survey...',

        // ===== LOGIN PAGE =====
        login_title: 'Welcome Back',
        login_subtitle: 'Sign in to continue your SMS Gap Analysis journey',
        email_label: 'Email Address',
        email_placeholder: 'Enter your email address',
        password_label: 'Password',
        password_placeholder: 'Enter your password',
        login_btn: 'Sign In',
        back_home: 'Back to Home',
        footer_note: 'sms.aviasafesystems.com • Secure • ICAO Annex 19',
        feature1: '24 Questions',
        feature2: '12 SMS Elements',
        feature3: 'Progress Tracking',
        feature4: 'Gap Analysis',
        login_error: 'Invalid credentials. Please try again.',
        login_success: 'Login successful! Redirecting...',
        login_success_message: '✅ Welcome {name}! Redirecting...',
        signing_in: 'Signing in...',
        invalid_password: 'Invalid password. Please try again.',
        email_not_found: 'Email not found. Please check your credentials.',

        // ===== DASHBOARD PAGE =====
        dashboard_title: 'Dashboard - SMS Gap Analysis',
        completed_sessions: 'Completed Sessions',
        current_session: 'Current Session',
        questions_answered: 'Questions Answered',
        overall_progress: 'Overall Progress',
        overall_survey_progress: 'Overall Survey Progress',
        progress_percent: '0% Complete',
        survey_sessions: 'Survey Sessions',
        sessions_description: 'Complete all 5 sessions to generate your comprehensive SMS gap analysis report. Each session contains 24 questions and takes approximately 15-20 minutes.',
        view_report_title: 'View Your Gap Analysis Report',
        view_report_status: 'Complete at least one session to generate your report.',
        view_report_btn: 'View Gap Analysis Report',
        view_report_complete: '🎉 All 5 sessions complete! View your comprehensive gap analysis report.',
        view_report_progress: '📊 {count} of 5 sessions complete. View your progress report.',
        view_full_report: 'View Full Gap Analysis Report',
        complete: 'Complete',
        progress: 'PROGRESS',
        logout: 'Logout',
        logout_confirm: 'Are you sure you want to logout?',
        complete_survey_to_generate: 'Complete the survey to generate your comprehensive SMS gap analysis report for',
        no_data_title: 'No Survey Data Found',
        no_data_desc: 'Click "Start Session" below to begin your first survey session.',
        session: 'Session',
        questions: 'Questions',
        not_started: 'Not Started',
        completed: 'Completed',
        in_progress: 'In Progress',
        ready_to_start: 'Ready to Start',
        locked: 'Locked',
        start_session: 'Start Session',
        retake: 'Retake',
        continue: 'Continue',
        retake_confirm: 'You\'ve already completed Session {number}. Would you like to retake it?',
        session_locked: 'This session is locked. Please complete previous sessions first.',

        // ===== SURVEY PAGE =====
        survey_title: 'SMS Gap Analysis Survey',
        survey_subtitle: 'Survey',
        exit: 'Exit',
        progress_label: 'Survey Progress',
        question: 'Question',
        of: 'of',
        previous: 'Previous',
        next: 'Next',
        complete_survey: 'Complete Survey',
        sms_element: 'SMS Element',
        selection_pending: 'Selection pending. Click "Next" to save your answer.',
        answer_saved: 'Answer saved!',
        select_option: 'Please select an answer before proceeding.',
        please_answer_all: 'Please answer all questions before completing the survey.',
        remaining: 'remaining',
        answered: 'answered',
        exit_no_answers: 'You haven\'t answered any questions yet. Your progress will not be saved.\n\nAre you sure you want to exit?',
        exit_all_answered: 'You have completed all {total} questions. Your responses are saved.\n\nAre you sure you want to exit?',
        exit_partial: 'You have answered {count} of {total} questions. Your progress has been saved.\n\nYou can continue later. Are you sure you want to exit?',
        very_poor: 'Very Poor',
        poor: 'Poor',
        fair: 'Fair',
        good: 'Good',
        excellent: 'Excellent',

        // ===== THANK YOU PAGE =====
        thankyou_title: 'Thank You!',
        thankyou_subtitle: 'धन्यवाद',
        thankyou_message: 'Dear Valued Partner,\n\nWe sincerely thank you for the opportunity provided to AviaSafeSystems to demonstrate our SMS Gap Analysis Platform.\n\nYour time and participation in this survey reflects your dedication to safety excellence and continuous improvement.\n\nTogether, we build a safer aviation future.',
        thankyou_namaste: '🙏 NAMASTE 🙏',
        thankyou_namaste_meaning: '"May the divine light in me, honor the divine light in you."',
        thankyou_return: 'Return to Home',
        thankyou_footer: 'AviaSafeSystems SMS Gap Analysis Platform',

        // ===== ADMIN PAGE =====
        admin_title: 'Admin Panel - SMS Gap Analysis',
        admin_panel: 'Admin Panel',
        admin_subtitle: 'Manage survey data and generate dummy responses',
        restricted: 'RESTRICTED',
        admin_password: 'Admin Password',
        enter_password: 'Enter admin password',
        login: 'Login',
        wipe_title: 'Wipe All Survey Data',
        wipe_desc: 'Completely remove all survey responses, sessions, and user data from localStorage.',
        wipe_btn: 'Wipe All Data',
        generate_title: 'Generate Dummy Survey Responses',
        generate_desc: 'Generate realistic survey responses for multiple airlines with random scores.',
        generate_btn: 'Generate Dummy Data',
        stats_title: 'Data Statistics',
        stats_desc: 'View current data statistics including total sessions and airlines.',
        stats_btn: 'View Stats',
        reset_title: 'Reset Demo User',
        reset_desc: 'Reset the demo user account to start fresh with a new session.',
        reset_btn: 'Reset Demo User',
        available_airlines: 'Available Airlines',
        admin_footer: 'SMS Gap Analysis Admin Panel',
        back_dashboard: 'Back to Dashboard',
        login_success_admin: '✅ Login successful! Welcome to the Admin Panel.',
        wipe_success: '✅ Successfully wiped {count} data items from localStorage.',
        generate_success: '✅ Dummy data generated successfully!',
        reset_success: '✅ Demo user reset successfully! You can now login again.',
        invalid_password_admin: 'Invalid credentials. Please try again.',
        wipe_confirm1: '⚠️ WARNING: This will permanently delete ALL survey data!\n\nAre you sure you want to continue?',
        wipe_confirm2: '🔴 LAST CHANCE: All data will be lost forever. Continue?',
        generate_confirm: 'This will generate dummy survey responses for all airlines.\n\nExisting data will be preserved.\n\nContinue?',
        generating: 'Generating...',
        generate_error: '❌ Error generating dummy data: ',
        wipe_error: '❌ Error wiping data: ',
        reset_confirm: 'Reset the demo user account? This will clear your current progress but keep generated data.',
        reset_error: '❌ Error resetting demo user: ',
        data_statistics: 'Data Statistics',
        total_airlines: 'Total Airlines',
        total_sessions: 'Total Sessions',
        total_keys: 'Total Keys',
        storage_used: 'Storage Used',
        airlines: 'Airlines',
        sessions: 'sessions',
        logout_confirm_admin: 'Logout from admin panel?'
    },

    // ============================================================
    // NEPALI TRANSLATIONS
    // ============================================================
    np: {
        // ===== LANDING PAGE - GAP ANALYSIS FOCUS =====
        landing_header_title: 'एसएमएस ग्याप विश्लेषण प्लेटफर्म',
        landing_subtitle: 'AviaSafeSystems • आईसीएओ परिशिष्ट १९ • Doc 9859',
        four_pillars: 'चार स्तम्भहरू',
        twelve_elements: 'बाह्र तत्वहरू',
        icao_annex_19: 'आईसीएओ परिशिष्ट १९',
        select_language: 'आफ्नो रुचाइएको भाषा चयन गर्नुहोस्',
        none_selected: 'कुनै पनि चयन गरिएको छैन',
        
        // Hero Section
        hero_title: 'एसएमएस ग्याप विश्लेषण',
        hero_desc: '<strong>AviaSafeSystems एसएमएस ग्याप विश्लेषण प्लेटफर्म</strong> ले विमानन संस्थाहरूलाई <strong>आईसीएओ परिशिष्ट १९</strong> र <strong>Doc 9859</strong> आवश्यकताहरूको विरुद्ध आफ्नो सुरक्षा व्यवस्थापन प्रणालीको मूल्याङ्कन गर्न मद्दत गर्दछ।<br><br><strong>ग्याप पहिचान → सुधारात्मक कार्य योजना → निरन्तर सुधार ट्र्याक गर्नुहोस्</strong>',
        
        // Why Section
        why_title: 'किन एसएमएस ग्याप विश्लेषण?',
        why_1: 'आईसीएओ परिशिष्ट १९ अनुपालन',
        why_1_desc: 'तपाईंको संस्थाले अन्तर्राष्ट्रिय सुरक्षा व्यवस्थापन मापदण्डहरू पूरा गर्छ भनी सुनिश्चित गर्नुहोस्।',
        why_2: 'सुरक्षा ग्याप पहिचान',
        why_2_desc: 'सबै १२ एसएमएस तत्वहरू र ४ स्तम्भहरूमा कमजोरीहरू पहिचान गर्नुहोस्।',
        why_3: 'सुधारात्मक कार्य योजनाहरू',
        why_3_desc: 'प्राथमिकता-आधारित, कार्यान्वयनयोग्य सिफारिसहरू प्राप्त गर्नुहोस्।',
        why_4: 'सुधार ट्र्याक गर्नुहोस्',
        why_4_desc: 'डाटा-संचालित विश्लेषणको साथ समयसँगै प्रगति अनुगमन गर्नुहोस्।',
        
        // Pillars
        pillars_title: 'एसएमएसका ४ स्तम्भहरू (आईसीएओ परिशिष्ट १९)',
        pillar1_title: 'सुरक्षा नीति र उद्देश्यहरू',
        pillar1_desc: 'व्यवस्थापन प्रतिबद्धता, सुरक्षा जवाफदेहिता, र दस्तावेजीकृत सुरक्षा नीतिहरू',
        pillar2_title: 'सुरक्षा जोखिम व्यवस्थापन',
        pillar2_desc: 'जोखिम पहिचान, जोखिम मूल्याङ्कन, र न्यूनीकरण रणनीतिहरू',
        pillar3_title: 'सुरक्षा आश्वासन',
        pillar3_desc: 'प्रदर्शन अनुगमन, लेखापरीक्षण, र निरन्तर सुधार प्रक्रियाहरू',
        pillar4_title: 'सुरक्षा प्रवर्द्धन',
        pillar4_desc: 'तालिम, सञ्चार, र सकारात्मक सुरक्षा संस्कृतिको विकास',
        
        // Elements
        elements_title: 'मूल्याङ्कन गरिएका १२ एसएमएस तत्वहरू',
        
        // Deliverables
        deliverables_title: 'तपाईंले के पाउनुहुन्छ',
        deliverable_1: 'ग्याप विश्लेषण रिपोर्ट',
        deliverable_1_desc: 'सबै १२ तत्वहरूमा ग्याप पहिचान गर्ने विस्तृत रिपोर्ट',
        deliverable_2: 'सुधारात्मक कार्य योजना',
        deliverable_2_desc: 'स्पष्ट कार्यहरू सहित प्राथमिकता-आधारित सिफारिसहरू',
        deliverable_3: 'दृश्य विश्लेषण',
        deliverable_3_desc: 'स्तम्भ र तत्व स्कोर देखाउने अन्तरक्रियात्मक चार्टहरू',
        deliverable_4: 'निर्यात योग्य रिपोर्टहरू',
        deliverable_4_desc: 'सरोकारवालाहरूसँग साझेदारी गर्न पीडीएफ र एक्सेल निर्यातहरू',
        
        // CTA
        cta_title: 'तपाईंको एसएमएस मूल्याङ्कन गर्न तयार हुनुहुन्छ?',
        cta_desc: 'एसएमएस ग्याप विश्लेषण सर्वेक्षण पूरा गर्नुहोस् र मिनेटमै आफ्नो विस्तृत रिपोर्ट प्राप्त गर्नुहोस्।',
        cta_feature1: '५ सर्वेक्षण सत्रहरू',
        cta_feature2: '२४ प्रश्नहरू प्रत्येक',
        cta_feature3: '१५-२० मिनेट',
        cta_feature4: 'तत्काल ग्याप विश्लेषण',
        btn_text: 'तपाईंको ग्याप विश्लेषण सुरु गर्नुहोस्',
        badge_text: 'नि:शुल्क डेमो',
        
        // Contact
        contact_label: 'प्रश्नहरू? AviaSafeSystems टोलीलाई सम्पर्क गर्नुहोस्:',
        contact_availability: 'आइत-शुक्र, ९:०० AM - ६:०० PM (NPT) मा उपलब्ध',
        
        // Footer
        footer_text: 'एसएमएस ग्याप विश्लेषण प्लेटफर्म',
        footer_built: 'संग निर्मित',
        footer_nepal: 'नेपालमा',
        
        // Alerts
        alert_success: '✅ भाषा {lang} मा सेट गरियो। तपाईं अब सर्वेक्षण सुरु गर्न सक्नुहुन्छ।',
        alert_error: '⚠️ कृपया पहिले एउटा भाषा चयन गर्नुहोस्।',
        alert_loading: 'सर्वेक्षण लोड हुँदै...',

        // ===== LOGIN PAGE =====
        login_title: 'पुन: स्वागत छ',
        login_subtitle: 'आफ्नो एसएमएस ग्याप विश्लेषण यात्रा जारी राख्न साइन इन गर्नुहोस्',
        email_label: 'इमेल ठेगाना',
        email_placeholder: 'आफ्नो इमेल ठेगाना प्रविष्ट गर्नुहोस्',
        password_label: 'पासवर्ड',
        password_placeholder: 'आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्',
        login_btn: 'साइन इन गर्नुहोस्',
        back_home: 'गृहपृष्ठमा फर्कनुहोस्',
        footer_note: 'sms.aviasafesystems.com • सुरक्षित • आईसीएओ परिशिष्ट १९',
        feature1: '२४ प्रश्नहरू',
        feature2: '१२ एसएमएस तत्वहरू',
        feature3: 'प्रगति ट्र्याकिङ',
        feature4: 'ग्याप विश्लेषण',
        login_error: 'अमान्य प्रमाणहरू। कृपया पुन: प्रयास गर्नुहोस्।',
        login_success: 'लगइन सफल! पुन: निर्देशित हुँदै...',
        login_success_message: '✅ {name} लाई स्वागत छ! पुन: निर्देशित हुँदै...',
        signing_in: 'साइन इन हुँदै...',
        invalid_password: 'अमान्य पासवर्ड। कृपया पुन: प्रयास गर्नुहोस्।',
        email_not_found: 'इमेल फेला परेन। कृपया आफ्नो प्रमाणहरू जाँच गर्नुहोस्।',

        // ===== DASHBOARD PAGE =====
        dashboard_title: 'ड्यासबोर्ड - एसएमएस ग्याप विश्लेषण',
        completed_sessions: 'पूरा भएका सत्रहरू',
        current_session: 'हालको सत्र',
        questions_answered: 'उत्तर दिइएका प्रश्नहरू',
        overall_progress: 'समग्र प्रगति',
        overall_survey_progress: 'समग्र सर्वेक्षण प्रगति',
        progress_percent: '०% पूरा',
        survey_sessions: 'सर्वेक्षण सत्रहरू',
        sessions_description: 'तपाईंको व्यापक एसएमएस ग्याप विश्लेषण रिपोर्ट उत्पन्न गर्न सबै ५ सत्रहरू पूरा गर्नुहोस्। प्रत्येक सत्रमा २४ प्रश्नहरू छन् र लगभग १५-२० मिनेट लाग्छ।',
        view_report_title: 'आफ्नो ग्याप विश्लेषण रिपोर्ट हेर्नुहोस्',
        view_report_status: 'आफ्नो रिपोर्ट उत्पन्न गर्न कम्तिमा एक सत्र पूरा गर्नुहोस्।',
        view_report_btn: 'ग्याप विश्लेषण रिपोर्ट हेर्नुहोस्',
        view_report_complete: '🎉 सबै ५ सत्रहरू पूरा! आफ्नो व्यापक ग्याप विश्लेषण रिपोर्ट हेर्नुहोस्।',
        view_report_progress: '📊 ५ मध्ये {count} सत्रहरू पूरा। आफ्नो प्रगति रिपोर्ट हेर्नुहोस्।',
        view_full_report: 'पूर्ण ग्याप विश्लेषण रिपोर्ट हेर्नुहोस्',
        complete: 'पूरा',
        progress: 'प्रगति',
        logout: 'लगआउट',
        logout_confirm: 'के तपाईं पक्का लगआउट गर्न चाहनुहुन्छ?',
        complete_survey_to_generate: 'को लागि आफ्नो व्यापक एसएमएस ग्याप विश्लेषण रिपोर्ट उत्पन्न गर्न सर्वेक्षण पूरा गर्नुहोस्',
        no_data_title: 'कुनै सर्वेक्षण डाटा फेला परेन',
        no_data_desc: 'आफ्नो पहिलो सर्वेक्षण सत्र सुरु गर्न तल "सत्र सुरु गर्नुहोस्" क्लिक गर्नुहोस्।',
        session: 'सत्र',
        questions: 'प्रश्नहरू',
        not_started: 'सुरु भएको छैन',
        completed: 'पूरा भयो',
        in_progress: 'प्रगतिमा',
        ready_to_start: 'सुरु गर्न तयार',
        locked: 'तालाबन्दी',
        start_session: 'सत्र सुरु गर्नुहोस्',
        retake: 'पुन: लिनुहोस्',
        continue: 'जारी राख्नुहोस्',
        retake_confirm: 'तपाईंले पहिले नै सत्र {number} पूरा गर्नुभएको छ। के तपाईं यसलाई पुन: लिन चाहनुहुन्छ?',
        session_locked: 'यो सत्र तालाबन्दी गरिएको छ। कृपया पहिले अघिल्लो सत्रहरू पूरा गर्नुहोस्।',

        // ===== SURVEY PAGE =====
        survey_title: 'एसएमएस ग्याप विश्लेषण सर्वेक्षण',
        survey_subtitle: 'सर्वेक्षण',
        exit: 'बाहिर निस्कनुहोस्',
        progress_label: 'सर्वेक्षण प्रगति',
        question: 'प्रश्न',
        of: 'मध्ये',
        previous: 'अघिल्लो',
        next: 'अर्को',
        complete_survey: 'सर्वेक्षण पूरा गर्नुहोस्',
        sms_element: 'एसएमएस तत्व',
        selection_pending: 'चयन प्रक्रियामा। आफ्नो उत्तर सुरक्षित गर्न "अर्को" क्लिक गर्नुहोस्।',
        answer_saved: 'उत्तर सुरक्षित गरियो!',
        select_option: 'कृपया अगाडि बढ्नुअघि एउटा उत्तर चयन गर्नुहोस्।',
        please_answer_all: 'कृपया सर्वेक्षण पूरा गर्नुअघि सबै प्रश्नहरूको उत्तर दिनुहोस्।',
        remaining: 'बाँकी',
        answered: 'उत्तर दिइयो',
        exit_no_answers: 'तपाईंले कुनै पनि प्रश्नको उत्तर दिनुभएको छैन। तपाईंको प्रगति सुरक्षित गरिनेछैन।\n\nके तपाईं पक्का बाहिर निस्कन चाहनुहुन्छ?',
        exit_all_answered: 'तपाईंले सबै {total} प्रश्नहरू पूरा गर्नुभयो। तपाईंको प्रतिक्रियाहरू सुरक्षित छन्।\n\nके तपाईं पक्का बाहिर निस्कन चाहनुहुन्छ?',
        exit_partial: 'तपाईंले {count} मध्ये {total} प्रश्नहरूको उत्तर दिनुभयो। तपाईंको प्रगति सुरक्षित गरिएको छ।\n\nतपाईं पछि जारी राख्न सक्नुहुन्छ। के तपाईं पक्का बाहिर निस्कन चाहनुहुन्छ?',
        very_poor: 'धेरै कमजोर',
        poor: 'कमजोर',
        fair: 'सामान्य',
        good: 'राम्रो',
        excellent: 'उत्कृष्ट',

        // ===== THANK YOU PAGE =====
        thankyou_title: 'धन्यवाद!',
        thankyou_subtitle: 'Thank You!',
        thankyou_message: 'प्रिय मान्य साझेदार,\n\nAviaSafeSystems लाई हाम्रो एसएमएस ग्याप विश्लेषण प्लेटफर्म प्रदर्शन गर्ने अवसर प्रदान गर्नुभएकोमा हामी हार्दिक धन्यवाद दिन्छौं।\n\nयस सर्वेक्षणमा तपाईंको समय र सहभागिताले सुरक्षा उत्कृष्टता र निरन्तर सुधारप्रति तपाईंको समर्पणलाई झल्काउँछ।\n\nसँगै, हामी सुरक्षित विमानन भविष्य निर्माण गर्छौं।',
        thankyou_namaste: '🙏 नमस्ते 🙏',
        thankyou_namaste_meaning: '"मेरो भित्रको दिव्य प्रकाशले तपाईंको भित्रको दिव्य प्रकाशलाई सम्मान गरोस्।"',
        thankyou_return: 'गृहपृष्ठमा फर्कनुहोस्',
        thankyou_footer: 'AviaSafeSystems एसएमएस ग्याप विश्लेषण प्लेटफर्म',

        // ===== ADMIN PAGE =====
        admin_title: 'प्रशासक प्यानल - एसएमएस ग्याप विश्लेषण',
        admin_panel: 'प्रशासक प्यानल',
        admin_subtitle: 'सर्वेक्षण डाटा व्यवस्थापन गर्नुहोस् र नक्कली प्रतिक्रियाहरू उत्पन्न गर्नुहोस्',
        restricted: 'प्रतिबन्धित',
        admin_password: 'प्रशासक पासवर्ड',
        enter_password: 'प्रशासक पासवर्ड प्रविष्ट गर्नुहोस्',
        login: 'लगइन',
        wipe_title: 'सबै सर्वेक्षण डाटा मेट्नुहोस्',
        wipe_desc: 'स्थानीय भण्डारणबाट सबै सर्वेक्षण प्रतिक्रियाहरू, सत्रहरू, र प्रयोगकर्ता डाटा पूर्ण रूपमा हटाउनुहोस्।',
        wipe_btn: 'सबै डाटा मेट्नुहोस्',
        generate_title: 'नक्कली सर्वेक्षण प्रतिक्रियाहरू उत्पन्न गर्नुहोस्',
        generate_desc: 'बहु एयरलाइन्सहरूको लागि यथार्थवादी सर्वेक्षण प्रतिक्रियाहरू उत्पन्न गर्नुहोस्।',
        generate_btn: 'नक्कली डाटा उत्पन्न गर्नुहोस्',
        stats_title: 'डाटा तथ्याङ्क',
        stats_desc: 'कुल सत्रहरू र एयरलाइन्सहरू सहित हालको डाटा तथ्याङ्क हेर्नुहोस्।',
        stats_btn: 'तथ्याङ्क हेर्नुहोस्',
        reset_title: 'डेमो प्रयोगकर्ता रिसेट गर्नुहोस्',
        reset_desc: 'नयाँ सत्रको साथ सुरु गर्न डेमो प्रयोगकर्ता खाता रिसेट गर्नुहोस्।',
        reset_btn: 'डेमो प्रयोगकर्ता रिसेट गर्नुहोस्',
        available_airlines: 'उपलब्ध एयरलाइन्सहरू',
        admin_footer: 'एसएमएस ग्याप विश्लेषण प्रशासक प्यानल',
        back_dashboard: 'ड्यासबोर्डमा फर्कनुहोस्',
        login_success_admin: '✅ लगइन सफल! प्रशासक प्यानलमा स्वागत छ।',
        wipe_success: '✅ स्थानीय भण्डारणबाट {count} डाटा वस्तुहरू सफलतापूर्वक मेटियो।',
        generate_success: '✅ नक्कली डाटा सफलतापूर्वक उत्पन्न गरियो!',
        reset_success: '✅ डेमो प्रयोगकर्ता सफलतापूर्वक रिसेट गरियो! तपाईं अब लगइन गर्न सक्नुहुन्छ।',
        invalid_password_admin: 'अमान्य प्रमाणहरू। कृपया पुन: प्रयास गर्नुहोस्।',
        wipe_confirm1: '⚠️ चेतावनी: यसले सबै सर्वेक्षण डाटा स्थायी रूपमा मेट्नेछ!\n\nके तपाईं पक्का जारी राख्न चाहनुहुन्छ?',
        wipe_confirm2: '🔴 अन्तिम मौका: सबै डाटा स्थायी रूपमा हराउनेछ। जारी राख्ने?',
        generate_confirm: 'यसले सबै एयरलाइन्सहरूको लागि नक्कली सर्वेक्षण प्रतिक्रियाहरू उत्पन्न गर्नेछ।\n\nअवस्थित डाटा सुरक्षित रहनेछ।\n\nजारी राख्ने?',
        generating: 'उत्पन्न गर्दै...',
        generate_error: '❌ नक्कली डाटा उत्पन्न गर्दा त्रुटि: ',
        wipe_error: '❌ डाटा मेट्दा त्रुटि: ',
        reset_confirm: 'डेमो प्रयोगकर्ता खाता रिसेट गर्ने? यसले तपाईंको हालको प्रगति मेट्नेछ तर उत्पन्न डाटा रहनेछ।',
        reset_error: '❌ डेमो प्रयोगकर्ता रिसेट गर्दा त्रुटि: ',
        data_statistics: 'डाटा तथ्याङ्क',
        total_airlines: 'कुल एयरलाइन्स',
        total_sessions: 'कुल सत्रहरू',
        total_keys: 'कुल कुञ्जीहरू',
        storage_used: 'प्रयोग गरिएको भण्डारण',
        airlines: 'एयरलाइन्सहरू',
        sessions: 'सत्रहरू',
        logout_confirm_admin: 'प्रशासक प्यानलबाट लगआउट गर्ने?'
    }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function getTranslation(key, lang = 'en') {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return t[key] || key;
}

function getTranslations(lang = 'en') {
    return TRANSLATIONS[lang] || TRANSLATIONS['en'];
}

// ============================================================
// EXPORT
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TRANSLATIONS,
        getTranslation,
        getTranslations
    };
}
