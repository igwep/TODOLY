// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import { CircleIcon } from '../svgs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuthContext } from '../context/UseAuth';
import Loader from '../components/Loader';
import { FullTaskView } from '../components/FullTaskView';
import { NoteIcon } from '../svgs';
import { TrashIcon } from '../svgs';
import { UpdateTaskStatus } from '../FirebaseFunctions/TaskUpdate';


export const VitalTask = () => {
  const { user, userData } = useAuthContext();
  const [showFullView, setShowFullView] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)

  if (!userData) {
    return (
      <Loader />
    ); 
  }
  const extremeCategory = userData.categories.Extreme;
  const vitaTask = extremeCategory.tasks.filter(task => task.priority === 'Extreme').sort((a, b) => a.id.localeCompare(b.id));;
  
  console.log('vital task:', vitaTask)
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const UpdateTaskToInProgress = async (user, categoryName, taskId, newStatus) =>{
    setActiveDropdown(null)
    try {
      await UpdateTaskStatus(user, categoryName, taskId, newStatus);
      console.log("Task status updated successfully.");
     
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  }
  return (
    <div className='pl-96 pt-32 py-8 bg-gray-100 h-screen px-8 w-[100%]'>
      <div className='flex gap-4 w-full'>
      <div className='border border-gray-500 w-[40%] rounded-md p-4'>{/* first border */}
      <div><span className='border-b-2 border-red-600'> Vital </span><span>ask</span></div>
      <div className='flex flex-col gap-2 mt-4'>{/* todos */}
                
                
      {
                  vitaTask.length > 0 ? 
                  vitaTask.map((item, index) =>(
                    <div key={index} onClick={() => setShowFullView(index)} className='border border-gray-500 relative rounded-xl p-2 flex   gap-4 w-402 h-166 '>
                          
                    <div className=''>
                    <CircleIcon item={item} />
                    </div>
                    <div className='flex flex-col  w-full h-full'>
                      <span className='w-[65%] text-lg font-semibold '>{truncateText(item.title, 20)}</span>
                      <div className='flex  gap-2 items-center  w-full'>
                      <span className='text-sm text-gray-500 w-[65%]'>{truncateText(item.taskDescription, 50)}</span>
                      <div className='w-[27%] rounded-lg h-20'>
                      <img src={item.taskImage} alt="" className=' w-full h-full rounded-lg '/>
                      </div>
                      </div>
                      <div className='flex gap-2 text-xxs mt-2 w-full absolute bottom-2 '>
                      <div className='flex'><span className='mr-1'>Prioty: </span> <span style={{
                             color: item.priority === 'Extreme' ? 'red' :  item.priority === 'Moderate' ? 'blue' : 'green' 
                            }}>{item.priority}</span></div>
                      <div className='flex'><span className='mr-1'>Status: </span> <span style={{color: item.status === 'not Started' ? 'red' : item.status === 'in Progress' ? 'Blue' : 'green' }} className='text-red-500 whitespace-nowrap'>{item.status}</span></div>
                      <div className='flex text-gray-400'><span className='mr-1'>Created on: </span> <span>{item.createdOn}</span></div>
                    </div>
                    </div>
                    <div onClick={() => handleDropdown(index)} className='cursor-pointer absolute top-1 right-1 '>
                    <MoreHorizIcon />
                    </div>
                    {/* Dropdown Menu */}
                  {activeDropdown === index && (
                    <div className="absolute right-4 top-8 bg-white shadow-md rounded-md z-10">
                      {
                        item.status !== 'In Progress' ? (
                          <button onClick={()=> UpdateTaskToInProgress(user, item.priority, item.id, "In Progress")}
                       
                        className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                      >
                        Start
                      </button>
                        ) : (
                          <button onClick={()=> UpdateTaskToInProgress(user, item.priority, item.id, "In Progress")}
                       
                        className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                      >
                        Finish
                      </button>
                        )
                      }
                      <button
                        
                        className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                   
    
                  </div>
                  )) :         <p>No vital task.</p>

                }
              </div>
      </div>
      <div className='border border-gray-500 w-[60%] rounded-md relative
      '><FullTaskView Task={vitaTask} showFullView={showFullView} /> 
            {
              vitaTask.length > 0 ? (
                <div className=' flex gap-4 absolute bottom-4 right-4 '>
                <div className='bg-customColor p-2 rounded-md cursor-pointer'>
                <NoteIcon width={25} height={25} fill="white" /> 
                </div>
                <div className='bg-customColor p-2 rounded-md cursor-pointer'>
                <TrashIcon width={25} height={25} fill="white"  />
                </div>
                </div>
              ) : ''
            }
       </div>
      </div>
    </div>
  )
}
