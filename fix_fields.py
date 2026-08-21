import re

with open('app/back-office/packages/page.tsx', 'r') as f:
    content = f.read()

duration_field = """<div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Duration</label>
                                        <input type="text" value={service.duration || ''} onChange={e => { const up = [...categories]; up[idx].packages[sIdx].duration = e.target.value; setCategories(up); }} className="w-full px-2.5 py-1.5 text-xs border rounded-md" placeholder="e.g. 90 Min" />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Price</label>"""

content = content.replace('<div>\n                                        <label className="block text-[10px] font-bold text-brand-charcoal/70 uppercase mb-1">Price</label>', duration_field)

with open('app/back-office/packages/page.tsx', 'w') as f:
    f.write(content)

