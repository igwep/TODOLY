// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon , NotificationIcon, CalenderIcon } from '../svgs';
import moment from 'moment';


 const NavBar = () => {

const dateNumber = moment().format('DD/MM/YYYY');
const dayOfWeek = moment().format('dddd');        
const location = useLocation();
const title = () => {
  if(location.pathname === '/Dashboard'){
    return ( 
<>
<span className='text-customColor'>Dash</span><span>Board</span>
</>
    )
  }
  else if(location.pathname === '/vital-task'){
    return ( 
      <>
      <span className='text-customColor'>Vital-</span><span>Task</span>
      </>
          );
  }
  else if(location.pathname === '/my-task'){
    return ( 
      <>
      <span className='text-customColor'>My-</span><span>Task</span>
      </>
          );
  }
  else if(location.pathname === '/task-category'){
    return ( 
      <>
      <span className='text-customColor'>Task-</span><span>Category</span>
      </>
          );
  }
  else if(location.pathname === '/settings'){
    return ( 
      <>
      <span className='text-customColor'>Settings</span>
      </>
          );
  }
  else if(location.pathname === '/help'){
    return ( 
      <>
      <span className='text-customColor'>Help</span>
      </>
          );
  }
  
  
}
const dashboardTitle = title();

  return (
  <>
  <div className='w-[100%] fixed shadow-md' style={{
    background: '#FEF6EE'
  }}>
    <nav className='flex justify-between items-center px-16 py-4'>
      <div className='min-w-72'>{/* name */}
      <p className='text-4xl font-semibold'>
        {dashboardTitle}
      </p>
      </div>
      
      <div className='flex shadow-lighter-sm w-[50%]'>
  {/* search */}
  <input
    type="text"
    placeholder='Search your task here..'
    className='focus:outline-none focus:shadow-lighter-sm focus:border-none bg-white w-full rounded-l-lg px-2'
  />
  <div className='bg-customColor rounded-r-lg cursor-pointer p-1'>
    <SearchIcon />
  </div>
</div>
     
      <div className='flex justify-between w-[13%] '>{/* side icons */}
      <div className='flex  gap-2'>{/* two icons */}
       <div className='bg-customColor p-3 rounded-lg flex items-center cursor-pointer'>
       <NotificationIcon />
       </div>
       <div className='bg-customColor p-3 rounded-lg flex items-center cursor-pointer'>
        <CalenderIcon />
       </div>

      </div>

      <div className='text-sm'>{/* date */}
        <p className='font-semibold'>{dayOfWeek}</p>
        <p className='text-textColor '>{dateNumber}</p>

      </div>
      </div>
    </nav>
  </div>
  
  </>
  )
}
export default NavBar
