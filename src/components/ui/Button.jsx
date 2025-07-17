import React from 'react';

export const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-md transition duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
