import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import { jsPDF } from "jspdf";

interface Applicant {
  id: string;
  full_name: string;
  nationality: string;
  passport_number: string;
  date_of_birth: string;
  gender: string;
  religion: string | null;
  place_of_birth: string | null;
  passport_type: string | null;
  passport_issue_date: string | null;
  passport_expiry_date: string | null;
  issuing_authority: string | null;
  permanent_address: string | null;
  contact_address: string | null;
  telephone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_address: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relationship: string | null;
  passport_photo_url: string | null;
  portrait_photo_url: string | null;
}

interface Application {
  id: string;
  reference_number: string;
  email: string;
  whatsapp: string;
  entry_date: string;
  exit_date: string;
  entry_port: string;
  entry_type: string | null;
  purpose: string | null;
  flight_number: string | null;
  visa_speed: string | null;
  language: string | null;
  amount_usd: number;
  status: string;
  payment_status: string;
  created_at: string;
  applicants: Applicant[];
}

async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = getSupabaseServer();

    // Fetch application with applicants
    const { data: application, error } = await supabase
      .from("applications")
      .select(`
        *,
        applicants (*)
      `)
      .eq("id", id)
      .single();

    if (error || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const app = application as Application;

    // Create PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = 20;

    // Helper function to add text
    const addText = (text: string, x: number, yPos: number, options?: { fontSize?: number; fontStyle?: string; color?: number[] }) => {
      doc.setFontSize(options?.fontSize || 10);
      doc.setFont("helvetica", options?.fontStyle || "normal");
      if (options?.color) {
        doc.setTextColor(options.color[0], options.color[1], options.color[2]);
      } else {
        doc.setTextColor(0, 0, 0);
      }
      doc.text(text, x, yPos);
    };

    const addSection = (title: string) => {
      y += 8;
      doc.setFillColor(196, 30, 58);
      doc.rect(margin, y - 5, contentWidth, 8, "F");
      addText(title, margin + 2, y, { fontSize: 11, fontStyle: "bold", color: [255, 255, 255] });
      y += 8;
    };

    const addField = (label: string, value: string | null, col: number = 0) => {
      const xOffset = col === 1 ? contentWidth / 2 + margin : margin;
      addText(label + ":", xOffset, y, { fontSize: 9, color: [100, 100, 100] });
      addText(value || "-", xOffset + 45, y, { fontSize: 10 });
      if (col === 1) y += 6;
    };

    // Header
    addText("VIETNAM VISA APPLICATION", pageWidth / 2 - 40, y, { fontSize: 18, fontStyle: "bold", color: [196, 30, 58] });
    y += 8;
    addText("vietnamvisahelp.com", pageWidth / 2 - 18, y, { fontSize: 10, color: [100, 100, 100] });
    y += 10;

    // Reference & Status
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    addText(`Reference: ${app.reference_number}`, margin, y, { fontSize: 12, fontStyle: "bold" });
    addText(`Status: ${app.status?.replace(/_/g, " ").toUpperCase()}`, pageWidth - margin - 50, y, { fontSize: 10 });
    y += 10;

    // Application Details Section
    addSection("APPLICATION DETAILS");

    addField("Email", app.email, 0);
    addField("WhatsApp", app.whatsapp, 1);
    addField("Entry Date", formatDate(app.entry_date), 0);
    addField("Exit Date", formatDate(app.exit_date), 1);
    addField("Entry Port", app.entry_port, 0);
    addField("Entry Type", app.entry_type || "single", 1);
    addField("Purpose", app.purpose, 0);
    addField("Flight Number", app.flight_number, 1);
    addField("Visa Speed", app.visa_speed, 0);
    addField("Amount", `$${app.amount_usd}`, 1);
    addField("Created", formatDate(app.created_at), 0);
    addField("Payment", app.payment_status, 1);

    // Process each applicant
    for (let i = 0; i < app.applicants.length; i++) {
      const applicant = app.applicants[i];

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      y += 5;
      addSection(`APPLICANT ${i + 1}: ${applicant.full_name.toUpperCase()}`);

      // Try to add photos
      const photoY = y;
      let photosAdded = false;

      if (applicant.passport_photo_url || applicant.portrait_photo_url) {
        const photoWidth = 35;
        const photoHeight = 45;

        if (applicant.passport_photo_url) {
          const passportImg = await fetchImageAsBase64(applicant.passport_photo_url);
          if (passportImg) {
            try {
              doc.addImage(passportImg, "JPEG", pageWidth - margin - photoWidth * 2 - 5, photoY, photoWidth, photoHeight);
              photosAdded = true;
            } catch { /* ignore */ }
          }
        }

        if (applicant.portrait_photo_url) {
          const portraitImg = await fetchImageAsBase64(applicant.portrait_photo_url);
          if (portraitImg) {
            try {
              doc.addImage(portraitImg, "JPEG", pageWidth - margin - photoWidth, photoY, photoWidth, photoHeight);
              photosAdded = true;
            } catch { /* ignore */ }
          }
        }
      }

      // Personal Information
      addText("Personal Information", margin, y, { fontSize: 10, fontStyle: "bold", color: [60, 60, 60] });
      y += 5;
      addField("Full Name", applicant.full_name, 0);
      addField("Nationality", applicant.nationality, 1);
      addField("Date of Birth", formatDate(applicant.date_of_birth), 0);
      addField("Gender", applicant.gender, 1);
      addField("Religion", applicant.religion, 0);
      addField("Place of Birth", applicant.place_of_birth, 1);
      y += 4;

      // Passport Information
      addText("Passport Information", margin, y, { fontSize: 10, fontStyle: "bold", color: [60, 60, 60] });
      y += 5;
      addField("Passport Number", applicant.passport_number, 0);
      addField("Passport Type", applicant.passport_type, 1);
      addField("Issue Date", formatDate(applicant.passport_issue_date), 0);
      addField("Expiry Date", formatDate(applicant.passport_expiry_date), 1);
      addField("Issuing Authority", applicant.issuing_authority, 0);
      y += 6;

      // Address Information
      addText("Address Information", margin, y, { fontSize: 10, fontStyle: "bold", color: [60, 60, 60] });
      y += 5;

      if (applicant.permanent_address) {
        addText("Permanent Address:", margin, y, { fontSize: 9, color: [100, 100, 100] });
        y += 4;
        const permLines = doc.splitTextToSize(applicant.permanent_address, contentWidth - 10);
        for (const line of permLines) {
          addText(line, margin + 5, y, { fontSize: 9 });
          y += 4;
        }
      }

      if (applicant.contact_address) {
        addText("Contact Address:", margin, y, { fontSize: 9, color: [100, 100, 100] });
        y += 4;
        const contactLines = doc.splitTextToSize(applicant.contact_address, contentWidth - 10);
        for (const line of contactLines) {
          addText(line, margin + 5, y, { fontSize: 9 });
          y += 4;
        }
      }

      if (applicant.telephone) {
        addField("Telephone", applicant.telephone, 0);
        y += 6;
      }
      y += 2;

      // Emergency Contact
      if (applicant.emergency_contact_name || applicant.emergency_contact_phone) {
        addText("Emergency Contact", margin, y, { fontSize: 10, fontStyle: "bold", color: [60, 60, 60] });
        y += 5;
        addField("Name", applicant.emergency_contact_name, 0);
        addField("Relationship", applicant.emergency_contact_relationship, 1);
        addField("Phone", applicant.emergency_contact_phone, 0);

        if (applicant.emergency_contact_address) {
          y += 6;
          addText("Address:", margin, y, { fontSize: 9, color: [100, 100, 100] });
          y += 4;
          const emerLines = doc.splitTextToSize(applicant.emergency_contact_address, contentWidth - 10);
          for (const line of emerLines) {
            addText(line, margin + 5, y, { fontSize: 9 });
            y += 4;
          }
        }
      }

      // Adjust y if photos were added and took more space
      if (photosAdded && y < photoY + 50) {
        y = photoY + 50;
      }
    }

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated on ${new Date().toLocaleString()} | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    // Get PDF as buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="visa-application-${app.reference_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
