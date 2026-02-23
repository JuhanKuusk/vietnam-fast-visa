import { supabase } from './supabase'
import type { BlogPost, BlogCategory, BlogTag } from './database.types'

// Fetch published blog posts with pagination
export async function getBlogPosts(options: {
  page?: number
  limit?: number
  categorySlug?: string
  tagSlug?: string
  search?: string
} = {}) {
  const { page = 1, limit = 10, categorySlug, tagSlug, search } = options
  const offset = (page - 1) * limit

  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      author:admin_users(id, name)
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (categorySlug) {
    const { data: category } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  const { data, count, error } = await query

  if (error) throw error

  // Fetch tags for each post
  if (data && data.length > 0) {
    const postIds = data.map(p => p.id)
    const { data: postTags } = await supabase
      .from('blog_post_tags')
      .select(`
        post_id,
        tag:blog_tags(*)
      `)
      .in('post_id', postIds)

    const tagsByPostId = postTags?.reduce((acc, pt) => {
      if (!acc[pt.post_id]) acc[pt.post_id] = []
      if (pt.tag) acc[pt.post_id].push(pt.tag as unknown as BlogTag)
      return acc
    }, {} as Record<string, BlogTag[]>) || {}

    data.forEach(post => {
      (post as BlogPost).tags = tagsByPostId[post.id] || []
    })
  }

  return {
    posts: data as BlogPost[],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      author:admin_users(id, name)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  // Increment view count
  await supabase
    .from('blog_posts')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', data.id)

  // Fetch tags
  const { data: postTags } = await supabase
    .from('blog_post_tags')
    .select('tag:blog_tags(*)')
    .eq('post_id', data.id)

  const post = data as BlogPost
  post.tags = postTags?.map(pt => pt.tag as unknown as BlogTag) || []

  return post
}

// Fetch all categories
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

// Fetch popular tags
export async function getBlogTags(): Promise<BlogTag[]> {
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

// Fetch related posts
export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select(`
      id, title, slug, excerpt, featured_image, published_at,
      category:blog_categories(name, slug)
    `)
    .eq('status', 'published')
    .neq('id', postId)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query
  if (error) throw error
  return (data || []) as unknown as BlogPost[]
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
