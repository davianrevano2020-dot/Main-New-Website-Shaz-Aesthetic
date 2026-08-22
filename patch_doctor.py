import re

with open('app/doctor/ClientDoctorPage.tsx', 'r') as f:
    text = f.read()

replacement = """  const getBookingUrl = (doctorName?: string) => {
    if (!doctorName) return content.doctor_cta_button_link || WA_DEFAULT;
    const waNumber = content.global_whatsapp_number || "628113889999";
    const text = `Hello SHAZ Aesthetic Clinic Seminyak, I would like to book a medical consultation with ${doctorName}.`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };"""

text = re.sub(r'  const getBookingUrl = \(doctorName\?: string\) => \{.*?  \};', replacement, text, flags=re.DOTALL)

with open('app/doctor/ClientDoctorPage.tsx', 'w') as f:
    f.write(text)
