import React, {useState} from 'react'
import { useAuthContext } from '../context/UseAuth'
import Loader from './Loader';
import { CircleIcon } from '../svgs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { taskDelete } from '../FirebaseFunctions/TaskUpdate';
import { notify } from '../utils/Notify';

export const CompletetedTask = () => {
    const {user, userData } = useAuthContext();
    const [showFullView, setShowFullView] = useState(0)
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [loader, setLoader] = useState(false)
    if (!userData) {
        return (
          <Loader />
        ); 
      }
    
      const categories = userData?.categories; // Safely access categories
      let completedTasks = []
      
      if (categories) {
          const allTasks = Object.values(categories)
              .flatMap(category => category.tasks || []); // Flatten all tasks
           completedTasks = allTasks
              .filter(task => task.status === 'Finished')
              .sort((a, b) => a.id.localeCompare(b.id));
      
          console.log('Completed tasks:', completedTasks);
      } else {
          console.log('No categories found.');
      }
      const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      }
      const handleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
      };
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
{
  completedTasks.length === 0 ? (
    <h1 className='mt-2'>no Completeted Task  found</h1>
  ) : (
    completedTasks.map((item, index) =>(
      <div 
        
          key={item.id}
          onClick={() => setShowFullView(index)}
          className={`${showFullView === index ? 'bg-gray-200' : ''} border cursor-pointer hover:bg-gray-200 border-gray-500 relative rounded-xl p-2 flex gap-4 mt-2 w-[80%] h-166`}
        >
          <div>
            <CircleIcon item={item} />
          </div>
          <div className='flex flex-col  w-full h-full'>
            <span className='w-[65%] text-lg font-semibold '>{truncateText(item.title, 10)}</span>
            <div className='flex gap-2 items-center w-full'>
              <span className='text-sm text-gray-500 w-[65%]'>{truncateText(item.taskDescription, 50)}</span>
              <div className='w-[27%] rounded-lg h-20'>
                <img src={item.taskImage} alt="" className='w-full h-full rounded-lg' />
              </div>
            </div>
            <div className='flex text-xs'>
                <span className='mr-1'>Status: </span>
                <span
                  style={{
                    color: item.status === 'not Started' ? 'red' : item.status === 'In Progress' ? 'blue' : item.status === 'Finished' ? 'green' : 'red' ,
                  }}
                  className='whitespace-nowrap'
                >
                  {item.status}
                </span>
              </div>
              <div className='flex text-xs text-gray-400 mt-2'>
                <span className='mr-1'>Completeted </span>
                <span className='whitespace-nowrap '>
                  {item.dayFinished}
                </span>
              </div>
            
          </div>
          <div  onClick={() => handleDropdown(index)}  className='cursor-pointer absolute top-1 right-1 '>
            <MoreHorizIcon />
          </div>

          {activeDropdown === index && (
             <div   className="absolute right-4 top-8 bg-white shadow-md rounded-md z-10">
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
  )
}

</>
  )
}
