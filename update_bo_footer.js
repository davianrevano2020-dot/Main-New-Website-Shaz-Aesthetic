const fs = require('fs');
let code = fs.readFileSync('app/back-office/footer/page.tsx', 'utf8');

const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
const match = importRegex.exec(code);
if (match) {
  let imports = match[1];
  if (!imports.includes('Plus')) imports += ', Plus';
  if (!imports.includes('Trash2')) imports += ', Trash2';
  code = code.replace(importRegex, `import {${imports}} from 'lucide-react';`);
}

code = code.replace(
  'const [content, setContent] = useState<Record<string, any>>({});',
  `const [content, setContent] = useState<Record<string, any>>({});
  const [exploreLinks, setExploreLinks] = useState([{ text: "Treatments", link: "#treatments" }, { text: "Packages", link: "#packages" }, { text: "Our Doctors", link: "#doctors" }]);`
);

code = code.replace(
  /if \(json\.data\) \{\s*setContent\(json\.data\);\s*\}/,
  `if (json.data) {
          setContent(json.data);
          if (json.data.footer_explore_links) {
            try {
              const parsed = JSON.parse(json.data.footer_explore_links);
              if (Array.isArray(parsed)) {
                setExploreLinks(parsed);
              }
            } catch (e) {}
          } else if (json.data.footer_explore_1_text || json.data.footer_explore_1_link) {
            // Fallback for legacy format
            setExploreLinks([
              { text: json.data.footer_explore_1_text || "Treatments", link: json.data.footer_explore_1_link || "#treatments" },
              { text: json.data.footer_explore_2_text || "Packages", link: json.data.footer_explore_2_link || "#packages" },
              { text: json.data.footer_explore_3_text || "Our Doctors", link: json.data.footer_explore_3_link || "#doctors" }
            ]);
          }
        }`
);

code = code.replace(
  /const payload = content;/,
  `const payload = { ...content, footer_explore_links: JSON.stringify(exploreLinks) };`
);

const newExploreSection = `            <div className="flex items-center justify-between mt-6 border-t pt-4 mb-4">
              <h3 className="font-semibold text-gray-700">Explore Links</h3>
              <button
                type="button"
                onClick={() => setExploreLinks([...exploreLinks, { text: '', link: '' }])}
                className="flex items-center gap-1 text-sm text-brand-forest font-medium hover:text-brand-charcoal transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
            
            <div className="space-y-3">
              {exploreLinks.map((link, index) => (
                <div key={index} className="flex items-start gap-3 relative group">
                  <div className="grid grid-cols-2 gap-3 flex-grow">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Label</label>
                      <input 
                        type="text" 
                        value={link.text} 
                        onChange={(e) => {
                          const updated = [...exploreLinks];
                          updated[index].text = e.target.value;
                          setExploreLinks(updated);
                        }} 
                        placeholder="Link Label" 
                        className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">URL</label>
                      <input 
                        type="text" 
                        value={link.link} 
                        onChange={(e) => {
                          const updated = [...exploreLinks];
                          updated[index].link = e.target.value;
                          setExploreLinks(updated);
                        }} 
                        placeholder="Link URL" 
                        className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...exploreLinks];
                        updated.splice(index, 1);
                        setExploreLinks(updated);
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                      title="Remove Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>`;

code = code.replace(
  /<h3 className="font-semibold text-gray-700 mt-6 border-t pt-4">Explore Links<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*\{\/\* 3\. CONTACT \& SOCIAL \*\/})/,
  newExploreSection + '\n          '
);

fs.writeFileSync('app/back-office/footer/page.tsx', code);
console.log('done bo');
