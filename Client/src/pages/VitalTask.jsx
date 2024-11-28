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
import { taskDelete } from '../FirebaseFunctions/TaskUpdate';
import { notify } from '../utils/Notify';
import { ToastContainer } from 'react-toastify';

export const VitalTask = () => {
  const { user, userData } = useAuthContext();
  const [showFullView, setShowFullView] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [loader, setLoader] = useState(false);
  const [FullTaskViewDelete, setFullTaskViewDelete] = useState({
    categoryName: '',
    taskId:''
  })

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
     const taskTitle  =  await UpdateTaskStatus(user, categoryName, taskId, newStatus);
     notify(`${taskTitle} status updated successfully.`, "success", true);
     
    } catch (error) {
    notify("Error updating task status:", "error", false);
    }
  }
  const handleDelete = async (user, categoryName, taskId) => {
    //put a loading so the show full will render back well 
        setLoader(true)
    try {
      setActiveDropdown(null); // Close dropdown
      setShowFullView(0);
      await taskDelete(user, categoryName, taskId); // Wait for task deletion
      const updatedTasks = Object.keys(userData.categories)
      .flatMap(key => userData.categories[key].tasks)
      .sort((a, b) => a.id.localeCompare(b.id));

    if (updatedTasks.length > 0) {
      // Update `showFullView` to the first task or another valid index
      setShowFullView(0);
    } else {
      // No tasks left, reset `showFullView`
      setShowFullView(-1);
    }
    
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally{
      setLoader(false)
    }
  };
  return (
   <>
   <ToastContainer />
   
    {
      loader ? (<Loader />) : ('')
    }
    <div className='pl-96 pt-32 py-8 bg-gray-100 h-screen px-8 w-[100%]'>
      <div className='flex gap-4 w-full'>
      <div className='border border-gray-500 w-[25%] h-[80vh] rounded-2xl shadow-lg p-4 fixed  overflow-hidden'>{/* first border */}
      <div><span className='border-b-2 border-red-600'> Vital </span><span>ask</span></div>
      <div className='no-scrollbar   h-full overflow-y-auto pt-2 '>{/* todos */}
                
                
      {
                  vitaTask.length > 0 ? 
                  vitaTask.map((item, index) =>(
                    <div key={index} onClick={() => setShowFullView(index)} className={`${showFullView === index ? 'bg-gray-200' : ''} border border-gray-500 relative cursor-pointer hover:bg-gray-200 rounded-xl p-2 flex mt-2  gap-4 w-full h-166`}>
                          
                    <div className=''>
                    <CircleIcon item={item} />
                    </div>
                    <div className='flex flex-col  w-full h-full'>
                      <span className='w-[65%] text-lg font-semibold '>{truncateText(item.title, 10)}</span>
                      <div className='flex  gap-2 items-center  w-full'>
                      <span className='text-sm text-gray-500 w-[65%]'>{truncateText(item.taskDescription, 50)}</span>
                      <div className='w-[27%] rounded-lg h-20'>
                      <img src={item.taskImage} alt="" className=' w-full h-full rounded-lg '/>
                      </div>
                      </div>
                      <div className='flex gap-2 text-xxs mt-2 w-full absolute bottom-2 '>
                      <div className='flex'><span className='mr-1'>Priority: </span> <span style={{
                             color: item.priority === 'Extreme' ? 'red' :  item.priority === 'Moderate' ? 'blue' : 'green' 
                            }}>{item.priority}</span></div>
                      <div className='flex'><span className='mr-1'>Status: </span> <span  style={{
                    color: item.status === 'not Started' ? 'red' : item.status === 'In Progress' ? 'blue' : item.status === 'Finished' ? 'green' : 'red' ,
                  }} className='text-red-500 whitespace-nowrap'>{item.status}</span></div>
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
                        onClick={() => handleDelete(user, item.priority, item.id)}
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
      <div className='border border-gray-500 h-[80vh] w-[46%] xl:w-[48%] rounded-2xl shadow-lg fixed  right-5
      '><FullTaskView Task={vitaTask} showFullView={showFullView} setFullTaskViewDelete={setFullTaskViewDelete}  /> 
            {
              vitaTask.length > 0 ? (
                <div className=' flex gap-4 justify-end p-4'>
                <div className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <NoteIcon width={20} height={20} fill="white" className="transition-transform duration-200 group-hover:scale-90" /> 
                </div>
                <div onClick={() => handleDelete(user, FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId)} className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <TrashIcon width={20} height={20} fill="white"  className="transition-transform duration-200 group-hover:scale-90" />
                </div>
                </div>
              ) : ''
            }
       </div>
      </div>
    </div>
    </>
  )
}
