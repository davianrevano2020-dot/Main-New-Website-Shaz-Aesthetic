const fs = require('fs');
let code = fs.readFileSync('app/contact/ClientContactPage.tsx', 'utf8');

code = code.replace(
  "export default function ClientContactPage() {",
  `interface ClientContactPageProps {\n  initialContent?: Record<string, any>;\n}\n\nexport default function ClientContactPage({ initialContent }: ClientContactPageProps) {\n  const content = initialContent || {};`
);

code = code.replace(
  `            <motion.span \n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6 }}\n              className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block"\n            >\n              Get In Touch\n            </motion.span>\n            <motion.h1 \n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6, delay: 0.1 }}\n              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"\n            >\n              We're Here for You\n            </motion.h1>\n            <motion.p\n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6, delay: 0.2 }}\n              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"\n            >\n              Whether you have a question about our treatments, pricing, or want to schedule a consultation, our team is ready to assist you.\n            </motion.p>`,
  `            <motion.span \n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6 }}\n              className="text-brand-forest font-semibold tracking-[0.2em] text-xs uppercase mb-4 block"\n            >\n              {content.contact_hero_subtitle || 'Get In Touch'}\n            </motion.span>\n            <motion.h1 \n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6, delay: 0.1 }}\n              className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight max-w-3xl mx-auto mb-6"\n            >\n              {content.contact_hero_title || \"We're Here for You\"}\n            </motion.h1>\n            <motion.p\n              initial={{ opacity: 0, y: 10 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.6, delay: 0.2 }}\n              className="text-brand-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed"\n            >\n              {content.contact_hero_description || 'Whether you have a question about our treatments, pricing, or want to schedule a consultation, our team is ready to assist you.'}\n            </motion.p>`
);

code = code.replace(
  `<h3 className="text-2xl font-serif text-brand-charcoal mb-8">Send Us a Message</h3>`,
  `<h3 className="text-2xl font-serif text-brand-charcoal mb-8">{content.contact_form_title || 'Send Us a Message'}</h3>`
);

code = code.replace(
  `<h3 className="text-2xl font-serif text-brand-charcoal mb-8">Contact Information</h3>`,
  `<h3 className="text-2xl font-serif text-brand-charcoal mb-8">{content.contact_info_title || 'Contact Information'}</h3>`
);

fs.writeFileSync('app/contact/ClientContactPage.tsx', code);
console.log('Done 1');
