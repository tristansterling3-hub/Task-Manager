# 🛠️ Task Orchestration Management System

A high-precision, architecturally-styled task management application designed for directive-based organization. This system focuses on clarity, priority, and operational efficiency, utilizing a sharp, minimalist aesthetic.

## 📺 System Overview

![System Demo](./Images/Test.mp4)

## 🚀 Features

- **Directive Management**: Create, edit, and terminate tasks with precision.
- **Intelligent Prioritization**: Categorize tasks by priority levels (Urgent, High, Medium, Low) with weighted sorting.
- **Tabbed Interface**: 
  - **Incoming**: Focused view for active directives.
  - **Completed**: An archive of successfully executed directives.
  - **New**: A dedicated space for initializing new directives.
- **Advanced Filtering**: 
  - Filter by Priority, Label, or Status.
  - **Upcoming Filter**: Quickly identify tasks with future due dates.
  - **Live Counts**: See exactly how many tasks exist in each priority/label category before filtering.
- **Persistence**: LocalStorage integration ensures your directives are saved across sessions.
- **Overdue Alerts**: Visual indicators for tasks that have passed their deadline.

## 🖼️ Interface Gallery

### 📥 Incoming Directives
Manage your current active tasks with live filtering and priority sorting.
![Incoming View](./Images/Incoming.png)

### ✅ Archive
A clean record of all successfully completed tasks.
![Completed View](./Images/Completed.png)

### ➕ Directive Initialization
A focused, distraction-free environment for adding new tasks to the system.
![Create View](./Images/Create.png)

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **State Management**: React Context API
- **Styling**: CSS-in-JS (Inline Styles)
- **Utilities**: date-fns

