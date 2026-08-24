'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Stethoscope, 
  GraduationCap, 
  Award, 
  Languages, 
  Calendar, 
  Clock, 
  HeartHandshake,
  ExternalLink,
  Edit3,
  X
} from 'lucide-react';
import Link from 'next/link';

interface DoctorItem {
  id: string;
  name: string;
  title: string;
  specialization: string;
  shortIntro: string;
  experience: string;
  biography: string;
  education: string[] | string;
  certifications: string[] | string;
  languages: string[] | string;
  signatureTreatments: string[] | string;
  treatmentPhilosophy: string;
  schedule: string;
  img: string;
  published: boolean;
  order: number;
}

const DEFAULT_DOCTORS: DoctorItem[] = [
  {
    id: "dr-elisabeth-zora",
    name: "Dr. Elisabeth Zora, M.Biomed (AAM)",
    title: "Head Aesthetic Physician & Master Injector",
    specialization: "Facial Harmonization & Structural Injectables",
    shortIntro: "Specializes in high-precision facial balancing, biostimulators, and advanced structural rejuvenation with natural aesthetics.",
    experience: "12+ Years Clinical Experience",
    biography: "Dr. Elisabeth Zora is a premier aesthetic physician with over a decade of clinical excellence in advanced facial aesthetics. Trained internationally in London, Seoul, and Jakarta, she is renowned for her bespoke approach to structural harmony, emphasizing subtle, undetectable rejuvenation that respects individual facial architecture.",
    education: [
      "Faculty of Medicine, Universitas Udayana (Medical Doctor)",
      "Master of Biomedical Science in Anti-Aging Medicine (M.Biomed AAM)",
      "Advanced Fellowship in Non-Surgical Facial Contouring, Seoul, South Korea"
    ],
    certifications: [
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Master Injector - Allergan Medical Institute (AMI)",
      "Fellow of the American Academy of Aesthetic Medicine (AAAM)",
      "Active Member of the Indonesian Society of Aesthetic Doctors (PERDESTI)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Full-Face Structural Rejuvenation",
      "Precision Neuromodulators & Botox",
      "Polynucleotide Biostimulator & Skin Boosters",
      "ExoMind Cellular Rejuvenation"
    ],
    treatmentPhilosophy: "Aesthetic medicine is an art of subtraction and gentle refinement. My commitment is to elevate your innate beauty with complete anatomical precision, ensuring you look revitalized, radiant, and timelessly yourself.",
    schedule: "Monday – Friday: 10:00 – 18:00 WITA | Saturday: 10:00 – 15:00 WITA",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 1
  },
  {
    id: "dr-vrety-widyari",
    name: "Dr. Vrety Widyari, Sp.D.V.E",
    title: "Dermatology & Venereology Specialist",
    specialization: "Clinical Dermatology & Precision Lasers",
    shortIntro: "Expert in complex pigmentation, laser resurfacing, melasma correction, and regenerative skin therapies.",
    experience: "10+ Years Medical Dermatology",
    biography: "Dr. Vrety Widyari is a board-certified dermatologist dedicated to evidence-based skin pathology, laser resurfacing, and pigmentary disorders. With clinical training across top national referral centers, Dr. Vrety tailors multi-modality energy device protocols for challenging skin conditions in tropical climates.",
    education: [
      "Specialist Degree in Dermatology & Venereology (Sp.D.V.E), Universitas Indonesia",
      "Faculty of Medicine, Universitas Airlangga (Medical Doctor)",
      "International Laser Dermatology Preceptorship, Singapore General Hospital"
    ],
    certifications: [
      "Board Certified Specialist - Indonesian Society of Dermatology and Venereology (PERDOSKI)",
      "Certified Laser Specialist - European Academy of Dermatology and Venereology (EADV)",
      "Member of the International Society of Dermatology (ISD)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "PicoSure & Q-Switched Precision Laser",
      "Melasma & Hyperpigmentation Protocol",
      "Acne Scar Subcision & Microneedling RF",
      "Deep Cellular Medical Peels"
    ],
    treatmentPhilosophy: "Skin health is the foundation of all aesthetic beauty. By restoring epidermal integrity and targeting deep cellular dysfunctions with precision lasers, we achieve clear, luminous, and resilient skin.",
    schedule: "Tuesday, Thursday & Saturday: 11:00 – 19:00 WITA",
    img: "https://images.unsplash.com/photo-1594824436998-d50d6ff71f92?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 2
  },
  {
    id: "dr-diah-nareswari",
    name: "Dr. Diah Nareswari, M.Biomed",
    title: "Senior Aesthetic & Skin Rejuvenation Physician",
    specialization: "Cellular Rejuvenation & Preventative Aesthetics",
    shortIntro: "Specializes in bespoke skin revitalizing cocktails, collagen stimulation, and delicate under-eye treatments.",
    experience: "8+ Years Aesthetic Practice",
    biography: "Dr. Diah Nareswari focuses on proactive, regenerative skin therapies that stimulate endogenous collagen and elastin production. Her gentle injection technique and keen eye for skin texture harmonization make her consultations highly sought after for radiant, youthful skin maintenance.",
    education: [
      "Master of Biomedical Science, Anti-Aging & Regenerative Medicine",
      "Faculty of Medicine, Universitas Udayana (Medical Doctor)",
      "Certificate in Clinical Aesthetic Dermatology, Bangkok, Thailand"
    ],
    certifications: [
      "Certified Practitioner - Asia-Pacific Aesthetic Injectables Congress",
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Provider for Collagen Biostimulators (Radiesse & Sculptra)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Signature Glass Skin Protocol",
      "Under-Eye Tear Trough Refresh",
      "Profhilo & Skin Hydration Infusions",
      "Collagen Induction Therapy"
    ],
    treatmentPhilosophy: "Preventative aesthetics allows us to age gracefully while protecting our skin's biological vitality. Every treatment should feel restorative, comfortable, and tailored to your lifestyle.",
    schedule: "Monday, Wednesday & Friday: 10:00 – 18:00 WITA",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 3
  },
  {
    id: "dr-ananda-aprilia",
    name: "Dr. Ananda Aprilia",
    title: "Aesthetic Physician & Body Sculpting Lead",
    specialization: "Non-Invasive Body Contouring & Advanced Lasers",
    shortIntro: "Dedicated to holistic body sculpting, medical laser hair removal, and personalized neck & décolletage rejuvenation.",
    experience: "7+ Years Clinical Aesthetics",
    biography: "Dr. Ananda Aprilia combines medical precision with modern body contouring modalities to sculpt harmonious silhouettes and deliver clinical-grade laser therapies. She prioritizes patient comfort, safety protocols, and personalized follow-up care.",
    education: [
      "Faculty of Medicine, Universitas Padjadjaran (Medical Doctor)",
      "Clinical Certification in Energy-Based Body Sculpting, Singapore",
      "Advanced Training in Medical Aesthetic Lasers"
    ],
    certifications: [
      "Indonesian Medical Association (IDI) - Registered Physician",
      "Certified Medical Laser Safety Officer (MLSO)",
      "Member of the Indonesian Association of Aesthetic Doctors (PERDESTI)"
    ],
    languages: ["English (Fluent)", "Indonesian (Native)"],
    signatureTreatments: [
      "Non-Surgical Body Tightening",
      "Medical Grade Laser Hair Removal",
      "Neck & Décolletage Rejuvenation",
      "Targeted Fat Dissolving & Contouring"
    ],
    treatmentPhilosophy: "Confidence comes from feeling balanced in your own body. We leverage safe, non-invasive technology to contour, tone, and refine with zero downtime and lasting elegance.",
    schedule: "Wednesday – Sunday: 10:00 – 17:00 WITA",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 4
  }
];

