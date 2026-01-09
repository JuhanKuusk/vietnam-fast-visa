# Vietnam Fast Visa - Fullstack Architecture Document

## 1. Introduction

### 1.1 Project Overview
Vietnam Fast Visa is a mobile-first urgent visa service targeting Bali tourists who need Vietnam E-Visas processed within 1.5 hours. The service offers a premium, streamlined experience at $149 USD per applicant.

### 1.2 Document Purpose
This architecture document defines the technical implementation strategy, component structure, data models, and integration patterns for the Vietnam Fast Visa application.

### 1.3 Related Documents
- PRD: `/docs/prd.md`
- Project Brief: `/docs/project-brief.md`

---

## 2. High-Level Architecture

### 2.1 System Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │            Next.js 14+ (App Router)                      │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │    │
│  │  │ Landing │  │  Apply  │  │ Payment │  │  Admin  │    │    │
│  │  │  Page   │  │  Form   │  │  Page   │  │ Portal  │    │    │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           Next.js API Routes + Server Actions            │    │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │    │
│  │  │ Application │  │   Payment    │  │   Webhook     │  │    │
│  │  │   Handler   │  │   Handler    │  │   Handler     │  │    │
│  │  └─────────────┘  └──────────────┘  └───────────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐   │
│  │   Supabase     │  │   Supabase     │  │    Supabase     │   │
│  │   PostgreSQL   │  │    Storage     │  │      Auth       │   │
│  └────────────────┘  └────────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │  Stripe  │  │  PayPal  │  │ WhatsApp │  │    Email     │    │
│  │ Payments │  │ Payments │  │   API    │  │   (Resend)   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Key Design Principles
1. **Mobile-First**: All UI optimized for mobile devices (primary Bali tourist use case)
2. **Speed-Optimized**: Minimal steps, fast loading, instant feedback
3. **Trust-Building**: Professional design, clear pricing, security badges
4. **Conversion-Focused**: Single clear CTA, urgency messaging

---

## 3. Tech Stack

### 3.1 Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ | React framework with App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| Aceternity UI | Latest | Animated components (FileUpload, EncryptedText) |
| Framer Motion | 10.x | Animations |

### 3.2 Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14+ | RESTful endpoints |
| Server Actions | 14+ | Form handling |
| Supabase Client | Latest | Database & Auth SDK |

### 3.3 Database & Storage
| Technology | Purpose |
|------------|---------|
| Supabase PostgreSQL | Application data |
| Supabase Storage | Passport photos, documents |
| Supabase Auth | Admin authentication |

### 3.4 External Services
| Service | Purpose |
|---------|---------|
| Stripe | Primary payment processing |
| PayPal | Alternative payment option |
| WhatsApp Business API | Customer notifications |
| Resend | Email notifications |
| Vercel | Hosting & deployment |

---

## 4. Data Models

### 4.1 Core Entities

#### Application
```typescript
interface Application {
  id: string;                    // UUID
  reference_number: string;      // VNV-YYYYMMDD-XXXX
  status: ApplicationStatus;
  purpose: TravelPurpose;
  arrival_port: string;
  entry_date: Date;
  exit_date: Date;
  total_amount: number;          // cents
  payment_status: PaymentStatus;
  payment_method: 'stripe' | 'paypal';
  payment_id: string;
  created_at: Date;
  updated_at: Date;
  submitted_at: Date;
  processed_at: Date | null;
}

type ApplicationStatus =
  | 'draft'
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'approved'
  | 'rejected'
  | 'cancelled';

type TravelPurpose = 'tourism' | 'business' | 'transit';

type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';
```

#### Applicant
```typescript
interface Applicant {
  id: string;                    // UUID
  application_id: string;        // FK to Application
  full_name: string;
  nationality: string;           // ISO country code
  passport_number: string;
  passport_expiry: Date;
  date_of_birth: Date;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  passport_photo_url: string;
  portrait_photo_url: string;
  created_at: Date;
  updated_at: Date;
}
```

