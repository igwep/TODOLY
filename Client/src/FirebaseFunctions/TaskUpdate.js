import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../utils/Notify";
import moment from "moment";

export const UpdateTaskStatus = async (user, categoryName, taskId, newStatus, nameOftask) => {
  const userId = user?.uid;

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }



  // Reference the user document
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    console.error("User document not found");
    throw new Error("User document not found");
  }

  const userData = userSnapshot.data();


  // Access the categories field
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }



  // Find the task in the tasks array
  const taskIdString = String(taskId); // Ensure taskId is a string
  const tasks = categoryData.tasks || [];
  const taskIndex = tasks.findIndex(t => t.id === taskIdString);

  if (taskIndex === -1) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  console.log("Task found at index:", taskIndex);
  const taskTitle = tasks[taskIndex].title;
 

  // Update only the status of the task
  const fullDate = moment().format("dddd, MMMM Do YYYY");
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    status: newStatus,
    ...(newStatus === "Finished" && { dayFinished: fullDate }),
  };


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

  return taskTitle
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
    notify("Task successfully deleted", "success", true);
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

  // Reference the user document
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    console.error("User document not found");
    throw new Error("User document not found");
  }

  const userData = userSnapshot.data();
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }

  const taskIdString = String(taskId); // Ensure taskId is a string
  const tasks = categoryData.tasks || [];
  const task = tasks.find(t => t.id === taskIdString);

  if (!task) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  console.log("Task found:", task);
  

  // Set task data into form state
  setFormData({
    id: task.id, // Include the task ID
    title: task.title,
    taskDescription: task.taskDescription,
    status: task.status,
    priority: task.priority,
    date: task.date,
    createdOn: task.createdOn,
    taskImage: task.taskImage,
  });
};


export const updateTaskInDatabase = async (user, categoryName, updatedTask) => {
  const userId = user?.uid;

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    console.error("User document not found");
    throw new Error("User document not found");
  }

  const userData = userSnapshot.data();
  const categories = userData.categories || {};
  const categoryData = categories[categoryName];

  if (!categoryData) {
    console.error(`Category '${categoryName}' not found`);
    throw new Error(`Category '${categoryName}' not found`);
  }

  const tasks = categoryData.tasks || [];
  const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);

  if (taskIndex === -1) {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }

  // Update the task in the tasks array
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

  // Update the database
  const updatedCategories = {
    ...categories,
    [categoryName]: {
      ...categoryData,
      tasks: tasks,
    },
  };

  await updateDoc(userRef, { categories: updatedCategories });

  notify("Task updated successfully!", "success", true);
};
