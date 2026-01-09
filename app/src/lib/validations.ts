import { z } from "zod";

// Trip details validation (Step 1)
export const tripDetailsSchema = z.object({
  applicants: z.number().min(1).max(10),
  purpose: z.enum(["tourist", "business", "visiting"]),
  arrivalPort: z.string().min(1, "Please select an arrival port"),
  entryDate: z.string().min(1, "Please select an entry date"),
  exitDate: z.string().min(1, "Please select an exit date"),
});

// Applicant validation (Step 2)
export const applicantSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  nationality: z.string().min(1, "Please select your nationality"),
  passportNumber: z
    .string()
    .min(5, "Passport number must be at least 5 characters")
    .max(20, "Passport number is too long")
    .regex(/^[A-Z0-9]+$/, "Passport number must contain only letters and numbers"),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  gender: z.enum(["male", "female"]),
  email: z.string().email("Please enter a valid email address"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(20, "WhatsApp number is too long")
    .regex(/^\+?[0-9]+$/, "Please enter a valid phone number"),
});

// Application submission validation
export const applicationSchema = z.object({
  tripDetails: tripDetailsSchema,
  applicants: z.array(applicantSchema).min(1, "At least one applicant is required"),
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
