#!/usr/bin/env python3
"""
SMS Survey — Data Export Utility

Purpose: Convert JSON survey responses to CSV with Nepali Unicode integrity
Compliance: Compatible with dashboard/test_analyzer.py input requirements
Encoding: UTF-8 with BOM (utf-8-sig) for Excel/Google Sheets compatibility

Usage:
    python utils/data_export.py
    python utils/data_export.py --input responses.json
    python utils/data_export.py --input ./local_responses/ --output data.csv
    python utils/data_export.py --input ./local_responses/ --output all_data.csv --summary
    python utils/data_export.py --input responses.json --anonymize --output anon_data.csv

Default input: dashboard/sample_data/local_responses/ (auto-detected if exists with JSON files)

Input: Single JSON file or directory of sms_response_*.json files
Output: Consolidated flat CSV matrix with question columns + categories
Fallback: Processes any .json files if sms_response_*.json pattern yields no matches

Dependencies: Python 3.8+ standard library only (os, json, csv, glob, argparse, sys, pathlib)
"""

import argparse
import csv
import glob
import json
import os
import sys
import time
from pathlib import Path


# ── Console Unicode (Windows) ──────────────────────────────────────────

def _ensure_utf8():
    """Configure stdout/stderr for UTF-8 on Windows consoles."""
    if sys.platform == "win32":
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
            sys.stderr.reconfigure(encoding="utf-8")
        elif hasattr(sys.stdout, "buffer"):
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
            sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")


_ensure_utf8()


# ── Constants ──────────────────────────────────────────────────────────

DEFAULT_OUTPUT = "dashboard/sample_data/consolidated_sms_matrix.csv"
LOG_PREFIX = "[SMS Export]"
GLOB_PATTERN = "sms_response_*.json"

QUESTION_IDS = [
    "q1_aware", "q2", "q3", "q4", "q5_spi",
    "q6", "q7", "q8", "q9", "q10",
    "q11", "q12", "q13_action_inform",
    "q14", "q15", "q16", "q17", "q18",
    "q19", "q20_corrective", "q21",
    "q22", "q23_peer", "q24_comments",
]

