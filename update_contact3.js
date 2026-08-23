const fs = require('fs');
let code = fs.readFileSync('app/contact/ClientContactPage.tsx', 'utf8');

code = code.replace(
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Shaz Main Clinic</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm">
                          Jl. Petitenget No.12, Kerobokan Kelod,<br />
                          Kec. Kuta Utara, Kab. Badung,<br />
                          Bali 80361
                        </p>
                        <a 
                          href="https://maps.google.com/?q=Jl.+Petitenget+No.12,+Kerobokan+Kelod,+Bali" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>`,
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">{content.contact_address1_title || 'Shaz Main Clinic'}</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm whitespace-pre-line">
                          {content.contact_address1_text || 'Jl. Petitenget No.12, Kerobokan Kelod,\\nKec. Kuta Utara, Kab. Badung,\\nBali 80361'}
                        </p>
                        <a 
                          href={content.contact_address1_link || 'https://maps.google.com/?q=Jl.+Petitenget+No.12,+Kerobokan+Kelod,+Bali'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>`
);

code = code.replace(
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">Shaz Aesthetic Canggu</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm">
                          Jl. Subak Sari No.1, Canggu,<br />
                          Kec. Kuta Utara, Kab. Badung,<br />
                          Bali 80361
                        </p>
                        <a 
                          href="https://maps.google.com/?q=Jl.+Subak+Sari+No.1,+Canggu,+Bali" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>`,
  `                        <h4 className="font-semibold text-brand-charcoal mb-1">{content.contact_address2_title || 'Shaz Aesthetic Canggu'}</h4>
                        <p className="text-brand-charcoal/60 leading-relaxed text-sm whitespace-pre-line">
                          {content.contact_address2_text || 'Jl. Subak Sari No.1, Canggu,\\nKec. Kuta Utara, Kab. Badung,\\nBali 80361'}
                        </p>
                        <a 
                          href={content.contact_address2_link || 'https://maps.google.com/?q=Jl.+Subak+Sari+No.1,+Canggu,+Bali'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm font-semibold text-brand-forest hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                          Get Directions
                        </a>`
);

fs.writeFileSync('app/contact/ClientContactPage.tsx', code);
console.log('Done 3');
