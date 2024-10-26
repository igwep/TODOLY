import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpIcon from '@mui/icons-material/Help';
import { ExclamationMarkIcon, ClipboardCheckedIcon, BulletPointIcon  } from '../svgs';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute h-screen top-32">
      {/* Sidebar */}
      <div
        className={`bg-customColor h-screen p-8 rounded-r-lg pt-8 ${
          isOpen ? 'w-80' : 'w-20'
        } duration-300 relative`}
      >
        <div className='absolute -top-10 left-0 w-full flex flex-col  items-center '>
        <div className='w-20 h-20 rounded-full overflow-hidden'>{/* image */}
  <img src="/assets/images/Frame14.jpg" alt="" className='h-full w-full object-cover' />
          </div>

          <div className='flex flex-col items-center text-white'>{/* profile details */}
           <span className='font-semibold'>
            Igwe Precous
           </span>
            <span className='text-xs'>
            igwep5537@gmail.com
            </span>
          </div>

        </div>
       
        <div className="flex flex-col gap-4 mt-20">
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <DashboardIcon style={{ fontSize: 32 }} />
            {isOpen && <span className="text-lg">Dashboard</span>}
          </div>
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <ExclamationMarkIcon style={{ fontSize: 34 }} />
            {isOpen && <span className="text-lg">Vital Task</span>}
          </div>
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <ClipboardCheckedIcon style={{ fontSize: 34 }} />
            {isOpen && <span className="text-lg">My Task</span>}
          </div>
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <BulletPointIcon style={{ fontSize: 34 }} />
            {isOpen && <span className="text-lg">Task categories</span>}
          </div>
          
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <SettingsIcon style={{ fontSize: 34 }} />
            {isOpen && <span className="text-lg">Settings</span>}
          </div>
          <div className="text-gray-200 flex items-center gap-4 p-3 hover:scale-105 transition-all hover:bg-lighterCustomColor rounded-md">
            <HelpIcon style={{ fontSize: 34 }} />
            {isOpen && <span className="text-lg">Help</span>}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Sidebar;
