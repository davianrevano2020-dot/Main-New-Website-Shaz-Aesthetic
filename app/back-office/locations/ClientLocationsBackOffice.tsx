'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  MapPin, 
  CheckCircle2, 
  Upload, 
  Loader2, 
  ImageIcon, 
  X,
  Building2,
  Clock,
  Phone,
  Sparkles
} from 'lucide-react';

const DEFAULT_LOCATIONS = [
  {
    id: 'shaz-main',
    name: 'Shaz Main Clinic',
    address: 'Jl. Petitenget No.12, Kerobokan Kelod, Kec. Kuta Utara, Kab. Badung, Bali 80361',
    hours: 'Monday - Sunday, 10:00 - 19:00',
    facilities: ['Premium Treatment Rooms', 'Private Consultation', 'Post-Treatment Lounge', 'Valet Parking'],
    phone: '+62 811 388 9999',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    mapQuery: 'Jl. Petitenget No.12, Kerobokan Kelod, Bali',
  },
  {
    id: 'shaz-canggu',
    name: 'Shaz Aesthetic Canggu',
    address: 'Jl. Subak Sari No.1, Canggu, Kec. Kuta Utara, Kab. Badung, Bali 80361',
    hours: 'Monday - Sunday, 10:00 - 19:00',
    facilities: ['Aesthetic Rooms', 'VIP Suite', 'Product Boutique', 'Parking Area'],
    phone: '+62 811 388 8888',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    mapQuery: 'Jl. Subak Sari No.1, Canggu, Bali',
  }
];

