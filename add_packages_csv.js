const fs = require('fs');
let code = fs.readFileSync('app/back-office/packages/page.tsx', 'utf8');

// 1. Add PapaParse import
if (!code.includes("import Papa from 'papaparse';")) {
  code = code.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Papa from 'papaparse';");
}

// 2. Add handlers
const handlersCode = `
  const handleExportCSV = () => {
    const rows: any[] = [];
    categories.forEach(cat => {
      if (cat.packages && cat.packages.length > 0) {
        cat.packages.forEach(t => {
          rows.push({
            'Category ID': cat.id,
            'Category Name': cat.name,
            'Package Name': t.name || '',
            'Duration': t.duration || '',
            'Price': t.price || '',
            'Savings': t.savings || '',
            'Tag': t.tag || '',
            'Description': t.desc || '',
            'Treatments Included': t.treatmentsIncluded ? t.treatmentsIncluded.join(', ') : '',
            'Key Benefits': t.keyBenefits ? t.keyBenefits.join(', ') : ''
          });
        });
      }
    });

    if (rows.length === 0) {
      alert("No packages to export");
      return;
    }

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'shaz-packages.csv');
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
        const catMap = new Map<string, PackageItem[]>();
        data.forEach(row => {
          const catId = row['Category ID'] || row['Category Name']?.toLowerCase().replace(/\\s+/g, '-');
          if (!catId) return;
          
          if (!catMap.has(catId)) {
            catMap.set(catId, []);
          }
          
          if (row['Package Name']) {
            catMap.get(catId)?.push({
              name: row['Package Name'],
              desc: row['Description'] || '',
              duration: row['Duration'] || '',
              price: row['Price'] || '',
              savings: row['Savings'] || '',
              tag: row['Tag'] || '',
              treatmentsIncluded: row['Treatments Included'] ? row['Treatments Included'].split(',').map((s:string) => s.trim()).filter(Boolean) : [],
              keyBenefits: row['Key Benefits'] ? row['Key Benefits'].split(',').map((s:string) => s.trim()).filter(Boolean) : []
            });
          }
        });

        updatedCategories.forEach(cat => {
          if (catMap.has(cat.id)) {
            cat.packages = catMap.get(cat.id) || [];
            cat.packagesCount = \`\${cat.packages.length} Packages\`;
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

  const handleSave = async () => {
`;

code = code.replace("  const handleSave = async () => {", handlersCode);

// 3. Add Export / Import Buttons
const buttonsCode = `
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-beige text-brand-charcoal text-xs font-bold uppercase tracking-wider hover:bg-brand-sand transition-all shadow-sm"
          >
            <span>Export CSV</span>
          </button>
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-beige text-brand-charcoal text-xs font-bold uppercase tracking-wider hover:bg-brand-sand transition-all shadow-sm cursor-pointer">
            <span>Import CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
          </label>
          <button
            onClick={handleSave}
`;

code = code.replace(/<button\s*onClick=\{handleSave\}/, buttonsCode);

fs.writeFileSync('app/back-office/packages/page.tsx', code);
console.log('done csv packages');
