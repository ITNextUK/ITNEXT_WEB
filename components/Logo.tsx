
import React from 'react';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  light?: boolean;
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", hideText = false, light = false }) => {
  if (hideText) return null;

  const iconColor = light ? "#ffffff" : "#FF7B54";
  const textColor = light ? "text-white" : "text-[#FF7B54]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Circle Icon */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke={iconColor} strokeWidth="4"/>
      </svg>
      
      {/* ITNEXT Text */}
      <span className={`text-2xl font-black tracking-tight ${textColor}`}>
        ITNEXT
      </span>
    </div>
  );
};
