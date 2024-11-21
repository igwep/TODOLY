import React from 'react'


export const FullTaskView = ({Task, showFullView}) => {
  if (!Task || Task.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        <h2>No tasks available</h2>
        <p>Please add tasks to view them here.</p>
      </div>
    );
  }
    const task = Task[showFullView];
    if (!task) {
      return (
        <div className="p-4 text-center text-gray-600">
          <h2>Task not found</h2>
          <p>The selected task does not exist. Please choose a valid task.</p>
        </div>
      );
    }


  return (
    <div className='p-4 w-full relative'>
        <div className='w-full flex flex-col gap-4 items-start'>
      <div className='w-full flex items-end gap-4'>
      <div className='w-[20%] h-40'>{/* image */}
            <img src={task.taskImage} alt="/no-image-was-found" 
             onError={(e) => e.target.src = "/assets/images/Frame14.jpg"} 
             className="w-full h-full rounded-xl"/>
        </div>
        <div className='flex flex-col gap-2'>{/* details */}
 <p className='font-semibold text-lg'>{task.title}</p>
 <p className='text-sm'> priority: <span style={{
                             color: task.priority === 'Extreme' ? 'red' :  task.priority === 'Moderate' ? 'blue' : 'green' 
                            }}>{task.priority}</span></p>
 <p className='text-sm'>Status: <span className='text-red-500'>{task.status}</span></p>
 <p className='text-xs text-gray-400'>Created on: <span>{task.createdOn}</span></p>
 
        </div>
      </div>
        <p className='text-lg text-gray-500  mb-40'>{task.taskDescription}</p>
        </div>


    </div>
  )
}
