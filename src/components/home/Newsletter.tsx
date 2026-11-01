import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState<'both' | 'women' | 'men'>('both');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubscribed(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0E0E10] border-b border-[#1E1E24]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 border border-[#C5A880]/30 mx-auto flex items-center justify-center text-[#C5A880] mb-6 font-serif">
          MN
        </div>

        <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-sans block mb-3">
          Private Client Salon
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] mb-4 font-light">
          Join Le Salon Privé
        </h2>

        <p className="text-xs sm:text-sm text-[#A0A0A8] max-w-lg mx-auto font-sans leading-relaxed mb-8 font-light">
          Subscribers receive confidential previews of forthcoming haute couture capsules, invitations to private salon appointments, and complimentary alteration consultations.
        </p>

        {subscribed ? (
          <div className="bg-[#141418] border border-[#C5A880]/40 p-6 max-w-md mx-auto text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#C5A880]">
              <Check className="w-5 h-5" />
              <span className="font-serif text-lg text-white">Privilege Invitation Registered</span>
            </div>
            <p className="text-xs text-[#A0A0A8] leading-relaxed">
              Welcome to Le Salon Privé. Please apply privilege code <strong className="text-[#C5A880] font-mono">NOIR10</strong> at checkout for 10% complimentary courtesy on your initial commission.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
            {/* Preferences */}
            <div className="flex justify-center gap-6 text-xs text-[#A0A0A8]">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="radio"
                  name="pref"
                  checked={preference === 'women'}
                  onChange={() => setPreference('women')}
                  className="accent-[#C5A880]"
                />
                <span>Women's</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="radio"
                  name="pref"
                  checked={preference === 'men'}
                  onChange={() => setPreference('men')}
                  className="accent-[#C5A880]"
                />
                <span>Men's</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="radio"
                  name="pref"
                  checked={preference === 'both'}
                  onChange={() => setPreference('both')}
                  className="accent-[#C5A880]"
                />
                <span>Both Lines</span>
              </label>
            </div>

            {/* Input Row */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[#141418] border border-[#27272C] px-4 py-3.5 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#C5A880] font-sans"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#F5F2EB] hover:bg-[#C5A880] text-[#0B0B0C] font-semibold text-xs tracking-widest uppercase transition-colors whitespace-nowrap shadow-md"
              >
                Request Access
              </button>
            </div>

            {error && <p className="text-xs text-rose-400 font-sans">{error}</p>}

            <p className="text-[10px] text-[#71717A] tracking-widest uppercase font-sans">
              Strictly discreet · We honor your privacy · Unsubscribe at any moment
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
