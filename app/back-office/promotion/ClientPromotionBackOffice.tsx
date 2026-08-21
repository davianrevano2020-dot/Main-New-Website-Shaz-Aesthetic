'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';


// Re-using the default data for initialization if needed
const DEFAULT_PROMOTIONS = [
  {
    id: 'promo-1',
    category: 'Current Promotions',
    title: 'Radiance Glow Up',
    desc: 'Experience our signature facial treatment combined with advanced LED light therapy for an instant, luminous glow.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
    iconName: 'Sparkles',
    benefits: ['Deep Cleansing', 'LED Light Therapy', 'Hydration Boost'],
    validUntil: 'Available all month',
    tag: 'Popular'
  }
];

export default function ClientPromotionBackOffice({ initialContent }: { initialContent: any }) {
  const [activeTab, setActiveTab] = useState<'hero' | 'campaigns' | 'refer' | 'gift'>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Hero Banner State
  const [heroBadge, setHeroBadge] = useState(initialContent?.promo_hero_badge || "Exclusive Offers");
  const [heroTitle1, setHeroTitle1] = useState(initialContent?.promo_hero_title1 || "Celebrate Beauty");
  const [heroTitle2, setHeroTitle2] = useState(initialContent?.promo_hero_title2 || "with Special Privileges");
  const [heroDesc, setHeroDesc] = useState(initialContent?.promo_hero_desc || "Discover our curated selection of festive promotions, limited-time offers, and exclusive membership benefits designed to make you shine.");

  // Campaigns State
  const [campaigns, setCampaigns] = useState<any[]>(() => {
    if (initialContent?.promo_campaigns) {
      try {
        const parsed = JSON.parse(initialContent.promo_campaigns);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error parsing campaigns', e);
      }
    }
    return DEFAULT_PROMOTIONS;
  });

  const [editingCampaign, setEditingCampaign] = useState<any | null>(null);

  // Refer a Friend State
  const [referTitle, setReferTitle] = useState(initialContent?.promo_refer_title || "Refer a Friend, \nShare the Radiance");
  const [referDesc, setReferDesc] = useState(initialContent?.promo_refer_desc || "At SHAZ Aesthetic Clinic, we believe that self-care is best shared. Introduce your friends to our premium treatments and you will both be rewarded with exclusive perks.");
  const [referImg, setReferImg] = useState(initialContent?.promo_refer_img || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop");

  // Gift Voucher State
  const [giftTitle, setGiftTitle] = useState(initialContent?.promo_gift_title || "The Gift of \nTimeless Elegance");
  const [giftDesc, setGiftDesc] = useState(initialContent?.promo_gift_desc || "Looking for the perfect gift? SHAZ Aesthetic Clinic gift vouchers offer a luxurious experience and exceptional results. Treat your loved ones to bespoke aesthetic care.");
  const [giftImg, setGiftImg] = useState(initialContent?.promo_gift_img || "");

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const updates = {
        promo_hero_badge: heroBadge,
        promo_hero_title1: heroTitle1,
        promo_hero_title2: heroTitle2,
        promo_hero_desc: heroDesc,
        promo_campaigns: JSON.stringify(campaigns),
        promo_refer_title: referTitle,
        promo_refer_desc: referDesc,
        promo_refer_img: referImg,
        promo_gift_title: giftTitle,
        promo_gift_desc: giftDesc,
        promo_gift_img: giftImg
      };

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save promotion settings', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCampaign = () => {
    const newCampaign = {
      id: `promo-${Date.now()}`,
      category: 'New Offer',
      title: 'New Campaign Title',
      desc: 'Campaign description goes here.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
      iconName: 'Sparkles',
      benefits: ['Benefit 1'],
      validUntil: 'End of month',
      tag: 'New'
    };
    setCampaigns([...campaigns, newCampaign]);
    setEditingCampaign(newCampaign);
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const handleUpdateCampaign = (updated: any) => {
    setCampaigns(campaigns.map(c => c.id === updated.id ? updated : c));
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal mb-2">Promotion Settings</h1>
          <p className="text-brand-charcoal/60">Manage your latest campaigns, referral program, and gift vouchers.</p>
        </div>
        <div className="flex items-center gap-4">
          {saveStatus === 'success' && (
            <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved Successfully
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
              <AlertCircle className="w-4 h-4" /> Save Failed
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-charcoal text-white px-6 py-2.5 rounded-lg hover:bg-brand-forest transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save All Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-beige/50 overflow-hidden">
        <div className="flex border-b border-brand-beige">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'hero' ? 'bg-brand-sage text-white' : 'text-brand-charcoal/60 hover:bg-brand-sage/10'
            }`}
          >
            Hero Banner
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'campaigns' ? 'bg-brand-sage text-white' : 'text-brand-charcoal/60 hover:bg-brand-sage/10'
            }`}
          >
            Latest Campaigns
          </button>
          <button
            onClick={() => setActiveTab('refer')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'refer' ? 'bg-brand-sage text-white' : 'text-brand-charcoal/60 hover:bg-brand-sage/10'
            }`}
          >
            Refer a Friend
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'gift' ? 'bg-brand-sage text-white' : 'text-brand-charcoal/60 hover:bg-brand-sage/10'
            }`}
          >
            Gift Voucher
          </button>
        </div>

        <div className="p-8">
          {/* TAB: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-brand-charcoal mb-4">Hero Banner Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Badge Text</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Title Part 1 (Normal)</label>
                  <input
                    type="text"
                    value={heroTitle1}
                    onChange={(e) => setHeroTitle1(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Title Part 2 (Italic & Gold)</label>
                  <input
                    type="text"
                    value={heroTitle2}
                    onChange={(e) => setHeroTitle2(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Description</label>
                <textarea
                  value={heroDesc}
                  onChange={(e) => setHeroDesc(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* TAB: CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-charcoal">Manage Campaigns</h3>
                <button
                  onClick={handleAddCampaign}
                  className="flex items-center gap-2 bg-brand-forest/10 text-brand-forest px-4 py-2 rounded-lg hover:bg-brand-forest hover:text-white transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Campaign
                </button>
              </div>

              {campaigns.length === 0 ? (
                <div className="text-center py-12 bg-brand-sage/5 rounded-xl border border-dashed border-brand-sage/30">
                  <p className="text-brand-charcoal/50">No campaigns added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns.map((promo) => (
                    <div key={promo.id} className="group relative bg-white border border-brand-beige rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="h-40 bg-brand-charcoal/5 relative">
                        {promo.image ? (
                          <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-charcoal/20">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={() => setEditingCampaign(promo)}
                            className="w-10 h-10 rounded-full bg-white text-brand-charcoal flex items-center justify-center hover:bg-brand-forest hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(promo.id)}
                            className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-[10px] font-bold text-brand-forest uppercase mb-1">{promo.category}</div>
                        <h4 className="font-serif text-brand-charcoal line-clamp-1 mb-1">{promo.title}</h4>
                        <p className="text-xs text-brand-charcoal/60 line-clamp-2">{promo.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: REFER A FRIEND */}
          {activeTab === 'refer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Section Title</label>
                  <textarea
                    value={referTitle}
                    onChange={(e) => setReferTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white resize-none"
                    rows={2}
                    placeholder="Refer a Friend, \nShare the Radiance"
                  />
                  <p className="text-xs text-brand-charcoal/50 mt-1">Use \n for line breaks</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Description</label>
                  <textarea
                    value={referDesc}
                    onChange={(e) => setReferDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <input
                    type="text"
                    value={referImg}
                    onChange={(e) => setReferImg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Image Preview</label>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-brand-charcoal/5 border border-brand-beige">
                  {referImg ? (
                    <img src={referImg} alt="Referral preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-brand-charcoal/20">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: GIFT VOUCHER */}
          {activeTab === 'gift' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Section Title</label>
                  <textarea
                    value={giftTitle}
                    onChange={(e) => setGiftTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white resize-none"
                    rows={2}
                    placeholder="The Gift of \nTimeless Elegance"
                  />
                  <p className="text-xs text-brand-charcoal/50 mt-1">Use \n for line breaks</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Description</label>
                  <textarea
                    value={giftDesc}
                    onChange={(e) => setGiftDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Card Overlay Image URL (Optional)</label>
                  <input
                    type="text"
                    value={giftImg}
                    onChange={(e) => setGiftImg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="e.g. background pattern or specific image"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Image Preview</label>
                <div className="aspect-[1.6/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E5E0D8] to-[#C5B39A] border border-brand-beige relative flex items-center justify-center">
                  {giftImg ? (
                    <img src={giftImg} alt="Gift overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-brand-charcoal/40 z-10">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-sm">Default Pattern Used</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CAMPAIGN EDIT MODAL */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-brand-beige">
              <h3 className="text-xl font-serif text-brand-charcoal">Edit Campaign</h3>
              <button 
                onClick={() => setEditingCampaign(null)}
                className="p-2 text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-sage/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Title</label>
                  <input
                    type="text"
                    value={editingCampaign.title}
                    onChange={(e) => setEditingCampaign({...editingCampaign, title: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Category</label>
                  <input
                    type="text"
                    value={editingCampaign.category}
                    onChange={(e) => setEditingCampaign({...editingCampaign, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Description</label>
                <textarea
                  value={editingCampaign.desc}
                  onChange={(e) => setEditingCampaign({...editingCampaign, desc: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingCampaign.image}
                    onChange={(e) => setEditingCampaign({...editingCampaign, image: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Icon Name</label>
                  <select
                    value={editingCampaign.iconName || 'Sparkles'}
                    onChange={(e) => setEditingCampaign({...editingCampaign, iconName: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  >
                    <option value="Sparkles">Sparkles</option>
                    <option value="Clock">Clock</option>
                    <option value="Tag">Tag</option>
                    <option value="Gift">Gift</option>
                    <option value="Star">Star</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Valid Until</label>
                  <input
                    type="text"
                    value={editingCampaign.validUntil}
                    onChange={(e) => setEditingCampaign({...editingCampaign, validUntil: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Highlight Tag (e.g. Popular, Limited)</label>
                  <input
                    type="text"
                    value={editingCampaign.tag || ''}
                    onChange={(e) => setEditingCampaign({...editingCampaign, tag: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">Benefits (One per line)</label>
                <textarea
                  value={editingCampaign.benefits ? editingCampaign.benefits.join('\n') : ''}
                  onChange={(e) => setEditingCampaign({
                    ...editingCampaign, 
                    benefits: e.target.value.split('\n').filter(b => b.trim() !== '')
                  })}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  rows={4}
                  placeholder="Deep Cleansing&#10;LED Light Therapy&#10;Hydration Boost"
                />
              </div>

            </div>
            
            <div className="p-6 border-t border-brand-beige flex justify-end gap-3 bg-brand-charcoal/5">
              <button 
                onClick={() => setEditingCampaign(null)}
                className="px-6 py-2.5 rounded-lg text-brand-charcoal font-medium hover:bg-brand-charcoal/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleUpdateCampaign(editingCampaign);
                  setEditingCampaign(null);
                }}
                className="px-6 py-2.5 rounded-lg bg-brand-charcoal text-white font-medium hover:bg-brand-forest transition-colors"
              >
                Save Campaign
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
