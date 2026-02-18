import { ImapFlow } from "imapflow";
import nodemailer from "nodemailer";
import { simpleParser, ParsedMail } from "mailparser";

// Zoho Mail IMAP/SMTP configuration
const ZOHO_IMAP_HOST = "imap.zoho.com";
const ZOHO_IMAP_PORT = 993;
const ZOHO_SMTP_HOST = "smtp.zoho.com";
const ZOHO_SMTP_PORT = 465;

// Get credentials from environment
const ZOHO_EMAIL = process.env.ZOHO_EMAIL || "admin@vietnamvisahelp.com";
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD || "";

export interface EmailMessage {
  id: string;
  uid: number;
  subject: string;
  from: {
    name: string;
    address: string;
  };
  to: {
    name: string;
    address: string;
  }[];
  date: Date;
  preview: string;
  body?: string;
  htmlBody?: string;
  isRead: boolean;
  hasAttachments: boolean;
  flags: string[];
}

export interface SendEmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
}

// Create SMTP transporter for sending emails
export function createSmtpTransporter() {
  if (!ZOHO_PASSWORD) {
    throw new Error("ZOHO_PASSWORD environment variable is required");
  }

  return nodemailer.createTransport({
    host: ZOHO_SMTP_HOST,
    port: ZOHO_SMTP_PORT,
    secure: true, // SSL
    auth: {
      user: ZOHO_EMAIL,
      pass: ZOHO_PASSWORD,
    },
  });
}

// Send email via Zoho SMTP
export async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const transporter = createSmtpTransporter();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `VietnamVisaHelp Support <${ZOHO_EMAIL}>`,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    };

    if (params.replyTo) {
      mailOptions.replyTo = params.replyTo;
    }

    if (params.inReplyTo) {
      mailOptions.inReplyTo = params.inReplyTo;
      mailOptions.references = params.references || params.inReplyTo;
    }

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Zoho SMTP send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Create IMAP client for reading emails
async function createImapClient(): Promise<ImapFlow> {
  if (!ZOHO_PASSWORD) {
    throw new Error("ZOHO_PASSWORD environment variable is required");
  }

  const client = new ImapFlow({
    host: ZOHO_IMAP_HOST,
    port: ZOHO_IMAP_PORT,
    secure: true,
    auth: {
      user: ZOHO_EMAIL,
      pass: ZOHO_PASSWORD,
    },
    logger: false,
  });

  await client.connect();
  return client;
}

// Fetch emails from inbox
export async function fetchEmails(options: {
  folder?: string;
  limit?: number;
  offset?: number;
  unreadOnly?: boolean;
}): Promise<{ emails: EmailMessage[]; total: number; unread: number }> {
  const { folder = "INBOX", limit = 50, offset = 0, unreadOnly = false } = options;

  const client = await createImapClient();

  try {
    const mailbox = await client.mailboxOpen(folder);
    const total = mailbox.exists || 0;

    // Get unread count
    const unreadStatus = await client.status(folder, { unseen: true });
    const unread = unreadStatus.unseen || 0;

    if (total === 0) {
      return { emails: [], total: 0, unread: 0 };
    }

    // Calculate range (newest first)
    const start = Math.max(1, total - offset - limit + 1);
    const end = Math.max(1, total - offset);

    const searchCriteria = unreadOnly ? { seen: false } : { all: true };
    const messages: EmailMessage[] = [];

    // Fetch messages
    for await (const message of client.fetch(`${start}:${end}`, {
      uid: true,
      flags: true,
      envelope: true,
      bodyStructure: true,
      source: { start: 0, maxLength: 500 }, // Preview only
    }, { uid: false })) {
      const envelope = message.envelope;

      messages.push({
        id: message.uid.toString(),
        uid: message.uid,
        subject: envelope?.subject || "(No Subject)",
        from: {
          name: envelope?.from?.[0]?.name || "",
          address: envelope?.from?.[0]?.address || "",
        },
        to: (envelope?.to || []).map((t) => ({
          name: t.name || "",
          address: t.address || "",
        })),
        date: envelope?.date || new Date(),
        preview: message.source?.toString().substring(0, 200) || "",
        isRead: message.flags?.has("\\Seen") || false,
        hasAttachments: !!message.bodyStructure?.childNodes?.length,
        flags: Array.from(message.flags || []),
      });
    }

    // Sort by date (newest first)
    messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { emails: messages, total, unread };
  } finally {
    await client.logout();
  }
}

