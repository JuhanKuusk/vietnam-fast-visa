// Client-side passport scanning using Tesseract.js + MRZ parsing
// This runs entirely in the browser - no server required

import { createWorker } from "tesseract.js";
import { parse as parseMRZ } from "mrz";

// Country code mapping from ISO 3166-1 alpha-3 to alpha-2
const countryCodeMap: Record<string, string> = {
  AFG: "AF", ALB: "AL", DZA: "DZ", AND: "AD", AGO: "AO", ATG: "AG", ARG: "AR",
  ARM: "AM", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD",
  BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BTN: "BT", BOL: "BO",
  BIH: "BA", BWA: "BW", BRA: "BR", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI",
  KHM: "KH", CMR: "CM", CAN: "CA", CPV: "CV", CAF: "CF", TCD: "TD", CHL: "CL",
  CHN: "CN", COL: "CO", COM: "KM", COG: "CG", COD: "CD", CRI: "CR", CIV: "CI",
  HRV: "HR", CUB: "CU", CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM",
  DOM: "DO", ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE",
  ETH: "ET", FJI: "FJ", FIN: "FI", FRA: "FR", GAB: "GA", GMB: "GM", GEO: "GE",
  DEU: "DE", GHA: "GH", GRC: "GR", GRD: "GD", GTM: "GT", GIN: "GN", GNB: "GW",
  GUY: "GY", HTI: "HT", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN", IDN: "ID",
  IRN: "IR", IRQ: "IQ", IRL: "IE", ISR: "IL", ITA: "IT", JAM: "JM", JPN: "JP",
  JOR: "JO", KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR", KWT: "KW",
  KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY",
  LIE: "LI", LTU: "LT", LUX: "LU", MKD: "MK", MDG: "MG", MWI: "MW", MYS: "MY",
  MDV: "MV", MLI: "ML", MLT: "MT", MHL: "MH", MRT: "MR", MUS: "MU", MEX: "MX",
  FSM: "FM", MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MAR: "MA", MOZ: "MZ",
  MMR: "MM", NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", NZL: "NZ", NIC: "NI",
  NER: "NE", NGA: "NG", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PAN: "PA",
  PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", POL: "PL", PRT: "PT", QAT: "QA",
  ROU: "RO", RUS: "RU", RWA: "RW", KNA: "KN", LCA: "LC", VCT: "VC", WSM: "WS",
  SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC", SLE: "SL",
  SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA", SSD: "SS",
  ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SWE: "SE", CHE: "CH", SYR: "SY",
  TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TLS: "TL", TGO: "TG", TON: "TO",
  TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TUV: "TV", UGA: "UG", UKR: "UA",
  ARE: "AE", GBR: "GB", USA: "US", URY: "UY", UZB: "UZ", VUT: "VU", VEN: "VE",
  VNM: "VN", YEM: "YE", ZMB: "ZM", ZWE: "ZW",
  // Additional common codes
  D: "DE", // Germany often uses D
  GBD: "GB", GBN: "GB", GBO: "GB", GBS: "GB", // UK variants
};

// Country name to code mapping for full names returned by OCR
const countryNameMap: Record<string, string> = {
  "UNITED STATES": "US", "UNITED STATES OF AMERICA": "US", "USA": "US",
  "UNITED KINGDOM": "GB", "GREAT BRITAIN": "GB", "BRITAIN": "GB", "UK": "GB",
  "FRANCE": "FR", "GERMANY": "DE", "DEUTSCHLAND": "DE",
  "ITALY": "IT", "ITALIA": "IT", "SPAIN": "ES", "ESPANA": "ES",
  "NETHERLANDS": "NL", "HOLLAND": "NL", "BELGIUM": "BE",
  "AUSTRALIA": "AU", "CANADA": "CA", "JAPAN": "JP",
  "CHINA": "CN", "KOREA": "KR", "SOUTH KOREA": "KR",
  "RUSSIA": "RU", "RUSSIAN FEDERATION": "RU",
  "INDIA": "IN", "INDONESIA": "ID", "MALAYSIA": "MY",
  "SINGAPORE": "SG", "THAILAND": "TH", "VIETNAM": "VN",
  "PHILIPPINES": "PH", "BRAZIL": "BR", "MEXICO": "MX",
  "POLAND": "PL", "PORTUGAL": "PT", "SWEDEN": "SE",
  "NORWAY": "NO", "DENMARK": "DK", "FINLAND": "FI",
  "AUSTRIA": "AT", "SWITZERLAND": "CH", "IRELAND": "IE",
  "NEW ZEALAND": "NZ", "SOUTH AFRICA": "ZA",
};

