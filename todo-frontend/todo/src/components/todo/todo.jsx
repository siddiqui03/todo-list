// Todo.jsx
import React from 'react';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className='Todo'>
      <p
        className={`${task.completed ? 'completed' : 'incompleted'}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.task}
      </p>
      <div className='icons'>
        <img
          className='edit-icon'
          src={editIcon}
          alt='Edit'
          onClick={() => editTodo(task._id)}
        />
        <img
          className='delete-icon'
          src={deleteIcon}
          alt='Delete'
          onClick={() => deleteTodo(task._id)}
        />
      </div>
    </div>
  );
};

export default Todo;
