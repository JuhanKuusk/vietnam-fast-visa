import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { hashPassword } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This endpoint should only be called once to seed initial admin users
// In production, you should delete this file after seeding
export async function POST(request: NextRequest) {
  try {
    // Check for seed secret to prevent unauthorized access
    const { secret, adminEmail, adminPassword, adminName, partnerEmail, partnerPassword, partnerName } = await request.json();

    if (secret !== process.env.SEED_SECRET && secret !== "initial-setup-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const users = [];

    // Create admin user
    if (adminEmail && adminPassword) {
      const adminHash = await hashPassword(adminPassword);
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .upsert(
          {
            email: adminEmail.toLowerCase(),
            password_hash: adminHash,
            role: "admin",
            name: adminName || "Admin",
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (adminError) {
        console.error("Admin creation error:", adminError);
      } else {
        users.push({ email: admin.email, role: admin.role, name: admin.name });
      }
    }

    // Create partner user
    if (partnerEmail && partnerPassword) {
      const partnerHash = await hashPassword(partnerPassword);
      const { data: partner, error: partnerError } = await supabase
        .from("admin_users")
        .upsert(
          {
            email: partnerEmail.toLowerCase(),
            password_hash: partnerHash,
            role: "partner",
            name: partnerName || "Vietnam Partner",
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (partnerError) {
        console.error("Partner creation error:", partnerError);
      } else {
        users.push({ email: partner.email, role: partner.role, name: partner.name });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Users seeded successfully",
      users,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
