// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import ClipboardWithTimerIcon from '../svgs/ClipboardWithTimerIcon';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { CircleIcon } from '../svgs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddTaskPopup from '../components/AddTaskPopup';

export const Dashboard = () => {
    const formattedDate = moment().format("MMMM Do"); // Output: "June 12th"
      const [hover, setHover] = useState(false);
      const iconStyle = {
        fontSize: 24,
        color: hover ? '#FFFFFF' : '#FF6767', // Changes color on hover
        transition: 'color 0.3s ease', // Smooth transition
        backgroundColor: hover ? '#FF6767' : '',
        borderRadius: '50%'
      };
  
      const [isOpen, setIsOpen] = useState(false);
      

  return (
    <div className='pl-96 py-8 h-screen px-8 w-[100%] '>
        <div>{/* heading */}
        <div>{/* welcome */}
          <p>
            Welcome back, <span>Precious</span>
          </p>
        </div>
        <div>{/* friends */}

        </div>
        </div>
        <div className='h-screen border border-gray-400 p-4 w-full'>{/* main dashboard */}
          <div className='bg-gray-100 rounded-lg shadow-lg w-[40%] p-4'>
            <div className='flex justify-between items-center'>
           <div className='flex items-center'>
           <ClipboardWithTimerIcon />
           <span className='text-sm text-customColor'>TO-DO</span>
           </div>
            <button onClick={()=> setIsOpen(true)} className='flex gap-1 items-center cursor-pointer' onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} >
              <AddIcon style={iconStyle}  />
              <span className={`text-sm  ${hover ? 'text-customColor' : 'text-gray-500'}`}>Add task</span>

            </button>
            </div>
           <div className='mb-2'>
           <span className='text-sm'> <span>{formattedDate}</span> <span></span>. <span className='text-gray-500'>today</span></span>
           </div>
              <div className='flex flex-col gap-2'>{/* todos */}
                <div className='border border-gray-500 relative rounded-xl p-2 flex   gap-4 w-402 h-166 '>
                  
                  <div className=''>
                  <CircleIcon />
                  </div>
                  <div className='flex flex-col w-full h-full'>
                    <span className='w-[65%] text-sm font-semibold '>Attend Nischal&apos;s Birthday party</span>
                    <div className='flex  gap-2 items-center  w-full'>
                    <span className='text-sm text-gray-500 w-[65%]'>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...</span>
                    <div className='w-[27%] rounded-lg h-20'>
                    <img src="/assets/images/Frame14.jpg" alt="" className=' w-full h-full rounded-lg '/>
                    </div>
                    </div>
                    <div className='flex gap-2 text-xxs mt-2 w-full absolute bottom-2 '>
                    <div className='flex'><span className='mr-1'>prioty: </span> <span className='text-blue-400'> Moderate</span></div>
                    <div className='flex'><span className='mr-1'>Status: </span> <span className='text-red-500 whitespace-nowrap'> Not Started</span></div>
                    <div className='flex text-gray-400'><span className='mr-1'>Created on: </span> <span> 20/20/2560</span></div>
                  </div>
                  </div>
                  <div className='cursor-pointer absolute top-1 right-1 '>
                  <MoreHorizIcon />
                  </div>
                 

                </div>
                <div className='border border-gray-500 relative rounded-xl p-2 flex   gap-4 w-402 h-166 '>
                  
                  <div className=''>
                  <CircleIcon />
                  </div>
                  <div className='flex flex-col w-full h-full'>
                    <span className='w-[65%] text-sm font-semibold '>Attend Nischal&apos;s Birthday party</span>
                    <div className='flex  gap-2 items-center  w-full'>
                    <span className='text-sm text-gray-500 w-[65%]'>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...</span>
                    <div className='w-[27%] rounded-lg h-20'>
                    <img src="/assets/images/Frame14.jpg" alt="" className=' w-full h-full rounded-lg '/>
                    </div>
                    </div>
                    <div className='flex gap-2 text-xxs mt-2 w-full absolute bottom-2 '>
                    <div className='flex'><span className='mr-1'>prioty: </span> <span className='text-blue-400'> Moderate</span></div>
                    <div className='flex'><span className='mr-1'>Status: </span> <span className='text-red-500 whitespace-nowrap'> Not Started</span></div>
                    <div className='flex text-gray-400'><span className='mr-1'>Created on: </span> <span> 20/20/2560</span></div>
                  </div>
                  </div>
                  <div className='cursor-pointer absolute top-1 right-1 '>
                  <MoreHorizIcon />
                  </div>
                 

                </div>
                <div className='border'></div>
                <div className='border border-gray-500 relative rounded-xl p-2 flex   gap-4 w-402 h-166 '>
                  
                  <div className=''>
                  <CircleIcon />
                  </div>
                  <div className='flex flex-col w-full h-full'>
                    <span className='w-[65%] text-sm font-semibold '>Attend Nischal&apos;s Birthday party</span>
                    <div className='flex  gap-2 items-center  w-full'>
                    <span className='text-sm text-gray-500 w-[65%]'>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...</span>
                    <div className='w-[27%] rounded-lg h-20'>
                    <img src="/assets/images/Frame14.jpg" alt="" className=' w-full h-full rounded-lg '/>
                    </div>
                    </div>
                    <div className='flex gap-2 text-xxs mt-2 w-full absolute bottom-2 '>
                    <div className='flex'><span className='mr-1'>prioty: </span> <span className='text-blue-400'> Moderate</span></div>
                    <div className='flex'><span className='mr-1'>Status: </span> <span className='text-red-500 whitespace-nowrap'> Not Started</span></div>
                    <div className='flex text-gray-400'><span className='mr-1'>Created on: </span> <span> 20/20/2560</span></div>
                  </div>
                  </div>
                  <div className='cursor-pointer absolute top-1 right-1 '>
                  <MoreHorizIcon />
                  </div>
                 

                </div>
              </div>
          </div>
          <div>{/* two */}

          </div>

        </div>

<AddTaskPopup isOpen={isOpen} setIsOpen={setIsOpen} />

    </div>
  )
}
/* <div>
<div className='border border-gray-500 rounded-xl p-2 flex gap-4 w-402 h-166 '>
<CircleIcon />
<div className='flex flex-col w-full h-full'>
  <span className='w-[65%] text-sm font-semibold '>Attend Nischal&apos;s Birthday party</span>
  <div className='flex  gap-4 items-center  w-full'>
  <span className='text-sm text-gray-500 w-[70%]'>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...</span>
  <div className='w-[27%] rounded-lg h-20'>
  <img src="/assets/images/Frame14.jpg" alt="" className=' w-full h-full rounded-lg '/>
  </div>
  </div>
  <div className='flex gap-4 text-xs mt-2 w-full bg-red-300'>
  <div className='flex'><span>prioty: </span> <span className='text-blue-400'> Moderate</span></div>
  <div className='flex'><span>Status: </span> <span className='text-red-500 text-nowrap'> Not Started</span></div>
  <div className='flex'><span>Created on: </span> <span> 20/20/2560</span></div>
</div>
</div>
<div className='cursor-pointer'>
<MoreHorizIcon />
</div>


</div>

</div> */
