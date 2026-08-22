import re

with open('app/back-office/footer/page.tsx', 'r') as f:
    text = f.read()

text = text.replace("footer_contact_whatsapp: '',", "global_whatsapp_number: '',\n    footer_contact_whatsapp: '',")

ui_insert = """
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Global WhatsApp Number</label>
                <input type="text" name="global_whatsapp_number" value={content.global_whatsapp_number} onChange={handleChange} placeholder="e.g. 628113889999 (Used for dynamic inquire buttons)" className="w-full px-3 py-2 bg-white border border-brand-forest/30 rounded-lg text-sm" />
                <p className="text-[10px] text-gray-400 mt-1">Used for "Inquire Service/Category" buttons across the site.</p>
              </div>
              <div>
"""
text = text.replace("<div>\n                <label className=\"block text-xs font-semibold text-gray-500 mb-1\">WhatsApp Label</label>", ui_insert + "                <label className=\"block text-xs font-semibold text-gray-500 mb-1\">WhatsApp Label</label>")

with open('app/back-office/footer/page.tsx', 'w') as f:
    f.write(text)
