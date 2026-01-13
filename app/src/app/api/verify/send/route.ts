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

    const { phoneNumber, channel = "sms" } = await request.json();

    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Validate channel (sms or whatsapp)
    if (!["sms", "whatsapp"].includes(channel)) {
      return NextResponse.json(
        { error: "Invalid channel. Use 'sms' or 'whatsapp'" },
        { status: 400 }
      );
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Send verification code
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phoneNumber,
        channel: channel,
      });

    return NextResponse.json({
      success: true,
      status: verification.status,
      channel: verification.channel,
      message: `Verification code sent via ${channel}`,
    });
  } catch (error) {
    console.error("Verification send error:", error);

    // Handle specific Twilio errors
    if (error instanceof Error) {
      const twilioError = error as { code?: number; message?: string };

      if (twilioError.code === 60200) {
        return NextResponse.json(
          { error: "Invalid phone number format. Please use international format (e.g., +1234567890)" },
          { status: 400 }
        );
      }

      if (twilioError.code === 60203) {
        return NextResponse.json(
          { error: "Max verification attempts reached. Please wait before trying again." },
          { status: 429 }
        );
      }

      if (twilioError.code === 60205) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
