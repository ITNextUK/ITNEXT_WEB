
import React from 'react';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  light?: boolean;
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", hideText = false, light = false }) => {
  // If hideText is true, we return nothing because the "logo" (icon) is removed
  if (hideText) return null;

  const textColor = light ? "text-white" : "text-brand-dark";

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`text-2xl font-black tracking-tighter uppercase ${textColor}`}>
        ITNEXT
      </span>
    </div>
  );
};
