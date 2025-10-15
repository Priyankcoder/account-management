
import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({ 
  className = '', 
  size = 24, 
  strokeWidth = 2,
  children 
}) => {
  return (
    <svg 
      className={className}
      width={size}
      height={size}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};
