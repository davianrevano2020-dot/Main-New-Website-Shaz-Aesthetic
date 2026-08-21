import re

with open('app/packages/ClientPackagesPage.tsx', 'r') as f:
    content = f.read()

# Replace: 
# export default function ClientPackagesPage({ initialContent }: { initialContent: any }) {
#   const [activeCategoryModal, setActiveCategoryModal] = useState<PackageCategory | null>(null);

replacement = """export default function ClientPackagesPage({ initialContent }: { initialContent: any }) {
  const [activeCategoryModal, setActiveCategoryModal] = useState<PackageCategory | null>(null);
  const [categories, setCategories] = useState<PackageCategory[]>(DEFAULT_PACKAGE_CATEGORIES);

  useEffect(() => {
    if (initialContent?.package_categories) {
      try {
        const parsed = JSON.parse(initialContent.package_categories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      } catch (e) {
        console.error('Error parsing package_categories', e);
      }
    }
  }, [initialContent]);
"""

content = content.replace("export default function ClientPackagesPage({ initialContent }: { initialContent: any }) {\n  const [activeCategoryModal, setActiveCategoryModal] = useState<PackageCategory | null>(null);", replacement)

# Replace mapping over DEFAULT_PACKAGE_CATEGORIES with categories
content = content.replace("DEFAULT_PACKAGE_CATEGORIES.map((category", "categories.map((category")
# Replace any other uses
content = content.replace("DEFAULT_PACKAGE_CATEGORIES.findIndex", "categories.findIndex")
content = content.replace("DEFAULT_PACKAGE_CATEGORIES.length", "categories.length")

with open('app/packages/ClientPackagesPage.tsx', 'w') as f:
    f.write(content)