export interface PassportData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  dateOfIssue: string;
  issuingAuthority: string;
}

// Convert country code from alpha-3 to alpha-2
const convertCountryCode = (code: string): string => {
  if (!code) return "";
  const upperCode = code.toUpperCase().trim();
  if (countryCodeMap[upperCode]) return countryCodeMap[upperCode];
  if (countryNameMap[upperCode]) return countryNameMap[upperCode];
  if (upperCode.length === 2) return upperCode;
  return "";
};

// Map gender value to expected format
const mapGender = (gender: string): string => {
  if (!gender) return "";
  const g = gender.toUpperCase();
  if (g === "M" || g === "MALE") return "male";
  if (g === "F" || g === "FEMALE") return "female";
  return "";
};

// Format date from MRZ format (YYMMDD) to YYYY-MM-DD
const formatMRZDate = (dateStr: string): string => {
  if (!dateStr || dateStr.length !== 6) return "";
  const yy = parseInt(dateStr.substring(0, 2), 10);
  const mm = dateStr.substring(2, 4);
  const dd = dateStr.substring(4, 6);
  // Assume dates: 00-30 = 2000-2030, 31-99 = 1931-1999
  const year = yy <= 30 ? 2000 + yy : 1900 + yy;
  return `${year}-${mm}-${dd}`;
};

// Common OCR misreadings for the MRZ < character (OCRB font)
// The < in OCRB looks like a small angular chevron that can be misread as many characters
const LESS_THAN_SUBSTITUTES = [
  'K', 'X', 'Y', 'V', 'W', '4', '7', // Angular shapes
  'L', 'I', '1', 'T', 'J', // Vertical strokes
  'C', 'G', '(', ')', '[', ']', '{', '}', // Curved or bracketed shapes
  '«', '»', '‹', '›', '<', '>', // Various angle brackets
  '—', '–', '-', '_', '/', '\\', // Lines and dashes
];

// Clean and normalize a potential MRZ line
// This function tries to recover MRZ data from OCR that may have misread characters
const cleanMRZLine = (line: string): string => {
  // First, remove any non-printable characters and trim
  let cleaned = line.replace(/[^\x20-\x7E]/g, '').trim();

  // Remove spaces (MRZ should have no spaces)
  cleaned = cleaned.replace(/\s/g, '');

  // Convert to uppercase
  cleaned = cleaned.toUpperCase();

  // Convert obvious OCR errors for < character
  cleaned = cleaned
    .replace(/[«»‹›<>]/g, '<')    // Various angle brackets -> <
    .replace(/[{}[\]()]/g, '<')   // Various brackets -> <
    .replace(/[—–_]/g, '<')       // Dashes and underscores -> <
    .replace(/\|/g, 'I')          // Pipe -> I
    .replace(/!/g, 'I')           // Exclamation -> I
    .replace(/\$/g, 'S')          // $ -> S
    .replace(/@/g, 'A')           // @ -> A
    .replace(/\./g, '')           // Remove periods
    .replace(/,/g, '');           // Remove commas

  // Remove any remaining characters that are not valid MRZ (A-Z, 0-9, <)
  cleaned = cleaned.replace(/[^A-Z0-9<]/g, '');

  return cleaned;
};

