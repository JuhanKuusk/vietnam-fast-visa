export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applicants: {
        Row: {
          application_id: string
          created_at: string | null
          date_of_birth: string
          full_name: string
          gender: string
          id: string
          nationality: string
          passport_number: string
          passport_photo_url: string | null
          portrait_photo_url: string | null
          updated_at: string | null
          visa_document_url: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          date_of_birth: string
          full_name: string
          gender: string
          id?: string
          nationality: string
          passport_number: string
          passport_photo_url?: string | null
          portrait_photo_url?: string | null
          updated_at?: string | null
          visa_document_url?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          date_of_birth?: string
          full_name?: string
          gender?: string
          id?: string
          nationality?: string
          passport_number?: string
          passport_photo_url?: string | null
          portrait_photo_url?: string | null
          updated_at?: string | null
          visa_document_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applicants_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          amount_usd: number
          created_at: string | null
          delivered_at: string | null
          email: string
          entry_date: string
          entry_port: string
          exit_date: string
          id: string
          paid_at: string | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          processed_at: string | null
          reference_number: string
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          whatsapp: string
        }
        Insert: {
          amount_usd?: number
          created_at?: string | null
          delivered_at?: string | null
          email: string
          entry_date: string
          entry_port: string
          exit_date: string
          id?: string
          paid_at?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          processed_at?: string | null
          reference_number: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          whatsapp: string
        }
        Update: {
          amount_usd?: number
          created_at?: string | null
          delivered_at?: string | null
          email?: string
          entry_date?: string
          entry_port?: string
          exit_date?: string
          id?: string
          paid_at?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          processed_at?: string | null
          reference_number?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "pending_payment"
        | "payment_received"
        | "processing"
        | "approved"
        | "rejected"
        | "delivered"
      payment_status: "pending" | "completed" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]
