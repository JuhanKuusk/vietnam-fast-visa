import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.MINDEE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Passport scanning is not configured. Please contact support." },
        { status: 500 }
      );
    }

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

      if (enqueueResponse.status === 401) {
        return NextResponse.json(
          { error: "Passport scanning service authentication failed. Please contact support." },
          { status: 500 }
        );
      }
      if (enqueueResponse.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a moment." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Could not process passport image. Please try again." },
        { status: 500 }
      );
    }

    const enqueueResult = await enqueueResponse.json();
    console.log("Enqueue result:", JSON.stringify(enqueueResult, null, 2));

    // Get the polling URL from the response
    const pollingUrl = enqueueResult.polling_url || enqueueResult.job?.polling_url;

    if (!pollingUrl) {
      console.error("No polling URL in response:", enqueueResult);
      return NextResponse.json(
        { error: "Could not process passport. Please try again." },
        { status: 500 }
      );
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
        return NextResponse.json(
          { error: "Could not read passport. Please try with a clearer image." },
          { status: 422 }
        );
      }
    }

    if (!resultUrl) {
      return NextResponse.json(
        { error: "Passport scanning timed out. Please try again." },
        { status: 408 }
      );
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
      return NextResponse.json(
        { error: "Could not retrieve passport data. Please try again." },
        { status: 500 }
      );
    }

    const result = await resultResponse.json();
    console.log("Final result:", JSON.stringify(result, null, 2));

    // Extract data from V2 API response
    // V2 format: inference.result.fields (flat structure with field names as keys)
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
      return NextResponse.json(
        { error: "Could not extract data from passport. Please ensure the image is clear." },
        { status: 422 }
      );
    }

    // Extract and format the data
    // V2 fields have structure: { value: string|number|null, confidence?: string, locations?: array }
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

    // Try various field name patterns (passport models may use different names)
    // V2 custom models often use snake_case field names
    const givenNames = getFieldValue(fields.given_names)
      || getFieldValue(fields.given_name)
      || getFieldValue(fields.firstname)
      || getFieldValue(fields.first_name)
      || "";

    const surname = getFieldValue(fields.surnames)  // V2 uses plural "surnames"
      || getFieldValue(fields.surname)
      || getFieldValue(fields.lastname)
      || getFieldValue(fields.last_name)
      || getFieldValue(fields.family_name)
      || "";

    // Some passports have full_name directly
    let fullName = getFieldValue(fields.full_name) || getFieldValue(fields.fullname);
    if (!fullName && (givenNames || surname)) {
      fullName = `${givenNames} ${surname}`.trim();
    }
    fullName = fullName.toUpperCase();

    // Map gender
    const genderValue = getFieldValue(fields.gender) || getFieldValue(fields.sex) || "";
    const mapGender = (gender: string): string => {
      if (!gender) return "";
      const g = gender.toUpperCase();
      if (g === "M" || g === "MALE") return "male";
      if (g === "F" || g === "FEMALE") return "female";
      return "";
    };

    // Convert country code from alpha-3 to alpha-2
    // Prefer issuing_country as it's typically more standardized than nationality
    const nationalityValue = getFieldValue(fields.issuing_country)
      || getFieldValue(fields.nationality)
      || getFieldValue(fields.country)
      || getFieldValue(fields.country_code)
      || "";

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

    // Date of birth
    const dateOfBirth = getFieldValue(fields.birth_date)
      || getFieldValue(fields.date_of_birth)
      || getFieldValue(fields.birthdate)
      || getFieldValue(fields.dob)
      || "";

    // Passport number
    const passportNumber = (
      getFieldValue(fields.passport_number)
      || getFieldValue(fields.document_number)
      || getFieldValue(fields.id_number)
      || getFieldValue(fields.mrz_document_number)
      || ""
    ).toUpperCase();

    // Expiry date
    const passportExpiry = getFieldValue(fields.expiry_date)
      || getFieldValue(fields.expiration_date)
      || getFieldValue(fields.date_of_expiry)
      || "";

    // Date of issue
    const dateOfIssue = getFieldValue(fields.issue_date)
      || getFieldValue(fields.issuance_date)
      || getFieldValue(fields.date_of_issue)
      || "";

    // Issuing authority/place - use the nationality/issuing country value
    // as the issuing authority is typically the same as the issuing country
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

    console.log("Parsed passport data:", passportData);

    // Check if we got any meaningful data
    const hasData = passportData.fullName || passportData.passportNumber || passportData.dateOfBirth;

    if (!hasData) {
      return NextResponse.json(
        { error: "Could not read passport data. Please take a clearer photo of the passport data page." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: passportData,
    });

  } catch (error) {
    console.error("Passport scan error:", error);

    return NextResponse.json(
      { error: "Failed to scan passport. Please try again or enter details manually." },
      { status: 500 }
    );
  }
}
