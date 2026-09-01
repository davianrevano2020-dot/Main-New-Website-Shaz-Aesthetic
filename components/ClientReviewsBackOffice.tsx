'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, CheckCircle2, AlertCircle, Loader2, Upload } from 'lucide-react';

const DEFAULT_GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Amanda T.",
    role: "Local Guide",
    date: "2 weeks ago",
    rating: 5,
    text: "The absolute best aesthetic clinic in Bali. I had the signature facial and the results were immediate. The staff are so professional and the environment is just pure luxury.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Client",
    date: "1 month ago",
    rating: 5,
    text: "Dr. Shaz is a true artist. She understood exactly what I wanted to achieve and the results are so natural. I couldn't be happier with my anti-aging treatment.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  }
];

const DEFAULT_VIDEO_TESTIMONIALS = [
  {
    id: 1,
    title: "My Acne Scar Journey",
    name: "Jessica M.",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
    videoUrl: "",
  }
];

const DEFAULT_SUCCESS_CASES = [
  {
    id: 1,
    title: "Reversing Premature Aging",
    client: "Anita, 42",
    treatment: "Signature Lift & Hydration Protocol",
    desc: "Anita came to us feeling her skin looked tired and older than her age due to sun exposure. Over a 3-month personalized protocol combining collagen stimulators and deep hydration therapies, we restored her skin's natural volume and luminosity. Today, she feels confident and radiant.",
    image: "https://images.unsplash.com/photo-1516975080661-460d3d5761eb?q=80&w=1000&auto=format&fit=crop",
    quote: "I look in the mirror and finally see myself again. The results are incredibly natural."
  }
];

