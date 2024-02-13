import React, { ReactNode } from 'react';

interface BlurWrapperProps {
  active: boolean;
  message?: string;
  children: ReactNode;
  className?: string;
}

const BlurWrapper = ({ active, message, children, className = ' ' }: BlurWrapperProps) => {
  return (
    <div
      className={`relative ${active ? 'pointer-events-none backdrop-blur-lg' : ''} ${className}`}
    >
      {active && (
        <div className="absolute z-50 inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-primary">
          {message && <span>{message}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default BlurWrapper;
