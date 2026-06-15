#!/usr/bin/env python3
"""
Generate 20+ dummy Sita Air SMS survey responses with realistic variation.
Output: Individual JSON files in dashboard/sample_data/local_responses/
"""

import json
import random
import string
from pathlib import Path

random.seed(42)

OUTPUT_DIR = Path("dashboard/sample_data/local_responses")

QUESTION_IDS = [
    "q1_aware", "q2", "q3", "q4", "q5_spi",
    "q6", "q7", "q8", "q9", "q10",
    "q11", "q12", "q13_action_inform",
    "q14", "q15", "q16", "q17", "q18",
    "q19", "q20_corrective", "q21",
    "q22", "q23_peer", "q24_comments",
]

YES_NO_QS = {"q1_aware", "q13_action_inform"}
FREE_TEXT_QS = {"q20_corrective", "q21", "q22", "q24_comments"}
LIKERT_5_QS = [q for q in QUESTION_IDS if q not in YES_NO_QS | FREE_TEXT_QS]

CATEGORY_MAP = {
    "q1_aware": "safety_policy",
    "q2": "safety_policy",
    "q3": "safety_policy",
    "q4": "safety_policy",
    "q5_spi": "safety_policy",
    "q6": "safety_risk_mgmt",
    "q7": "safety_risk_mgmt",
    "q8": "safety_risk_mgmt",
    "q9": "safety_risk_mgmt",
    "q10": "safety_assurance",
    "q11": "safety_risk_mgmt",
    "q12": "safety_risk_mgmt",
    "q13_action_inform": "safety_assurance",
    "q14": "safety_promotion",
    "q15": "safety_promotion",
    "q16": "safety_promotion",
    "q17": "safety_promotion",
    "q18": "safety_promotion",
    "q19": "safety_assurance",
    "q20_corrective": "safety_assurance",
    "q21": "safety_promotion",
    "q22": "safety_promotion",
    "q23_peer": "safety_promotion",
    "q24_comments": "safety_assurance",
}

# Question texts for free-text context
QUESTION_TEXTS_EN = {
    "q1_aware": "I am aware of Sita Air's Safety Policy Statement.",
    "q2": "Employees at all levels are regularly informed and reminded about the Safety Policy.",
    "q3": "The Safety Policy clearly demonstrates Sita Air's commitment to safety.",
    "q4": "The Safety Policy is applicable and relevant to all employees, regardless of their role.",
    "q5_spi": "I am aware of Sita Air's safety performance targets and how we are tracking.",
    "q6": "Sita Air has an effective hazard reporting process.",
    "q7": "I feel comfortable reporting safety concerns through our process.",
    "q8": "Our hazard reporting process is easy to use.",
    "q9": "Reporting safety issues has clear value for my personal safety.",
    "q10": "I feel safe to report without fear of negative consequences.",
    "q11": "When I observe an unsafe act, I report it through the appropriate channel.",
    "q12": "I understand how risks are assessed after a hazard report is submitted.",
    "q13_action_inform": "I am informed of actions taken to address hazards I have reported.",
    "q14": "Management provides good feedback regarding safety performance.",
    "q15": "Management follows up regarding reported safety issues.",
    "q16": "Safety audits and inspections are carried out regularly.",
    "q17": "I am given sufficient training to safely perform my duties.",
    "q18": "I have access to checklists and procedures needed for my duties.",
    "q19": "I am informed of the outcomes of safety investigations.",
    "q20_corrective": "Describe corrective actions arising from safety findings.",
    "q21": "What safety improvements would you suggest?",
    "q22": "Describe a situation where safety was prioritised over productivity.",
    "q23_peer": "My colleagues take safety seriously in their day-to-day work.",
    "q24_comments": "Is there anything else you would like to report?",
}