export default function ClientReviewsBackOffice() {
  const [activeTab, setActiveTab] = useState<'page_settings' | 'google_reviews' | 'video_testimonials' | 'success_cases'>('page_settings');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        callback(data.url);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const [pageSettings, setPageSettings] = useState({
    reviews_hero_badge: 'CLIENT EXPERIENCES',
    reviews_hero_title: 'Stories of Transformation',
    reviews_hero_subtitle: 'Read what our clients have to say about their journey with SHAZ Aesthetic Clinic.',
    reviews_hero_image: 'https://img.shazaestheticbali.com/header-background-banner.jpg',
    reviews_google_link: '',
  });

  const [googleReviews, setGoogleReviews] = useState<any[]>(DEFAULT_GOOGLE_REVIEWS);
  const [videoTestimonials, setVideoTestimonials] = useState<any[]>(DEFAULT_VIDEO_TESTIMONIALS);
  const [successCases, setSuccessCases] = useState<any[]>(DEFAULT_SUCCESS_CASES);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          setPageSettings(prev => ({
            ...prev,
            reviews_hero_badge: json.data.reviews_hero_badge || prev.reviews_hero_badge,
            reviews_hero_title: json.data.reviews_hero_title || prev.reviews_hero_title,
            reviews_hero_subtitle: json.data.reviews_hero_subtitle || prev.reviews_hero_subtitle,
            reviews_hero_image: json.data.reviews_hero_image || prev.reviews_hero_image,
            reviews_google_link: json.data.reviews_google_link || prev.reviews_google_link,
          }));

          if (json.data.reviews_google) {
            try {
              const parsed = JSON.parse(json.data.reviews_google);
              if (Array.isArray(parsed) && parsed.length > 0) setGoogleReviews(parsed);
            } catch(e) {}
          }
          if (json.data.reviews_video) {
            try {
              const parsed = JSON.parse(json.data.reviews_video);
              if (Array.isArray(parsed) && parsed.length > 0) setVideoTestimonials(parsed);
            } catch(e) {}
          }
          if (json.data.reviews_cases) {
            try {
              const parsed = JSON.parse(json.data.reviews_cases);
              if (Array.isArray(parsed) && parsed.length > 0) setSuccessCases(parsed);
            } catch(e) {}
          }
        }
      } catch (err) {
        console.error('Failed to load content', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const payload = {
      ...pageSettings,
      reviews_google: JSON.stringify(googleReviews),
      reviews_video: JSON.stringify(videoTestimonials),
      reviews_cases: JSON.stringify(successCases),
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.status === 'success') {
        setStatusMessage({ type: 'success', text: 'Reviews content saved successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save content' });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const renderList = (items: any[], setItems: any, title: string, itemTemplate: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
        <div className="p-6 border-b border-brand-beige flex justify-between items-center">
          <h3 className="text-xl font-serif text-brand-charcoal">{title}</h3>
          <button 
            onClick={() => setItems([...items, { ...itemTemplate, id: Date.now() }])}
            className="flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white rounded-lg hover:bg-brand-forest transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        <div className="p-6 space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="p-6 border border-brand-beige rounded-lg bg-[#F9F8F6] relative group">
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => {
                    if (index > 0) {
                      const newItems = [...items];
                      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                      setItems(newItems);
                    }
                  }}
                  className="p-2 text-brand-charcoal/40 hover:text-brand-charcoal bg-white rounded-md border border-brand-beige hover:border-brand-charcoal transition-colors disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (index < items.length - 1) {
                      const newItems = [...items];
                      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
                      setItems(newItems);
                    }
                  }}
                  className="p-2 text-brand-charcoal/40 hover:text-brand-charcoal bg-white rounded-md border border-brand-beige hover:border-brand-charcoal transition-colors disabled:opacity-30"
                  disabled={index === items.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                  className="p-2 text-brand-charcoal/40 hover:text-red-500 bg-white rounded-md border border-brand-beige hover:border-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.keys(itemTemplate).map(key => {
                  if (key === 'id') return null;
                  return (
                    <div key={key} className={key === 'desc' || key === 'text' || key === 'quote' ? 'col-span-1 md:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-brand-charcoal/60 mb-1 uppercase tracking-wider">
                        {key}
                      </label>
                      {key === 'desc' || key === 'text' || key === 'quote' ? (
                        <textarea
                          value={item[key]}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index] = { ...newItems[index], [key]: e.target.value };
                            setItems(newItems);
                          }}
                          className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal bg-white h-24"
                        />
                      ) : key === 'image' || key === 'thumbnail' || key === 'videoUrl' ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item[key]}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index] = { ...newItems[index], [key]: e.target.value };
                              setItems(newItems);
                            }}
                            className="flex-1 px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal bg-white"
                          />
                          <label className={`flex items-center justify-center px-4 py-2 bg-[#F9F8F6] border border-brand-beige rounded-lg hover:bg-brand-beige/50 cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-brand-charcoal/60" /> : <Upload className="w-5 h-5 text-brand-charcoal/60" />}
                            <input type="file" accept={key === 'videoUrl' ? 'video/*' : 'image/*'} className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                                const newItems = [...items];
                                newItems[index] = { ...newItems[index], [key]: url };
                                setItems(newItems);
                              })} 
                            />
                          </label>
                        </div>
                      ) : (
                        <input
                          type={key === 'rating' ? 'number' : 'text'}
                          value={item[key]}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index] = { ...newItems[index], [key]: e.target.value };
                            setItems(newItems);
                          }}
                          className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal bg-white"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 text-brand-charcoal/40">
              No items added yet.
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-charcoal" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">Reviews Content</h1>
          <p className="text-brand-charcoal/60 mt-1">Manage client testimonials, success stories, and reviews page settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-brand-forest text-white rounded-lg hover:bg-brand-charcoal transition-colors font-medium disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
          <p>{statusMessage.text}</p>
        </div>
      )}

      {/* TABS */}
      <div className="flex border-b border-brand-beige overflow-x-auto no-scrollbar">
        {[
          { id: 'page_settings', label: 'Page Settings' },
          { id: 'google_reviews', label: 'Google Reviews' },
          { id: 'video_testimonials', label: 'Video Testimonials' },
          { id: 'success_cases', label: 'Success Cases' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'border-brand-charcoal text-brand-charcoal' 
                : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal hover:border-brand-charcoal/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'page_settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
            <div className="p-6 border-b border-brand-beige">
              <h3 className="text-xl font-serif text-brand-charcoal">Hero Section</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Hero Badge (Kicker)</label>
                <input
                  type="text"
                  value={pageSettings.reviews_hero_badge}
                  onChange={(e) => setPageSettings({ ...pageSettings, reviews_hero_badge: e.target.value })}
                  className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Hero Title</label>
                <input
                  type="text"
                  value={pageSettings.reviews_hero_title}
                  onChange={(e) => setPageSettings({ ...pageSettings, reviews_hero_title: e.target.value })}
                  className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Hero Subtitle</label>
                <textarea
                  value={pageSettings.reviews_hero_subtitle}
                  onChange={(e) => setPageSettings({ ...pageSettings, reviews_hero_subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
                  rows={2}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Hero Background Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pageSettings.reviews_hero_image}
                    onChange={(e) => setPageSettings({ ...pageSettings, reviews_hero_image: e.target.value })}
                    className="flex-1 px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
                  />
                  <label className={`flex items-center justify-center px-4 py-2 bg-[#F9F8F6] border border-brand-beige rounded-lg hover:bg-brand-beige/50 cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-brand-charcoal/60" /> : <Upload className="w-5 h-5 text-brand-charcoal/60" />}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, (url) => setPageSettings({ ...pageSettings, reviews_hero_image: url }))} 
                    />
                  </label>
                </div>
                <div className="mt-4 aspect-[21/9] rounded-lg overflow-hidden bg-brand-beige relative border border-brand-beige">
                  <img src={pageSettings.reviews_hero_image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'google_reviews' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
            <div className="p-6 border-b border-brand-beige">
              <h3 className="text-xl font-serif text-brand-charcoal">Google Maps Link</h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Link for "View all reviews on Google" Button</label>
              <input
                type="text"
                value={pageSettings.reviews_google_link || ''}
                onChange={(e) => setPageSettings({ ...pageSettings, reviews_google_link: e.target.value })}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
          {renderList(
            googleReviews, 
            setGoogleReviews, 
            'Google Reviews', 
            { name: '', role: 'Client', date: 'Just now', rating: 5, text: '', image: '' }
          )}
        </div>
      )}

      {activeTab === 'video_testimonials' && renderList(
        videoTestimonials, 
        setVideoTestimonials, 
        'Video Testimonials', 
        { title: '', name: '', thumbnail: '', videoUrl: '' }
      )}

      {activeTab === 'success_cases' && renderList(
        successCases, 
        setSuccessCases, 
        'Success Cases', 
        { title: '', client: '', treatment: '', desc: '', quote: '', image: '' }
      )}

    </div>
  );
}