// Aggressively try to recover MRZ by substituting potential < misreadings
// This is a second-pass attempt when normal cleaning fails
const aggressiveCleanMRZLine = (line: string): string => {
  let cleaned = line.replace(/[^\x20-\x7E]/g, '').trim();
  cleaned = cleaned.replace(/\s/g, '');
  cleaned = cleaned.toUpperCase();

  // Look for patterns that suggest MRZ structure
  // Pattern: 3+ same character repeated = likely << filler
  // Common: "KKKKKK" -> "<<<<<<", "IIIIII" -> "<<<<<<", etc.

  // Replace repeated characters (3+) with <<< (likely filler)
  cleaned = cleaned.replace(/([KXYVWLTIJ147])\1{2,}/g, (match) => '<'.repeat(match.length));

  // Replace double characters that might be <<
  cleaned = cleaned.replace(/KK|XX|YY|VV|WW|II|TT|JJ|LL|44|77|11/g, '<<');

  // Standard conversions
  cleaned = cleaned
    .replace(/[«»‹›<>]/g, '<')
    .replace(/[{}[\]()]/g, '<')
    .replace(/[—–_\-]/g, '<')
    .replace(/\|/g, 'I')
    .replace(/!/g, 'I')
    .replace(/\$/g, 'S')
    .replace(/@/g, 'A')
    .replace(/[oO]/g, '0')  // O -> 0 in MRZ (only in aggressive mode)
    .replace(/\./g, '')
    .replace(/,/g, '');

  // Remove any remaining invalid characters
  cleaned = cleaned.replace(/[^A-Z0-9<]/g, '');

  return cleaned;
};

// Check if a line might be MRZ (lenient check on raw line)
const mightBeMRZLine = (line: string): boolean => {
  const trimmed = line.trim();

  // Must be reasonably long (MRZ lines are 44 chars, but OCR might miss some)
  if (trimmed.length < 25) return false;

  // Count character types
  const upperCount = (trimmed.match(/[A-Z]/g) || []).length;
  const digitCount = (trimmed.match(/[0-9]/g) || []).length;
  const lowerCount = (trimmed.match(/[a-z]/g) || []).length;

  // If mostly lowercase, it's probably visual zone text (labels like "Surname", "Given names")
  if (lowerCount > upperCount) return false;

  // MRZ should have some uppercase letters
  if (upperCount < 10) return false;

  // Accept the line for further processing
  return true;
};


// Score a cleaned MRZ line candidate
const scoreMRZLine = (cleaned: string, lineIndex: number, totalLines: number): number => {
  let score = 0;

  // Bonus for being near the bottom of the text (MRZ is at bottom)
  const positionFromBottom = totalLines - 1 - lineIndex;
  if (positionFromBottom < 5) score += 10;
  else if (positionFromBottom < 10) score += 5;

  // Length scoring (44 chars is ideal for TD3 passports)
  if (cleaned.length >= 42 && cleaned.length <= 46) score += 15;
  else if (cleaned.length >= 40 && cleaned.length <= 48) score += 10;
  else if (cleaned.length >= 35) score += 5;

  // Contains << (name/field separator - THE key MRZ indicator)
  const doubleBracketCount = (cleaned.match(/<</g) || []).length;
  if (doubleBracketCount > 0) {
    score += doubleBracketCount * 8; // Strong indicator
  }

  // Single < characters also indicate MRZ
  const angleCount = (cleaned.match(/</g) || []).length;
  if (angleCount >= 5) score += 5;
  if (angleCount >= 10) score += 5;

  // Line 1 pattern: starts with P< or P followed by country code
  if (/^P<[A-Z]{3}/.test(cleaned)) score += 30;
  else if (/^P<[A-Z]{2}/.test(cleaned)) score += 25;
  else if (/^P</.test(cleaned)) score += 20;
  else if (/^P[A-Z]{3}/.test(cleaned)) score += 15;
  else if (/^[PVIACS]</.test(cleaned)) score += 10;

  // Line 2 patterns
  const digitCount = (cleaned.match(/[0-9]/g) || []).length;
  if (digitCount >= 8 && digitCount <= 20) score += 10;

  // Pattern for line 2: ends with multiple < (filler)
  if (/<{3,}$/.test(cleaned)) score += 10;

  // Check for nationality code pattern (3 uppercase letters followed by 6 digits = birth date)
  if (/[A-Z]{3}[0-9]{6}/.test(cleaned)) score += 10;

  // Passport number pattern at start (alphanumeric, 8-9 chars, followed by check digit)
  if (/^[A-Z0-9]{8,9}[0-9]/.test(cleaned)) score += 8;

  return score;
};

