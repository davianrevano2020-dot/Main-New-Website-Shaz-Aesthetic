'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle, Upload , Plus, Trash2} from 'lucide-react';
import Image from 'next/image';

export default function FooterSettings() {
  const [exploreLinks, setExploreLinks] = useState<any[]>([{ text: "Treatments", link: "#treatments" }, { text: "Packages", link: "#packages" }, { text: "Our Doctors", link: "#doctors" }]);
  const [content, setContent] = useState({
    footer_title: '',
    footer_subtitle: '',
    footer_button_text: '',
    footer_button_link: '',
    footer_logo: '',
    footer_tagline: '',
    footer_explore_1_text: '',
    footer_explore_1_link: '',
    footer_explore_2_text: '',
    footer_explore_2_link: '',
    footer_explore_3_text: '',
    footer_explore_3_link: '',
    global_whatsapp_number: '',
    footer_contact_whatsapp: '',
    footer_contact_whatsapp_link: '',
    footer_contact_email: '',
    footer_contact_phone: '',
    footer_social_instagram_link: '',
    footer_social_tiktok_link: '',
    footer_social_facebook_link: '',
    footer_copyright: '',
    footer_privacy_link: '',
    footer_terms_link: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        
        if (json.status === 'success' && json.data) {
          setContent(prev => ({ ...prev, ...json.data }));
          if (json.data.footer_explore_links) {
            try {
              setExploreLinks(JSON.parse(json.data.footer_explore_links));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setContent(prev => ({ ...prev, [fieldName]: data.url }));
        setMessage({ type: 'success', text: 'Logo uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to upload logo' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error occurred during upload' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...content,
        footer_explore_links: JSON.stringify(exploreLinks)
      };

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status === 'success') {
        setMessage({ type: 'success', text: 'Footer settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'System error occurred.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-forest animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-brand-charcoal mb-2">Footer Settings</h1>
        <p className="text-gray-500">Manage content and links displayed at the bottom of your website.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. TOP CTA SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">1. Top Section (Call to Action)</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title (e.g. Your SHAZ Experience Begins Here.)</label>
              <input
                type="text"
                name="footer_title"
                value={content.footer_title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle Description</label>
              <textarea
                name="footer_subtitle"
                value={content.footer_subtitle}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text (e.g. BOOK CONSULTATION)</label>
                <input
                  type="text"
                  name="footer_button_text"
                  value={content.footer_button_text}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  name="footer_button_link"
                  value={content.footer_button_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. BRAND & EXPLORE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">2. Logo & Explore Links</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-40 h-20 bg-gray-800 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                {content.footer_logo ? (
                  <>
                    <img src={content.footer_logo} alt="Footer Logo" className="h-10 object-contain" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer text-white flex flex-col items-center">
                        <Upload className="w-5 h-5 mb-1" />
                        <span className="text-xs font-semibold">Change</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'footer_logo')} className="hidden" disabled={isUploading} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer text-gray-400 hover:text-brand-forest transition-colors flex flex-col items-center p-2">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium text-center">Upload Logo (White)</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'footer_logo')} className="hidden" disabled={isUploading} />
                  </label>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline (e.g. Refined by Medical Expertise.)</label>
                <input
                  type="text"
                  name="footer_tagline"
                  value={content.footer_tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                />
              </div>
            </div>

                        <div className="flex items-center justify-between mt-6 border-t pt-4 mb-4">
              <h3 className="font-semibold text-gray-700">Explore Links</h3>
              <button
                type="button"
                onClick={() => setExploreLinks([...exploreLinks, { text: '', link: '' }])}
                className="flex items-center gap-1 text-sm text-brand-forest font-medium hover:text-brand-charcoal transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
            
            <div className="space-y-3">
              {exploreLinks.map((link, index) => (
                <div key={index} className="flex items-start gap-3 relative group">
                  <div className="grid grid-cols-2 gap-3 flex-grow">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Label</label>
                      <input 
                        type="text" 
                        value={link.text} 
                        onChange={(e) => {
                          const updated = [...exploreLinks];
                          updated[index].text = e.target.value;
                          setExploreLinks(updated);
                        }} 
                        placeholder="Link Label" 
                        className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">URL</label>
                      <input 
                        type="text" 
                        value={link.link} 
                        onChange={(e) => {
                          const updated = [...exploreLinks];
                          updated[index].link = e.target.value;
                          setExploreLinks(updated);
                        }} 
                        placeholder="Link URL" 
                        className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...exploreLinks];
                        updated.splice(index, 1);
                        setExploreLinks(updated);
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                      title="Remove Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CONTACT & SOCIAL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">3. Contact & Social Media</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Contact Info</h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Global WhatsApp Number</label>
                <input type="text" name="global_whatsapp_number" value={content.global_whatsapp_number} onChange={handleChange} placeholder="e.g. 628113889999 (Used for dynamic inquire buttons)" className="w-full px-3 py-2 bg-white border border-brand-forest/30 rounded-lg text-sm" />
                <p className="text-[10px] text-gray-400 mt-1">Used for &quot;Inquire Service/Category&quot; buttons across the site.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">WhatsApp Label</label>
                <input type="text" name="footer_contact_whatsapp" value={content.footer_contact_whatsapp} onChange={handleChange} placeholder="WhatsApp Us" className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">WhatsApp URL</label>
                <input type="text" name="footer_contact_whatsapp_link" value={content.footer_contact_whatsapp_link} onChange={handleChange} placeholder="https://wa.link/..." className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                <input type="text" name="footer_contact_email" value={content.footer_contact_email} onChange={handleChange} placeholder="hello@shazaestheticbali.com" className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                <input type="text" name="footer_contact_phone" value={content.footer_contact_phone} onChange={handleChange} placeholder="+62 811 388 999 9" className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Social Media Links</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Instagram URL</label>
                <input type="text" name="footer_social_instagram_link" value={content.footer_social_instagram_link} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">TikTok URL</label>
                <input type="text" name="footer_social_tiktok_link" value={content.footer_social_tiktok_link} onChange={handleChange} placeholder="https://tiktok.com/..." className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. COPYRIGHT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">4. Copyright & Legal</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Copyright Text</label>
              <input
                type="text"
                name="footer_copyright"
                value={content.footer_copyright}
                onChange={handleChange}
                placeholder="© 2026 SHAZ Aesthetic Clinic. All rights reserved."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Privacy Policy Link</label>
                <input
                  type="text"
                  name="footer_privacy_link"
                  value={content.footer_privacy_link}
                  onChange={handleChange}
                  placeholder="/privacy"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Terms of Service Link</label>
                <input
                  type="text"
                  name="footer_terms_link"
                  value={content.footer_terms_link}
                  onChange={handleChange}
                  placeholder="/terms"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                />
              </div>
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
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
