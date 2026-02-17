-- =====================================================
-- Tour Booking System Database Tables
-- Completely separate from visa application tables
-- =====================================================

-- Tour inquiries table
CREATE TABLE IF NOT EXISTS tour_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_number TEXT UNIQUE NOT NULL, -- Format: TI-YYYYMMDD-XXXX

  -- Tour information
  tour_id TEXT NOT NULL,
  tour_name TEXT NOT NULL,
  tour_category TEXT NOT NULL, -- cruise, day-trip, multi-day

  -- Customer information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  nationality TEXT,

  -- Booking details
  preferred_date DATE,
  number_of_adults INTEGER NOT NULL DEFAULT 1,
  number_of_children INTEGER DEFAULT 0,
  special_requests TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, booked, cancelled
  referred_to_affiliate BOOLEAN DEFAULT false,
  affiliate_clicked_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  source_domain TEXT DEFAULT 'vietnamtravel.help',
  user_agent TEXT,
  ip_address TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE
);

-- Tour analytics table
CREATE TABLE IF NOT EXISTS tour_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'view', 'inquiry', 'affiliate_click'
  source_domain TEXT DEFAULT 'vietnamtravel.help',
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- Indexes for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_tour_inquiries_tour_id ON tour_inquiries(tour_id);
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_email ON tour_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_status ON tour_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_created_at ON tour_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_inquiry_number ON tour_inquiries(inquiry_number);

CREATE INDEX IF NOT EXISTS idx_tour_analytics_tour_id ON tour_analytics(tour_id);
CREATE INDEX IF NOT EXISTS idx_tour_analytics_event_type ON tour_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_tour_analytics_created_at ON tour_analytics(created_at DESC);

-- =====================================================
-- Trigger: Auto-update updated_at on tour_inquiries
-- =====================================================

CREATE OR REPLACE FUNCTION update_tour_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tour_inquiries_updated_at ON tour_inquiries;

CREATE TRIGGER tour_inquiries_updated_at
  BEFORE UPDATE ON tour_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_tour_inquiries_updated_at();

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS
ALTER TABLE tour_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for inquiry form submissions)
CREATE POLICY "Allow public insert tour_inquiries"
  ON tour_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert tour_analytics"
  ON tour_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can read/update/delete
CREATE POLICY "Allow authenticated read tour_inquiries"
  ON tour_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update tour_inquiries"
  ON tour_inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read tour_analytics"
  ON tour_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- Comments for documentation
-- =====================================================

COMMENT ON TABLE tour_inquiries IS 'Stores tour booking inquiries from vietnamtravel.help - completely separate from visa applications';
COMMENT ON TABLE tour_analytics IS 'Tracks tour page views, inquiries, and affiliate clicks for analytics';

COMMENT ON COLUMN tour_inquiries.inquiry_number IS 'Unique inquiry reference number in format TI-YYYYMMDD-XXXX';
COMMENT ON COLUMN tour_inquiries.status IS 'Inquiry status: new, contacted, booked, cancelled';
COMMENT ON COLUMN tour_analytics.event_type IS 'Event type: view, inquiry, affiliate_click';
