import React, { useState, useEffect, useContext } from 'react';
import { UploadFileIcon } from '../svgs';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../context/UseAuth';
import { Addtask } from '../FirebaseFunctions/Addtask';
import moment from 'moment';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingContext } from '../context/LoadingContext';
import { TaskInfoUpdate } from '../FirebaseFunctions/TaskUpdate';
import { updateTaskInDatabase } from '../FirebaseFunctions/TaskUpdate';

const AddTaskPopup = () => {
  const [loading, setLoading] = useState(false);
  const formattedDate = moment().format('YYYY-MM-DD');
  const { isOpen, setIsOpen } = useContext(LoadingContext);
  const { isEdit, setIsEdit } = useContext(LoadingContext);
  const { FullTaskViewDelete} = useContext(LoadingContext)

  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    priority: '',
    taskDescription: '',
    taskImage: '',
    id: ''
  });
  const { user } = useAuthContext();
  
  useEffect(() => {
    if (isEdit) {
      const fetchTaskDetails = async () => {
        try {
          await TaskInfoUpdate(user, FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId, setFormData);
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTaskDetails();
    }
  }, [FullTaskViewDelete.categoryName, FullTaskViewDelete.taskId, isEdit, user]);
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "taskImage" ? files[0] : value,
    }));
  };

  const notify = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.priority || !formData.taskDescription || !formData.date) {
      notify("Please fill in all fields before submitting.", 'error');
      return;
    }
    
    if (!user) {
      notify("No user is logged in!", 'error');
      return;
    }

    setLoading(true);

    
    try {
      if (isEdit) {
        // Call the updateTaskInDatabase function for editing tasks
        await updateTaskInDatabase(
          user,
          FullTaskViewDelete.categoryName,
          formData
        );
        notify("Task updated successfully.");
        setIsEdit(false); // Reset edit mode
      } else {
        // Call the Addtask function for adding new tasks
        await Addtask({ formData, setFormData, user, formattedDate });
        notify("Task added successfully.");
      }

      setFormData({
        title: '',
        date: '',
        priority: '',
        taskDescription: '',
        taskImage: '',
        id: ''
      }); // Reset form
    } catch (error) {
      console.error(isEdit ? "Failed to update task:" : "Failed to add task:", error);
      notify(isEdit ? "Failed to update task." : "Failed to add task.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Toast container at the root */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {loading && <Loader />}
          <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-w-[50%]">
            <div>
              {/* Header */}
              <div className='flex justify-between mb-8'>
                {
                  isEdit ?  <div>
                  <span className='border-b-2 border-red-600'>Edit T</span>
                  <span>ask</span>
                </div> : (
                    <div>
                  <span className='border-b-2 border-red-600'>Add New T</span>
                  <span>ask</span>
                </div>
                  )
                }
                <button onClick={() => {setIsOpen(false); setIsEdit(false); setFormData({
        title: '',
        date: '',
        priority: '',
        taskDescription: '',
        taskImage: '',
        id: ''
      }); }} className='underline'>Go back</button>
              </div>
              <div className='border border-gray-300'>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  {/* Title Input */}
                  <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      className="border rounded p-2 mt-1"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date Input */}
                  <div className="flex flex-col">
                    <label htmlFor="date" className="font-medium">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={formattedDate}
                      value={formData.date}
                      className="border rounded p-2 mt-1"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Priority Checkboxes */}
                  {
                    isEdit ? '' : (
                      <div className="flex flex-col">
                    <label className="font-medium">Priority</label>
                    <div className="flex items-center gap-4 mt-1">
                      <label className="flex items-center gap-2">
                        <Typography variant="h5" style={{ color: 'red', marginRight: '2px' }}>•</Typography>
                        <span className='text-gray-400'>Extreme</span>
                        <input
                          type="radio"
                          name="priority"
                          checked={formData.priority === 'Extreme'}
                          onChange={handleChange}
                          value="Extreme"
                          className="ml-2"
                        />
                      </label>
                      <label className="flex items-center gap-2">
                        <Typography variant="h5" style={{ color: 'blue', marginRight: '2px' }}>•</Typography>
                        <span className='text-gray-400'>Moderate</span>
                        <input
                          type="radio"
                          name="priority"
                          checked={formData.priority === 'Moderate'}
                          onChange={handleChange}
                          value="Moderate"
                          className="ml-2"
                        />
                      </label>
                      <label className="flex items-center gap-2">
                        <Typography variant="h5" style={{ color: 'green', marginRight: '2px' }}>•</Typography>
                        <span className='text-gray-400'>Low</span>
                        <input
                          type="radio"
                          name="priority"
                          checked={formData.priority === 'Low'}
                          onChange={handleChange}
                          value="Low"
                          className="ml-2"
                        />
                      </label>
                    </div>
                  </div>
                    )
                  }

                  {/* Description and Image Inputs */}
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="description" className="font-medium">Task Description</label>
                      <textarea
                        id="taskDescription"
                        rows="9"
                        name="taskDescription"
                        placeholder="Start writing here..."
                        value={formData.taskDescription}
                        onChange={handleChange}
                        className="border border-gray-300 h-full rounded-md p-2 mt-1 resize-none"
                      ></textarea>
                    </div>
                    <div className="flex flex-col w-1/2">
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
                          name="taskImage"
                          onChange={handleChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                 {
                  isEdit ? (  <button
                    type="submit"
                    className="text-white px-4 py-2 rounded mt-4"
                    style={{ backgroundColor: '#F24E1E' }}
                  >
                    Save
                  </button> ) : (
                     <button
                     type="submit"
                     className="text-white px-4 py-2 rounded mt-4"
                     style={{ backgroundColor: '#F24E1E' }}
                   >
                     Done
                   </button> 
                  )
                 }
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskPopup;
