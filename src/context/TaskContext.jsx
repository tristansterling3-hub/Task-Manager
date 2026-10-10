import React, { createContext, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { filterAndSortTasks } from '../utils/taskHelpers';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('priority-tasks', []);
  const [filterState, setFilterState] = useState({
    priority: 'All',
    label: 'All',
    status: 'All',
  });

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates, lastEdited: new Date().toISOString() } : task)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted, lastEdited: new Date().toISOString() } : task)));
  };

  const filteredTasks = useMemo(() => {
    return filterAndSortTasks(tasks, filterState);
  }, [tasks, filterState]);

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    filterState,
    setFilterState,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  }), [tasks, filteredTasks, filterState]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
