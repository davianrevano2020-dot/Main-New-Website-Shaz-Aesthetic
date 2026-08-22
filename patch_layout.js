const fs = require('fs');
const file = 'app/back-office/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('Reviews')) {
    code = code.replace('Tag', 'Tag,\n  Star');
    code = code.replace(
        "{ icon: Gift, label: 'Packages', href: '/back-office/packages' },",
        "{ icon: Gift, label: 'Packages', href: '/back-office/packages' },\n    { icon: Star, label: 'Reviews', href: '/back-office/reviews' },"
    );
    fs.writeFileSync(file, code);
    console.log("Patched layout.tsx");
} else {
    console.log("Already patched");
}
