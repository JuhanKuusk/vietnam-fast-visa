# Tour Booking System - Database Setup Instructions

## Manual Setup via Supabase Dashboard (Recommended)

Since the Supabase CLI doesn't support direct remote execution, please follow these steps:

### Step 1: Access Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/ffeeikroxwuesdfkpbzg/sql
2. Click "New Query"

### Step 2: Execute the SQL

Copy the entire contents of `supabase_tour_tables.sql` and paste it into the SQL Editor, then click "Run".

### Step 3: Verify Tables Created

After execution, verify in the Table Editor:
- Go to: https://supabase.com/dashboard/project/ffeeikroxwuesdfkpbzg/editor
- You should see two new tables:
  - `tour_inquiries`
  - `tour_analytics`

### What Gets Created

**Tables:**
- `tour_inquiries` - Stores all tour booking inquiries
- `tour_analytics` - Tracks tour views and clicks

**Indexes:** (for performance)
- On `tour_id`, `email`, `status`, `created_at`

**Triggers:**
- Auto-update `updated_at` timestamp

**RLS Policies:**
- Public can INSERT (for inquiry forms)
- Only authenticated users can READ/UPDATE

### Alternative: Use the Node.js Script

If you have the service role key:

```bash
export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
node create-tour-tables.js
```

---

## Next Steps

After creating the tables, continue with Phase 2 of the implementation:
- Create TypeScript types
- Create utility functions
- Update tours-data.ts with slugs
