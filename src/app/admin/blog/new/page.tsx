'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogCategory } from '@/lib/database.types'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [searchingImages, setSearchingImages] = useState(false)
  const [imageResults, setImageResults] = useState<Array<{ url: string; thumb: string; credit: string }>>([])
  const [imageQuery, setImageQuery] = useState('')
  const [generatingContent, setGeneratingContent] = useState(false)

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    status: 'draft' as 'draft' | 'published',
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch('/api/blog/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  async function searchImages() {
    if (!imageQuery.trim()) return

    setSearchingImages(true)
    try {
      const res = await fetch(`/api/admin/blog/images?query=${encodeURIComponent(imageQuery)}`)
      const data = await res.json()
      setImageResults(data.images || [])
    } catch (error) {
      console.error('Error searching images:', error)
    } finally {
      setSearchingImages(false)
    }
  }

  async function generateContent(topic: string) {
    if (!topic.trim()) {
      alert('Please enter a title first')
      return
    }

    setGeneratingContent(true)
    try {
      const res = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category: form.category_id })
      })

      if (!res.ok) throw new Error('Generation failed')

      const data = await res.json()

      setForm(prev => ({
        ...prev,
        content: data.content || prev.content,
        excerpt: data.excerpt || prev.excerpt,
        meta_description: data.meta_description || prev.meta_description,
        meta_keywords: data.meta_keywords || prev.meta_keywords
      }))
    } catch (error) {
      console.error('Error generating content:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setGeneratingContent(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.title || !form.content) {
      alert('Title and content are required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Failed to create post')

      const data = await res.json()
      router.push(`/admin/blog/${data.post.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
          <p className="text-gray-600">Create a new article for your blog</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            placeholder="Enter post title..."
            required
          />

          {/* AI Generate Button */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => generateContent(form.title)}
              disabled={generatingContent || !form.title}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generatingContent ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Generate Content
                </>
              )}
            </button>
            <span className="text-sm text-gray-500 self-center">
              Generate original content based on the title
            </span>
          </div>
        </div>

        {/* Category & Status */}
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>

          {form.featured_image ? (
            <div className="relative mb-4">
              <img
                src={form.featured_image}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, featured_image: '' })}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={form.featured_image}
                onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                placeholder="Enter image URL or search below"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
              />

              {/* Image Search */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={imageQuery}
                  onChange={(e) => setImageQuery(e.target.value)}
                  placeholder="Search free images (Unsplash)..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={searchImages}
                  disabled={searchingImages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {searchingImages ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Image Results */}
              {imageResults.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {imageResults.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setForm({ ...form, featured_image: img.url })
                        setImageResults([])
                      }}
                      className="relative group"
                    >
                      <img
                        src={img.thumb}
                        alt=""
                        className="w-full h-20 object-cover rounded hover:opacity-75 transition-opacity"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100">
                        {img.credit}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Brief summary of the post (shown in listings)..."
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content * (HTML supported)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={20}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-sm"
            placeholder="Write your blog post content here... HTML tags are supported."
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, etc. for formatting.
          </p>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title (max 70 chars)
              </label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                maxLength={70}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="SEO title (defaults to post title)"
              />
              <p className="text-sm text-gray-500 mt-1">{form.meta_title.length}/70 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (max 160 chars)
              </label>
              <textarea
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                maxLength={160}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="SEO description (defaults to excerpt)"
              />
              <p className="text-sm text-gray-500 mt-1">{form.meta_description.length}/160 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                value={form.meta_keywords}
                onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="vietnam visa, travel tips, tourist guide (comma separated)"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </>
            ) : (
              'Create Post'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
