import React from 'react'
import { SearchIcon , NotificationIcon, CalenderIcon } from '../svgs'


 const NavBar = () => {
  return (
  <>
  <div className='w-[100%] shadow-md' style={{
    background: '#FEF6EE'
  }}>
    <nav className='flex justify-between items-center px-16 py-4'>
      <div>{/* name */}
      <p className='text-4xl font-semibold'>
        <span className='text-customColor'>Dash</span>Board
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
     
      <div className='flex justify-between w-[15%]'>{/* side icons */}
      <div className='flex  gap-2'>{/* two icons */}
       <div className='bg-customColor p-3 rounded-lg flex items-center'>
       <NotificationIcon />
       </div>
       <div className='bg-customColor p-3 rounded-lg flex items-center'>
        <CalenderIcon />
       </div>

      </div>

      <div className='text-sm'>{/* date */}
        <p className='font-semibold'>Tuesday</p>
        <p className='text-textColor '>24/24/2044</p>

      </div>
      </div>
    </nav>
  </div>
  
  </>
  )
}
export default NavBar
