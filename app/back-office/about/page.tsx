'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Image as ImageIcon,
  Layers,
  Sparkles,
  Award,
  Building,
  HeartHandshake
} from 'lucide-react';

export default function BackOfficeAbout() {
  const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'pillars' | 'facilities' | 'cta'>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states
  const [formData, setFormData] = useState<Record<string, any>>({
    about_hero_badge: 'ABOUT SHAZ CLINIC & SALON',
    about_hero_title: 'Where Medical Science <br /><span class="italic font-light text-[#7C8B76]">Meets Luxury Artistry</span>',
    about_hero_subtitle: "Bali's sanctuary for advanced aesthetic medicine, bespoke dermatology protocols, and refined luxury care.",
    about_hero_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
    about_cta_button_text: 'Book Consultation',
    about_cta_button_link: 'https://wa.link/o7f5yk',

    about_story_badge: 'OUR STORY & PHILOSOPHY',
    about_story_title: 'Redefining Aesthetic Wellness in <span class="italic font-light text-[#7C8B76]">Seminyak</span>',
    about_story_p1: 'At SHAZ, we believe that true beauty begins with health, balance, and confidence. Founded by licensed medical aesthetic physicians with a dedication to clinical precision, our sanctuary merges evidence-based dermatology with refined, sensory indulgence.',
    about_story_p2: 'Every treatment protocol is tailored to your unique anatomical harmony. We never adopt a one-size-fits-all approach—instead, our certified doctors utilize precision diagnostics and world-class technology to achieve subtle, natural, and timeless results.',
    about_story_image1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    about_story_image2: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop',
    
    about_values_badge: 'OUR CORE PILLARS',
    about_values_title: 'The 4 Pillars of the SHAZ Standard',

    about_facility_badge: 'OUR SANCTUARY',
    about_facility_title: 'Designed for Tranquility and Clinical Precision',
    about_facility_description: 'Step into our serene, air-conditioned private rooms equipped with cutting-edge aesthetic devices, ergonomic treatment beds, and calming aromatherapeutic touches.',
    about_facility_image1: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop',
    about_facility_image2: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
    about_facility_image3: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop',

    about_cta_badge: 'EXPERIENCE SHAZ',
    about_cta_title: 'Ready to Begin Your Aesthetic Journey?',
    about_cta_subtitle: 'Book a comprehensive consultation with our medical doctors in Seminyak, Bali or chat directly with our client care team.'
  });

  // Dynamic Array States
  const [statsList, setStatsList] = useState<any[]>([
    { id: '1', number: '10+', label: 'Years Experience', desc: 'Dedicated to clinical aesthetics' },
    { id: '2', number: '15K+', label: 'Happy Patients', desc: 'Trusted by domestic & global guests' },
    { id: '3', number: '100%', label: 'Certified Doctors', desc: 'Licensed aesthetic physicians' },
    { id: '4', number: '4.9 ★', label: 'Google Rating', desc: 'Consistently rated top clinic in Bali' }
  ]);

  const [valuesList, setValuesList] = useState<any[]>([
    { 
      id: '1', 
      icon: 'Stethoscope', 
      title: 'Medical Integrity & Safety', 
      desc: 'Every procedure is performed by qualified aesthetic doctors adhering to stringent medical standards and FDA-cleared technology.' 
    },
    { 
      id: '2', 
      icon: 'Sparkles', 
      title: 'Subtle, Natural Artistry', 
      desc: 'We focus on harmonizing and enhancing your unique facial features with an artistic, balanced, and timeless aesthetic philosophy.' 
    },
    { 
      id: '3', 
      icon: 'HeartPulse', 
      title: 'Bespoke Treatment Protocols', 
      desc: 'No one-size-fits-all treatments. We design individual treatment plans tailored precisely to your skin goals and anatomy.' 
    },
    { 
      id: '4', 
      icon: 'Coffee', 
      title: 'Sanctuary Atmosphere & Privacy', 
      desc: 'Step into an oasis of calm. Our private treatment suites provide discrete luxury, sensory comfort, and complete peace of mind.' 
    }
  ]);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success' && json.data) {
          setFormData(prev => ({ ...prev, ...json.data }));

          if (json.data.about_stats_list) {
            try {
              const parsed = typeof json.data.about_stats_list === 'string' ? JSON.parse(json.data.about_stats_list) : json.data.about_stats_list;
              if (Array.isArray(parsed) && parsed.length > 0) setStatsList(parsed);
            } catch (e) {}
          }

          if (json.data.about_values_list) {
            try {
              const parsed = typeof json.data.about_values_list === 'string' ? JSON.parse(json.data.about_values_list) : json.data.about_values_list;
              if (Array.isArray(parsed) && parsed.length > 0) setValuesList(parsed);
            } catch (e) {}
          }
        }
      })
      .catch(err => console.error('Failed to load content', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.status === 'success' && json.url) {
        setFormData(prev => ({ ...prev, [fieldName]: json.url }));
        setSaveStatus({ type: 'success', message: 'Foto berhasil diunggah!' });
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({ type: 'error', message: 'Gagal mengunggah foto.' });
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Terjadi kesalahan saat upload foto.' });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const payload = {
      ...formData,
      about_stats_list: JSON.stringify(statsList),
      about_values_list: JSON.stringify(valuesList)
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'success') {
        setSaveStatus({ type: 'success', message: 'Konten Halaman About berhasil disimpan!' });
      } else {
        setSaveStatus({ type: 'error', message: json.message || 'Gagal menyimpan konten.' });
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Terjadi kesalahan jaringan.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-brand-sage border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-brand-beige shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brand-charcoal">About Page Management</h1>
          <p className="text-sm text-brand-charcoal/60">Kelola teks, foto banner, pilar nilai, fasilitas klinik, dan CTA halaman About.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-forest hover:bg-brand-charcoal text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification */}
      {saveStatus && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          saveStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {saveStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {saveStatus.message}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-brand-beige pb-3">
        {[
          { id: 'hero', label: 'Hero Banner', icon: Layers },
          { id: 'story', label: 'Story & Stats', icon: Sparkles },
          { id: 'pillars', label: '4 Core Pillars', icon: Award },
          { id: 'facilities', label: 'Sanctuary Facilities', icon: Building },
          { id: 'cta', label: 'CTA Banner', icon: HeartHandshake }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-brand-sage text-white shadow-sm' 
                  : 'bg-white text-brand-charcoal/70 hover:bg-brand-beige/50 border border-brand-beige'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="bg-white rounded-2xl border border-brand-beige p-6 shadow-sm">
        
        {/* 1. HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3">About Hero Banner</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Hero Badge
                </label>
                <input
                  type="text"
                  name="about_hero_badge"
                  value={formData.about_hero_badge || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  name="about_cta_button_text"
                  value={formData.about_cta_button_text || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                Hero Title (Mendukung HTML format seperti &lt;span class=&quot;italic font-light text-[#7C8B76]&quot;&gt;)
              </label>
              <textarea
                name="about_hero_title"
                rows={3}
                value={formData.about_hero_title || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                Hero Subtitle / Description
              </label>
              <textarea
                name="about_hero_subtitle"
                rows={3}
                value={formData.about_hero_subtitle || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                Hero Banner Image
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-48 h-28 rounded-xl bg-neutral-100 overflow-hidden border border-brand-beige relative shrink-0">
                  {formData.about_hero_image ? (
                    <img src={formData.about_hero_image} alt="Hero Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <input
                    type="text"
                    name="about_hero_image"
                    value={formData.about_hero_image || ''}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-xl border border-brand-beige text-xs font-mono"
                  />
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-beige hover:bg-brand-sage hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto Banner</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'about_hero_image')} 
                    />
                  </label>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. STORY & STATS TAB */}
        {activeTab === 'story' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3 mb-6">Our Story & Philosophy</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                    Badge
                  </label>
                  <input
                    type="text"
                    name="about_story_badge"
                    value={formData.about_story_badge || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                    Story Title
                  </label>
                  <input
                    type="text"
                    name="about_story_title"
                    value={formData.about_story_title || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                      Paragraf 1
                    </label>
                    <textarea
                      name="about_story_p1"
                      rows={4}
                      value={formData.about_story_p1 || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                      Paragraf 2
                    </label>
                    <textarea
                      name="about_story_p2"
                      rows={4}
                      value={formData.about_story_p2 || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                    />
                  </div>
                </div>

                {/* Collage Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-beige">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                      Foto Kolase 1 (Atas/Kiri)
                    </label>
                    <div className="flex gap-3 items-center">
                      <img src={formData.about_story_image1} alt="Story 1" className="w-16 h-16 rounded-xl object-cover border" />
                      <div className="space-y-1 flex-1">
                        <input
                          type="text"
                          name="about_story_image1"
                          value={formData.about_story_image1 || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-beige hover:bg-brand-sage hover:text-white rounded-lg text-xs font-semibold cursor-pointer">
                          <Upload className="w-3 h-3" />
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'about_story_image1')} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                      Foto Kolase 2 (Bawah/Kanan)
                    </label>
                    <div className="flex gap-3 items-center">
                      <img src={formData.about_story_image2} alt="Story 2" className="w-16 h-16 rounded-xl object-cover border" />
                      <div className="space-y-1 flex-1">
                        <input
                          type="text"
                          name="about_story_image2"
                          value={formData.about_story_image2 || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-beige hover:bg-brand-sage hover:text-white rounded-lg text-xs font-semibold cursor-pointer">
                          <Upload className="w-3 h-3" />
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'about_story_image2')} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Statistics Counters */}
            <div className="pt-6 border-t border-brand-beige">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-serif font-bold text-brand-charcoal">Statistik Kredibilitas (4 Items)</h3>
                <button
                  type="button"
                  onClick={() => setStatsList([...statsList, { id: Date.now().toString(), number: '99+', label: 'Statistik Baru', desc: 'Deskripsi' }])}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-beige text-brand-charcoal text-xs font-semibold rounded-lg hover:bg-brand-sage hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Stat
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsList.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-brand-beige bg-brand-white space-y-3 relative group">
                    <button
                      type="button"
                      onClick={() => setStatsList(statsList.filter((_, i) => i !== idx))}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-charcoal/60 uppercase">Angka (ex: 10+, 15K+, 4.9 ★)</label>
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => {
                          const updated = [...statsList];
                          updated[idx].number = e.target.value;
                          setStatsList(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold text-brand-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-charcoal/60 uppercase">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...statsList];
                          updated[idx].label = e.target.value;
                          setStatsList(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-charcoal/60 uppercase">Keterangan Singkat</label>
                      <input
                        type="text"
                        value={stat.desc}
                        onChange={(e) => {
                          const updated = [...statsList];
                          updated[idx].desc = e.target.value;
                          setStatsList(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border text-xs text-brand-charcoal/70"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. CORE PILLARS TAB */}
        {activeTab === 'pillars' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3">4 Core Pillars</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  name="about_values_badge"
                  value={formData.about_values_badge || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Judul Section
                </label>
                <input
                  type="text"
                  name="about_values_title"
                  value={formData.about_values_title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {valuesList.map((val, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-brand-beige bg-brand-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-brand-forest">Pillar #{idx + 1}</span>
                    <select
                      value={val.icon || 'Sparkles'}
                      onChange={(e) => {
                        const updated = [...valuesList];
                        updated[idx].icon = e.target.value;
                        setValuesList(updated);
                      }}
                      className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                    >
                      <option value="Stethoscope">Icon: Stethoscope</option>
                      <option value="Sparkles">Icon: Sparkles</option>
                      <option value="HeartPulse">Icon: HeartPulse</option>
                      <option value="Coffee">Icon: Coffee</option>
                      <option value="ShieldCheck">Icon: ShieldCheck</option>
                      <option value="Award">Icon: Award</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-brand-charcoal/60 uppercase mb-1">Judul Pilar</label>
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) => {
                          const updated = [...valuesList];
                          updated[idx].title = e.target.value;
                          setValuesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border text-sm font-semibold"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-brand-charcoal/60 uppercase mb-1">Uraian / Deskripsi</label>
                      <textarea
                        rows={2}
                        value={val.desc}
                        onChange={(e) => {
                          const updated = [...valuesList];
                          updated[idx].desc = e.target.value;
                          setValuesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FACILITIES TAB */}
        {activeTab === 'facilities' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3">Sanctuary & Facilities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  name="about_facility_badge"
                  value={formData.about_facility_badge || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Judul Section
                </label>
                <input
                  type="text"
                  name="about_facility_title"
                  value={formData.about_facility_title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                Deskripsi Suasana & Fasilitas
              </label>
              <textarea
                name="about_facility_description"
                rows={3}
                value={formData.about_facility_description || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
              />
            </div>

            {/* 3 Facility Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-beige">
              {[
                { label: 'Foto Fasilitas 1 (Lobby)', name: 'about_facility_image1' },
                { label: 'Foto Fasilitas 2 (Treatment Suite)', name: 'about_facility_image2' },
                { label: 'Foto Fasilitas 3 (Medical Grade Devices)', name: 'about_facility_image3' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <label className="block text-xs font-bold text-brand-charcoal/70 uppercase">
                    {item.label}
                  </label>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border relative">
                    <img src={formData[item.name]} alt={item.label} className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    name={item.name}
                    value={formData[item.name] || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-xs font-mono border rounded-lg"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-brand-beige hover:bg-brand-sage hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, item.name)} 
                    />
                  </label>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 5. CTA TAB */}
        {activeTab === 'cta' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3">CTA Bottom Banner</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  CTA Badge
                </label>
                <input
                  type="text"
                  name="about_cta_badge"
                  value={formData.about_cta_badge || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  name="about_cta_button_text"
                  value={formData.about_cta_button_text || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                name="about_cta_title"
                value={formData.about_cta_title || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                CTA Subtitle / Description
              </label>
              <textarea
                name="about_cta_subtitle"
                rows={3}
                value={formData.about_cta_subtitle || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                WhatsApp Booking Link
              </label>
              <input
                type="text"
                name="about_cta_button_link"
                value={formData.about_cta_button_link || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white text-sm font-mono"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
