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

export interface ScanResult {
  success: boolean;
  data?: PassportData;
  error?: string;
}

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
          const progress = Math.round(10 + (m.progress * 70)); // 10-80%
          onProgress?.(progress, "Reading passport...");
        }
      },
    });

    onProgress?.(20, "Processing image...");

    // Recognize text from image
    const { data: { text } } = await worker.recognize(file);
    console.log("[PassportScanner] OCR result:", text);

    onProgress?.(85, "Parsing MRZ data...");

    // Extract MRZ lines from the text
    const mrzLines = extractMRZLines(text);
    console.log("[PassportScanner] Extracted MRZ lines:", mrzLines);

    if (mrzLines.length < 2) {
      console.log("[PassportScanner] Could not find valid MRZ lines");
      return {
        success: false,
        error: "Could not find MRZ zone. Please ensure the bottom of the passport (machine-readable zone with <<< characters) is clearly visible.",
      };
    }

    // Try to parse the MRZ
    try {
      const mrzResult = parseMRZ(mrzLines, { autocorrect: true });
      console.log("[PassportScanner] MRZ parse result:", JSON.stringify(mrzResult, null, 2));

      if (!mrzResult.valid && !mrzResult.fields) {
        console.log("[PassportScanner] MRZ parsing failed - invalid format");
        return {
          success: false,
          error: "Could not parse passport MRZ. Please try with a clearer image.",
        };
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

      console.log("[PassportScanner] Parsed passport data:", passportData);

      onProgress?.(100, "Complete!");

      // Check if we got meaningful data
      const hasData = passportData.fullName || passportData.passportNumber || passportData.dateOfBirth;
      if (!hasData) {
        return {
          success: false,
          error: "Could not extract passport data. Please try with a clearer image.",
        };
      }

      return {
        success: true,
        data: passportData,
      };

    } catch (mrzError) {
      console.error("[PassportScanner] MRZ parsing error:", mrzError);
      return {
        success: false,
        error: "Failed to parse passport MRZ. Please try again.",
      };
    }

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
