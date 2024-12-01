// eslint-disable-next-line no-unused-vars
import React, {useState, useContext} from 'react';
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


export const Dashboard = () => {
    const { user } = useAuthContext();
    const formattedDate = moment().format("MMMM Do"); // Output: "June 12th"
    const [fullView, setFullView] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [showFullViewIndex, setShowFullViewIndex] = useState(0)
    const {setFullTaskViewDelete} = useContext(LoadingContext);
    // eslint-disable-next-line no-unused-vars
    const [loader, setLoader] = useState(false)
    
      const [hover, setHover] = useState(false);
      const iconStyle = {
        fontSize: 24,
        color: hover ? '#FFFFFF' : '#FF6767', // Changes color on hover
        transition: 'color 0.3s ease', // Smooth transition
        backgroundColor: hover ? '#FF6767' : '',
        borderRadius: '50%'
      };
      const { setIsOpen } = useContext(LoadingContext);
      //const [isOpen, setIsOpen] = useState(false);
      const { userData } = useAuthContext();
      if (!userData) {
        return (
          <Loader />
        ); 
      }

      const allTask =Object.keys(userData.categories).flatMap(key => userData.categories[key].tasks);
      const currentDate = moment();
      const upComingTodos = allTask.filter(todos => {
        const dueDate = moment(todos.date, 'YYYY-MM-DD');
        const daysDifference = dueDate.diff(currentDate, 'days');
        return daysDifference === 1 || daysDifference === 2 || daysDifference === 0; // Only tasks due in 1 or 2 days
      });
      const handleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
      };
     
    
      
      allTask.forEach(todo => {
        const dueDate = moment(todo.date, 'YYYY-MM-DD');
        console.log(`Task: ${todo.title}, Days Difference: ${dueDate.diff(currentDate, 'days')}`);
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
                <div className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <NoteIcon width={20} height={20} fill="white" className="transition-transform duration-200 group-hover:scale-90" /> 
                </div>
                <div /* onClick={() => handleDelete(user, FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId)} */ className='bg-customColor p-3 rounded-md cursor-pointer group'>
                <TrashIcon width={20} height={20} fill="white"  className="transition-transform duration-200 group-hover:scale-90" />
                </div>
                </div>
        </div>
      </div>) :(
        
    <div className='pt-24 pl-[25vw] py-8 bg-gray-100 h-screen  px-8 w-[100%] '>
    <div>{/* heading */}
    <div className='text-4xl mb-4 mt-8'>{/* welcome */}
      <p>
        Welcome back, <span>{userData.userDetails?.firstName || 'First Name Not Found'}👋 </span>
      </p>
    </div>
    <div>{/* friends */}

    </div>
    </div> 
    <div className=' border flex gap-36   border-gray-400 p-4 w-full '>{/* main dashboard */}
    <div className="bg-gray-100 rounded-lg shadow-lg w-[35%] h-[70vh]  no-scrollbar    p-4">
  <div className="flex justify-between items-center">
    <div className="flex items-center mb-4">
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
  <div className=" gap-2 w-full  h-full overflow-y-auto no-scrollbar "> {/* Scrollable container */}
    {upComingTodos.length > 0 ? (
      upComingTodos.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setShowFullViewIndex(index);
            setFullView(true);
            
          }}
          className="border border-gray-500 relative rounded-xl p-2 mt-2 h-176 flex cursor-pointer hover:bg-gray-200 gap-4 w-full"
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
            <div className="flex gap-2 text-xxs mt-2 w-full absolute bottom-2">
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
                    color:
                      item.status === 'not Started'
                        ? 'red'
                        : item.status === 'in Progress'
                        ? 'blue'
                        : 'green',
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

      <div className='  w-[50%] flex flex-col gap-12 '>{/* two */}
        <div className='bg-gray-100 shadow-md rounded-lg p-4'>
        <div className='flex flex-col items-start gap-4'>{/* charts */}
        <span className='flex gap-2'><ClipBoardClick /> <span className='text-customColor'>Task status</span></span>  

        <div>
      <TaskChart/>
        </div>

        </div>
        
        </div>
        <div className='bg-gray-100 shadow-md rounded-md h-full p-4'>{/* completed tasks */}
            <div>
            <span className='flex gap-2'><BookIcon /> <span className='text-customColor'> Completed Task</span></span>  
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
