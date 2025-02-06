// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  ArrowForwardIcon,
  PencilIcon,
  LightBulbIcon,
  GitForkIcon,
  ShieldIcon,
  ChatIcon,
} from "../../svgs";

const Benefits = () => {
  const features = [
    {
      id: 1,
      title: "Intuitive Interface",
      description:
        "Our user-friendly interface makes it easy to manage your tasks and stay organized.",
      icon: <ArrowForwardIcon />,
    },
    {
      id: 2,
      title: "Customizable Lists",
      description:
        "Create custom lists to organize your tasks and prioritize what's most important.",
      icon: <PencilIcon />,
    },
    {
      id: 3,
      title: "Smart Reminders",
      description:
        "Set reminders and receive notifications to ensure you never miss a deadline.",
      icon: <LightBulbIcon />,
    },
    {
      id: 4,
      title: "Collaboration Tools",
      description:
        "Share lists with others, assign tasks, and collaborate in real-time to get more done.",
      icon: <GitForkIcon />,
    },
    {
      id: 5,
      title: "Security And Privacy",
      description:
        "Your data is always secure and private with our state-of-the-art security measures.",
      icon: <ShieldIcon />,
    },
    {
      id: 6,
      title: "Customer Support",
      description:
        "Our friendly support team is always here to help you with any questions or issues.",
      icon: <ChatIcon />,
    },
  ];

  return (
    <div className="bg-gray-100 w-full md:h-screen h-auto justify-center  flex flex-col items-center px-4 sm:px-8 md:px-20 space-y-12 py-12">
      {/* Title Section */}
      <div className="w-full flex flex-col space-y-4 text-center md:text-left">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-700 leading-tight max-w-[90%] md:max-w-[70%] mx-auto">
          Experience the Ultimate Task Management Solution with TODOLY&apos;s Robust Features
        </p>
        <p className="text-base sm:text-lg text-gray-500 max-w-[95%] sm:max-w-[90%] md:max-w-[50%] mx-auto">
          Take Control of Your Workload and Boost Your Productivity with Customizable Lists, Smart Reminders, and More
        </p>
      </div>

      {/* Features Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col space-y-4 px-4 sm:px-6">
            <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
              <div className="bg-customColor p-3 flex items-center rounded-full">
                {feature.icon}
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
                {feature.title}
              </span>
            </div>
            <span className="text-sm sm:text-lg text-gray-500">{feature.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
