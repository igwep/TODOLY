import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import LoginLottie from '../components/LoginLottie';
import { Password, Username, GoogleIcon, FacebookIcon, TwitterXIcon } from '../svgs';
import Typography from '@mui/material/Typography';

 const LoginPage = () => {
    const [formData, setFormData] = useState({
        userName:'',
        password: ''
    });
    const handleChange = (e) => {
      setFormData({
        ...formData, [e.target.name]: e.target.value
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData)
    }
  return (
    <section className='h-full bg-white w-full rounded-md'>
      <div className='w-full h-full flex justify-between'>
        <div className='md:w-[60%] w-[100%]  flex    items-center justify-start'>{/* form */}
      <form onSubmit={handleSubmit} className='p-8 rounded-md  w-full  max-w-2xl'>
      <div className='w-full flex justify-start'>
                        <h2 className="text-4xl font-bold mb-6 text-center">Sign in</h2>
                        </div>
                        <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Username className="w-6 h-6" /> {/* FirstName icon */}
                        </span>
                        <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full pl-16 py-3  border border-black rounded-md"
                        placeholder="Enter your Username"
                        required
                        />
                        </div>
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
                        <div className="flex mb-4 items-center space-x-2">
    
                          <input type="checkbox" id="terms" className="h-5 w-5 text-blue-600 mr-4 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                          
                        
                          <label htmlFor="terms" className="text-gray-700 text-sm font-semibold  cursor-pointer">
                            Remember Me
                          </label>
                      </div>
                      <button
                        type="submit"
                        className=" bg-customColor text-white py-4 px-8 rounded-md hover:bg-lighterCustomColor transition duration-300"
                        >
                        Login
                        </button>
                        <div className='block mt-8'>
                       <Typography variant="h9">
                          <div className='flex items-center'>
                          <p>Or, Login with </p><FacebookIcon /><GoogleIcon/> <TwitterXIcon />
                          </div>
                          </Typography>
                       </div>
                       <div className='block mt-4'>
                       <Typography variant="h9">
                          Don't have an account? <Link to="/" className='text-blue-500'>Create one</Link>
                          </Typography>
                       </div>



      </form>





        </div>
        <div className='w-[50%] md:flex justify-start hidden'>{/* lottie */}
          <LoginLottie />

        </div>

      </div>


    </section>
  )
}
export default LoginPage