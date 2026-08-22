import re

with open("app/back-office/promotion/ClientPromotionBackOffice.tsx", "r") as f:
    content = f.read()

# 1. Add states
state_addition = """  const [referImg, setReferImg] = useState(initialContent?.promo_refer_img || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop");
  const [referBtnText, setReferBtnText] = useState(initialContent?.promo_refer_btn_text || "Join Referral Program");
  const [referBtnLink, setReferBtnLink] = useState(initialContent?.promo_refer_btn_link || "");"""
content = content.replace(
    '  const [referImg, setReferImg] = useState(initialContent?.promo_refer_img || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop");',
    state_addition
)

gift_state_addition = """  const [giftImg, setGiftImg] = useState(initialContent?.promo_gift_img || "");
  const [giftBtnText, setGiftBtnText] = useState(initialContent?.promo_gift_btn_text || "Purchase a Voucher");
  const [giftBtnLink, setGiftBtnLink] = useState(initialContent?.promo_gift_btn_link || "");"""
content = content.replace(
    '  const [giftImg, setGiftImg] = useState(initialContent?.promo_gift_img || "");',
    gift_state_addition
)

# 2. Add to payload
payload_addition = """        promo_refer_img: referImg,
        promo_refer_btn_text: referBtnText,
        promo_refer_btn_link: referBtnLink,
        promo_gift_title: giftTitle,
        promo_gift_desc: giftDesc,
        promo_gift_img: giftImg,
        promo_gift_btn_text: giftBtnText,
        promo_gift_btn_link: giftBtnLink"""
payload_search = """        promo_refer_img: referImg,
        promo_gift_title: giftTitle,
        promo_gift_desc: giftDesc,
        promo_gift_img: giftImg"""
content = content.replace(payload_search, payload_addition)

# 3. Add to Refer UI
refer_ui_addition = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={referImg}
                      onChange={(e) => setReferImg(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sage text-white rounded-xl cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap min-w-[120px]">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, setReferImg)} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Text</label>
                  <input
                    type="text"
                    value={referBtnText}
                    onChange={(e) => setReferBtnText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="Join Referral Program"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Link</label>
                  <input
                    type="text"
                    value={referBtnLink}
                    onChange={(e) => setReferBtnLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="e.g. https://wa.me/..."
                  />
                </div>"""
content = content.replace(
    """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={referImg}
                      onChange={(e) => setReferImg(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sage text-white rounded-xl cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap min-w-[120px]">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, setReferImg)} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>""",
    refer_ui_addition
)

# 4. Add to Gift UI
gift_ui_addition = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={giftImg}
                      onChange={(e) => setGiftImg(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sage text-white rounded-xl cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap min-w-[120px]">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, setGiftImg)} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Text</label>
                  <input
                    type="text"
                    value={giftBtnText}
                    onChange={(e) => setGiftBtnText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="Purchase a Voucher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Button Link</label>
                  <input
                    type="text"
                    value={giftBtnLink}
                    onChange={(e) => setGiftBtnLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="e.g. https://wa.me/..."
                  />
                </div>"""
content = content.replace(
    """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={giftImg}
                      onChange={(e) => setGiftImg(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sage text-white rounded-xl cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap min-w-[120px]">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, setGiftImg)} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>""",
    gift_ui_addition
)

with open("app/back-office/promotion/ClientPromotionBackOffice.tsx", "w") as f:
    f.write(content)
print("done")
