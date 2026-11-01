import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Sparkles,
  Share2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'Private Salon Appointment',
    city: 'Mumbai',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does complimentary alteration work for online purchases?',
      a: 'Every tailored coat, blazer, suit, or gown purchased through Maison Noir includes a voucher for complimentary in-person alterations. You may bring your garment to our Mumbai, New Delhi, or Paris salons, where our master fitter will pin and adjust the sleeve pitch, hem length, or waistline to your exact silhouette.'
    },
    {
      q: 'What are the delivery timelines across India and internationally?',
      a: 'Orders are dispatched via insured white-glove courier from our regional archival hubs. Metro deliveries within India (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai) arrive in 2–3 business days. International express shipments arrive within 4–6 business days.'
    },
    {
      q: 'What is the return and exchange protocol?',
      a: 'We extend a 14-day return privilege on all ready-to-wear pieces in original condition with security tags attached. Our courier will collect the package from your doorstep at zero cost, or you may return it in person to any Maison Noir boutique.'
    },
    {
      q: 'How do I arrange a private bespoke commission?',
      a: 'Bespoke commissions for wedding eveningwear, custom gala tuxedos, or made-to-measure outerwear require 4 to 6 weeks. Please select "Custom Atelier Commission" in our concierge form, and a senior tailoring director will contact you within 24 hours.'
    }
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid phone number is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please share the details of your inquiry or preferred dates';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FAF8F5]">
      {/* Header Banner */}
      <section className="py-24 sm:py-32 border-b border-[#1E1E24] bg-[#0E0E10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-3">
            Client Relations & Private Appointments
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight font-light">
            Concierge Privé
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#A0A0A8] max-w-xl mx-auto font-sans leading-relaxed font-light">
            Our client advisors stand ready to assist you with styling consultations, garment care inquiries, and private salon appointments.
          </p>
        </div>
      </section>

      {/* Main 2-Column: Form & Boutique Information */}
      <section className="py-20 sm:py-28 border-b border-[#1E1E24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Validated Contact Form */}
            <div className="lg:col-span-7 bg-[#0E0E10] border border-[#1E1E24] p-6 sm:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans block mb-2">
                Direct Communication
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-6 font-light">
                Transmit Inquiries to the Atelier
              </h2>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-light">
                    Inquiry Received, {formData.name}
                  </h3>
                  <p className="text-xs text-[#A0A0A8] max-w-md mx-auto leading-relaxed font-light">
                    Our Senior Concierge will review your request regarding <strong className="text-white">"{formData.purpose}"</strong> and reach out to you via <strong className="text-white">{formData.email}</strong> within four business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        purpose: 'Private Salon Appointment',
                        city: 'Mumbai',
                        message: ''
                      });
                    }}
                    className="mt-6 px-6 py-2.5 border border-[#27272C] hover:border-[#C5A880] text-xs uppercase tracking-wider text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maharani Gayatri / Lord Sterling"
                      className={`w-full bg-[#141418] border p-3 text-xs text-white focus:outline-none font-sans ${
                        errors.name ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C5A880]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className={`w-full bg-[#141418] border p-3 text-xs text-white focus:outline-none font-sans ${
                          errors.email ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C5A880]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 00000"
                        className={`w-full bg-[#141418] border p-3 text-xs text-white focus:outline-none font-sans ${
                          errors.phone ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C5A880]'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Purpose & Salon City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full bg-[#141418] border border-[#27272C] p-3 text-xs text-white focus:outline-none focus:border-[#C5A880] font-sans"
                      >
                        <option value="Private Salon Appointment">Private Salon Appointment</option>
                        <option value="Custom Atelier Commission">Custom Atelier Commission</option>
                        <option value="Garment Care & Alterations">Garment Care & Alterations</option>
                        <option value="Press & VIP Dressing">Press & VIP Dressing</option>
                        <option value="General Client Inquiries">General Client Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                        Preferred Salon
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#141418] border border-[#27272C] p-3 text-xs text-white focus:outline-none focus:border-[#C5A880] font-sans"
                      >
                        <option value="Mumbai">Mumbai Salon Privé (Bandra West)</option>
                        <option value="New Delhi">New Delhi Flagship (Chanakyapuri)</option>
                        <option value="Paris">Paris Historic Atelier (Rue Saint-Honoré)</option>
                        <option value="Digital">Digital Consultation (Online)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Message & Preferred Dates *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please indicate piece references, measurement preferences, or requested fitting time windows..."
                      className={`w-full bg-[#141418] border p-3 text-xs text-white focus:outline-none font-sans ${
                        errors.message ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C5A880]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#F5F2EB] hover:bg-[#C5A880] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors shadow-md"
                    >
                      Transmit To Concierge
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Boutiques & Direct Channels */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              {/* Salons list */}
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans block">
                  Boutiques & Private Salons
                </span>

                <div className="p-5 bg-[#0E0E10] border border-[#1E1E24] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-white font-light">New Delhi Flagship</h3>
                    <span className="text-[10px] tracking-widest uppercase text-[#C5A880] font-mono">By Appointment</span>
                  </div>
                  <p className="text-xs text-[#A0A0A8] font-light">
                    Unit 204, The Chanakya, Chanakyapuri, New Delhi 110021
                  </p>
                  <p className="text-xs text-[#71717A] font-mono">
                    Tel: +91 (0) 11 4980 9200 · Daily 11:00 – 20:00
                  </p>
                </div>

                <div className="p-5 bg-[#0E0E10] border border-[#1E1E24] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-white font-light">Mumbai Salon Privé</h3>
                    <span className="text-[10px] tracking-widest uppercase text-[#C5A880] font-mono">Private Access</span>
                  </div>
                  <p className="text-xs text-[#A0A0A8] font-light">
                    Maison Noir, Waterfield Road, Bandra West, Mumbai 400050
                  </p>
                  <p className="text-xs text-[#71717A] font-mono">
                    Tel: +91 (0) 22 6940 8800 · Tuesday – Sunday 11:00 – 19:30
                  </p>
                </div>

                <div className="p-5 bg-[#0E0E10] border border-[#1E1E24] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-white font-light">Paris Historic Atelier</h3>
                    <span className="text-[10px] tracking-widest uppercase text-[#C5A880] font-mono">Bespoke Workshop</span>
                  </div>
                  <p className="text-xs text-[#A0A0A8] font-light">
                    28 Rue du Faubourg Saint-Honoré, 75008 Paris, France
                  </p>
                  <p className="text-xs text-[#71717A] font-mono">
                    Tel: +33 (0) 1 42 68 00 10 · Monday – Friday by appointment
                  </p>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="p-5 bg-[#141418] border border-[#27272C] space-y-3 text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono block">
                  Direct Concierge Line
                </span>
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-mono text-sm">+91 (0) 22 6940 8800</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-4 h-4 text-[#C5A880]" />
                  <span>concierge@maisonnoir.com</span>
                </div>

                <div className="pt-3 border-t border-[#27272C] flex items-center gap-4 text-xs text-[#A0A0A8]">
                  <span>Follow:</span>
                  <a href="#instagram" onClick={(e) => e.preventDefault()} className="text-white hover:text-[#C5A880]">@maisonnoirparis</a>
                  <span>·</span>
                  <a href="#vogue" onClick={(e) => e.preventDefault()} className="text-white hover:text-[#C5A880]">Vogue Runway</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Answered Questions Accordion */}
      <section className="py-24 sm:py-32 bg-[#0E0E10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-sans block mb-2">
              Atelier Policies & Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light">
              Frequently Clarified Inquiries
            </h2>
          </div>

          <div className="divide-y divide-[#1E1E24] border-y border-[#1E1E24]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-serif text-lg text-white hover:text-[#C5A880] transition-colors gap-4"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C5A880] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#71717A] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-xs text-[#A0A0A8] font-sans leading-relaxed pr-8 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
