import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  Truck, 
  Printer, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  Info,
  ChevronDown,
  ChevronUp,
  Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../data/products';
import { OrderCustomerDetails, OrderSummary } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: OrderSummary) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    clearCart,
    giftPackaging,
    giftMessage
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [completedOrder, setCompletedOrder] = useState<OrderSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<OrderCustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    giftPackaging: giftPackaging,
    giftMessage: giftMessage,
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Close on Escape key (unless processing)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen) return null;

  // Convenience helper for test users
  const handleFillSampleClient = () => {
    setFormData({
      fullName: 'Anya Deshmukh',
      email: 'anya.deshmukh@luxurymail.com',
      phone: '+91 98200 84729',
      address: '74 Pali Hill, Nargis Dutt Road',
      apartment: 'Penthouse 12A, The Solitaire',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      giftPackaging: true,
      giftMessage: 'With deepest appreciation. Wear in good health.',
      paymentMethod: 'card'
    });
    setErrors({});
  };

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email required for delivery updates';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required for courier dispatch';
    }
    if (!formData.address.trim()) errs.address = 'Street delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim() || formData.postalCode.length < 6) {
      errs.postalCode = 'Valid 6-digit postal PIN code required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        const orderId = `MN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const trackingNumber = `MN-IND-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const orderDate = new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        const orderResult: OrderSummary = {
          orderId,
          date: orderDate,
          items: [...cart],
          subtotal: cartSubtotal,
          discount: cartDiscount,
          shipping: shippingFee,
          total: cartTotal,
          customer: {
            ...formData,
            paymentMethod
          },
          trackingNumber,
          estimatedDelivery: shippingOption === 'express'
            ? 'Scheduled Atelier Hand-Delivery'
            : '2–4 Business Days via Insured White-Glove Courier'
        };

        setCompletedOrder(orderResult);
        onOrderSuccess(orderResult);
        clearCart();
        setIsProcessing(false);
        setStep(4);
      }, 750);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0E0E10] border border-[#27272C] text-[#F7F5F0] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-5 right-5 p-2 text-[#A0A0A8] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Empty Cart Safeguard */}
        {cart.length === 0 && step !== 4 && (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 border border-[#27272C] mx-auto flex items-center justify-center font-serif text-[#C8A97E] text-lg">
              MN
            </div>
            <h2 className="font-serif text-2xl text-white">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-[#A0A0A8] max-w-sm mx-auto font-sans leading-relaxed">
              Please select your desired garments or accessories from the collection before initiating checkout.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#C8A97E] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Discover Collections
            </button>
          </div>
        )}

        {/* Main Flow (When cart has items or order is complete) */}
        {(cart.length > 0 || step === 4) && (
          <>
            {/* Prominent Demo Notice Banner */}
            <div className="mb-6 bg-[#16161C] border border-[#C8A97E]/30 p-3 sm:p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#C8A97E]">
                <Info className="w-4 h-4 shrink-0" />
                <span className="font-sans font-medium">
                  <strong>DEMO CHECKOUT:</strong> Simulated portfolio mode. No real payment processing or charges occur.
                </span>
              </div>
              {step === 1 && !formData.fullName && (
                <button
                  type="button"
                  onClick={handleFillSampleClient}
                  className="px-2.5 py-1 bg-[#27272C] hover:bg-[#383842] text-[10px] text-white font-mono uppercase tracking-wider whitespace-nowrap"
                >
                  Autofill Sample Client
                </button>
              )}
            </div>

            {/* Step Indicator (when not yet confirmed) */}
            {step < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs tracking-widest uppercase mb-2 font-sans">
                  <span className={step >= 1 ? 'text-[#C8A97E] font-medium' : 'text-[#71717A]'}>
                    1. Delivery Address
                  </span>
                  <span className="text-[#3A3A42]">————</span>
                  <span className={step >= 2 ? 'text-[#C8A97E] font-medium' : 'text-[#71717A]'}>
                    2. Shipping Service
                  </span>
                  <span className="text-[#3A3A42]">————</span>
                  <span className={step >= 3 ? 'text-[#C8A97E] font-medium' : 'text-[#71717A]'}>
                    3. Demo Payment
                  </span>
                </div>

                {/* Collapsible Order Summary Preview */}
                <div className="border border-[#1E1E24] bg-[#121216] p-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowOrderSummary(!showOrderSummary)}
                    className="w-full flex items-center justify-between text-[#A0A0A8] hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C8A97E]" />
                      <span>Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} pieces)</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white font-semibold">{formatINR(cartTotal)}</span>
                      {showOrderSummary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {showOrderSummary && (
                    <div className="mt-3 pt-3 border-t border-[#27272C] space-y-2 max-h-48 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-[#E6E2DB]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-10 bg-[#18181D] overflow-hidden shrink-0">
                              <ImageWithFallback
                                src={item.product.images[0]}
                                alt={item.product.name}
                                aspectRatioClass="aspect-[3/4]"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="line-clamp-1 text-xs">
                              {item.product.name} ({item.size}) × {item.quantity}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-white shrink-0 ml-2">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Address Details */}
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <div className="mb-6">
                  <h2 id="checkout-title" className="font-serif text-2xl tracking-wide">
                    Delivery & Client Details
                  </h2>
                  <p className="text-xs text-[#A0A0A8] mt-1 font-sans">
                    Please provide the primary delivery location for white-glove archival delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Anya Deshmukh"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.fullName ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@maisonnoir.com"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.email ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.phone ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      Street Address & Residence *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Apartment, Bungalow name, Street name"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.address ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-rose-400 mt-1">{errors.address}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Mumbai / New Delhi / Bangalore"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.city ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>}
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A0A0A8] mb-1.5 font-sans">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="400050"
                      className={`w-full bg-[#141418] border p-2.5 text-xs text-white focus:outline-none font-sans ${
                        errors.postalCode ? 'border-rose-500' : 'border-[#27272C] focus:border-[#C8A97E]'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[11px] text-rose-400 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#1E1E24]">
                  <span className="text-xs text-[#A0A0A8] font-mono">
                    Order Total: <strong className="text-white text-sm">{formatINR(cartTotal)}</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping Options */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="font-serif text-2xl tracking-wide">
                    Select Delivery Protocol
                  </h2>
                  <p className="text-xs text-[#A0A0A8] mt-1 font-sans">
                    Each Maison Noir package is protected in atmospheric cedar-lined boxes with tamper-proof wax seal.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <label 
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                      shippingOption === 'standard' ? 'border-[#C8A97E] bg-[#141418]' : 'border-[#27272C] hover:border-white/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                        className="accent-[#C8A97E] mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm text-white">
                          Complimentary White-Glove Courier
                        </div>
                        <p className="text-xs text-[#A0A0A8] mt-0.5">
                          Insured express courier delivery (2–4 business days) with signature confirmation on receipt.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C8A97E] font-semibold">
                      {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                    </span>
                  </label>

                  <label 
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                      shippingOption === 'express' ? 'border-[#C8A97E] bg-[#141418]' : 'border-[#27272C] hover:border-white/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                        className="accent-[#C8A97E] mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm text-white">
                          Salon Atelier Scheduled Fitting Delivery
                        </div>
                        <p className="text-xs text-[#A0A0A8] mt-0.5">
                          Hand-delivered by a Maison Noir styling associate at your appointed time slot with garment steaming.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C8A97E] font-semibold">
                      COMPLIMENTARY PRIVILEGE
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E1E24]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-[#A0A0A8] hover:text-white"
                  >
                    Back to Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Clearly Labelled Demo Payment Step */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#C8A97E]/20 text-[#C8A97E] border border-[#C8A97E]/40 text-[10px] font-mono tracking-widest uppercase">
                      DEMO PAYMENT
                    </span>
                    <span className="text-xs text-[#A0A0A8]">No real financial transactions</span>
                  </div>
                  <h2 className="font-serif text-2xl tracking-wide">
                    Simulated Payment Authorization
                  </h2>
                  <p className="text-xs text-[#A0A0A8] mt-1 font-sans">
                    Select your preferred simulated settlement method to complete this portfolio commission.
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 text-center border text-xs tracking-wider uppercase transition-colors flex flex-col items-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-white font-medium'
                        : 'border-[#27272C] text-[#A0A0A8] hover:border-white/40'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C8A97E]" />
                    <span>Card (Demo)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 text-center border text-xs tracking-wider uppercase transition-colors flex flex-col items-center gap-2 ${
                      paymentMethod === 'upi'
                        ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-white font-medium'
                        : 'border-[#27272C] text-[#A0A0A8] hover:border-white/40'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#C8A97E]" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 text-center border text-xs tracking-wider uppercase transition-colors flex flex-col items-center gap-2 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-white font-medium'
                        : 'border-[#27272C] text-[#A0A0A8] hover:border-white/40'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#C8A97E]" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-center border text-xs tracking-wider uppercase transition-colors flex flex-col items-center gap-2 ${
                      paymentMethod === 'cod'
                        ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-white font-medium'
                        : 'border-[#27272C] text-[#A0A0A8] hover:border-white/40'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#C8A97E]" />
                    <span>Pay on Arrival</span>
                  </button>
                </div>

                {/* Payment Sub-Forms with Interactive Polish */}
                <div className="bg-[#141418] border border-[#27272C] p-5 mb-6">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      {/* Visual Demo Card */}
                      <div className="p-4 bg-gradient-to-tr from-[#16161B] via-[#24242B] to-[#121216] border border-[#C8A97E]/30 rounded-none shadow-lg max-w-sm mx-auto text-left">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-serif tracking-widest text-[#C8A97E] text-sm">MAISON NOIR VIP</span>
                          <span className="text-[10px] font-mono text-[#A0A0A8]">TEST CARD</span>
                        </div>
                        <div className="font-mono tracking-widest text-base sm:text-lg text-white mb-4">
                          4532 •••• •••• 9842
                        </div>
                        <div className="flex justify-between items-end text-[10px] font-mono uppercase text-[#A0A0A8]">
                          <div>
                            <span>Cardholder</span>
                            <div className="text-white font-medium">{formData.fullName || 'ANYA DESHMUKH'}</div>
                          </div>
                          <div>
                            <span>Expires</span>
                            <div className="text-white font-medium">12/28</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[11px] text-[#A0A0A8]">
                        Pre-populated with sandbox demonstration credentials. Click authorize below to complete.
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="text-center py-4 space-y-3">
                      <div className="inline-block p-4 bg-white border border-[#C8A97E]/40">
                        <div className="w-32 h-32 flex flex-col items-center justify-center text-black font-mono text-[10px] p-2 text-center">
                          <QrCode className="w-20 h-20 text-black mb-1" />
                          <span>DEMO QR CODE</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#A0A0A8]">
                        Simulated UPI Handle: <strong className="text-white font-mono">maisonnoir.vip@icici</strong>
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-[#A0A0A8] mb-2">Simulated Premier Banking Institutions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['HDFC Imperia Banking', 'ICICI Wealth Management', 'Axis Burgundy Private', 'Kotak Privy League'].map((b) => (
                          <div key={b} className="p-2.5 border border-[#27272C] bg-[#0E0E10] text-[#E6E2DB] flex items-center justify-between">
                            <span>{b}</span>
                            <Check className="w-3.5 h-3.5 text-[#C8A97E]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-[#A0A0A8] space-y-2 text-center py-2">
                      <p className="text-white font-medium text-sm font-serif">Simulated Pay on Delivery Protocol</p>
                      <p className="max-w-md mx-auto">
                        Our white-glove courier will present a secure encrypted POS terminal for card or UPI payment upon handover and fitting.
                      </p>
                    </div>
                  )}
                </div>

                {/* Total Summary */}
                <div className="border-t border-[#1E1E24] pt-4 mb-6 text-xs text-[#A0A0A8] space-y-1.5">
                  <div className="flex justify-between">
                    <span>Pieces Subtotal</span>
                    <span className="font-mono text-white">{formatINR(cartSubtotal)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#C8A97E]">
                      <span>Privilege Benefit</span>
                      <span className="font-mono">-{formatINR(cartDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured White-Glove Shipping</span>
                    <span className="font-mono text-white">{shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#1E1E24]">
                    <span className="font-serif text-base">Grand Total (Demo)</span>
                    <span className="font-mono text-base text-[#C8A97E]">{formatINR(cartTotal)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isProcessing}
                    className="text-xs uppercase tracking-wider text-[#A0A0A8] hover:text-white"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors shadow-lg flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#0B0B0C] border-t-transparent rounded-full animate-spin" />
                        <span>Securing Commission...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Authorize Commission (Demo)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmation & Receipt */}
            {step === 4 && completedOrder && (
              <div className="text-center py-4">
                <div className="w-16 h-16 border border-[#C8A97E] mx-auto flex items-center justify-center text-[#C8A97E] mb-4">
                  <Check className="w-8 h-8" />
                </div>

                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E] font-sans">
                  ATELIER COMMISSION CONFIRMED
                </span>
                <h2 className="font-serif text-3xl text-white mt-1 mb-2">
                  Thank you, {completedOrder.customer.fullName}
                </h2>
                <p className="text-xs text-[#A0A0A8] max-w-md mx-auto mb-6">
                  Your order <strong className="text-white font-mono">{completedOrder.orderId}</strong> has been registered with our Paris and regional ateliers. An archival dispatch confirmation has been simulated for <strong className="text-white">{completedOrder.customer.email}</strong>.
                </p>

                {/* Receipt Summary Box */}
                <div className="bg-[#141418] border border-[#27272C] text-left p-6 mb-6 text-xs text-[#A0A0A8] space-y-4 font-sans">
                  <div className="flex justify-between pb-3 border-b border-[#27272C]">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#71717A]">Order Reference</span>
                      <span className="font-mono text-sm text-white font-semibold">{completedOrder.orderId}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] uppercase tracking-wider text-[#71717A]">Consignment Courier</span>
                      <span className="font-mono text-xs text-[#C8A97E]">{completedOrder.trackingNumber}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-wider text-[#71717A]">Acquired Pieces</span>
                    {completedOrder.items.map((it) => (
                      <div key={it.id} className="flex justify-between text-white">
                        <span>
                          {it.product.name} (Size: {it.size}, {it.color.name}) × {it.quantity}
                        </span>
                        <span className="font-mono">{formatINR(it.product.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Protocol */}
                  <div className="pt-3 border-t border-[#27272C]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#71717A]">Delivery Protocol</span>
                    <p className="text-white font-medium">{completedOrder.estimatedDelivery}</p>
                  </div>

                  {/* Destination */}
                  <div className="pt-3 border-t border-[#27272C]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#71717A]">Delivery Destination</span>
                    <p className="text-white">
                      {completedOrder.customer.address}, {completedOrder.customer.apartment ? `${completedOrder.customer.apartment}, ` : ''}{completedOrder.customer.city}, {completedOrder.customer.state} – {completedOrder.customer.postalCode}
                    </p>
                    {completedOrder.customer.giftPackaging && (
                      <p className="text-[#C8A97E] text-[11px] mt-1 italic">
                        Gift packaging with handwritten calligraphy note included.
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-3 border-t border-[#27272C] flex justify-between font-semibold text-white">
                    <span>Grand Total Authorized (Demo)</span>
                    <span className="font-mono text-base text-[#C8A97E]">{formatINR(completedOrder.total)}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-6 py-2.5 border border-[#27272C] hover:border-white/50 text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-[#C8A97E]" />
                    <span>Print Archival Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-2.5 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors"
                  >
                    Return to House
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
