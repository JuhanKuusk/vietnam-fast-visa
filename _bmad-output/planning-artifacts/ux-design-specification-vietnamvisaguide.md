---
stepsCompleted: [1]
inputDocuments:
  - .claude/plans/piped-foraging-swan.md
  - vietnamvisaguide/src/data/providers.ts
project: VietnamVisaGuide
date: 2026-02-23
---

# UX Design Specification: VietnamVisaGuide.com

**Author:** JuhanKuusk + Sally (UX Designer)
**Date:** February 2026
**Version:** 1.0

---

## Executive Summary

VietnamVisaGuide is a **comparison portal** for Vietnam visa services. Unlike the existing vietnamtravel.help (which processes visas), this site **compares** services to help travelers make informed decisions.

**Design Philosophy:** "Authoritative Comparison Platform"
- Professional, official appearance (black/white/Vietnam red)
- Trust through transparency
- Mobile-first for airport users
- Google Ads Policy compliant

---

## 1. Visual Design System

### 1.1 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Charcoal Black | `#1a1a1a` | Headers, primary text, nav |
| **Secondary** | Pure White | `#ffffff` | Backgrounds, cards |
| **Accent** | Vietnam Red | `#da251d` | CTAs, badges, highlights |
| **Text Primary** | Dark Gray | `#374151` | Body text |
| **Text Secondary** | Medium Gray | `#6b7280` | Captions, meta |
| **Border** | Light Gray | `#e5e7eb` | Dividers, card borders |
| **Success** | Green | `#059669` | Verified badges |
| **Warning** | Amber | `#d97706` | Deadline alerts |
| **Background** | Off-White | `#f9fafb` | Page background |

### 1.2 Typography

```
Font Family: Inter (Google Fonts)
Fallback: -apple-system, BlinkMacSystemFont, sans-serif

Hierarchy:
- H1: 36px/44px, font-weight: 800, tracking: -0.02em
- H2: 28px/36px, font-weight: 700, tracking: -0.01em
- H3: 22px/28px, font-weight: 600
- Body: 16px/24px, font-weight: 400
- Small: 14px/20px, font-weight: 400
- Caption: 12px/16px, font-weight: 500, uppercase, tracking: 0.05em
```

### 1.3 Spacing Scale

```
4px  - xs (icon padding)
8px  - sm (tight spacing)
16px - md (standard)
24px - lg (section gaps)
32px - xl (major sections)
48px - 2xl (page sections)
64px - 3xl (hero spacing)
```

### 1.4 Border Radius

```
4px  - sm (buttons, inputs)
8px  - md (cards)
12px - lg (feature cards)
9999px - full (badges, pills)
```

### 1.5 Shadow System

```
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
shadow-md: 0 4px 6px rgba(0,0,0,0.07)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
shadow-card: 0 2px 8px rgba(0,0,0,0.08)
```

---

## 2. Trust Badge System

### 2.1 Badge Types

| Badge | Icon | Color | Meaning |
|-------|------|-------|---------|
| **Verified** | ✓ checkmark | Green `#059669` | We confirmed this service operates |
| **Money-Back Guarantee** | Shield | Blue `#2563eb` | Refund policy confirmed |
| **24/7 Support** | Clock | Purple `#7c3aed` | Round-the-clock availability |
| **Weekend Processing** | Lightning | Amber `#d97706` | Works when government doesn't |
| **WhatsApp Support** | WhatsApp icon | Green `#25d366` | Instant messaging available |
| **Established 20XX** | Calendar | Gray `#6b7280` | Years in business |

### 2.2 Badge Visual Specs

```
┌─────────────────────┐
│  ✓  Verified        │  ← Icon + Text
└─────────────────────┘

Size: height 28px
Padding: 6px 12px
Border-radius: 9999px (pill)
Font: 12px, font-weight: 500
Icon: 14px, margin-right: 4px
Background: rgba(color, 0.1)
Border: 1px solid rgba(color, 0.2)
Text color: color at 90% darkness
```

### 2.3 Badge Placement

**In Comparison Table:**
- Show max 3 badges per row
- Priority: Verified > Money-Back > 24/7 > Weekend > WhatsApp

**In Provider Detail Card:**
- Show all applicable badges
- Grid layout: 2 columns on mobile, 4 on desktop

---

## 3. Component Specifications

### 3.1 ComparisonTable Component

**Purpose:** Main comparison view with sorting and filtering

