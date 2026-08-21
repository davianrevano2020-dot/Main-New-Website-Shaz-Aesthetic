import re

with open('app/promotion/ClientPromotionPage.tsx', 'r') as f:
    content = f.read()

# Make sure we only affect the hero section
hero_pattern = r'(01\. HERO SECTION.*?<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden) bg-brand-forest text-white"(.*?</section>)'

def replacer(match):
    prefix = match.group(1)
    inner = match.group(2)
    
    # 1. Background and text color
    new_class = ' bg-[#FAF8F5] text-brand-charcoal"'
    
    # 2. mix-blend-multiply -> nothing or normal, but multiply is fine on light backgrounds too, actually let's remove mix-blend-multiply to keep it clean.
    inner = inner.replace(' mix-blend-multiply', '')
    
    # 3. Gradients
    inner = inner.replace('from-brand-sage/60', 'from-[#E5E0D8]/60')
    inner = inner.replace('from-brand-beige/40', 'from-white/60')
    
    # 4. Badge color
    inner = inner.replace('text-brand-beige', 'text-brand-forest')
    
    # 5. Paragraph text color
    inner = inner.replace('text-white/80', 'text-brand-charcoal/70')
    
    return prefix + new_class + inner

content = re.sub(hero_pattern, replacer, content, flags=re.DOTALL)

with open('app/promotion/ClientPromotionPage.tsx', 'w') as f:
    f.write(content)
