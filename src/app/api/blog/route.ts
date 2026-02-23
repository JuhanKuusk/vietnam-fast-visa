import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/blog'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const categorySlug = searchParams.get('category') || undefined
    const tagSlug = searchParams.get('tag') || undefined
    const search = searchParams.get('search') || undefined

    const result = await getBlogPosts({
      page,
      limit,
      categorySlug,
      tagSlug,
      search
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
