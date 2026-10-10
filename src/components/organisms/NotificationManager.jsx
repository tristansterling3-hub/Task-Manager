import React, { useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { COLORS } from '../../constants/colors';

const NotificationManager = () => {
  const { tasks, updateTask } = useTasks();

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach(task => {
        if (task.isCompleted || !task.dueDate || !task.notificationSettings) return;

        const dueDate = new Date(task.dueDate);
        const timeUntilDue = dueDate - now;

        const { reminderStart, reminderInterval } = task.notificationSettings;

        // Only notify if we are within the window (between reminderStart and the actual due date)
        if (timeUntilDue > 0 && timeUntilDue <= reminderStart) {
          const lastNotified = task.lastNotified ? new Date(task.lastNotified) : new Date(0);
          const timeSinceLastNotification = now - lastNotified;

          if (timeSinceLastNotification >= reminderInterval) {
            // Trigger browser notification
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Task Reminder", {
                body: `Directive: ${task.title}\nDue in: ${Math.round(timeUntilDue / 60000)} minutes`,
                icon: '/vite.svg' // You can replace this with a real icon path
              });
            }

            // Update the task to record when it was last notified
            updateTask(task.id, { lastNotified: now.toISOString() });
          }
        }
      });
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [tasks, updateTask]);

  return null; // This is a logic-only component
};

export default NotificationManager;
