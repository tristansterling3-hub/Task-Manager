# Project Overview: Task Orchestration Management System

## 🚀 Introduction
**Task Orchestration** is a priority-focused task management application designed with a minimalist, high-contrast aesthetic. It focuses on "Directives" (tasks) and provides a streamlined workflow for capturing, filtering, and completing high-priority items.

## 🛠 Tech Stack
- **Frontend**: React
- **Build Tool**: Vite
- **State Management**: React Context API (`TaskContext`)
- **Persistence**: LocalStorage (via `useLocalStorage` hook)
- **Styling**: CSS-in-JS using a centralized color system (`constants/colors.js`)

## 📂 Project Structure
The project follows a modular architecture:

- `src/components/`:
  - `molecules/`: Smaller, reusable components (e.g., `TaskForm`, `TaskRow`, `FilterBar`).
  - `organisms/`: Complex components that combine molecules (e.g., `TaskList`, `NotificationManager`).
- `src/context/`: Application-wide state management using `TaskContext`.
- `src/hooks/`: Custom React hooks for shared logic (e.g., `useLocalStorage`).
- `src/utils/`: Helper functions for task manipulation.
- `src/constants/`: Centralized configuration for colors and global constants.

## ✨ Key Features
- **Task Lifecycle**: Create tasks as "Directives," track them as "Incoming," and archive them as "Completed."
- **Filtering System**: Advanced filtering via the `FilterBar` to sort tasks by priority and status.
- **Notifications**: An integrated `NotificationManager` to handle task reminders and alerts.
- **Persistence**: Tasks are automatically saved to the browser's local storage, ensuring data persists across sessions.
- **Clean Aesthetic**: A professional, "industrial" design language utilizing a strict color palette.

## ⚙️ Core Workflow
1. **Capture**: Users create new tasks via the "New" tab using the `TaskForm`.
2. **Prioritize**: Tasks are assigned priorities and categories.
3. **Execute**: Active tasks are displayed as "Current Directives" in the "Incoming" tab.
4. **Archive**: Once completed, tasks move to "Archived Directives."
