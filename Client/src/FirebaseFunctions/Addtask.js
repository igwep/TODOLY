import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust this import path based on your setup
import { v4 as uuidv4 } from 'uuid';
import { notify } from "../utils/Notify";

export const Addtask = async ({ formData, setFormData, user, formattedDate }) => {
  if (user) {
    try {

      // Prepare the FormData to send the image
      const uploadData = new FormData();
      uploadData.append("image", formData.taskImage); // Assuming taskImage is a File object
      uploadData.append("userId", user.uid);

      console.log("FormData for image upload:", uploadData);

      const API_BASE_URL = import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : '';
    
    const response = await fetch(`${API_BASE_URL}/upload-image`, {
      method: 'POST',
      body: uploadData,
      mode: 'cors',
    });

      console.log("Upload image response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Image upload failed:", errorData);
        throw new Error(errorData.error || "Failed to upload image.");
      }

      const data = await response.json();
      console.log("Uploaded image URL:", data.imageUrl);

    
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      // Debugging: Check if the user document exists
     
      if (!userSnap.exists()) {
        throw new Error(`User document for '${user.uid}' does not exist.`);
      }

      // Get the current data from the document
      const userData = userSnap.data();
    

      const categoryKey = formData.priority;
   

      
      if (!userData.categories || !userData.categories[categoryKey]) {
        throw new Error(`Priority '${categoryKey}' does not exist in the database.`);
      }

    
      const existingTasks = userData.categories[categoryKey].tasks || [];
    
      const updatedTasks = [
        ...existingTasks,
        { /// add a if state if they is uid or not
          id: uuidv4(),
          // Generate a unique ID for the task
          title: formData.title,
          taskDescription: formData.taskDescription,
          date: formData.date,
          taskImage: data.imageUrl,
          createdOn: formattedDate,
          priority:formData.priority,
          //added status
          status: 'not Started'
        },
      ];



      // Update the 'tasks' array for the selected priority
      await updateDoc(userDocRef, {
        [`categories.${categoryKey}.tasks`]: updatedTasks,
      });

      // Reset the form data after successful update
      notify(`Task added to '${categoryKey}' priority successfully.`, 'success', true);
      setFormData({
        id: "",
        taskDescription: "",
        date: "",
        title: "",
        priority: "",
        taskImage: "",
      });
    } catch (error) {
      console.error("Error updating tasks:", error);
      notify("Failed to update tasks. See console for details.", 'error');
    }
  } else {
    notify("User is not authenticated.", 'error');
  }
};