QUESTION_TEXTS_NP = {
    "q1_aware": "म सीता एयरको सुरक्षा नीति बयानबारे जानकार छु।",
    "q2": "सबै तहका कर्मचारीहरूलाई सुरक्षा नीतिबारे नियमित रूपमा सूचित र स्मरण गराइन्छ।",
    "q3": "सुरक्षा नीतिले सीता एयरको सुरक्षाप्रति प्रतिबद्धता स्पष्ट रूपमा देखाउँछ।",
    "q4": "सुरक्षा नीति सबै कर्मचारीहरूमा लागू र सान्दर्भिक छ।",
    "q5_spi": "म सीता एयरको सुरक्षा प्रदर्शन लक्ष्यहरू र ट्र्याकिङबारे जानकार छु।",
    "q6": "सीता एयरसँग प्रभावकारी खतरा रिपोर्टिङ प्रक्रिया छ।",
    "q7": "म हाम्रो खतरा रिपोर्टिङ प्रक्रिया मार्फत सुरक्षा चिन्ताहरू रिपोर्ट गर्न सहज महसुस गर्छु।",
    "q8": "हाम्रो खतरा रिपोर्टिङ प्रक्रिया प्रयोग गर्न सजिलो छ।",
    "q9": "सुरक्षा समस्याहरू रिपोर्ट गर्नाले मेरो व्यक्तिगत सुरक्षाका लागि स्पष्ट मूल्य छ।",
    "q10": "म नकारात्मक परिणामको डर बिना कुनै पनि सुरक्षा चिन्ता रिपोर्ट गर्न सुरक्षित महसुस गर्छु।",
    "q11": "जब म कुनै असुरक्षित कार्य वा अवस्था देख्छु, म यसलाई उचित च्यानल मार्फत रिपोर्ट गर्छु।",
    "q12": "खतरा रिपोर्ट पेश गरेपछि जोखिमहरू कसरी मूल्याङ्कन र प्राथमिकता दिइन्छ भनी म बुझ्छु।",
    "q13_action_inform": "रिपोर्ट गरिएका खतराहरू सम्बोधन गर्न गरिएका कार्यहरूबारे मलाई सूचित गरिन्छ।",
    "q14": "व्यवस्थापनले सीता एयरको सुरक्षा प्रदर्शनबारे राम्रो प्रतिक्रिया दिन्छ।",
    "q15": "व्यवस्थापनले रिपोर्ट गरिएका सुरक्षा समस्याहरूमा फलोअप गर्छ।",
    "q16": "मेरो कार्यक्षेत्रमा नियमित रूपमा सुरक्षा अडिट र निरीक्षणहरू गरिन्छ।",
    "q17": "मलाई मेरा कर्तव्यहरू सक्षमतापूर्वक र सुरक्षित रूपमा पूरा गर्न पर्याप्त तालिम दिइएको छ।",
    "q18": "मेरा कर्तव्यहरू सुरक्षित रूपमा पूरा गर्न आवश्यक चेकलिस्ट र प्रक्रियाहरूमा मेरो पहुँच छ।",
    "q19": "मेरो कार्यक्षेत्रसँग सम्बन्धित सुरक्षा अनुसन्धानहरूका नतिजाहरूबारे मलाई सूचित गरिन्छ।",
    "q20_corrective": "अवलोकन गरिएका सुरक्षा निष्कर्षहरूबाट उत्पन्न सुधारात्मक कार्यहरू वर्णन गर्नुहोस्।",
    "q21": "तपाईं आफ्नो विभागको लागि के सुरक्षा सुधारहरू सुझाव दिनुहुन्छ?",
    "q22": "उत्पादकत्व भन्दा सुरक्षालाई प्राथमिकता दिइएको अवस्थाको वर्णन गर्नुहोस्।",
    "q23_peer": "मेरा सहकर्मीहरूले आफ्नो दैनिक कामलाई सुरक्षालाई गम्भीरतापूर्वक लिन्छन्।",
    "q24_comments": "के तपाइले अरु केहि रिपोर्ट गर्न चाहनुहुन्छ?",
}