// Extract MRZ lines from OCR text - improved with better detection and aggressive fallback
const extractMRZLines = (text: string): string[] => {
  console.log("[MRZ] Raw OCR text:", text.substring(0, 800) + (text.length > 800 ? "..." : ""));

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  console.log("[MRZ] Total lines:", lines.length);

  // Try normal cleaning first
  let candidateLines = findMRZCandidates(lines, cleanMRZLine, "normal");

  // If we didn't find good candidates, try aggressive cleaning
  if (candidateLines.length < 2 || (candidateLines[0]?.score || 0) < 20) {
    console.log("[MRZ] Normal cleaning failed, trying aggressive cleaning...");
    const aggressiveCandidates = findMRZCandidates(lines, aggressiveCleanMRZLine, "aggressive");

    // Use aggressive results if they're better
    if (aggressiveCandidates.length >= 2 &&
        (aggressiveCandidates[0]?.score || 0) > (candidateLines[0]?.score || 0)) {
      candidateLines = aggressiveCandidates;
    }
  }

  console.log("[MRZ] Best candidates:", candidateLines.slice(0, 4).map(c => ({
    score: c.score,
    len: c.cleaned.length,
    preview: c.cleaned.substring(0, 35)
  })));

  // For TD3 passports, we need exactly 2 lines
  if (candidateLines.length >= 2) {
    const top2 = candidateLines.slice(0, 2);
    const areConsecutive = Math.abs(top2[0].lineIndex - top2[1].lineIndex) === 1;

    let line1: string, line2: string;

    if (areConsecutive) {
      if (top2[0].lineIndex < top2[1].lineIndex) {
        line1 = top2[0].cleaned;
        line2 = top2[1].cleaned;
      } else {
        line1 = top2[1].cleaned;
        line2 = top2[0].cleaned;
      }
    } else {
      const line1Candidate = top2[0].cleaned.startsWith('P') ? top2[0] : top2[1];
      const line2Candidate = top2[0].cleaned.startsWith('P') ? top2[1] : top2[0];
      line1 = line1Candidate.cleaned;
      line2 = line2Candidate.cleaned;
    }

    line1 = normalizeToMRZLength(line1);
    line2 = normalizeToMRZLength(line2);

    console.log("[MRZ] Final lines:", { line1, line2 });
    return [line1, line2];
  }

  console.log("[MRZ] Could not find 2 valid MRZ lines");
  return [];
};

// Helper function to find MRZ candidates using a given cleaning function
const findMRZCandidates = (
  lines: string[],
  cleanFn: (line: string) => string,
  mode: string
): Array<{ raw: string; cleaned: string; score: number; lineIndex: number }> => {
  const candidateLines: Array<{ raw: string; cleaned: string; score: number; lineIndex: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!mightBeMRZLine(line)) continue;

    const cleaned = cleanFn(line);
    if (cleaned.length < 30) continue;

    const score = scoreMRZLine(cleaned, i, lines.length);

    console.log(`[MRZ:${mode}] Line ${i}: score=${score}, len=${cleaned.length}, "${cleaned.substring(0, 40)}..."`);

    if (score >= 5) {
      candidateLines.push({ raw: line, cleaned, score, lineIndex: i });
    }
  }

  candidateLines.sort((a, b) => b.score - a.score);
  return candidateLines;
};

