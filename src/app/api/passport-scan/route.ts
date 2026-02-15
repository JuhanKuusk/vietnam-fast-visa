import { NextRequest, NextResponse } from "next/server";
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
  SWZ: "SZ", ETH: "ET", FJI: "FJ", FIN: "FI", FRA: "FR", GAB: "GA", GMB: "GM",
  GEO: "GE", DEU: "DE", GHA: "GH", GRC: "GR", GRD: "GD", GTM: "GT", GIN: "GN",
  GNB: "GW", GUY: "GY", HTI: "HT", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN",
  IDN: "ID", IRN: "IR", IRQ: "IQ", IRL: "IE", ISR: "IL", ITA: "IT", JAM: "JM",
  JPN: "JP", JOR: "JO", KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR",
  KWT: "KW", KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR",
  LBY: "LY", LIE: "LI", LTU: "LT", LUX: "LU", MDG: "MG", MWI: "MW", MYS: "MY",
  MDV: "MV", MLI: "ML", MLT: "MT", MHL: "MH", MRT: "MR", MUS: "MU", MEX: "MX",
  FSM: "FM", MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MAR: "MA", MOZ: "MZ",
  MMR: "MM", NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", NZL: "NZ", NIC: "NI",
  NER: "NE", NGA: "NG", MKD: "MK", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW",
  PAN: "PA", PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", POL: "PL", PRT: "PT",
  QAT: "QA", ROU: "RO", RUS: "RU", RWA: "RW", KNA: "KN", LCA: "LC", VCT: "VC",
  WSM: "WS", SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC",
  SLE: "SL", SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA",
  SSD: "SS", ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SWE: "SE", CHE: "CH",
  SYR: "SY", TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TLS: "TL", TGO: "TG",
  TON: "TO", TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TUV: "TV", UGA: "UG",
  UKR: "UA", ARE: "AE", GBR: "GB", USA: "US", URY: "UY", UZB: "UZ", VUT: "VU",
  VEN: "VE", VNM: "VN", YEM: "YE", ZMB: "ZM", ZWE: "ZW",
  // Additional common codes
  D: "DE", // Germany often uses D
  GBD: "GB", GBN: "GB", GBO: "GB", GBS: "GB", // UK variants
};

// Country name to code mapping for full names returned by OCR
const countryNameMap: Record<string, string> = {
  "UNITED STATES": "US", "UNITED STATES OF AMERICA": "US", "USA": "US", "AMERICA": "US",
  "UNITED KINGDOM": "GB", "GREAT BRITAIN": "GB", "BRITAIN": "GB", "ENGLAND": "GB", "UK": "GB",
  "FRANCE": "FR", "FRENCH": "FR", "FRANÇAISE": "FR", "FRANCAISE": "FR",
  "GERMANY": "DE", "GERMAN": "DE", "DEUTSCHLAND": "DE",
  "JAPAN": "JP", "JAPANESE": "JP",
  "CHINA": "CN", "CHINESE": "CN", "PEOPLE'S REPUBLIC OF CHINA": "CN",
  "AUSTRALIA": "AU", "AUSTRALIAN": "AU",
  "CANADA": "CA", "CANADIAN": "CA",
  "INDIA": "IN", "INDIAN": "IN",
  "INDONESIA": "ID", "INDONESIAN": "ID",
  "SINGAPORE": "SG", "SINGAPOREAN": "SG",
  "MALAYSIA": "MY", "MALAYSIAN": "MY",
  "THAILAND": "TH", "THAI": "TH",
  "VIETNAM": "VN", "VIETNAMESE": "VN", "VIET NAM": "VN",
  "PHILIPPINES": "PH", "PHILIPPINE": "PH", "FILIPINO": "PH",
  "SOUTH KOREA": "KR", "KOREA": "KR", "KOREAN": "KR", "REPUBLIC OF KOREA": "KR",
  "TAIWAN": "TW", "TAIWANESE": "TW",
  "HONG KONG": "HK",
  "ITALY": "IT", "ITALIAN": "IT",
  "SPAIN": "ES", "SPANISH": "ES",
  "NETHERLANDS": "NL", "DUTCH": "NL", "HOLLAND": "NL",
  "BELGIUM": "BE", "BELGIAN": "BE",
  "SWITZERLAND": "CH", "SWISS": "CH",
  "AUSTRIA": "AT", "AUSTRIAN": "AT",
  "SWEDEN": "SE", "SWEDISH": "SE",
  "NORWAY": "NO", "NORWEGIAN": "NO",
  "DENMARK": "DK", "DANISH": "DK",
  "FINLAND": "FI", "FINNISH": "FI",
  "ICELAND": "IS", "ICELANDIC": "IS",
  "IRELAND": "IE", "IRISH": "IE",
  "PORTUGAL": "PT", "PORTUGUESE": "PT",
  "GREECE": "GR", "GREEK": "GR",
  "POLAND": "PL", "POLISH": "PL",
  "RUSSIA": "RU", "RUSSIAN": "RU", "RUSSIAN FEDERATION": "RU",
  "BRAZIL": "BR", "BRAZILIAN": "BR",
  "MEXICO": "MX", "MEXICAN": "MX",
  "ARGENTINA": "AR", "ARGENTINIAN": "AR",
  "NEW ZEALAND": "NZ",
  "SOUTH AFRICA": "ZA",
  "ISRAEL": "IL", "ISRAELI": "IL",
  "TURKEY": "TR", "TURKISH": "TR",
  "SAUDI ARABIA": "SA",
  "UNITED ARAB EMIRATES": "AE", "UAE": "AE", "EMIRATES": "AE",
  "EGYPT": "EG", "EGYPTIAN": "EG",
};