FREE_TEXT_ANSWERS = {
    "q20_corrective": [
        "New PPE requirements implemented after ramp safety audit.",
        "Additional fire extinguishers installed in the hangar.",
        "Revised cargo loading checklist introduced after near-miss.",
        "Safety barriers installed around baggage conveyor.",
        "Updated fuel handling procedures after incident review.",
        "Enhanced wing walker protocol during aircraft pushback.",
        "Regular tool inventory audits implemented in maintenance.",
    ],
    "q21": [
        "More frequent safety briefings before each shift.",
        "Better communication between ground and cockpit crews.",
        "Digital reporting system for faster hazard submission.",
        "Monthly safety awards to encourage reporting.",
        "Additional training on new equipment.",
        "Improved signage in high-traffic ramp areas.",
        "Regular safety drills for emergency scenarios.",
    ],
    "q22": [
        "Stopped towing operation due to slippery conditions, delaying departure.",
        "Halted cargo loading when unsafe stacking was detected.",
        "Delayed pushback to verify engine parameters were within limits.",
        "Refused to accept damaged equipment despite schedule pressure.",
        "Paused fueling operation when a leak was suspected.",
        "Stopped aircraft servicing to address a foreign object on the ramp.",
        "Delayed takeoff to investigate unusual vibration reported by crew.",
    ],
    "q24_comments": [
        "Overall good safety culture but reporting could be simpler.",
        "Management is supportive when safety issues are raised.",
        "Would like to see more visible safety leadership.",
        "The hazard reporting app works well on mobile devices.",
        "Some colleagues still hesitate to report near-misses.",
        "Safety training this year was much better than last year.",
        "Appreciate the anonymous reporting option.",
        "More Nepali language materials would help ground staff.",
        "",
    ],
}

# 20 respondent profiles with diverse score patterns
# Each profile: (name_seed, {likert_bias, yes_no_bias, free_text_idx, language, partial})
# likert_bias: most common likert value (some optimistic, some neutral, some pessimistic)
RESPONDENT_PROFILES = [
    # (seed, likert_bias, yes_no_chance, ft_idx, lang, complete)
    (101, 4, 0.9, 0, "en", True),    # Senior manager, positive
    (102, 3, 0.7, 1, "en", True),    # Ground crew, neutral
    (103, 2, 0.4, 2, "en", True),    # New hire, skeptical
    (104, 4, 0.8, 3, "en", True),    # Safety officer, positive
    (105, 3, 0.6, 4, "en", True),    # Ramp agent, neutral
    (106, 5, 1.0, 5, "np", True),    # Veteran, very positive
    (107, 2, 0.3, 6, "en", True),    # Disgruntled, negative
    (108, 4, 0.9, 0, "en", True),    # Supervisor, positive
    (109, 3, 0.5, 1, "en", True),    # Technician, mixed
    (110, 1, 0.2, 2, "en", True),    # Fearful, very negative
    (111, 4, 0.8, 3, "en", True),    # Pilot, confident
    (112, 3, 0.6, 4, "np", True),    # Loader, neutral
    (113, 5, 0.9, 5, "en", True),    # Trainer, enthusiastic
    (114, 2, 0.4, 6, "en", True),    # Junior staff, wary
    (115, 3, 0.7, 0, "en", True),    # Dispatcher, balanced
    (116, 4, 0.8, 1, "en", True),    # Inspector, positive
    (117, 3, 0.5, 2, "en", False),   # Part-time, partial (last 4 missing)
    (118, 2, 0.3, 3, "np", True),    # Cleaner, low trust
    (119, 4, 0.9, 4, "en", True),    # Engineer, confident
    (120, 5, 1.0, 5, "en", True),    # Department head, best scores
    (121, 3, 0.6, 6, "en", True),    # Agent, average
    (122, 2, 0.4, 0, "en", True),    # Seasonal hire, low
    (123, 4, 0.7, 1, "np", True),    # Nepali speaker, positive
    (124, 1, 0.2, 2, "en", False),   # Very negative, partial (stops at q15)
    (125, 5, 1.0, 3, "en", True),    # Idealist, all best
]