// Normalize a line to 44 characters for TD3 format
const normalizeToMRZLength = (line: string): string => {
  if (line.length > 44) {
    return line.substring(0, 44);
  } else if (line.length < 44) {
    return line.padEnd(44, '<');
  }
  return line;
};

export interface ScanResult {
  success: boolean;
  data?: PassportData;
  error?: string;
}

// Manual MRZ parsing fallback when the library fails
// TD3 passport format (2 lines of 44 characters each):
// Line 1: P<ISSUING_STATE<LAST_NAME<<FIRST_NAME<MIDDLE_NAME<<<<<<
// Line 2: PASSPORT_NUMBER<CHECK_NATIONALITY<BIRTH_DATE<CHECK_SEX<EXPIRY_DATE<CHECK_PERSONAL_NUMBER<<<<<<<<<<CHECK
const parseManualMRZ = (lines: string[]): PassportData | null => {
  console.log("[ManualMRZ] Attempting manual parse of:", lines);

  if (lines.length < 2) return null;

  // Normalize lines to 44 characters
  const line1 = lines[0].padEnd(44, '<').substring(0, 44);
  const line2 = lines[1].padEnd(44, '<').substring(0, 44);

  console.log("[ManualMRZ] Normalized lines:", { line1, line2 });

  try {
    // Parse line 1: Document type, issuing state, and name
    const docType = line1.substring(0, 1);
    const issuingState = line1.substring(2, 5).replace(/</g, '');
    const namePart = line1.substring(5);

    // Split name by << (last name << first names)
    const nameParts = namePart.split('<<');
    const lastName = (nameParts[0] || '').replace(/</g, ' ').trim();
    const firstName = (nameParts[1] || '').replace(/</g, ' ').trim();

    // Parse line 2: Passport number, nationality, birth date, sex, expiry date
    const passportNumber = line2.substring(0, 9).replace(/</g, '');
    const nationality = line2.substring(10, 13).replace(/</g, '');
    const birthDate = line2.substring(13, 19);
    const sex = line2.substring(20, 21);
    const expiryDate = line2.substring(21, 27);

    console.log("[ManualMRZ] Extracted fields:", {
      docType, issuingState, lastName, firstName,
      passportNumber, nationality, birthDate, sex, expiryDate
    });

    // Validate we got some data
    if (!passportNumber && !lastName && !firstName) {
      console.log("[ManualMRZ] No valid data extracted");
      return null;
    }

    const fullName = `${firstName} ${lastName}`.trim().toUpperCase();

    return {
      fullName,
      dateOfBirth: birthDate.length === 6 ? formatMRZDate(birthDate) : "",
      gender: mapGender(sex),
      nationality: convertCountryCode(nationality),
      passportNumber: passportNumber.toUpperCase(),
      passportExpiry: expiryDate.length === 6 ? formatMRZDate(expiryDate) : "",
      dateOfIssue: "",
      issuingAuthority: convertCountryCode(issuingState),
    };
  } catch (error) {
    console.error("[ManualMRZ] Parse error:", error);
    return null;
  }
};

