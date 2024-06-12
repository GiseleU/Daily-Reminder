import React, { useState } from 'react';

const Task = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [shouldDisplay, setShouldDisplay] = useState(true);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask(task.task);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate);
  };

  const handleSaveEdit = () => {
    onEditTask(task.id, editedTask, editedDescription, editedDueDate);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    setShouldDisplay(false);
  };

  return (
    <div>
      {shouldDisplay && (
        isEditing ? (
          <form>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
            <button type="button" onClick={handleSaveEdit}>
              Save
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>{task.task}</p>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <button type="button" onClick={handleEditTask}>
              Edit
            </button>
            <button type="button" onClick={handleDeleteTask}>
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Task;