def generate_response(seed, bias, yes_no_chance, ft_idx, lang, complete):
    rng = random.Random(seed)

    q10_override = None  # Special case for just-culture exposure

    # Some respondents get a deliberately low q10 (fear of consequences)
    if seed % 7 == 0:
        q10_override = 1  # Strongly Disagree => 0%
    elif seed % 11 == 0:
        q10_override = 2  # Disagree => 25%

    responses = []
    for qid in QUESTION_IDS:
        if qid in YES_NO_QS:
            answer = "yes" if rng.random() < yes_no_chance else "no"
        elif qid in FREE_TEXT_QS:
            pool = FREE_TEXT_ANSWERS[qid]
            answer = pool[ft_idx % len(pool)]
        else:
            # Likert 1-5, biased around the given value
            # Add some jitter: 70% chance of bias value, 30% spread
            if qid == "q10" and q10_override is not None:
                val = q10_override
            else:
                if rng.random() < 0.65:
                    val = bias
                else:
                    # Spread: bias-1, bias, bias+1, clamped
                    val = bias + rng.choice([-1, 0, 1])
                    val = max(1, min(5, val))
            answer = str(val)

        responses.append({
            "questionId": qid,
            "answer": answer,
        })

    # For partial responses, truncate
    if not complete:
        cutoff = rng.randint(12, 18)
        responses = responses[:cutoff]

    return responses


def generate_timestamp(seed):
    base = 1715000000000  # May 2024
    offset = seed * 9371  # Stagger times
    return base + offset


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for profile in RESPONDENT_PROFILES:
        seed, bias, yes_no_chance, ft_idx, lang, complete = profile
        responses = generate_response(seed, bias, yes_no_chance, ft_idx, lang, complete)
        rid = f"resp_{seed}"

        timestamps = {
            "resp_101": "2026-03-12T09:15:00.000Z",
            "resp_102": "2026-03-12T10:30:00.000Z",
            "resp_103": "2026-03-13T08:45:00.000Z",
            "resp_104": "2026-03-13T11:00:00.000Z",
            "resp_105": "2026-03-14T07:30:00.000Z",
            "resp_106": "2026-03-14T14:20:00.000Z",
            "resp_107": "2026-03-15T09:10:00.000Z",
            "resp_108": "2026-03-15T10:50:00.000Z",
            "resp_109": "2026-03-16T08:00:00.000Z",
            "resp_110": "2026-03-16T13:40:00.000Z",
            "resp_111": "2026-03-17T07:55:00.000Z",
            "resp_112": "2026-03-17T09:30:00.000Z",
            "resp_113": "2026-03-18T10:15:00.000Z",
            "resp_114": "2026-03-18T11:45:00.000Z",
            "resp_115": "2026-03-19T08:20:00.000Z",
            "resp_116": "2026-03-19T14:00:00.000Z",
            "resp_117": "2026-03-20T09:05:00.000Z",
            "resp_118": "2026-03-20T10:35:00.000Z",
            "resp_119": "2026-03-21T07:40:00.000Z",
            "resp_120": "2026-03-21T11:50:00.000Z",
            "resp_121": "2026-03-22T08:30:00.000Z",
            "resp_122": "2026-03-22T13:15:00.000Z",
            "resp_123": "2026-04-01T09:00:00.000Z",
            "resp_124": "2026-04-02T10:10:00.000Z",
            "resp_125": "2026-04-03T08:50:00.000Z",
        }
        ts = timestamps.get(rid, "2026-03-15T12:00:00.000Z")

        payload = {
            "responseId": rid,
            "completedAt": ts,
            "language": lang,
            "responses": responses,
        }

        path = OUTPUT_DIR / f"sms_response_{seed}.json"
        with open(path, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2, ensure_ascii=False)

    print(f"Generated {len(RESPONDENT_PROFILES)} dummy response files in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
