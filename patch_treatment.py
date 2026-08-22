import re

with open('app/treatment/ClientTreatmentPage.tsx', 'r') as f:
    text = f.read()

replacement = """  const getWhatsAppUrl = (customMsg?: string) => {
    const waNumber = initialContent?.global_whatsapp_number || "628113889999";
    const msg = customMsg || "Hello SHAZ Aesthetic Clinic, I would like to book a consultation for your treatments.";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };"""

text = re.sub(r'  const getWhatsAppUrl = \(customMsg\?: string\) => \{.*?  \};', replacement, text, flags=re.DOTALL)

with open('app/treatment/ClientTreatmentPage.tsx', 'w') as f:
    f.write(text)
