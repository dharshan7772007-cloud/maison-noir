import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackCategory,
  aspectRatioClass = 'aspect-[3/4]',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#141417] ${aspectRatioClass} w-full`}>
      {/* Editorial shimmer placeholder while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#121215] via-[#1A1A1E] to-[#121215] animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#18181C] to-[#0E0E10] border border-[#27272C]/40">
          <div className="w-12 h-12 mb-3 border border-[#C8A97E]/30 flex items-center justify-center font-serif text-[#C8A97E] text-lg tracking-widest">
            MN
          </div>
          {fallbackCategory && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A0A0A8] font-sans mb-1">
              {fallbackCategory}
            </span>
          )}
          <span className="text-sm font-serif text-[#F7F5F0] italic max-w-[200px] line-clamp-2">
            {fallbackTitle || alt || 'Maison Noir Atelier'}
          </span>
          <span className="mt-3 text-[10px] tracking-[0.25em] uppercase text-[#C8A97E]/80 border-t border-[#27272C] pt-2">
            HAUTE COUTURE
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || 'Maison Noir Haute Couture'}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