interface PassportData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  dateOfIssue: string;
  issuingAuthority: string;
}

// Helper function to wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Convert country code from alpha-3 to alpha-2
const convertCountryCode = (code: string): string => {
  if (!code) return "";
  const upperCode = code.toUpperCase().trim();
  // First check ISO alpha-3 codes
  if (countryCodeMap[upperCode]) return countryCodeMap[upperCode];
  // Then check full country names
  if (countryNameMap[upperCode]) return countryNameMap[upperCode];
  // If it's already a 2-letter code, return it
  if (upperCode.length === 2) return upperCode;
  // Fallback: return empty to let user select manually
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

// Clean and normalize a potential MRZ line from OCR output
const cleanMRZLine = (line: string): string => {
  let cleaned = line.replace(/[^\x20-\x7E]/g, '').trim();
  cleaned = cleaned.replace(/\s/g, '');
  cleaned = cleaned.toUpperCase();

  // Convert common OCR misreadings
  cleaned = cleaned
    .replace(/[«»‹›<>]/g, '<')
    .replace(/[{}[\]()]/g, '<')
    .replace(/[—–_]/g, '<')
    .replace(/\|/g, 'I')
    .replace(/!/g, 'I')
    .replace(/\$/g, 'S')
    .replace(/@/g, 'A')
    .replace(/[oO]/g, '0')
    .replace(/\./g, '')
    .replace(/,/g, '');

  cleaned = cleaned.replace(/[^A-Z0-9<]/g, '');
  return cleaned;
};

// Extract MRZ lines from OCR text
const extractMRZLines = (text: string): string[] => {
  console.log("[MRZ] Processing OCR text, length:", text.length);

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const candidateLines: Array<{ cleaned: string; score: number; lineIndex: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const cleaned = cleanMRZLine(line);

    if (cleaned.length < 30) continue;

    let score = 0;

    // Position bonus (MRZ is at bottom)
    const positionFromBottom = lines.length - 1 - i;
    if (positionFromBottom < 5) score += 10;

    // Length scoring (44 chars ideal for TD3)
    if (cleaned.length >= 42 && cleaned.length <= 46) score += 15;
    else if (cleaned.length >= 38 && cleaned.length <= 48) score += 10;

    // << separator (key MRZ indicator)
    const doubleBracketCount = (cleaned.match(/<</g) || []).length;
    if (doubleBracketCount > 0) score += doubleBracketCount * 8;

    // Single < characters
    const angleCount = (cleaned.match(/</g) || []).length;
    if (angleCount >= 5) score += 5;

    // Line 1 pattern: P<
    if (/^P<[A-Z]{3}/.test(cleaned)) score += 30;
    else if (/^P</.test(cleaned)) score += 20;

    // Line 2 patterns
    const digitCount = (cleaned.match(/[0-9]/g) || []).length;
    if (digitCount >= 8 && digitCount <= 20) score += 10;
    if (/<{3,}$/.test(cleaned)) score += 10;
    if (/[A-Z]{3}[0-9]{6}/.test(cleaned)) score += 10;

    if (score >= 5) {
      candidateLines.push({ cleaned, score, lineIndex: i });
    }
  }

  candidateLines.sort((a, b) => b.score - a.score);

  console.log("[MRZ] Found", candidateLines.length, "candidates");

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

    // Normalize to 44 characters
    if (line1.length > 44) line1 = line1.substring(0, 44);
    else if (line1.length < 44) line1 = line1.padEnd(44, '<');

    if (line2.length > 44) line2 = line2.substring(0, 44);
    else if (line2.length < 44) line2 = line2.padEnd(44, '<');

    console.log("[MRZ] Final lines:", { line1, line2 });
    return [line1, line2];
  }

  return [];
};

