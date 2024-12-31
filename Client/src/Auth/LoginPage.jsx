// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import LoginLottie from '../components/LoginLottie';
import { Password, Username, GoogleIcon, FacebookIcon, TwitterXIcon } from '../svgs';
import Typography from '@mui/material/Typography';
import { LoginUser } from '../FirebaseFunctions/LoginUser';
import {  useNavigate, useLocation } from 'react-router-dom';
import { GoogleSignIn } from '../FirebaseFunctions/LoginUser';
import Loader from '../components/Loader';
import { FacebookSignIn } from '../FirebaseFunctions/LoginUser';
import { auth } from '../firebase';
import { handleRedirectResult } from '../FirebaseFunctions/LoginUser';


 const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [fade, setFade] = useState(false);
 /*  useEffect(() => {
    // Handle the redirect result when the page loads
    const fetchRedirectResult = async () => {
      await handleRedirectResult(navigate, setLoading);
    };
    fetchRedirectResult();
  }, [navigate]); */
  useEffect(() => {
    // Trigger fade-in on route change
    setFade(false);

    // Timeout to trigger fade-out when the component is about to unmount
    const timeout = setTimeout(() => setFade(true), 50); // Duration should match CSS transition

    return () => clearTimeout(timeout); // Clean up timeout on unmount
  }, [location]);

    const [formData, setFormData] = useState({
        email:'',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
      setFormData({
        ...formData, [e.target.name]: e.target.value
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
    
      LoginUser(formData.email, formData.password, navigate, setLoading)


      console.log(formData)
    }
    const handleGoogleSignIn = () => {
      setLoading(true)
      GoogleSignIn(navigate, setLoading)
   

    }
    const handleFacebookSignIn = () => {
      FacebookSignIn()

    }
    
  return (
    <section className={`md:h-full h-[70%] bg-white w-full rounded-md transition-opacity duration-50 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      {
        loading ? (<Loader />) : (<div className='w-full h-full flex justify-between'>
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
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-16 py-3  border border-black rounded-md"
                          placeholder="Enter your Email"
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
                            <span>Or, Login with </span> <span onClick={() =>handleFacebookSignIn()}><FacebookIcon /></span><span className='cursor-pointer' onClick={ ()=> handleGoogleSignIn()}><GoogleIcon/></span> <span><TwitterXIcon /></span>
                            </div>
                            </Typography>
                         </div>
                         <div className='block mt-4'>
                         <Typography variant="h9">
                            Don&apos;t have an account? <Link to="/signup-page" className='text-blue-500'>Create one</Link>
                            </Typography>
                         </div>
        </form>
  
  
  
  
  
          </div>
          <div className='w-[50%] md:flex justify-start hidden'>{/* lottie */}
            <LoginLottie />
  
          </div>
  
        </div>)
      }


    </section>
  )
}
export default LoginPage