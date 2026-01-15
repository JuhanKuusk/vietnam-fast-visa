import { Resend } from "resend";
import { translations, SupportedLanguage } from "./translations";
import { translateTexts } from "./deepl";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function getResend(): Resend {
  if (!resend) {
    throw new Error("Resend is not configured. Please set RESEND_API_KEY environment variable.");
  }
  return resend;
}

// Email translation types
interface ConfirmationEmailTranslations {
  subject: string;
  headerTitle: string;
  headerSubtitle: string;
  orderDetailsTitle: string;
  referenceNumber: string;
  serviceType: string;
  amountPaid: string;
  applicantsTitle: string;
  travelDetailsTitle: string;
  entryDate: string;
  exitDate: string;
  entryPort: string;
  whatHappensNextTitle: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  questionsText: string;
  chatWhatsApp: string;
  footerCopyright: string;
}

interface VisaReadyEmailTranslations {
  subject: string;
  headerTitle: string;
  greeting: string;
  greatNews: string;
  referenceNumber: string;
  importantInstructions: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  questionsText: string;
  safeTravels: string;
  teamSignature: string;
}

// Get translated email content for payment confirmation
async function getConfirmationEmailTranslations(
  language: SupportedLanguage = "EN"
): Promise<ConfirmationEmailTranslations> {
  const t = translations.confirmationEmail;

  // Return English translations directly
  if (language === "EN") {
    return t;
  }

  // For other languages, translate the relevant sections
  const textsToTranslate = [
    t.subject,
    t.headerTitle,
    t.headerSubtitle,
    t.orderDetailsTitle,
    t.referenceNumber,
    t.serviceType,
    t.amountPaid,
    t.applicantsTitle,
    t.travelDetailsTitle,
    t.entryDate,
    t.exitDate,
    t.entryPort,
    t.whatHappensNextTitle,
    t.step1,
    t.step2,
    t.step3,
    t.step4,
    t.questionsText,
    t.chatWhatsApp,
    t.footerCopyright,
  ];

  try {
    const translated = await translateTexts({ texts: textsToTranslate, targetLang: language, sourceLang: "EN" });

    return {
      subject: translated[0],
      headerTitle: translated[1],
      headerSubtitle: translated[2],
      orderDetailsTitle: translated[3],
      referenceNumber: translated[4],
      serviceType: translated[5],
      amountPaid: translated[6],
      applicantsTitle: translated[7],
      travelDetailsTitle: translated[8],
      entryDate: translated[9],
      exitDate: translated[10],
      entryPort: translated[11],
      whatHappensNextTitle: translated[12],
      step1: translated[13],
      step2: translated[14],
      step3: translated[15],
      step4: translated[16],
      questionsText: translated[17],
      chatWhatsApp: translated[18],
      footerCopyright: translated[19],
    };
  } catch (error) {
    console.error("Translation failed, using English:", error);
    return t;
  }
}

// Get translated email content for visa ready email
async function getVisaReadyEmailTranslations(
  language: SupportedLanguage = "EN"
): Promise<VisaReadyEmailTranslations> {
  const t = translations.visaReadyEmail;

  // Return English translations directly
  if (language === "EN") {
    return t;
  }

  const textsToTranslate = [
    t.subject,
    t.headerTitle,
    t.greeting,
    t.greatNews,
    t.referenceNumber,
    t.importantInstructions,
    t.instruction1,
    t.instruction2,
    t.instruction3,
    t.questionsText,
    t.safeTravels,
    t.teamSignature,
  ];

  try {
    const translated = await translateTexts({ texts: textsToTranslate, targetLang: language, sourceLang: "EN" });

    return {
      subject: translated[0],
      headerTitle: translated[1],
      greeting: translated[2],
      greatNews: translated[3],
      referenceNumber: translated[4],
      importantInstructions: translated[5],
      instruction1: translated[6],
      instruction2: translated[7],
      instruction3: translated[8],
      questionsText: translated[9],
      safeTravels: translated[10],
      teamSignature: translated[11],
    };
  } catch (error) {
    console.error("Translation failed, using English:", error);
    return t;
  }
}

