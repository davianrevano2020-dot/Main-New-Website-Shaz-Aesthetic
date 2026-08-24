const fs = require('fs');
let code = fs.readFileSync('app/components/GlobalFooter.tsx', 'utf8');

const exploreHtml = `              {/* Explore */}
              <div>
                <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Explore</h4>
                <ul className="space-y-4 text-sm font-light">
                  {(() => {
                    let links = [
                      { text: content.footer_explore_1_text || "Treatments", link: content.footer_explore_1_link || "#treatments" },
                      { text: content.footer_explore_2_text || "Packages", link: content.footer_explore_2_link || "#packages" },
                      { text: content.footer_explore_3_text || "Our Doctors", link: content.footer_explore_3_link || "#doctors" }
                    ];
                    if (content.footer_explore_links) {
                      try {
                        const parsed = JSON.parse(content.footer_explore_links);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                          links = parsed;
                        }
                      } catch (e) {}
                    }
                    return links.map((link, i) => (
                      <li key={i}><a href={link.link || "#"} className="hover:text-white transition-colors">{link.text || "Link"}</a></li>
                    ));
                  })()}
                </ul>
              </div>`;

code = code.replace(
  /\{\/\* Explore \*\/\}[\s\S]*?(?=\{\/\* Contact \*\/)/,
  exploreHtml + '\n\n              '
);

fs.writeFileSync('app/components/GlobalFooter.tsx', code);
console.log('done');
