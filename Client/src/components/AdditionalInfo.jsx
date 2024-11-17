// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

// eslint-disable-next-line react/prop-types
const AdditionalInfo = ({ user }) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save the additional user info in Firestore
      // eslint-disable-next-line react/prop-types
      await setDoc(doc(db, 'users', user.uid), { userDetails: { userName } }, { merge: true });
      console.log('User data saved successfully!');

      navigate('/Dashboard');
    } catch (error) {
      console.error('Error saving additional info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80 md:w-2/5 lg:w-1/3"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Complete Your Profile</h2>
        
        <label className="block text-gray-600 text-lg mb-2" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lighterCustomColor mb-6"
          placeholder="Enter a username"
        />
        
        <button
          type="submit"
          className="w-full bg-customColor text-white py-3 rounded-md hover:bg-lighterCustomColor focus:outline-none "
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save and Continue'}
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
