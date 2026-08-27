'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSettings() {
  const [content, setContent] = useState({
    contact_hero_subtitle: 'Get In Touch',
    contact_hero_title: 'We\'re Here for You',
    contact_hero_description: 'Whether you have a question about our treatments, pricing, or want to schedule a consultation, our team is ready to assist you.',
    contact_form_title: 'Send Us a Message',
    contact_info_title: 'Contact Information',
    contact_whatsapp_number: '+62 811 388 8888',
    contact_whatsapp_link: 'https://wa.link/o7f5yk',
    contact_phone_number: '+62 811 388 8888',
    contact_phone_link: 'tel:+628113888888',
    contact_email: 'hello@shazaestheticbali.com',
    contact_address1_title: 'Shaz Main Clinic',
    contact_address1_text: 'Jl. Petitenget No.12, Kerobokan Kelod,\nKec. Kuta Utara, Kab. Badung,\nBali 80361',
    contact_address1_link: 'https://maps.google.com/?q=Jl.+Petitenget+No.12,+Kerobokan+Kelod,+Bali',
    contact_address2_title: 'Shaz Aesthetic Canggu',
    contact_address2_text: 'Jl. Subak Sari No.1, Canggu,\nKec. Kuta Utara, Kab. Badung,\nBali 80361',
    contact_address2_link: 'https://maps.google.com/?q=Jl.+Subak+Sari+No.1,+Canggu,+Bali',
    contact_hours_title: 'Operating Hours',
    contact_hours_days: 'Monday - Sunday',
    contact_hours_time: '09.00 AM - 07.00 PM',
    contact_emergency_title: 'Emergency Contact',
    contact_emergency_text: 'For urgent medical concerns after treatment.',
    contact_emergency_phone: '+62 811 388 8889',
    contact_instagram_link: 'https://instagram.com',
    contact_facebook_link: 'https://facebook.com',
    contact_notification_email: 'davianrevano2020@gmail.com'
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

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setMessage({ type: 'success', text: 'Contact page content updated successfully!' });
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
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">Contact Page Content</h1>
          <p className="text-brand-charcoal/60 mt-1">Manage all text and links on the Contact Us page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-white rounded-lg hover:bg-brand-forest transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Subtitle</label>
              <input type="text" name="contact_hero_subtitle" value={content.contact_hero_subtitle || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Title</label>
              <input type="text" name="contact_hero_title" value={content.contact_hero_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Description</label>
              <textarea name="contact_hero_description" rows={3} value={content.contact_hero_description || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Contact Information & Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">Contact Form Configuration</h2>
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Notification Receiver Email <span className="text-xs text-gray-500 font-normal">(Where the form submissions will be sent)</span></label>
              <input type="email" name="contact_notification_email" value={content.contact_notification_email || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" placeholder="e.g. your_email@gmail.com" />
            </div>
          </div>
          
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">General Contact Info</h2>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Form Section Title</label>
                <input type="text" name="contact_form_title" value={content.contact_form_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Info Section Title</label>
                <input type="text" name="contact_info_title" value={content.contact_info_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">WhatsApp Number</label>
                <input type="text" name="contact_whatsapp_number" value={content.contact_whatsapp_number || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">WhatsApp Link (wa.link/url)</label>
                <input type="text" name="contact_whatsapp_link" value={content.contact_whatsapp_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Phone Number</label>
                <input type="text" name="contact_phone_number" value={content.contact_phone_number || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Phone Link (tel:+...)</label>
                <input type="text" name="contact_phone_link" value={content.contact_phone_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Email Address</label>
              <input type="email" name="contact_email" value={content.contact_email || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            
             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Instagram Link</label>
                <input type="text" name="contact_instagram_link" value={content.contact_instagram_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Facebook Link</label>
                <input type="text" name="contact_facebook_link" value={content.contact_facebook_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">Locations</h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-semibold mb-2">Address 1 (Main Clinic)</h3>
              <div className="space-y-3">
                <input type="text" name="contact_address1_title" placeholder="Clinic Name" value={content.contact_address1_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
                <textarea name="contact_address1_text" placeholder="Address Text (supports newlines)" rows={3} value={content.contact_address1_text || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
                <input type="text" name="contact_address1_link" placeholder="Google Maps Link" value={content.contact_address1_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-semibold mb-2">Address 2 (Canggu)</h3>
              <div className="space-y-3">
                <input type="text" name="contact_address2_title" placeholder="Clinic Name" value={content.contact_address2_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
                <textarea name="contact_address2_text" placeholder="Address Text (supports newlines)" rows={3} value={content.contact_address2_text || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
                <input type="text" name="contact_address2_link" placeholder="Google Maps Link" value={content.contact_address2_link || ''} onChange={handleChange} className="w-full px-4 py-2 bg-white border rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours & Emergency */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">Hours & Emergency</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Hours Title</label>
                  <input type="text" name="contact_hours_title" value={content.contact_hours_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Days</label>
                <input type="text" name="contact_hours_days" placeholder="e.g. Monday - Sunday" value={content.contact_hours_days || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Time</label>
                <input type="text" name="contact_hours_time" placeholder="e.g. 09.00 AM - 07.00 PM" value={content.contact_hours_time || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Emergency Title</label>
                  <input type="text" name="contact_emergency_title" value={content.contact_emergency_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Emergency Phone</label>
                  <input type="text" name="contact_emergency_phone" value={content.contact_emergency_phone || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
               </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Emergency Text</label>
              <textarea name="contact_emergency_text" rows={2} value={content.contact_emergency_text || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