export default function ClientLocationsBackOffice({ initialContent }: { initialContent: any }) {
  const [activeTab, setActiveTab] = useState<'hero' | 'branches'>('branches');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadingBranchId, setUploadingBranchId] = useState<string | null>(null);

  // Hero State
  const [heroTitle, setHeroTitle] = useState(initialContent?.locations_hero_title || "Visit Our");
  const [heroSubtitle, setHeroSubtitle] = useState(initialContent?.locations_hero_subtitle || "Locations.");
  const [heroDesc, setHeroDesc] = useState(initialContent?.locations_hero_desc || "Step into a world of refined elegance and absolute comfort. Each of our locations in Bali is meticulously designed to provide you with the ultimate aesthetic experience.");
  const [heroBadge, setHeroBadge] = useState(initialContent?.locations_hero_badge || "Our Spaces");

  // Branches State
  const [branches, setBranches] = useState<any[]>(() => {
    if (initialContent?.locations_branches) {
      try {
        const parsed = JSON.parse(initialContent.locations_branches);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse locations_branches", e);
      }
    }
    return DEFAULT_LOCATIONS;
  });

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const updates = {
        locations_hero_title: heroTitle,
        locations_hero_subtitle: heroSubtitle,
        locations_hero_desc: heroDesc,
        locations_hero_badge: heroBadge,
        locations_branches: JSON.stringify(branches),
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
      console.error('Failed to save locations settings', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBranch = () => {
    const newBranch = {
      id: `branch-${Date.now()}`,
      name: 'New Branch Name',
      address: '',
      hours: 'Monday - Sunday, 10:00 - 19:00',
      facilities: ['Treatment Rooms', 'Consultation Lounge'],
      phone: '+62 811 388 xxxx',
      image: '',
      mapQuery: ''
    };
    setBranches([...branches, newBranch]);
  };

  const handleUpdateBranch = (id: string, field: string, value: any) => {
    setBranches(branches.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  const handleFacilityChange = (id: string, facilitiesStr: string) => {
    const facilitiesArray = facilitiesStr.split(',').map(s => s.trim()).filter(s => s !== '');
    handleUpdateBranch(id, 'facilities', facilitiesArray);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, branchId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    setUploadingBranchId(branchId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        handleUpdateBranch(branchId, 'image', data.url);
      } else {
        alert('Upload failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingBranchId(null);
      // Reset input value so same file can be chosen again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-brand-beige/50">
        <div>
          <h1 className="text-2xl font-serif text-brand-charcoal flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            Locations Management
          </h1>
          <p className="text-brand-charcoal/60 mt-1 text-sm">
            Manage branch info, upload clinic photos, and update Google Maps query.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === 'success' && (
            <span className="flex items-center gap-2 text-green-600 text-sm font-medium animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Saved Successfully
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-500 text-sm font-medium animate-in fade-in">
              Failed to save
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-charcoal text-white px-6 py-2.5 rounded-lg hover:bg-brand-forest transition-colors disabled:opacity-50 font-medium text-sm"
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
        {/* Tab Headers */}
        <div className="flex border-b border-brand-beige">
          <button
            onClick={() => setActiveTab('branches')}
            className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'branches' 
                ? 'border-[#D4AF37] text-brand-charcoal bg-brand-white/50' 
                : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            Branches & Clinic Photos ({branches.length})
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'hero' 
                ? 'border-[#D4AF37] text-brand-charcoal bg-brand-white/50' 
                : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Hero Section Details
          </button>
        </div>

        <div className="p-6">
          {/* BRANCHES TAB */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-brand-beige/40">
                <div>
                  <h2 className="text-lg font-serif font-bold text-brand-charcoal">Branch Clinics</h2>
                  <p className="text-xs text-brand-charcoal/60">Upload high-resolution photos and details for each location.</p>
                </div>
                <button
                  onClick={handleAddBranch}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-brand-charcoal px-4 py-2.5 rounded-xl hover:bg-brand-forest transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add New Branch
                </button>
              </div>

              <div className="space-y-8">
                {branches.map((branch, index) => {
                  const isUploadingThis = uploadingBranchId === branch.id;

                  return (
                    <div 
                      key={branch.id} 
                      className="p-6 bg-[#FAFAF8] rounded-2xl border border-brand-beige relative hover:border-[#D4AF37]/50 transition-colors shadow-sm"
                    >
                      {/* Header in Card */}
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-beige/50">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-brand-charcoal text-white flex items-center justify-center text-xs font-bold font-serif">
                            {index + 1}
                          </div>
                          <h3 className="text-base font-serif font-bold text-brand-charcoal">
                            {branch.name || `Branch #${index + 1}`}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                          title="Delete this branch"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Branch</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* PHOTO UPLOAD & PREVIEW COLUMN (5 cols) */}
                        <div className="lg:col-span-5 space-y-3">
                          <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                            Clinic Photo
                          </label>

                          {/* Image Preview & Upload Container */}
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-beige/20 border-2 border-dashed border-brand-beige flex flex-col items-center justify-center group">
                            {branch.image ? (
                              <>
                                <img 
                                  src={branch.image} 
                                  alt={branch.name || 'Branch photo'} 
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                                  <label className="cursor-pointer flex items-center gap-1.5 bg-white text-brand-charcoal px-3 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-brand-white transition-colors">
                                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    Change Photo
                                    <input 
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(e, branch.id)}
                                      disabled={isUploadingThis}
                                    />
                                  </label>
                                  <button
                                    onClick={() => handleUpdateBranch(branch.id, 'image', '')}
                                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                                    title="Remove photo"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-brand-white border border-brand-beige flex items-center justify-center mx-auto mb-3 text-brand-charcoal/40">
                                  <ImageIcon className="w-6 h-6" />
                                </div>
                                <p className="text-xs font-medium text-brand-charcoal/70 mb-3">
                                  No photo uploaded yet
                                </p>
                                <label className="cursor-pointer inline-flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-brand-forest transition-colors shadow-sm">
                                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  Upload Photo
                                  <input 
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, branch.id)}
                                    disabled={isUploadingThis}
                                  />
                                </label>
                              </div>
                            )}

                            {/* Loading Overlay */}
                            {isUploadingThis && (
                              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
                                <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
                                <span className="text-xs font-bold text-brand-charcoal">Uploading Photo...</span>
                              </div>
                            )}
                          </div>

                          {/* Alternative: Direct URL Input */}
                          <div className="pt-2">
                            <label className="text-[11px] font-medium text-brand-charcoal/60 block mb-1">
                              Or paste direct Image URL:
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={branch.image || ''}
                                onChange={(e) => handleUpdateBranch(branch.id, 'image', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3 py-2 bg-white border border-brand-beige rounded-lg text-xs font-mono text-brand-charcoal outline-none focus:border-[#D4AF37]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* BRANCH DETAILS FORM (7 cols) */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-brand-charcoal">
                              Branch Name
                            </label>
                            <input
                              type="text"
                              value={branch.name || ''}
                              onChange={(e) => handleUpdateBranch(branch.id, 'name', e.target.value)}
                              placeholder="e.g. Shaz Main Clinic Seminyak"
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                            />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-brand-charcoal flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                              Full Address
                            </label>
                            <textarea
                              value={branch.address || ''}
                              onChange={(e) => handleUpdateBranch(branch.id, 'address', e.target.value)}
                              rows={2}
                              placeholder="e.g. Jl. Petitenget No.12, Kerobokan Kelod, Seminyak, Bali"
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-brand-charcoal flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                              WhatsApp / Phone
                            </label>
                            <input
                              type="text"
                              value={branch.phone || ''}
                              onChange={(e) => handleUpdateBranch(branch.id, 'phone', e.target.value)}
                              placeholder="+62 811 388 9999"
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-brand-charcoal flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                              Opening Hours
                            </label>
                            <input
                              type="text"
                              value={branch.hours || ''}
                              onChange={(e) => handleUpdateBranch(branch.id, 'hours', e.target.value)}
                              placeholder="Mon - Sun, 10:00 - 19:00"
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                            />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-brand-charcoal flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                              Facilities (separated by comma)
                            </label>
                            <input
                              type="text"
                              value={(branch.facilities || []).join(', ')}
                              onChange={(e) => handleFacilityChange(branch.id, e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                              placeholder="VIP Suite, Valet Parking, Private Lounge, Free Wi-Fi"
                            />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-brand-charcoal">
                              Google Maps Query String
                            </label>
                            <input
                              type="text"
                              value={branch.mapQuery || ''}
                              onChange={(e) => handleUpdateBranch(branch.id, 'mapQuery', e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white border border-brand-beige rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none"
                              placeholder="e.g. Jl. Petitenget No.12, Kerobokan Kelod, Bali"
                            />
                            <p className="text-[11px] text-brand-charcoal/50">
                              This keyword is used to embed the live interactive Google Map for this clinic.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* HERO SECTION TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-brand-beige/40">
                <h2 className="text-lg font-serif font-bold text-brand-charcoal">Hero Section Details</h2>
                <p className="text-xs text-brand-charcoal/60">Customize the top headline and introduction of the /locations page.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Badge / Eyebrow Text</label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-white border border-brand-beige rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Title Part 1 (Regular)</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-white border border-brand-beige rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Title Part 2 (Italic Accent)</label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-white border border-brand-beige rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Hero Description</label>
                  <textarea
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-brand-white border border-brand-beige rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
