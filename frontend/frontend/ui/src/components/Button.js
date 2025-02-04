import React from 'react';

export const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition"
  >
    {children}
  </button>
);

export default Button;