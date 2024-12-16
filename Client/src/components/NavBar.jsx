import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon, NotificationIcon, CalenderIcon } from '../svgs';
import moment from 'moment';
import { getNotificationLog } from '../utils/Notify';
import { clearNotifications } from '../utils/Notify';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { LoadingContext } from '../context/LoadingContext';
import { useAuthContext } from '../context/UseAuth';
import Loader from './Loader';

const NavBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dateNumber = moment().format('DD/MM/YYYY');
  const dayOfWeek = moment().format('dddd');
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const { isSideOpen, setIsSideOpen, query, setQuery, filteredTasks, setFilteredTasks, showSearchResult, setShowSearchResult } = useContext(LoadingContext)
   const { userData } = useAuthContext();
   
  

  const fetchNotifications = () => {
    const savedNotifications = getNotificationLog();
    setNotifications(savedNotifications);
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []); 

  const allTask = userData?.categories
  ? Object.keys(userData.categories)
      .flatMap(key => userData.categories[key].tasks)
      .sort((a, b) => a.id.localeCompare(b.id))
  : [];

if (!userData || !userData.categories) {
  return <Loader />;
}

   const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    // Filter tasks only if there's a search value
    const filtered = value.length > 0 
        ? allTask.filter(task => task.title.toLowerCase().includes(value)) 
        : [];
        
    setFilteredTasks(filtered);
    setShowSearchResult(value.length > 0 );
  }; 
   

  const title = () => {
    //find a better way to do this !!!
    if (location.pathname === '/Dashboard') {
      return (
        <>
          <span className="text-customColor">Dash</span>
          <span>Board</span>
        </>
      );
    } else if (location.pathname === '/vital-task') {
      return (
        <>
          <span className="text-customColor">Vital-</span>
          <span>Task</span>
        </>
      );
    } else if (location.pathname === '/my-task') {
      return (
        <>
          <span className="text-customColor">My-</span>
          <span>Task</span>
        </>
      );
    } else if (location.pathname === '/settings') {
      return (
        <>
          <span className="text-customColor">Settings</span>
        </>
      );
    } else if (location.pathname === '/help') {
      return (
        <>
          <span className="text-customColor">Help</span>
        </>
      );
    }
    else if (location.pathname === '/profile') {
      return (
        <>
          <span className="text-customColor">Profile</span>
        </>
      );
    }
  }
  ;

  const dashboardTitle = title();
  const toggleSidebar = () => {
    setIsSideOpen(!isSideOpen)
    console.log('toggle')
  };

  return (
    <>
      <div
        className="w-[100%] z-20 fixed mx-auto shadow-md"
        style={{
          background: '#FEF6EE',
        }}
      >
        <nav className="flex justify-between items-center  tablet:px-16 px-12 py-4">
          <div className='tablet:hidden'>
          <IconButton onClick={()=> toggleSidebar()}
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ scale: 1.5, mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
          </div>
          <div className="md:min-w-72 min-w-56">
            <p className="text-4xl font-semibold">{dashboardTitle}</p>
          </div>

          <div className="flex justify-end   tablet:shadow-lighter-sm md:w-[50%]">
            <input
              type="text"
              value={query}
              onChange={handleSearch} 
              placeholder="Search tasks by title..."
              className="focus:outline-none hidden tablet:flex focus:shadow-lighter-sm focus:border-none bg-white w-full rounded-l-lg px-2"
            />
            <div className="bg-customColor tablet:rounded-r-lg rounded-lg p-1  cursor-pointer md:mr-0 mr-3 ">
              <SearchIcon />
            </div>
          </div>

          <div className="flex justify-between gap-4  tablet:w-[13%]">
            <div className="flex gap-2">
              {/* Notification Icon */}
              <div
                className="bg-customColor p-3.5 rounded-lg flex items-center cursor-pointer group ml-2 relative"
                onClick={() => {
                  setIsDropdownVisible(!isDropdownVisible);
                  if (!isDropdownVisible) fetchNotifications(); // Refresh notifications when dropdown opens
                }}
              >
                <NotificationIcon className="transition-transform duration-200 group-hover:scale-90 " />

                {/* Dropdown Notification */}
                {isDropdownVisible && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10"
                  >
                    <p className="font-bold text-customColor mb-2">Notifications</p>
                    <ul className="space-y-2">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className={`notification-${notification.type}`}
                          >
                            <p>{notification.message}</p>
                            <small>
                              {new Date(notification.timestamp).toLocaleString()}
                            </small>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No notifications</p>
                      )}
                    </ul>
                    <p
                      onClick={() => {
                        clearNotifications();
                        setIsDropdownVisible(false);
                        setNotifications([]);
                      }}
                      className="text-xs text-gray-500 mt-3 text-right cursor-pointer"
                    >
                      Clear All
                    </p>
                  </div>
                )}
              </div>

              {/* Calendar Icon */}
              <div className="bg-customColor p-3 rounded-lg tablet:flex hidden items-center cursor-pointer group">
                <CalenderIcon className="transition-transform duration-200 group-hover:scale-90" />
              </div>
            </div>

            <div className="text-sm hidden tablet:flex flex-col">
              <p className="font-semibold">{dayOfWeek}</p>
              <p className="text-textColor">{dateNumber}</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
