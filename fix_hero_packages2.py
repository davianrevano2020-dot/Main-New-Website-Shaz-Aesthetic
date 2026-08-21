import re

with open('app/packages/ClientPackagesPage.tsx', 'r') as f:
    content = f.read()

cta_text = r'Explore Packages'
# Be careful not to replace it everywhere, just the button.
# Let's just find the exact span or button and replace it.
content = content.replace('<span>Explore Packages</span>', '<span>{initialContent?.packages_cta_text || "Explore Packages"}</span>')

hero_img = r'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d\?q=80\&w=1200\&auto=format\&fit=crop'
content = content.replace(hero_img, '{initialContent?.packages_hero_image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop"}')
# Wait, if it's in a src attribute, it needs to be src={initialContent?.packages_hero_image || "..."}
# Let's fix that.
content = content.replace('src="{initialContent?.packages_hero_image || \\"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop\\"}"', 'src={initialContent?.packages_hero_image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop"}')
content = content.replace('src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop"', 'src={initialContent?.packages_hero_image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop"}')


with open('app/packages/ClientPackagesPage.tsx', 'w') as f:
    f.write(content)
