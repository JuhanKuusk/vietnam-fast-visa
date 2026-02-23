import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSupabaseServer } from '@/lib/supabase-server'
import { generateSlug } from '@/lib/blog'

// Verify admin authentication
async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) {
    return null
  }

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

// GET - List all blog posts (including drafts) for admin
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabaseServer()
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || undefined
    const offset = (page - 1) * limit

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, slug),
        author:admin_users(id, name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, count, error } = await query

    if (error) throw error

    return NextResponse.json({
      posts: data,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabaseServer()
    const body = await request.json()
    const {
      title,
      content,
      excerpt,
      featured_image,
      category_id,
      status = 'draft',
      meta_title,
      meta_description,
      meta_keywords,
      tags = []
    } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug
    let slug = generateSlug(title)

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    // Create post
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        featured_image,
        category_id: category_id || null,
        author_id: admin.id,
        status,
        meta_title: meta_title || title.slice(0, 70),
        meta_description: meta_description || excerpt?.slice(0, 160),
        meta_keywords,
        published_at: status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (error) throw error

    // Add tags if provided
    if (tags.length > 0 && post) {
      const tagInserts = tags.map((tagId: string) => ({
        post_id: post.id,
        tag_id: tagId
      }))

      await supabase.from('blog_post_tags').insert(tagInserts)
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
