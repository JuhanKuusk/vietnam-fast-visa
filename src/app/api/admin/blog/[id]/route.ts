import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSupabaseServer } from '@/lib/supabase-server'
import { generateSlug } from '@/lib/blog'

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

// GET - Get single post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = getSupabaseServer()

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:admin_users(id, name)
      `)
      .eq('id', id)
      .single()

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Get tags
    const { data: postTags } = await supabase
      .from('blog_post_tags')
      .select('tag:blog_tags(*)')
      .eq('post_id', id)

    return NextResponse.json({
      post: {
        ...post,
        tags: postTags?.map(pt => pt.tag) || []
      }
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = getSupabaseServer()
    const body = await request.json()

    const {
      title,
      content,
      excerpt,
      featured_image,
      category_id,
      status,
      meta_title,
      meta_description,
      meta_keywords,
      tags = []
    } = body

    // Get existing post
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('status, published_at')
      .eq('id', id)
      .single()

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Update slug if title changed
    let slug = title ? generateSlug(title) : undefined

    if (slug) {
      const { data: duplicate } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single()

      if (duplicate) {
        slug = `${slug}-${Date.now()}`
      }
    }

    // Determine published_at
    let published_at = existingPost.published_at
    if (status === 'published' && existingPost.status !== 'published') {
      published_at = new Date().toISOString()
    }

    // Update post
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update({
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(featured_image !== undefined && { featured_image }),
        category_id: category_id || null,
        ...(status && { status }),
        ...(meta_title !== undefined && { meta_title }),
        ...(meta_description !== undefined && { meta_description }),
        ...(meta_keywords !== undefined && { meta_keywords }),
        published_at,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Update tags
    await supabase.from('blog_post_tags').delete().eq('post_id', id)

    if (tags.length > 0) {
      const tagInserts = tags.map((tagId: string) => ({
        post_id: id,
        tag_id: tagId
      }))
      await supabase.from('blog_post_tags').insert(tagInserts)
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = getSupabaseServer()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
