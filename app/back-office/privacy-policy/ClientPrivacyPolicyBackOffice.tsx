'use client';

import React, { useState } from 'react';
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ClientPrivacyPolicyBackOffice({ initialContent }: { initialContent?: Record<string, any> }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<Record<string, any>>({
    privacy_hero_title: 'Privacy Policy',
    privacy_hero_subtitle: 'How we collect, use, and protect your personal and medical information',
    privacy_effective_date: '1 September 2026',
    privacy_contact_email: 'shazaestheticbali@gmail.com',
    privacy_contact_phone: '+62 823-4217-6585',
    privacy_contact_address: 'Seminyak, Bali, Indonesia',
    privacy_last_updated: '1 September 2026',
    ...initialContent,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');
      
      setSaveStatus({ type: 'success', message: 'Privacy Policy content saved successfully!' });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSaveStatus({ type: 'error', message: 'Failed to save changes. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">Privacy Policy Settings</h1>
          <p className="text-brand-charcoal/60 mt-2">Manage the content for the privacy policy page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-brand-charcoal text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-forest transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          saveStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {saveStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {saveStatus.message}
        </div>
      )}

      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
          <div className="p-6 border-b border-brand-beige">
            <h3 className="text-xl font-serif text-brand-charcoal">Header Section</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Title</label>
              <input
                type="text"
                value={formData.privacy_hero_title || ''}
                onChange={(e) => handleChange('privacy_hero_title', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.privacy_hero_subtitle || ''}
                onChange={(e) => handleChange('privacy_hero_subtitle', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Effective Date</label>
              <input
                type="text"
                value={formData.privacy_effective_date || ''}
                onChange={(e) => handleChange('privacy_effective_date', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
          <div className="p-6 border-b border-brand-beige">
            <h3 className="text-xl font-serif text-brand-charcoal">Contact Information (Section 13)</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Email Address</label>
              <input
                type="email"
                value={formData.privacy_contact_email || ''}
                onChange={(e) => handleChange('privacy_contact_email', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.privacy_contact_phone || ''}
                onChange={(e) => handleChange('privacy_contact_phone', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Clinic Address</label>
              <input
                type="text"
                value={formData.privacy_contact_address || ''}
                onChange={(e) => handleChange('privacy_contact_address', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Last Updated Text</label>
              <input
                type="text"
                value={formData.privacy_last_updated || ''}
                onChange={(e) => handleChange('privacy_last_updated', e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
