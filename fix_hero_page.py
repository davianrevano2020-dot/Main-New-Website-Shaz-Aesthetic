import re

with open('app/promotion/ClientPromotionPage.tsx', 'r') as f:
    content = f.read()

# Badge
content = content.replace(
    '<span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8962E]">Exclusive Offers</span>',
    '<span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8962E]">{initialContent?.promo_hero_badge || "Exclusive Offers"}</span>'
)

# Title
old_title = """              >
                Celebrate Beauty <br className="hidden md:block" /> 
                <span className="italic text-[#B8962E]">with Special Privileges</span>
              </motion.h1>"""
new_title = """              >
                {initialContent?.promo_hero_title1 || "Celebrate Beauty"} <br className="hidden md:block" /> 
                <span className="italic text-[#B8962E]">{initialContent?.promo_hero_title2 || "with Special Privileges"}</span>
              </motion.h1>"""
content = content.replace(old_title, new_title)

# Description
old_desc = """              >
                Discover our curated selection of festive promotions, limited-time offers, and exclusive membership benefits designed to make you shine.
              </motion.p>"""
new_desc = """              >
                {initialContent?.promo_hero_desc || "Discover our curated selection of festive promotions, limited-time offers, and exclusive membership benefits designed to make you shine."}
              </motion.p>"""
content = content.replace(old_desc, new_desc)

with open('app/promotion/ClientPromotionPage.tsx', 'w') as f:
    f.write(content)