// Service type labels for each language
const serviceTypeLabels: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    "30-min": "30-Minute Express",
    "4-hour": "4-Hour Express",
    "1-day": "1-Day Service",
    "2-day": "2-Day Service",
    weekend: "Weekend/Holiday Service",
    standard: "Standard Processing",
  },
  ES: {
    "30-min": "Express 30 Minutos",
    "4-hour": "Express 4 Horas",
    "1-day": "Servicio 1 Dia",
    "2-day": "Servicio 2 Dias",
    weekend: "Servicio Fin de Semana/Festivo",
    standard: "Procesamiento Estandar",
  },
  PT: {
    "30-min": "Expresso 30 Minutos",
    "4-hour": "Expresso 4 Horas",
    "1-day": "Servico 1 Dia",
    "2-day": "Servico 2 Dias",
    weekend: "Servico Fim de Semana/Feriado",
    standard: "Processamento Padrao",
  },
  FR: {
    "30-min": "Express 30 Minutes",
    "4-hour": "Express 4 Heures",
    "1-day": "Service 1 Jour",
    "2-day": "Service 2 Jours",
    weekend: "Service Week-end/Jour ferie",
    standard: "Traitement Standard",
  },
  RU: {
    "30-min": "Экспресс 30 минут",
    "4-hour": "Экспресс 4 часа",
    "1-day": "Сервис 1 день",
    "2-day": "Сервис 2 дня",
    weekend: "Выходные/Праздничные дни",
    standard: "Стандартная обработка",
  },
};

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
  language?: SupportedLanguage;
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
  language = "EN",
}: SendPaymentConfirmationParams): Promise<{ success: boolean; error?: string }> {
  const emailClient = getResend();

  // Get translated content
  const t = await getConfirmationEmailTranslations(language);
  const labels = serviceTypeLabels[language] || serviceTypeLabels.EN;
  const speedLabel = visaSpeed ? labels[visaSpeed] || labels.standard : labels.standard;

  try {
    const { error } = await emailClient.emails.send({
      from: "Vietnam Fast Visa <visa@vietnamfastvisa.com>",
      to: [to],
      subject: `${t.subject} - ${referenceNumber}`,
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
            <h1 style="color: white; margin: 0; font-size: 24px;">${t.headerTitle}</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">${t.headerSubtitle}</p>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">${t.orderDetailsTitle}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.referenceNumber}</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-family: monospace;">${referenceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.serviceType}</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${speedLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.amountPaid}</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #10b981;">${amountPaid}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">${t.applicantsTitle}</h2>
              ${applicantNames.map((name, i) => `
                <div style="padding: 8px 0; ${i > 0 ? "border-top: 1px solid #f0f0f0;" : ""}">
                  <span style="display: inline-block; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 10px;">${i + 1}</span>
                  ${name}
                </div>
              `).join("")}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #111; font-size: 18px;">${t.travelDetailsTitle}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.entryDate}</td>
                  <td style="padding: 8px 0; text-align: right;">${entryDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.exitDate}</td>
                  <td style="padding: 8px 0; text-align: right;">${exitDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">${t.entryPort}</td>
                  <td style="padding: 8px 0; text-align: right;">${entryPort}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcd34d;">
              <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">${t.whatHappensNextTitle}</h3>
              <ol style="margin: 0; padding-left: 20px; color: #78350f;">
                <li style="margin-bottom: 8px;">${t.step1}</li>
                <li style="margin-bottom: 8px;">${t.step2}</li>
                <li>${t.step3}</li>
              </ol>
            </div>

            <div style="text-align: center; padding: 20px 0;">
              <p style="color: #666; margin-bottom: 15px;">${t.questionsText}</p>
              <a href="https://wa.me/1234567890?text=Hi, I need help with my visa. Reference: ${referenceNumber}" style="display: inline-block; padding: 12px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">${t.chatWhatsApp}</a>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} ${t.footerCopyright}</p>
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
  language?: SupportedLanguage;
}

export async function sendVisaDocumentEmail({
  to,
  applicantName,
  referenceNumber,
  documentUrl,
  language = "EN",
}: SendVisaEmailParams): Promise<{ success: boolean; error?: string }> {
  const emailClient = getResend();

  // Get translated content
  const t = await getVisaReadyEmailTranslations(language);

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
      subject: `${t.subject} - ${referenceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ef7175 0%, #e13530 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${t.headerTitle}</h1>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px;">${t.greeting} <strong>${applicantName}</strong>,</p>

            <p>${t.greatNews}</p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef7175;">
              <p style="margin: 0;"><strong>${t.referenceNumber}</strong> ${referenceNumber}</p>
            </div>

            <p><strong>${t.importantInstructions}</strong></p>
            <ul style="padding-left: 20px;">
              <li>${t.instruction1}</li>
              <li>${t.instruction2}</li>
              <li>${t.instruction3}</li>
            </ul>

            <p>${t.questionsText}</p>

            <p style="margin-top: 30px;">
              ${t.safeTravels}<br>
              <strong>${t.teamSignature}</strong>
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
