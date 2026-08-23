const fs = require('fs');
let code = fs.readFileSync('app/faq/ClientFaqPage.tsx', 'utf8');

code = code.replace(
  "const faqs = [",
  "const defaultFaqs = ["
);

code = code.replace(
  "export default function ClientFaqPage({ initialContent }: ClientFaqPageProps) {",
  "export default function ClientFaqPage({ initialContent }: ClientFaqPageProps) {\n  const content = initialContent || {};\n  \n  let faqs = defaultFaqs;\n  try {\n    if (content.faq_list) {\n      const parsed = JSON.parse(content.faq_list);\n      if (Array.isArray(parsed) && parsed.length > 0) {\n        faqs = parsed;\n      }\n    }\n  } catch (e) {\n    console.error('Failed to parse faqs', e);\n  }"
);

code = code.replace(
  `            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block"
            >
              Knowledge Base
            </motion.span>`,
  `            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block"
            >
              {content.faq_hero_subtitle || 'Knowledge Base'}
            </motion.span>`
);

code = code.replace(
  `            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"
            >
              Frequently Asked Questions
            </motion.h1>`,
  `            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"
            >
              {content.faq_hero_title || 'Frequently Asked Questions'}
            </motion.h1>`
);

code = code.replace(
  `            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"
            >
              Find clear, detailed answers regarding our booking process, consultations, treatments, recovery, and clinic policies.
            </motion.p>`,
  `            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"
            >
              {content.faq_hero_description || 'Find clear, detailed answers regarding our booking process, consultations, treatments, recovery, and clinic policies.'}
            </motion.p>`
);

code = code.replace(
  `<h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">Still have questions?</h2>`,
  `<h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">{content.faq_cta_title || 'Still have questions?'}</h2>`
);

code = code.replace(
  `<p className="text-brand-charcoal/60 mb-8 max-w-lg mx-auto text-lg">
              Can&apos;t find the answer you&apos;re looking for? Our team is always here to help you with any inquiries.
            </p>`,
  `<p className="text-brand-charcoal/60 mb-8 max-w-lg mx-auto text-lg">
              {content.faq_cta_description || "Can't find the answer you're looking for? Our team is always here to help you with any inquiries."}
            </p>`
);

fs.writeFileSync('app/faq/ClientFaqPage.tsx', code);
console.log('Done ClientFaqPage');
