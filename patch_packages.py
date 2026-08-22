import re

with open('app/packages/ClientPackagesPage.tsx', 'r') as f:
    text = f.read()

replacement = """  const getWhatsAppUrl = (customMessage: string) => {
    const waNumber = initialContent?.global_whatsapp_number || "628113889999";
    const encodedMessage = encodeURIComponent(customMessage);
    return `https://wa.me/${waNumber}?text=${encodedMessage}`;
  };"""

text = re.sub(r'  const getWhatsAppUrl = \(customMessage: string\) => \{.*?  \};', replacement, text, flags=re.DOTALL)

with open('app/packages/ClientPackagesPage.tsx', 'w') as f:
    f.write(text)
