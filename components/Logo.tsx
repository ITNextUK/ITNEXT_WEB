
import React from 'react';
import logoImage from '../assets/ITNEXT.png';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  light?: boolean;
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", hideText = false }) => {
  // If hideText is true, we return nothing because the "logo" (icon) is removed
  if (hideText) return null;

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="ITNEXT Logo" 
        className="h-10 w-auto"
      />
    </div>
  );
};
