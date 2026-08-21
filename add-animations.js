const fs = require('fs');

let code = fs.readFileSync('app/page.tsx', 'utf-8');

// Replace Hero Section h1
code = code.replace(
    /<h1 className="font-serif text-5xl md:text-7xl[^>]*>(.*?)<\/h1>/s,
    `<motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 leading-tight">
              $1
            </motion.h1>`
);

// Replace Hero Section p
code = code.replace(
    /<p className="text-lg md:text-xl text-brand-charcoal\/80 mb-10 max-w-2xl mx-auto"[^>]*>(.*?)<\/p>/s,
    `<motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-brand-charcoal/80 mb-10 max-w-2xl mx-auto">
              $1
            </motion.p>`
);

// Replace Hero Section CTA Buttons
code = code.replace(
    /<div className="flex flex-col sm:flex-row items-center justify-center gap-4">(.*?)<\/div>\s*<\/div>\s*<\/div>\s*<!-- Trust Bar -->/s,
    `<motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              $1
            </motion.div>
          </div>
          {/* Trust Bar */}`
);

// Let's just use whileInView for all sections
code = code.replace(/<section (id="[^"]*"\s*)?className="([^"]*)"/g, (match, p1, p2) => {
    // skip the hero section which is relative min-h-[90vh]
    if (p2.includes('min-h-[90vh]')) return match;

    // if already motion, skip
    if (match.includes('motion')) return match;

    let props = `initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}`;
    return `<motion.section ${p1 || ''}className="${p2}" ${props}`;
});

code = code.replace(/<\/section>/g, '</motion.section>');

// Keep hero section as <section> because we skipped opening it
code = code.replace(
    /<section className="relative min-h-\[90vh\](.*?)(<motion\.section)/s,
    (match, p1, p2) => {
        // Find the first </motion.section> in p1 and change it back to </section>
        let newP1 = p1.replace(/<\/motion\.section>\s*$/, '</section>\n        ');
        return `<section className="relative min-h-[90vh]${newP1}${p2}`;
    }
);


fs.writeFileSync('app/page.tsx', code);
console.log('done');