### 4.2 Reference Data

#### Countries (E-Visa Eligible)
```typescript
interface Country {
  code: string;      // ISO 3166-1 alpha-2
  name: string;
  flag_emoji: string;
}
```

80 E-Visa eligible countries including: Australia, UK, USA, Germany, France, Italy, Japan, South Korea, Singapore, Indonesia, etc.

#### Entry Ports
```typescript
interface EntryPort {
  code: string;
  name: string;
  type: 'airport' | 'land' | 'sea';
  city: string;
}
```

43 approved entry ports across Vietnam.

---

## 5. API Specification

### 5.1 Application Endpoints

#### Create Application
```
POST /api/applications
Content-Type: application/json

Request:
{
  "purpose": "tourism",
  "arrival_port": "SGN",
  "entry_date": "2024-03-15",
  "exit_date": "2024-03-30",
  "applicants": [
    {
      "full_name": "John Doe",
      "nationality": "US",
      "passport_number": "123456789",
      "passport_expiry": "2028-05-20",
      "date_of_birth": "1985-06-15",
      "gender": "male",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ]
}

Response: 201
{
  "id": "uuid",
  "reference_number": "VNV-20240310-A1B2",
  "status": "pending_payment",
  "total_amount": 14900,
  "payment_url": "https://..."
}
```

#### Get Application Status
```
GET /api/applications/:reference_number

Response: 200
{
  "reference_number": "VNV-20240310-A1B2",
  "status": "processing",
  "applicants": [...],
  "estimated_completion": "2024-03-10T14:30:00Z"
}
```

### 5.2 Payment Endpoints

#### Create Stripe Payment Intent
```
POST /api/payments/stripe/create-intent
Content-Type: application/json

Request:
{
  "application_id": "uuid",
  "amount": 14900
}

Response: 200
{
  "client_secret": "pi_xxx_secret_xxx",
  "payment_intent_id": "pi_xxx"
}
```

#### Create PayPal Order
```
POST /api/payments/paypal/create-order
Content-Type: application/json

Request:
{
  "application_id": "uuid",
  "amount": 14900
}

Response: 200
{
  "order_id": "xxx",
  "approval_url": "https://paypal.com/..."
}
```

### 5.3 Webhook Endpoints

#### Stripe Webhook
```
POST /api/webhooks/stripe
Stripe-Signature: xxx

Handles: payment_intent.succeeded, payment_intent.failed
```

#### PayPal Webhook
```
POST /api/webhooks/paypal

Handles: PAYMENT.CAPTURE.COMPLETED, PAYMENT.CAPTURE.DENIED
```

### 5.4 File Upload Endpoints

#### Upload Document
```
POST /api/upload
Content-Type: multipart/form-data

Request:
- file: File (image/jpeg, image/png)
- type: 'passport' | 'portrait'
- applicant_id: string

Response: 200
{
  "url": "https://storage.supabase.co/...",
  "path": "applications/xxx/passport.jpg"
}
```

---

## 6. Component Architecture

### 6.1 Page Structure
```
/app
├── page.tsx              # Landing page (Step 1: Trip Details)
├── apply/
│   └── page.tsx          # Step 2: Applicant Details
├── payment/
│   └── page.tsx          # Step 3: Payment
├── confirmation/
│   └── page.tsx          # Success page
├── status/
│   └── [ref]/page.tsx    # Application status tracker
└── admin/
    ├── page.tsx          # Dashboard
    └── applications/
        └── [id]/page.tsx # Application detail
```

### 6.2 Shared Components
```
/components
├── ui/
│   ├── file-upload.tsx       # Aceternity FileUpload
│   ├── encrypted-text.tsx    # Aceternity EncryptedText
│   ├── button.tsx
│   ├── input.tsx
│   └── select.tsx
├── forms/
│   ├── trip-details-form.tsx
│   ├── applicant-form.tsx
│   └── payment-form.tsx
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   └── progress-steps.tsx
└── features/
    ├── photo-upload-section.tsx
    ├── country-selector.tsx
    └── port-selector.tsx
```

