import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGender?: 'women' | 'men';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultGender = 'women'
}) => {
  const [activeGender, setActiveGender] = useState<'women' | 'men'>(defaultGender);
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const womenSizes = [
    { size: 'FR 34 (XS)', bustCm: '80-84', waistCm: '60-64', hipsCm: '86-90', bustIn: '31-33', waistIn: '24-25', hipsIn: '34-35' },
    { size: 'FR 36 (S)', bustCm: '84-88', waistCm: '64-68', hipsCm: '90-94', bustIn: '33-35', waistIn: '25-27', hipsIn: '35-37' },
    { size: 'FR 38 (M)', bustCm: '88-92', waistCm: '68-72', hipsCm: '94-98', bustIn: '35-36', waistIn: '27-28', hipsIn: '37-39' },
    { size: 'FR 40 (L)', bustCm: '92-96', waistCm: '72-76', hipsCm: '98-102', bustIn: '36-38', waistIn: '28-30', hipsIn: '39-40' },
    { size: 'FR 42 (XL)', bustCm: '96-102', waistCm: '76-82', hipsCm: '102-108', bustIn: '38-40', waistIn: '30-32', hipsIn: '40-42' }
  ];

  const menSizes = [
    { size: 'IT 46 (36R)', chestCm: '92-96', waistCm: '78-82', inseamCm: '82', chestIn: '36-38', waistIn: '30-32', inseamIn: '32.5' },
    { size: 'IT 48 (38R)', chestCm: '96-100', waistCm: '82-86', inseamCm: '83', chestIn: '38-40', waistIn: '32-34', inseamIn: '32.8' },
    { size: 'IT 50 (40R)', chestCm: '100-104', waistCm: '86-90', inseamCm: '84', chestIn: '40-41', waistIn: '34-35', inseamIn: '33' },
    { size: 'IT 52 (42R)', chestCm: '104-108', waistCm: '90-95', inseamCm: '85', chestIn: '41-43', waistIn: '35-37', inseamIn: '33.5' },
    { size: 'IT 54 (44R)', chestCm: '108-114', waistCm: '95-102', inseamCm: '86', chestIn: '43-45', waistIn: '37-40', inseamIn: '34' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#111114] border border-[#27272C] p-6 sm:p-8 text-[#F7F5F0] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#A0A0A8] hover:text-white transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Ruler className="w-5 h-5 text-[#C8A97E]" />
          <h2 id="size-guide-title" className="font-serif text-2xl tracking-wide">
            Atelier Size Guide
          </h2>
        </div>
        <p className="text-xs text-[#A0A0A8] tracking-wider mb-6">
          Measurements are based on true anatomical proportions and tailored silhouettes.
        </p>

        {/* Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#27272C] pb-4">
          {/* Gender Selector */}
          <div className="flex gap-2 p-1 bg-[#18181D] border border-[#27272C]">
            <button
              onClick={() => setActiveGender('women')}
              className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                activeGender === 'women'
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              Women's Collection
            </button>
            <button
              onClick={() => setActiveGender('men')}
              className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                activeGender === 'men'
                  ? 'bg-[#C8A97E] text-[#0B0B0C] font-semibold'
                  : 'text-[#A0A0A8] hover:text-white'
              }`}
            >
              Men's Collection
            </button>
          </div>

          {/* Unit Selector */}
          <div className="flex gap-1 bg-[#18181D] border border-[#27272C] p-1">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono transition-colors ${
                unit === 'cm' ? 'bg-[#27272C] text-[#C8A97E]' : 'text-[#A0A0A8]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-mono transition-colors ${
                unit === 'inches' ? 'bg-[#27272C] text-[#C8A97E]' : 'text-[#A0A0A8]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272C] text-[#C8A97E] tracking-wider uppercase">
                <th className="py-2.5 px-3">Size / Scale</th>
                {activeGender === 'women' ? (
                  <>
                    <th className="py-2.5 px-3">Bust ({unit})</th>
                    <th className="py-2.5 px-3">Natural Waist ({unit})</th>
                    <th className="py-2.5 px-3">Full Hips ({unit})</th>
                  </>
                ) : (
                  <>
                    <th className="py-2.5 px-3">Chest ({unit})</th>
                    <th className="py-2.5 px-3">Waist ({unit})</th>
                    <th className="py-2.5 px-3">Inside Leg ({unit})</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272C]/50 text-[#E6E2DB]">
              {activeGender === 'women'
                ? womenSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-[#18181D]/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white">{row.size}</td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.bustCm : row.bustIn}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.waistCm : row.waistIn}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.hipsCm : row.hipsIn}
                      </td>
                    </tr>
                  ))
                : menSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-[#18181D]/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white">{row.size}</td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.chestCm : row.chestIn}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.waistCm : row.waistIn}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-mono">
                        {unit === 'cm' ? row.inseamCm : row.inseamIn}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Tailor Advice */}
        <div className="bg-[#18181D] border border-[#27272C] p-4 text-xs text-[#A0A0A8] space-y-1.5">
          <div className="flex items-center gap-2 text-[#C8A97E] font-medium">
            <Check className="w-3.5 h-3.5" />
            <span>Maison Noir Complimentary Alteration Privilege</span>
          </div>
          <p>
            Every suiting, gown, and tailored outerwear piece qualifies for complimentary in-person alterations at our Paris, New Delhi, or Mumbai salons.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#C8A97E] hover:bg-[#DFC5A2] text-[#0B0B0C] font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
