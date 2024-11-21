import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const FetchTaskById = async (user, categoryName, taskId) => {
  const userId = user?.uid;

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  console.log("Fetching task for userId:", userId, "categoryName:", categoryName, "taskId:", taskId);

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
  const task = tasks.find(t => t.id === taskIdString);

  if (task) {
    console.log("Task found:", task);
    return { ...task, category: categoryName };
  } else {
    console.error("Task not found in the category's tasks array");
    throw new Error("Task not found");
  }
};

