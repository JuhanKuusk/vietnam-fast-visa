import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSupabaseServer } from '@/lib/supabase-server'

async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) return null

  try {
    const supabase = getSupabaseServer()
    const { data: session } = await supabase
      .from('admin_users')
      .select('id, email, name, role')
      .eq('id', token)
      .single()

    return session
  } catch {
    return null
  }
}

// Vietnam-focused content templates for different categories
const contentTemplates: Record<string, { topics: string[]; outline: string }> = {
  'vietnam-visa': {
    topics: [
      'Vietnam E-Visa Requirements',
      'Vietnam Visa on Arrival Guide',
      'Vietnam Visa Exemptions',
      'Vietnam Business Visa',
      'Vietnam Tourist Visa Duration',
      'Vietnam Visa Extension Process',
      'Vietnam Multiple Entry Visa',
      'Documents Needed for Vietnam Visa'
    ],
    outline: `
      <h2>Overview</h2>
      <p>[Introduction to the topic and why it matters for travelers]</p>

      <h2>Requirements</h2>
      <ul>
        <li>[Key requirement 1]</li>
        <li>[Key requirement 2]</li>
        <li>[Key requirement 3]</li>
      </ul>

      <h2>Step-by-Step Process</h2>
      <ol>
        <li>[Step 1 description]</li>
        <li>[Step 2 description]</li>
        <li>[Step 3 description]</li>
      </ol>

      <h2>Important Tips</h2>
      <p>[Practical advice for applicants]</p>

      <h2>Frequently Asked Questions</h2>
      <p>[Common questions and answers]</p>
    `
  },
  'travel-guide': {
    topics: [
      'Best Time to Visit Vietnam',
      'Top Destinations in Vietnam',
      'Vietnam Itinerary Guide',
      'Vietnam Transportation Tips',
      'Vietnam Budget Travel',
      'Vietnam Luxury Travel',
      'Vietnam Beach Destinations',
      'Vietnam Mountain Trekking'
    ],
    outline: `
      <h2>Introduction</h2>
      <p>[Overview of the destination or topic]</p>

      <h2>Best Time to Visit</h2>
      <p>[Seasonal information and recommendations]</p>

      <h2>Top Attractions</h2>
      <ul>
        <li><strong>[Attraction 1]</strong> - [Description]</li>
        <li><strong>[Attraction 2]</strong> - [Description]</li>
        <li><strong>[Attraction 3]</strong> - [Description]</li>
      </ul>

      <h2>Getting There & Around</h2>
      <p>[Transportation information]</p>

      <h2>Where to Stay</h2>
      <p>[Accommodation recommendations]</p>

      <h2>Local Tips</h2>
      <p>[Insider advice for visitors]</p>
    `
  },
  'vietnam-laws': {
    topics: [
      'Vietnam Traffic Laws for Tourists',
      'Vietnam Drug Laws',
      'Vietnam Photography Restrictions',
      'Vietnam Customs Regulations',
      'Vietnam Work Permit Requirements',
      'Vietnam Property Laws for Foreigners',
      'Vietnam Import Restrictions',
      'Vietnam Currency Regulations'
    ],
    outline: `
      <h2>Overview</h2>
      <p>[Introduction to the legal topic]</p>

      <h2>Key Regulations</h2>
      <ul>
        <li>[Regulation 1]</li>
        <li>[Regulation 2]</li>
        <li>[Regulation 3]</li>
      </ul>

      <h2>Penalties & Enforcement</h2>
      <p>[What happens if you violate these laws]</p>

      <h2>How to Stay Compliant</h2>
      <p>[Practical advice for visitors]</p>

      <h2>Important Contacts</h2>
      <p>[Embassy, police, and emergency contacts]</p>
    `
  },
  'food-culture': {
    topics: [
      'Vietnamese Street Food Guide',
      'Regional Cuisines of Vietnam',
      'Vietnamese Coffee Culture',
      'Traditional Vietnamese Festivals',
      'Vietnamese Etiquette Tips',
      'Best Vietnamese Dishes to Try',
      'Vietnamese Markets Guide',
      'Vegetarian Food in Vietnam'
    ],
    outline: `
      <h2>Introduction</h2>
      <p>[Overview of the cultural topic]</p>

      <h2>History & Background</h2>
      <p>[Cultural context and origins]</p>

      <h2>What to Expect</h2>
      <ul>
        <li>[Key aspect 1]</li>
        <li>[Key aspect 2]</li>
        <li>[Key aspect 3]</li>
      </ul>

      <h2>Where to Experience</h2>
      <p>[Recommended locations]</p>

      <h2>Tips for Visitors</h2>
      <p>[Cultural do's and don'ts]</p>
    `
  },
  'news-updates': {
    topics: [
      'Vietnam Tourism Updates',
      'New Vietnam Visa Policies',
      'Vietnam Travel Restrictions',
      'Vietnam Airport Updates',
      'Vietnam Holiday Calendar',
      'Vietnam Weather Alerts',
      'Vietnam Event Calendar',
      'Vietnam Infrastructure Updates'
    ],
    outline: `
      <h2>Latest Update</h2>
      <p>[Current news summary]</p>

      <h2>What Changed</h2>
      <ul>
        <li>[Change 1]</li>
        <li>[Change 2]</li>
      </ul>

      <h2>Who Is Affected</h2>
      <p>[Groups impacted by this update]</p>

      <h2>What You Need to Do</h2>
      <p>[Action items for travelers]</p>

      <h2>Effective Date</h2>
      <p>[When the changes take effect]</p>
    `
  }
}

