// eslint-disable-next-line no-unused-vars
import React from 'react';
import { UploadFileIcon } from '../svgs';
import Typography from '@mui/material/Typography';


// eslint-disable-next-line react/prop-types
const AddTaskPopup = ({isOpen, setIsOpen}) => {

  return (
   
    <>
        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-w-[50%]">
            <div>
                {/* head */}
                <div className='flex justify-between mb-8'>
                    <div><span className='border-b-2 border-red-600'>Add New T</span><span>ask</span></div>
                    <button onClick={()=> setIsOpen(false)} className='underline'>Go back</button>
                </div>
                <div className='border border-gray-300'>
               

<div>
  <form action="" className="space-y-4 p-4">
    {/* Title Input */}
    <div className="flex flex-col">
      <label htmlFor="title" className="font-medium">Title</label>
      <input
        type="text"
        id="title"
        className="border rounded p-2 mt-1"
      />
    </div>
    
    {/* Date Input */}
    <div className="flex flex-col">
      <label htmlFor="date" className="font-medium">Date</label>
      <input
        type="date"
        id="date"
        className="border rounded p-2 mt-1"
      />
    </div>
    
    {/* Priority Checkboxes */}
    <div className="flex flex-col">
      <label className="font-medium">Priority</label>
      <div className="flex items-center gap-4 mt-1">
        <label className="flex items-center gap-2"> <Typography variant="h5" style={{ color: 'red', marginRight: '2px' }}>•</Typography> <span className='text-gray-400'>Extreme</span> 
          <input type="checkbox" name="priority" value="Extreme" className="ml-2" />
        </label>
        <label className="flex items-center gap-2"> <Typography variant="h5" style={{ color: 'blue', marginRight: '2px' }}>•</Typography> <span className='text-gray-400'>Moderate</span>
          <input type="checkbox" name="priority" value="Moderate" className="ml-2" />
        </label>
        <label className="flex items-center gap-2"> <Typography variant="h5" style={{ color: 'green', marginRight: '2px' }}>•</Typography> <span className='text-gray-400'>Low</span>
          <input type="checkbox" name="priority" value="Low" className="ml-2" />
        </label>
      </div>
    </div>
    
    {/* Description and Image Inputs in a Row */}
    <div className="flex gap-4 ">
      {/* Description Input */}
      <div className="flex flex-col w-1/2 ">
        <label htmlFor="description" className="font-medium">Task Description</label>
        <textarea
          id="description"
          rows="9"
          placeholder="Start writing here..."
          className="border border-gray-300 h-full rounded-md p-2 mt-1 resize-none"
        ></textarea>
      </div>
      
      {/* Image Upload Input with Icon */}
      <div className="flex flex-col w-1/2  ">
  <label htmlFor="image" className="font-medium">Upload Image</label>
  <div className="relative border border-gray-300 text-xs rounded-lg p-8 mt-1 flex flex-col gap-4 items-center justify-center">
    <UploadFileIcon className="text-gray-400 mr-2" />
    <span className="text-gray-400">Drag & Drop files here</span>
    <span className="text-gray-400">Or</span>
    <button 
      type="button" 
      onClick={() => document.getElementById('image').click()}
      className="text-gray-500 px-4 py-2 border border-gray-500 rounded-md"
    >
      Browse
    </button>
    <input
      type="file"
      id="image"
      accept="image/*"
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
  </div>
</div>
    </div>
  </form>
</div>
  </div>
                <button style={{
                    backgroundColor: '#F24E1E'
                }} type="submit" className=" text-white px-4 py-2 rounded mt-4">Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddTaskPopup