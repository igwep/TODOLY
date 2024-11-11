// Loader.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 fixed inset-0 z-50">
      <div className="relative">
        <div
          className="w-16 h-16 border-4 border-t-transparent border-[#FF6767] rounded-full animate-spin"
          style={{
            borderTopColor: 'transparent',
          }}
        ></div>
        <div
          className="absolute inset-0 rounded-full border-4 border-[#FF6767] opacity-20 animate-ping"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
