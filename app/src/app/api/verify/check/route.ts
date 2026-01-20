import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error("Missing Twilio configuration");
      return NextResponse.json(
        { error: "Verification service not configured" },
        { status: 500 }
      );
    }

    const { phoneNumber, code } = await request.json();

    // Validate inputs
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    // Validate code format (typically 4-6 digits)
    if (!/^\d{4,6}$/.test(code)) {
      return NextResponse.json(
        { error: "Invalid code format. Please enter 4-6 digits." },
        { status: 400 }
      );
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Verify the code
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      });

    if (verificationCheck.status === "approved") {
      return NextResponse.json({
        success: true,
        valid: true,
        status: verificationCheck.status,
        message: "Phone number verified successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        valid: false,
        status: verificationCheck.status,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    console.error("Verification check error:", error);

    // Handle specific Twilio errors
    if (error instanceof Error) {
      const twilioError = error as { code?: number; message?: string };

      if (twilioError.code === 60200) {
        return NextResponse.json(
          { error: "Invalid phone number format" },
          { status: 400 }
        );
      }

      if (twilioError.code === 20404) {
        return NextResponse.json(
          { error: "Verification expired or not found. Please request a new code." },
          { status: 404 }
        );
      }

      if (twilioError.code === 60202) {
        return NextResponse.json(
          { error: "Max check attempts reached. Please request a new code." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
