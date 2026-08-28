import React from 'react';

interface CyberLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CyberLogo: React.FC<CyberLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const svgSizeMap = {
    sm: 22,
    md: 26,
    lg: 52,
  };

  const currentSvgSize = svgSizeMap[size];

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer Hexagonal Glow */}
      <div className="absolute inset-0 bg-[#a3ff00]/20 rounded-xl blur-md animate-pulse"></div>

      {/* Hexagon Container */}
      <div className="relative w-full h-full bg-[#081008] border border-[#a3ff00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,255,0,0.3)] group-hover:border-[#b8ff33] transition-colors">
        {/* Geometric Hexagon / Circuit Vector */}
        <svg
          width={currentSvgSize}
          height={currentSvgSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#a3ff00]"
        >
          {/* Outer Hexagon outline */}
          <polygon
            points="24,3 43,14 43,34 24,45 5,34 5,14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />

          {/* Inner Shield / Core Matrix */}
          <polygon
            points="24,10 37,18 37,30 24,38 11,30 11,18"
            stroke="#a3ff00"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="rgba(163,255,0,0.08)"
          />

          {/* Pulsing Core Diamond */}
          <circle cx="24" cy="24" r="4.5" fill="#a3ff00" className="animate-ping origin-center" opacity="0.6" />
          <circle cx="24" cy="24" r="3.5" fill="#a3ff00" />

          {/* Crosshair Sentinel Axis */}
          <line x1="24" y1="5" x2="24" y2="12" stroke="#a3ff00" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="43" stroke="#a3ff00" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="24" x2="13" y2="24" stroke="#a3ff00" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="24" x2="42" y2="24" stroke="#a3ff00" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Small AI badge for large size */}
        {size === 'lg' && (
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-[#102010] border border-[#a3ff00] text-[10px] text-[#a3ff00] font-mono font-bold shadow-[0_0_10px_rgba(163,255,0,0.3)]">
            SENTINEL
          </span>
        )}
      </div>
    </div>
  );
};
