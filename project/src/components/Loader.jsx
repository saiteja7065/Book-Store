import React from 'react';

export default function Loader({ size = 24 }) {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-gray-300 border-t-blue-400 rounded-full animate-spin`}
      style={{ width: size, height: size }}
    ></div>
  );
}