// SEO-focused keywords for Vietnam content
const seoKeywords = {
  visa: ['vietnam visa', 'vietnam e-visa', 'vietnam visa online', 'vietnam visa requirements', 'vietnam visa application', 'vietnam travel visa', 'vietnam tourist visa'],
  travel: ['vietnam travel', 'visit vietnam', 'vietnam tourism', 'vietnam vacation', 'vietnam trip', 'vietnam holiday', 'vietnam tour'],
  general: ['vietnam', 'vietnamese', 'hanoi', 'ho chi minh city', 'saigon', 'da nang', 'hoi an', 'ha long bay', 'southeast asia']
}

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { topic, category } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // Get category template or use default
    const categorySlug = category ? await getCategorySlug(category) : 'travel-guide'
    const template = contentTemplates[categorySlug] || contentTemplates['travel-guide']

    // Generate content based on the topic and template
    const content = generateContent(topic, template.outline)
    const excerpt = generateExcerpt(topic)
    const metaDescription = generateMetaDescription(topic)
    const metaKeywords = generateKeywords(topic, categorySlug)

    return NextResponse.json({
      content,
      excerpt,
      meta_description: metaDescription,
      meta_keywords: metaKeywords
    })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

async function getCategorySlug(categoryId: string): Promise<string> {
  try {
    const supabase = getSupabaseServer()
    const { data } = await supabase
      .from('blog_categories')
      .select('slug')
      .eq('id', categoryId)
      .single()

    return data?.slug || 'travel-guide'
  } catch {
    return 'travel-guide'
  }
}

