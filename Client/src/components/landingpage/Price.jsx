// eslint-disable-next-line no-unused-vars
import React from "react";

const Price = () => {
  const plans = [
    {
      name: "Hobby",
      price: "$0",
      subtitle: "Perfect for beginners",
      features: [
        "Access to basic features",
        "Up to 5 projects",
        "Community support",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      price: "$30/month",
      subtitle: "For professionals & small teams",
      features: [
        "Access to all features",
        "Unlimited projects",
        "Priority support",
      ],
      buttonText: "Try Pro",
    },
    {
      name: "Premium",
      price: "$50/month",
      subtitle: "Best for enterprises & agencies",
      features: [
        "All Pro features",
        "Advanced analytics",
        "Dedicated account manager",
      ],
      buttonText: "Go Premium",
    },
  ];

  return (
    <div className="bg-customColor md:h-[90vh] text-gray-800 py-8 px-8 md:px-20">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Find A Plan To Power Your Tasks
          </h2>
          <p className="text-lg text-white">
            Select a plan that best suits your needs and budget.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="text-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6 w-full md:w-1/3 border-4 border-white"
            >
              <h3 className="text-2xl text-white font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold text-white ">{plan.price}</p>
              <p className="text-gray-600 italic">{plan.subtitle}</p> {/* Subtitle added */}

              <ul className="space-y-2 w-full flex flex-col items-start">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <img
                      src="/assets/images/check.svg" // Update this path to match your SVG location
                      alt="Check Icon"
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`py-2 px-6 rounded-lg text-lg font-semibold ${
                  index === 1
                    ? "bg-white text-gray-800 hover:bg-gray-100"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
