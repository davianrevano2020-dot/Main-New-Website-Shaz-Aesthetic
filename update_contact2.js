const fs = require('fs');
let code = fs.readFileSync('app/contact/ClientContactPage.tsx', 'utf8');

code = code.replace(
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">WhatsApp</h4>
                        <a href="https://wa.link/o7f5yk" target="_blank" rel="noopener noreferrer" className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          +62 811 388 8888
                        </a>`,
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">WhatsApp</h4>
                        <a href={content.contact_whatsapp_link || 'https://wa.link/o7f5yk'} target="_blank" rel="noopener noreferrer" className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_whatsapp_number || '+62 811 388 8888'}
                        </a>`
);

code = code.replace(
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Phone</h4>
                        <a href="tel:+628113888888" className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          +62 811 388 8888
                        </a>`,
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Phone</h4>
                        <a href={content.contact_phone_link || 'tel:+628113888888'} className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_phone_number || '+62 811 388 8888'}
                        </a>`
);

code = code.replace(
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Email</h4>
                        <a href="mailto:hello@shazaestheticbali.com" className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          hello@shazaestheticbali.com
                        </a>`,
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Email</h4>
                        <a href={\`mailto:\${content.contact_email || 'hello@shazaestheticbali.com'}\`} className="text-brand-charcoal/60 hover:text-[#D4AF37] transition-colors">
                          {content.contact_email || 'hello@shazaestheticbali.com'}
                        </a>`
);

fs.writeFileSync('app/contact/ClientContactPage.tsx', code);
console.log('Done 2');