# Maps question_id -> (type, question_en, question_np)
QUESTION_SCHEMA = {
    "q1_aware": ("yes_no", "I am aware of Sita Air's Safety Policy Statement.", "म सीता एयरको सुरक्षा नीति बयानबारे जानकार छु।"),
    "q2": ("likert_5", "Employees at all levels are regularly informed and reminded about the Safety Policy.", "सबै तहका कर्मचारीहरूलाई सुरक्षा नीतिबारे नियमित रूपमा सूचित र स्मरण गराइन्छ।"),
    "q3": ("likert_5", "The Safety Policy clearly demonstrates Sita Air's commitment to safety.", "सुरक्षा नीतिले सीता एयरको सुरक्षाप्रति प्रतिबद्धता स्पष्ट रूपमा देखाउँछ।"),
    "q4": ("likert_5", "The Safety Policy is applicable and relevant to all employees.", "सुरक्षा नीति सबै कर्मचारीहरूमा लागू र सान्दर्भिक छ।"),
    "q5_spi": ("likert_5", "I am aware of Sita Air's safety performance targets and tracking.", "म सीता एयरको सुरक्षा प्रदर्शन लक्ष्यहरू र ट्र्याकिङबारे जानकार छु।"),
    "q6": ("likert_5", "Sita Air has an effective hazard reporting process.", "सीता एयरसँग प्रभावकारी खतरा रिपोर्टिङ प्रक्रिया छ।"),
    "q7": ("likert_5", "I feel comfortable reporting safety concerns through our hazard reporting process.", "म हाम्रो खतरा रिपोर्टिङ प्रक्रिया मार्फत सुरक्षा चिन्ताहरू रिपोर्ट गर्न सहज महसुस गर्छु।"),
    "q8": ("likert_5", "Our hazard reporting process is easy to use.", "हाम्रो खतरा रिपोर्टिङ प्रक्रिया प्रयोग गर्न सजिलो छ।"),
    "q9": ("likert_5", "Reporting safety issues has clear value for my personal safety.", "सुरक्षा समस्याहरू रिपोर्ट गर्नाले मेरो व्यक्तिगत सुरक्षाका लागि स्पष्ट मूल्य छ।"),
    "q10": ("likert_5", "I feel safe to report any safety concern without fear of negative consequences.", "म नकारात्मक परिणामको डर बिना कुनै पनि सुरक्षा चिन्ता रिपोर्ट गर्न सुरक्षित महसुस गर्छु।"),
    "q11": ("likert_5", "When I observe an unsafe act or condition, I report it through the appropriate channel.", "जब म कुनै असुरक्षित कार्य वा अवस्था देख्छु, म यसलाई उचित च्यानल मार्फत रिपोर्ट गर्छु।"),
    "q12": ("likert_5", "I understand how risks are assessed and prioritised after a hazard report is submitted.", "खतरा रिपोर्ट पेश गरेपछि जोखिमहरू कसरी मूल्याङ्कन र प्राथमिकता दिइन्छ भनी म बुझ्छु।"),
    "q13_action_inform": ("yes_no", "I am informed of the actions taken to address hazards I have reported.", "रिपोर्ट गरिएका खतराहरू सम्बोधन गर्न गरिएका कार्यहरूबारे मलाई सूचित गरिन्छ।"),
    "q14": ("likert_5", "Management provides good feedback regarding Sita Air's safety performance.", "व्यवस्थापनले सीता एयरको सुरक्षा प्रदर्शनबारे राम्रो प्रतिक्रिया दिन्छ।"),
    "q15": ("likert_5", "Management follows up regarding safety issues that have been reported.", "व्यवस्थापनले रिपोर्ट गरिएका सुरक्षा समस्याहरूमा फलोअप गर्छ।"),
    "q16": ("likert_5", "Safety audits and inspections are carried out regularly in my work area.", "मेरो कार्यक्षेत्रमा नियमित रूपमा सुरक्षा अडिट र निरीक्षणहरू गरिन्छ।"),
    "q17": ("likert_5", "I am given sufficient training to competently and safely perform my duties.", "मलाई मेरा कर्तव्यहरू सक्षमतापूर्वक र सुरक्षित रूपमा पूरा गर्न पर्याप्त तालिम दिइएको छ।"),
    "q18": ("likert_5", "I have access to the checklists and procedures needed to complete my duties safely.", "मेरा कर्तव्यहरू सुरक्षित रूपमा पूरा गर्न आवश्यक चेकलिस्ट र प्रक्रियाहरूमा मेरो पहुँच छ।"),
    "q19": ("likert_5", "I am informed of the outcomes of safety investigations relevant to my work area.", "मेरो कार्यक्षेत्रसँग सम्बन्धित सुरक्षा अनुसन्धानहरूका नतिजाहरूबारे मलाई सूचित गरिन्छ।"),
    "q20_corrective": ("free_text", "Describe corrective actions arising from safety findings you have observed.", "अवलोकन गरिएका सुरक्षा निष्कर्षहरूबाट उत्पन्न सुधारात्मक कार्यहरू वर्णन गर्नुहोस्।"),
    "q21": ("free_text", "What safety improvements would you suggest for your department?", "तपाईं आफ्नो विभागको लागि के सुरक्षा सुधारहरू सुझाव दिनुहुन्छ?"),
    "q22": ("free_text", "Describe a situation where safety was prioritised over productivity.", "उत्पादकत्व भन्दा सुरक्षालाई प्राथमिकता दिइएको अवस्थाको वर्णन गर्नुहोस्।"),
    "q23_peer": ("likert_5", "My colleagues take safety seriously in their day-to-day work.", "मेरा सहकर्मीहरूले आफ्नो दैनिक कामलाई सुरक्षालाई गम्भीरतापूर्वक लिन्छन्।"),
    "q24_comments": ("free_text", "Is there anything else you would like to report?", "के तपाइले अरु केहि रिपोर्ट गर्न चाहनुहुन्छ?"),
}

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


# ── Input Detection ───────────────────────────────────────────────────

def detect_input_type(path):
    """Return 'file', 'directory', or 'invalid'. Validates path exists."""
    p = Path(path)
    if not p.exists():
        return "invalid"
    if p.is_file():
        return "file"
    if p.is_dir():
        return "directory"
    return "invalid"


def find_response_files(dirpath, pattern=GLOB_PATTERN):
    """Scan directory for JSON response files using glob pattern.

    Falls back to all .json files if no matches found.
    Returns sorted list of file paths.
    """
    p = Path(dirpath)
    if not p.is_dir():
        return []

    matches = sorted(p.glob(pattern))
    if matches:
        return matches

    fallback = sorted(p.glob("*.json"))
    if fallback:
        print(f"{LOG_PREFIX} No files matched '{pattern}' — scanning all .json files instead",
              file=sys.stderr)
    return fallback


# ── JSON Loading ──────────────────────────────────────────────────────

