'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogCategory } from '@/lib/database.types'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [step, setStep] = useState<'input' | 'preview'>('input')

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    status: 'published' as 'draft' | 'published',
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

  async function generateFullPost() {
    if (!form.title.trim()) {
      alert('Please enter a title')
      return
    }

    setGenerating(true)
    try {
      // Generate everything in one API call
      const res = await fetch('/api/admin/blog/generate-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          category_id: form.category_id
        })
      })

      if (!res.ok) throw new Error('Generation failed')

      const data = await res.json()

      setForm(prev => ({
        ...prev,
        content: data.content || '',
        excerpt: data.excerpt || '',
        featured_image: data.featured_image || '',
        meta_title: data.meta_title || prev.title,
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || ''
      }))

      setStep('preview')
    } catch (error) {
      console.error('Error generating post:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  async function savePost() {
    if (!form.title || !form.content) {
      alert('Title and content are required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Failed to create post')

      const data = await res.json()
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setSaving(false)
    }
  }

  // Simple input view
  if (step === 'input') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Blog Post</h1>
          <p className="text-gray-600">Enter a title and AI will generate everything automatically</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Blog Post Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="e.g., Vietnam E-Visa Requirements 2026"
              autoFocus
            />
          </div>

          {/* Category Select */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category (optional)
            </label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Auto-detect category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateFullPost}
            disabled={generating || !form.title.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {generating ? (
              <>
                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating Article, Image & SEO...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Full Blog Post</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            AI will create: Article content + Featured image + SEO metadata
          </p>
        </div>

        {/* Quick Ideas */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Ideas:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Vietnam E-Visa Guide 2026',
              'Best Time to Visit Vietnam',
              'Vietnam Travel Tips for First-Timers',
              'Ha Long Bay Travel Guide',
              'Vietnamese Street Food Guide',
              'Vietnam Customs Regulations',
              'Hanoi vs Ho Chi Minh City',
              'Vietnam Budget Travel Tips'
            ].map((idea) => (
              <button
                key={idea}
                onClick={() => setForm({ ...form, title: idea })}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Preview view
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preview & Publish</h1>
          <p className="text-gray-600">Review the generated content before publishing</p>
        </div>
        <button
          onClick={() => setStep('input')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Featured Image */}
          {form.featured_image && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={form.featured_image}
                alt="Featured"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <input
                  type="text"
                  value={form.featured_image}
                  onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  placeholder="Image URL"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Box */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Publish</h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={savePost}
              disabled={saving}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Publish Post
                </>
              )}
            </button>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SEO</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={form.meta_title}
                  onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Meta Description</label>
                <textarea
                  value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Keywords</label>
                <input
                  type="text"
                  value={form.meta_keywords}
                  onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
