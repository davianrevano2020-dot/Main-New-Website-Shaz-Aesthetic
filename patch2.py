import re

with open('app/back-office/treatment/page.tsx', 'r') as f:
    text = f.read()

replacement = """
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-beige text-brand-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-sand transition-all shadow-sm"
          >
            <span>Export CSV</span>
          </button>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-beige text-brand-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-sand transition-all shadow-sm cursor-pointer">
            <span>Import CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
          </label>
          <button
            onClick={handleSave}
"""

text = text.replace("<button\n            onClick={handleSave}", replacement)

with open('app/back-office/treatment/page.tsx', 'w') as f:
    f.write(text)
