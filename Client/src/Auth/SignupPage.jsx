import React, { useState } from 'react';
import LottieAnimation from '../components/LottieAnimation';
import FirstName from '../components/svgs/firstName';
import LastName from '../components/svgs/LastName';
import Username from '../components/svgs/UserName';
import Email from '../components/svgs/Email';
import Password from '../components/svgs/Password';
import ConfirmPassword from '../components/svgs/ConfirmPassword';

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        userName:'',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
  <section className='h-auto bg-white w-full rounded-md'>
          <div className='w-full h-full flex justify-between'>
          <div className='w-[40%] md:flex hidden'>
          <LottieAnimation />
          </div>
                <div className="w-[50%] flex items-center justify-center">
                {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 rounded-md w-full max-w-md">
                        <div className='w-full flex justify-start'>
                        <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
                        </div>

                        {/* First Name Input */}
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FirstName className="w-6 h-6" /> {/* FirstName icon */}
                        </span>
                        <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Enter your First name"
                        required
                        />
                        </div>
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LastName className="w-6 h-6" /> 
                        </span>
                        <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Enter your Last name"
                        required
                        />
                        </div>
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Username className="w-6 h-6" /> 
                        </span>
                        <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Enter your Username"
                        required
                        />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Email className="w-6 h-6" /> 
                        </span>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Enter your email"
                        required
                        />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Password className="w-6 h-6" /> 
                        </span>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Enter your password"
                        required
                        />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-6 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <ConfirmPassword className="w-6 h-6" /> 
                        </span>
                        <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-16 py-3 border border-black rounded-md"
                        placeholder="Confirm your password"
                        required
                        />
                        </div>
                        <div className="flex mb-4 items-center space-x-2">
    
                          <input type="checkbox" id="terms" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                          
                        
                          <label itemID="terms" className="text-gray-700 text-sm cursor-pointer">
                            I agree to the terms and conditions
                          </label>
                      </div>

                        <button
                        type="submit"
                        className=" bg-customColor text-white py-4 px-8 rounded-md hover:bg-lighterCustomColor transition duration-300"
                        >
                        Register
                        </button>
                        </form>
                </div>
          </div>
  </section>
    );
};
