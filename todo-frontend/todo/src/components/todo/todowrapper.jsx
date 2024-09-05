// TodoWrapper.jsx
import React, { useState, useEffect } from 'react';
import Todo from './todo';
import TodoForm from './todoform';
import EditTodoForm from './edittodoform';
import API from '../../utils/api';
import './todo.css';
import logoutLogo from '../assets/logout.png'; 

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await API.get('/todos');
        setTodos(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (task) => {
    try {
      const res = await API.post('/todos', { task });
      setTodos([res.data, ...todos]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log(`Deleting todo with id: ${id}`);
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete todo');
    }
  };
  
  const toggleComplete = async (id, completed) => {
    try {
      console.log(`Toggling complete for todo with id: ${id}, current status: ${completed}`);
      const res = await API.put(`/todos/${id}`, { completed: !completed });
      setTodos(
        todos.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo');
    }
  };
  

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      const res = await API.put(`/todos/${id}`, { task });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...res.data, isEditing: false } : todo
        )
      );
    } catch (err) {
      setError('Failed to edit todo');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='TodoWrapper'>
      <header className='header-container'>
        <h1>Get Things Done!</h1>
        <button className='logout-button' onClick={logout}>
          <img src={logoutLogo} alt='Logout' />
        </button>
      </header>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            editTodo={editTask}
            task={todo}
            key={todo._id}
          />
        ) : (
          <Todo
            key={todo._id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
