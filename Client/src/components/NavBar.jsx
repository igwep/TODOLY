import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon, NotificationIcon, CalenderIcon } from '../svgs';
import moment from 'moment';

const NavBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dateNumber = moment().format('DD/MM/YYYY');
  const dayOfWeek = moment().format('dddd');
  const location = useLocation();

  const title = () => {
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
    } else if (location.pathname === '/task-category') {
      return (
        <>
          <span className="text-customColor">Task-</span>
          <span>Category</span>
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
  };

  const dashboardTitle = title();

  return (
    <>
      <div
        className="w-[100%] z-20 fixed shadow-md"
        style={{
          background: '#FEF6EE',
        }}
      >
        <nav className="flex justify-between items-center px-16 py-4">
          <div className="min-w-72">
            <p className="text-4xl font-semibold">{dashboardTitle}</p>
          </div>

          <div className="flex shadow-lighter-sm w-[50%]">
            <input
              type="text"
              placeholder="Search your task here.."
              className="focus:outline-none focus:shadow-lighter-sm focus:border-none bg-white w-full rounded-l-lg px-2"
            />
            <div className="bg-customColor rounded-r-lg cursor-pointer p-1">
              <SearchIcon />
            </div>
          </div>

          <div className="flex justify-between w-[13%]">
            <div className="flex gap-2">
              {/* Notification Icon */}
              <div
                className="bg-customColor p-3 rounded-lg flex items-center cursor-pointer group relative"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                <NotificationIcon className="transition-transform duration-200 group-hover:scale-90" />

                {/* Dropdown Notification */}
                {isDropdownVisible && (
                  <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
                    <p className="font-bold text-customColor mb-2">Notifications</p>
                    <ul className="space-y-2">
                      <li className="text-sm">
                        <p>🔔 Task 1 is due tomorrow</p>
                      </li>
                      <li className="text-sm">
                        <p>🔔 Meeting scheduled at 3 PM</p>
                      </li>
                      <li className="text-sm">
                        <p>🔔 New task added to your list</p>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3 text-right cursor-pointer">
                      View All
                    </p>
                  </div>
                )}
              </div>

              {/* Calendar Icon */}
              <div className="bg-customColor p-3 rounded-lg flex items-center cursor-pointer group">
                <CalenderIcon className="transition-transform duration-200 group-hover:scale-90" />
              </div>
            </div>

            <div className="text-sm">
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