### 6.3 Key Component: PhotoUploadSection
```typescript
interface PhotoUploadSectionProps {
  label: string;
  description: string;
  icon: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  captureType: "user" | "environment";
}

// Two modes:
// 1. Camera mode - uses native camera with capture attribute
// 2. Upload mode - uses Aceternity FileUpload with drag-drop
```

---

## 7. Database Schema

### 7.1 Tables

```sql
-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  purpose TEXT NOT NULL,
  arrival_port TEXT NOT NULL,
  entry_date DATE NOT NULL,
  exit_date DATE NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ
);

-- Applicants table
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  passport_expiry DATE NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  passport_photo_url TEXT,
  portrait_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reference: Countries
CREATE TABLE countries (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag_emoji TEXT NOT NULL,
  evisa_eligible BOOLEAN DEFAULT true
);

-- Reference: Entry Ports
CREATE TABLE entry_ports (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL
);

-- Indexes
CREATE INDEX idx_applications_reference ON applications(reference_number);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applicants_application ON applicants(application_id);
```

### 7.2 Row Level Security
```sql
-- Applications: Public can create, only admins can view all
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create applications" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own applications" ON applications
  FOR SELECT USING (
    reference_number = current_setting('app.current_reference', true)
  );

-- Storage policies for passport photos
CREATE POLICY "Anyone can upload to applications bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'applications');
```

---

## 8. External API Integration

### 8.1 Stripe Integration
```typescript
// /lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Create payment intent
export async function createPaymentIntent(amount: number, applicationId: string) {
  return stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: { applicationId },
    automatic_payment_methods: { enabled: true },
  });
}
```

### 8.2 PayPal Integration
```typescript
// /lib/paypal.ts
import { PayPalClient } from '@paypal/checkout-server-sdk';

export async function createOrder(amount: number, applicationId: string) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: (amount / 100).toFixed(2) },
      custom_id: applicationId,
    }],
  });
  return client.execute(request);
}
```

### 8.3 WhatsApp Business API
```typescript
// /lib/whatsapp.ts
export async function sendStatusUpdate(phone: string, status: string, refNumber: string) {
  await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: 'visa_status_update',
        language: { code: 'en' },
        components: [{
          type: 'body',
          parameters: [
            { type: 'text', text: refNumber },
            { type: 'text', text: status },
          ],
        }],
      },
    }),
  });
}
```

---

## 9. Core Workflows

### 9.1 Application Submission Flow
```
1. User fills trip details (landing page)
   └── Validates dates, port selection

2. User fills applicant details (apply page)
   └── For each applicant:
       ├── Personal information
       ├── Passport photo (camera/upload)
       └── Portrait photo (camera/upload)

3. User proceeds to payment (payment page)
   └── Choose Stripe or PayPal
   └── Complete payment

4. System processes payment
   └── Webhook confirms payment
   └── Application status → 'paid'
   └── Send confirmation email/WhatsApp

5. Admin processes visa
   └── Review documents
   └── Submit to Vietnam authority
   └── Update status → 'approved'
   └── Send visa document to user
```

### 9.2 Payment Flow
```
Stripe Flow:
1. Create PaymentIntent (server)
2. Return client_secret
3. Confirm payment (client - Stripe Elements)
4. Webhook: payment_intent.succeeded
5. Update application status

PayPal Flow:
1. Create Order (server)
2. Return approval_url
3. User approves on PayPal
4. Capture payment (server)
5. Webhook: PAYMENT.CAPTURE.COMPLETED
6. Update application status
```

---

## 10. Frontend Architecture

### 10.1 State Management
- **React Hook Form**: Form state management
- **React Query**: Server state (application status)
- **URL State**: Multi-step form progress (query params)

