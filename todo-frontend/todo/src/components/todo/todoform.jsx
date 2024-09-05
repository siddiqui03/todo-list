// TodoForm.jsx
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Task cannot be empty');
      return;
    }
    addTodo(value.trim());
    setValue('');
    setError('');
  };

  return (
    
    <form onSubmit={handleSubmit} className='TodoForm'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='todo-input'
        placeholder='What is the task today?'
      />
      <button type='submit' className='todo-btn'>
        Add Task
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default TodoForm;
