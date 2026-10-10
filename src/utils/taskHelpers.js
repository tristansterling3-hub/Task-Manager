import { PRIORITY_WEIGHTS } from '../constants';

/**
 * Filters and sorts tasks based on the provided filter state.
 * @param {Array} tasks - The raw list of tasks.
 * @param {Object} filters - Filter state { priority: string, label: string, status: string }
 * @returns {Array} - The filtered and sorted list of tasks.
 */
export const filterAndSortTasks = (tasks, filters) => {
  const { priority, label, status } = filters;

  // 1. Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = !priority || priority === 'All' ||
      (priority === 'Upcoming' ? (task.dueDate && new Date(task.dueDate) >= new Date()) : task.priority === priority);
    const matchesLabel = !label || label === 'All' || task.label === label;

    let matchesStatus = true;
    if (status === 'Active') {
      matchesStatus = !task.isCompleted;
    } else if (status === 'Completed') {
      matchesStatus = task.isCompleted;
    }

    return matchesPriority && matchesLabel && matchesStatus;
  });

  // 2. Sorting
  return filteredTasks.sort((a, b) => {
    // Primary: Due Date (ascending, nulls last)
    if (a.dueDate && b.dueDate) {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      if (dateA - dateB !== 0) return dateA - dateB;
    } else if (a.dueDate) {
      return -1; // a has date, b doesn't -> a comes first
    } else if (b.dueDate) {
      return 1; // b has date, a doesn't -> b comes first
    }

    // Secondary: Priority Weight (Urgent > Low)
    const weightA = PRIORITY_WEIGHTS[a.priority] || 0;
    const weightB = PRIORITY_WEIGHTS[b.priority] || 0;
    return weightB - weightA;
  });
};

/**
 * Checks if a task is overdue.
 * @param {Object} task - The task object.
 * @returns {boolean} - True if the task is incomplete and the due date has passed.
 */
export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.isCompleted) return false;
  return new Date(task.dueDate) < new Date();
};
