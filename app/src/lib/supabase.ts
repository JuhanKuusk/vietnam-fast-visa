import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Application {
  id: string;
  reference_number: string;
  entry_date: string;
  exit_date: string;
  entry_port: string;
  email: string;
  whatsapp: string;
  amount_usd: number;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  payment_method: string | null;
  payment_intent_id: string | null;
  status:
    | "pending_payment"
    | "payment_received"
    | "processing"
    | "approved"
    | "rejected"
    | "delivered";
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  processed_at: string | null;
  delivered_at: string | null;
}

export interface Applicant {
  id: string;
  application_id: string;
  full_name: string;
  nationality: string;
  passport_number: string;
  date_of_birth: string;
  gender: string;
  passport_photo_url: string | null;
  portrait_photo_url: string | null;
  visa_document_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateApplicationInput {
  entry_date: string;
  exit_date: string;
  entry_port: string;
  email: string;
  whatsapp: string;
  amount_usd: number;
}

export interface CreateApplicantInput {
  application_id: string;
  full_name: string;
  nationality: string;
  passport_number: string;
  date_of_birth: string;
  gender: string;
}
