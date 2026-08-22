import re
import json

with open('parsed_treatments.json', 'r') as f:
    parsed_cats = json.load(f)

# The existing metadata for categories
CATEGORY_METADATA = {
    'SKIN': {
        'id': 'facial',
        'slug': 'facial',
        'name': 'Skin & Facial',
        'badge': 'Medical Skin Health',
        'shortDesc': 'Advanced medical facials, deep pore detox, exosome cellular infusions, and bespoke hydration therapies for clear, glowing, and resilient skin.',
        'fullDesc': 'Our medical-grade facials combine deep extraction, advanced peptide infusions, and exosome cellular therapies tailored to your skin barrier, acne profile, and hydration needs in tropical climates.',
        'img': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to inquire and book a consultation for Facial treatments.'
    },
    'INJECTABLES': {
        'id': 'injectables',
        'slug': 'injectables',
        'name': 'Injectables',
        'badge': 'Aesthetic Enhancements',
        'shortDesc': 'Doctor-administered injectables for volume restoration, wrinkle reduction, skin boosting, and subtle facial contouring.',
        'fullDesc': 'Achieve natural, harmonious results with our premium injectables. From muscle relaxants smoothing dynamic lines to dermal fillers and skin boosters that deeply hydrate and restore lost volume.',
        'img': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to book a consultation for Injectables.'
    },
    'LASER': {
        'id': 'laser',
        'slug': 'laser',
        'name': 'Laser',
        'badge': 'Energy-Based Devices',
        'shortDesc': 'High-precision laser technology for targeted pigmentation removal, vascular correction, acne scar resurfacing, and total skin brightening.',
        'fullDesc': 'Harnessing advanced clinical energy devices and non-ablative wavelengths, our laser suite effectively clears melasma, sun spots, broken capillaries, and uneven texture with minimal downtime.',
        'img': 'https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to inquire about Laser treatments and skin resurfacing.'
    },
    'BODY': {
        'id': 'body',
        'slug': 'body',
        'name': 'Body',
        'badge': 'Contouring & Wellness',
        'shortDesc': 'Non-invasive body contouring, lymphatic drainage, radiofrequency skin tightening, and localized slimming protocols designed for your silhouette.',
        'fullDesc': 'Sculpt, tone, and firm your body with our non-surgical aesthetic wellness therapies that combine lymphatic detox, targeted fat metabolism, and deep collagen stimulation.',
        'img': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to book a consultation for Body Contouring & Tightening.'
    },
    'HAIR': {
        'id': 'hair',
        'slug': 'hair',
        'name': 'Hair',
        'badge': 'Scalp & Follicle Therapy',
        'shortDesc': 'Clinical scalp revitalizing protocols, medical hair restoration, PRP treatments, and regenerative follicle stimulation for thicker, healthier hair.',
        'fullDesc': 'Address thinning hair, receding hairlines, and stressed scalp microenvironments through scientifically proven regenerative therapies and customized medical serums.',
        'img': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to consult about Hair & Scalp Restoration treatments.'
    },
    'SALON': {
        'id': 'salon',
        'slug': 'salon',
        'name': 'Salon',
        'badge': 'Luxury Memberships',
        'shortDesc': 'Exclusive membership packages offering bundled treatments, salon credit, and gym access.',
        'fullDesc': 'Invest in your ongoing wellness with our premium membership packages designed to deliver continuous value, bundled facial and machine treatments, and exclusive lifestyle perks.',
        'img': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
        'whatsappMessage': 'Hello SHAZ Clinic, I would like to inquire about Salon Membership Packages.'
    }
}

new_categories_str = "export const DEFAULT_CATEGORIES: TreatmentCategory[] = [\n"
for pc in parsed_cats:
    cat_name = pc['name']
    meta = CATEGORY_METADATA.get(cat_name, CATEGORY_METADATA['SKIN']) # fallback
    
    new_categories_str += "  {\n"
    new_categories_str += f"    id: '{meta['id']}',\n"
    new_categories_str += f"    slug: '{meta['slug']}',\n"
    new_categories_str += f"    name: '{meta['name']}',\n"
    new_categories_str += f"    badge: '{meta['badge']}',\n"
    new_categories_str += f"    shortDesc: `{meta['shortDesc']}`,\n"
    new_categories_str += f"    fullDesc: `{meta['fullDesc']}`,\n"
    new_categories_str += f"    img: '{meta['img']}',\n"
    
    treatments = pc['treatments']
    treatments_count_str = f"{len(treatments)} Treatments"
    new_categories_str += f"    treatmentsCount: '{treatments_count_str}',\n"
    new_categories_str += f"    whatsappMessage: `{meta['whatsappMessage']}`,\n"
    
    new_categories_str += "    featuredTreatments: [\n"
    
    for t in treatments:
        new_categories_str += "      {\n"
        new_categories_str += f"        name: `{t.get('name', '').replace('`', '')}`,\n"
        new_categories_str += f"        desc: `{t.get('desc', '').replace('`', '')}`,\n"
        
        if 'duration' in t:
            new_categories_str += f"        duration: `{t['duration']}`,\n"
        if 'tag' in t:
            new_categories_str += f"        tag: `{t['tag']}`,\n"
        if 'suitableFor' in t:
            new_categories_str += f"        suitableFor: `{t['suitableFor']}`,\n"
        if 'procedure' in t:
            new_categories_str += f"        procedure: `{t['procedure']}`,\n"
        if 'downtime' in t:
            new_categories_str += f"        downtime: `{t['downtime']}`,\n"
        if 'expectedResults' in t:
            new_categories_str += f"        expectedResults: `{t['expectedResults']}`,\n"
        if 'price' in t:
            new_categories_str += f"        price: `{t['price']}`,\n"
        
        if 'keyBenefits' in t and isinstance(t['keyBenefits'], list):
            kb_str = ", ".join([f"`{b.strip().replace('`', '')}`" for b in t['keyBenefits']])
            new_categories_str += f"        keyBenefits: [{kb_str}],\n"
            
        new_categories_str += "      },\n"
        
    new_categories_str += "    ]\n"
    new_categories_str += "  },\n"
new_categories_str += "];\n"

with open('app/treatment/ClientTreatmentPage.tsx', 'r') as f:
    text = f.read()

import re
# find the block to replace
pattern = re.compile(r'export const DEFAULT_CATEGORIES: TreatmentCategory\[\] = \[.*?\n\];\n', re.DOTALL)
new_text = pattern.sub(new_categories_str, text)

with open('app/treatment/ClientTreatmentPage.tsx', 'w') as f:
    f.write(new_text)

print("Updated ClientTreatmentPage.tsx successfully")
