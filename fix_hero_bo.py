import re

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'r') as f:
    content = f.read()

# Update activeTab
content = content.replace(
    "useState<'campaigns' | 'refer' | 'gift'>('campaigns')",
    "useState<'hero' | 'campaigns' | 'refer' | 'gift'>('hero')"
)

# Add Hero Banner State
state_injection = """  // Hero Banner State
  const [heroBadge, setHeroBadge] = useState(initialContent?.promo_hero_badge || "Exclusive Offers");
  const [heroTitle1, setHeroTitle1] = useState(initialContent?.promo_hero_title1 || "Celebrate Beauty");
  const [heroTitle2, setHeroTitle2] = useState(initialContent?.promo_hero_title2 || "with Special Privileges");
  const [heroDesc, setHeroDesc] = useState(initialContent?.promo_hero_desc || "Discover our curated selection of festive promotions, limited-time offers, and exclusive membership benefits designed to make you shine.");

  // Campaigns State"""
content = content.replace("  // Campaigns State", state_injection)

# Add to updates
old_updates = """      const updates = {
        promo_campaigns: JSON.stringify(campaigns),"""
new_updates = """      const updates = {
        promo_hero_badge: heroBadge,
        promo_hero_title1: heroTitle1,
        promo_hero_title2: heroTitle2,
        promo_hero_desc: heroDesc,
        promo_campaigns: JSON.stringify(campaigns),"""
content = content.replace(old_updates, new_updates)

# Add tab button
old_buttons = """        <div className="flex border-b border-brand-beige">
          <button
            onClick={() => setActiveTab('campaigns')}"""
new_buttons = """        <div className="flex border-b border-brand-beige">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'hero' ? 'bg-brand-sage text-white' : 'text-brand-charcoal/60 hover:bg-brand-sage/10'
            }`}
          >
            Hero Banner
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}"""
content = content.replace(old_buttons, new_buttons)

# Add Hero tab content
old_tab_content = """        <div className="p-8">
          {/* TAB: CAMPAIGNS */}"""
new_tab_content = """        <div className="p-8">
          {/* TAB: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-brand-charcoal mb-4">Hero Banner Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Badge Text</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Title Part 1 (Normal)</label>
                  <input
                    type="text"
                    value={heroTitle1}
                    onChange={(e) => setHeroTitle1(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Title Part 2 (Italic & Gold)</label>
                  <input
                    type="text"
                    value={heroTitle2}
                    onChange={(e) => setHeroTitle2(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal/70 mb-2">Description</label>
                <textarea
                  value={heroDesc}
                  onChange={(e) => setHeroDesc(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-brand-beige focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* TAB: CAMPAIGNS */}"""
content = content.replace(old_tab_content, new_tab_content)

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'w') as f:
    f.write(content)
