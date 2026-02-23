-- Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  meta_keywords TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

-- Blog Tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE
);

-- Blog Post Tags (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Vietnam Visa', 'vietnam-visa', 'Everything about Vietnam visa requirements, processes, and tips'),
  ('Travel Guide', 'travel-guide', 'Vietnam travel destinations, tips, and cultural insights'),
  ('Vietnam Laws', 'vietnam-laws', 'Important laws and regulations for tourists and expats'),
  ('Food & Culture', 'food-culture', 'Vietnamese cuisine, traditions, and cultural experiences'),
  ('News & Updates', 'news-updates', 'Latest news about Vietnam tourism and regulations')
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read tags" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Public can read post tags" ON blog_post_tags
  FOR SELECT USING (true);

-- Admin policies (service role bypasses RLS)
