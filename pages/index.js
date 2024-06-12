import TaskList from '../components/TaskList';
import Task from '../components/Task';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setLoading(true);
      axios.post('/api/tasks', { task: newTask })
        .then(response => {
          setTasks([...tasks, response.data]);
          setNewTask('');
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  };

  const handleDeleteTask = (taskId) => {
    setLoading(true);
    axios.delete(`/api/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setDeletedTasks([...deletedTasks, taskId]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleEditTask = (taskId, taskText) => {
    setLoading(true);
    axios.put(`/api/tasks/${taskId}`, { task: taskText })
      .then(response => {
        setTasks(tasks.map(task => task.id === taskId ? response.data : task));
        setEditingTask(null);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdateNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleUpdateEditingTask = (event) => {
    setEditingTask({ ...editingTask, task: event.target.value });
  };

  const handleEditTaskFormSubmit = (event) => {
    event.preventDefault();
    handleEditTask(editingTask.id, editingTask.task);
  };

  const handleNewTaskFormSubmit = (event) => {
    event.preventDefault();
    handleAddTask();
  };

  const handleResetForm = () => {
    setNewTask('');
  };

  const handleResetEditForm = () => {
    setEditingTask(null);
  };

  const handleUndoDeleteTask = (taskId) => {
    setLoading(true);
    axios.post('/api/tasks/undo-delete', { taskId })
      .then(response => {
        setTasks([...tasks, response.data]);
        setDeletedTasks(deletedTasks.filter(id => id !== taskId));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleUndoAllDeletedTasks = () => {
    setLoading(true);
    axios.post('/api/tasks/undo-all-deleted')
      .then(response => {
        setTasks(response.data);
        setDeletedTasks([]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const filteredTasks = tasks.filter(task => !deletedTasks.includes(task.id));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Daily Reminder</h1>
          {error ? (
            <p style={{ color: 'red' }}>{error.message}</p>
          ) : (
            <form onSubmit={handleNewTaskFormSubmit}>
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={handleUpdateNewTask}
              />
              <button type="submit">Add</button>
            </form>
          )}
          {editingTask && (
            <form onSubmit={handleEditTaskFormSubmit}>
              <input
                type="text"
                placeholder="Edit task"
                value={editingTask.task}
                onChange={handleUpdateEditingTask}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
            </form>
          )}
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onUndoDeleteTask={handleUndoDeleteTask}
            onUndoAllDeletedTasks={handleUndoAllDeletedTasks}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;