// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

export const Addtask = () => {
  return (
    <div className="bg-customColor text-gray-800 py-16 px-8 md:px-20">
      <div className=" mx-auto flex flex-col-reverse md:flex-row items-center">
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6 md:space-y-9">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Add Tasks with Ease Using TODOLY&apos;s Intuitive Interface
          </h1>
          <p className="text-lg md:text-xl text-white">
            Quickly and Effortlessly Create Tasks to Stay Organized and On Track
            with Your Goals
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup-page">
              <button className="bg-white text-black py-3 px-6 md:px-8 rounded-lg text-sm md:text-lg hover:bg-customColor-dark transition">
                Add New Task
              </button>
            </Link>
            <Link to="/features">
              <button className="bg-gray-800 text-white py-3 px-6 md:px-8 rounded-lg text-sm md:text-lg hover:bg-gray-700 transition">
                Start Collaborator
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end relative">
          <div className="relative w-full  h-[300px] md:h-[400px] flex items-center justify-center md:justify-end px-6 md:px-20">
            <img
              src="/assets/images/card1.svg"
              alt="Card 1"
              className="absolute bg-white rounded-lg transform translate-x-[-20px] translate-y-[-20px] md:translate-x-[-30px] md:translate-y-[-30px] shadow-lg"
            />
            <img
              src="/assets/images/card6.svg"
              alt="Card 2"
              className="absolute bg-white transform translate-x-[0px] translate-y-[0px] shadow-xl z-10"
            />
            <img
              src="/assets/images/card5.svg"
              alt="Card 5"
              className="absolute bg-white transform translate-x-[20px] translate-y-[20px] md:translate-x-[30px] md:translate-y-[30px] shadow-md z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
