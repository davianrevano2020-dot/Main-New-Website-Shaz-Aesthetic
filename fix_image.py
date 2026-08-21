import re

with open('app/promotion/ClientPromotionPage.tsx', 'r') as f:
    content = f.read()

old_img = """                    <img 
                      src={initialContent?.promo_gift_img || ""}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 ${!initialContent?.promo_gift_img ? 'hidden' : ''}`}
                    />"""
new_img = """                    {initialContent?.promo_gift_img ? (
                      <img 
                        src={initialContent.promo_gift_img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                      />
                    ) : null}"""
content = content.replace(old_img, new_img)

with open('app/promotion/ClientPromotionPage.tsx', 'w') as f:
    f.write(content)

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'r') as f:
    content2 = f.read()

old_img2 = """                  <div className="absolute inset-0 bg-[#E5E0D8] rounded-xl overflow-hidden">
                    <img src={giftImg} alt="Gift overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
                  </div>"""

new_img2 = """                  <div className="absolute inset-0 bg-[#E5E0D8] rounded-xl overflow-hidden">
                    {giftImg ? <img src={giftImg} alt="Gift overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" /> : null}
                  </div>"""
content2 = content2.replace(old_img2, new_img2)

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'w') as f:
    f.write(content2)

