import axios from 'axios';
import { useState } from 'react';

const NewTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('/api/tasks', { title, description, dueDate })
     .then(response => {
        console.log(response.data);
        setLoading(false);
      })
     .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  return (
    <div>
      <h1>Create a new task</h1>
      {loading? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <label>
            Due Date:
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </label>
          <br />
          {error && (
            <p style={{ color: 'ed' }}>{error}</p>
          )}
          <button type="submit">Create Task</button>
        </form>
      )}
    </div>
  );
};

export default NewTaskPage;