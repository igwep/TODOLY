import { toast } from "react-toastify";

// Global notification log (optional for persistence)
let notificationLog = [];

/**
 * Notify function for showing toasts and saving notifications.
 * @param {string} message - The message to display in the notification.
 * @param {string} type - The type of notification ("info", "success", "error", "warning").
 * @param {boolean} persist - Whether to save the notification for later display.
 */
export const notify = (message, type = "info", persist = false) => {
  // Display the toast notification with proper configuration
  toast(message, {
    type,
    autoClose: 5000, // Auto close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

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

    // Save the log to localStorage (optional)
    localStorage.setItem("notifications", JSON.stringify(notificationLog));
  }
};

// Export the log for other components
export const getNotificationLog = () => notificationLog;

// Optionally, initialize log from localStorage
const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
notificationLog = savedNotifications;

export const clearNotifications = () => {
  notificationLog = []; // Clear the global log
  localStorage.removeItem("notifications"); // Remove from localStorage
  console.log("Notifications cleared."); // Optional log
};
