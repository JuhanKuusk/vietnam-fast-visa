import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSupabaseServer } from '@/lib/supabase-server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

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

async function generateWithGemini(prompt: string, config: { temperature?: number; maxOutputTokens?: number } = {}) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: config.temperature ?? 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: config.maxOutputTokens ?? 4096,
        }
      })
    }
  )

  if (!response.ok) {
    throw new Error('Gemini API error')
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

async function searchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) return null

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    if (data.results && data.results.length > 0) {
      // Pick a random image from top 5 results
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length))
      return data.results[randomIndex].urls.regular
    }
  } catch (error) {
    console.error('Unsplash search error:', error)
  }

  return null
}

// Curated fallback images for Vietnam topics
const FALLBACK_IMAGES: Record<string, string[]> = {
  visa: [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200',
  ],
  travel: [
    'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=1200',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200',
  ],
  food: [
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200',
    'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=1200',
  ],
  culture: [
    'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200',
  ],
  default: [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
    'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=1200',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200',
  ]
}

function getFallbackImage(title: string): string {
  const lowerTitle = title.toLowerCase()
  let category = 'default'

  if (lowerTitle.includes('visa') || lowerTitle.includes('passport')) {
    category = 'visa'
  } else if (lowerTitle.includes('food') || lowerTitle.includes('cuisine') || lowerTitle.includes('eat')) {
    category = 'food'
  } else if (lowerTitle.includes('culture') || lowerTitle.includes('tradition') || lowerTitle.includes('temple')) {
    category = 'culture'
  } else if (lowerTitle.includes('travel') || lowerTitle.includes('guide') || lowerTitle.includes('visit')) {
    category = 'travel'
  }

  const images = FALLBACK_IMAGES[category]
  return images[Math.floor(Math.random() * images.length)]
}

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, category_id } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Get category name for context
    let categoryName = 'Travel Guide'
    if (category_id) {
      try {
        const supabase = getSupabaseServer()
        const { data } = await supabase
          .from('blog_categories')
          .select('name')
          .eq('id', category_id)
          .single()
        if (data) categoryName = data.name
      } catch {
        // Use default
      }
    }

    // Run all generations in parallel for speed
    const [contentResult, imageUrl] = await Promise.all([
      // Generate full content with Gemini
      generateWithGemini(`You are an expert travel writer specializing in Vietnam tourism and visa services. Write a comprehensive, SEO-optimized blog article about "${title}" for the category "${categoryName}".

Requirements:
1. Write in HTML format using proper semantic tags (h2, h3, p, ul, li, strong, etc.)
2. The article should be 800-1200 words
3. Include practical, actionable information
4. Write in a friendly, professional tone
5. Include relevant tips and advice for travelers
6. Do NOT include h1 tag (title is separate)
7. Do NOT include any markdown - only HTML
8. Make the content unique and valuable for SEO

Structure the article with:
- An engaging introduction
- Multiple sections with h2 headings
- Bullet points or numbered lists where appropriate
- A conclusion with a call to action

Focus on providing genuine value to travelers visiting Vietnam.`, { temperature: 0.7, maxOutputTokens: 4096 }),

      // Search for image
      searchUnsplashImage(`Vietnam ${title}`)
    ])

    // Clean up content
    const content = contentResult
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    // Get image (use fallback if search failed)
    const featured_image = imageUrl || getFallbackImage(title)

    // Generate excerpt and SEO in parallel
    const [excerptResult, keywordsResult] = await Promise.all([
      generateWithGemini(`Write a 2-sentence excerpt/summary for a blog article titled "${title}" about Vietnam travel. Keep it under 160 characters. Do not use quotes. Just output the text directly.`, { temperature: 0.5, maxOutputTokens: 100 }),
      generateWithGemini(`List 10 SEO keywords for a blog article about "${title}" related to Vietnam travel. Return only comma-separated keywords, nothing else.`, { temperature: 0.3, maxOutputTokens: 100 })
    ])

    const excerpt = excerptResult.trim() || `Complete guide to ${title}. Everything you need to know for your Vietnam trip.`
    const meta_description = excerpt.slice(0, 160)
    const meta_title = title.length > 60 ? title.slice(0, 57) + '...' : title
    const meta_keywords = keywordsResult.trim() || `vietnam, ${title.toLowerCase()}, vietnam travel, vietnam tourism`

    return NextResponse.json({
      content,
      excerpt,
      featured_image,
      meta_title,
      meta_description,
      meta_keywords
    })
  } catch (error) {
    console.error('Error generating full post:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}
