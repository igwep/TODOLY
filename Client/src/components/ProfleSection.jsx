import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/UseAuth";
import Loader from "./Loader";
import { notify } from "../utils/Notify";
import { updateProfile, handlePasswordResetOrSet } from "../FirebaseFunctions/profileUpdate";
import ResetOrSetPassword from "../utils/ResetPassword";
import { debugEmail } from "../tests/addText";

const ProfleSection = () => {
  const { user, userData } = useAuthContext();
  const [showPasswordUI, setShowPasswordUI] = useState(false);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    firstName: userData?.userDetails?.firstName || "",
    lastName: userData?.userDetails?.lastName || "",
    email: userData?.userDetails?.email || "",
    userName: userData?.userDetails?.userName || "",
  });


  if (!userData || !userData.userDetails) return <Loader />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile({ user, formData });
      notify("Profile updated successfully", "success", true);
    } catch (error) {
      console.error("Error updating profile:", error);
      notify("Error updating profile", "error", true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await handlePasswordResetOrSet(formData.email, setLoading, setShowPasswordUI);
      //setShowPasswordUI(true);
    } catch (error) {
      console.error("Error handling password reset:", error);
      notify("Error resetting password", "error", true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {showPasswordUI ? (
        <ResetOrSetPassword />
      ) : (
        <div className="tablet:pl-[25vw] pt-32 py-8 bg-gray-100 h-screen tablet:px-16 px-4 w-full">
          <div className="flex flex-col gap-16 border border-gray-400 rounded-xl w-full tablet:w-[70%] p-4">
            <div className="flex items-center w-full justify-between">
              <div className="text-2xl font-semibold">
                <span className="border-b-2 border-red-600">Account Inform</span>
                <span>ation</span>
              </div>
              <Link to="/dashboard" className="border-b-gray-600 border-b">
                Go back
              </Link>
            </div>

            {/* Profile Picture and Email */}
            <div className="w-full flex gap-4 items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img
                  src={userData.userDetails.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 items-center text-black">
                <span className="font-semibold text-xl">
                  {userData.userDetails?.lastName || "Last Name Not Found"}{" "}
                  {userData.userDetails?.firstName || "First Name Not Found"}
                </span>
                <span className="text-xs">{userData.userDetails.email || "Email Not Found"}</span>
              </div>
            </div>

            {/* Profile Update Form */}
            <div className="w-full border border-gray-400 mb-12 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                {["firstName", "lastName", "email", "userName"].map((field) => (
                  <div key={field} className="flex flex-col tablet:w-[60%] w-[80%]">
                    <label htmlFor={field} className="font-medium text-sm md:text-base capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      id={field}
                      value={formData[field]}
                      name={field}
                      onChange={handleChange}
                      className="border border-gray-400 rounded bg-transparent p-2 mt-1"
                    />
                  </div>
                ))}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm text-white rounded-lg bg-red-600"
                  >
                    Update Info
                  </button>
                  <button
                    type="button"
                     onClick={handlePasswordReset} 
                    className="px-6 py-2 text-sm text-white rounded-lg bg-red-600"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfleSection;
