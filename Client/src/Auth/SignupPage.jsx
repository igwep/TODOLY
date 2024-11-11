// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect,  useContext} from 'react';
import { LoadingContext } from '../context/LoadingContext';
import LottieAnimation from '../components/LottieAnimation';
import { FirstName, LastName, Username, Email, Password, ConfirmPassword } from '../svgs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import VerificationPopup from '../components/verifcation/VerificationPopup';
import Loader from '../components/Loader';
import { SignupAndSetDefaultData } from '../FirebaseFunctions/SignupAndSetDefault';

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
    
    const [formErrors, setFormErrors] = useState({password:'', confirmPassword:'', terms:''});
    const [errorShake, setErrorShake] = useState(false);
    const {loading, setLoading} = useContext(LoadingContext);
    const {success, setSuccess} = useContext(LoadingContext)
 
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
          
        });
        console.log(formData.terms)
    };

    //real-time validattion with useEffect 
useEffect(()=>{
  if(formData.password.length < 6 && formData.password.length > 0){
    setFormErrors((prevErrors)=>({
      ...prevErrors,
      password:'Passwords must be at leaast 6 characters long'
    }));
  
   
  }
    else{
      setFormErrors((prevErrors) => ({...prevErrors, password:''}))
    }

 if(formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword){
  setFormErrors((prevErrors)=>({
    ...prevErrors,
    confirmPassword:'passwords do not match',
  }))
 }
 else {
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    confirmPassword: '',
  }));

} 

if(formData.terms){
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    terms: '',
  }));
}

/* console.log("Current formErrors:", formErrors); */
/* if(!formData.terms){
  setFormErrors((prevErrors)=>({
    ...prevErrors,
    terms:'You must agree to the terms to proceed.'
  }));

}
else{
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    terms: '',
  }));

} */
},[formData.confirmPassword, formData.password, formData.terms])


const handleSubmit = (e) => {
e.preventDefault();
if(!formData.terms){
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    terms: 'You must agree to the terms to proceed.',
  }));
  return;
}
else{
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    terms: '',
  }));
}
     
if (!formErrors.password && !formErrors.confirmPassword) {
  setLoading(true) 
      // Proceed with form submission logic here
      console.log("Form submitted successfully:", formData);
      SignupAndSetDefaultData(formData.email, formData.password, formData, setLoading, setSuccess, success);
      
      
      console.log(loading);
    console.log("Form data submitted:", formData);
    console.log(formData);
    return;
          }  
    else{
      setErrorShake(true);
    }
          
    };
    useEffect(() => {
      if (success) {
        console.log('The state was successful:', success);
      }
    }, [success]);
    useEffect(() => {
      if (errorShake) {
        const timer = setTimeout(() => setErrorShake(false), 300);
        return () => clearTimeout(timer);
      }
    }, [errorShake]);
    return (
      
  <section className='h-full bg-white w-full rounded-md'>
    {success && (<VerificationPopup setSuccess={setSuccess} email={formData.email} handleSubmit={handleSubmit}/> )}
          <div className='w-full h-full flex justify-between'>
          <div className={`w-[50%]  md:flex ${loading ? 'hidden' : 'flex'} hidden`}>
          <LottieAnimation />
          </div>
                {/* Form */}
                
              {loading ? ( <Loader /> ) :  (<div className="md:w-[60%] w-[100%]  flex items-center justify-center">
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
                        <div className="mb-4 relative flex flex-col">
                        <span className={`absolute left-3 top-1/2 transform  ${formErrors.password ? '-translate-y-6' : '-translate-y-1/2'} `}>
                        <Password className="w-6 h-6 " /> 
                        </span>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-16 py-3 border border-black rounded-md ${errorShake ? 'animate-shake border-red-500' :''}`}
                        placeholder="Enter your password"
                        required
                        />
                        {formErrors.password && <p className='text-red-600'>{formErrors.password}</p>}
                        
                        </div>

                        {/* Confirm Password Input */}
                        <div className='relative '>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <ConfirmPassword className="w-6 h-6" /> 
                        </span>
                        <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-16 py-3 border border-black rounded-md ${errorShake ? 'animate-shake border-red-500' :''}`}
                        placeholder="Confirm your password"
                        required
                        />
                        </div>
                        {/* remember to add a animation shake when user still tries to sign up with error */}
                        {formErrors.confirmPassword && <p className='text-red-600'>{formErrors.confirmPassword}</p>}
                        <div className={`flex ${formErrors.terms ? 'mb-0' : 'mb-6'}  items-center space-x-2 ${formErrors.confirmPassword ? 'mt-3' : 'mt-6'}`}>
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms" // Add this line to set the name
                          checked={formData.terms} // Bind it to formData
                          onChange={handleChange} // Use handleChange to update formData
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        
                        <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                          I agree to all terms
                        </label>
                      </div>

                      {formErrors.terms && <p className='text-red-600 mb-2 text-sm'>{formErrors.terms}</p>}

                        <button
                        type="submit"
                        className=" bg-customColor text-white py-4 px-8 rounded-md hover:bg-lighterCustomColor transition duration-300"
                        >
                        Register
                        </button>
                       <div className='block mt-4'>
                       <Typography variant="h9">
                          Already have an account? <Link to="/" className='text-blue-500'>Sign in</Link>
                          </Typography>
                       </div>
                        </form>
              </div>)}
                
          </div>
  </section>
    );
};
 export default SignupPage