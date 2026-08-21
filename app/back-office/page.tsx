'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle, Upload, Plus, Trash2, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_PACKAGES = [
  { id: "1", name: "ExoMind", desc: "Advanced TMS technology for better focus, emotional balance, and overall brain wellness.", features: ["FDA-cleared TMS technology", "Improves focus & clarity"], priceLabel: "PRICE", price: "IDR 4,000,000", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
  { id: "2", name: "Precision Botox", desc: "Smooth fine lines and restore a naturally refreshed appearance with expert precision.", features: ["Medical consultation included", "Natural-looking results"], priceLabel: "STARTING FROM", price: "IDR 95,000 / Unit", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
  { id: "3", name: "Laser Hair Removal", desc: "Long-lasting smooth skin with our advanced, comfortable laser technology.", features: ["Precision laser treatment", "Prevents ingrown hairs"], priceLabel: "STARTING FROM", price: "IDR 350,000", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" },
  { id: "4", name: "Signature Glass Skin", desc: "Achieve a radiant, poreless, and deeply hydrated complexion with our signature facial protocol.", features: ["Deep pore cleansing", "Intense hydration boost"], priceLabel: "STARTING FROM", price: "IDR 850,000", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", ctaText: "Book Now", ctaLink: "" }
];

const DEFAULT_TREATMENTS = [
  { id: '1', name: "Skin Perfection", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop", desc: "Advanced facials, exosomes, and cellular rejuvenation." },
  { id: '2', name: "Injectables", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", desc: "Botox, fillers, and skin boosters by certified doctors." },
  { id: '3', name: "Laser Technology", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?q=80&w=800&auto=format&fit=crop", desc: "Precision laser for pigmentation, resurfacing, and glow." },
  { id: '4', name: "Body Contouring", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", desc: "Non-invasive shaping and wellness therapies." },
  { id: '5', name: "Hair Removal", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", desc: "Long-lasting smoothness with medical-grade lasers." },
  { id: '6', name: "Premium Salon", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", desc: "Luxury hair care, styling, and scalp treatments." }
];

const DEFAULT_DOCTORS = [
  { id: "1", name: "Dr. Elisabeth Zora", title: "AESTHETIC PHYSICIAN", desc: "Enhancing Natural Beauty with Personalized Care", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" },
  { id: "2", name: "Dr. Vrety Widyari", title: "DERMATOLOGY SPECIALIST", desc: "Evidence-Based Approaches for Healthier Skin", img: "https://images.unsplash.com/photo-1594824436998-d50d6ff71f92?q=80&w=800&auto=format&fit=crop" },
  { id: "3", name: "Dr. Diah Nareswari", title: "AESTHETIC PHYSICIAN", desc: "Dedicated Solutions for Radiant Confidence", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" },
  { id: "4", name: "Dr. Ananda Aprilia", title: "AESTHETIC PHYSICIAN", desc: "Refining Beauty with Modern Aesthetic Treatments", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" }
];

const DEFAULT_REASONS = [
  { id: "1", icon: "Stethoscope", title: "Medical Expertise", desc: "Professional medical team and an expert, evidence-based treatment approach." },
  { id: "2", icon: "Sparkles", title: "Premium Equipment", desc: "Advanced technology and professional-grade FDA-cleared equipment." },
  { id: "3", icon: "HeartPulse", title: "Personalized Treatment", desc: "Bespoke treatments meticulously designed around your individual skin needs." },
  { id: "4", icon: "Coffee", title: "Luxury Experience", desc: "A sophisticated, comfortable, and serene clinic environment for ultimate relaxation." }
];

const DEFAULT_TRANSFORMATIONS = [
  { id: "1", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop" },
  { id: "2", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop" },
  { id: "3", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" }
];

const DEFAULT_REVIEWS = [
  { id: "1", name: "Nadya", text: "The facial was incredibly relaxing, and the doctor was very attentive, gentle, and detail oriented throughout the whole session. She made sure I was comfortable and took great care of every detail. Overall, it was a wonderful experience, and I would definitely recommend this clinic.", rating: 5 },
  { id: "2", name: "M", text: "Overall, a great experience with lovely service — I'd definitely come back. Update from the next day: My face is looking even more beautiful than yesterday and it looks like most of acne is gone in one day basically. Amazing results!", rating: 5 },
  { id: "3", name: "Edo", text: "Today, I came back for another facial and a DNA Salmon treatment. I absolutely love my treatments here. This is my second time having a facial, and the team is always so professional and attentive. Definitely recommend visiting if you're looking to get your glow on.", rating: 5 }
];

const DEFAULT_CLINICS = [
  { id: "1", name: "Seminyak Flagship", address: "Jl. Sunset Road No. 88, Seminyak, Bali", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop", link: "https://maps.google.com" },
  { id: "2", name: "Canggu Sanctuary", address: "Jl. Pantai Batu Bolong, Canggu, Bali", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop", link: "https://maps.google.com" }
];

export default function BackOffice() {
  const [content, setContent] = useState({
    hero_image: '',
    hero_title: '',
    hero_subtitle: '',
    hero_button1_text: '',
    hero_button1_link: '',
    hero_button2_text: '',
    hero_button2_link: '',
    about_title: '',
    about_description: '',
    experience_kicker: '',
    experience_title: '',
    experience_description: '',
    experience_button_text: '',
    experience_button_link: '',
    experience_image1: '',
    experience_image2: '',
    experience_image3: '',
    experience_image4: '',
    treatments_button_text: '',
    treatments_button_link: '',
    packages_subtitle: '',
    packages_title: '',
    doctors_subtitle: '',
    doctors_title: '',
    doctors_button_text: '',
    doctors_button_link: '',
    reasons_title: '',
    transformations_subtitle: '',
    transformations_title: '',
    reviews_subtitle: '',
    reviews_title: '',
    reviews_overall_rating: '',
    reviews_link: '',
    reviews_google_place_id: '',
    reviews_google_api_key: '',
    promo_image: '',
    promo_kicker: '',
    promo_title: '',
    promo_description: '',
    promo_validity: '',
    promo_button_text: '',
    promo_button_link: '',
    clinics_subtitle: '',
    clinics_title: ''
  });
  
  const [treatments, setTreatments] = useState<any[]>(DEFAULT_TREATMENTS);
  const [packages, setPackages] = useState<any[]>(DEFAULT_PACKAGES);
  const [doctors, setDoctors] = useState<any[]>(DEFAULT_DOCTORS);
  const [reasons, setReasons] = useState<any[]>(DEFAULT_REASONS);
  const [transformations, setTransformations] = useState<any[]>(DEFAULT_TRANSFORMATIONS);
  const [reviews, setReviews] = useState<any[]>(DEFAULT_REVIEWS);
  const [clinics, setClinics] = useState<any[]>(DEFAULT_CLINICS);
  const [isFetchingGoogle, setIsFetchingGoogle] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch data saat halaman dimuat
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          setContent((prev) => ({ ...prev, ...json.data }));
          if (json.data.treatments_list) {
            try {
              setTreatments(JSON.parse(json.data.treatments_list));
            } catch (e) {
              console.error("Failed to parse treatments", e);
            }
          }
          if (json.data.packages_list) {
            try {
              setPackages(JSON.parse(json.data.packages_list));
            } catch (e) {
              console.error("Failed to parse packages", e);
            }
          }
          if (json.data.doctors_list) {
            try {
              setDoctors(JSON.parse(json.data.doctors_list));
            } catch (e) {
              console.error("Failed to parse doctors", e);
            }
          }
          if (json.data.reasons_list) {
            try {
              setReasons(JSON.parse(json.data.reasons_list));
            } catch (e) {
              console.error("Failed to parse reasons", e);
            }
          }
          if (json.data.transformations_list) {
            try {
              setTransformations(JSON.parse(json.data.transformations_list));
            } catch (e) {
              console.error("Failed to parse transformations", e);
            }
          }
          if (json.data.reviews_list) {
            try {
              setReviews(JSON.parse(json.data.reviews_list));
            } catch (e) {
              console.error("Failed to parse reviews", e);
            }
          }
          if (json.data.clinics_list) {
            try {
              setClinics(JSON.parse(json.data.clinics_list));
            } catch (e) {
              console.error("Failed to parse clinics", e);
            }
          }
        }
      } catch (err) {
        console.log('Using default content (fetch failed or server restarting)');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setContent(prev => ({ ...prev, [key]: data.url }));
        setMessage({ type: 'success', text: 'Gambar berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const addTreatment = () => {
    setTreatments([...treatments, { id: Date.now().toString(), name: '', desc: '', img: '' }]);
  };

  const removeTreatment = (index: number) => {
    const newTreatments = [...treatments];
    newTreatments.splice(index, 1);
    setTreatments(newTreatments);
  };

  const moveTreatment = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === treatments.length - 1) return;
    const newTreatments = [...treatments];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newTreatments[index], newTreatments[swapIndex]] = [newTreatments[swapIndex], newTreatments[index]];
    setTreatments(newTreatments);
  };

  const updateTreatment = (index: number, field: string, value: string) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = value;
    setTreatments(newTreatments);
  };

  const handleTreatmentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const newTreatments = [...treatments];
        newTreatments[index].img = data.url;
        setTreatments(newTreatments);
        setMessage({ type: 'success', text: 'Gambar treatment berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const addPackage = () => {
    setPackages([...packages, { id: Date.now().toString(), name: '', desc: '', features: ['', ''], priceLabel: '', price: '', img: '', ctaText: 'Book Now', ctaLink: '' }]);
  };

  const removePackage = (index: number) => {
    const newPackages = [...packages];
    newPackages.splice(index, 1);
    setPackages(newPackages);
  };

  const movePackage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === packages.length - 1) return;
    const newPackages = [...packages];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newPackages[index], newPackages[swapIndex]] = [newPackages[swapIndex], newPackages[index]];
    setPackages(newPackages);
  };

  const updatePackage = (index: number, field: string, value: string) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const updatePackageFeature = (pkgIndex: number, featureIndex: number, value: string) => {
    const newPackages = [...packages];
    if (!newPackages[pkgIndex].features) {
      newPackages[pkgIndex].features = ['', ''];
    }
    newPackages[pkgIndex].features[featureIndex] = value;
    setPackages(newPackages);
  };

  // Doctors
  const addDoctor = () => {
    setDoctors([...doctors, { id: Date.now().toString(), name: '', title: '', desc: '', img: '' }]);
  };

  const removeDoctor = (index: number) => {
    const newDoctors = [...doctors];
    newDoctors.splice(index, 1);
    setDoctors(newDoctors);
  };

  const moveDoctor = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === doctors.length - 1) return;
    const newDoctors = [...doctors];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newDoctors[index], newDoctors[swapIndex]] = [newDoctors[swapIndex], newDoctors[index]];
    setDoctors(newDoctors);
  };

  const updateDoctor = (index: number, field: string, value: string) => {
    const newDoctors = [...doctors];
    newDoctors[index][field] = value;
    setDoctors(newDoctors);
  };

  const handleDoctorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const newDoctors = [...doctors];
        newDoctors[index].img = data.url;
        setDoctors(newDoctors);
        setMessage({ type: 'success', text: 'Gambar dokter berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePackageImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const newPackages = [...packages];
        newPackages[index].img = data.url;
        setPackages(newPackages);
        setMessage({ type: 'success', text: 'Gambar package berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const updateReason = (index: number, field: string, value: string) => {
    const newReasons = [...reasons];
    newReasons[index][field] = value;
    setReasons(newReasons);
  };

  const addTransformation = () => {
    setTransformations([...transformations, { id: Date.now().toString(), img: '' }]);
  };

  const removeTransformation = (index: number) => {
    const newT = [...transformations];
    newT.splice(index, 1);
    setTransformations(newT);
  };

  const moveTransformation = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === transformations.length - 1) return;
    const newT = [...transformations];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newT[index], newT[swapIndex]] = [newT[swapIndex], newT[index]];
    setTransformations(newT);
  };

  const handleTransformationImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const newT = [...transformations];
        newT[index].img = data.url;
        setTransformations(newT);
        setMessage({ type: 'success', text: 'Gambar transformation berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const updateReview = (index: number, field: string, value: string) => {
    const newR = [...reviews];
    newR[index][field] = value;
    setReviews(newR);
  };

  const updateReviewRating = (index: number, value: number) => {
    const newR = [...reviews];
    newR[index].rating = value;
    setReviews(newR);
  };

  const addReview = () => {
    setReviews([...reviews, { id: Date.now().toString(), name: '', text: '', rating: 5 }]);
  };

  const removeReview = (index: number) => {
    const newR = [...reviews];
    newR.splice(index, 1);
    setReviews(newR);
  };

  const handleClinicImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const newC = [...clinics];
        newC[index].img = data.url;
        setClinics(newC);
        setMessage({ type: 'success', text: 'Gambar klinik berhasil diunggah!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal mengunggah gambar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah' });
    } finally {
      setIsUploading(false);
    }
  };

  const updateClinic = (index: number, field: string, value: string) => {
    const newC = [...clinics];
    newC[index][field] = value;
    setClinics(newC);
  };

  const addClinic = () => {
    setClinics([...clinics, { id: Date.now().toString(), name: '', address: '', img: '', link: '' }]);
  };

  const removeClinic = (index: number) => {
    const newC = [...clinics];
    newC.splice(index, 1);
    setClinics(newC);
  };

  const fetchGoogleReviews = async () => {
    if (!content.reviews_google_place_id || !content.reviews_google_api_key) {
      setMessage({ type: 'error', text: 'Silakan masukkan Place ID dan API Key Google Maps.' });
      return;
    }
    setIsFetchingGoogle(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch('/api/google-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: content.reviews_google_place_id,
          apiKey: content.reviews_google_api_key
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const result = data.data;
        setContent(prev => ({ ...prev, reviews_overall_rating: result.rating?.toString() || '5.0' }));
        if (result.reviews && result.reviews.length > 0) {
          const fetchedReviews = result.reviews.map((r: any) => ({
            id: r.time?.toString() || Date.now().toString(),
            name: r.author_name || 'Anonymous',
            text: r.text || '',
            rating: r.rating || 5
          }));
          setReviews(fetchedReviews);
        }
        setMessage({ type: 'success', text: 'Data ulasan Google Maps berhasil ditarik. Jangan lupa klik Simpan.' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal menarik ulasan dari Google Maps' });
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Terjadi kesalahan jaringan saat menarik ulasan' });
    } finally {
      setIsFetchingGoogle(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const payload = {
      ...content,
      treatments_list: JSON.stringify(treatments),
      packages_list: JSON.stringify(packages),
      doctors_list: JSON.stringify(doctors),
      reasons_list: JSON.stringify(reasons),
      transformations_list: JSON.stringify(transformations),
      reviews_list: JSON.stringify(reviews),
      clinics_list: JSON.stringify(clinics)
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (json.status === 'success') {
        setMessage({ type: 'success', text: 'Perubahan berhasil disimpan!' });
      } else {
        setMessage({ type: 'error', text: json.message || 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-brand-sage/10 text-brand-forest' : 'bg-red-100 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section: Hero Banner */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <h2 className="text-xl font-serif font-bold text-brand-charcoal mb-6 pb-2 border-b border-brand-beige">1. Hero Banner Utama</h2>
            
            <div className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Foto Banner Utama</label>
                <div className="flex items-center gap-6">
                  {content.hero_image && (
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-brand-beige shrink-0">
                      <img src={content.hero_image} alt="Hero Banner Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer bg-brand-white/50 border border-brand-beige rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-brand-sage/10 transition-colors text-brand-charcoal">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span className="font-medium">{isUploading ? 'Mengunggah...' : 'Pilih File Gambar'}</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'hero_image')}
                        className="hidden" 
                        disabled={isUploading}
                      />
                    </label>
                    <p className="text-xs text-brand-charcoal/50 mt-2">Format disarankan: JPG/PNG, ukuran horizontal (Landscape).</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Headline Utama (Hero Title)</label>
                <input 
                  type="text" 
                  name="hero_title"
                  value={content.hero_title}
                  onChange={handleChange}
                  placeholder="Contoh: Timeless Beauty, Elevated by Science."
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
                <p className="text-xs text-brand-charcoal/50 mt-2">Gunakan tag &lt;br/&gt; jika ingin membuat baris baru paksa.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Sub-headline (Hero Subtitle)</label>
                <textarea 
                  name="hero_subtitle"
                  value={content.hero_subtitle}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Contoh: Experience the pinnacle of non-invasive aesthetic treatments in Bali..."
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>

              {/* Action Buttons Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-brand-beige/50">
                {/* Button 1 */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-brand-charcoal">Tombol 1 (Utama)</h3>
                  <div>
                    <label className="block text-xs text-brand-charcoal/80 mb-1">Teks Tombol</label>
                    <input 
                      type="text" 
                      name="hero_button1_text"
                      value={content.hero_button1_text || ''}
                      onChange={handleChange}
                      placeholder="Contoh: Book a Consultation"
                      className="w-full px-4 py-2 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-sm text-brand-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-charcoal/80 mb-1">Tautan (Link)</label>
                    <input 
                      type="text" 
                      name="hero_button1_link"
                      value={content.hero_button1_link || ''}
                      onChange={handleChange}
                      placeholder="Contoh: https://wa.me/..."
                      className="w-full px-4 py-2 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-sm text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Button 2 */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-brand-charcoal">Tombol 2 (Sekunder)</h3>
                  <div>
                    <label className="block text-xs text-brand-charcoal/80 mb-1">Teks Tombol</label>
                    <input 
                      type="text" 
                      name="hero_button2_text"
                      value={content.hero_button2_text || ''}
                      onChange={handleChange}
                      placeholder="Contoh: View Treatments"
                      className="w-full px-4 py-2 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-sm text-brand-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-charcoal/80 mb-1">Tautan (Link)</label>
                    <input 
                      type="text" 
                      name="hero_button2_link"
                      value={content.hero_button2_link || ''}
                      onChange={handleChange}
                      placeholder="Contoh: #treatments"
                      className="w-full px-4 py-2 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-sm text-brand-charcoal"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section: Tentang Kami */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <h2 className="text-xl font-serif font-bold text-brand-charcoal mb-6 pb-2 border-b border-brand-beige">2. Tentang Kami (Philosophy)</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Judul Bagian</label>
                <input 
                  type="text" 
                  name="about_title"
                  value={content.about_title}
                  onChange={handleChange}
                  placeholder="Contoh: The SHAZ Philosophy"
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Deskripsi</label>
                <textarea 
                  name="about_description"
                  value={content.about_description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tulis deskripsi filosofi klinik..."
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>
            </div>
          </div>

          {/* Section: The Experience */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <h2 className="text-xl font-serif font-bold text-brand-charcoal mb-6 pb-2 border-b border-brand-beige">3. The Experience (A Sanctuary)</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Kicker (Sub Judul Kecil)</label>
                <input 
                  type="text" 
                  name="experience_kicker"
                  value={content.experience_kicker}
                  onChange={handleChange}
                  placeholder="Contoh: The Experience"
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Judul Utama</label>
                <input 
                  type="text" 
                  name="experience_title"
                  value={content.experience_title}
                  onChange={handleChange}
                  placeholder="Contoh: A Sanctuary for Your Transformation."
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Deskripsi</label>
                <textarea 
                  name="experience_description"
                  value={content.experience_description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Deskripsi..."
                  className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Teks Tombol</label>
                  <input 
                    type="text" 
                    name="experience_button_text"
                    value={content.experience_button_text}
                    onChange={handleChange}
                    placeholder="Explore Our Clinics"
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Tautan Tombol (Link)</label>
                  <input 
                    type="text" 
                    name="experience_button_link"
                    value={content.experience_button_link}
                    onChange={handleChange}
                    placeholder="#locations"
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
              </div>

              {/* Image Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="border border-brand-beige p-4 rounded-xl">
                    <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Foto Kolase {num}</label>
                    <div className="flex flex-col gap-4">
                      {content[`experience_image${num}` as keyof typeof content] && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-brand-beige">
                          <img src={content[`experience_image${num}` as keyof typeof content] as string} alt={`Preview ${num}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <label className="cursor-pointer bg-brand-white/50 border border-brand-beige rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-brand-sage/10 transition-colors text-brand-charcoal text-sm">
                        <Upload className="w-4 h-4" />
                        <span className="font-medium">Ganti Foto {num}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, `experience_image${num}`)}
                          className="hidden" 
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Section: Our Treatments */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-brand-beige">
              <h2 className="text-xl font-serif font-bold text-brand-charcoal">4. Our Treatments</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Teks Tombol CTA</label>
                  <input 
                    type="text" 
                    name="treatments_button_text"
                    value={content.treatments_button_text || ''}
                    onChange={handleChange}
                    placeholder="Contoh: Explore Full Menu"
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Tautan Tombol (Link)</label>
                  <input 
                    type="text" 
                    name="treatments_button_link"
                    value={content.treatments_button_link || ''}
                    onChange={handleChange}
                    placeholder="Contoh: https://wa.link/..."
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <h3 className="font-bold text-brand-charcoal">Daftar Treatment</h3>
                <button 
                  type="button"
                  onClick={addTreatment}
                  className="flex items-center gap-2 text-sm bg-brand-beige/50 hover:bg-brand-beige px-4 py-2 rounded-lg font-medium transition-colors text-brand-charcoal"
                >
                  <Plus className="w-4 h-4" /> Tambah Treatment
                </button>
              </div>

              <div className="space-y-4">
                {treatments.length === 0 && (
                  <p className="text-center py-8 text-gray-400 text-sm">Belum ada treatment. Klik tambah untuk memulai.</p>
                )}
                {treatments.map((treatment, index) => (
                  <div key={treatment.id || index} className="flex flex-col md:flex-row gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex md:flex-col gap-2 text-gray-400">
                      <button type="button" onClick={() => moveTreatment(index, 'up')} disabled={index === 0} className="hover:text-brand-charcoal disabled:opacity-30">
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <button type="button" onClick={() => moveTreatment(index, 'down')} disabled={index === treatments.length - 1} className="hover:text-brand-charcoal disabled:opacity-30">
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="w-full md:w-32 h-32 bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                      {treatment.img ? (
                        <>
                          <img src={treatment.img} alt="Preview" className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-medium">
                            Ubah Foto
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleTreatmentImageUpload(e, index)}
                              className="hidden" 
                              disabled={isUploading}
                            />
                          </label>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-brand-charcoal/50 hover:text-brand-charcoal transition-colors text-xs p-2 text-center">
                          <Upload className="w-5 h-5 mb-1" />
                          Upload Foto
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleTreatmentImageUpload(e, index)}
                            className="hidden" 
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <input
                          type="text"
                          value={treatment.name}
                          onChange={(e) => updateTreatment(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Nama Treatment (Contoh: Skin Perfection)"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={treatment.desc}
                          onChange={(e) => updateTreatment(index, 'desc', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Deskripsi Singkat (1 baris)"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => removeTreatment(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      title="Hapus Treatment"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Featured Packages */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-beige">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-brand-beige">
              <h2 className="text-xl font-serif font-bold text-brand-charcoal">5. Featured Packages</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Sub Judul</label>
                  <input 
                    type="text" 
                    name="packages_subtitle"
                    value={content.packages_subtitle || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Curated Experiences"
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal/80 mb-2">Judul Utama</label>
                  <input 
                    type="text" 
                    name="packages_title"
                    value={content.packages_title || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Featured Packages"
                    className="w-full px-4 py-3 bg-brand-white/50 border border-brand-beige rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none transition-all text-brand-charcoal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <h3 className="font-bold text-brand-charcoal">Daftar Package</h3>
                <button 
                  type="button"
                  onClick={addPackage}
                  className="flex items-center gap-2 text-sm bg-brand-beige/50 hover:bg-brand-beige px-4 py-2 rounded-lg font-medium transition-colors text-brand-charcoal"
                >
                  <Plus className="w-4 h-4" /> Tambah Package
                </button>
              </div>

              <div className="space-y-4">
                {packages.length === 0 && (
                  <p className="text-center py-8 text-gray-400 text-sm">Belum ada package. Klik tambah untuk memulai.</p>
                )}
                {packages.map((pkg, index) => (
                  <div key={pkg.id || index} className="flex flex-col gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex w-full gap-4">
                      <div className="flex flex-col gap-2 text-gray-400">
                        <button type="button" onClick={() => movePackage(index, "up")} disabled={index === 0} className="hover:text-brand-charcoal disabled:opacity-30">
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button type="button" onClick={() => movePackage(index, "down")} disabled={index === packages.length - 1} className="hover:text-brand-charcoal disabled:opacity-30">
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                        {pkg.img ? (
                          <>
                            <img src={pkg.img} alt="Preview" className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-medium">
                              Ubah Foto
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handlePackageImageUpload(e, index)}
                                className="hidden" 
                                disabled={isUploading}
                              />
                            </label>
                          </>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-brand-charcoal/50 hover:text-brand-charcoal transition-colors text-xs p-2 text-center">
                            <Upload className="w-5 h-5 mb-1" />
                            Upload Foto
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handlePackageImageUpload(e, index)}
                              className="hidden" 
                              disabled={isUploading}
                            />
                          </label>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updatePackage(index, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Nama Package (Contoh: ExoMind)"
                        />
                        <input
                          type="text"
                          value={pkg.desc}
                          onChange={(e) => updatePackage(index, "desc", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Deskripsi Singkat"
                        />
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={pkg.priceLabel}
                            onChange={(e) => updatePackage(index, "priceLabel", e.target.value)}
                            className="w-1/3 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                            placeholder="Label Harga (Contoh: STARTING FROM)"
                          />
                          <input
                            type="text"
                            value={pkg.price}
                            onChange={(e) => updatePackage(index, "price", e.target.value)}
                            className="w-2/3 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                            placeholder="Harga (Contoh: IDR 4,000,000)"
                          />
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => removePackage(index)}
                        className="p-2 h-fit text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Hapus Package"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="w-full pl-10 pr-10">
                      <div className="text-sm font-bold text-brand-charcoal/80 mb-2 mt-2">Features / Bullet Points</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={pkg.features?.[0] || ""}
                          onChange={(e) => updatePackageFeature(index, 0, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Feature 1"
                        />
                        <input
                          type="text"
                          value={pkg.features?.[1] || ""}
                          onChange={(e) => updatePackageFeature(index, 1, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Feature 2"
                        />
                      </div>
                      <div className="text-sm font-bold text-brand-charcoal/80 mb-2 mt-4">Call To Action (CTA)</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={pkg.ctaText || ""}
                          onChange={(e) => updatePackage(index, "ctaText", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Teks Tombol (Contoh: Book Now)"
                        />
                        <input
                          type="text"
                          value={pkg.ctaLink || ""}
                          onChange={(e) => updatePackage(index, "ctaLink", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                          placeholder="Link Tombol (Kosong = Default WA)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 05. MEET OUR DOCTORS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">05. Meet Our Doctors</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kicker / Subtitle (contoh: Medical Expertise)</label>
                  <input
                    type="text"
                    name="doctors_subtitle"
                    value={content.doctors_subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Utama (contoh: Meet Our Doctors)</label>
                  <input
                    type="text"
                    name="doctors_title"
                    value={content.doctors_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Daftar Dokter</label>
                  <button 
                    type="button" 
                    onClick={addDoctor}
                    className="flex items-center gap-2 bg-brand-forest/10 text-brand-forest px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-forest/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah
                  </button>
                </div>
                
                <div className="space-y-4">
                  {doctors.length === 0 && (
                    <p className="text-center py-8 text-gray-400 text-sm">Belum ada dokter. Klik tambah untuk memulai.</p>
                  )}
                  {doctors.map((doc, index) => (
                    <div key={doc.id || index} className="flex flex-col gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex w-full gap-4">
                        <div className="flex flex-col gap-2 text-gray-400">
                          <button type="button" onClick={() => moveDoctor(index, "up")} disabled={index === 0} className="hover:text-brand-charcoal disabled:opacity-30">
                            <ChevronUp className="w-5 h-5" />
                          </button>
                          <button type="button" onClick={() => moveDoctor(index, "down")} disabled={index === doctors.length - 1} className="hover:text-brand-charcoal disabled:opacity-30">
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                          {doc.img ? (
                            <>
                              <img src={doc.img} alt="Preview" className="w-full h-full object-cover" />
                              <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-medium">
                                Ubah Foto
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => handleDoctorImageUpload(e, index)}
                                  className="hidden" 
                                  disabled={isUploading}
                                />
                              </label>
                            </>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-brand-charcoal/50 hover:text-brand-charcoal transition-colors text-xs p-2 text-center">
                              <Upload className="w-5 h-5 mb-1" />
                              Upload Foto
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleDoctorImageUpload(e, index)}
                                className="hidden" 
                                disabled={isUploading}
                              />
                            </label>
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={doc.name}
                            onChange={(e) => updateDoctor(index, "name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                            placeholder="Nama Dokter (Contoh: Dr. Elisabeth Zora)"
                          />
                          <input
                            type="text"
                            value={doc.title}
                            onChange={(e) => updateDoctor(index, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                            placeholder="Spesialisasi (Contoh: AESTHETIC PHYSICIAN)"
                          />
                          <input
                            type="text"
                            value={doc.desc}
                            onChange={(e) => updateDoctor(index, "desc", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                            placeholder="Deskripsi Singkat (Contoh: Enhancing Natural Beauty...)"
                          />
                        </div>

                        <button 
                          type="button"
                          onClick={() => removeDoctor(index)}
                          className="p-2 h-fit text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          title="Hapus Dokter"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teks Tombol CTA</label>
                    <input
                      type="text"
                      name="doctors_button_text"
                      value={content.doctors_button_text}
                      onChange={handleChange}
                      placeholder="contoh: View All Doctors"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link Tombol CTA (opsional)</label>
                    <input
                      type="text"
                      name="doctors_button_link"
                      value={content.doctors_button_link}
                      onChange={handleChange}
                      placeholder="/doctors"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 06. WHY CHOOSE SHAZ */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">06. Why Choose SHAZ</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Utama</label>
                  <input
                    type="text"
                    name="reasons_title"
                    value={content.reasons_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Daftar Keunggulan</label>
                
                <div className="grid grid-cols-1 gap-4">
                  {reasons.map((reason, index) => (
                    <div key={reason.id || index} className="flex flex-col gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400 font-medium w-6 text-center">{index + 1}.</div>
                        <select
                          value={reason.icon}
                          onChange={(e) => updateReason(index, "icon", e.target.value)}
                          className="w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                        >
                          <option value="Stethoscope">Stethoscope</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="HeartPulse">Heart</option>
                          <option value="Coffee">Coffee</option>
                        </select>
                        <input
                          type="text"
                          value={reason.title}
                          onChange={(e) => updateReason(index, "title", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="Judul Keunggulan"
                        />
                      </div>
                      <input
                        type="text"
                        value={reason.desc}
                        onChange={(e) => updateReason(index, "desc", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm ml-10"
                        placeholder="Deskripsi..."
                        style={{ width: 'calc(100% - 2.5rem)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 07. TRANSFORMATIONS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">07. Transformations</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kicker / Subtitle (contoh: BEFORE & AFTER)</label>
                  <input
                    type="text"
                    name="transformations_subtitle"
                    value={content.transformations_subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Utama (contoh: Transformations)</label>
                  <input
                    type="text"
                    name="transformations_title"
                    value={content.transformations_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Daftar Foto Before & After</label>
                  <button 
                    type="button" 
                    onClick={addTransformation}
                    className="flex items-center gap-2 bg-brand-forest/10 text-brand-forest px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-forest/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah
                  </button>
                </div>
                
                <div className="space-y-4">
                  {transformations.length === 0 && (
                    <p className="text-center py-8 text-gray-400 text-sm">Belum ada foto. Klik tambah untuk memulai.</p>
                  )}
                  {transformations.map((trans, index) => (
                    <div key={trans.id || index} className="flex flex-col gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex w-full gap-4 items-center">
                        <div className="flex flex-col gap-2 text-gray-400 shrink-0">
                          <button type="button" onClick={() => moveTransformation(index, "up")} disabled={index === 0} className="hover:text-brand-charcoal disabled:opacity-30">
                            <ChevronUp className="w-5 h-5" />
                          </button>
                          <button type="button" onClick={() => moveTransformation(index, "down")} disabled={index === transformations.length - 1} className="hover:text-brand-charcoal disabled:opacity-30">
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="w-48 h-64 bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                          {trans.img ? (
                            <>
                              <img src={trans.img} alt="Preview" className="w-full h-full object-cover" />
                              <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-medium">
                                Ubah Foto
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => handleTransformationImageUpload(e, index)}
                                  className="hidden" 
                                  disabled={isUploading}
                                />
                              </label>
                            </>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-brand-charcoal/50 hover:text-brand-charcoal transition-colors text-xs p-2 text-center">
                              <Upload className="w-5 h-5 mb-1" />
                              Upload Foto
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleTransformationImageUpload(e, index)}
                                className="hidden" 
                                disabled={isUploading}
                              />
                            </label>
                          )}
                        </div>

                        <div className="flex-1 flex justify-end self-start">
                          <button 
                            type="button"
                            onClick={() => removeTransformation(index)}
                            className="p-2 h-fit text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 08. CLIENT REVIEWS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">08. Client Reviews</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjudul (contoh: CLIENT STORIES)</label>
                  <input
                    type="text"
                    name="reviews_subtitle"
                    value={content.reviews_subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul (contoh: Real Experiences)</label>
                  <input
                    type="text"
                    name="reviews_title"
                    value={content.reviews_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating (contoh: 4.9)</label>
                  <input
                    type="text"
                    name="reviews_overall_rating"
                    value={content.reviews_overall_rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Link Google Maps ("See More Reviews")</label>
                  <input
                    type="text"
                    name="reviews_link"
                    value={content.reviews_link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
              </div>

              <div className="bg-brand-sage/10 p-4 rounded-xl border border-brand-sage/30 mt-6">
                <h4 className="font-semibold text-brand-forest mb-2">Tarik Otomatis dari Google Maps (Opsional)</h4>
                <p className="text-sm text-gray-600 mb-4">Anda dapat memasukkan Place ID dan API Key untuk menarik ulasan secara otomatis.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="reviews_google_place_id"
                    value={content.reviews_google_place_id}
                    onChange={handleChange}
                    placeholder="Masukkan Google Place ID"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                  <input
                    type="text"
                    name="reviews_google_api_key"
                    value={content.reviews_google_api_key}
                    onChange={handleChange}
                    placeholder="Masukkan Google API Key"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={fetchGoogleReviews}
                  disabled={isFetchingGoogle}
                  className="bg-brand-forest text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-brand-sage transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isFetchingGoogle ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {isFetchingGoogle ? 'Menarik data...' : 'Tarik Data'}
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Daftar Ulasan</label>
                  <button 
                    type="button" 
                    onClick={addReview}
                    className="flex items-center gap-2 bg-brand-forest/10 text-brand-forest px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-forest/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah Ulasan
                  </button>
                </div>
                
                <div className="space-y-4">
                  {reviews.length === 0 && (
                    <p className="text-center py-8 text-gray-400 text-sm">Belum ada ulasan. Klik tambah untuk memulai.</p>
                  )}
                  {reviews.map((rev, index) => (
                    <div key={rev.id || index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Pasien</label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => updateReview(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                        
                        <label className="block text-xs font-semibold text-gray-500 mt-3 mb-1">Bintang (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={rev.rating || 5}
                          onChange={(e) => updateReviewRating(index, parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-8">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Teks Ulasan</label>
                        <textarea
                          rows={4}
                          value={rev.text}
                          onChange={(e) => updateReview(index, 'text', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button 
                          type="button"
                          onClick={() => removeReview(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 09. PROMO / LIMITED TIME OFFER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">09. Promo / Offer</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kicker (contoh: LIMITED TIME OFFER)</label>
                  <input
                    type="text"
                    name="promo_kicker"
                    value={content.promo_kicker}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul (contoh: Botox – 10% OFF)</label>
                  <input
                    type="text"
                    name="promo_title"
                    value={content.promo_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Promosi</label>
                  <textarea
                    name="promo_description"
                    value={content.promo_description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teks Masa Berlaku (contoh: VALID UNTIL 31 AUGUST 2026)</label>
                  <input
                    type="text"
                    name="promo_validity"
                    value={content.promo_validity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teks Tombol (contoh: Claim Offer)</label>
                    <input
                      type="text"
                      name="promo_button_text"
                      value={content.promo_button_text}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link Tombol Promosi</label>
                    <input
                      type="text"
                      name="promo_button_link"
                      value={content.promo_button_link}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Promo</label>
                <div className="flex items-start gap-6">
                  <div className="w-48 h-48 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                    {content.promo_image ? (
                      <>
                        <img src={content.promo_image} alt="Promo" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer text-white flex flex-col items-center">
                            <Upload className="w-6 h-6 mb-1" />
                            <span className="text-xs font-semibold">Ubah Foto</span>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'promo_image')} className="hidden" disabled={isUploading} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer text-gray-400 hover:text-brand-forest transition-colors flex flex-col items-center">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium text-center">Upload Foto</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'promo_image')} className="hidden" disabled={isUploading} />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 text-sm text-gray-500">
                    <p className="mb-2"><strong>Rekomendasi ukuran:</strong> 800 x 800 pixel (Rasio persegi atau potrait).</p>
                    <p>Format yang didukung: JPG, PNG, WEBP.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10. CLINICS / LOCATION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b pb-4">10. Our Clinics (Location)</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjudul (contoh: OUR CLINICS)</label>
                  <input
                    type="text"
                    name="clinics_subtitle"
                    value={content.clinics_subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul (contoh: Experience SHAZ.)</label>
                  <input
                    type="text"
                    name="clinics_title"
                    value={content.clinics_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Daftar Klinik</label>
                  <button 
                    type="button" 
                    onClick={addClinic}
                    className="flex items-center gap-2 bg-brand-forest/10 text-brand-forest px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-forest/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah Klinik
                  </button>
                </div>
                
                <div className="space-y-4">
                  {clinics.map((clinic, index) => (
                    <div key={clinic.id || index} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <div className="md:col-span-3">
                        <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative mb-2 border border-gray-200">
                          {clinic.img ? (
                            <>
                              <img src={clinic.img} alt={clinic.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <label className="cursor-pointer text-white flex flex-col items-center">
                                  <Upload className="w-6 h-6 mb-1" />
                                  <span className="text-xs font-semibold">Ubah Foto</span>
                                  <input type="file" accept="image/*" onChange={(e) => handleClinicImageUpload(e, index)} className="hidden" disabled={isUploading} />
                                </label>
                              </div>
                            </>
                          ) : (
                            <label className="cursor-pointer text-gray-400 hover:text-brand-forest transition-colors flex flex-col items-center p-4">
                              <Upload className="w-6 h-6 mb-2" />
                              <span className="text-xs font-medium text-center">Upload Foto</span>
                              <input type="file" accept="image/*" onChange={(e) => handleClinicImageUpload(e, index)} className="hidden" disabled={isUploading} />
                            </label>
                          )}
                        </div>
                      </div>
                      
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Klinik</label>
                          <input
                            type="text"
                            value={clinic.name}
                            onChange={(e) => updateClinic(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Alamat (beserta peta)</label>
                          <input
                            type="text"
                            value={clinic.address}
                            onChange={(e) => updateClinic(index, 'address', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Link Google Maps (GET DIRECTIONS)</label>
                          <input
                            type="text"
                            value={clinic.link}
                            onChange={(e) => updateClinic(index, 'link', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-1 flex justify-end h-full">
                        <button 
                          type="button"
                          onClick={() => removeClinic(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-brand-forest text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-sage transition-colors flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>

        </form>
    </div>
  );
}
