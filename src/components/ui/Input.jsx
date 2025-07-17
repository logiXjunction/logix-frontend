import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3e92cc] focus:border-[#3e92cc] ${className}`}
    {...props}
  />
));

Input.displayName = 'Input';
