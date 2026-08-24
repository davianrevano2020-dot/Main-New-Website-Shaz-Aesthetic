const fs = require('fs');
let code = fs.readFileSync('app/back-office/doctor/page.tsx', 'utf8');

// Add SEO fields to pageSettings initialization
if (!code.includes('doctor_meta_title')) {
  code = code.replace(
    "const [pageSettings, setPageSettings] = useState({",
    "const [pageSettings, setPageSettings] = useState({\n    doctor_meta_title: '',\n    doctor_meta_description: '',"
  );
}

// Add SEO Settings section inside TAB 2
const seoSection = `
          {/* Section 0: SEO Settings */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3">
              0. SEO Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Title</label>
                <input
                  type="text"
                  value={pageSettings.doctor_meta_title || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_meta_title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  placeholder="Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Seminyak"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Description</label>
                <textarea
                  value={pageSettings.doctor_meta_description || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_meta_description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  rows={3}
                  placeholder="Meet our team of certified aesthetic physicians..."
                />
              </div>
            </div>
          </div>
`;

code = code.replace(
  "{/* Section 1: Hero Banner */}",
  seoSection + "\n          {/* Section 1: Hero Banner */}"
);

fs.writeFileSync('app/back-office/doctor/page.tsx', code);
console.log('done doctor seo in bo');
