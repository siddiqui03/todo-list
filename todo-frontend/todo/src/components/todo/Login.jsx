// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import API from '../../utils/api';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Login failed'
      );
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <form className='inputs' onSubmit={handleLogin}>
        <div className='input'>
          <img src={emailIcon} alt='email' />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='input'>
          <img src={passwordIcon} alt='password' />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='submit-container'>
          <button type='submit' className='submit'>
            Login
          </button>
          <div className='submit gray' onClick={onSwitchToSignup}>
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
