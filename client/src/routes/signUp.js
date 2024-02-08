import React, { useState } from 'react';
//import authService from '../services/authService';
import { Link } from 'react-router-dom';


  function SignUp() {
    const [userInfo, setUserInfo] = useState({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      birthdate: '',
      gender: '', 
      password:'',
    });
  
    const handleSignUp = async () => {
      try {
        // Validate input
        if (!userInfo.name || !userInfo.lastName || !userInfo.email || !userInfo.birthdate || !userInfo.password) {
          alert ('Please fill in all required fields.');
          return;
        }
    
        // Serialize the userInfo object to JSON
        const userInfoJSON = JSON.stringify({
          name: userInfo.name, 
          lastName: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          birthdate: userInfo.birthdate,
          gender: userInfo.gender,
          password: userInfo.password,
        });
    
        // Send the POST request to the server for sign up
        const response = await fetch(`http://localhost:5001/User`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: userInfoJSON,
        });
    
        // Check the specific status code for a successful request
        if (response.ok) {
          // Handle check-in success
          alert('You have signed up successfully');
          
          // Clear the form fields
          setUserInfo({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            birthdate: '',
            gender: '',
            password: '',
          });
          
        } else if (response.status === 404) {
          // invalid credentials
          alert('Invalid credentials');
        } else {
          // Handle other error cases
          console.error('Failed to sign up');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }; 
    
    return (
      <div>
        <div className="Welc-box">
          <p>New here? Let's get started! Fill out the form to create your account.</p>
        </div>

        <div className="container">
          <div className="left-section">
            <label>
            First Name:
            <input 
              type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} 
              placeholder="Enter your first name"/>
            </label>
            <label>
              Last Name:
              <input type="text" 
                value={userInfo.lastName} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} />
            </label>
            <label>
              Email:
              <input type="text" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
            </label>
            <label>
              Birthdate:
              <input type="text" value={userInfo.birthdate} onChange={(e) => setUserInfo({ ...userInfo, birthdate: e.target.value })} />
            </label>
          </div>
        
          <div className="right-section">
            <label>
              Password:
              <input type="text" value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
            </label>

            <label>
              Phone:
              <input type="text" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
            </label>

            <label>
              Gender:
              <select value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.options[e.target.selectedIndex].value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            {/* <label>
              Gender:
              <input type="text" value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
            </label> */}

            <button type="button" onClick={handleSignUp}>Sign Up</button>

            <p>
              Already have account with us?
              <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
