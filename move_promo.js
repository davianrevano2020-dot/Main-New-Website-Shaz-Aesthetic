const fs = require('fs');

let content = fs.readFileSync('app/ClientHomePage.tsx', 'utf8');

const promoRegex = /\s*\{\/\* \-+\s+10\. PROMO \/ OFFER\s+\-+\s+\*\/\}\s+<section id="promo"[\s\S]*?<\/section>/;

const promoMatch = content.match(promoRegex);
if (!promoMatch) {
  console.log("Promo section not found");
  process.exit(1);
}

const promoText = promoMatch[0];
content = content.replace(promoText, '');

const brandPhilosophyRegex = /\{\/\* \-+\s+02\. BRAND PHILOSOPHY\s+\-+\s+\*\/\}/;
const bpMatch = content.match(brandPhilosophyRegex);

if (!bpMatch) {
  console.log("Brand Philosophy not found");
  process.exit(1);
}

const insertIndex = bpMatch.index;
content = content.slice(0, insertIndex) + promoText.replace('10. PROMO / OFFER', '01B. PROMO / OFFER') + '\n\n        ' + content.slice(insertIndex);

fs.writeFileSync('app/ClientHomePage.tsx', content);
console.log("Moved successfully.");
