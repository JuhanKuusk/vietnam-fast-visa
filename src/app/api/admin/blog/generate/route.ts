import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSupabaseServer } from '@/lib/supabase-server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

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

    // Get category name for context
    let categoryName = 'Travel Guide'
    if (category) {
      try {
        const supabase = getSupabaseServer()
        const { data } = await supabase
          .from('blog_categories')
          .select('name')
          .eq('id', category)
          .single()
        if (data) categoryName = data.name
      } catch {
        // Use default
      }
    }

    // Generate content using Gemini AI
    const prompt = `You are an expert travel writer specializing in Vietnam tourism and visa services. Write a comprehensive, SEO-optimized blog article about "${topic}" for the category "${categoryName}".

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

Focus on providing genuine value to travelers visiting Vietnam.`

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        })
      }
    )

    if (!geminiResponse.ok) {
      const error = await geminiResponse.text()
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate content with Gemini')
    }

    const geminiData = await geminiResponse.json()
    const generatedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Clean up the content - remove markdown code blocks if present
    let content = generatedContent
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    // Generate excerpt
    const excerptPrompt = `Write a 2-sentence excerpt/summary for a blog article titled "${topic}" about Vietnam travel. Keep it under 160 characters. Do not use quotes.`

    const excerptResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: excerptPrompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 100 }
        })
      }
    )

    let excerpt = `Complete guide to ${topic}. Everything you need to know for your Vietnam trip.`
    if (excerptResponse.ok) {
      const excerptData = await excerptResponse.json()
      excerpt = excerptData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || excerpt
    }

    // Generate meta description
    const metaDescription = excerpt.slice(0, 160)

    // Generate keywords
    const keywordsPrompt = `List 10 SEO keywords for a blog article about "${topic}" related to Vietnam travel. Return only comma-separated keywords, nothing else.`

    const keywordsResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: keywordsPrompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 100 }
        })
      }
    )

    let metaKeywords = `vietnam, ${topic.toLowerCase()}, vietnam travel, vietnam tourism`
    if (keywordsResponse.ok) {
      const keywordsData = await keywordsResponse.json()
      metaKeywords = keywordsData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || metaKeywords
    }

    return NextResponse.json({
      content,
      excerpt,
      meta_description: metaDescription,
      meta_keywords: metaKeywords
    })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}
