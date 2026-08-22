import re

with open('app/treatment/ClientTreatmentPage.tsx', 'r') as f:
    text = f.read()

match = re.search(r'export const DEFAULT_CATEGORIES: TreatmentCategory\[\] = \[(.*?)\n\];\n', text, re.DOTALL)
if match:
    with open('current_cats.txt', 'w') as f:
        f.write(match.group(1))
