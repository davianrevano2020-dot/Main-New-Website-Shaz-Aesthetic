const fs = require('fs');
let code = fs.readFileSync('app/back-office/treatment/page.tsx', 'utf8');

// Add SEO fields to pageSettings initialization
if (!code.includes('treatment_meta_title')) {
  code = code.replace(
    "const [pageSettings, setPageSettings] = useState({",
    "const [pageSettings, setPageSettings] = useState({\n    treatment_meta_title: '',\n    treatment_meta_description: '',"
  );
}

// Add SEO Settings section inside TAB 2
const seoSection = `
          {/* Section 0: SEO Settings */}
          <div className="pb-6 border-b border-brand-beige mb-6">
            <h2 className="text-base font-serif font-bold text-brand-charcoal mb-4">0. SEO Settings</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Title</label>
                <input
                  type="text"
                  value={pageSettings.treatment_meta_title || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, treatment_meta_title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                  placeholder="Treatments & Services | SHAZ Aesthetic Clinic Seminyak Bali"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Description</label>
                <textarea
                  value={pageSettings.treatment_meta_description || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, treatment_meta_description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                  rows={3}
                  placeholder="Explore bespoke medical aesthetic treatments, master injectables..."
                />
              </div>
            </div>
          </div>
`;

code = code.replace(
  "<div>\n            <h2 className=\"text-base font-serif font-bold text-brand-charcoal\">Hero Banner Content</h2>",
  seoSection + "\n          <div>\n            <h2 className=\"text-base font-serif font-bold text-brand-charcoal\">1. Hero Banner Content</h2>"
);

fs.writeFileSync('app/back-office/treatment/page.tsx', code);
console.log('done treatment seo in bo');
