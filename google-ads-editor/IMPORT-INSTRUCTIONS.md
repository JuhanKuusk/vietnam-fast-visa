# Google Ads Editor Import Instructions
## Campaign 1: US - JFK - Urgent Vietnam Visa

---

## BEFORE YOU START

### Prerequisites
1. Download [Google Ads Editor](https://ads.google.com/intl/en/home/tools/ads-editor/) if not installed
2. Sign in with your Google Ads account (545-629-4352)
3. Download latest account data (Ctrl+T / Cmd+T)

### Conversion Tracking (CRITICAL)
Before launching, set up these conversions in Google Ads UI:
1. Go to **Tools & Settings** → **Conversions**
2. Create these conversion actions:
   - **Form Submit** (Primary) - Track /apply form submissions
   - **WhatsApp Click** (Secondary) - Track wa.me link clicks
   - **Phone Call** (Secondary) - Track calls ≥30 seconds

---

## STEP-BY-STEP IMPORT PROCESS

### Step 1: Create the Campaign Manually (Required)

Google Ads Editor CSV import has limitations for campaign settings.
**Create the campaign manually first:**

1. In Google Ads Editor: **Account** → **Add** → **Campaign**
2. Set these values:

| Setting | Value |
|---------|-------|
| Campaign name | `US - JFK - Urgent Vietnam Visa` |
| Campaign type | Search |
| Networks | Search Network only (uncheck Display & Partners) |
| Budget | $50/day (adjust as needed) |
| Bid strategy | Maximize Conversions |
| Status | Paused |

### Step 2: Set Location Targeting (Manual - Critical)

1. Select the campaign
2. Go to **Locations** tab
3. Click **+ Add Location**
4. Choose **Radius targeting**
5. Enter: `John F Kennedy International Airport, NY`
6. Set radius: `10 km` (or 10 miles)
7. **IMPORTANT**: Click **Location options**
   - Select: **Presence: People in or regularly in your targeted locations**
   - Do NOT select "Presence or interest"

### Step 3: Set Ad Schedule (Manual)

1. Select the campaign
2. Go to **Ad schedule** tab
3. Add schedule for **all 7 days**:
   - Start time: `09:00`
   - End time: `17:30`

*This is GMT+8 which equals Vietnam time 08:00-16:30*

### Step 4: Set Device Bid Adjustments (Manual)

1. Select the campaign
2. Go to **Devices** tab
3. Set bid adjustments:
   - Mobile: `+50%`
   - Desktop: `0%`
   - Tablet: `-50%`

### Step 5: Import Keywords (CSV)

1. In Google Ads Editor: **Account** → **Import** → **Import from file**
2. Select: `Campaign1-JFK-Keywords.csv`
3. Review the import preview
4. Click **Import**

This creates:
- Ad Group: "Urgent Visa" with 5 keywords
- Ad Group: "Denied Boarding" with 4 keywords

### Step 6: Import Negative Keywords (CSV)

1. **Account** → **Import** → **Import from file**
2. Select: `Campaign1-JFK-Negative-Keywords.csv`
3. Review and click **Import**

This adds 13 negative keywords at campaign level.

### Step 7: Import RSA Ads (CSV)

1. **Account** → **Import** → **Import from file**
2. Select: `Campaign1-JFK-RSA-Ads.csv`
3. Review headlines and descriptions
4. Click **Import**

This creates 2 Responsive Search Ads (one per ad group).

### Step 8: Review & Post

1. Click **Check Changes** to validate
2. Fix any errors shown
3. Click **Post** to upload to Google Ads

---

## POST-IMPORT CHECKLIST

After posting, verify in Google Ads UI (ads.google.com):

- [ ] Campaign is **Paused** (don't enable until ready)
- [ ] Location = JFK Airport, 10km radius
- [ ] Location option = **Presence only** (not "Presence or interest")
- [ ] Ad schedule = 09:00-17:30 GMT+8 (all days)
- [ ] Mobile bid = +50%
- [ ] Bidding = Maximize Conversions
- [ ] Networks = Search only (no Display, no Partners)
- [ ] All 9 keywords imported correctly
- [ ] All 13 negative keywords active
- [ ] Both RSA ads approved (may take 1-2 days)
- [ ] Conversion tracking is active

---

## FINAL URL PARAMETERS (Optional)

For better tracking, you can add URL parameters:

```
https://vietnamvisahelp.com/apply?utm_source=google&utm_medium=cpc&utm_campaign=jfk-urgent&utm_content={adgroupid}
```

---

## WHEN TO ENABLE

Enable the campaign ONLY when:
1. Conversion tracking is verified working
2. Ads are approved (not "Under review")
3. Landing page disclaimers are live
4. You're ready to spend budget

---

## FILES IN THIS FOLDER

| File | Purpose |
|------|---------|
| `Campaign1-JFK-Keywords.csv` | Keywords for both ad groups |
| `Campaign1-JFK-Negative-Keywords.csv` | 13 campaign-level negatives |
| `Campaign1-JFK-RSA-Ads.csv` | 2 Responsive Search Ads |
| `Campaign1-JFK-Full-Import.csv` | Campaign settings (reference only) |

---

## TROUBLESHOOTING

**"Column not recognized" error:**
- Google Ads Editor column names change occasionally
- Try importing one file at a time
- Or manually create items and copy/paste content

**Location targeting not available in CSV:**
- This is a Google Ads Editor limitation
- Must be set manually (Step 2 above)

**Ad disapproved:**
- Check for forbidden words: "guaranteed", "all nationalities"
- Ensure asterisks (*) are present for qualifying claims
- Review Google Ads policies for visa services

---

## SUPPORT

If you need help:
- Google Ads Editor Help: https://support.google.com/google-ads/editor
- Google Ads Policy Center: https://support.google.com/adspolicy

*Files generated: January 2025*
