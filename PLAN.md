# Vietnam Visa Admin Dashboard & Backend Implementation Plan

## Overview
Build an admin dashboard with:
- 2 user roles: Admin (you) and Partner (Vietnam visa supplier)
- Stripe products for each visa speed
- Application management with PDF upload and delivery via WhatsApp + Email

---

## Phase 1: Database Schema Updates

### New Tables to Create

**1. `admin_users` table**
```sql
- id: UUID (PK)
- email: TEXT (unique)
- password_hash: TEXT
- role: ENUM ['admin', 'partner']
- name: TEXT
- created_at: TIMESTAMP
- last_login_at: TIMESTAMP
```

**2. `visa_products` table**
```sql
- id: UUID (PK)
- name: TEXT (e.g., "30-Min Express Visa")
- speed_type: TEXT (e.g., "30-min", "4-hour", "1-day", "2-day", "weekend")
- price_usd: INTEGER (in cents, e.g., 14900 for $149)
- stripe_product_id: TEXT
- stripe_price_id: TEXT
- description: TEXT
- is_active: BOOLEAN
- created_at: TIMESTAMP
```

**3. `visa_documents` table**
```sql
- id: UUID (PK)
- application_id: UUID (FK to applications)
- applicant_id: UUID (FK to applicants)
- document_url: TEXT (Supabase Storage URL)
- uploaded_by: UUID (FK to admin_users)
- uploaded_at: TIMESTAMP
- sent_to_whatsapp: BOOLEAN
- sent_to_email: BOOLEAN
- whatsapp_sent_at: TIMESTAMP
- email_sent_at: TIMESTAMP
```

### Updates to Existing Tables

**`applications` table - add columns:**
```sql
- visa_speed: TEXT (e.g., "30-min", "4-hour", "1-day", "2-day", "weekend")
- stripe_product_id: TEXT
- notes: TEXT (internal notes for admin/partner)
```

**`applicants` table - already has:**
- `visa_document_url` - will be updated when PDF is uploaded

---

## Phase 2: Stripe Products Setup

### Products to Create in Stripe Dashboard:
1. **30-Min Express Visa** - $149
2. **4-Hour Express Visa** - $129
3. **1-Day Service** - $111
4. **2-Day Service** - $99
5. **Weekend/Holiday Visa** - $249

### API Integration:
- Update `/api/create-payment-intent` to use Stripe Price IDs
- Store `stripe_product_id` and `stripe_price_id` in `visa_products` table
- Payment flow uses these IDs for checkout

---

## Phase 3: Admin Authentication

### Implementation:
- Simple JWT-based authentication (no Supabase Auth complexity)
- Password hashing with bcrypt
- HTTP-only cookies for session management
- Middleware to protect `/admin/*` routes

### API Routes:
```
POST /api/admin/login     - Login with email/password
POST /api/admin/logout    - Clear session
GET  /api/admin/me        - Get current user info
```

### Initial Users (seeded):
1. Admin (you) - full access
2. Partner - can view applications, upload PDFs, send documents

---

## Phase 4: Admin Dashboard Pages

### Route Structure:
```
/admin
  /login                  - Login page
  /dashboard              - Overview with stats
  /applications           - List all applications (filterable)
  /applications/[id]      - Single application detail + PDF upload
  /products               - Manage visa products (admin only)
  /settings               - Account settings
```

### Dashboard Features:
- **Overview**: Total applications, revenue, pending/completed stats
- **Applications List**:
  - Filter by status, date, visa speed
  - Search by reference number, email, name
  - Quick status badges
- **Application Detail**:
  - View all applicant info
  - View uploaded passport/portrait photos
  - Update status dropdown
  - Upload PDF visa document
  - Send to WhatsApp + Email button
  - View delivery history
  - Internal notes field

---

## Phase 5: PDF Upload & Delivery

### Upload Flow:
1. Partner navigates to application detail page
2. Clicks "Upload Visa PDF" for specific applicant
3. PDF stored in Supabase Storage: `visa-documents/{applicationId}/{applicantId}/visa.pdf`
4. Record created in `visa_documents` table
5. `applicants.visa_document_url` updated

### Delivery Flow:
1. After upload, "Send to Client" button appears
2. Clicking sends PDF to both WhatsApp and Email
3. Uses existing Twilio WhatsApp setup for WhatsApp
4. Uses Resend API for email (need to add)
5. Delivery timestamps recorded in `visa_documents` table