def _get_key(obj, *aliases):
    """Get a value from dict using any of the provided key aliases."""
    for key in aliases:
        val = obj.get(key)
        if val is not None:
            return val
        # camelCase fallback: try matching with underscores or lower case
        for k, v in obj.items():
            if k.lower().replace("-", "").replace("_", "") == key.lower().replace("-", "").replace("_", ""):
                return v
    return ""


def load_json_file(filepath):
    """Load and validate single JSON file.

    Handles both single response, batch array, and flat formats.
    Returns parsed dict or raises on fatal error.
    """
    with open(filepath, "r", encoding="utf-8-sig") as f:
        data = json.load(f)
    return data


def is_batch_list(obj):
    """True if obj is a list of response objects."""
    return isinstance(obj, list) and len(obj) > 0 and isinstance(obj[0], dict)


def is_flat_response(obj):
    """True if obj is a dict with responseId and question-keyed answers (q01, q02...)."""
    if not isinstance(obj, dict):
        return False
    has_id = bool(_get_key(obj, "responseId", "response_id", "id"))
    has_question_keys = any(k.startswith("q") and k[1:].lstrip("0").isdigit() for k in obj if isinstance(k, str))
    return has_id and has_question_keys


def is_nested_response(obj):
    """True if obj is a dict with responseId and a responses list."""
    if not isinstance(obj, dict):
        return False
    rid = _get_key(obj, "responseId", "response_id", "id")
    responses = obj.get("responses")
    return bool(rid) and isinstance(responses, list)


# ── Flattening (Nested → Pivot Matrix) ────────────────────────────────

def extract_response_meta(obj):
    """Extract metadata fields from a response object (handles camelCase + snake_case)."""
    return {
        "response_id": str(_get_key(obj, "responseId", "response_id", "id", "participantId") or ""),
        "completed_at": str(_get_key(obj, "completedAt", "completed_at", "completion_timestamp", "export_timestamp", "timestamp", "date") or ""),
        "language": str(_get_key(obj, "languageUsed", "language_used", "respondent_language", "language") or ""),
    }


def flatten_nested(obj):
    """Flatten a nested response object into a single row dict.

    Input format (app.js):
      { responseId, surveyVersion, completedAt, languageUsed,
        responses: [{ questionId, answer, timestamp, category, languageUsed }] }

    Returns a single dict with columns:
      response_id, completed_at, language, q01, q01_category, q02, q02_category, ...
    """
    row = extract_response_meta(obj)

    # Build answer + category map from the responses array
    answer_map = {}
    category_map = {}
    for entry in obj.get("responses", []):
        qid = str(_get_key(entry, "questionId", "question_id", "id") or "")
        ans = str(_get_key(entry, "answer") or "")
        cat = str(_get_key(entry, "category") or "")
        if qid:
            answer_map[qid] = ans
            if cat:
                category_map[qid] = cat

    # Populate question columns
    for qid in QUESTION_IDS:
        row[qid] = answer_map.get(qid, "")
        cat = category_map.get(qid) or CATEGORY_MAP.get(qid, "")
        row[f"{qid}_category"] = cat

    return row


def flatten_flat(obj):
    """Flatten a flat-format response object.

    Input format:
      { responseId: "...", q01: "4", q02: "5", ... }

    Returns a single row dict.
    """
    row = extract_response_meta(obj)

    for qid in QUESTION_IDS:
        # Try exact key, then with stripped q prefix
        raw = obj.get(qid, "")
        if not raw:
            raw = obj.get(qid.replace("q", "question_", 1), "")
        row[qid] = str(raw) if raw else ""
        row[f"{qid}_category"] = CATEGORY_MAP.get(qid, "")

    return row


def flatten_object(obj):
    """Auto-detect object format and flatten to a single row."""
    if is_flat_response(obj):
        return flatten_flat(obj)
    if is_nested_response(obj):
        return flatten_nested(obj)
    # Try nested fallback (has 'responses' key with list)
    if isinstance(obj, dict) and "responses" in obj and isinstance(obj["responses"], list):
        return flatten_nested(obj)
    raise ValueError("Unrecognised response object format")


# ── File Processing ──────────────────────────────────────────────────

def process_file(filepath):
    """Load and flatten a single JSON file into a list of row dicts.

    Returns list of row dicts on success.
    Raises ValueError on unrecognised format.
    """
    data = load_json_file(filepath)

    # Batch list: [{...}, {...}]
    if is_batch_list(data):
        return [flatten_object(item) for item in data]

    # Single response object
    if isinstance(data, dict):
        return [flatten_object(data)]

    raise ValueError(f"Unexpected JSON structure (type: {type(data).__name__})")


