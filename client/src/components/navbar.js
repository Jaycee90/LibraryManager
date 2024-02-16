import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

export default function Navbar() {
  const [servicesDropdownVisible, setServicesDropdownVisible] = useState(false);
  const [welcomeDropdownVisible, setWelcomeDropdownVisible] = useState(false);

  const showServicesDropdown = () => {
    setServicesDropdownVisible(true);
  };

  const hideServicesDropdown = () => {
    setServicesDropdownVisible(false);
  };

  const showWelcomeDropdown = () => {
    setWelcomeDropdownVisible(true);
  };

  const hideWelcomeDropdown = () => {
    setWelcomeDropdownVisible(false);
  };

  return (
    <div className="navbar-content">
      <div className="navigation-bar">
        <a href="/" className="split">
          <img src="https://i.ibb.co/w7VMDhp/daria-nepriakhina-x-Y55b-L5m-ZAM-unsplash.jpg" 
            alt="Logo" 
            loading="lazy" 
            style={{ width:"300px", height:"100px"}} 
          />
        </a>
        <a href="/home">Home</a> 

        <div className="welcome-dropdown" onMouseEnter={showWelcomeDropdown} onMouseLeave={hideWelcomeDropdown}>
          <button className="welcomebtn">Welcome</button>
          <div className={`dropdown-content ${welcomeDropdownVisible ? 'show' : ''}`}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>

        <div className="dropdown" onMouseEnter={showServicesDropdown} onMouseLeave={hideServicesDropdown}>
          <button className="dropbtn">Our Services</button>
          <div className={`dropdown-content ${servicesDropdownVisible ? 'show' : ''}`}>
            <Link to="/booklist">Book List</Link>
            <Link to="/checkedoutbook">Checked Out Book</Link>
            <Link to="/checkin">Check in</Link>
            <Link to="/checkout">Check Out</Link> 
          </div>
        </div> 
      </div>
    </div>
  );
}
