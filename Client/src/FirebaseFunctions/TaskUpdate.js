import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const UpdateTaskStatus = async (user, categoryName, taskId, newStatus) => {
  const userId = user?.uid;

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  console.log("Updating status for task in userId:", userId, "categoryName:", categoryName);

  // Reference the user document
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    console.error("User document not found");
    throw new Error("User document not found");
  }

  const userData = userSnapshot.data();
  console.log("User data fetched:", userData);

  // Access the categories field
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }

  console.log(`Category '${categoryName}' data:`, categoryData);

  // Find the task in the tasks array
  const taskIdString = String(taskId); // Ensure taskId is a string
  const tasks = categoryData.tasks || [];
  const taskIndex = tasks.findIndex(t => t.id === taskIdString);

  if (taskIndex === -1) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  console.log("Task found at index:", taskIndex);

  // Update only the status of the task
  tasks[taskIndex].status = newStatus;
  console.log("Updated task status:", tasks[taskIndex]);

  // Write the updated tasks array back to Firestore
  const updatedCategories = {
    ...categories,
    [categoryName]: {
      ...categoryData,
      tasks,
    },
  };

  await updateDoc(userRef, { categories: updatedCategories });
  console.log("Task status successfully updated");
};
 
export const taskDelete = async (user, categoryName, taskId) => {
    const userId = user?.uid
    if(!userId){
        console.error("User not authenticated")
        throw new Error("User not authenticated");
    }
    console.log("Updating status for task in userId:", userId, "categoryName:", categoryName);

    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        console.error("User document not found");
        throw new Error("User document not found");
      }
      const userData = userSnapshot.data();
  console.log("User data fetched:", userData);

  // Access the categories field
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }

  console.log(`Category '${categoryName}' data:`, categoryData);
  const taskIdString = String(taskId); // Ensure taskId is a string
  const tasks = categoryData.tasks || [];
  const taskIndex = tasks.findIndex(t => t.id === taskIdString);

  if (taskIndex === -1) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  console.log("Task found at index:", taskIndex);
  const updatedTasks = tasks.filter((_, index) => index !== taskIndex);

  // Update Firestore with the modified tasks array
  const updatedCategoryData = {
    ...categories,
    [categoryName]: {
      ...categoryData,
      tasks: updatedTasks,
    },
  };

  try {
    await updateDoc(userRef, { categories: updatedCategoryData });
    console.log("Task successfully deleted");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }

}
export const TaskInfoUpdate = async (user, categoryName, taskId, setFormData) => {
  const userId = user?.uid;

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  console.log("Updating status for task in userId:", userId, "categoryName:", categoryName);

  // Reference the user document
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    console.error("User document not found");
    throw new Error("User document not found");
  }

  const userData = userSnapshot.data();
  console.log("User data fetched:", userData);

  // Access the categories field
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }

  console.log(`Category '${categoryName}' data:`, categoryData);
  const taskIdString = String(taskId); // Ensure taskId is a string
  const tasks = categoryData.tasks || [];
  const taskIndex = tasks.findIndex(t => t.id === taskIdString);

  if (taskIndex === -1) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  console.log("Task found at index:", taskIndex);
  

}