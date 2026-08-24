const fs = require('fs');
let code = fs.readFileSync('app/back-office/layout.tsx', 'utf8');

if (!code.includes("{ icon: FileText, label: 'Blog', href: '/back-office/blog' }")) {
  // also add FileText to lucide-react imports if not there
  if (!code.includes("FileText")) {
    code = code.replace("HelpCircle", "HelpCircle,\n  FileText");
  }

  code = code.replace(
    "{ icon: HelpCircle, label: 'FAQ', href: '/back-office/faq' },",
    "{ icon: HelpCircle, label: 'FAQ', href: '/back-office/faq' },\n    { icon: FileText, label: 'Blog', href: '/back-office/blog' },"
  );

  fs.writeFileSync('app/back-office/layout.tsx', code);
  console.log("Blog menu added");
}
