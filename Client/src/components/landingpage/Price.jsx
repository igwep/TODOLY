import React from "react";

const Price = () => {
  const plans = [
    {
      name: "Basic",
      price: "$10/month",
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
      features: [
        "All Pro features",
        "Advanced analytics",
        "Dedicated account manager",
      ],
      buttonText: "Go Premium",
    },
  ];

  return (
    <div className="bg-customColor text-gray-800 py-8 px-8 md:px-20">
      <div className=" mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
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
              className=' text-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6 w-full md:w-1/3 border-4 border-white '>
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600">
                    {feature}
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
