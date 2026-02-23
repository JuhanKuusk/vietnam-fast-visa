import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/blog'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const relatedPosts = await getRelatedPosts(post.id, post.category_id)

    return NextResponse.json({
      post,
      relatedPosts
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}
