'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, Image as ImageIcon, Save, CheckCircle2, 
  AlertCircle, Loader2, ArrowLeft, Globe, FileText 
} from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string | null;
  publishedDate: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  seoTitle: string | null;
  seoDescription: string | null;
}

export default function BackOfficeBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Article>>({
    status: 'DRAFT'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/articles');
      const json = await res.json();
      if (json.status === 'success') {
        setArticles(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch articles', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!editingArticle) {
      setFormData({
        ...formData,
        title,
        slug: generateSlug(title)
      });
    } else {
      setFormData({
        ...formData,
        title
      });
    }
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setFormData({
      status: 'DRAFT',
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      category: '',
      author: '',
      seoTitle: '',
      seoDescription: ''
    });
    setView('form');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData(article);
    setView('form');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      setStatusMessage({ type: 'error', text: 'Title, slug, and content are required.' });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const url = editingArticle ? `/api/articles/${editingArticle.id}` : '/api/articles';
      const method = editingArticle ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const json = await res.json();
      
      if (json.status === 'success') {
        setStatusMessage({ type: 'success', text: 'Article saved successfully!' });
        await fetchArticles();
        setTimeout(() => {
          setView('list');
          setStatusMessage(null);
        }, 1500);
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to save article.' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.status === 'success') {
        setArticles(articles.filter(a => a.id !== id));
        setDeletingId(null);
      }
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const toggleStatus = async (article: Article) => {
    const newStatus = article.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {view === 'list' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-brand-charcoal">Blog Management</h1>
              <p className="text-brand-charcoal/60 mt-1">Manage articles, categories, and SEO settings for the blog.</p>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-forest text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Article
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-brand-beige overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-sand/30 border-b border-brand-beige">
                  <tr>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Article</th>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-beige">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-brand-charcoal/60">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-forest" />
                        Loading articles...
                      </td>
                    </tr>
                  ) : articles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-brand-charcoal/60">
                        No articles found. Click "Add Article" to create one.
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr key={article.id} className="hover:bg-brand-sand/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {article.featuredImage ? (
                              <img src={article.featuredImage} alt={article.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-brand-charcoal line-clamp-1">{article.title}</p>
                              <p className="text-xs text-brand-charcoal/60 mt-0.5">/{article.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-brand-charcoal/80">
                          {article.category || '-'}
                        </td>
                        <td className="px-6 py-4 text-brand-charcoal/80">
                          {article.author || '-'}
                        </td>
                        <td className="px-6 py-4 text-brand-charcoal/80">
                          {article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleStatus(article)}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-colors ${
                              article.status === 'PUBLISHED' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            {article.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(article)}
                              className="p-2 text-brand-charcoal/60 hover:text-brand-forest hover:bg-brand-forest/10 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {deletingId === article.id ? (
                              <div className="flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">
                                <span className="text-xs font-bold text-rose-600">Delete?</span>
                                <button onClick={() => handleDelete(article.id)} className="text-xs font-bold text-white bg-rose-600 px-2 py-1 rounded hover:bg-rose-700">Yes</button>
                                <button onClick={() => setDeletingId(null)} className="text-xs font-bold text-brand-charcoal bg-white border px-2 py-1 rounded hover:bg-gray-50">No</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeletingId(article.id)}
                                className="p-2 text-brand-charcoal/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === 'form' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('list')}
                className="p-2 text-brand-charcoal/60 hover:bg-brand-sand rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-serif font-bold text-brand-charcoal">
                {editingArticle ? 'Edit Article' : 'New Article'}
              </h1>
            </div>
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
              statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
            } border`}>
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 font-serif text-lg"
                    placeholder="Enter article title"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Slug (URL) *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus-within:ring-2 focus-within:ring-brand-forest/20">
                    <span className="text-gray-400 text-sm">/blog/</span>
                    <input
                      type="text"
                      required
                      value={formData.slug || ''}
                      onChange={e => setFormData({...formData, slug: e.target.value})}
                      className="w-full bg-transparent border-none focus:outline-none text-sm"
                      placeholder="article-slug"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Excerpt (Short Summary)</label>
                  <textarea
                    value={formData.excerpt || ''}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="Brief summary to appear on article cards..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Full Content *</label>
                  <textarea
                    required
                    value={formData.content || ''}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    rows={15}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm font-mono leading-relaxed"
                    placeholder="Write your article content here (HTML/Markdown supported depending on your frontend setup)..."
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
                <h3 className="text-sm font-bold text-brand-charcoal uppercase flex items-center gap-2 border-b border-brand-beige pb-3">
                  <Globe className="w-4 h-4" /> SEO Settings
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={formData.seoTitle || ''}
                    onChange={e => setFormData({...formData, seoTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="Custom title for search engines"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">SEO Description</label>
                  <textarea
                    value={formData.seoDescription || ''}
                    onChange={e => setFormData({...formData, seoDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="Meta description for search results"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
                <h3 className="text-sm font-bold text-brand-charcoal uppercase flex items-center gap-2 border-b border-brand-beige pb-3">
                  <FileText className="w-4 h-4" /> Publish Settings
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED'})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                  >
                    <option value="DRAFT">Draft (Not visible)</option>
                    <option value="PUBLISHED">Published (Visible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishedDate ? formData.publishedDate.split('T')[0] : ''}
                    onChange={e => setFormData({...formData, publishedDate: e.target.value ? new Date(e.target.value).toISOString() : ''})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="e.g. Skincare, Anti-Aging"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
                <h3 className="text-sm font-bold text-brand-charcoal uppercase flex items-center gap-2 border-b border-brand-beige pb-3">
                  <ImageIcon className="w-4 h-4" /> Featured Image
                </h3>

                <div>
                  {formData.featuredImage && (
                    <img src={formData.featuredImage} alt="Featured" className="w-full h-40 object-cover rounded-xl mb-4 bg-gray-100 border border-brand-beige" />
                  )}
                  <input
                    type="text"
                    value={formData.featuredImage || ''}
                    onChange={e => setFormData({...formData, featuredImage: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-sm"
                    placeholder="Image URL (e.g. https://...)"
                  />
                  <p className="text-[10px] text-gray-500 mt-2">Paste a direct image URL.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-forest text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-sm disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
