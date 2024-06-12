import React from 'react';
import Task from './Task'; // Import the Task component

const TaskList = ({ tasks, onDeleteTask, onEditTask, onUndoDeleteTask, onUndoAllDeletedTasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList; // Export TaskList as default