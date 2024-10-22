import React, { useState } from 'react';
import LottieAnimation from '../components/LottieAnimation';
import FirstName from '../components/svgs/firstName';
import LastName from '../components/svgs/LastName';
import Username from '../components/svgs/UserName';
import Email from '../components/svgs/Email';
import Password from '../components/svgs/Password';
import ConfirmPassword from '../components/svgs/ConfirmPassword';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

 const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        userName:'',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.terms){
          alert('you must agree to the terms adn conditions to proceed');
          return;
        }
        console.log(formData);
        
    };

    return (
  <section className='h-full bg-white w-full rounded-md'>
          <div className='w-full h-full flex justify-between'>
          <div className='w-[50%] md:flex hidden'>
          <LottieAnimation />
          </div>
                {/* Form */}
                <div className="md:w-[60%] w-[100%]  flex items-center justify-center">
                        <form onSubmit={handleSubmit} className="p-8   rounded-md w-full  max-w-2xl">
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
                        className="w-full pl-16 py-3  border border-black rounded-md"
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
                          
                        
                          <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                            I agree to all terms
                          </label>
                      </div>

                        <button
                        type="submit"
                        className=" bg-customColor text-white py-4 px-8 rounded-md hover:bg-lighterCustomColor transition duration-300"
                        >
                        Register
                        </button>
                       <div className='block mt-4'>
                       <Typography variant="h9">
                          Already have an account? <Link to="/login-page" className='text-blue-500'>Sign in</Link>
                          </Typography>
                       </div>
                        </form>
                </div>
          </div>
  </section>
    );
};
 export default SignupPage