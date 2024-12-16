// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpIcon from '@mui/icons-material/Help';
import { ExclamationMarkIcon, ClipboardCheckedIcon  } from '../svgs';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutModal from './LogoutModel';
import { useAuthContext } from '../context/UseAuth';
import Loader from './Loader'; 
import { LoadingContext } from '../context/LoadingContext';



const Sidebar = () => {
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { userData } = useAuthContext();
  const { isSideOpen, setIsSideOpen} = useContext(LoadingContext)
 // const [hideSidebar, setHideSidebar] = useState(false)
  const location = useLocation();
  if (!userData) {
    return (
      <Loader />
    ); 
  }


  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSideOpen(!isSideOpen)
    console.log('toggle')
  };
  console.log("profile picture:", userData.userDetails.profilePicture)
  
  return (
    <div className={` ${isSideOpen ? 'z-20 pointer-events-auto' : 'z-10 pointer-events-none'} desktop:pointer-events-auto fixed h-screen   top-32`}>
      {/* Sidebar */}
      <div
        className={`bg-customColor h-screen tablet:left-0 transition-all  ease-in-out  p-8 rounded-r-lg w-80 pt-8 ${
          isSideOpen ? ' left-0 ' : '-left-96'
        } duration-300 relative`}
      >
        <Link to="/profile"  className='absolute -top-10 cursor-pointer left-0 w-full flex flex-col  items-center '>
        <div className='w-20 h-20 rounded-full overflow-hidden'>{/* image */}
  <img src={userData.userDetails?.profilePicture} alt="" className='h-full w-full object-cover' />
          </div>

          <div className='flex flex-col items-center text-white'>{/* profile details */}
           <span className='font-semibold'>
           {userData.userDetails?.lastName || 'Last Name Not Found'}    {userData.userDetails?.firstName || 'First Name Not Found'} 
           </span>
            <span className='text-xs'>
           {userData.userDetails.email || 'Email was not Found'}
            </span>
          </div>

        </Link>
       
        <div className="flex flex-col gap-4 mt-20">
          <Link to="/Dashboard" onClick={()=> toggleSidebar() }  className={`${location.pathname === '/Dashboard' ? 'bg-gray-100 flex items-center gap-4 p-3 rounded-md text-customColor' : 'text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md'}`}>
            <DashboardIcon style={{ fontSize: 32 }} />
             <span className="text-lg">Dashboard</span>
          </Link>
          <Link to="/vital-task" onClick={()=> toggleSidebar() } className={`${location.pathname === '/vital-task' ? 'bg-gray-100 flex items-center gap-4 p-3 rounded-md text-customColor' : 'text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md'}`}>
            <ExclamationMarkIcon style={{ fontSize: 34, colors: '#FF6767' }} />
           <span className="text-lg">Vital Task</span>
          </Link>
          <Link to="/my-task" onClick={()=> toggleSidebar() } className={`${location.pathname === '/my-task' ? 'bg-gray-100 flex items-center gap-4 p-3 rounded-md text-customColor' : 'text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md'}`}>
            <ClipboardCheckedIcon style={{ fontSize: 34 }} />
           <span className="text-lg">My Task</span>
          </Link>
          <Link to="/settings" onClick={()=> toggleSidebar() } className={`${location.pathname === '/settings' ? 'bg-gray-100 flex items-center gap-4 p-3 rounded-md text-customColor' : 'text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md'}`}>
            <SettingsIcon style={{ fontSize: 34 }} />
             <span className="text-lg">Settings</span>
          </Link>
          <Link to="/help" onClick={()=> toggleSidebar() } className={`${location.pathname === '/help' ? 'bg-gray-100 flex items-center gap-4 p-3 rounded-md text-customColor' : 'text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md'}`}>
            <HelpIcon style={{ fontSize: 34 }} />
           <span className="text-lg">Help</span>
          </Link>
          <button onClick={handleOpenLogoutModal} className="text-gray-200 flex  items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <LogoutIcon style={{ fontSize: 34 }}   />
            <span className="text-lg">Logout</span>
          </button>
        </div>
        
      </div>
      <LogoutModal open={isLogoutModalOpen} handleClose={handleCloseLogoutModal}/>
      

     
    </div>
  );
};

export default Sidebar;
