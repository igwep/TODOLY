import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust this import path based on your setup
import { v4 as uuidv4 } from 'uuid';

export const Addtask = async ({ formData, setFormData, user, formattedDate }) => {
  if (user) {
    try {
      // Debugging: Log the formData before sending it
      console.log("Form data being sent:", formData);

      // Prepare the FormData to send the image
      const uploadData = new FormData();
      uploadData.append("image", formData.taskImage); // Assuming taskImage is a File object
      uploadData.append("userId", user.uid);

      console.log("FormData for image upload:", uploadData);

      const response = await fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        body: uploadData,
        mode:'cors'
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
      console.log("User document snapshot exists:", userSnap.exists());
      if (!userSnap.exists()) {
        throw new Error(`User document for '${user.uid}' does not exist.`);
      }

      // Get the current data from the document
      const userData = userSnap.data();
      console.log("User data retrieved:", userData);

      const categoryKey = formData.priority;
      console.log("Category selected:", categoryKey);

      
      if (!userData.categories || !userData.categories[categoryKey]) {
        throw new Error(`Priority '${categoryKey}' does not exist in the database.`);
      }

    
      const existingTasks = userData.categories[categoryKey].tasks || [];
      console.log("Existing tasks:", existingTasks);

  
      const updatedTasks = [
        ...existingTasks,
        {
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

  
      console.log("Updated tasks array:", updatedTasks);

      // Update the 'tasks' array for the selected priority
      await updateDoc(userDocRef, {
        [`categories.${categoryKey}.tasks`]: updatedTasks,
      });

      // Reset the form data after successful update
      alert(`Task added to '${categoryKey}' priority successfully.`);
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
      alert("Failed to update tasks. See console for details.");
    }
  } else {
    alert("User is not authenticated.");
  }
};
