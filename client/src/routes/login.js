import React, { useState } from 'react';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await authService.login(credentials);
      
      if (response.message === 'User logged in successfully') {
        alert('Login successful!');
      } else {
        setError('Incorrect username or password. Please try again.');
      } 
    } catch (error) {
      console.error('Error during login:', error);
      if (error.message === 'Incorrect email or password!') {
        alert('Incorrect email or password, please try again.');
      } else if (error.message === 'User not found'){
        alert('You are not a member, please sign up.');
      } else {
        setError('Error during login. Please try again');
      }
    }
  };

  return (
    <div className='container'>
      <div className='login-form'>
        <h2>Login to Access Our Services</h2>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
