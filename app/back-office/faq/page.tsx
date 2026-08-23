'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';

const defaultFaqs = [
  {
    category: 'Booking & Policies',
    question: 'How do I book an appointment for a treatment?',
    answer: 'You can seamlessly book an appointment through our online booking portal, by reaching out via WhatsApp, or by calling our clinics directly. We highly recommend booking in advance to secure your preferred date and time.'
  }
];

export default function FaqSettings() {
  const [content, setContent] = useState({
    faq_hero_subtitle: 'Knowledge Base',
    faq_hero_title: 'Frequently Asked Questions',
    faq_hero_description: 'Find clear, detailed answers regarding our booking process, consultations, treatments, recovery, and clinic policies.',
    faq_cta_title: 'Still have questions?',
    faq_cta_description: "Can't find the answer you're looking for? Our team is always here to help you with any inquiries."
  });
  
  const [faqList, setFaqList] = useState(defaultFaqs);
  
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
          
          if (json.data.faq_list) {
            try {
              const parsed = JSON.parse(json.data.faq_list);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setFaqList(parsed);
              }
            } catch(e) {}
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

  const handleFaqChange = (index: number, field: string, value: string) => {
    const updated = [...faqList];
    updated[index] = { ...updated[index], [field]: value };
    setFaqList(updated);
  };

  const addFaq = () => {
    setFaqList([...faqList, { category: 'New Category', question: 'New Question', answer: 'New Answer' }]);
  };

  const removeFaq = (index: number) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const payload = {
        ...content,
        faq_list: JSON.stringify(faqList)
      };
      
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setMessage({ type: 'success', text: 'FAQ content updated successfully!' });
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
          <h1 className="text-3xl font-serif text-brand-charcoal">FAQ Page Content</h1>
          <p className="text-brand-charcoal/60 mt-1">Manage texts and frequently asked questions on the FAQ page.</p>
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
              <input type="text" name="faq_hero_subtitle" value={content.faq_hero_subtitle || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Title</label>
              <input type="text" name="faq_hero_title" value={content.faq_hero_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Description</label>
              <textarea name="faq_hero_description" rows={3} value={content.faq_hero_description || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <h2 className="text-xl font-serif text-brand-charcoal mb-4">Bottom CTA Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Title</label>
              <input type="text" name="faq_cta_title" value={content.faq_cta_title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">Description</label>
              <textarea name="faq_cta_description" rows={2} value={content.faq_cta_description || ''} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* FAQs List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-brand-charcoal">Frequently Asked Questions</h2>
            <button 
              onClick={addFaq}
              className="flex items-center gap-1 text-sm font-medium text-brand-forest hover:text-[#D4AF37] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>
          
          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 border rounded-lg relative group">
                <button 
                  onClick={() => removeFaq(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-3 pr-8">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Category (used for grouping)</label>
                    <input 
                      type="text" 
                      value={faq.category} 
                      onChange={(e) => handleFaqChange(index, 'category', e.target.value)} 
                      className="w-full px-3 py-1.5 bg-white border rounded text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                    <input 
                      type="text" 
                      value={faq.question} 
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)} 
                      className="w-full px-3 py-1.5 bg-white border rounded text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                    <textarea 
                      value={faq.answer} 
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} 
                      rows={3}
                      className="w-full px-3 py-1.5 bg-white border rounded text-sm" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
