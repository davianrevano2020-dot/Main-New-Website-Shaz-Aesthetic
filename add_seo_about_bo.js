const fs = require('fs');
let code = fs.readFileSync('app/back-office/about/page.tsx', 'utf8');

// Add SEO fields to formData initialization
if (!code.includes('about_meta_title')) {
  code = code.replace(
    "const [formData, setFormData] = useState<Record<string, any>>({",
    "const [formData, setFormData] = useState<Record<string, any>>({\n    about_meta_title: '',\n    about_meta_description: '',"
  );
}

// Add SEO Settings section inside the hero tab
const seoSection = `
            {/* SEO Settings */}
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3 mt-6">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="about_meta_title"
                  value={formData.about_meta_title || ''}
                  onChange={handleInputChange}
                  placeholder="About Us | SHAZ Clinic & Salon"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="about_meta_description"
                  value={formData.about_meta_description || ''}
                  onChange={handleInputChange}
                  placeholder="Learn more about SHAZ Clinic & Salon..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>
            </div>
`;

code = code.replace(
  "{/* 1. HERO TAB */}",
  `{/* 0. SEO TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b pb-3">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="about_meta_title"
                  value={formData.about_meta_title || ''}
                  onChange={handleInputChange}
                  placeholder="About Us | SHAZ Clinic & Salon"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="about_meta_description"
                  value={formData.about_meta_description || ''}
                  onChange={handleInputChange}
                  placeholder="Learn more about SHAZ Clinic & Salon..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-white focus:outline-none focus:ring-2 focus:ring-brand-sage text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* 1. HERO TAB */}`
);

// Add 'seo' to tabs array
code = code.replace(
  "const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'pillars' | 'facilities' | 'cta'>('hero');",
  "const [activeTab, setActiveTab] = useState<'seo' | 'hero' | 'story' | 'pillars' | 'facilities' | 'cta'>('hero');"
);

code = code.replace(
  "{ id: 'hero', label: 'Hero Banner', icon: Layers },",
  "{ id: 'seo', label: 'SEO Settings', icon: Sparkles },\n          { id: 'hero', label: 'Hero Banner', icon: Layers },"
);

fs.writeFileSync('app/back-office/about/page.tsx', code);
console.log('done about back-office');
