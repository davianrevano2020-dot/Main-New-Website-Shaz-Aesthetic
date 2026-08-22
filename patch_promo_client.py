import re

with open("app/promotion/ClientPromotionPage.tsx", "r") as f:
    content = f.read()

# For referral CTA
refer_search = """                <a 
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#B8962E] transition-all shadow-xl shadow-brand-charcoal/20"
                >
                  Join Referral Program <ArrowRight className="w-4 h-4" />
                </a>"""
refer_replace = """                <a 
                  href={initialContent?.promo_refer_btn_link || WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#B8962E] transition-all shadow-xl shadow-brand-charcoal/20"
                >
                  {initialContent?.promo_refer_btn_text || "Join Referral Program"} <ArrowRight className="w-4 h-4" />
                </a>"""
content = content.replace(refer_search, refer_replace)

# For gift voucher CTA
gift_search = """                    <a 
                      href={WA_DEFAULT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-[#D4AF37]/20"
                    >
                      Purchase a Voucher <ArrowRight className="w-4 h-4" />
                    </a>"""
gift_replace = """                    <a 
                      href={initialContent?.promo_gift_btn_link || WA_DEFAULT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-[#D4AF37]/20"
                    >
                      {initialContent?.promo_gift_btn_text || "Purchase a Voucher"} <ArrowRight className="w-4 h-4" />
                    </a>"""
content = content.replace(gift_search, gift_replace)

with open("app/promotion/ClientPromotionPage.tsx", "w") as f:
    f.write(content)
print("done")
