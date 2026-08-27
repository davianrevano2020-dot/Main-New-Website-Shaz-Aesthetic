'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function GeneralSettings() {
  const [content, setContent] = useState<Record<string, string>>({
    google_analytics_id: '',
    google_site_verification: '',
    resend_api_key: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        
        if (json.status === 'success' && json.data) {
          setContent(prev => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-forest" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">General Settings</h1>
          <p className="text-brand-charcoal/60 mt-1">Manage global website settings and integrations.</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Analytics & SEO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">Analytics & SEO</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Analytics Measurement ID</label>
              <input
                type="text"
                name="google_analytics_id"
                value={content.google_analytics_id || ''}
                onChange={handleChange}
                placeholder="e.g. G-XXXXXXXXXX"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
              <p className="text-xs text-gray-500 mt-2">Enter your GA4 Measurement ID to enable traffic tracking.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Search Console Verification Code</label>
              <input
                type="text"
                name="google_site_verification"
                value={content.google_site_verification || ''}
                onChange={handleChange}
                placeholder="e.g. 1a2b3c4d5e6f7g8h9i0j"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
              <p className="text-xs text-gray-500 mt-2">Enter the content value of the HTML tag provided by Google Search Console.</p>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">API Keys & Integrations</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resend API Key</label>
              <input
                type="password"
                name="resend_api_key"
                value={content.resend_api_key || ''}
                onChange={handleChange}
                placeholder="re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
              <p className="text-xs text-gray-500 mt-2">Required for sending contact form emails. Get this from your Resend.com dashboard.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-brand-forest text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-sage transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
