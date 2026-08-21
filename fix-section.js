const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// Find the first occurrence of <section className="relative min-h-[90vh]" ... and match everything until the first </motion.section>
let count = 0;
code = code.replace(/<\/motion\.section>/, (match) => {
    count++;
    if (count === 1) {
        return '</section>'; // The first one belongs to the hero section which we kept as <section>
    }
    return match;
});

fs.writeFileSync('app/page.tsx', code);
console.log('Fixed first motion.section');
