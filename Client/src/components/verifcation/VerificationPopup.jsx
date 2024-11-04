// VerificationPopup.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VerificationPopup = ({setSuccess, email, handleSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 md:w-[400px] w-[90%]">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6 text-center">
          A verification link has been sent to <span className='font-semibold'>{email}</span>. Please check your inbox and follow the link to verify your account.
        </p>
        <div className="flex justify-center">
          <Link
          to="/"
          onClick={ () => setSuccess(false)}
        
            className="bg-customColor hover:bg-lighterCustomColor text-white py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Got It
          </Link>
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Didn’t receive an email? Check your spam folder or <button onClick={handleSubmit} className="text-blue-500 cursor-pointer">resend verification</button>.
        </p>
      </div>
    </div>
  );
};

export default VerificationPopup;