def load_json_directory(dirpath):
    """Load all JSON files from directory with per-file error handling.

    Skips invalid files, logs warnings, continues processing.
    Returns (rows, skipped_count) tuple.
    """
    files = find_response_files(dirpath)
    print(f"{LOG_PREFIX} Scanning for survey response files...", file=sys.stderr)
    print(f"{LOG_PREFIX} Found {len(files)} JSON files in {dirpath}/", file=sys.stderr)

    all_rows = []
    skipped = 0
    for fp in files:
        print(f"{LOG_PREFIX} Processing: {fp.name}", file=sys.stderr)
        try:
            rows = process_file(fp)
            all_rows.extend(rows)
        except (json.JSONDecodeError, ValueError, OSError, KeyError) as exc:
            reason = str(exc)
            if hasattr(exc, "__class__"):
                reason = f"{exc.__class__.__name__}: {exc}"
            print(f"{LOG_PREFIX} Skipping invalid file: {fp.name} — {reason}", file=sys.stderr)
            skipped += 1
            continue

    return all_rows, skipped


# ── CSV Writing (Pivot Matrix) ────────────────────────────────────────

def build_fieldnames():
    """Build the full list of CSV column headers."""
    fields = ["response_id", "completed_at", "language"]
    for qid in QUESTION_IDS:
        fields.append(qid)
        fields.append(f"{qid}_category")
    return fields


def write_csv(data, output_path, fieldnames=None):
    """Write flattened data to CSV with utf-8-sig encoding.

    Creates output directory if it doesn't exist.
    """
    if fieldnames is None:
        fieldnames = build_fieldnames()

    out = Path(output_path)
    parent = out.parent
    if parent and not parent.exists():
        parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(data)

    print(f"{LOG_PREFIX} Successfully compiled {len(data)} total records into {output_path}",
          file=sys.stderr)
    print(f"{LOG_PREFIX} Encoding: UTF-8 with BOM (Excel compatible)", file=sys.stderr)


# ── Tall Format (test_analyzer.py compatibility) ──────────────────────

TALL_FIELDS = [
    "response_id", "completed_at", "language", "survey_version",
    "question_id", "category", "type", "question_en", "question_np",
    "answer",
]


def pivot_to_tall(pivot_rows):
    """Convert pivot matrix rows to tall format rows.

    Each pivot row becomes up to N tall rows (one per question).
    Output schema matches what test_analyzer.py expects.
    """
    tall_rows = []
    for prow in pivot_rows:
        for qid in QUESTION_IDS:
            answer = prow.get(qid, "")
            category = prow.get(f"{qid}_category", "") or CATEGORY_MAP.get(qid, "")
            qtype, qen, qnp = QUESTION_SCHEMA.get(qid, ("", "", ""))
            tall_rows.append({
                "response_id": prow.get("response_id", ""),
                "completed_at": prow.get("completed_at", ""),
                "language": prow.get("language", ""),
                "survey_version": "",
                "question_id": qid,
                "category": category,
                "type": qtype,
                "question_en": qen,
                "question_np": qnp,
                "answer": answer,
            })
    return tall_rows


def write_csv_tall(pivot_data, output_path):
    """Convert pivot data to tall rows and write CSV with utf-8-sig."""
    tall_rows = pivot_to_tall(pivot_data)
    out = Path(output_path)
    parent = out.parent
    if parent and not parent.exists():
        parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=TALL_FIELDS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(tall_rows)

    print(f"{LOG_PREFIX} Successfully compiled {len(tall_rows)} tall rows into {output_path}",
          file=sys.stderr)
    print(f"{LOG_PREFIX} Encoding: UTF-8 with BOM (Excel compatible)", file=sys.stderr)


# ── Anonymization ──────────────────────────────────────────────────────

def anonymize_data(data):
    """Strip PII metadata from response records.

    Replaces responseId with sequential RESP_001, RESP_002...
    Truncates completedAt to date only (YYYY-MM-DD).
    """
    cleaned = []
    for i, row in enumerate(data, start=1):
        new_row = dict(row)
        new_row["response_id"] = f"RESP_{i:03d}"
        ts = new_row.get("completed_at", "")
        if ts and len(ts) >= 10:
            new_row["completed_at"] = ts[:10]
        cleaned.append(new_row)
    return cleaned


# ── Summary Statistics ────────────────────────────────────────────────

