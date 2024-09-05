import React, { useState, useEffect } from 'react';
import Login from './components/todo/Login';
import Signup from './components/todo/Signup';
import TodoWrapper from './components/todo/todowrapper';
import API from './utils/api';
import axios from 'axios';

// Set default Axios configuration for CORS
axios.defaults.withCredentials = true;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await API.get('https://todo-list-api-jet.vercel.app/'); // Replace with backend URL
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <TodoWrapper />
      ) : showSignup ? (
        <Signup
          onSwitchToLogin={() => setShowSignup(false)}
          onSignupSuccess={handleSignupSuccess}
        />
      ) : (
        <Login
          onSwitchToSignup={() => setShowSignup(true)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;