### 10.2 Styling Strategy
- **Tailwind CSS**: Base styling
- **Mobile-first breakpoints**: Default mobile, md: tablet, lg: desktop
- **Dark theme**: Black/emerald color scheme
- **Aceternity components**: Animated interactions

### 10.3 Performance Optimizations
- **Image optimization**: Next.js Image component
- **Code splitting**: Dynamic imports for payment forms
- **Suspense boundaries**: Loading states

---

## 11. Backend Architecture

### 11.1 API Route Structure
```
/app/api
├── applications/
│   ├── route.ts          # POST: Create, GET: List
│   └── [id]/route.ts     # GET: Single, PATCH: Update
├── payments/
│   ├── stripe/
│   │   └── create-intent/route.ts
│   └── paypal/
│       ├── create-order/route.ts
│       └── capture/route.ts
├── webhooks/
│   ├── stripe/route.ts
│   └── paypal/route.ts
└── upload/route.ts
```

### 11.2 Server Actions
```typescript
// /app/actions/applications.ts
'use server'

export async function createApplication(data: ApplicationFormData) {
  // Validate input
  // Create application in Supabase
  // Return reference number
}

export async function updateApplicationStatus(id: string, status: string) {
  // Admin only
  // Update status
  // Trigger notifications
}
```

---

## 12. Project Structure

```
/Vietnam Visa
├── app/                          # Next.js application
│   ├── src/
│   │   ├── app/                  # Pages (App Router)
│   │   │   ├── page.tsx          # Landing
│   │   │   ├── apply/page.tsx    # Step 2
│   │   │   ├── payment/page.tsx  # Step 3
│   │   │   ├── confirmation/     # Success
│   │   │   ├── status/[ref]/     # Status tracker
│   │   │   ├── admin/            # Admin portal
│   │   │   └── api/              # API routes
│   │   ├── components/           # React components
│   │   │   ├── ui/               # Base UI components
│   │   │   ├── forms/            # Form components
│   │   │   └── features/         # Feature components
│   │   ├── lib/                  # Utilities
│   │   │   ├── supabase.ts       # Supabase client
│   │   │   ├── stripe.ts         # Stripe client
│   │   │   ├── paypal.ts         # PayPal client
│   │   │   └── utils.ts          # Helpers
│   │   └── types/                # TypeScript types
│   ├── public/                   # Static assets
│   └── package.json
├── docs/                         # Documentation
│   ├── prd.md
│   ├── project-brief.md
│   └── architecture.md
└── .bmad-core/                   # BMAD framework
```

---

## 13. Deployment Architecture

### 13.1 Infrastructure
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Vercel      │────▶│    Supabase     │────▶│    Stripe/      │
│   (Frontend)    │     │   (Database)    │     │    PayPal       │
│   Singapore     │     │   Singapore     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 13.2 Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ffeeikroxwuesdfkpbzg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# PayPal
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx

# WhatsApp
WHATSAPP_TOKEN=xxx
WHATSAPP_PHONE_NUMBER_ID=xxx

