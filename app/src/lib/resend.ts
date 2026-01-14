import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function getResend(): Resend {
  if (!resend) {
    throw new Error("Resend is not configured. Please set RESEND_API_KEY environment variable.");
  }
  return resend;
}

interface SendVisaEmailParams {
  to: string;
  applicantName: string;
  referenceNumber: string;
  documentUrl: string;
}

export async function sendVisaDocumentEmail({
  to,
  applicantName,
  referenceNumber,
  documentUrl,
}: SendVisaEmailParams): Promise<{ success: boolean; error?: string }> {
  const emailClient = getResend();

  try {
    // Fetch the PDF to attach
    const pdfResponse = await fetch(documentUrl);
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch PDF document");
    }
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    const { error } = await emailClient.emails.send({
      from: "Vietnam Fast Visa <visa@vietnamfastvisa.com>",
      to: [to],
      subject: `Your Vietnam Visa is Ready - ${referenceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ef7175 0%, #e13530 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Your Vietnam Visa is Ready!</h1>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px;">Dear <strong>${applicantName}</strong>,</p>

            <p>Great news! Your Vietnam visa has been approved and is attached to this email.</p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef7175;">
              <p style="margin: 0;"><strong>Reference Number:</strong> ${referenceNumber}</p>
            </div>

            <p><strong>Important Instructions:</strong></p>
            <ul style="padding-left: 20px;">
              <li>Print the attached visa document or save it on your phone</li>
              <li>Present this document at Vietnam immigration upon arrival</li>
              <li>Keep a digital copy as backup</li>
            </ul>

            <p>If you have any questions, feel free to contact us via WhatsApp or email.</p>

            <p style="margin-top: 30px;">
              Safe travels!<br>
              <strong>Vietnam Fast Visa Team</strong>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Vietnam Fast Visa. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `vietnam-visa-${referenceNumber}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
