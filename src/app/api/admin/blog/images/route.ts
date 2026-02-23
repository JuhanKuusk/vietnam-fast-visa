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

// Free image search using Unsplash API
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    // Use Unsplash API if key is available
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY

    if (unsplashKey) {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' vietnam')}&per_page=12&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashKey}`
          }
        }
      )

      if (res.ok) {
        const data = await res.json()
        const images = data.results.map((img: {
          urls: { regular: string; thumb: string }
          user: { name: string }
        }) => ({
          url: img.urls.regular,
          thumb: img.urls.thumb,
          credit: `Photo by ${img.user.name} on Unsplash`
        }))

        return NextResponse.json({ images })
      }
    }

    // Fallback: Return curated Vietnam images from public URLs
    const fallbackImages = getVietnamImages(query)
    return NextResponse.json({ images: fallbackImages })

  } catch (error) {
    console.error('Error searching images:', error)
    return NextResponse.json({ images: getVietnamImages(query) })
  }
}

// Curated Vietnam-related image URLs (royalty-free/Creative Commons)
function getVietnamImages(query: string): Array<{ url: string; thumb: string; credit: string }> {
  const vietnamImages = [
    {
      url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
      thumb: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200',
      credit: 'Ha Long Bay, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=1200',
      thumb: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=200',
      credit: 'Hoi An, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200',
      thumb: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200',
      credit: 'Rice Terraces, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200',
      thumb: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=200',
      credit: 'Ho Chi Minh City, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200',
      thumb: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200',
      credit: 'Vietnam Street Food'
    },
    {
      url: 'https://images.unsplash.com/photo-1540611025311-01df3cde54b5?w=1200',
      thumb: 'https://images.unsplash.com/photo-1540611025311-01df3cde54b5?w=200',
      credit: 'Hanoi Old Quarter, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1552633102-8f0c6a83d14b?w=1200',
      thumb: 'https://images.unsplash.com/photo-1552633102-8f0c6a83d14b?w=200',
      credit: 'Vietnam Temple'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
      credit: 'Ninh Binh, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=1200',
      thumb: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=200',
      credit: 'Vietnam Beach'
    },
    {
      url: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f16?w=1200',
      thumb: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f16?w=200',
      credit: 'Da Nang, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1558076391-7edf4b8f2b8e?w=1200',
      thumb: 'https://images.unsplash.com/photo-1558076391-7edf4b8f2b8e?w=200',
      credit: 'Sapa, Vietnam'
    },
    {
      url: 'https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=1200',
      thumb: 'https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=200',
      credit: 'Mekong Delta, Vietnam'
    }
  ]

  // Filter based on query keywords if possible
  const queryLower = query.toLowerCase()
  const filtered = vietnamImages.filter(img =>
    img.credit.toLowerCase().includes(queryLower) ||
    queryLower.includes('vietnam') ||
    queryLower.includes('travel') ||
    queryLower.includes('visa')
  )

  return filtered.length > 0 ? filtered : vietnamImages
}
