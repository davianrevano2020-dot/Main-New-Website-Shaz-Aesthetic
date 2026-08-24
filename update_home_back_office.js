const fs = require('fs');
let code = fs.readFileSync('app/back-office/page.tsx', 'utf8');

// Add SEO fields to initial state
code = code.replace(
  "const [content, setContent] = useState({",
  "const [content, setContent] = useState({\n    home_meta_title: '',\n    home_meta_description: '',"
);

const seoSection = `
        {/* Section: SEO */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <h2 className="text-xl font-serif font-bold text-brand-charcoal mb-6 pb-2 border-b border-brand-beige">0. SEO Settings</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="home_meta_title"
                  value={content.home_meta_title || ''}
                  onChange={handleChange}
                  placeholder="e.g. SHAZ Clinic & Salon | Beauty, Refined by Medical Expertise"
                  className="w-full px-4 py-3 bg-gray-50 border border-brand-beige/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-brand-charcoal"
                />
                <p className="text-xs text-gray-500 mt-2">The title that appears in browser tabs and search engine results.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Meta Description</label>
                <textarea
                  name="home_meta_description"
                  value={content.home_meta_description || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Personalized aesthetic treatments and premium salon experiences..."
                  className="w-full px-4 py-3 bg-gray-50 border border-brand-beige/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest/20 text-brand-charcoal"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">A brief description of your homepage for search engine results.</p>
              </div>
            </div>
        </div>
`;

code = code.replace(
  "{/* Section: Hero Banner */}",
  seoSection + "\n        {/* Section: Hero Banner */}"
);

fs.writeFileSync('app/back-office/page.tsx', code);
console.log('done home back-office update');