export default function BackOfficeDoctor() {
  const [activeTab, setActiveTab] = useState<'doctors' | 'page_settings'>('doctors');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Page Header & Banner form state
  const [pageSettings, setPageSettings] = useState({
    doctor_meta_title: '',
    doctor_meta_description: '',
    doctor_hero_badge: 'CERTIFIED MEDICAL EXPERTS',
    doctor_hero_title: 'Meet Our Certified Physicians & Dermatologists',
    doctor_hero_subtitle: "Bali's leading aesthetic practitioners combining evidence-based medical science, anatomical mastery, and delicate artistic precision.",
    doctor_hero_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
    doctor_trust_badge: 'THE SHAZ CLINICAL STANDARD',
    doctor_trust_title: 'Where Medical Integrity Meets Refined Artistry',
    doctor_trust_description: 'Every injector, laser therapist, and clinical consultant at SHAZ is a certified medical doctor with extensive accredited training in facial anatomy, dermatological pharmacology, and non-surgical rejuvenation.',
    doctor_cta_badge: 'PERSONALIZED MEDICAL CONSULTATION',
    doctor_cta_title: 'Begin Your Treatment with a Dedicated Doctor',
    doctor_cta_subtitle: 'Schedule a comprehensive 1-on-1 skin diagnostic with our aesthetic physicians in Seminyak, or connect with our clinical concierge.',
    doctor_cta_button_text: 'Book Consultation with Our Doctors',
    doctor_cta_button_link: 'https://wa.link/o7f5yk'
  });

  // Doctors list state
  const [doctors, setDoctors] = useState<DoctorItem[]>(DEFAULT_DOCTORS);
  const [editingDoctorIndex, setEditingDoctorIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          // Sync page settings
          setPageSettings(prev => ({
            ...prev,
            doctor_hero_badge: json.data.doctor_hero_badge || prev.doctor_hero_badge,
            doctor_hero_title: json.data.doctor_hero_title || prev.doctor_hero_title,
            doctor_hero_subtitle: json.data.doctor_hero_subtitle || prev.doctor_hero_subtitle,
            doctor_hero_image: json.data.doctor_hero_image || prev.doctor_hero_image,
            doctor_trust_badge: json.data.doctor_trust_badge || prev.doctor_trust_badge,
            doctor_trust_title: json.data.doctor_trust_title || prev.doctor_trust_title,
            doctor_trust_description: json.data.doctor_trust_description || prev.doctor_trust_description,
            doctor_cta_badge: json.data.doctor_cta_badge || prev.doctor_cta_badge,
            doctor_cta_title: json.data.doctor_cta_title || prev.doctor_cta_title,
            doctor_cta_subtitle: json.data.doctor_cta_subtitle || prev.doctor_cta_subtitle,
            doctor_cta_button_text: json.data.doctor_cta_button_text || prev.doctor_cta_button_text,
            doctor_cta_button_link: json.data.doctor_cta_button_link || prev.doctor_cta_button_link,
          }));

          // Sync doctors
          if (json.data.doctor_page_doctors) {
            try {
              const parsed = JSON.parse(json.data.doctor_page_doctors);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setDoctors(parsed);
              }
            } catch (e) {
              console.error('Error parsing doctor_page_doctors', e);
            }
          } else if (json.data.doctors_list) {
            try {
              const parsed = JSON.parse(json.data.doctors_list);
              if (Array.isArray(parsed) && parsed.length > 0) {
                // Merge with default doctors to maintain full profile richness
                const merged = parsed.map((doc: any, i: number) => ({
                  id: doc.id || `doc-${i + 1}`,
                  name: doc.name || 'Dr. Practitioner',
                  title: doc.title || 'Aesthetic Physician',
                  specialization: doc.specialization || 'Clinical Aesthetics',
                  shortIntro: doc.desc || doc.shortIntro || 'Medical Aesthetic Practitioner',
                  experience: doc.experience || '8+ Years Clinical Experience',
                  biography: doc.biography || doc.desc || 'Certified doctor dedicated to excellence.',
                  education: Array.isArray(doc.education) ? doc.education : (doc.education ? [doc.education] : ['Faculty of Medicine']),
                  certifications: Array.isArray(doc.certifications) ? doc.certifications : (doc.certifications ? [doc.certifications] : ['Indonesian Medical Association (IDI)']),
                  languages: Array.isArray(doc.languages) ? doc.languages : ['English', 'Indonesian'],
                  signatureTreatments: Array.isArray(doc.signatureTreatments) ? doc.signatureTreatments : ['Facial Harmonization'],
                  treatmentPhilosophy: doc.treatmentPhilosophy || 'Delivering natural aesthetic harmony with precision and care.',
                  schedule: doc.schedule || 'Monday – Friday: 10:00 – 18:00 WITA',
                  img: doc.img || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
                  published: doc.published !== undefined ? doc.published : true,
                  order: doc.order || i + 1
                }));
                setDoctors(merged);
              }
            } catch (e) {}
          }
        }
      } catch (err) {
        console.error('Failed to load content', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Save changes to API
  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    // Format home doctors list for cross-page synchronization
    const homeDoctorsSync = doctors
      .filter(d => d.published)
      .map(d => ({
        name: d.name,
        title: d.title,
        desc: d.shortIntro || d.biography?.substring(0, 70) + '...',
        img: d.img
      }));

    const payload: Record<string, string> = {
      ...pageSettings,
      doctor_page_doctors: JSON.stringify(doctors),
      doctors_list: JSON.stringify(homeDoctorsSync)
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'success') {
        setStatusMessage({ type: 'success', text: 'All changes saved successfully to the database!' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save changes.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Upload photo handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, doctorIndex?: number, fieldKey?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const inputTarget = e.target;
    const uploadId = doctorIndex !== undefined ? `doc-${doctorIndex}` : (fieldKey || 'hero');
    setUploadingField(uploadId);
    setStatusMessage(null);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if ((json.success || json.status === 'success') && json.url) {
        if (doctorIndex !== undefined) {
          const updated = [...doctors];
          updated[doctorIndex].img = json.url;
          setDoctors(updated);
        } else if (fieldKey) {
          setPageSettings(prev => ({ ...prev, [fieldKey]: json.url }));
        }
        setStatusMessage({ type: 'success', text: 'Photo uploaded successfully! Remember to click "Save Changes".' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to upload photo.' });
      }
    } catch (err) {
      console.error('Upload error', err);
      setStatusMessage({ type: 'error', text: 'An error occurred while uploading the photo.' });
    } finally {
      setUploadingField(null);
      if (inputTarget) inputTarget.value = '';
    }
  };

  // Add new doctor
  const handleAddDoctor = () => {
    const newDoc: DoctorItem = {
      id: `dr-${Date.now()}`,
      name: 'Dr. New Specialist, Sp.D.V.E',
      title: 'Aesthetic Physician',
      specialization: 'Facial Harmonization & Clinical Aesthetics',
      shortIntro: 'Brief summary of the doctor clinical expertise and focus areas.',
      experience: '5+ Years Clinical Experience',
      biography: 'Comprehensive biography covering medical training, clinical practice, key specialties, and patient care philosophy.',
      education: ['Faculty of Medicine (MD)', 'Master of Aesthetic Medicine'],
      certifications: ['Indonesian Medical Association (IDI)', 'Certified Master Injector'],
      languages: ['English', 'Indonesian'],
      signatureTreatments: ['Facial Harmonization', 'Skin Rejuvenation', 'Precision Lasers'],
      treatmentPhilosophy: 'Providing safe, evidence-based medical aesthetics that elevate natural facial balance.',
      schedule: 'Monday – Friday: 10:00 – 18:00 WITA',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
      published: true,
      order: doctors.length + 1
    };
    setDoctors([...doctors, newDoc]);
    setEditingDoctorIndex(doctors.length);
  };

  // Delete doctor
  const handleDeleteDoctor = (index: number) => {
    if (confirm('Are you sure you want to delete this doctor profile?')) {
      const filtered = doctors.filter((_, i) => i !== index);
      setDoctors(filtered);
      if (editingDoctorIndex === index) {
        setEditingDoctorIndex(null);
      } else if (editingDoctorIndex !== null && editingDoctorIndex > index) {
        setEditingDoctorIndex(editingDoctorIndex - 1);
      }
    }
  };

  // Move doctor order
  const handleMoveDoctor = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === doctors.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...doctors];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Update order values
    updated.forEach((d, i) => {
      d.order = i + 1;
    });

    setDoctors(updated);
    if (editingDoctorIndex === index) {
      setEditingDoctorIndex(targetIndex);
    } else if (editingDoctorIndex === targetIndex) {
      setEditingDoctorIndex(index);
    }
  };

  // Toggle publish
  const handleTogglePublish = (index: number) => {
    const updated = [...doctors];
    updated[index].published = !updated[index].published;
    setDoctors(updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-forest mx-auto" />
          <p className="text-sm font-sans text-brand-charcoal/60">Loading Doctor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-beige pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-brand-forest/10 text-brand-forest">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-serif font-bold text-brand-charcoal">
              Doctor Page Management
            </h1>
          </div>
          <p className="text-sm text-brand-charcoal/60">
            Manage doctor profiles, photos, medical credentials, consultation schedules, and <span className="font-semibold text-brand-forest">/doctor</span> page content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/doctor"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-forest/30 text-brand-forest text-xs font-semibold hover:bg-brand-forest/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View /doctor Page</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-forest text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex border-b border-brand-beige gap-2">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'doctors'
              ? 'border-brand-forest text-brand-forest'
              : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Doctor Profiles ({doctors.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('page_settings')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'page_settings'
              ? 'border-brand-forest text-brand-forest'
              : 'border-transparent text-brand-charcoal/60 hover:text-brand-charcoal'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Header, Banner & Page Content</span>
        </button>
      </div>

      {/* TAB 1: DOCTORS LIST & PROFILE MANAGEMENT */}
      {activeTab === 'doctors' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-beige shadow-sm">
            <div>
              <h2 className="text-base font-serif font-bold text-brand-charcoal">
                SHAZ Doctors & Specialists List
              </h2>
              <p className="text-xs text-brand-charcoal/60">
                Manage display order, publication status, photos, and medical profile details for each doctor.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddDoctor}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest text-white text-xs font-bold rounded-xl hover:bg-brand-charcoal transition-colors shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Add New Doctor
            </button>
          </div>

          {/* Doctors Grid / Cards */}
          <div className="grid grid-cols-1 gap-6">
            {doctors.map((doc, idx) => {
              const isEditing = editingDoctorIndex === idx;

              return (
                <div 
                  key={doc.id || idx} 
                  className={`rounded-2xl border transition-all duration-200 bg-white ${
                    isEditing ? 'border-brand-forest ring-1 ring-brand-forest shadow-md' : 'border-brand-beige hover:border-brand-sage/60'
                  }`}
                >
                  {/* Card Header / Summary Row */}
                  <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-beige/50">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Doctor Avatar */}
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-neutral-100 border border-brand-beige shrink-0">
                        <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                        {!doc.published && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-wider">
                            Draft
                          </div>
                        )}
                      </div>

                      {/* Doctor Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-brand-forest bg-brand-forest/10 px-2 py-0.5 rounded">
                            #{doc.order || idx + 1}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            doc.published ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {doc.published ? 'Published' : 'Draft / Unpublished'}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-brand-charcoal truncate">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-forest truncate">
                          {doc.title || doc.specialization}
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                      {/* Reorder Buttons */}
                      <div className="flex items-center bg-brand-white border border-brand-beige rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => handleMoveDoctor(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-beige/40 rounded disabled:opacity-30"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDoctor(idx, 'down')}
                          disabled={idx === doctors.length - 1}
                          className="p-1.5 text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-beige/40 rounded disabled:opacity-30"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Publish Toggle Button */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(idx)}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          doc.published 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                            : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200'
                        }`}
                        title={doc.published ? 'Click to Unpublish' : 'Click to Publish'}
                      >
                        {doc.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span className="hidden sm:inline">{doc.published ? 'Active' : 'Hidden'}</span>
                      </button>

                      {/* Edit Expand Toggle */}
                      <button
                        type="button"
                        onClick={() => setEditingDoctorIndex(isEditing ? null : idx)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          isEditing 
                            ? 'bg-brand-forest text-white' 
                            : 'bg-brand-beige/60 text-brand-charcoal hover:bg-brand-beige'
                        }`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEditing ? 'Close Form' : 'Edit Profile'}</span>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteDoctor(idx)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Edit Form */}
                  {isEditing && (
                    <div className="p-6 bg-brand-white/40 space-y-6 animate-in fade-in">
                      {/* Row 1: Photo & Core Identity */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Photo Upload & Preview */}
                        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-brand-beige space-y-3">
                          <label className="block text-xs font-bold text-brand-charcoal uppercase">
                            Doctor Photo
                          </label>
                          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 border relative">
                            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className={`w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                              uploadingField === `doc-${idx}`
                                ? 'bg-brand-sage/20 text-brand-forest cursor-not-allowed opacity-75'
                                : 'bg-brand-forest text-white hover:bg-brand-charcoal'
                            }`}>
                              {uploadingField === `doc-${idx}` ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              <span>{uploadingField === `doc-${idx}` ? 'Uploading...' : 'Upload New Photo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingField === `doc-${idx}`}
                                className="hidden"
                                onChange={(e) => handlePhotoUpload(e, idx)}
                              />
                            </label>

                            <input
                              type="text"
                              placeholder="Direct Photo URL (https://...)"
                              value={doc.img}
                              onChange={(e) => {
                                const updated = [...doctors];
                                updated[idx].img = e.target.value;
                                setDoctors(updated);
                              }}
                              className="w-full px-3 py-1.5 text-[11px] font-mono border rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Name, Title, Specialization, Experience */}
                        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-brand-beige space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                                Full Name & Medical Degrees *
                              </label>
                              <input
                                type="text"
                                value={doc.name}
                                onChange={(e) => {
                                  const updated = [...doctors];
                                  updated[idx].name = e.target.value;
                                  setDoctors(updated);
                                }}
                                className="w-full px-3.5 py-2 rounded-xl border font-serif font-bold text-brand-forest text-sm"
                                placeholder="e.g., Dr. Elisabeth Zora, M.Biomed (AAM)"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                                Clinical Title / Position
                              </label>
                              <input
                                type="text"
                                value={doc.title}
                                onChange={(e) => {
                                  const updated = [...doctors];
                                  updated[idx].title = e.target.value;
                                  setDoctors(updated);
                                }}
                                className="w-full px-3.5 py-2 rounded-xl border text-xs font-semibold uppercase"
                                placeholder="e.g., Head Aesthetic Physician & Master Injector"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                                Medical Specialization / Focus
                              </label>
                              <input
                                type="text"
                                value={doc.specialization}
                                onChange={(e) => {
                                  const updated = [...doctors];
                                  updated[idx].specialization = e.target.value;
                                  setDoctors(updated);
                                }}
                                className="w-full px-3.5 py-2 rounded-xl border text-xs"
                                placeholder="e.g., Facial Harmonization & Structural Injectables"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                                Clinical Experience (Badge)
                              </label>
                              <input
                                type="text"
                                value={doc.experience}
                                onChange={(e) => {
                                  const updated = [...doctors];
                                  updated[idx].experience = e.target.value;
                                  setDoctors(updated);
                                }}
                                className="w-full px-3.5 py-2 rounded-xl border text-xs"
                                placeholder="e.g., 12+ Years Clinical Experience"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                              Short Profile Summary (Displayed on Card)
                            </label>
                            <textarea
                              rows={2}
                              value={doc.shortIntro}
                              onChange={(e) => {
                                const updated = [...doctors];
                                updated[idx].shortIntro = e.target.value;
                                setDoctors(updated);
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border text-xs leading-relaxed"
                              placeholder="Brief 1-2 sentence description for the doctor card..."
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-brand-charcoal/70 uppercase mb-1">
                              Full Biography & Medical Background
                            </label>
                            <textarea
                              rows={4}
                              value={doc.biography}
                              onChange={(e) => {
                                const updated = [...doctors];
                                updated[idx].biography = e.target.value;
                                setDoctors(updated);
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border text-xs leading-relaxed"
                              placeholder="Describe clinical background, training, specializations, and patient care approach..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Credentials, Education, Certifications, Treatments */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-xl border border-brand-beige">
                        {/* Education */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <GraduationCap className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Education Background (1 line per institution)
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={Array.isArray(doc.education) ? doc.education.join('\n') : (doc.education || '')}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].education = e.target.value.split('\n').filter(Boolean);
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs font-sans"
                            placeholder="Faculty of Medicine, Udayana University (MD)&#10;Master of Clinical Dermatology, London"
                          />
                        </div>

                        {/* Certifications */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Award className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Certifications & Licenses (1 line per certificate)
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={Array.isArray(doc.certifications) ? doc.certifications.join('\n') : (doc.certifications || '')}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].certifications = e.target.value.split('\n').filter(Boolean);
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs font-sans"
                            placeholder="Indonesian Medical Association (IDI)&#10;Certified Master Injector - AMI&#10;Fellow of AAAM"
                          />
                        </div>

                        {/* Signature Treatments */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Signature Treatments (Separate by comma or new line)
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={Array.isArray(doc.signatureTreatments) ? doc.signatureTreatments.join(', ') : (doc.signatureTreatments || '')}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].signatureTreatments = e.target.value.split(/,|\n/).map(s => s.trim()).filter(Boolean);
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs font-sans"
                            placeholder="Full-Face Contouring, Precision Botox, Polynucleotide Booster, Pico Laser"
                          />
                        </div>

                        {/* Treatment Philosophy */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <HeartHandshake className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Treatment Philosophy
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={doc.treatmentPhilosophy}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].treatmentPhilosophy = e.target.value;
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs font-sans italic"
                            placeholder="Quote reflecting doctor's clinical philosophy and patient care approach..."
                          />
                        </div>

                        {/* Consultation Schedule */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Clock className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Practice & Consultation Schedule
                            </label>
                          </div>
                          <input
                            type="text"
                            value={doc.schedule}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].schedule = e.target.value;
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs"
                            placeholder="Monday – Friday: 10:00 – 18:00 WITA | Saturday: 10:00 – 15:00 WITA"
                          />
                        </div>

                        {/* Languages */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Languages className="w-4 h-4 text-brand-forest" />
                            <label className="text-xs font-bold text-brand-charcoal uppercase">
                              Languages Spoken (Separate with comma)
                            </label>
                          </div>
                          <input
                            type="text"
                            value={Array.isArray(doc.languages) ? doc.languages.join(', ') : (doc.languages || '')}
                            onChange={(e) => {
                              const updated = [...doctors];
                              updated[idx].languages = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              setDoctors(updated);
                            }}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs"
                            placeholder="English (Fluent), Indonesian (Native)"
                          />
                        </div>
                      </div>

                      {/* Action buttons inside form */}
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingDoctorIndex(null)}
                          className="px-4 py-2 rounded-xl border border-brand-beige text-xs font-semibold text-brand-charcoal/70 hover:bg-brand-beige/40"
                        >
                          Close Form
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={isSaving}
                          className="px-5 py-2 bg-brand-forest text-white rounded-xl text-xs font-bold hover:bg-brand-charcoal flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Now</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PAGE SETTINGS & HEADER BANNER */}
      {activeTab === 'page_settings' && (
        <div className="space-y-8 max-w-4xl">
          
          {/* Section 0: SEO Settings */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3">
              0. SEO Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Title</label>
                <input
                  type="text"
                  value={pageSettings.doctor_meta_title || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_meta_title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  placeholder="Our Doctors & Medical Specialists | SHAZ Aesthetic Clinic Seminyak"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Meta Description</label>
                <textarea
                  value={pageSettings.doctor_meta_description || ''}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_meta_description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  rows={3}
                  placeholder="Meet our team of certified aesthetic physicians..."
                />
              </div>
            </div>
          </div>

          {/* Section 1: Hero Banner */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3">
              1. Hero Header (/doctor Page)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Badge Kicker</label>
                <input
                  type="text"
                  value={pageSettings.doctor_hero_badge}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_hero_badge: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                  placeholder="CERTIFIED MEDICAL EXPERTS"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Hero Title</label>
                <input
                  type="text"
                  value={pageSettings.doctor_hero_title}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_hero_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-base font-serif font-bold text-brand-forest"
                  placeholder="Meet Our Certified Physicians & Dermatologists"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={pageSettings.doctor_hero_subtitle}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_hero_subtitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                  placeholder="Comprehensive description of clinical doctor excellence..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Banner Background Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={pageSettings.doctor_hero_image}
                    onChange={(e) => setPageSettings({ ...pageSettings, doctor_hero_image: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl border border-brand-beige text-xs font-mono"
                  />
                  <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    uploadingField === 'doctor_hero_image'
                      ? 'bg-brand-sage/20 text-brand-forest cursor-not-allowed opacity-75'
                      : 'bg-brand-beige hover:bg-brand-sage hover:text-white'
                  }`}>
                    {uploadingField === 'doctor_hero_image' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingField === 'doctor_hero_image' ? 'Uploading...' : 'Upload Banner'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingField === 'doctor_hero_image'}
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, undefined, 'doctor_hero_image')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Trust Bar */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3">
              2. Clinical Standard & Trust Statement
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Trust Badge</label>
                <input
                  type="text"
                  value={pageSettings.doctor_trust_badge}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_trust_badge: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                  placeholder="THE SHAZ CLINICAL STANDARD"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Trust Section Title</label>
                <input
                  type="text"
                  value={pageSettings.doctor_trust_title}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_trust_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-base font-serif font-bold text-brand-forest"
                  placeholder="Where Medical Integrity Meets Refined Artistry"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">Trust Description</label>
                <textarea
                  rows={3}
                  value={pageSettings.doctor_trust_description}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_trust_description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm leading-relaxed"
                  placeholder="Explanation of clinical standards, doctor qualifications, and safety assurance..."
                />
              </div>
            </div>
          </div>

          {/* Section 3: Bottom CTA Section */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige space-y-6">
            <h2 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3">
              3. Bottom CTA Section
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">CTA Badge</label>
                <input
                  type="text"
                  value={pageSettings.doctor_cta_badge}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_cta_badge: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                  placeholder="PERSONALIZED MEDICAL CONSULTATION"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">CTA Title</label>
                <input
                  type="text"
                  value={pageSettings.doctor_cta_title}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_cta_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-base font-serif font-bold text-brand-forest"
                  placeholder="Begin Your Treatment with a Dedicated Doctor"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">CTA Subtitle</label>
                <textarea
                  rows={2}
                  value={pageSettings.doctor_cta_subtitle}
                  onChange={(e) => setPageSettings({ ...pageSettings, doctor_cta_subtitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                  placeholder="Schedule a comprehensive consultation..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={pageSettings.doctor_cta_button_text}
                    onChange={(e) => setPageSettings({ ...pageSettings, doctor_cta_button_text: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-brand-beige text-sm"
                    placeholder="Book Consultation with Our Doctors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">WhatsApp Link / Booking URL</label>
                  <input
                    type="text"
                    value={pageSettings.doctor_cta_button_link}
                    onChange={(e) => setPageSettings({ ...pageSettings, doctor_cta_button_link: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-brand-beige text-xs font-mono"
                    placeholder="https://wa.link/o7f5yk"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