// Extract Date of Issue from the Visual Inspection Zone (VIZ) of the passport
// The MRZ doesn't contain issue date, so we need to find it in the OCR text
const extractDateOfIssue = (fullText: string): string => {
  // Common labels for date of issue in passports (various languages)
  const issueLabels = [
    'date of issue', 'date d\'émission', 'fecha de expedición',
    'data di rilascio', 'ausstellungsdatum', 'date of issuance',
    'issued', 'issue date', 'valid from', 'date issued',
    'дата выдачи', 'ngày cấp', 'tanggal penerbitan',
  ];

  const lines = fullText.toLowerCase().split('\n');

  // Look for date patterns near issue-related labels
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hasIssueLabel = issueLabels.some(label => line.includes(label));

    if (hasIssueLabel) {
      // Check this line and the next few lines for a date
      for (let j = i; j < Math.min(i + 3, lines.length); j++) {
        const dateMatch = extractDateFromLine(lines[j]);
        if (dateMatch) {
          console.log("[DateOfIssue] Found near label:", dateMatch);
          return dateMatch;
        }
      }
    }
  }

  // Fallback: look for date patterns that could be issue dates
  // Typically issue date is before expiry date and after birth date
  const allDates: string[] = [];
  for (const line of lines) {
    const dateMatch = extractDateFromLine(line);
    if (dateMatch) {
      allDates.push(dateMatch);
    }
  }

  console.log("[DateOfIssue] All dates found:", allDates);

  // If we found multiple dates, the issue date is typically the second-to-last
  // (after birth date but before expiry date)
  // But this is unreliable, so return empty if we can't confirm
  return "";
};