# Email
RESEND_API_KEY=xxx
```

### 13.3 CI/CD Pipeline
- **GitHub Actions**: Automated testing
- **Vercel**: Preview deployments on PR
- **Production**: Auto-deploy on main branch merge

---

## 14. Security & Performance

### 14.1 Security Measures
1. **Input validation**: Zod schemas on all forms
2. **CSRF protection**: Next.js built-in
3. **Rate limiting**: Vercel Edge middleware
4. **Data encryption**: Supabase at-rest encryption
5. **Secure file uploads**: Signed URLs, type validation
6. **Payment security**: PCI-compliant (Stripe/PayPal)

### 14.2 Performance Targets
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTFB | < 200ms |

### 14.3 Optimizations
- Edge functions for API routes
- Image optimization via Next.js
- Lazy loading for non-critical components
- Service worker for offline support

---

## 15. Testing Strategy

### 15.1 Test Types
| Type | Tool | Coverage |
|------|------|----------|
| Unit | Jest | Utilities, helpers |
| Component | React Testing Library | UI components |
| Integration | Playwright | User flows |
| E2E | Playwright | Critical paths |

### 15.2 Critical Test Scenarios
1. Complete application submission flow
2. Payment processing (Stripe & PayPal)
3. File upload with validation
4. Application status tracking
5. Admin approval workflow

---

## 16. Coding Standards

### 16.1 TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface over type for object shapes
- No `any` types

### 16.2 React/Next.js
- Functional components only
- Custom hooks for shared logic
- Server components by default
- Client components only when necessary

### 16.3 Styling
- Tailwind utility classes
- Mobile-first responsive design
- Consistent spacing scale
- Dark theme (black/emerald)

### 16.4 Git Conventions
- Conventional commits (feat:, fix:, docs:)
- Feature branches from main
- PR reviews required
- Squash merge to main

---

## 17. Architecture Checklist

### Pre-Implementation
- [x] PRD approved
- [x] Tech stack defined
- [x] Data models designed
- [x] API specification complete
- [x] Security requirements identified
- [ ] Supabase schema created
- [ ] Environment variables configured

### Implementation Ready
- [x] Next.js app scaffolded
- [x] Landing page (Step 1) created
- [x] Apply page (Step 2) created
- [x] Photo upload component implemented
- [ ] Payment page (Step 3) created
- [ ] API routes implemented
- [ ] Supabase integration complete
- [ ] Stripe integration complete
- [ ] PayPal integration complete

### Pre-Launch
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Security audit complete
- [ ] Monitoring configured
- [ ] Backup strategy implemented

---

## Appendix A: Reference Data

### A.1 E-Visa Eligible Countries (80)
Albania, Argentina, Australia, Austria, Azerbaijan, Belarus, Belgium, Bosnia Herzegovina, Brazil, Brunei, Bulgaria, Canada, Chile, Colombia, Croatia, Cuba, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Georgia, Germany, Greece, Hungary, Iceland, India, Indonesia, Ireland, Italy, Japan, Kazakhstan, Latvia, Lithuania, Luxembourg, Malta, Mexico, Mongolia, Montenegro, Myanmar, Netherlands, New Zealand, North Macedonia, Norway, Panama, Peru, Philippines, Poland, Portugal, Qatar, Romania, Russia, Saudi Arabia, Serbia, Singapore, Slovakia, Slovenia, South Korea, Spain, Sweden, Switzerland, Thailand, Timor Leste, Turkey, UAE, UK, Ukraine, Uruguay, USA, Uzbekistan, Venezuela, Vietnam

### A.2 Entry Ports (43)
**Airports (13):**
Noi Bai (Hanoi), Tan Son Nhat (Ho Chi Minh), Da Nang, Cam Ranh (Nha Trang), Phu Bai (Hue), Cat Bi (Hai Phong), Can Tho, Phu Quoc, Lien Khuong (Da Lat), Van Don (Quang Ninh), Vinh, Tho Xuan (Thanh Hoa), Dong Hoi

**Land Borders (17):**
Mong Cai, Huu Nghi, Lao Bao, Cau Treo, Cha Lo, Nam Can, Lao Cai, Moc Bai, Xa Mat, Tinh Bien, Song Tien, Lao Cai Railway, Ha Tien, Bo Y, Ta Lung, Tay Trang, Na Meo

**Seaports (13):**
Hai Phong, Da Nang, Nha Trang, Quy Nhon, Vung Tau, Ho Chi Minh City, Duong Dong (Phu Quoc), Ha Long, Dung Quat, Cai Mep, Cua Lo, Hon Gai, Chan May

---

*Document Version: 1.0*
*Last Updated: 2024-03-10*
*Author: BMAD Architecture Agent*
