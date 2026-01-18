"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
  visa_document_url: string | null;
}

interface VisaDocument {
  id: string;
  applicant_id: string;
  document_url: string;
  uploaded_at: string;
  sent_to_whatsapp: boolean;
  sent_to_email: boolean;
  whatsapp_sent_at: string | null;
  email_sent_at: string | null;
}

interface Application {
  id: string;
  reference_number: string;
  email: string;
  whatsapp: string;
  status: string;
  payment_status: string;
  visa_speed: string;
  amount_usd: number;
  entry_date: string;
  exit_date: string;
  entry_port: string;
  entry_type: string | null;
  purpose: string | null;
  flight_number: string | null;
  language: string | null;
  notes: string | null;
  created_at: string;
  paid_at: string | null;
  delivered_at: string | null;
  applicants: Applicant[];
  visa_documents: VisaDocument[];
}

// Editable field component
function EditableField({
  label,
  value,
  onSave,
  type = "text",
  options,
}: {
  label: string;
  value: string | null;
  onSave: (value: string) => Promise<void>;
  type?: "text" | "date" | "select" | "textarea";
  options?: { value: string; label: string }[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex gap-2">
          {type === "select" && options ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            >
              <option value="">-</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={2}
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
            />
          ) : (
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            />
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center gap-2">
        <p className="font-medium">{value || "-"}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await fetch(`/api/admin/applications/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data.application);
          setNotes(data.application.notes || "");
          setStatus(data.application.status || "");
        } else {
          router.push("/admin/applications");
        }
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchApplication();
    }
  }, [params.id, router]);

  const handleSave = async () => {
    if (!application) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (response.ok) {
        const data = await response.json();
        setApplication(data.application);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (applicantId: string, file: File) => {
    if (!application) return;
    setUploading(applicantId);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicantId", applicantId);

      const response = await fetch(`/api/admin/applications/${application.id}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Refresh application data
        const appResponse = await fetch(`/api/admin/applications/${application.id}`);
        if (appResponse.ok) {
          const data = await appResponse.json();
          setApplication(data.application);
        }
      }
    } catch (error) {
      console.error("Failed to upload:", error);
    } finally {
      setUploading(null);
    }
  };

  const handleSendDocument = async (applicantId: string) => {
    if (!application) return;

    const document = application.visa_documents.find(d => d.applicant_id === applicantId);
    if (!document) return;

    setSending(applicantId);

    try {
      const response = await fetch("/api/admin/send-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: document.id,
          applicationId: application.id,
          applicantId,
        }),
      });

      if (response.ok) {
        // Refresh application data
        const appResponse = await fetch(`/api/admin/applications/${application.id}`);
        if (appResponse.ok) {
          const data = await appResponse.json();
          setApplication(data.application);
        }
      }
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setSending(null);
    }
  };

  const handleUpdateApplicant = async (applicantId: string, field: string, value: string) => {
    if (!application) return;

    const response = await fetch(`/api/admin/applicants/${applicantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });

    if (response.ok) {
      // Refresh application data
      const appResponse = await fetch(`/api/admin/applications/${application.id}`);
      if (appResponse.ok) {
        const data = await appResponse.json();
        setApplication(data.application);
      }
    } else {
      throw new Error("Failed to update");
    }
  };

  const handleGeneratePdf = async () => {
    if (!application) return;
    setGeneratingPdf(true);

    try {
      const response = await fetch(`/api/admin/applications/${application.id}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `visa-application-${application.reference_number}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF");
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!application) {
    return <div>Application not found</div>;
  }

  const statusColors: Record<string, string> = {
    pending_payment: "bg-yellow-100 text-yellow-800",
    payment_received: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/applications" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applications
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{application.reference_number}</h1>
            <p className="text-gray-600 mt-1">Created {new Date(application.created_at).toLocaleString()}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status] || "bg-gray-100 text-gray-800"}`}>
            {application.status?.replace(/_/g, " ") || "Unknown"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Application Details</h2>
              <button
                onClick={handleGeneratePdf}
                disabled={generatingPdf}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 flex items-center gap-2"
              >
                {generatingPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate PDF
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium">{application.whatsapp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Date</p>
                <p className="font-medium">{new Date(application.entry_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exit Date</p>
                <p className="font-medium">{new Date(application.exit_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Port</p>
                <p className="font-medium">{application.entry_port}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Type</p>
                <p className="font-medium capitalize">{application.entry_type || "single"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-medium capitalize">{application.purpose || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Flight Number</p>
                <p className="font-medium">{application.flight_number || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visa Speed</p>
                <p className="font-medium">{application.visa_speed || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{application.language || "EN"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium text-lg">${application.amount_usd}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className="font-medium capitalize">{application.payment_status}</p>
              </div>
            </div>
          </div>

          {/* Applicants */}
          {application.applicants.map((applicant, index) => {
            const document = application.visa_documents.find(d => d.applicant_id === applicant.id);

            return (
              <div key={applicant.id} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Applicant {index + 1}: {applicant.full_name}
                </h2>

                {/* Photos Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Passport Photo</p>
                    {applicant.passport_photo_url ? (
                      <a href={applicant.passport_photo_url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={applicant.passport_photo_url}
                          alt="Passport"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                        No passport photo
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Portrait Photo</p>
                    {applicant.portrait_photo_url ? (
                      <a href={applicant.portrait_photo_url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={applicant.portrait_photo_url}
                          alt="Portrait"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                        No portrait photo
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <EditableField
                      label="Full Name"
                      value={applicant.full_name}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "full_name", v)}
                    />
                    <EditableField
                      label="Nationality"
                      value={applicant.nationality}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "nationality", v)}
                    />
                    <EditableField
                      label="Date of Birth"
                      value={applicant.date_of_birth}
                      type="date"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "date_of_birth", v)}
                    />
                    <EditableField
                      label="Gender"
                      value={applicant.gender}
                      type="select"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ]}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "gender", v)}
                    />
                    <EditableField
                      label="Religion"
                      value={applicant.religion}
                      type="select"
                      options={[
                        { value: "christian", label: "Christian" },
                        { value: "muslim", label: "Muslim" },
                        { value: "buddhist", label: "Buddhist" },
                        { value: "none", label: "None" },
                      ]}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "religion", v)}
                    />
                    <EditableField
                      label="Place of Birth"
                      value={applicant.place_of_birth}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "place_of_birth", v)}
                    />
                  </div>
                </div>

                {/* Passport Information */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Passport Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <EditableField
                      label="Passport Number"
                      value={applicant.passport_number}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "passport_number", v)}
                    />
                    <EditableField
                      label="Passport Type"
                      value={applicant.passport_type}
                      type="select"
                      options={[
                        { value: "ordinary", label: "Ordinary" },
                        { value: "diplomatic", label: "Diplomatic" },
                        { value: "official", label: "Official" },
                        { value: "service", label: "Service" },
                      ]}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "passport_type", v)}
                    />
                    <EditableField
                      label="Issue Date"
                      value={applicant.passport_issue_date}
                      type="date"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "passport_issue_date", v)}
                    />
                    <EditableField
                      label="Expiry Date"
                      value={applicant.passport_expiry_date}
                      type="date"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "passport_expiry_date", v)}
                    />
                    <EditableField
                      label="Issuing Authority"
                      value={applicant.issuing_authority}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "issuing_authority", v)}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Address Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <EditableField
                      label="Permanent Address"
                      value={applicant.permanent_address}
                      type="textarea"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "permanent_address", v)}
                    />
                    <EditableField
                      label="Contact Address"
                      value={applicant.contact_address}
                      type="textarea"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "contact_address", v)}
                    />
                    <EditableField
                      label="Telephone"
                      value={applicant.telephone}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "telephone", v)}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Emergency Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <EditableField
                      label="Contact Name"
                      value={applicant.emergency_contact_name}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "emergency_contact_name", v)}
                    />
                    <EditableField
                      label="Relationship"
                      value={applicant.emergency_contact_relationship}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "emergency_contact_relationship", v)}
                    />
                    <EditableField
                      label="Phone"
                      value={applicant.emergency_contact_phone}
                      onSave={(v) => handleUpdateApplicant(applicant.id, "emergency_contact_phone", v)}
                    />
                    <EditableField
                      label="Address"
                      value={applicant.emergency_contact_address}
                      type="textarea"
                      onSave={(v) => handleUpdateApplicant(applicant.id, "emergency_contact_address", v)}
                    />
                  </div>
                </div>

                {/* Visa Document Section */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Visa Document</p>

                  {document ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <p className="font-medium text-green-800">Visa PDF Uploaded</p>
                          <p className="text-sm text-green-600">
                            {new Date(document.uploaded_at).toLocaleString()}
                          </p>
                        </div>
                        <a
                          href={document.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                        >
                          View PDF
                        </a>
                      </div>

                      {/* Delivery Status */}
                      <div className="flex gap-4 text-sm">
                        <div className={`flex items-center gap-1 ${document.sent_to_whatsapp ? "text-green-600" : "text-gray-400"}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            {document.sent_to_whatsapp ? (
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            ) : (
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            )}
                          </svg>
                          WhatsApp {document.sent_to_whatsapp ? "Sent" : "Pending"}
                        </div>
                        <div className={`flex items-center gap-1 ${document.sent_to_email ? "text-green-600" : "text-gray-400"}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            {document.sent_to_email ? (
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            ) : (
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            )}
                          </svg>
                          Email {document.sent_to_email ? "Sent" : "Pending"}
                        </div>
                      </div>

                      {/* Quick Send Buttons */}
                      <div className="space-y-2">
                        {/* WhatsApp Quick Send */}
                        <a
                          href={`https://wa.me/${application.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `🎉 Your Vietnam Visa is Ready!\n\n` +
                            `Reference: ${application.reference_number}\n` +
                            `Applicant: ${applicant.full_name}\n\n` +
                            `📄 Download your visa document here:\n${document.document_url}\n\n` +
                            `Thank you for using Vietnam Fast Visa!\n` +
                            `Safe travels! ✈️`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Send via WhatsApp
                        </a>

                        {/* Copy Message Button */}
                        <button
                          onClick={() => {
                            const message = `🎉 Your Vietnam Visa is Ready!\n\nReference: ${application.reference_number}\nApplicant: ${applicant.full_name}\n\n📄 Download your visa document here:\n${document.document_url}\n\nThank you for using Vietnam Fast Visa!\nSafe travels! ✈️`;
                            navigator.clipboard.writeText(message);
                            alert('Message copied to clipboard!');
                          }}
                          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Message
                        </button>

                        {/* API Send Button (for email) */}
                        {!document.sent_to_email && (
                          <button
                            onClick={() => handleSendDocument(applicant.id)}
                            disabled={sending === applicant.id}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {sending === applicant.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending Email...
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Send Email
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={(el) => { fileInputRefs.current[applicant.id] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(applicant.id, file);
                        }}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRefs.current[applicant.id]?.click()}
                        disabled={uploading === applicant.id}
                        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {uploading === applicant.id ? (
                          <>
                            <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload Visa PDF
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Notes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                >
                  <option value="pending_payment">Pending Payment</option>
                  <option value="payment_received">Payment Received</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
                  placeholder="Add internal notes..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2 px-4 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: "#c41e3a" }}
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-sm text-gray-500">{new Date(application.created_at).toLocaleString()}</p>
                </div>
              </div>
              {application.paid_at && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <p className="font-medium">Payment Received</p>
                    <p className="text-sm text-gray-500">{new Date(application.paid_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {application.delivered_at && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-gray-500">{new Date(application.delivered_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
