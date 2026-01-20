import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
// Switched from Zoho to Gmail
import { fetchEmailById, markAsRead, markAsUnread, deleteEmail } from "@/lib/gmail-mail";

// GET - Fetch single email by UID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { uid } = await params;
    const uidNum = parseInt(uid);

    if (isNaN(uidNum)) {
      return NextResponse.json({ error: "Invalid UID" }, { status: 400 });
    }

    const folder = request.nextUrl.searchParams.get("folder") || "INBOX";
    const email = await fetchEmailById(uidNum, folder);

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Auto-mark as read when opened
    if (!email.isRead) {
      await markAsRead(uidNum, folder);
      email.isRead = true;
    }

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Fetch email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch email" },
      { status: 500 }
    );
  }
}

// PATCH - Update email (mark read/unread)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { uid } = await params;
    const uidNum = parseInt(uid);

    if (isNaN(uidNum)) {
      return NextResponse.json({ error: "Invalid UID" }, { status: 400 });
    }

    const body = await request.json();
    const { isRead } = body;
    const folder = request.nextUrl.searchParams.get("folder") || "INBOX";

    let success = false;
    if (isRead === true) {
      success = await markAsRead(uidNum, folder);
    } else if (isRead === false) {
      success = await markAsUnread(uidNum, folder);
    }

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Update email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update email" },
      { status: 500 }
    );
  }
}

// DELETE - Delete email
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { uid } = await params;
    const uidNum = parseInt(uid);

    if (isNaN(uidNum)) {
      return NextResponse.json({ error: "Invalid UID" }, { status: 400 });
    }

    const folder = request.nextUrl.searchParams.get("folder") || "INBOX";
    const success = await deleteEmail(uidNum, folder);

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Delete email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete email" },
      { status: 500 }
    );
  }
}
