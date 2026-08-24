const fs = require('fs');
let code = fs.readFileSync('app/back-office/footer/page.tsx', 'utf8');

code = code.replace(
  'const [content, setContent] = useState({',
  `const [exploreLinks, setExploreLinks] = useState<any[]>([{ text: "Treatments", link: "#treatments" }, { text: "Packages", link: "#packages" }, { text: "Our Doctors", link: "#doctors" }]);\n  const [content, setContent] = useState({`
);

fs.writeFileSync('app/back-office/footer/page.tsx', code);
console.log('done fixing');