// Fetch single email with full body
export async function fetchEmailById(uid: number, folder = "INBOX"): Promise<EmailMessage | null> {
  const client = await createImapClient();

  try {
    await client.mailboxOpen(folder);

    let email: EmailMessage | null = null;

    for await (const message of client.fetch(uid.toString(), {
      uid: true,
      flags: true,
      envelope: true,
      bodyStructure: true,
      source: true,
    }, { uid: true })) {
      const envelope = message.envelope;
      const source = message.source;

      // Use mailparser to properly parse the email content
      let body = "";
      let htmlBody = "";

      if (source) {
        try {
          const parsed: ParsedMail = await simpleParser(source);
          body = parsed.text || "";
          htmlBody = parsed.html || "";
        } catch (parseError) {
          console.error("Email parse error:", parseError);
          // Fallback to raw source if parsing fails
          const rawSource = source.toString();
          const bodyStart = rawSource.indexOf("\r\n\r\n");
          if (bodyStart > -1) {
            body = rawSource.substring(bodyStart + 4).trim();
          }
        }
      }

      email = {
        id: message.uid.toString(),
        uid: message.uid,
        subject: envelope?.subject || "(No Subject)",
        from: {
          name: envelope?.from?.[0]?.name || "",
          address: envelope?.from?.[0]?.address || "",
        },
        to: (envelope?.to || []).map((t) => ({
          name: t.name || "",
          address: t.address || "",
        })),
        date: envelope?.date || new Date(),
        preview: body.substring(0, 200),
        body,
        htmlBody,
        isRead: message.flags?.has("\\Seen") || false,
        hasAttachments: !!message.bodyStructure?.childNodes?.length,
        flags: Array.from(message.flags || []),
      };
    }

    return email;
  } finally {
    await client.logout();
  }
}

// Mark email as read
export async function markAsRead(uid: number, folder = "INBOX"): Promise<boolean> {
  const client = await createImapClient();

  try {
    await client.mailboxOpen(folder);
    await client.messageFlagsAdd(uid.toString(), ["\\Seen"], { uid: true });
    return true;
  } catch (error) {
    console.error("Failed to mark as read:", error);
    return false;
  } finally {
    await client.logout();
  }
}

// Mark email as unread
export async function markAsUnread(uid: number, folder = "INBOX"): Promise<boolean> {
  const client = await createImapClient();

  try {
    await client.mailboxOpen(folder);
    await client.messageFlagsRemove(uid.toString(), ["\\Seen"], { uid: true });
    return true;
  } catch (error) {
    console.error("Failed to mark as unread:", error);
    return false;
  } finally {
    await client.logout();
  }
}

// Delete email (move to trash)
export async function deleteEmail(uid: number, folder = "INBOX"): Promise<boolean> {
  const client = await createImapClient();

  try {
    await client.mailboxOpen(folder);
    await client.messageDelete(uid.toString(), { uid: true });
    return true;
  } catch (error) {
    console.error("Failed to delete email:", error);
    return false;
  } finally {
    await client.logout();
  }
}

// Get mailbox folders
export async function getMailboxFolders(): Promise<string[]> {
  const client = await createImapClient();

  try {
    const folders: string[] = [];
    const list = await client.list();

    for (const folder of list) {
      folders.push(folder.path);
    }

    return folders;
  } finally {
    await client.logout();
  }
}

// Check for new emails (for polling)
export async function checkNewEmails(lastKnownCount: number, folder = "INBOX"): Promise<{
  hasNew: boolean;
  newCount: number;
  totalCount: number;
  unreadCount: number;
}> {
  const client = await createImapClient();

  try {
    const mailbox = await client.mailboxOpen(folder);
    const totalCount = mailbox.exists || 0;

    const status = await client.status(folder, { unseen: true });
    const unreadCount = status.unseen || 0;

    const hasNew = totalCount > lastKnownCount;
    const newCount = hasNew ? totalCount - lastKnownCount : 0;

    return { hasNew, newCount, totalCount, unreadCount };
  } finally {
    await client.logout();
  }
}