def generate_summary(data, files_scanned, files_skipped, output_path):
    """Generate human-readable summary string with statistics."""
    total = len(data)
    complete = 0
    partial = 0
    lang_counts = {}

    for row in data:
        lang = row.get("language", "unknown")
        lang_counts[lang] = lang_counts.get(lang, 0) + 1

        answered = sum(1 for qid in QUESTION_IDS if row.get(qid, "").strip())
        if answered >= len(QUESTION_IDS):
            complete += 1
        else:
            partial += 1

    lines = []
    lines.append("=== SMS Survey Export Summary ===")
    lines.append(f"Total files scanned: {files_scanned}")
    lines.append(f"Valid files processed: {files_scanned - files_skipped}")
    lines.append(f"Skipped (invalid): {files_skipped}")
    lines.append(f"Total responses compiled: {total}")
    if total > 0:
        pct = round(complete / total * 100, 1)
        lines.append(f"Complete surveys (all {len(QUESTION_IDS)} questions): {complete} ({pct}%)")
        lines.append(f"Partial surveys: {partial} ({round(partial / total * 100, 1)}%)")
    lines.append("Language breakdown:")
    for lang in sorted(lang_counts):
        pct = round(lang_counts[lang] / total * 100, 1) if total else 0
        label = {"en": "English", "np": "Nepali"}.get(lang, lang)
        lines.append(f"  - {label} ({lang}): {lang_counts[lang]} ({pct}%)")
    lines.append(f"Output file: {output_path}")
    lines.append(f"Rows written: {total}")
    ncols = len(build_fieldnames())
    lines.append(f"Columns: {ncols} ({len(QUESTION_IDS)} answers + {len(QUESTION_IDS)} categories + 3 metadata)")
    lines.append("Use --pivot for pivot matrix format")
    lines.append("Encoding: UTF-8 with BOM (Excel compatible)")
    return "\n".join(lines)


# ── CLI ────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="SMS Survey Data Exporter — JSON to CSV with Nepali Unicode support",
    )
    parser.add_argument(
        "--input",
        default=None,
        help="Path to JSON file or directory (default: dashboard/sample_data/local_responses/)",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help=f"Path for CSV output (default: {DEFAULT_OUTPUT})",
    )
    parser.add_argument(
        "--anonymize",
        action="store_true",
        help="Strip potentially identifying metadata fields",
    )
    parser.add_argument(
        "--pivot",
        action="store_true",
        help="Output pivot matrix format (one column per question) instead of default tall format",
    )
    parser.add_argument(
        "--summary",
        action="store_true",
        help="Print summary statistics to console after export",
    )
    args = parser.parse_args()

    if args.input is None:
        default_dir = Path("dashboard/sample_data/local_responses")
        if default_dir.exists() and any(default_dir.glob("*.json")):
            args.input = str(default_dir)
        else:
            print(f"{LOG_PREFIX} No input specified. Place sms_response_*.json files in:")
            print(f"{LOG_PREFIX}   {default_dir.absolute()}")
            print(f"{LOG_PREFIX} Or specify with: python utils/data_export.py --input <path>")
            sys.exit(0)

    input_type = detect_input_type(args.input)
    if input_type == "invalid":
        print(f"Error: input path does not exist: {args.input}", file=sys.stderr)
        sys.exit(1)

    all_rows = []
    files_scanned = 0
    files_skipped = 0

    if input_type == "file":
        files_scanned = 1
        print(f"{LOG_PREFIX} Processing single file: {args.input}", file=sys.stderr)
        try:
            all_rows = process_file(Path(args.input))
        except (json.JSONDecodeError, ValueError, OSError, KeyError) as exc:
            print(f"{LOG_PREFIX} Skipping invalid file: {Path(args.input).name} — {exc}", file=sys.stderr)
            files_skipped = 1

    elif input_type == "directory":
        all_rows, files_skipped = load_json_directory(args.input)
        files_scanned = len(find_response_files(args.input))

    if not all_rows:
        print(f"{LOG_PREFIX} No data rows extracted. Nothing to write.", file=sys.stderr)
        sys.exit(0)

    if args.anonymize:
        all_rows = anonymize_data(all_rows)

    if args.pivot:
        write_csv(all_rows, args.output)
    else:
        write_csv_tall(all_rows, args.output)

    if args.summary:
        summary = generate_summary(all_rows, files_scanned, files_skipped, args.output)
        print(file=sys.stderr)
        print(summary, file=sys.stderr)
        print(file=sys.stderr)


if __name__ == "__main__":
    main()
