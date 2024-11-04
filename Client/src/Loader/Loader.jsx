// Loader.jsx
import React from 'react';

const Loader = ({ color }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50 fixed inset-0 z-50">
      <div
        className={`w-16 h-16 border-4 border-t-transparent border-${color} rounded-full animate-spin`}
        style={{
          borderTopColor: 'transparent', // Ensures the top is transparent for spinning effect
          borderLeftColor: color,
          borderRightColor: color,
          borderBottomColor: color,
        }}
      ></div>
    </div>
  );
};

export default Loader;
