import React, { useState } from 'react';
import authService from '../services/authService';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const arboretum='https://i.ibb.co/vHpkWtw/Nature-min.jpg';
  const bookShop='https://i.ibb.co/w7VMDhp/daria-nepriakhina-x-Y55b-L5m-ZAM-unsplash.jpg';

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
    <div className='container'>
      <div className='right-section'>
        <h2>Login to Access Our Services</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? 
          <Link to="/signup"> Sign up</Link>
        </p>

        <img
          src={bookShop}
          alt= "Books"
          width="90%"
          height="300"
          style={{ marginTop: '30px' }}
        />
      </div>

      <div className='left-section'>
        <p>Welcome to the Gated Knowledge</p>
        <img
          src={arboretum}
          alt= "Books"
          width="90%"
          height="500"
        />
      </div>
    </div>

    
  );
};

export default Login;
