import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = { username, password };
      const response = await authService.login(credentials);

      if (response.ok) {
        alert('Login successful'); 
        // Optionally, you can redirect the user to a different page after successful login.
      } else if (response.status === 401) {
        alert('Incorrect username or password. Please try again.');
      } else {
        console.error('Failed to log in'); // Handle other error cases
      }
    } catch (error) {
      console.error('Error during login:', error); // Handle login failure
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
