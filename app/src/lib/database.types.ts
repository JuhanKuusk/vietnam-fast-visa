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
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          role: Database["public"]["Enums"]["admin_role"]
          name: string
          created_at: string | null
          last_login_at: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          role?: Database["public"]["Enums"]["admin_role"]
          name: string
          created_at?: string | null
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          role?: Database["public"]["Enums"]["admin_role"]
          name?: string
          created_at?: string | null
          last_login_at?: string | null
        }
        Relationships: []
      }
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
          visa_speed: string | null
          stripe_product_id: string | null
          notes: string | null
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
          visa_speed?: string | null
          stripe_product_id?: string | null
          notes?: string | null
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
          visa_speed?: string | null
          stripe_product_id?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      visa_products: {
        Row: {
          id: string
          name: string
          speed_type: string
          price_usd: number
          stripe_product_id: string | null
          stripe_price_id: string | null
          description: string | null
          is_active: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          speed_type: string
          price_usd: number
          stripe_product_id?: string | null
          stripe_price_id?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          speed_type?: string
          price_usd?: number
          stripe_product_id?: string | null
          stripe_price_id?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string | null
        }
        Relationships: []
      }
      visa_documents: {
        Row: {
          id: string
          application_id: string
          applicant_id: string
          document_url: string
          uploaded_by: string | null
          uploaded_at: string | null
          sent_to_whatsapp: boolean
          sent_to_email: boolean
          whatsapp_sent_at: string | null
          email_sent_at: string | null
        }
        Insert: {
          id?: string
          application_id: string
          applicant_id: string
          document_url: string
          uploaded_by?: string | null
          uploaded_at?: string | null
          sent_to_whatsapp?: boolean
          sent_to_email?: boolean
          whatsapp_sent_at?: string | null
          email_sent_at?: string | null
        }
        Update: {
          id?: string
          application_id?: string
          applicant_id?: string
          document_url?: string
          uploaded_by?: string | null
          uploaded_at?: string | null
          sent_to_whatsapp?: boolean
          sent_to_email?: boolean
          whatsapp_sent_at?: string | null
          email_sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visa_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visa_documents_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visa_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "admin" | "partner"
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
