import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust this import path based on your setup

export const Addtask = async ({ formData, setFormData, user }) => {
  if (user) {
    try {
      // Reference the user's document in the 'users' collection
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        throw new Error(`User document for '${user.uid}' does not exist.`);
      }

      // Get the current data from the document
      const userData = userSnap.data();
      const categoryKey = formData.priority;

      // Check if the selected priority exists in the 'categories'
      if (!userData.categories || !userData.categories[categoryKey]) {
        throw new Error(`Priority '${categoryKey}' does not exist in the database.`);
      }

      // Retrieve the existing tasks for the selected priority
      const existingTasks = userData.categories[categoryKey].tasks || [];

      // Add the new task to the array
      const updatedTasks = [
        ...existingTasks,
        {
          id: new Date().getTime().toString(), // Generate a unique ID for the task
          title: formData.title,
          taskDescription: formData.taskDescription,
          date: formData.date,
        },
      ];

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
