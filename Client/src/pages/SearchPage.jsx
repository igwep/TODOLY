import React,{useContext, useState} from 'react'
import { LoadingContext} from '../context/LoadingContext'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CircleIcon, NoteIcon, TrashIcon } from '../svgs';
import { notify } from '../utils/Notify';
import { taskDelete } from '../FirebaseFunctions/TaskUpdate';
import { useAuthContext } from '../context/UseAuth';
import { UpdateTaskStatus } from '../FirebaseFunctions/TaskUpdate';
import { FullTaskView } from '../components/FullTaskView';

const SearchPage = () => {
const {query, filteredTasks, setFullTaskViewDelete, FullTaskViewDelete, setIsOpen, setIsEdit} = useContext(LoadingContext);
const [showFullViewIndex, setShowFullViewIndex] = useState(0)
const { user, userData } = useAuthContext();
const [fullView, setFullView] = useState(false);
const [activeDropdown, setActiveDropdown] = useState(null);
const [loader, setLoader] = useState(false)

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const handleDropdown = (index) => {
  setActiveDropdown(activeDropdown === index ? null : index);
};

 const UpdateTaskToInProgress = async (user, categoryName, taskId, newStatus) =>{
      setActiveDropdown(null)
      try {
        
        const taskTitle = await UpdateTaskStatus(user, categoryName, taskId, newStatus);
        notify(`${taskTitle} status updated successfully.`, "success", true);
       
      } catch (error) {
        console.error("Error updating task status:", error.message);
      }
    }

    const handleDelete = async (user, categoryName, taskId) => {
      //put a loading so the show full will render back well 
      setLoader(true)
      try {
        setActiveDropdown(null); // Close dropdown
        setShowFullViewIndex(0);
        setFullView(false)
        await taskDelete(user, categoryName, taskId); // Wait for task deletion
        const updatedTasks = Object.keys(userData.categories)
        .flatMap(key => userData.categories[key].tasks)
        .sort((a, b) => a.id.localeCompare(b.id));
  
      if (updatedTasks.length > 0) {
        // Update `showFullView` to the first task or another valid index
        setShowFullViewIndex(0);
      } else {
        // No tasks left, reset `showFullView`
        setShowFullViewIndex(-1);
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
    fullView ? (
      (<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[95%] md:w-[75%] lg:w-[60%] h-[90%] rounded-lg shadow-lg p-8 relative overflow-y-auto">
          {/* Close Button */}
          <button 
            onClick={() => setFullView(false)} 
            className="absolute top-4 right-4 text-gray-600 hover:text-customColor bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            aria-label="Close"
          >
            ✕
          </button>
  
          {/* Full Task View Content */}
          <FullTaskView 
            Task={filteredTasks} 
            showFullView={showFullViewIndex} 
            setFullTaskViewDelete={setFullTaskViewDelete} 
          />
          <div className=' flex gap-4 justify-end p-4'>
                <div onClick={()=> {setIsOpen(true); setIsEdit(true); setFullView(false); }}  className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <NoteIcon width={20} height={20} fill="white" className="transition-transform duration-200 group-hover:scale-90" /> 
                </div>
                <div onClick={() => handleDelete(user, FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId)} className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <TrashIcon width={20} height={20} fill="white"  className="transition-transform duration-200 group-hover:scale-90" />
                </div>
                </div>
        </div>
      </div>)
    ) : (
      <div className='tablet:pl-[25vw] pt-32 py-8 h-screen bg-gray-100 px-8 w-[100%]'>
      <div className="results-list">
        {query.length === 0 ? (
          // Case: Search field is empty
          ''
        ) : filteredTasks.length > 0 ? (
          // Case: Matches found
          filteredTasks.map((item, index) => (
            <div
            key={index}
            onClick={() => {
              setShowFullViewIndex(index);
              setFullView(true);
              
            }}
            className="border   border-gray-500 relative rounded-xl    p-2 mt-2 h-176 flex cursor-pointer hover:bg-gray-200 gap-4 tablet:w-[33%] w-[100%]"
          >
            <div>
              <CircleIcon item={item} />
            </div>
            <div className="flex flex-col w-full h-full">
              <span className="w-[65%] text-lg font-semibold">
                {truncateText(item.title, 10)}
              </span>
              <div className="flex gap-2 items-center w-full">
                <span className="text-sm text-gray-500 w-[65%]">
                  {truncateText(item.taskDescription, 50)}
                </span>
                <div className="w-[27%] rounded-lg h-20">
                  <img src={item.taskImage} alt="" className="w-full h-full rounded-lg" />
                </div>
              </div>
              <div className="flex gap-2 text-xxs mt-2  w-full absolute bottom-2">
                <div className="flex">
                  <span className="mr-1">Priority:</span>
                  <span
                    style={{
                      color:
                        item.priority === 'Extreme'
                          ? 'red'
                          : item.priority === 'Moderate'
                          ? 'blue'
                          : 'green',
                    }}
                  >
                    {item.priority}
                  </span>
                </div>
                <div className="flex">
                  <span className="mr-1">Status:</span>
                  <span
                     style={{
                      color: item.status === 'not Started' ? 'red' : item.status === 'In Progress' ? 'blue' : item.status === 'Finished' ? 'green' : 'red' ,
                    }}
                    className="whitespace-nowrap"
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex text-gray-400">
                  <span className="mr-1">Created on:</span>
                  <span>{item.createdOn}</span>
                </div>
              </div>
            </div>
            <div onClick={(e) =>{ e.stopPropagation(); handleDropdown(index)}} className="cursor-pointer absolute top-1 right-1">
              <MoreHorizIcon />
            </div>
            {activeDropdown === index && (
              <div  onClick={(e)=> e.stopPropagation()}  className="absolute right-4 top-8 bg-white shadow-md rounded-md z-10">
                {item.status === 'not Started' ? (
                  <button
                     onClick={() => UpdateTaskToInProgress(user, item.priority, item.id, "In Progress")} 
                    className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                  >
                    Start
                  </button>
                ) : item.status === 'In Progress' ? (
                  <button
                     onClick={() => UpdateTaskToInProgress(user, item.priority, item.id, "Finished")} 
                    className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
                  >
                    Finish
                  </button>
                ) : item.status === 'Finished' ? '' : ''}
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
        ) : (
          // Case: No matches found
          <p className='tablet:pl-[25vw] pt-32 py-8 bg-gray-100 px-8 w-[100%]'>
            No results found.
          </p>
        )}
      </div>
    </div>
    )
   }
   </>
  )
}

export default SearchPage