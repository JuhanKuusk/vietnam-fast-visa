import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { fetchEmails, sendEmail, checkNewEmails } from "@/lib/zoho-mail";

// GET - Fetch emails from inbox
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const folder = searchParams.get("folder") || "INBOX";
    const checkOnly = searchParams.get("checkOnly") === "true";
    const lastCount = parseInt(searchParams.get("lastCount") || "0");

    // Just check for new emails (for polling)
    if (checkOnly) {
      const result = await checkNewEmails(lastCount, folder);
      return NextResponse.json(result);
    }

    // Fetch full email list
    const result = await fetchEmails({
      folder,
      limit,
      offset,
      unreadOnly,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Inbox fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

// POST - Send a new email
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { to, subject, text, html, replyTo, inReplyTo, references } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "To and subject are required" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to,
      subject,
      text,
      html,
      replyTo,
      inReplyTo,
      references,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
