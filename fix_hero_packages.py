import re

with open('app/packages/ClientPackagesPage.tsx', 'r') as f:
    content = f.read()

hero_badge = r'<span className="text-xs font-bold tracking-widest uppercase text-brand-forest">[^<]+</span>'
hero_title = r'<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-\[1\.1\] mb-6">[^<]+</h1>'
hero_subtitle = r'<p className="text-brand-charcoal/70 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">[^<]+</p>'

content = re.sub(hero_badge, '{initialContent?.packages_hero_badge ? (<span className="text-xs font-bold tracking-widest uppercase text-brand-forest">{initialContent.packages_hero_badge}</span>) : (<span className="text-xs font-bold tracking-widest uppercase text-brand-forest">Signature Packages</span>)}', content)

content = re.sub(hero_title, '{initialContent?.packages_hero_title ? (<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-[1.1] mb-6">{initialContent.packages_hero_title}</h1>) : (<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-[1.1] mb-6">Curated Packages <br className="hidden md:block" /> Designed Around You</h1>)}', content)

content = re.sub(hero_subtitle, '{initialContent?.packages_hero_subtitle ? (<p className="text-brand-charcoal/70 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed whitespace-pre-wrap">{initialContent.packages_hero_subtitle}</p>) : (<p className="text-brand-charcoal/70 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">Discover carefully curated aesthetic packages combining our best treatments for optimal, harmonious results with significant savings.</p>)}', content)

with open('app/packages/ClientPackagesPage.tsx', 'w') as f:
    f.write(content)

