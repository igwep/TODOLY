// eslint-disable-next-line no-unused-vars
import React from "react";

const SubscribeSection = () => {
  return (
    <div className="bg-white py-16 px-8 md:px-20 h-[60vh] flex justify-center items-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Title & Subtitle */}
        <h2 className="text-5xl font-bold leading-snug">Subscribe Now! <br /> and Get Discounts Up To 70%</h2>
        <p className="text-lg text-gray-500 leading-relaxed">
          Sign up today and start enjoying amazing benefits, including discounts!
        </p>

        {/* Subscription Form with Button Inside Input */}
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-4 pr-24 rounded-lg bg-customColor placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-white px-6 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
