import { toast } from "react-toastify";

// Global notification log (replace with Context or Redux for state management in larger apps)
let notificationLog = [];

/**
 * Notify function for showing toasts and saving notifications.
 * @param {string} message - The message to display in the notification.
 * @param {string} type - The type of notification ("info", "success", "error", "warning").
 * @param {boolean} persist - Whether to save the notification for later display.
 */
export const notify = (message, type = "info", persist = false) => {
  // Display the toast notification
  toast(message, { type });

  if (persist) {
    // Create a new notification object
    const newNotification = {
      id: Date.now(), // Unique identifier
      message,
      type,
      timestamp: new Date().toISOString(),
    };

    // Add to the notification log
    notificationLog.push(newNotification);

    // Save the log to localStorage (optional, for persistence across sessions)
    localStorage.setItem("notifications", JSON.stringify(notificationLog));
  }
};

// Export the log for other components
export const getNotificationLog = () => notificationLog;

// Optionally, initialize log from localStorage
const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
notificationLog = savedNotifications;
export const clearNotifications = () => {
  // Clear the global log
  notificationLog = [];

  // Remove from localStorage
  localStorage.removeItem("notifications");

  // Optionally: notify the user or trigger UI updates
  console.log("Notifications cleared.");
};