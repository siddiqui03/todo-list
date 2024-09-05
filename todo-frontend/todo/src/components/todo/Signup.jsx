// Signup.jsx
import React, { useState } from 'react';
import './Login.css';
import personIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import API from '../../utils/api';

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      onSignupSuccess();
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Signup failed'
      );
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <form className='inputs' onSubmit={handleSignup}>
        <div className='input'>
          <img src={personIcon} alt='person' />
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='submit-container'>
          <button type='submit' className='submit'>
            Sign Up
          </button>
          <div className='submit gray' onClick={onSwitchToLogin}>
            Login
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
