import re

with open('app/packages/ClientPackagesPage.tsx', 'r') as f:
    content = f.read()

replacement = """export default function ClientPackagesPage({ initialContent }: { initialContent: any }) {
  const [activeCategoryModal, setActiveCategoryModal] = useState<PackageCategory | null>(null);

  // Initialize state directly from props to avoid useEffect syncing
  const [categories, setCategories] = useState<PackageCategory[]>(() => {
    if (initialContent?.package_categories) {
      try {
        const parsed = JSON.parse(initialContent.package_categories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing package_categories', e);
      }
    }
    return DEFAULT_PACKAGE_CATEGORIES;
  });
"""

# replace the old code
content = re.sub(r'export default function ClientPackagesPage.*?}, \[initialContent\]\);', replacement, content, flags=re.DOTALL)

with open('app/packages/ClientPackagesPage.tsx', 'w') as f:
    f.write(content)