### WhatsApp Message:
```
Your Vietnam Visa is Ready!

Reference: VN-XXXXXX
Applicant: [Full Name]

Please find your visa document attached.

Thank you for using Vietnam Fast Visa!
```

### Email Template:
- Professional HTML email with PDF attachment
- Same content as WhatsApp
- Download link as backup

---

## Phase 6: Client-Facing Updates

### Confirmation Page Enhancement:
- If visa document is available, show "Download Visa" button
- Real-time status updates (polling or WebSocket)
- Show delivery status (sent to WhatsApp, sent to Email)

### Status Tracking:
- Add `/track` page where clients can check status with reference number + email
- Shows current status and visa document download if available

---

## File Structure (New Files)

```
/app/src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   ├── login/page.tsx          # Login page
│   │   ├── dashboard/page.tsx      # Overview dashboard
│   │   ├── applications/
│   │   │   ├── page.tsx            # Applications list
│   │   │   └── [id]/page.tsx       # Application detail
│   │   ├── products/page.tsx       # Products management
│   │   └── settings/page.tsx       # Settings
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts      # Login endpoint
│   │   │   ├── logout/route.ts     # Logout endpoint
│   │   │   ├── me/route.ts         # Current user
│   │   │   ├── applications/
│   │   │   │   ├── route.ts        # List applications
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts    # Get/update application
│   │   │   │       └── upload/route.ts  # Upload PDF
│   │   │   ├── send-document/route.ts   # Send PDF to client
│   │   │   └── products/route.ts   # CRUD products
│   │   └── track/route.ts          # Client status tracking
│   └── track/page.tsx              # Client tracking page
├── components/
│   └── admin/
│       ├── sidebar.tsx             # Admin sidebar navigation
│       ├── application-table.tsx   # Applications data table
│       ├── application-detail.tsx  # Detail view component
│       ├── pdf-uploader.tsx        # PDF upload component
│       └── stats-cards.tsx         # Dashboard stat cards
├── lib/
│   ├── auth.ts                     # JWT helpers
│   ├── resend.ts                   # Email service
│   └── admin-middleware.ts         # Auth middleware
└── contexts/
    └── AdminContext.tsx            # Admin auth context
```

---

## Implementation Order

### Step 1: Database Migrations
1. Create `admin_users` table
2. Create `visa_products` table
3. Create `visa_documents` table
4. Add columns to `applications` table
5. Seed initial admin users
6. Seed visa products with Stripe IDs

### Step 2: Authentication
1. Create JWT auth helpers
2. Create login/logout/me API routes
3. Create auth middleware
4. Create login page

### Step 3: Admin Layout & Dashboard
1. Create admin layout with sidebar
2. Create dashboard with stats
3. Create applications list page
4. Create application detail page

### Step 4: PDF Upload
1. Create upload API route
2. Create PDF uploader component
3. Update applicant record with document URL

### Step 5: Document Delivery
1. Set up Resend for email
2. Create send-document API route
3. Integrate Twilio WhatsApp with PDF
4. Create delivery UI in admin

### Step 6: Client Tracking
1. Create track API route
2. Create track page
3. Update confirmation page with download

### Step 7: Stripe Products
1. Create products in Stripe Dashboard
2. Update payment flow to use Stripe Price IDs
3. Create products management page (admin only)

---

## Environment Variables Needed

```
# Existing (already configured)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN

# New (to add)
JWT_SECRET=<generate-random-64-char-string>
RESEND_API_KEY=<from-resend.com>
ADMIN_EMAIL=<your-email>
ADMIN_PASSWORD=<initial-password>
PARTNER_EMAIL=<partner-email>
PARTNER_PASSWORD=<initial-password>
```

---

## Security Considerations

1. **Authentication**: JWT tokens with HTTP-only cookies, short expiry (24h)
2. **Authorization**: Role-based access (admin vs partner)
3. **Password Storage**: bcrypt with salt rounds = 12
4. **File Upload**: Validate PDF mime type, max 10MB
5. **API Protection**: All `/api/admin/*` routes require valid JWT
6. **Rate Limiting**: Consider adding for login endpoint

---

## Estimated Scope

- **Database migrations**: 5 migrations
- **API routes**: ~10 new routes
- **Pages**: 7 new pages
- **Components**: ~10 new components

Ready to implement upon approval.
