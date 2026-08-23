const fs = require('fs');
let code = fs.readFileSync('app/contact/ClientContactPage.tsx', 'utf8');

code = code.replace(
  `                      <Clock className="w-5 h-5 text-brand-forest" />
                      <h4 className="font-semibold text-brand-charcoal">Operating Hours</h4>
                    </div>
                    <ul className="space-y-2 text-brand-charcoal/60 text-sm">
                      <li className="flex justify-between">
                        <span>Monday - Sunday</span>
                        <span>09.00 AM - 07.00 PM</span>
                      </li>
                    </ul>`,
  `                      <Clock className="w-5 h-5 text-brand-forest" />
                      <h4 className="font-semibold text-brand-charcoal">{content.contact_hours_title || 'Operating Hours'}</h4>
                    </div>
                    <ul className="space-y-2 text-brand-charcoal/60 text-sm">
                      <li className="flex justify-between">
                        <span>{content.contact_hours_days || 'Monday - Sunday'}</span>
                        <span>{content.contact_hours_time || '09.00 AM - 07.00 PM'}</span>
                      </li>
                    </ul>`
);

code = code.replace(
  `                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold text-brand-charcoal">Emergency Contact</h4>
                    </div>
                    <p className="text-brand-charcoal/60 text-sm mb-2">
                      For urgent medical concerns after treatment.
                    </p>
                    <a href="tel:+628113888889" className="text-brand-charcoal font-semibold hover:text-red-500 transition-colors">
                      +62 811 388 8889
                    </a>`,
  `                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold text-brand-charcoal">{content.contact_emergency_title || 'Emergency Contact'}</h4>
                    </div>
                    <p className="text-brand-charcoal/60 text-sm mb-2">
                      {content.contact_emergency_text || 'For urgent medical concerns after treatment.'}
                    </p>
                    <a href={\`tel:\${(content.contact_emergency_phone || '+62 811 388 8889').replace(/\\s/g, '')}\`} className="text-brand-charcoal font-semibold hover:text-red-500 transition-colors">
                      {content.contact_emergency_phone || '+62 811 388 8889'}
                    </a>`
);

code = code.replace(
  `                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>`,
  `                  <div className="flex gap-4">
                    <a href={content.contact_instagram_link || 'https://instagram.com'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href={content.contact_facebook_link || 'https://facebook.com'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>`
);

fs.writeFileSync('app/contact/ClientContactPage.tsx', code);
console.log('Done 4');
