<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Sita Air | ICAO SMS Safety Survey</title>
    <meta name="description" content="ICAO Annex 19 compliant Safety Management System Survey">
    
    <!-- Supabase SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    
    <!-- Application Scripts -->
    <script src="config.js"></script>
    <script src="translations.js"></script>
    <script src="default_questions.js"></script>
    <script src="app.js"></script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            min-height: 100vh;
        }
        
        /* Landing Page */
        .landing {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .landing-card {
            background: white;
            border-radius: 32px;
            padding: 48px 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .landing-logo {
            width: 80px;
            margin-bottom: 24px;
        }
        
        .landing h1 {
            font-size: 28px;
            color: #0D1B4A;
            margin-bottom: 12px;
        }
        
        .landing-subtitle {
            color: #D4A017;
            font-weight: 600;
            margin-bottom: 24px;
        }
        
        .landing-description {
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 32px;
            text-align: left;
        }
        
        .btn-start {
            background: linear-gradient(135deg, #0D1B4A, #1A2D6D);
            color: white;
            border: none;
            padding: 16px 48px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .btn-start:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(13,27,74,0.3);
        }
        
        .footer-note {
            margin-top: 32px;
            font-size: 12px;
            color: #94a3b8;
        }
        
        .hidden {
            display: none !important;
        }
        
        /* Leave Modal */
        .leave-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .leave-modal {
            background: white;
            border-radius: 24px;
            padding: 32px;
            max-width: 400px;
            text-align: center;
        }
        
        .leave-actions {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-top: 24px;
        }
        
        .leave-actions button {
            padding: 10px 24px;
            border-radius: 40px;
            border: none;
            cursor: pointer;
            font-weight: 600;
        }
        
        .btn-leave-stay { background: #e2e8f0; }
        .btn-leave-leave { background: #dc2626; color: white; }
        
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0D1B4A;
            color: white;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
            border: none;
            font-size: 20px;
        }
        
        .scroll-top.visible { opacity: 1; }
    </style>
</head>
<body>
    <div id="landing" class="landing">
        <div class="landing-card">
            <img src="logo.png" alt="Sita Air" class="landing-logo" onerror="this.style.display='none'">
            <h1>Sita Air</h1>
            <div class="landing-subtitle">Anonymous Safety Culture Assessment<br>Aligned with ICAO Annex 19 & Doc 9859</div>
            <button class="btn-start" id="landing-start-btn">Begin Survey / सर्वेक्षण सुरु गर्नुहोस्</button>
            <div class="landing-description">
                <h3 style="margin: 20px 0 10px">About This Survey</h3>
                <p>This Safety Culture Survey is designed to assess the safety climate within your organization. Your honest responses will help identify strengths and areas for improvement in our safety management system.</p>
                <p style="margin-top: 16px; font-size: 13px; color: #64748b;">⏱️ Time to complete: 5-7 minutes | 27 questions | Anonymous</p>
            </div>
            <div class="footer-note">
                Your responses are anonymous and stored securely. This survey implements ICAO Annex 19 principles.
            </div>
        </div>
    </div>

    <div id="sms-survey-root" class="hidden"></div>
    
    <div id="leave-overlay" class="leave-overlay hidden">
        <div class="leave-modal">
            <h3>Exit Survey?</h3>
            <p>Your progress will be saved. You can continue later.</p>
            <div class="leave-actions">
                <button class="btn-leave-stay" id="leave-stay-btn">Continue Survey</button>
                <button class="btn-leave-leave" id="leave-leave-btn">Exit to Home</button>
            </div>
        </div>
    </div>
    
    <button class="scroll-top" id="scroll-top-btn">↑</button>
</body>
</html>
