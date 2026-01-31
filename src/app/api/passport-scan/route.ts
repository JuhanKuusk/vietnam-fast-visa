import { NextRequest, NextResponse } from "next/server";
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

// Extract MRZ lines from OCR text
const extractMRZLines = (text: string): string[] => {
  const lines = text.split('\n').map(line => line.trim());
  const mrzLines: string[] = [];

  for (const line of lines) {
    // MRZ lines are typically 30, 36, or 44 characters and contain mostly uppercase letters, digits, and <
    // Clean the line first - remove spaces and common OCR mistakes
    const cleaned = line
      .replace(/\s/g, '')
      .replace(/[oO]/g, '0') // Common OCR mistake: O -> 0 in numeric contexts
      .toUpperCase();

    // Check if it looks like an MRZ line (contains < and is the right length)
    if (cleaned.length >= 28 && cleaned.length <= 46 && cleaned.includes('<')) {
      // Additional check: should be mostly alphanumeric and <
      const validChars = cleaned.replace(/[A-Z0-9<]/g, '');
      if (validChars.length <= 3) { // Allow some OCR errors
        mrzLines.push(cleaned);
      }
    }
  }

  return mrzLines;
};

// Free fallback using Tesseract.js + mrz parser
async function scanWithTesseract(imageBuffer: Buffer): Promise<PassportData | null> {
  console.log("Starting Tesseract.js OCR fallback...");

  let worker = null;
  try {
    // Create Tesseract worker with OCRB font (optimized for MRZ)
    worker = await createWorker('eng');

    // Recognize text from image
    const { data: { text } } = await worker.recognize(imageBuffer);
    console.log("Tesseract OCR result:", text);

    // Extract MRZ lines from the text
    const mrzLines = extractMRZLines(text);
    console.log("Extracted MRZ lines:", mrzLines);

    if (mrzLines.length < 2) {
      console.log("Could not find valid MRZ lines");
      return null;
    }

    // Try to parse the MRZ
    try {
      const mrzResult = parseMRZ(mrzLines, { autocorrect: true });
      console.log("MRZ parse result:", JSON.stringify(mrzResult, null, 2));

      if (!mrzResult.valid && !mrzResult.fields) {
        console.log("MRZ parsing failed - invalid format");
        return null;
      }

      const fields = mrzResult.fields;

      // Build full name from first and last names
      const firstName = fields.firstName || "";
      const lastName = fields.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim().toUpperCase();

      // Format dates
      const dateOfBirth = fields.birthDate || "";
      const passportExpiry = fields.expirationDate || "";

      const passportData: PassportData = {
        fullName,
        dateOfBirth: dateOfBirth ? formatMRZDate(dateOfBirth) : "",
        gender: mapGender(fields.sex || ""),
        nationality: convertCountryCode(fields.nationality || ""),
        passportNumber: (fields.documentNumber || "").toUpperCase(),
        passportExpiry: passportExpiry ? formatMRZDate(passportExpiry) : "",
        dateOfIssue: "", // MRZ doesn't contain issue date
        issuingAuthority: convertCountryCode(fields.issuingState || ""),
      };

      console.log("Tesseract parsed passport data:", passportData);
      return passportData;

    } catch (mrzError) {
      console.error("MRZ parsing error:", mrzError);
      return null;
    }

  } catch (error) {
    console.error("Tesseract OCR error:", error);
    return null;
  } finally {
    if (worker) {
      await worker.terminate();
    }
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

    // Convert file to buffer for Tesseract fallback
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Try Mindee first if API key is available
    const apiKey = process.env.MINDEE_API_KEY;
    let passportData: PassportData | null = null;
    let usedFallback = false;

    // TEMPORARILY DISABLED: Mindee subscription expired
    // To re-enable Mindee, remove the `false &&` from the condition below
    if (false && apiKey) {
      console.log("Attempting Mindee API scan...");
      const mindeeResult = await scanWithMindee(file, apiKey!);

      if (mindeeResult.data) {
        passportData = mindeeResult.data;
      } else if (mindeeResult.shouldFallback) {
        console.log("Mindee failed, trying Tesseract.js fallback...");
        usedFallback = true;
        passportData = await scanWithTesseract(imageBuffer);
      }
    } else {
      // Using Tesseract.js directly (Mindee temporarily disabled)
      console.log("Using Tesseract.js OCR for passport scanning...");
      usedFallback = true;
      passportData = await scanWithTesseract(imageBuffer);
    }

    if (!passportData) {
      const message = usedFallback
        ? "Could not read passport MRZ. Please ensure the MRZ (machine readable zone at the bottom of the passport) is clearly visible and try again."
        : "Could not read passport data. Please take a clearer photo of the passport data page.";

      return NextResponse.json(
        { error: message },
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
      method: usedFallback ? "ocr" : "mindee", // Indicate which method was used
    });

  } catch (error) {
    console.error("Passport scan error:", error);

    return NextResponse.json(
      { error: "Failed to scan passport. Please try again or enter details manually." },
      { status: 500 }
    );
  }
}
