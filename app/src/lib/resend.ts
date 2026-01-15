import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function getResend(): Resend {
  if (!resend) {
    throw new Error("Resend is not configured. Please set RESEND_API_KEY environment variable.");
  }
  return resend;
}

// Payment confirmation email params
interface SendPaymentConfirmationParams {
  to: string;
  referenceNumber: string;
  applicantNames: string[];
  amountPaid: string;
  visaSpeed: string | null;
  entryDate: string;
  exitDate: string;
  entryPort: string;
}

export async function sendPaymentConfirmationEmail({
  to,
  referenceNumber,
  applicantNames,
  amountPaid,
  visaSpeed,
  entryDate,
  exitDate,
  entryPort,
}: SendPaymentConfirmationParams): Promise<{ success: boolean; error?: string }> {
  const emailClient = getResend();

  const visaSpeedLabels: Record<string, string> = {
    "30-min": "30-Minute Express",
    "4-hour": "4-Hour Express",
    "1-day": "1-Day Service",
    "2-day": "2-Day Service",
    weekend: "Weekend/Holiday Service",
  };

  const speedLabel = visaSpeed ? visaSpeedLabels[visaSpeed] || visaSpeed : "Standard Processing";

  try {
    const { error } = await emailClient.emails.send({
      from: "Vietnam Fast Visa <visa@vietnamfastvisa.com>",
      to: [to],
      subject: `Payment Confirmed - ${referenceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
            <h1 style="color: white; margin: 0; font-size: 24px;">Payment Received!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Thank you for your order</p>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">Order Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Reference Number:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-family: monospace;">${referenceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Service Type:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${speedLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #10b981;">${amountPaid}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">Applicant(s)</h2>
              ${applicantNames.map((name, i) => `
                <div style="padding: 8px 0; ${i > 0 ? "border-top: 1px solid #f0f0f0;" : ""}">
                  <span style="display: inline-block; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">${i + 1}</span>
                  ${name}
                </div>
              `).join("")}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">Travel Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Entry Date:</td>
                  <td style="padding: 8px 0; text-align: right;">${entryDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Exit Date:</td>
                  <td style="padding: 8px 0; text-align: right;">${exitDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Entry Port:</td>
                  <td style="padding: 8px 0; text-align: right;">${entryPort}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcd34d;">
              <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">What Happens Next?</h3>
              <ol style="margin: 0; padding-left: 20px; color: #78350f;">
                <li style="margin-bottom: 8px;">Our team is processing your visa application right now</li>
                <li style="margin-bottom: 8px;">You'll receive WhatsApp updates on your progress</li>
                <li style="margin-bottom: 8px;">Your approved visa will be sent to this email</li>
                <li>Print the visa and present it at Vietnam immigration</li>
              </ol>
            </div>

            <div style="text-align: center; padding: 20px 0;">
              <p style="color: #666; margin-bottom: 15px;">Questions? Contact our 24/7 support team</p>
              <a href="https://wa.me/1234567890?text=Hi, I need help with my visa. Reference: ${referenceNumber}" style="display: inline-block; padding: 12px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Chat on WhatsApp</a>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Vietnam Fast Visa. All rights reserved.</p>
            <p><a href="https://vietnamvisahelp.com" style="color: #10b981;">vietnamvisahelp.com</a></p>
          </div>
        </body>
        </html>
      `,
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
