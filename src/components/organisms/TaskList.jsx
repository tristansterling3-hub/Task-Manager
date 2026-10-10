import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskRow from '../molecules/TaskRow';

const TaskList = () => {
  const { filteredTasks } = useTasks();

  if (filteredTasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No tasks matching the current filters.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {filteredTasks.map(task => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
