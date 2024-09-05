// EditTodoForm.jsx
import React, { useState } from 'react';

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Task cannot be empty');
      return;
    }
    editTodo(value.trim(), task._id);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className='TodoForm'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='todo-input'
        placeholder='Update your task'
      />
      <button type='submit' className='todo-btn'>
        Update Task
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default EditTodoForm;
