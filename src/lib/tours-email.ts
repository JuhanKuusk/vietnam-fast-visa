/**
 * Email templates and sending functions for Tour Booking System
 * Uses Resend (already configured in the project)
 */

import { Resend } from "resend";
import type { TourInquiry } from "@/types/tours";

// Lazy initialization to avoid module-level env access issues
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

const FROM_EMAIL = "help@vietnamtravel.help";
const ADMIN_EMAIL = process.env.TOUR_ADMIN_EMAIL || "bookings@vietnamtravel.help";

// =====================================================
// Email Sending Functions
// =====================================================

/**
 * Send tour inquiry confirmation emails
 * Sends to both admin and customer
 */
export async function sendTourInquiryEmails(inquiry: TourInquiry) {
  try {
    const resend = getResend();

    // Send to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Tour Inquiry: ${inquiry.inquiryNumber} - ${inquiry.tourName}`,
      html: generateAdminEmailHTML(inquiry),
    });

    // Send to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      subject: `Your Tour Inquiry - ${inquiry.tourName}`,
      html: generateCustomerEmailHTML(inquiry),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending tour inquiry emails:", error);
    throw error;
  }
}

// =====================================================
// Email Templates
// =====================================================

/**
 * Generate HTML email for admin notification
 */
function generateAdminEmailHTML(inquiry: TourInquiry): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0891b2 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
          .inquiry-box { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .label { font-weight: bold; color: #0891b2; margin-bottom: 5px; }
          .value { margin-bottom: 15px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎯 New Tour Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${inquiry.inquiryNumber}</p>
          </div>

          <div class="content">
            <div class="inquiry-box">
              <h2 style="color: #0891b2; margin-top: 0;">Tour Details</h2>
              <div class="label">Tour Name:</div>
              <div class="value">${inquiry.tourName}</div>

              <div class="label">Category:</div>
              <div class="value">${inquiry.tourCategory}</div>

              ${inquiry.preferredDate ? `
                <div class="label">Preferred Date:</div>
                <div class="value">${new Date(inquiry.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
              ` : ""}

              <div class="label">Number of Travelers:</div>
              <div class="value">${inquiry.numberOfAdults} adult${inquiry.numberOfAdults > 1 ? "s" : ""}${inquiry.numberOfChildren ? `, ${inquiry.numberOfChildren} child${inquiry.numberOfChildren > 1 ? "ren" : ""}` : ""}</div>
            </div>

            <div class="inquiry-box">
              <h2 style="color: #0891b2; margin-top: 0;">Customer Information</h2>
              <div class="label">Full Name:</div>
              <div class="value">${inquiry.fullName}</div>

              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${inquiry.email}" style="color: #0891b2;">${inquiry.email}</a></div>

              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${inquiry.phone}" style="color: #0891b2;">${inquiry.phone}</a></div>

              ${inquiry.whatsapp ? `
                <div class="label">WhatsApp:</div>
                <div class="value"><a href="https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, "")}" style="color: #0891b2;">${inquiry.whatsapp}</a></div>
              ` : ""}

              ${inquiry.nationality ? `
                <div class="label">Nationality:</div>
                <div class="value">${inquiry.nationality}</div>
              ` : ""}
            </div>

            ${inquiry.specialRequests ? `
              <div class="inquiry-box">
                <h2 style="color: #0891b2; margin-top: 0;">Special Requests</h2>
                <div class="value">${inquiry.specialRequests}</div>
              </div>
            ` : ""}

            <div class="inquiry-box">
              <h2 style="color: #0891b2; margin-top: 0;">📊 Metadata</h2>
              <div class="label">Inquiry Number:</div>
              <div class="value">${inquiry.inquiryNumber}</div>

              <div class="label">Submitted:</div>
              <div class="value">${new Date(inquiry.createdAt!).toLocaleString()}</div>

              <div class="label">Source:</div>
              <div class="value">${inquiry.sourceDomain || "vietnamtravel.help"}</div>
            </div>
          </div>

          <div class="footer">
            <p>Tour Inquiry Notification from VietnamTravel.help</p>
            <p>Please respond to the customer within 24 hours.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate HTML email for customer confirmation
 */
function generateCustomerEmailHTML(inquiry: TourInquiry): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0891b2 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .reference-number { background: #e0f2fe; color: #0369a1; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0; }
          .cta-button { display: inline-block; background: #0891b2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">✅ Thank You for Your Inquiry!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your tour booking request</p>
          </div>

          <div class="content">
            <div class="info-box">
              <p>Dear ${inquiry.fullName},</p>
              <p>Thank you for your interest in <strong>${inquiry.tourName}</strong>!</p>
              <p>We've received your inquiry and our team will contact you within 24 hours to discuss availability, pricing, and any questions you may have.</p>
            </div>

            <div class="reference-number">
              Your Inquiry Reference: ${inquiry.inquiryNumber}
            </div>

            <div class="info-box">
              <h2 style="color: #0891b2; margin-top: 0;">📋 Your Inquiry Details</h2>
              <p><strong>Tour:</strong> ${inquiry.tourName}</p>
              ${inquiry.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(inquiry.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>` : ""}
              <p><strong>Travelers:</strong> ${inquiry.numberOfAdults} adult${inquiry.numberOfAdults > 1 ? "s" : ""}${inquiry.numberOfChildren ? `, ${inquiry.numberOfChildren} child${inquiry.numberOfChildren > 1 ? "ren" : ""}` : ""}</p>
            </div>

            <div class="info-box">
              <h2 style="color: #0891b2; margin-top: 0;">📞 What Happens Next?</h2>
              <ol style="padding-left: 20px;">
                <li>Our tour specialist will review your inquiry</li>
                <li>We'll contact you within 24 hours via email or phone</li>
                <li>We'll discuss availability, pricing, and answer any questions</li>
                <li>Once confirmed, we'll send you booking instructions</li>
              </ol>
            </div>

            <div class="info-box" style="text-align: center;">
              <p><strong>Want to book now?</strong></p>
              <p>You can also complete your booking directly with our partner:</p>
              <a href="${inquiry.tourName}" class="cta-button">Complete Booking</a>
              <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">You'll be redirected to our trusted booking partner</p>
            </div>

            <div class="info-box">
              <h2 style="color: #0891b2; margin-top: 0;">💬 Need Help?</h2>
              <p>If you have any questions, feel free to contact us:</p>
              <p>📧 Email: <a href="mailto:help@vietnamtravel.help" style="color: #0891b2;">help@vietnamtravel.help</a></p>
              ${inquiry.whatsapp ? `<p>📱 WhatsApp: <a href="https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, "")}" style="color: #0891b2;">${inquiry.whatsapp}</a></p>` : ""}
              <p>📞 Phone: +84 70 5549868</p>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for choosing VietnamTravel.help</p>
            <p>We look forward to helping you create unforgettable memories in Vietnam!</p>
            <p style="font-size: 12px; margin-top: 20px;">
              This email was sent because you submitted a tour inquiry at vietnamtravel.help
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