// Main function to scan passport from file (client-side)
export async function scanPassport(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<ScanResult> {
  console.log("[PassportScanner] Starting client-side OCR...");

  let worker = null;
  try {
    onProgress?.(10, "Initializing OCR engine...");

    // Create Tesseract worker
    worker = await createWorker("eng", 1, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          const progress = Math.round(10 + (m.progress * 35)); // 10-45%
          onProgress?.(progress, "Reading passport...");
        }
      },
    });

    // First pass: normal OCR without character restrictions
    // Note: Tesseract.js uses default settings which work well for general OCR

    onProgress?.(20, "Processing image...");

    // First OCR pass - full text recognition
    const { data: { text: fullText } } = await worker.recognize(file);
    console.log("[PassportScanner] First pass OCR result length:", fullText.length);
    console.log("[PassportScanner] First pass text:", fullText.substring(0, 500));

    onProgress?.(50, "Analyzing MRZ zone...");

    // Try to extract MRZ lines from first pass
    let mrzLines = extractMRZLines(fullText);
    console.log("[PassportScanner] First pass MRZ lines:", mrzLines);

    // If first pass didn't find good MRZ lines, try a second pass with MRZ-focused settings
    if (mrzLines.length < 2) {
      console.log("[PassportScanner] First pass failed, trying MRZ-focused second pass...");
      onProgress?.(60, "Retrying with MRZ focus...");

      // Second pass: use character whitelist to force MRZ-like output
      // This can help when Tesseract is reading wrong characters
      await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<",
      });

      const { data: { text: mrzText } } = await worker.recognize(file);
      console.log("[PassportScanner] Second pass (MRZ-focused) result:", mrzText.substring(0, 500));

      // Try to extract MRZ from the second pass
      const mrzLinesPass2 = extractMRZLines(mrzText);
      console.log("[PassportScanner] Second pass MRZ lines:", mrzLinesPass2);

      // Use second pass results if better
      if (mrzLinesPass2.length >= 2) {
        mrzLines = mrzLinesPass2;
      }
    }

    onProgress?.(85, "Parsing MRZ data...");

    if (mrzLines.length < 2) {
      console.log("[PassportScanner] Could not find valid MRZ lines after both passes");
      return {
        success: false,
        error: "Could not find MRZ zone. Please ensure the bottom of the passport (machine-readable zone with <<< characters) is clearly visible and try again.",
      };
    }

    // Try to parse the MRZ
    let passportData: PassportData | null = null;

    try {
      const mrzResult = parseMRZ(mrzLines, { autocorrect: true });
      console.log("[PassportScanner] MRZ parse result:", JSON.stringify(mrzResult, null, 2));

      if (mrzResult.valid || mrzResult.fields) {
        const fields = mrzResult.fields;

        // Build full name from first and last names
        const firstName = fields.firstName || "";
        const lastName = fields.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim().toUpperCase();

        // Format dates
        const dateOfBirth = fields.birthDate || "";
        const passportExpiry = fields.expirationDate || "";

        passportData = {
          fullName,
          dateOfBirth: dateOfBirth ? formatMRZDate(dateOfBirth) : "",
          gender: mapGender(fields.sex || ""),
          nationality: convertCountryCode(fields.nationality || ""),
          passportNumber: (fields.documentNumber || "").toUpperCase(),
          passportExpiry: passportExpiry ? formatMRZDate(passportExpiry) : "",
          dateOfIssue: "", // MRZ doesn't contain issue date
          issuingAuthority: convertCountryCode(fields.issuingState || ""),
        };

        console.log("[PassportScanner] Parsed passport data from library:", passportData);
      }
    } catch (mrzError) {
      console.error("[PassportScanner] Library MRZ parsing error:", mrzError);
    }

    // If library parsing failed or returned no data, try manual parsing
    if (!passportData || (!passportData.fullName && !passportData.passportNumber)) {
      console.log("[PassportScanner] Trying manual MRZ parsing...");
      passportData = parseManualMRZ(mrzLines);
      if (passportData) {
        console.log("[PassportScanner] Manual parsing succeeded:", passportData);
      }
    }

    // Check if we got meaningful data
    if (!passportData) {
      return {
        success: false,
        error: "Could not parse passport MRZ. Please try with a clearer image.",
      };
    }

    const hasData = passportData.fullName || passportData.passportNumber || passportData.dateOfBirth;
    if (!hasData) {
      return {
        success: false,
        error: "Could not extract passport data. Please try with a clearer image.",
      };
    }

    onProgress?.(100, "Complete!");

    return {
      success: true,
      data: passportData,
    };

  } catch (error) {
    console.error("[PassportScanner] OCR error:", error);
    return {
      success: false,
      error: "Failed to scan passport. Please try again or enter details manually.",
    };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}
