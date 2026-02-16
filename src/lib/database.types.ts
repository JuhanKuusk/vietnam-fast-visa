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
          created_at: string | null
          email: string
          id: string
          last_login_at: string | null
          name: string
          password_hash: string
          role: Database["public"]["Enums"]["admin_role"]
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login_at?: string | null
          name: string
          password_hash: string
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login_at?: string | null
          name?: string
          password_hash?: string
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Relationships: []
      }
      applicants: {
        Row: {
          application_id: string
          contact_address: string | null
          created_at: string | null
          date_of_birth: string
          emergency_contact_address: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string
          gender: string
          id: string
          issuing_authority: string | null
          nationality: string
          passport_expiry_date: string | null
          passport_issue_date: string | null
          passport_number: string
          passport_photo_url: string | null
          passport_type: string | null
          permanent_address: string | null
          place_of_birth: string | null
          portrait_photo_url: string | null
          religion: string | null
          telephone: string | null
          updated_at: string | null
          visa_document_url: string | null
        }
        Insert: {
          application_id: string
          contact_address?: string | null
          created_at?: string | null
          date_of_birth: string
          emergency_contact_address?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name: string
          gender: string
          id?: string
          issuing_authority?: string | null
          nationality: string
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          passport_number: string
          passport_photo_url?: string | null
          passport_type?: string | null
          permanent_address?: string | null
          place_of_birth?: string | null
          portrait_photo_url?: string | null
          religion?: string | null
          telephone?: string | null
          updated_at?: string | null
          visa_document_url?: string | null
        }
        Update: {
          application_id?: string
          contact_address?: string | null
          created_at?: string | null
          date_of_birth?: string
          emergency_contact_address?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string
          gender?: string
          id?: string
          issuing_authority?: string | null
          nationality?: string
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          passport_number?: string
          passport_photo_url?: string | null
          passport_type?: string | null
          permanent_address?: string | null
          place_of_birth?: string | null
          portrait_photo_url?: string | null
          religion?: string | null
          telephone?: string | null
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
          address_in_vietnam: string | null
          amount_usd: number
          city_province: string | null
          created_at: string | null
          delivered_at: string | null
          email: string
          entry_date: string
          entry_port: string
          entry_type: string | null
          exit_date: string
          exit_port: string | null
          flight_number: string | null
          id: string
          language: string | null
          notes: string | null
          paid_at: string | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          processed_at: string | null
          purpose: string | null
          reference_number: string
          status: Database["public"]["Enums"]["application_status"] | null
          stripe_product_id: string | null
          updated_at: string | null
          visa_speed: string | null
          whatsapp: string
        }
        Insert: {
          address_in_vietnam?: string | null
          amount_usd?: number
          city_province?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email: string
          entry_date: string
          entry_port: string
          entry_type?: string | null
          exit_date: string
          exit_port?: string | null
          flight_number?: string | null
          id?: string
          language?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          processed_at?: string | null
          purpose?: string | null
          reference_number?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          stripe_product_id?: string | null
          updated_at?: string | null
          visa_speed?: string | null
          whatsapp: string
        }
        Update: {
          address_in_vietnam?: string | null
          amount_usd?: number
          city_province?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email?: string
          entry_date?: string
          entry_port?: string
          entry_type?: string | null
          exit_date?: string
          exit_port?: string | null
          flight_number?: string | null
          id?: string
          language?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          processed_at?: string | null
          purpose?: string | null
          reference_number?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          stripe_product_id?: string | null
          updated_at?: string | null
          visa_speed?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      flight_notification_subscriptions: {
        Row: {
          arrival_airport: string | null
          created_at: string | null
          departure_airport: string | null
          email: string
          flight_date: string
          flight_number: string
          id: string
          is_active: boolean | null
          last_status: string | null
          scheduled_departure: string | null
          updated_at: string | null
        }
        Insert: {
          arrival_airport?: string | null
          created_at?: string | null
          departure_airport?: string | null
          email: string
          flight_date: string
          flight_number: string
          id?: string
          is_active?: boolean | null
          last_status?: string | null
          scheduled_departure?: string | null
          updated_at?: string | null
        }
        Update: {
          arrival_airport?: string | null
          created_at?: string | null
          departure_airport?: string | null
          email?: string
          flight_date?: string
          flight_number?: string
          id?: string
          is_active?: boolean | null
          last_status?: string | null
          scheduled_departure?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      visa_documents: {
        Row: {
          applicant_id: string
          application_id: string
          document_url: string
          email_sent_at: string | null
          id: string
          sent_to_email: boolean | null
          sent_to_whatsapp: boolean | null
          uploaded_at: string | null
          uploaded_by: string | null
          whatsapp_sent_at: string | null
        }
        Insert: {
          applicant_id: string
          application_id: string
          document_url: string
          email_sent_at?: string | null
          id?: string
          sent_to_email?: boolean | null
          sent_to_whatsapp?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          whatsapp_sent_at?: string | null
        }
        Update: {
          applicant_id?: string
          application_id?: string
          document_url?: string
          email_sent_at?: string | null
          id?: string
          sent_to_email?: boolean | null
          sent_to_whatsapp?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          whatsapp_sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visa_documents_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visa_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
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
      visa_products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_usd: number
          speed_type: string
          stripe_price_id: string | null
          stripe_product_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_usd: number
          speed_type: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_usd?: number
          speed_type?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
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
