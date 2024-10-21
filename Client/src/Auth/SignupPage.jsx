import React,{useState} from 'react'
import MySvgComponent from '../components/svgs/sbg'
import LottieAnimation from '../components/LottieAnimation'

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    };
  return (
    <section className='h-[90vh] bg-white w-full rounded-md'>
    <div className='w-full h-full flex justify-between'>
        <div className='w-[40%] md:flex hidden '>
        <LottieAnimation/>

        </div>
        <div className="w-[50%] flex items-center justify-center">
          {/* Form */}
          <form onSubmit={handleSubmit} className=" p-8 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.fastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your First name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
    </div>
    </section>
  )
}
