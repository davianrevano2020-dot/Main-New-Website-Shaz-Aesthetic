import re
import json

# Let's read a file called data.txt that I will create next.
with open('data.txt', 'r') as f:
    text = f.read()

categories = []
current_cat = None
current_treatments = []
current_treatment = {}

for line in text.split('\n'):
    line = line.strip()
    if not line:
        continue
    
    # Check for category header
    cat_match = re.match(r'^([A-Z]+)\s+\(\d+\s+Treatments\)', line)
    if cat_match:
        if current_cat:
            categories.append({
                'name': current_cat,
                'treatments': current_treatments
            })
        current_cat = cat_match.group(1)
        current_treatments = []
        continue

    # Check for treatment number and name (e.g., "1. Glass & Glow Therapy (Skin Boost)")
    if re.match(r'^\d+\.\s+', line):
        if current_treatment:
            current_treatments.append(current_treatment)
        current_treatment = {}
        continue

    if line.startswith('Service Name'):
        current_treatment['name'] = line.replace('Service Name', '').strip()
    elif line.startswith('Treatment Category'):
        pass # ignore
    elif line.startswith('Duration'):
        current_treatment['duration'] = line.replace('Duration', '').strip()
    elif line.startswith('Tag (Optional)'):
        tag = line.replace('Tag (Optional)', '').strip()
        if tag and tag != '-':
            current_treatment['tag'] = tag
    elif line.startswith('Description'):
        current_treatment['desc'] = line.replace('Description', '').strip()
    elif line.startswith('Suitable For'):
        current_treatment['suitableFor'] = line.replace('Suitable For', '').strip()
    elif line.startswith('Procedure'):
        current_treatment['procedure'] = line.replace('Procedure', '').strip()
    elif line.startswith('Downtime'):
        current_treatment['downtime'] = line.replace('Downtime', '').strip()
    elif line.startswith('Expected Results'):
        current_treatment['expectedResults'] = line.replace('Expected Results', '').strip()
    elif line.startswith('Price'):
        current_treatment['price'] = line.replace('Price', '').strip()
    elif line.startswith('Key Benefits'):
        benefits_str = line.replace('Key Benefits', '').strip()
        current_treatment['keyBenefits'] = [b.strip() for b in benefits_str.split(',')]
    else:
        # Append to the last key if it's a multiline description
        # We can guess which key it belongs to based on the last added key.
        if current_treatment:
            keys = list(current_treatment.keys())
            if keys:
                last_key = keys[-1]
                if isinstance(current_treatment[last_key], str):
                    current_treatment[last_key] += " " + line

if current_treatment:
    current_treatments.append(current_treatment)
if current_cat:
    categories.append({
        'name': current_cat,
        'treatments': current_treatments
    })

# Output JSON
with open('parsed_treatments.json', 'w') as f:
    json.dump(categories, f, indent=2)
print(f"Parsed {len(categories)} categories")