**Desktop Layout (1024px+):**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Sort: Rating ▼] [Sort: Price] [Sort: Speed]     Updated: Feb 2026     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SERVICE          URGENT SPEED    URGENT PRICE   RATING    FEATURES     │
│  ─────────────────────────────────────────────────────────────────────── │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ [Logo] VietnamTravel.Help                                          │ │
│  │        ✓ Verified  🛡️ Money-Back                                   │ │
│  │                                                                     │ │
│  │ 1h + 30min      $199            ★★★★★ 4.8    📞 ✓  📱 ✓  🌙 ✓     │ │
│  │ boarding letter                 (127 reviews)                       │ │
│  │                                                         [Visit →]   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ [Logo] MyVietnamVisa                                               │ │
│  │        ✓ Verified  🛡️ Money-Back                                   │ │
│  │                                                                     │ │
│  │ 1-2 hours       $235            ★★★★☆ 4.5    📞 ✓  📱 ✗  🌙 ✗     │ │
│  │                                 (2,450 reviews)                     │ │
│  │                                                         [Visit →]   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (< 768px):**
```
┌───────────────────────────┐
│  Vietnam Visa Services    │
│  Comparison 2026          │
├───────────────────────────┤
│  [Rating ▼] [Price] [Speed]│
├───────────────────────────┤
│                           │
│  ┌───────────────────────┐│
│  │ VietnamTravel.Help    ││
│  │ ✓ Verified            ││
│  ├───────────────────────┤│
│  │ Urgent:    1h + 30min ││
│  │ Price:     $199       ││
│  │ Rating:    ★★★★★ 4.8  ││
│  │            (127)      ││
│  ├───────────────────────┤│
│  │ 📞 24/7  📱 WhatsApp  ││
│  │ 🌙 Weekend            ││
│  ├───────────────────────┤│
│  │ [    Visit Site →    ]││
│  └───────────────────────┘│
│                           │
│  ┌───────────────────────┐│
│  │ MyVietnamVisa         ││
│  │ ✓ Verified            ││
│  │ ...                   ││
│  └───────────────────────┘│
│                           │
└───────────────────────────┘
```

### 3.2 ProviderDetailCard Component

**Purpose:** Expanded view with full provider information

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌────┐  MyVietnamVisa                                    ✓ Verified   │
│  │LOGO│  "Trusted by over 50,000 travelers since 2015.                 │
│  └────┘   We specialize in urgent Vietnam visa processing..."          │
│                                                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ 🛡️          │ │ 📞          │ │ ★★★★☆       │ │ 2,450       │       │
│  │ Money-Back  │ │ 24/7 Support│ │ 4.5 Rating  │ │ Reviews     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                                         │
│  PRICING                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Standard        │  Express         │  Urgent          │  Weekend│   │
│  │  $65             │  $79             │  $235            │  N/A    │   │
│  │  2 business days │  Same day        │  1-2 hours       │         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────┐  ┌────────────────────────────────┐   │
│  │  PROS                       │  │  CONS                          │   │
│  │  ✓ Established service     │  │  ✗ No weekend processing       │   │
│  │  ✓ Full refund guarantee   │  │  ✗ Higher emergency prices     │   │
│  │  ✓ Detailed guides         │  │  ✗ No WhatsApp support         │   │
│  └─────────────────────────────┘  └────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Visit MyVietnamVisa →                       │   │
│  │                          Affiliate link                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.3 DisclaimerBanner Component

**Purpose:** Google Ads Policy compliance

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ℹ️  Affiliate Disclosure: We may earn a commission when you click     │
│      links on this page. This helps us maintain the site at no extra   │
│      cost to you. Learn more →                                         │
└─────────────────────────────────────────────────────────────────────────┘

Specs:
- Background: #fef3c7 (amber-100)
- Border: 1px solid #fcd34d (amber-300)
- Text: #92400e (amber-800)
- Icon: ℹ️ or Info icon
- Padding: 12px 16px
- Position: Below hero, sticky on scroll (optional)
```

### 3.4 AffiliateLink Component

**Purpose:** Tracked outbound links with clear labeling

```
Button variant:
┌─────────────────────────────┐
│       Visit Site →          │
│       Affiliate link        │
└─────────────────────────────┘

