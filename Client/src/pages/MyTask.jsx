import React,{useState, useContext, useEffect} from 'react'
import { CircleIcon } from '../svgs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuthContext } from '../context/UseAuth';
import Loader from '../components/Loader';
import { FullTaskView } from '../components/FullTaskView';
import { NoteIcon } from '../svgs';
import { TrashIcon } from '../svgs';
import { UpdateTaskStatus } from '../FirebaseFunctions/TaskUpdate';
import { taskDelete } from '../FirebaseFunctions/TaskUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingContext} from '../context/LoadingContext';
export const Mytask = () => {
 
  const { user, userData } = useAuthContext();
  const [showFullView, setShowFullView] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {isOpen, setIsOpen} = useContext(LoadingContext);
  const {FullTaskViewDelete, setFullTaskViewDelete} = useContext(LoadingContext);
  const {isEdit, setIsEdit} = useContext(LoadingContext);
  console.log('is edit:', isEdit);
  
  useEffect(() => {
    console.log("isEdit state changed:", isEdit);
  }, [isEdit]);

  const [loader, setLoader] = useState(false)
  if (!userData) {
    return (
      <Loader />
    ); 
  } 
  const notify = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  const allTask = Object.keys(userData.categories)
  .flatMap(key => userData.categories[key].tasks)
  .sort((a, b) => a.id.localeCompare(b.id));

  console.log('all task', allTask);

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
      notify("Task status updated successfully.");
     
    } catch (error) {
      console.error("Error updating task status:", error.message);
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
    
    notify("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      notify("Error updating task status. Please try again.", "error");
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
    <div className='pl-96 pt-32 py-8 h-screen bg-gray-100 px-8 w-[100%]'>
    <div className='flex  w-full'>
    <div className='border border-gray-500 w-[25%] h-[80vh] rounded-2xl shadow-lg p-4 fixed  overflow-hidden'>
  {/* Title section */}
  <div className='absolute top-0 left-0 w-full bg-gray-100 z-10 p-4'>
    <span className='border-b-2 border-red-600'> My T</span><span>ask</span>
  </div>

  {/* Scrollable cards */}
  <div className='no-scrollbar mt-2  h-full overflow-y-auto pt-6'>
    {allTask.length === 0 ? (
      <h1 className='mt-2'>no tasks found</h1>
    ) : (
      allTask.map((item, index) => (
        <div
          key={item.id}
          onClick={() => setShowFullView(index)}
          className={`${showFullView === index ? 'bg-gray-200' : ''} border cursor-pointer hover:bg-gray-200 border-gray-500 relative rounded-xl p-2 flex gap-4 mt-2 w-full h-166`}
        >
          <div>
            <CircleIcon item={item} />
          </div>
          <div className='flex flex-col w-full h-full'>
            <span className='w-[65%] text-lg font-semibold '>{truncateText(item.title, 10)}</span>
            <div className='flex gap-2 items-center w-full'>
              <span className='text-sm text-gray-500 w-[65%]'>{truncateText(item.taskDescription, 50)}</span>
              <div className='w-[27%] rounded-lg h-20'>
                <img src={item.taskImage} alt="" className='w-full h-full rounded-lg' />
              </div>
            </div>
            <div className='flex gap-2 text-xxs mt-2 w-full pr- absolute bottom-2'>
              <div className='flex'>
                <span className='mr-1'>Priority: </span>
                <span
                  style={{
                    color: item.priority === 'Extreme' ? 'red' : item.priority === 'Moderate' ? 'blue' : 'green',
                  }}
                >
                  {item.priority}
                </span>
              </div>
              <div className='flex'>
                <span className='mr-1'>Status: </span>
                <span
                  style={{
                    color: item.status === 'not Started' ? 'red' : item.status === 'in Progress' ? 'blue' : 'green',
                  }}
                  className='whitespace-nowrap'
                >
                  {item.status}
                </span>
              </div>
              <div className='flex text-gray-400'>
                <span className='mr-1'>Created on: </span>
                <span>{item.createdOn}</span>
              </div>
            </div>
          </div>
          <div onClick={() => handleDropdown(index)} className='cursor-pointer absolute top-1 right-1 '>
            <MoreHorizIcon />
          </div>
          {activeDropdown === index && (
            <div className="absolute right-4 top-8 bg-white shadow-md rounded-md z-10">
              {item.status !== 'In Progress' ? (
                <button
                  onClick={() => UpdateTaskToInProgress(user, item.priority, item.id, "In Progress")}
                  className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => UpdateTaskToInProgress(user, item.priority, item.id, "In Progress")}
                  className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                >
                  Finish
                </button>
              )}
              <button
                onClick={() => handleDelete(user, item.priority, item.id)}
                className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))
    )}
  </div>
</div>

    <div className='border border-gray-500 h-[80vh] w-[46%] xl:w-[48%] rounded-2xl shadow-lg fixed  right-5
    '><FullTaskView Task={allTask} showFullView={showFullView} setFullTaskViewDelete={setFullTaskViewDelete} /> 
   {
   allTask.length > 0 ? (
                <div className=' flex gap-4 justify-end p-4'>
       {/* PASS ID AS PROP!! */}         <div onClick={()=> {setIsOpen(true); setIsEdit(true); console.log("onClick triggered. isEdit:", isEdit);}} className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <NoteIcon  width={20} height={20} fill="white" className="transition-transform duration-200 group-hover:scale-90" /> 
                </div>
                <div onClick={() => handleDelete(user, FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId)} className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <TrashIcon width={20} height={20} fill="white"  className="transition-transform duration-200 group-hover:scale-90" />
                </div>
                </div>
              ) : ''
            } </div>
    </div>
    
  </div>
  </>
  )
}