// Extract a date from a text line (returns YYYY-MM-DD format or empty string)
const extractDateFromLine = (line: string): string => {
  // Pattern: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyPattern = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/;
  const dmyMatch = line.match(dmyPattern);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    const year = dmyMatch[3];
    if (parseInt(month) <= 12 && parseInt(day) <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  // Pattern: YYYY/MM/DD or YYYY-MM-DD
  const ymdPattern = /(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/;
  const ymdMatch = line.match(ymdPattern);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, '0');
    const day = ymdMatch[3].padStart(2, '0');
    if (parseInt(month) <= 12 && parseInt(day) <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  // Pattern: DD MMM YYYY or DD MMMM YYYY (e.g., "15 Jan 2020" or "15 January 2020")
  const monthNames: Record<string, string> = {
    'jan': '01', 'january': '01', 'feb': '02', 'february': '02',
    'mar': '03', 'march': '03', 'apr': '04', 'april': '04',
    'may': '05', 'jun': '06', 'june': '06', 'jul': '07', 'july': '07',
    'aug': '08', 'august': '08', 'sep': '09', 'sept': '09', 'september': '09',
    'oct': '10', 'october': '10', 'nov': '11', 'november': '11',
    'dec': '12', 'december': '12',
  };

  const namedMonthPattern = /(\d{1,2})\s+([a-z]+)\s+(\d{4})/i;
  const namedMatch = line.match(namedMonthPattern);
  if (namedMatch) {
    const day = namedMatch[1].padStart(2, '0');
    const monthName = namedMatch[2].toLowerCase();
    const year = namedMatch[3];
    const month = monthNames[monthName];
    if (month && parseInt(day) <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  return "";
};

// Google Cloud Vision API for OCR
async function scanWithGoogleVision(imageBuffer: Buffer): Promise<PassportData | null> {
  const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;

  if (!apiKey) {
    console.error("GOOGLE_CLOUD_VISION_API_KEY not configured");
    return null;
  }

  console.log("[GoogleVision] Starting OCR...");

  try {
    // Convert image buffer to base64
    const base64Image = imageBuffer.toString('base64');

    // Call Google Cloud Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Image },
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[GoogleVision] API error:", response.status, errorText);
      return null;
    }

    const result = await response.json();
    const fullText = result.responses?.[0]?.fullTextAnnotation?.text ||
                     result.responses?.[0]?.textAnnotations?.[0]?.description || '';

    console.log("[GoogleVision] OCR result:", fullText.substring(0, 500));

    if (!fullText) {
      console.error("[GoogleVision] No text detected");
      return null;
    }

    // Extract MRZ lines from the text
    const mrzLines = extractMRZLines(fullText);
    console.log("[GoogleVision] Extracted MRZ lines:", mrzLines);

    if (mrzLines.length < 2) {
      console.log("[GoogleVision] Could not find valid MRZ lines");
      return null;
    }

    // Try to parse the MRZ
    try {
      const mrzResult = parseMRZ(mrzLines, { autocorrect: true });
      console.log("[GoogleVision] MRZ parse result:", JSON.stringify(mrzResult, null, 2));

      if (!mrzResult.valid && !mrzResult.fields) {
        console.log("[GoogleVision] MRZ parsing failed");
        return null;
      }

      const fields = mrzResult.fields;

      const firstName = fields.firstName || "";
      const lastName = fields.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim().toUpperCase();

      const dateOfBirth = fields.birthDate || "";
      const passportExpiry = fields.expirationDate || "";

      // Try to extract date of issue from the VIZ (Visual Inspection Zone)
      const dateOfIssue = extractDateOfIssue(fullText);
      console.log("[GoogleVision] Extracted date of issue:", dateOfIssue);

      const passportData: PassportData = {
        fullName,
        dateOfBirth: dateOfBirth ? formatMRZDate(dateOfBirth) : "",
        gender: mapGender(fields.sex || ""),
        nationality: convertCountryCode(fields.nationality || ""),
        passportNumber: (fields.documentNumber || "").toUpperCase(),
        passportExpiry: passportExpiry ? formatMRZDate(passportExpiry) : "",
        dateOfIssue: dateOfIssue,
        issuingAuthority: convertCountryCode(fields.issuingState || ""),
      };

      console.log("[GoogleVision] Parsed passport data:", passportData);
      return passportData;

    } catch (mrzError) {
      console.error("[GoogleVision] MRZ parsing error:", mrzError);
      return null;
    }

  } catch (error) {
    console.error("[GoogleVision] Error:", error);
    return null;
  }
}

// Mindee API scanning
async function scanWithMindee(file: File, apiKey: string): Promise<{ data: PassportData | null; shouldFallback: boolean; error?: string }> {
  // Create form data for Mindee V2 API
  const mindeeFormData = new FormData();
  mindeeFormData.append("file", file);
  // Passport model ID from Mindee dashboard
  const PASSPORT_MODEL_ID = "a3176cf7-c1b4-4d42-866a-ae0c66395e34";
  mindeeFormData.append("model_id", PASSPORT_MODEL_ID);

  // Step 1: Enqueue the inference job
  console.log("Enqueueing Mindee inference job...");
  const enqueueResponse = await fetch(
    "https://api-v2.mindee.net/v2/inferences/enqueue",
    {
      method: "POST",
      headers: {
        "Authorization": apiKey,
      },
      body: mindeeFormData,
    }
  );

  if (!enqueueResponse.ok) {
    const errorText = await enqueueResponse.text();
    console.error("Mindee enqueue error:", enqueueResponse.status, errorText);

    // 402 = subscription expired - fallback to free OCR
    if (enqueueResponse.status === 402) {
      console.log("Mindee subscription expired, falling back to Tesseract.js");
      return { data: null, shouldFallback: true };
    }

    if (enqueueResponse.status === 401) {
      return {
        data: null,
        shouldFallback: true, // Try fallback on auth failure too
        error: "Passport scanning service authentication failed."
      };
    }
    if (enqueueResponse.status === 429) {
      return {
        data: null,
        shouldFallback: true, // Try fallback on rate limit
        error: "Too many requests."
      };
    }

    return {
      data: null,
      shouldFallback: true,
      error: "Could not process passport image with primary service."
    };
  }

  const enqueueResult = await enqueueResponse.json();
  console.log("Enqueue result:", JSON.stringify(enqueueResult, null, 2));

  // Get the polling URL from the response
  const pollingUrl = enqueueResult.polling_url || enqueueResult.job?.polling_url;

  if (!pollingUrl) {
    console.error("No polling URL in response:", enqueueResult);
    return { data: null, shouldFallback: true };
  }

  // Step 2: Poll for results (max 30 seconds)
  let resultUrl: string | null = null;
  const maxAttempts = 15;
  const pollInterval = 2000; // 2 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await sleep(pollInterval);

    console.log(`Polling attempt ${attempt + 1}/${maxAttempts}...`);
    const pollResponse = await fetch(pollingUrl, {
      headers: {
        "Authorization": apiKey,
      },
      redirect: "manual", // Don't auto-follow redirects
    });

    // Handle 302 redirect (job completed)
    if (pollResponse.status === 302) {
      const location = pollResponse.headers.get("Location");
      if (location) {
        resultUrl = location;
        break;
      }
    }

    if (!pollResponse.ok && pollResponse.status !== 302) {
      console.error("Poll error:", pollResponse.status);
      continue;
    }

    const pollResult = await pollResponse.json();
    const jobStatus = pollResult.job?.status || pollResult.status;
    console.log("Poll result status:", jobStatus);

    // Check if job is complete (V2 API uses capitalized status)
    if (jobStatus === "Processed") {
      resultUrl = pollResult.job?.result_url || pollResult.result_url;
      break;
    }

    // Check for failure
    if (jobStatus === "Failed") {
      const errorDetail = pollResult.job?.error?.detail || "Unknown error";
      console.error("Job failed:", errorDetail, pollResult);
      return { data: null, shouldFallback: true };
    }
  }

  if (!resultUrl) {
    return { data: null, shouldFallback: true };
  }

  // Step 3: Fetch the actual result from result_url
  console.log("Fetching result from:", resultUrl);
  const resultResponse = await fetch(resultUrl, {
    headers: {
      "Authorization": apiKey,
    },
  });

  if (!resultResponse.ok) {
    console.error("Result fetch error:", resultResponse.status);
    return { data: null, shouldFallback: true };
  }

  const result = await resultResponse.json();
  console.log("Final result:", JSON.stringify(result, null, 2));

  // Extract data from V2 API response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fields: Record<string, any> = {};

  // Try V2 format first: inference.result.fields
  if (result.inference?.result?.fields) {
    fields = result.inference.result.fields;
  }
  // Fallback to older V1 format structures
  else if (result.inference?.pages?.[0]?.prediction) {
    fields = result.inference.pages[0].prediction;
  } else if (result.document?.inference?.prediction) {
    fields = result.document.inference.prediction;
  } else if (result.inference?.prediction) {
    fields = result.inference.prediction;
  }

  console.log("Extracted fields:", JSON.stringify(fields, null, 2));

  if (!fields || Object.keys(fields).length === 0) {
    console.error("No fields found in result:", result);
    return { data: null, shouldFallback: true };
  }

  // Extract and format the data
  const getFieldValue = (field: unknown): string => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "number") return String(field);
    if (typeof field === "object" && field !== null) {
      const f = field as { value?: string | number | null; raw_value?: string };
      if (f.value !== undefined && f.value !== null) {
        return String(f.value);
      }
      if (f.raw_value) {
        return f.raw_value;
      }
    }
    return "";
  };

  // Try various field name patterns
  const givenNames = getFieldValue(fields.given_names)
    || getFieldValue(fields.given_name)
    || getFieldValue(fields.firstname)
    || getFieldValue(fields.first_name)
    || "";

  const surname = getFieldValue(fields.surnames)
    || getFieldValue(fields.surname)
    || getFieldValue(fields.lastname)
    || getFieldValue(fields.last_name)
    || getFieldValue(fields.family_name)
    || "";

  let fullName = getFieldValue(fields.full_name) || getFieldValue(fields.fullname);
  if (!fullName && (givenNames || surname)) {
    fullName = `${givenNames} ${surname}`.trim();
  }
  fullName = fullName.toUpperCase();

  const genderValue = getFieldValue(fields.gender) || getFieldValue(fields.sex) || "";

  const nationalityValue = getFieldValue(fields.issuing_country)
    || getFieldValue(fields.nationality)
    || getFieldValue(fields.country)
    || getFieldValue(fields.country_code)
    || "";

  const dateOfBirth = getFieldValue(fields.birth_date)
    || getFieldValue(fields.date_of_birth)
    || getFieldValue(fields.birthdate)
    || getFieldValue(fields.dob)
    || "";

  const passportNumber = (
    getFieldValue(fields.passport_number)
    || getFieldValue(fields.document_number)
    || getFieldValue(fields.id_number)
    || getFieldValue(fields.mrz_document_number)
    || ""
  ).toUpperCase();

  const passportExpiry = getFieldValue(fields.expiry_date)
    || getFieldValue(fields.expiration_date)
    || getFieldValue(fields.date_of_expiry)
    || "";

  const dateOfIssue = getFieldValue(fields.issue_date)
    || getFieldValue(fields.issuance_date)
    || getFieldValue(fields.date_of_issue)
    || "";

  const issuingAuthority = convertCountryCode(nationalityValue);

  const passportData: PassportData = {
    fullName,
    dateOfBirth,
    gender: mapGender(genderValue),
    nationality: convertCountryCode(nationalityValue),
    passportNumber,
    passportExpiry,
    dateOfIssue,
    issuingAuthority,
  };

  console.log("Mindee parsed passport data:", passportData);

  const hasData = passportData.fullName || passportData.passportNumber || passportData.dateOfBirth;
  if (!hasData) {
    return { data: null, shouldFallback: true };
  }

  return { data: passportData, shouldFallback: false };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, WebP, or PDF file." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer for OCR
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    let passportData: PassportData | null = null;
    let usedMethod = "unknown";

    // Check for Google Cloud Vision API key
    const googleApiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
    const mindeeApiKey = process.env.MINDEE_API_KEY;

    // Try Google Cloud Vision first (recommended - best MRZ accuracy)
    if (googleApiKey) {
      console.log("Using Google Cloud Vision API for passport scanning...");
      passportData = await scanWithGoogleVision(imageBuffer);
      usedMethod = "google_vision";
    }

    // Fallback to Mindee if Google Vision fails or is not configured
    if (!passportData && mindeeApiKey) {
      console.log("Trying Mindee API fallback...");
      const mindeeResult = await scanWithMindee(file, mindeeApiKey);
      if (mindeeResult.data) {
        passportData = mindeeResult.data;
        usedMethod = "mindee";
      }
    }

    // If no API keys configured, return error with instructions
    if (!googleApiKey && !mindeeApiKey) {
      console.error("No OCR API configured. Please set GOOGLE_CLOUD_VISION_API_KEY or MINDEE_API_KEY.");
      return NextResponse.json(
        { error: "Passport scanning service not configured. Please enter details manually." },
        { status: 503 }
      );
    }

    if (!passportData) {
      return NextResponse.json(
        { error: "Could not read passport MRZ. Please ensure the MRZ (machine readable zone at the bottom of the passport) is clearly visible and try again." },
        { status: 422 }
      );
    }

    // Check if we got any meaningful data
    const hasData = passportData.fullName || passportData.passportNumber || passportData.dateOfBirth;

    if (!hasData) {
      return NextResponse.json(
        { error: "Could not extract passport data. Please ensure the image is clear and includes the MRZ zone." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: passportData,
      method: usedMethod,
    });

  } catch (error) {
    console.error("Passport scan error:", error);

    return NextResponse.json(
      { error: "Failed to scan passport. Please try again or enter details manually." },
      { status: 500 }
    );
  }
}
