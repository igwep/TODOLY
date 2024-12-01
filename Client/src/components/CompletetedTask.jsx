import React from 'react'
import { useAuthContext } from '../context/UseAuth'
import Loader from './Loader';

export const CompletetedTask = () => {
    const { userData } = useAuthContext();
    if (!userData) {
        return (
          <Loader />
        ); 
      }
    
      const categories = userData?.categories; // Safely access categories
      
      if (categories) {
          const allTasks = Object.values(categories)
              .flatMap(category => category.tasks || []); // Flatten all tasks
          const completedTasks = allTasks
              .filter(task => task.status === 'Finished')
              .sort((a, b) => a.id.localeCompare(b.id));
      
          console.log('Completed tasks:', completedTasks);
      } else {
          console.log('No categories found.');
      }
      

  return (
    <div>fgfngvnfjvnj</div>
  )
}
