'use client';
import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, GripVertical } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  newTab: boolean;
}

export default function HeaderMenuSettings() {
  const [globalLogo, setGlobalLogo] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [ctaText, setCtaText] = useState('Book Consultation');
  const [ctaLink, setCtaLink] = useState('https://wa.link/o7f5yk');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          if (data.data.global_logo) {
            setGlobalLogo(data.data.global_logo);
          }
          if (data.data.global_cta_text) {
            setCtaText(data.data.global_cta_text);
          }
          if (data.data.global_cta_link) {
            setCtaLink(data.data.global_cta_link);
          }
          if (data.data.global_menu) {
            try {
              setMenuItems(JSON.parse(data.data.global_menu));
            } catch (e) {
              console.error('Failed to parse menu items', e);
            }
          } else {
             // defaults
             setMenuItems([
               { id: '1', label: 'About', url: '/about', newTab: false },
               { id: '2', label: 'Treatments', url: '/#treatments', newTab: false },
               { id: '3', label: 'Packages', url: '/#packages', newTab: false },
               { id: '4', label: 'Doctors', url: '/#doctors', newTab: false },
               { id: '5', label: 'Reviews', url: '/#reviews', newTab: false },
             ]);
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const payload = {
        global_logo: globalLogo,
        global_menu: JSON.stringify(menuItems),
        global_cta_text: ctaText,
        global_cta_link: ctaLink
      };

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setGlobalLogo(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload error');
    }
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { id: Date.now().toString(), label: '', url: '', newTab: false }]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: any) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const moveMenuItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newItems = [...menuItems];
      const temp = newItems[index - 1];
      newItems[index - 1] = newItems[index];
      newItems[index] = temp;
      setMenuItems(newItems);
    } else if (direction === 'down' && index < menuItems.length - 1) {
      const newItems = [...menuItems];
      const temp = newItems[index + 1];
      newItems[index + 1] = newItems[index];
      newItems[index] = temp;
      setMenuItems(newItems);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-forest" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-charcoal font-serif">Header & Menu</h1>
          <p className="text-brand-charcoal/60 mt-2">Manage logo and global navigation items.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-brand-forest text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-charcoal transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3 border border-green-200">
          <CheckCircle2 className="w-5 h-5" />
          <p>Changes saved successfully! Updates are automatically reflected across all pages.</p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 border border-red-200">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to save changes. Please try again.</p>
        </div>
      )}

      {/* Preview Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige mb-8">
        <h2 className="text-lg font-bold mb-4">Header Preview</h2>
        <div className="border border-brand-beige rounded-lg p-4 bg-brand-white/50 flex items-center justify-between">
          <div>
            {globalLogo ? (
              <img src={globalLogo} alt="Logo" className="h-8 object-contain" />
            ) : (
              <div className="text-xl font-serif font-bold tracking-widest uppercase">SHAZ</div>
            )}
          </div>
          <div className="hidden md:flex gap-6 text-sm font-bold tracking-widest uppercase">
            {menuItems.map(item => (
              <span key={item.id} className="text-brand-charcoal/80 hover:text-brand-charcoal">{item.label || 'Item'}</span>
            ))}
          </div>
          <div>
            <div className="bg-brand-forest text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
              {ctaText || 'Action'}
            </div>
          </div>
        </div>
      </div>

      {/* Logo Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige mb-8">
        <h2 className="text-lg font-bold mb-4">Global Logo</h2>
        <div className="flex gap-6 items-start">
          <div className="w-48 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
            {globalLogo ? (
              <>
                <img src={globalLogo} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                <button 
                  onClick={() => setGlobalLogo('')}
                  className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <span className="text-sm text-gray-400">No logo uploaded</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Upload New Logo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-beige file:text-brand-charcoal hover:file:bg-brand-beige/80 cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">Transparent PNG format with high resolution is recommended. Logo height on the header will adjust automatically.</p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Or Direct Logo URL</label>
              <input
                type="text"
                value={globalLogo}
                onChange={(e) => setGlobalLogo(e.target.value)}
                className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige mb-8">
        <h2 className="text-lg font-bold mb-4">Call-to-Action (CTA) Button</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              placeholder="e.g. Book Consultation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Link (URL)</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              className="w-full px-4 py-2 border border-brand-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              placeholder="e.g. https://wa.link/..."
            />
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-beige">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Navigation Menu</h2>
            <p className="text-sm text-brand-charcoal/60">Configure links displayed in the header.</p>
          </div>
          <button 
            onClick={addMenuItem}
            className="flex items-center gap-2 text-sm bg-brand-beige/50 hover:bg-brand-beige px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Menu Item
          </button>
        </div>

        <div className="space-y-4">
          {menuItems.length === 0 && (
            <p className="text-center py-8 text-gray-400 text-sm">No navigation items added yet.</p>
          )}
          {menuItems.map((item, index) => (
            <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex flex-col gap-1 text-gray-400">
                <button onClick={() => moveMenuItem(index, 'up')} disabled={index === 0} className="hover:text-brand-charcoal disabled:opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </button>
                <button onClick={() => moveMenuItem(index, 'down')} disabled={index === menuItems.length - 1} className="hover:text-brand-charcoal disabled:opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Menu Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                    placeholder="e.g. About Us"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Link / URL</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                    placeholder="e.g. #about or /contact"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 px-2">
                <input
                  type="checkbox"
                  id={`newtab-${item.id}`}
                  checked={item.newTab}
                  onChange={(e) => updateMenuItem(item.id, 'newTab', e.target.checked)}
                  className="rounded border-gray-300 text-brand-forest focus:ring-brand-forest"
                />
                <label htmlFor={`newtab-${item.id}`} className="text-xs text-gray-600 cursor-pointer">New Tab</label>
              </div>

              <button 
                onClick={() => removeMenuItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Menu"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
