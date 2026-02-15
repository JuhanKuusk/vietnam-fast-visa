import { z } from "zod";

// Trip details validation (Step 1)
export const tripDetailsSchema = z.object({
  applicants: z.number().min(1).max(10),
  // Accept both old schema values and form values for backward compatibility
  purpose: z.enum(["tourist", "tourism", "business", "visiting", "visiting_relatives", "study", "work", "transit", "other"]),
  entryPort: z.string().min(1, "Please select an entry port"),
  entryDate: z.string().min(1, "Please select an entry date"),
  exitDate: z.string().min(1, "Please select an exit date"),
  entryType: z.enum(["single", "multiple"]).optional().default("single"),
  flightNumber: z.string().optional(),
});

// Applicant validation (Step 2) - Extended with all fields
export const applicantSchema = z.object({
  // Personal Information
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  nationality: z.string().min(1, "Please select your nationality"),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  gender: z.enum(["male", "female"]),
  religion: z.enum(["christian", "muslim", "buddhist", "none"]),
  placeOfBirth: z.string().optional(),

  // Passport Information
  passportNumber: z
    .string()
    .min(5, "Passport number must be at least 5 characters")
    .max(20, "Passport number is too long")
    .regex(/^[A-Z0-9]+$/, "Passport number must contain only letters and numbers"),
  passportType: z.string().optional().default("ordinary"),
  passportIssueDate: z.string().optional(),
  passportExpiry: z.string().optional(),
  issuingAuthority: z.string().optional(),

  // Address Information
  permanentAddress: z.string().optional(),
  contactAddress: z.string().optional(),
  telephone: z.string().optional(),

  // Emergency Contact
  emergencyContactName: z.string().optional(),
  emergencyAddress: z.string().optional(),
  emergencyPhone: z.string().optional(),
  emergencyRelationship: z.string().optional(),

  // Contact Information (primary applicant)
  email: z.string().email("Please enter a valid email address"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(20, "WhatsApp number is too long")
    .regex(/^\+?[0-9]+$/, "Please enter a valid phone number"),
});

// Visa speed options
export const visaSpeedSchema = z.enum(["30-min", "4-hour", "1-day", "2-day", "weekend"]);
export type VisaSpeed = z.infer<typeof visaSpeedSchema>;

// Visa speed pricing (in USD) - TIER3 base pricing
export const VISA_SPEED_PRICING: Record<VisaSpeed, number> = {
  "30-min": 199,
  "4-hour": 139,
  "1-day": 99,
  "2-day": 89,
  "weekend": 249,
};

// Multi-entry fee (additional per person)
export const MULTI_ENTRY_FEE = 30;

// Application submission validation
export const applicationSchema = z.object({
  tripDetails: tripDetailsSchema,
  applicants: z.array(applicantSchema).min(1, "At least one applicant is required"),
  language: z.enum(["EN", "ES", "PT", "FR", "RU", "HI"]).optional().default("EN"),
  visaSpeed: visaSpeedSchema.optional().default("30-min"),
});

// Payment validation
export const paymentSchema = z.object({
  applicationId: z.string().uuid(),
  paymentMethod: z.enum(["stripe", "paypal"]),
});

export type TripDetails = z.infer<typeof tripDetailsSchema>;
export type ApplicantData = z.infer<typeof applicantSchema>;
export type ApplicationData = z.infer<typeof applicationSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
