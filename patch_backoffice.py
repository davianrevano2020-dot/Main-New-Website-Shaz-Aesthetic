import re

with open('app/back-office/treatment/page.tsx', 'r') as f:
    text = f.read()

# 1. Add Papa parse import
if "import Papa from 'papaparse';" not in text:
    text = text.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Papa from 'papaparse';")

# 2. Add File Input Refs and Functions
insert_logic = """
  // CSV Import/Export
  const handleExportCSV = () => {
    const rows: any[] = [];
    categories.forEach(cat => {
      if (cat.featuredTreatments && cat.featuredTreatments.length > 0) {
        cat.featuredTreatments.forEach(t => {
          rows.push({
            'Category ID': cat.id,
            'Category Name': cat.name,
            'Service Name': t.name || '',
            'Duration': t.duration || '',
            'Price': t.price || '',
            'Tag': t.tag || '',
            'Description': t.desc || '',
            'Suitable For': t.suitableFor || '',
            'Procedure': t.procedure || '',
            'Downtime': t.downtime || '',
            'Expected Results': t.expectedResults || '',
            'Key Benefits': t.keyBenefits ? t.keyBenefits.join(', ') : ''
          });
        });
      } else {
        rows.push({
          'Category ID': cat.id,
          'Category Name': cat.name,
          'Service Name': '',
          'Duration': '',
          'Price': '',
          'Tag': '',
          'Description': '',
          'Suitable For': '',
          'Procedure': '',
          'Downtime': '',
          'Expected Results': '',
          'Key Benefits': ''
        });
      }
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'treatments_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const data = results.data as any[];
        const updatedCategories = [...categories];
        
        // Group by category ID
        const catMap = new Map<string, TreatmentItem[]>();
        data.forEach(row => {
          const catId = row['Category ID'] || row['Category Name']?.toLowerCase().replace(/\s+/g, '-');
          if (!catId) return;
          
          if (!catMap.has(catId)) {
            catMap.set(catId, []);
          }
          
          if (row['Service Name']) {
            catMap.get(catId)?.push({
              name: row['Service Name'],
              desc: row['Description'] || '',
              duration: row['Duration'] || '',
              price: row['Price'] || '',
              tag: row['Tag'] || '',
              suitableFor: row['Suitable For'] || '',
              procedure: row['Procedure'] || '',
              downtime: row['Downtime'] || '',
              expectedResults: row['Expected Results'] || '',
              keyBenefits: row['Key Benefits'] ? row['Key Benefits'].split(',').map((s:string) => s.trim()).filter(Boolean) : []
            });
          }
        });

        updatedCategories.forEach(cat => {
          if (catMap.has(cat.id)) {
            cat.featuredTreatments = catMap.get(cat.id) || [];
            cat.treatmentsCount = `${cat.featuredTreatments.length} Treatments`;
          }
        });

        setCategories(updatedCategories);
        setStatusMessage({ type: 'success', text: 'CSV imported! Please review and click Save Changes.' });
        e.target.value = ''; // reset
      },
      error: function() {
        setStatusMessage({ type: 'error', text: 'Failed to parse CSV file.' });
      }
    });
  };
"""

if "handleExportCSV" not in text:
    text = text.replace("const handlePhotoUpload =", insert_logic + "\n  const handlePhotoUpload =")

# 3. Add Buttons to UI
ui_buttons = """
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brand-charcoal">Treatment Page Settings</h1>
          <p className="text-brand-charcoal/60 text-sm mt-1">Manage categories, services, and hero banner.</p>
        </div>
        <div className="flex items-center gap-3">
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
            disabled={isSaving}
"""

text = re.sub(
    r'<div className="flex justify-between items-center mb-6">.*?<button\s+onClick=\{handleSave\}\s+disabled=\{isSaving\}',
    ui_buttons,
    text,
    flags=re.DOTALL
)

# 4. Add lucide icons if missing (Download, FileSpreadsheet)
if "Download," not in text and "FileSpreadsheet" not in text:
    text = text.replace("import {", "import { Download, FileSpreadsheet,")

with open('app/back-office/treatment/page.tsx', 'w') as f:
    f.write(text)