function generateContent(topic: string, outline: string): string {
  // Create a structured article based on the topic
  const topicLower = topic.toLowerCase()

  // Replace placeholders with topic-specific content
  let content = outline

  // Add topic-specific introduction
  const introduction = `
    <p>Planning a trip to Vietnam? Understanding <strong>${topic}</strong> is essential for a smooth and enjoyable journey.
    This comprehensive guide covers everything you need to know, from basic requirements to insider tips that will help you
    make the most of your Vietnam experience.</p>

    <p>Vietnam has become one of Southeast Asia's most popular destinations, welcoming millions of visitors each year.
    Whether you're visiting for business or leisure, being well-prepared will ensure your trip goes smoothly.</p>
  `

  content = content.replace('[Introduction to the topic and why it matters for travelers]', introduction.trim())
  content = content.replace('[Overview of the topic]', introduction.trim())
  content = content.replace('[Overview of the destination or topic]', introduction.trim())
  content = content.replace('[Introduction to the legal topic]', introduction.trim())
  content = content.replace('[Overview of the cultural topic]', introduction.trim())
  content = content.replace('[Current news summary]', introduction.trim())

  // Add generic helpful content for other sections
  const genericSections = {
    '[Key requirement 1]': 'Valid passport with at least 6 months validity',
    '[Key requirement 2]': 'Completed application form with accurate information',
    '[Key requirement 3]': 'Recent passport-sized photograph meeting specifications',
    '[Step 1 description]': 'Gather all required documents and information',
    '[Step 2 description]': 'Submit your application through the appropriate channel',
    '[Step 3 description]': 'Wait for processing and receive your approval',
    '[Practical advice for applicants]': 'Apply early to avoid last-minute issues. Double-check all information before submitting. Keep copies of all documents.',
    '[Common questions and answers]': 'Contact our support team for specific questions about your situation.',
    '[Seasonal information and recommendations]': 'Vietnam has diverse weather patterns. The best time to visit depends on your destination within the country.',
    '[Transportation information]': 'Vietnam has excellent domestic flight connections, buses, and trains connecting major cities.',
    '[Accommodation recommendations]': 'From budget hostels to luxury resorts, Vietnam offers accommodations for every budget.',
    '[Insider advice for visitors]': 'Learn a few Vietnamese phrases, respect local customs, and always carry cash for smaller purchases.',
    '[What happens if you violate these laws]': 'Violations can result in fines, deportation, or imprisonment. Always follow local regulations.',
    '[Practical advice for visitors]': 'When in doubt, ask locals or your hotel staff for guidance on local customs and regulations.',
    '[Embassy, police, and emergency contacts]': 'Keep your embassy contact information handy. Emergency number in Vietnam: 113 (police), 115 (ambulance).',
    '[Cultural context and origins]': 'Vietnamese culture has been shaped by thousands of years of history, blending influences from various civilizations.',
    '[Recommended locations]': 'Major cities like Hanoi and Ho Chi Minh City offer the best variety, while smaller towns provide authentic experiences.',
    '[Cultural do\'s and don\'ts]': 'Remove shoes when entering homes, dress modestly at temples, and always show respect to elders.',
    '[Groups impacted by this update]': 'All travelers to Vietnam should be aware of these changes.',
    '[Action items for travelers]': 'Review your travel plans and ensure compliance with the latest requirements.',
    '[When the changes take effect]': 'Check official sources for the most current effective dates.'
  }

  for (const [placeholder, replacement] of Object.entries(genericSections)) {
    content = content.replace(placeholder, replacement)
  }

  // Clean up any remaining placeholders
  content = content.replace(/\[[^\]]+\]/g, 'Please refer to official sources for the most current information.')

  return content.trim()
}

function generateExcerpt(topic: string): string {
  return `Complete guide to ${topic}. Learn everything you need to know about ${topic.toLowerCase()} for your Vietnam trip, including requirements, tips, and step-by-step instructions.`
}

function generateMetaDescription(topic: string): string {
  return `${topic} - Your complete guide for Vietnam travel. Learn requirements, tips, and expert advice for a smooth trip to Vietnam.`
}

function generateKeywords(topic: string, categorySlug: string): string {
  const topicWords = topic.toLowerCase().split(' ').filter(w => w.length > 3)
  const categoryKeywords = categorySlug.includes('visa') ? seoKeywords.visa : seoKeywords.travel
  const combined = [...new Set([...topicWords, ...categoryKeywords, ...seoKeywords.general])]
  return combined.slice(0, 10).join(', ')
}
