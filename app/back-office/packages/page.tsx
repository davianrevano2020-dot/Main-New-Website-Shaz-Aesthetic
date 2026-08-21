'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Layers,
  Edit3,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_PACKAGE_CATEGORIES, PackageCategory, PackageItem } from '../../packages/ClientPackagesPage';

export default function BackOfficePackages() {
  const [activeTab, setActiveTab] = useState<'categories' | 'page_settings'>('categories');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Page Header settings
  const [pageSettings, setPageSettings] = useState({
    packages_hero_badge: 'OUR PACKAGES',
    packages_hero_title: 'Packages Designed Around You',
    packages_hero_subtitle: 'Discover carefully curated aesthetic packages designed to enhance your natural beauty and confidence.',
    packages_hero_image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop',
    packages_cta_text: 'Explore Packages',
    packages_consultation_link: 'https://wa.link/o7f5yk'
  });

  // Categories list
  const [categories, setCategories] = useState<PackageCategory[]>(DEFAULT_PACKAGE_CATEGORIES);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          // Sync page settings
          setPageSettings(prev => ({
            ...prev,
            packages_hero_badge: json.data.packages_hero_badge || prev.packages_hero_badge,
            packages_hero_title: json.data.packages_hero_title || prev.packages_hero_title,
            packages_hero_subtitle: json.data.packages_hero_subtitle || prev.packages_hero_subtitle,
            packages_hero_image: json.data.packages_hero_image || prev.packages_hero_image,
            packages_cta_text: json.data.packages_cta_text || prev.packages_cta_text,
            packages_consultation_link: json.data.packages_consultation_link || prev.packages_consultation_link,
          }));

          if (json.data.package_categories) {
            try {
              const parsed = JSON.parse(json.data.package_categories);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setCategories(parsed);
              }
            } catch (e) {
              console.error('Error parsing package_categories', e);
            }
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

    const payload: Record<string, string> = {
      ...pageSettings,
      package_categories: JSON.stringify(categories)
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'success') {
        setStatusMessage({ type: 'success', text: 'All changes saved successfully!' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save changes.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, categoryIndex?: number, fieldKey?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const inputTarget = e.target;
    const uploadId = categoryIndex !== undefined ? `cat-${categoryIndex}` : (fieldKey || 'hero');
    setUploadingField(uploadId);
    setStatusMessage(null);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if ((json.success || json.status === 'success') && json.url) {
        if (categoryIndex !== undefined) {
          const updated = [...categories];
          updated[categoryIndex].img = json.url;
          setCategories(updated);
        } else if (fieldKey) {
          setPageSettings(prev => ({ ...prev, [fieldKey]: json.url }));
        }
        setStatusMessage({ type: 'success', text: 'Photo uploaded successfully!' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to upload photo.' });
      }
    } catch (err) {
      console.error('Upload error', err);
      setStatusMessage({ type: 'error', text: 'An error occurred while uploading.' });
    } finally {
      setUploadingField(null);
      if (inputTarget) inputTarget.value = '';
    }
  };

  const handleAddCategory = () => {
    const newCat: PackageCategory = {
      id: `cat-${Date.now()}`,
      slug: 'new-category',
      name: 'New Category',
      badge: 'New Collection',
      shortDesc: 'Short description for the category card.',
      fullDesc: 'Full detailed description that appears in the modal.',
      img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=1000&auto=format&fit=crop',
      packagesCount: '0 Services',
      whatsappMessage: 'Hello SHAZ Clinic, I would like to inquire about this category.',
      packages: []
    };
    setCategories([...categories, newCat]);
    setEditingCategoryIndex(categories.length);
  };

  const handleDeleteCategory = (index: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const filtered = categories.filter((_, i) => i !== index);
      setCategories(filtered);
      if (editingCategoryIndex === index) setEditingCategoryIndex(null);
    }
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === categories.length - 1) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    const updated = [...categories];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setCategories(updated);
    if (editingCategoryIndex === index) setEditingCategoryIndex(target);
    else if (editingCategoryIndex === target) setEditingCategoryIndex(index);
  };

  // Treatment Item Methods
  const handleAddService = (catIndex: number) => {
    const updatedCat = { ...categories[catIndex] };
    const newService: PackageItem = {
      name: 'New Service',
      desc: 'Description of the service',
      duration: '60 Mins',
      price: 'From Rp 1,000,000',
      keyBenefits: ['Benefit 1', 'Benefit 2'], treatmentsIncluded: ['Treatment 1'], savings: 'Save 10%'
    };
    updatedCat.packages = [...(updatedCat.packages || []), newService];
    updatedCat.packagesCount = `${updatedCat.packages.length} Services`;
    
    const newCategories = [...categories];
    newCategories[catIndex] = updatedCat;
    setCategories(newCategories);
    setExpandedServiceIndex(updatedCat.packages.length - 1);
  };

  const handleDeleteService = (catIndex: number, serviceIndex: number) => {
    if (confirm('Delete this service?')) {
      const updatedCat = { ...categories[catIndex] };
      updatedCat.packages = updatedCat.packages.filter((_, idx) => idx !== serviceIndex);
      updatedCat.packagesCount = `${updatedCat.packages.length} Services`;
      const newCategories = [...categories];
      newCategories[catIndex] = updatedCat;
      setCategories(newCategories);
      setExpandedServiceIndex(null);
    }
  };

  const handleMoveService = (catIndex: number, serviceIndex: number, direction: 'up' | 'down') => {
    const updatedCat = { ...categories[catIndex] };
    const items = [...updatedCat.packages];
    if (direction === 'up' && serviceIndex === 0) return;
    if (direction === 'down' && serviceIndex === items.length - 1) return;
    
    const target = direction === 'up' ? serviceIndex - 1 : serviceIndex + 1;
    [items[serviceIndex], items[target]] = [items[target], items[serviceIndex]];
    
    updatedCat.packages = items;
    const newCategories = [...categories];
    newCategories[catIndex] = updatedCat;
    setCategories(newCategories);
    
    if (expandedServiceIndex === serviceIndex) setExpandedServiceIndex(target);
    else if (expandedServiceIndex === target) setExpandedServiceIndex(serviceIndex);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-forest" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-beige pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-brand-forest/10 text-brand-forest">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-serif font-bold text-brand-charcoal">Packages Page Management</h1>
          </div>
          <p className="text-sm text-brand-charcoal/60">
            Manage package categories, services lists, pricing, and hero banner settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/packages" target="_blank" className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-forest/30 text-brand-forest text-xs font-semibold hover:bg-brand-forest/5 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View /packages Page</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-forest text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        } border`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="flex border-b border-brand-beige gap-2">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'categories' ? 'border-brand-forest text-brand-forest' : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories & Services ({categories.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('page_settings')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'page_settings' ? 'border-brand-forest text-brand-forest' : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Header Banner Content</span>
        </button>
      </div>

      {/* TAB 1: CATEGORIES & SERVICES */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-brand-beige shadow-sm">
            <div>
              <h2 className="text-base font-serif font-bold text-brand-charcoal">Categories & Service Menus</h2>
              <p className="text-xs text-brand-charcoal/60">Organize service categories and add detailed protocols within them.</p>
            </div>
            <button onClick={handleAddCategory} className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest text-white text-xs font-bold rounded-xl hover:bg-brand-charcoal transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => {
              const isEditing = editingCategoryIndex === idx;

              return (
                <div key={cat.id || idx} className={`bg-white rounded-2xl border transition-all duration-200 ${isEditing ? 'border-brand-forest ring-1 ring-brand-forest' : 'border-brand-beige'}`}>
                  {/* Category Header Row */}
                  <div className="p-4 flex items-center justify-between gap-4 border-b border-brand-beige/50">
                    <div className="flex items-center gap-4">
                      <img src={cat.img} alt="" className="w-16 h-16 rounded-xl object-cover border border-brand-beige" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-2 py-0.5 rounded-full">{cat.badge}</span>
                          <span className="text-xs text-brand-charcoal/60">{cat.packagesCount}</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-brand-charcoal">{cat.name}</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-brand-white border border-brand-beige rounded-lg p-1">
                        <button onClick={() => handleMoveCategory(idx, 'up')} disabled={idx === 0} className="p-1 text-brand-charcoal/70 hover:text-brand-forest disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                        <button onClick={() => handleMoveCategory(idx, 'down')} disabled={idx === categories.length - 1} className="p-1 text-brand-charcoal/70 hover:text-brand-forest disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => { setEditingCategoryIndex(isEditing ? null : idx); setExpandedServiceIndex(null); }} className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${isEditing ? 'bg-brand-forest text-white' : 'bg-brand-beige/60 text-brand-charcoal hover:bg-brand-beige'}`}>
                        <Edit3 className="w-3.5 h-3.5" /> <span>{isEditing ? 'Close' : 'Edit'}</span>
                      </button>
                      <button onClick={() => handleDeleteCategory(idx)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Category Expanded Form */}
                  {isEditing && (
                    <div className="p-5 bg-brand-white/40 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Image Upload */}
                        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-brand-beige space-y-3">
                          <label className="block text-xs font-bold text-brand-charcoal uppercase">Category Image</label>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden border">
                            <img src={cat.img} alt="" className="w-full h-full object-cover" />
                          </div>
                          <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold cursor-pointer bg-brand-forest text-white hover:bg-brand-charcoal transition-colors">
                            <Upload className="w-3.5 h-3.5" /> <span>Upload New Photo</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, idx)} />
                          </label>
                        </div>
                        
                        {/* Details */}
                        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-brand-beige space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">Category Name</label>
                              <input type="text" value={cat.name} onChange={e => { const up = [...categories]; up[idx].name = e.target.value; setCategories(up); }} className="w-full px-3 py-2 text-sm border rounded-xl font-bold font-serif" />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">Badge / Tag</label>
                              <input type="text" value={cat.badge} onChange={e => { const up = [...categories]; up[idx].badge = e.target.value; setCategories(up); }} className="w-full px-3 py-2 text-sm border rounded-xl uppercase text-xs" />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">Short Description (Card)</label>
                            <textarea rows={2} value={cat.shortDesc} onChange={e => { const up = [...categories]; up[idx].shortDesc = e.target.value; setCategories(up); }} className="w-full px-3 py-2 text-xs border rounded-xl" />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">Full Description (Modal)</label>
                            <textarea rows={3} value={cat.fullDesc} onChange={e => { const up = [...categories]; up[idx].fullDesc = e.target.value; setCategories(up); }} className="w-full px-3 py-2 text-xs border rounded-xl" />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">WhatsApp Default Message</label>
                            <input type="text" value={cat.whatsappMessage} onChange={e => { const up = [...categories]; up[idx].whatsappMessage = e.target.value; setCategories(up); }} className="w-full px-3 py-2 text-xs border rounded-xl" />
                          </div>
                        </div>
                      </div>

                      {/* Nested Service List */}
                      <div className="bg-white rounded-xl border border-brand-beige p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-brand-beige pb-3">
                          <h4 className="font-serif font-bold text-brand-charcoal text-lg">Services / Protocols ({cat.packages?.length || 0})</h4>
                          <button onClick={() => handleAddService(idx)} className="flex items-center gap-1 text-xs font-bold bg-brand-forest/10 text-brand-forest px-3 py-1.5 rounded-lg hover:bg-brand-forest hover:text-white transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Add Service
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {cat.packages?.map((service, sIdx) => {
                            const isServiceExpanded = expandedServiceIndex === sIdx;
                            return (
                              <div key={sIdx} className="border border-brand-beige rounded-xl overflow-hidden">
                                {/* Compact Row */}
                                <div className="flex items-center justify-between p-3 bg-brand-white hover:bg-brand-beige/20 transition-colors">
                                  <div className="font-semibold text-sm text-brand-charcoal truncate flex-1">
                                    <span className="text-brand-forest text-xs mr-2">{sIdx + 1}.</span> {service.name}
                                  </div>
                                  <div className="flex items-center gap-1 ml-4 shrink-0">
                                    <button onClick={() => handleMoveService(idx, sIdx, 'up')} disabled={sIdx === 0} className="p-1 hover:text-brand-forest disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => handleMoveService(idx, sIdx, 'down')} disabled={sIdx === (cat.packages.length - 1)} className="p-1 hover:text-brand-forest disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => handleDeleteService(idx, sIdx)} className="p-1 text-rose-500 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => setExpandedServiceIndex(isServiceExpanded ? null : sIdx)} className="p-1 ml-2 bg-brand-beige/50 rounded hover:bg-brand-beige text-brand-charcoal">
                                      {isServiceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Expanded Details for Service */}
                                {isServiceExpanded && (
                                  <div className="p-4 border-t border-brand-beige bg-white space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Service Name</label>
                                        <input type="text" value={service.name} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].name = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md font-semibold text-brand-charcoal" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Duration</label>
                                          <input type="text" value={service.duration || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].duration = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" placeholder="e.g. 60 Mins" />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Tag (Optional)</label>
                                          <input type="text" value={service.tag || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].tag = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" placeholder="e.g. Most Popular" />
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Description</label>
                                      <textarea rows={2} value={service.desc} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].desc = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-white/50 p-3 rounded-lg border border-brand-beige">
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Treatments Included (Comma separated)</label>
                                        <input type="text" value={service.treatmentsIncluded?.join(", ") || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].treatmentsIncluded = e.target.value.split(",").map(s=>s.trim()).filter(Boolean); setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Savings (e.g. Save 15%)</label>
                                        <input type="text" value={service.savings || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].savings = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Duration</label>
                                        <input type="text" value={service.duration || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].duration = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" placeholder="e.g. 90 Min" />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Price</label>
                                        <input type="text" value={service.price || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].price = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Key Benefits (Comma separated)</label>
                                        <input type="text" value={service.keyBenefits?.join(', ') || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].keyBenefits = e.target.value.split(',').map(s=>s.trim()).filter(Boolean); setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" placeholder="Deep pore refinement, Instant glow" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {(!cat.packages || cat.packages.length === 0) && (
                            <div className="text-center py-6 text-brand-charcoal/40 text-sm italic">No services added to this category yet.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PAGE SETTINGS */}
      {activeTab === 'page_settings' && (
        <div className="bg-white rounded-2xl border border-brand-beige p-6 space-y-6">
          <div>
            <h2 className="text-base font-serif font-bold text-brand-charcoal">Hero Banner Content</h2>
            <p className="text-xs text-brand-charcoal/60">Manage the top section of the treatments page.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Kicker Badge</label>
                <input type="text" value={pageSettings.packages_hero_badge} onChange={e => setPageSettings({...pageSettings, packages_hero_badge: e.target.value})} className="w-full px-3.5 py-2 text-sm border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Main Headline</label>
                <input type="text" value={pageSettings.packages_hero_title} onChange={e => setPageSettings({...pageSettings, packages_hero_title: e.target.value})} className="w-full px-3.5 py-2 text-sm border rounded-xl font-serif" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Subtitle</label>
                <textarea rows={3} value={pageSettings.packages_hero_subtitle} onChange={e => setPageSettings({...pageSettings, packages_hero_subtitle: e.target.value})} className="w-full px-3.5 py-2 text-sm border rounded-xl leading-relaxed" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Primary Button Text</label>
                  <input type="text" value={pageSettings.packages_cta_text} onChange={e => setPageSettings({...pageSettings, packages_cta_text: e.target.value})} className="w-full px-3.5 py-2 text-sm border rounded-xl" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Consultation Link</label>
                  <input type="text" value={pageSettings.packages_consultation_link} onChange={e => setPageSettings({...pageSettings, packages_consultation_link: e.target.value})} className="w-full px-3.5 py-2 text-sm border rounded-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Hero Image</label>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border mb-3">
                <img src={pageSettings.packages_hero_image} alt="Hero" className="w-full h-full object-cover" />
              </div>
              <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold cursor-pointer bg-brand-forest text-white hover:bg-brand-charcoal transition-colors">
                <Upload className="w-3.5 h-3.5" /> <span>Upload New Hero Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, undefined, 'packages_hero_image')} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
