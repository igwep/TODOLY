// eslint-disable-next-line no-unused-vars
import React, {useState, useContext, useMemo} from 'react';
import ClipboardWithTimerIcon from '../svgs/ClipboardWithTimerIcon';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Loader from '../components/Loader';
import { useAuthContext } from '../context/UseAuth';
import { LoadingContext } from '../context/LoadingContext';
import { FullTaskView } from '../components/FullTaskView';
import { NoteIcon, TrashIcon, ClipBoardClick, CircleIcon, BookIcon  } from '../svgs';
import { notify } from '../utils/Notify';
import { UpdateTaskStatus } from '../FirebaseFunctions/TaskUpdate';
import TaskChart from '../components/Chart';
import { CompletetedTask } from '../components/CompletetedTask';
import { taskDelete } from '../FirebaseFunctions/TaskUpdate';


export const Dashboard = () => {
    const { user } = useAuthContext();
    const formattedDate = moment().format("MMMM Do"); // Output: "June 12th"
    const [fullView, setFullView] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [showFullViewIndex, setShowFullViewIndex] = useState(0)
    const {setFullTaskViewDelete, FullTaskViewDelete, setIsEdit} = useContext(LoadingContext);
    // eslint-disable-next-line no-unused-vars
    const [loader, setLoader] = useState(false);
    const [hover, setHover] = useState(false);

    const iconStyle = {
        fontSize: 24,
        color: hover ? '#FFFFFF' : '#FF6767',// Changes color on hover
        transition: 'color 0.3s ease',//Smooth transition
        backgroundColor: hover ? '#FF6767' : '',
        borderRadius: '50%'
      };

    const { setIsOpen } = useContext(LoadingContext);
      //const [isOpen, setIsOpen] = useState(false);
    const { userData } = useAuthContext();
        // Memoize allTask to ensure efficient calculations
  const allTask = useMemo(() => {
    if (!userData?.categories) {
      return [];
    }
    return Object.keys(userData.categories).flatMap(key => userData.categories[key].tasks);
  }, [userData]);

  // Memoize upcoming todos
  const upComingTodos = useMemo(() => {
    if (allTask.length === 0) return [];
    const currentDate = moment();
    return allTask.filter(todos => {
      const dueDate = moment(todos.date, 'YYYY-MM-DD');
      const daysDifference = dueDate.diff(currentDate, 'days');
      return daysDifference >= 0 && daysDifference <= 2; // Only tasks due in 0, 1, or 2 days
    });
  }, [allTask]);

  // Render a loader if userData is not available
  if (!userData) {
    return <Loader />;
  }

    const handleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
      };
     
      allTask.forEach(todo => {
        const dueDate = moment(todo.date, 'YYYY-MM-DD');
       
    });

    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      
    }
    
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
      fullView ? (<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
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
            Task={upComingTodos} 
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
      </div>) :(
        
    <div className='pt-24 tablet:pl-[25vw] py-8 bg-gray-100 h-full  tablet:h-auto  tablet:px-8 px-4 w-[100%] '>
    <div>{/* heading */}
    <div className='tablet:text-4xl text-2xl mb-4 mt-8'>{/* welcome */}
      <p>
        Welcome back, <span>{userData.userDetails?.firstName || 'First Name Not Found'}👋 </span>
      </p>
    </div>
    <div>{/* friends */}

    </div>
    </div> 
    <div className=' border flex flex-col tablet:flex-row tablet:gap-24 gap-4 py-4   border-gray-400 px-8 w-full '>{/* main dashboard */}
    <div className="bg-gray-100 rounded-lg shadow-lg tablet:w-[37%] w-full  h-[60vh] md:h-[70vh]  no-scrollbar  p-4">
  <div className="flex justify-between w-full items-center mb-4">
    <div className="flex items-center ">
      <ClipboardWithTimerIcon />
      <span className="text-sm text-customColor">TO-DO</span>
    </div>
    <button
      onClick={() => setIsOpen(true)}
      className="flex gap-1 items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AddIcon style={iconStyle} />
      <span className={`text-sm ${hover ? 'text-customColor' : 'text-gray-500'}`}>
        Add task
      </span>
    </button>
  </div>
  <div className="mb-2">
    <span className="text-sm">
      <span>{formattedDate}</span> <span></span>. <span className="text-gray-500">today</span>
    </span>
  </div>
  <div className=" gap-2 w-full   h-full overflow-y-auto no-scrollbar "> {/* Scrollable container */}
    {upComingTodos.length > 0 ? (
      upComingTodos.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setShowFullViewIndex(index);
            setFullView(true);
            
          }}
          className="border   border-gray-500 relative rounded-xl    p-2 mt-2 h-176 flex cursor-pointer hover:bg-gray-200 gap-4 w-full"
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
              /*   onClick={() => handleDelete(user, item.priority, item.id)} */
                className="block px-4 py-2 hover:bg-customColor hover:text-white text-black w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))
    ) : (
      <p>No Upcoming todos.</p>
    )}
  </div>
</div>

      <div className='  tablet:w-[50%] w-full flex flex-col gap-8 '>{/* two */}
        <div className='bg-gray-100 shadow-md rounded-lg p-8'>
        <div className='flex flex-col items-start gap-4'>{/* charts */}
        <span className='flex gap-2'><ClipBoardClick /> <span className='text-customColor'>Task status</span></span>  

        <div className=' w-full'>
      <TaskChart/>
        </div>

        </div>
        
        </div>
        <div className='bg-gray-100 shadow-md rounded-md h-full p-8 '>{/* completed tasks */}
        <span className='flex gap-2 mb-4'><BookIcon /> <span className='text-customColor'> Completed Task</span></span>  
            <div className='flex flex-col items-center h-56  overflow-y-auto  no-scrollbar'>
            
            <CompletetedTask />
            </div>

        </div>


      </div>

    </div>

{/* <AddTaskPopup isOpen={isOpen} setIsOpen={setIsOpen} /> */}

</div>
      )
    }
    </>
  )
}
