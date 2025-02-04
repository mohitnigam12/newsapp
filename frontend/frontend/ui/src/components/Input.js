import React from 'react';

export const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default Input;