import { getBlogPosts } from '@/lib/blog'
import type { BlogPost } from '@/lib/database.types'

export async function GET() {
  const baseUrl = 'https://vietnamvisahelp.com'

  let posts: BlogPost[] = []
  try {
    const result = await getBlogPosts({ limit: 20 })
    posts = result.posts
  } catch (error) {
    console.error('Error fetching posts for RSS:', error)
  }

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>VietnamVisaHelp Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Vietnam travel tips, visa guides, and cultural insights for travelers.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>VietnamVisaHelp Blog</title>
      <link>${baseUrl}</link>
    </image>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || '')}</description>
      <pubDate>${new Date(post.published_at || post.created_at).toUTCString()}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category.name)}</category>` : ''}
      ${post.featured_image ? `<enclosure url="${escapeXml(post.featured_image)}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
