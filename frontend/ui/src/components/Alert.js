import React from 'react';

export const Alert = ({ message }) => (
  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl">
    {message}
  </div>
);

export default Alert;