Specs:
- Primary: bg-[#da251d] (Vietnam Red)
- Text: white, 16px, font-weight: 600
- Padding: 12px 24px
- Border-radius: 8px
- "Affiliate link" subtitle: 11px, opacity: 0.8
- Hover: brightness(1.1)
- Active: scale(0.98)
```

### 3.5 RatingStars Component

```
★★★★☆ 4.5 (127 reviews)

Specs:
- Star size: 16px
- Filled: #fbbf24 (amber-400)
- Empty: #d1d5db (gray-300)
- Rating number: 14px, font-weight: 600
- Review count: 14px, color: gray-500, parentheses
```

### 3.6 Header Component

```
┌─────────────────────────────────────────────────────────────────────────┐
│  VietnamVisaGuide                          Compare  Guides  About       │
│  [Logo/Text]                                                            │
└─────────────────────────────────────────────────────────────────────────┘

Mobile:
┌───────────────────────────┐
│  VietnamVisaGuide    [≡]  │
└───────────────────────────┘

Specs:
- Height: 64px (desktop), 56px (mobile)
- Background: white
- Border-bottom: 1px solid #e5e7eb
- Logo: "Vietnam" (black) + "VisaGuide" (red)
- Nav links: 16px, gray-600, hover: red
```

### 3.7 Footer Component

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  VietnamVisaGuide                                                       │
│  Independent comparison of Vietnam visa services                        │
│                                                                         │
│  Resources           Legal              Contact                         │
│  Vietnam Visa Guide  Privacy Policy     info@vietnamvisaguide.com       │
│  Country Guides      Terms of Service                                   │
│  FAQ                 Affiliate Disclosure                               │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│  © 2026 VietnamVisaGuide. All rights reserved.                          │
│  This is an independent comparison website. We are not affiliated       │
│  with any government agency or official visa portal.                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Specs:
- Background: #1a1a1a (black)
- Text: white/gray-400
- Padding: 48px (top/bottom)
- Links: gray-400, hover: white
```

---

## 4. Page Wireframes

### 4.1 Landing Page (/)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                    Vietnam Visa Services                                │
│                    Comparison 2026                                      │
│                                                                         │
│        Find the fastest and most reliable visa service                  │
│        for your trip to Vietnam                                         │
│                                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ 6 Services   │ │ From $52     │ │ 1-4 Hours    │ │ Independent  │   │
│  │ Compared     │ │ Urgent       │ │ Processing   │ │ Reviews      │   │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [DISCLAIMER BANNER]                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [COMPARISON TABLE - see 3.1]                                           │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                    How We Compare Services                              │
│                                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                    │
│  │ 🔍           │ │ ⚖️           │ │ ✓            │                    │
│  │ Research     │ │ Compare      │ │ Verify       │                    │
│  │ We research  │ │ We compare   │ │ We verify    │                    │
│  │ pricing and  │ │ objectively  │ │ claims and   │                    │
│  │ features     │ │ with pros    │ │ update       │                    │
│  │              │ │ and cons     │ │ regularly    │                    │
│  └──────────────┘ └──────────────┘ └──────────────┘                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                    Frequently Asked Questions                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [+] What is the fastest Vietnam visa service?                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [+] Can I get a Vietnam visa on weekends?                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [+] Are these services legitimate?                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Provider Review Page (/reviews/[provider])

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ← Back to comparison                                                   │
│                                                                         │
│  ┌────┐  MyVietnamVisa Review                                          │
│  │LOGO│  ★★★★☆ 4.5 (2,450 reviews)                                     │
│  └────┘  Updated: February 2026                                         │
│                                                                         │
│  ✓ Verified  🛡️ Money-Back  📞 24/7 Support                            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  About MyVietnamVisa                                                    │
│  ──────────────────                                                     │
│  "Trusted by over 50,000 travelers since 2015. MyVietnamVisa            │
│   specializes in urgent Vietnam visa processing with a team of          │
│   experienced visa specialists available 24/7..."                       │
│                                                                         │
│  [Content pulled from their About page]                                 │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Pricing                                                                │
│  ──────                                                                 │
│  [PRICING TABLE - 4 tiers with time and price]                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────┐  ┌────────────────────────────────┐   │
│  │  What We Like               │  │  What Could Be Better          │   │
│  │  (PROS)                     │  │  (CONS)                        │   │
│  └─────────────────────────────┘  └────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Visit MyVietnamVisa →                       │   │
│  │                          Affiliate link                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.3 About Page (/about)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [HEADER]                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  About VietnamVisaGuide                                                 │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Our Mission                                                    │   │
│  │  ──────────                                                     │   │
│  │  VietnamVisaGuide is an independent comparison website...       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  How We Work                                                    │   │
│  │  ───────────                                                    │   │
│  │  Research • Independence • Transparency                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ⚠️ AFFILIATE DISCLOSURE (HIGHLIGHTED SECTION)                  │   │
│  │  ───────────────────────                                        │   │
│  │  We may earn commission from links...                           │   │
│  │  This does not affect our reviews...                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🚫 IMPORTANT DISCLAIMER (RED SECTION)                          │   │
│  │  ─────────────────────                                          │   │
│  │  VietnamVisaGuide is NOT a government website...                │   │
│  │  Official portal: evisa.gov.vn                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Provider About Content Structure

### 5.1 Content to Extract from Each Provider

For each provider, extract from their website:

| Field | Source | Example |
|-------|--------|---------|
| **Tagline** | Homepage hero | "Trusted by 50,000+ travelers" |
| **Description** | About page, 2-3 sentences | Company background, specialization |
| **Founded** | About/Footer | 2015 |
| **Headquarters** | About/Contact | Vietnam, USA |
| **Key Claim** | Homepage | "15-30 minute processing" |
| **Support Channels** | Contact page | Email, WhatsApp, Phone |

### 5.2 Provider Content Template

```typescript
interface ProviderContent {
  id: string;
  name: string;
  tagline: string;           // Short marketing line
  description: string;       // 2-3 sentence about
  founded?: string;          // Year or "N/A"
  headquarters?: string;     // Location
  keyClaim?: string;         // Their main differentiator
  supportChannels: string[]; // ['email', 'whatsapp', 'phone']
  websiteUrl: string;
  lastVerified: string;      // Date we checked
}
```

---

## 6. User Flows

### 6.1 Primary Flow: Compare and Choose

```
[Landing Page]
     │
     ▼
[See comparison table]
     │
     ├─── Sort by Rating/Price/Speed
     │
     ▼
[Scan providers]
     │
     ├─── [View Details] → [Provider Detail Card]
     │                            │
     │                            ▼
     │                     [Read pros/cons]
     │                            │
     │                            ▼
     │                     [Click Visit Site]
     │                            │
     ▼                            │
[Click Visit Site] ◄──────────────┘
     │
     ▼
[Redirect to provider] (tracked)
```

### 6.2 Secondary Flow: Research First

```
[Landing Page]
     │
     ▼
[Scroll to FAQ] or [Click Guides]
     │
     ▼
[Read Vietnam Visa Guide]
     │
     ▼
[Return to comparison]
     │
     ▼
[Choose provider]
```

### 6.3 Trust Flow: Verify Legitimacy

```
[Landing Page]
     │
     ▼
[See disclaimer banner]
     │
     ▼
[Click "Learn more"] → [About page]
     │
     ▼
[Read affiliate disclosure]
     │
     ▼
[Read "Not a government site"]
     │
     ▼
[Trust established] → [Return to compare]
```

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Mobile** | < 640px | Single column, cards, hamburger menu |
| **Tablet** | 640-1023px | 2 columns, expanded cards |
| **Desktop** | 1024px+ | Full table view, sidebar possible |

### 7.1 Mobile-First Priorities

1. **Comparison cards** instead of table rows
2. **Sticky sort bar** for easy filtering
3. **Large tap targets** (min 44px)
4. **Collapsible FAQ** sections
5. **Fixed CTA button** on provider cards

---

## 8. Interaction Patterns

### 8.1 Sort Controls

```
Desktop:  [Rating ▼] [Price] [Speed]  ← Tab-style buttons
Mobile:   [Sort by: Rating ▼]         ← Dropdown select
```

### 8.2 Provider Card Expansion (Mobile)

```
Collapsed:
┌───────────────────────────┐
│ VietnamTravel.Help    [▼] │
│ ★★★★★ 4.8  |  $199/1h    │
└───────────────────────────┘

Expanded:
┌───────────────────────────┐
│ VietnamTravel.Help    [▲] │
│ ★★★★★ 4.8  |  $199/1h    │
├───────────────────────────┤
│ [Full details...]         │
│ [Visit Site →]            │
└───────────────────────────┘
```

### 8.3 FAQ Accordion

```
[+] What is the fastest Vietnam visa service?

[-] What is the fastest Vietnam visa service?
    └── Based on our research, VietnamTravel.Help
        offers the fastest guaranteed processing
        at 1 hour + 30 minutes for boarding letter...
```

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Focus indicators | Visible focus ring on all interactive elements |
| Keyboard navigation | Tab order logical, all actions keyboard accessible |
| Screen reader | Proper ARIA labels, semantic HTML |
| Touch targets | Minimum 44x44px on mobile |

### 9.2 Semantic HTML Structure

```html
<header role="banner">
<nav role="navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
<article> for provider cards
<table> for comparison data (desktop)
```

---

## 10. Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Total page weight | < 500KB |

### 10.1 Optimization Strategies

- Static generation for all pages
- Image optimization (next/image)
- Font subsetting (Inter variable)
- Lazy load below-fold content
- Minimal JavaScript

---

## 11. Implementation Priority

### Phase 1: Core Components
1. Design system (colors, typography, spacing)
2. ComparisonTable with new visual style
3. Trust badges implementation
4. Responsive mobile cards

### Phase 2: Provider Content
5. Provider detail cards with About content
6. Individual review pages
7. Pricing table component

### Phase 3: Trust & Polish
8. Disclaimer banner refinement
9. Footer with legal links
10. FAQ accordion
11. Accessibility audit

---

## Next Steps

**[C] Continue to detailed component implementation?**

This UX specification provides the foundation for redesigning VietnamVisaGuide with the professional, authoritative appearance you described.
