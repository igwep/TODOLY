// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-customColor text-gray-800 py-2  flex justify-center items-center px-8 w-full md:px-20  md:h-[80vh] h-auto relative">
      {/* Floating Background Elements (Hidden on Small Screens) */}
      <div className="absolute inset-0 z-0">
  <div className="bg-white bg-opacity-10 w-40 h-40 sm:w-80 sm:h-80 rotate-12 absolute top-20 sm:top-60 left-5 sm:left-20 rounded-sm floating-animation"></div>
  <div className="bg-white bg-opacity-10 w-40 h-40 sm:w-80 sm:h-80 rotate-12 absolute top-20 sm:top-60 right-5 sm:right-20 rounded-sm floating-animation"></div>
  <div className="bg-white bg-opacity-10 w-32 h-32 sm:w-56 sm:h-56 rotate-12 absolute bottom-24 sm:bottom-44 right-5 sm:right-10 rounded-sm floating-animation"></div>
  <div className="bg-white bg-opacity-10 w-40 h-40 sm:w-80 sm:h-80 rotate-12 absolute bottom-10 sm:bottom-16 left-5 sm:left-20 rounded-sm floating-animation"></div>
</div>
      <div className="    w-full flex flex-col-reverse md:flex-row items-center relative z-10">
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2 w-full space-y-6">
          <div className="bg-lighterCustomColor py-3 px-4 rounded-full w-[90%] mt-4 md:mt-0 sm:w-[70%] mx-auto md:mx-0">
            <span className="text-lg sm:text-xl bg-white p-2  rounded-full mr-2">News!</span>
            <span className="text-white text-sm ">Update new features for active users🔥</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Simplify Your Day with <span className="text-customColor-dark">TODOLY</span>
          </h1>
          <p className="text-lg sm:text-xl text-white">
            Stay organized, manage tasks efficiently, and achieve your goals with ease. Start your productivity journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup-page">
              <button className="bg-white text-black py-3 px-6 sm:px-8 rounded-lg text-lg hover:bg-customColor-dark transition">
                Get Started
              </button>
            </Link>
            <Link to="/features">
              <button className="bg-gray-800 text-white py-3 px-6 sm:px-8 rounded-lg text-lg hover:bg-gray-700 transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image with Layering */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end relative mt-10 md:mt-0">
          {/* Background Image (Layer 1) */}
          <img
            src="/assets/images/MyTask.svg"
            alt="Background Illustration"
            className="w-[80%] sm:w-[90%] max-w-md absolute top-4 left-4 sm:top-6 sm:left-6 scale-110 "
          />
          {/* Foreground Image (Layer 2) */}
          <img
            src="/assets/images/screen.svg"
            alt="Productivity Illustration"
            className="w-[90%] sm:w-full max-w-md relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
