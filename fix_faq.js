const fs = require('fs');
let code = fs.readFileSync('app/faq/ClientFaqPage.tsx', 'utf8');

const target = \`            {(() => {
              const elements: React.ReactNode[] = [];
              let currentCategory = '';

              faqs.forEach((faq, index) => {
                // Add category header if it changes
                if (faq.category !== currentCategory) {
                  currentCategory = faq.category;
                  elements.push(
                    <motion.h3 
                      key={\\\`cat-\${index}\\\`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-brand-forest font-semibold tracking-widest text-xs uppercase mt-16 mb-6 first:mt-0"
                    >
                      {currentCategory}
                    </motion.h3>
                  );
                }

                // Add FAQ item
                elements.push(
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="border-b border-brand-beige last:border-b-0"
                  >
                    <button 
                      onClick={() => toggleFaq(index)} 
                      className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
                    >
                      <span className={\\\`font-serif text-lg md:text-xl transition-colors pr-8 \${openIndex === index ? 'text-[#D4AF37]' : 'text-brand-charcoal group-hover:text-[#D4AF37]'}\\\`}>
                        {faq.question}
                      </span>
                      <div className={\\\`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 \${openIndex === index ? 'bg-brand-charcoal border-brand-charcoal text-white transform rotate-180' : 'bg-transparent border-brand-beige text-brand-charcoal group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'}\\\`}>
                         <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-12">
                            <p className="text-brand-charcoal/70 leading-relaxed md:text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              });

              return elements;
            })()}\`;

const target2 = \`  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);\`;

const replace2 = \`  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const renderedFaqs: React.ReactNode[] = [];
  let currentCategory = '';
  faqs.forEach((faq, index) => {
    if (faq.category !== currentCategory) {
      currentCategory = faq.category;
      renderedFaqs.push(
        <motion.h3 
          key={\\\`cat-\${index}\\\`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-brand-forest font-semibold tracking-widest text-xs uppercase mt-16 mb-6 first:mt-0"
        >
          {currentCategory}
        </motion.h3>
      );
    }
    renderedFaqs.push(
      <motion.div 
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="border-b border-brand-beige last:border-b-0"
      >
        <button 
          onClick={() => toggleFaq(index)} 
          className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
        >
          <span className={\\\`font-serif text-lg md:text-xl transition-colors pr-8 \${openIndex === index ? 'text-[#D4AF37]' : 'text-brand-charcoal group-hover:text-[#D4AF37]'}\\\`}>
            {faq.question}
          </span>
          <div className={\\\`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 \${openIndex === index ? 'bg-brand-charcoal border-brand-charcoal text-white transform rotate-180' : 'bg-transparent border-brand-beige text-brand-charcoal group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'}\\\`}>
             <ChevronDown className="w-4 h-4" />
          </div>
        </button>
        <AnimatePresence>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-8 pr-12">
                <p className="text-brand-charcoal/70 leading-relaxed md:text-lg">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  });\`;

code = code.replace(target, "{renderedFaqs}");
code = code.replace(target2, replace2);
fs.writeFileSync('app/faq/ClientFaqPage.tsx', code);
console.log('Done');
